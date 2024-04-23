import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/server/auth";
import { db } from "@/server/db";
import { deleteCalendar } from "./actions";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";

export default async function Calendars() {
  const user = await getCurrentUser();
  const calendars = await db.calendar.findMany({
    where: {
      owner: {
        id: user.id,
      },
    },
    select: {
      id: true,
      name: true,
      bio: true,
      image: true,
      username: true,
    },
  });

  return (
    <div className="">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex items-center justify-between">
          <span className="bg-white pr-3 text-xl leading-6 ">My Calendars</span>
          <span className="bg-white pl-3">
            <Button>
              <Link href="/me/calendars/new">Add New Calendar</Link>
            </Button>
          </span>
        </div>
      </div>

      <ul>
        {calendars.map((calendar) => (
          <li key={calendar.id} className="items-between flex w-full gap-x-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-12 w-12 rounded-full"
              width={48}
              height={48}
              src={calendar.image ?? ""}
              alt="user avatar"
            />
            <div className="w-full flex-col">
              <div className="flex w-full items-start justify-between">
                <h3 className="text-base font-semibold tracking-tight">
                  {calendar.name}
                </h3>
              </div>
              <Button variant="link" className="h-6 p-0 text-sm">
                <a
                  target="_blank"
                  href={`https://cal.com/${calendar.username}`}
                >
                  {`cal.com/${calendar.username}`}
                </a>
              </Button>
            </div>
            <form action={deleteCalendar} className="flex items-center">
              <Input type="hidden" name="calendarId" value={calendar.id} />
              <SubmitButton
                type="submit"
                className="w-32 max-w-32"
                variant="secondary"
              >
                Delete Calendar
              </SubmitButton>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
