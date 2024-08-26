import { getAuthSession } from "@/lib/auth";
import { getCourse } from "./course.query";
import { notFound } from "next/navigation";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Course } from "./Course";

export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getAuthSession();
  const course = await getCourse({
    courseId: params.courseId,
    userId: session?.user.id,
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Your courses</LayoutTitle>
      </LayoutHeader>

      <LayoutContent>
        <Course course={course} />
      </LayoutContent>
    </Layout>
  );
}
