"use client";

import * as React from "react";
import { signIn } from "next-auth/react";

import GoogleIcon from "./svg/google-icon";
import { Button } from "./ui/button";

export default function SignInWithGoogleButton() {
  return (
    <Button
      variant={"secondary"}
      className="w-full"
      onClick={() => signIn("google")}
    >
      <GoogleIcon />
      <span className="pl-2 text-sm font-semibold leading-6">
        Sign In with Google
      </span>
    </Button>
  );
}
