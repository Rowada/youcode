import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Typography } from "@/components/ui/Typography";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(3).max(50),
  image: z.string().url(),
});

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Account Settings</LayoutTitle>
      </LayoutHeader>

      <LayoutContent>
        <Card className="bg-background">
          <CardContent className="mt-6">
            <form
              action={async (formData) => {
                "use server";

                const userSession = await getRequiredAuthSession();

                const image = formData.get("image");
                const name = formData.get("name");

                const safeData = FormSchema.safeParse({
                  image,
                  name,
                });

                if (!safeData.success) {
                  const searcParams = new URLSearchParams();
                  searcParams.set(
                    "error",
                    "Invalid data. Image must be a valid URL and name must be between 3 and 50 characters"
                  );
                  redirect(`/account/settings?${searcParams.toString()}`);
                }

                await prisma.user.update({
                  where: {
                    id: userSession.user.id,
                  },
                  data: safeData.data,
                });

                revalidatePath("/account");
                redirect("/account");
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  defaultValue={session.user.image}
                  id="image"
                  name="image"
                  type="url"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  defaultValue={session.user.name}
                  id="name"
                  name="name"
                  type="text"
                />
              </div>
              {searchParams.error && (
                <Typography>Error: {searchParams.error as string}</Typography>
              )}

              <Button>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
