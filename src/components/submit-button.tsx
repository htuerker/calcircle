"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

import { Button, buttonVariants, type ButtonProps } from "./ui/button";

const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const { pending } = useFormStatus();
    return (
      <Button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={pending}
        {...props}
      >
        {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Button>
    );
  },
);

SubmitButton.displayName = "SubmitButton";

export { SubmitButton };
