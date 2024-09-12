import { getRequiredAuthSession } from "@/lib/auth";
import { getAdminLesson } from "./lesson.query";
import { notFound } from "next/navigation";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonDetailsForm } from "./form/LessonDetailsForm";

export default async function EditLessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const session = await getRequiredAuthSession();

  const lesson = await getAdminLesson({
    lessonId: params.lessonId,
    userId: session.user.id,
  });

  if (!lesson) {
    notFound();
  }
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{lesson.name}</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="flex flex-col gap-4 p-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <LessonDetailsForm defaultValue={lesson} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
