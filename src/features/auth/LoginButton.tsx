"use client";

import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export const LoginButton = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      signIn();
    },
  });

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        mutation.mutate();
      }}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? (
        // <Loader className="mr-2" size={12} />
        <h2 className="mr-2">Loading...</h2>
      ) : (
        <LogIn className="mr-2" size={12} />
      )}
      Login
    </Button>
  );
};
