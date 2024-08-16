import { getAuthSession } from "@/lib/auth";
import { LogoutButton } from "@/features/auth/LogoutButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function Account() {
  const session = await getAuthSession();

  if (!session) {
    throw new Error("Not session");
  }

  return (
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader className="flex flex-row gap-4 space-y-2">
        <Avatar className=" size-12 ">
          <AvatarFallback>{session.user.email?.[0]}</AvatarFallback>
          {session.user.image && (
            <AvatarImage src={session.user.image} alt="use image" />
          )}
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle>{session.user.email}</CardTitle>
          <CardDescription>{session.user.name}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/account/settings"
        >
          Settings
        </Link>
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/admin"
        >
          Admin
        </Link>
      </CardContent>

      <CardFooter className="flex flex-row-reverse">
        <LogoutButton />
      </CardFooter>
    </Card>
  );
}
