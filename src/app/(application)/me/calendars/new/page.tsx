"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserCalendar, verifyAccessToken } from "./actions";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";

const verifyAccessTokenInitialState = {} as {
  data?: {
    userId: string;
    username: string;
    name: string;
    bio?: string;
    avatar?: string;
  };
  error?: { message: string };
};

export default function NewCalendar() {
  const [token, setToken] = useState<string | null>(null);
  const [verifyState, verifyAccessTokenAction] = useFormState(
    verifyAccessToken,
    verifyAccessTokenInitialState,
  );

  const isVerified = token && !!verifyState.data;
  const verifiedUser = isVerified && verifyState.data;

  return (
    <div className="">
      {!isVerified && (
        <form action={verifyAccessTokenAction} className="space-y-2">
          <div className="flex items-end gap-4">
            <div className="w-full">
              <div className="space-y-1">
                <Label>Your cal.com access token</Label>
                <Input
                  type="text"
                  placeholder="Put your cal.com access token here"
                  name="token"
                  value={token ?? ""}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
            </div>
            <SubmitButton type="submit" className="w-32 max-w-32">
              Verify
            </SubmitButton>
          </div>
        </form>
      )}
      {verifyState.error?.message && <div>{verifyState.error.message}</div>}
      {verifiedUser && (
        <div className="items-between flex w-full gap-x-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-12 w-12 rounded-full"
            width={48}
            height={48}
            src={verifiedUser.avatar}
            alt="user avatar"
          />
          <div className="w-full flex-col">
            <div className="flex w-full items-start justify-between">
              <h3 className="text-base font-semibold tracking-tight">
                {verifiedUser.name}
              </h3>
            </div>
            <Button variant="link" className="h-6 p-0 text-sm">
              <a
                target="_blank"
                href={`https://cal.com/${verifiedUser.username}`}
              >
                {`cal.com/${verifiedUser.username}`}
              </a>
            </Button>
          </div>
          <form action={createUserCalendar} className="flex items-center">
            <Input type="hidden" name="userId" value={verifiedUser.userId} />
            <Input
              type="hidden"
              name="username"
              value={verifiedUser.username}
            />
            <Input type="hidden" name="name" value={verifiedUser.name} />
            <Input type="hidden" name="bio" value={verifiedUser.bio ?? ""} />
            <Input type="hidden" name="image" value={verifiedUser.avatar} />
            <Input type="hidden" name="accessToken" value={token ?? ""} />
            <SubmitButton type="submit" className="w-32 max-w-32">
              Add Calendar
            </SubmitButton>
            <Button variant="outline" className="mx-2" disabled>
              Cancel
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
