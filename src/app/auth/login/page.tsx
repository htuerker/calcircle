import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GithubIcon from "@/components/svg/github-icon";
import { authOptions } from "@/server/auth";
import SignInWithGoogleButton from "@/components/sign-in-with-google-button";

export default async function Login() {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex min-h-full flex-1 items-center">
      <div className="mx-auto w-full max-w-sm space-y-4 text-center lg:w-96">
        <h2 className=" mt-8 text-2xl font-medium leading-9 tracking-tight">
          Sign in to your account
        </h2>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input type="email" id="email" placeholder="Email" disabled />
          <Button disabled>Sign In with Email</Button>
        </div>

        <div className="mt-10">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-white px-6 text-gray-900">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-4">
            <SignInWithGoogleButton />
          </div>
          <form>
            <div className="mt-2">
              <Button
                variant={"secondary"}
                className="w-full"
                disabled
                type="submit"
              >
                <GithubIcon />
                <span className="pl-2 text-sm font-semibold leading-6">
                  Sign In with GitHub
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
