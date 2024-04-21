import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head />
      <body
        className={cn(
          "bg-background h-full min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
