import { SubmitButton } from "@/components/form/SubmitButton";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { AdminLessonList } from "./AdminLessonList";
import { getLessons } from "./lessons.query";

export default async function CourseLessonsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getRequiredAuthSession();

  const lessons = await getLessons({
    courseId: params.courseId,
    userId: session.user.id,
  });

  if (!lessons) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Lessons - {lessons.name}</LayoutTitle>{" "}
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 p-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            {lessons.lessons.map((lesson) => (
              <AdminLessonList key={lesson.id} lesson={lesson} />
            ))}

            <form>
              <SubmitButton
                size="sm"
                variant="secondary"
                className="w-full"
                formAction={async () => {
                  "use server";

                  const session = await getRequiredAuthSession();

                  const courseId = params.courseId;

                  await prisma.course.findFirstOrThrow({
                    where: {
                      creatorId: session.user.id,
                      id: courseId,
                    },
                  });

                  const lesson = await prisma.lesson.create({
                    data: {
                      name: "New lesson",
                      rank: "aaaa",
                      state: "HIDDEN",
                      content: "## New lesson content",
                      courseId: courseId,
                    },
                  });

                  redirect(`/admin/courses/${courseId}/lessons/${lesson.id}`);
                }}
              >
                Create lesson
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
