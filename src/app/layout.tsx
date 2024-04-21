import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "CalCircle",
  description:
    "Sync your schedules, share your moments with your inner circle.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head />
      <body
        className={cn(
          "bg-background h-full min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Navbar user={session?.user} />
        <main className="px-4">{children}</main>
      </body>
    </html>
  );
}
