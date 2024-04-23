"use server";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export const verifyAccessToken = async (prevState: unknown, formData: FormData) => {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return redirect("/auth/login");
  }
  const token = formData.get("token")?.toString();
  if (!token) {
    return { error: { message: "Access token is required" } };
  }

  const response = await fetch(
    `https://api.cal.com/v1/me?apiKey=${token}`,
  );

  if (!response.ok) {
    return { error: { message: "Invalid access token" } };
  }

  const data = await response.json() as {
    user: {
      id: string,
      username: string;
      name: string;
      bio?: string,
      avatar?: string
    }
  };

  return {
    data: {
      userId: data.user.id,
      username: data.user.username,
      name: data.user.name,
      bio: data.user.bio,
      avatar: data.user.avatar,
    }
  };
}

export const createUserCalendar = async (formData: FormData) => {
  const accessToken = formData.get("accessToken")?.toString();
  const username = formData.get("username")?.toString();
  const name = formData.get("name")?.toString();
  const bio = formData.get("bio")?.toString();
  const image = formData.get("image")?.toString();

  if (!accessToken || !username || !name) {
    return { error: "All fields are required" };
  }
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return redirect("/auth/login");
  }

  try {
    await db.calendar.create({
      data: {
        accessToken,
        username,
        name,
        bio,
        image,
        provider: "cal",
        owner: {
          connect: {
            id: session.user.id,
          }
        }
      },
      select: {
        id: true
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error("Something went wrong. Please try again.");
  }
  return redirect("/me/calendars");
}