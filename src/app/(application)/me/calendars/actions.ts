"use server";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export const deleteCalendar = async (formData: FormData) => {
  const accessToken = formData.get("accessToken")?.toString();
  const username = formData.get("username")?.toString();
  const name = formData.get("name")?.toString();
  const bio = formData.get("bio")?.toString();
  const image = formData.get("image")?.toString();

  if (!accessToken || !username || !name) {
    return { error: "All fields are required" };
  }
  const session = await getServerAuthSession();

  if (!session?.user) {
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