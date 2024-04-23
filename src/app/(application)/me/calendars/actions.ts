"use server";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { notFound, redirect } from "next/navigation";

export const deleteCalendar = async (formData: FormData) => {
  const calendarId = formData.get("calendarId")?.toString();
  if (!calendarId) {
    throw new Error("Invalid calendar ID");
  }

  const session = await getServerAuthSession();

  if (!session?.user) {
    return redirect("/auth/login");
  }

  const calendar = await db.calendar.findFirst({
    where: {
      id: calendarId,
      owner: {
        id: session.user.id,
      },
    },
  });

  if (!calendar) {
    return redirect(notFound());
  }

  if (calendar.ownerId !== session.user.id) {
    return redirect(notFound());
  }

  try {
    await db.calendar.delete({
      where: {
        id: calendarId
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error("Something went wrong. Please try again.");
  }
  return redirect("/me/calendars");
}