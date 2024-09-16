import { getRequiredAuthSession } from "@/lib/auth";
import { getAdminLesson } from "./lesson.query";
import { notFound } from "next/navigation";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonDetailsForm } from "./form/LessonDetailsForm";
import { MdxEditor } from "./content/MdxEditor";

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
    <Layout className="max-w-5xl">
      <LayoutHeader>
        <LayoutTitle>{lesson.name}</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="flex flex-col gap-4 p-4 lg:flex-row">
        <Card className="w-full flex-1">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <LessonDetailsForm defaultValue={lesson} />
          </CardContent>
        </Card>

        <Card className="max-w-full flex-[3] overflow-auto">
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <MdxEditor markdown={lesson.content} lessonId={lesson.id} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
