import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div>
      <Navbar user={user} />
      <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-0">{children}</div>
    </div>
  );
}
