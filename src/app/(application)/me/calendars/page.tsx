import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/server/auth";
import { db } from "@/server/db";
import { deleteCalendar } from "./actions";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";

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
      <h2 className="my-2 text-xl">Calendars</h2>
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
              <Input type="hidden" name="userId" value={calendar.id} />
              <SubmitButton type="submit" className="w-32 max-w-32">
                Delete Calendar
              </SubmitButton>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
