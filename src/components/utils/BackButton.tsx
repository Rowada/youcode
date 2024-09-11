"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BackButton(props: ButtonProps) {
  const router = useRouter();

  return (
    <Button
      {...props}
      onClick={(e) => {
        router.back();
        props?.onClick?.(e);
      }}
    >
      Back
    </Button>
  );
}
