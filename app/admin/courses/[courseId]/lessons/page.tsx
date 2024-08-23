import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { getRequiredAuthSession } from "@/lib/auth";
import { getLessons } from "./lessons.query";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LessonList } from "./LessonList";
import { Button } from "@/components/ui/button";

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
        <LayoutTitle>Lessons - {lessons.name}</LayoutTitle>
        <LayoutContent className="flex flex-col gap-4 p-4 lg:flex-row">
          <Card className="flex-[2]">
            <CardHeader>
              <CardTitle>Lessons</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
              {lessons.lessons.map((lesson) => (
                <LessonList key={lesson.id} lesson={lesson} />
              ))}
            </CardContent>

            <CardFooter>
              <Button variant={"outline"} className="w-full">
                Create lesson
              </Button>
            </CardFooter>
          </Card>
        </LayoutContent>
      </LayoutHeader>
    </Layout>
  );
}
