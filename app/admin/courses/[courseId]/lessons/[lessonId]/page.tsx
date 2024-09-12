import { getRequiredAuthSession } from "@/lib/auth";
import { getAdminLesson } from "./lesson.query";
import { notFound } from "next/navigation";

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
    <div>
      <h1>CourseLessonPage</h1>
    </div>
  );
}
