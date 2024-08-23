import {
  LayoutHeader,
  LayoutTitle,
  LayoutContent,
  Layout,
} from "@/components/layout/Layout";
import { CourseCard } from "./CourseCard";
import { getCourses } from "./course.query";
import { getAuthSession } from "@/lib/auth";
import { NotAuthentificatedCard } from "@/features/errors/NotAuthentificatedCard";

export default async function CoursesPage() {
  const session = await getAuthSession();

  if (!session?.user.id) {
    return <NotAuthentificatedCard />;
  }

  const courses = await getCourses(session.user.id);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Your courses</LayoutTitle>
        <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          {courses.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </LayoutContent>
      </LayoutHeader>
    </Layout>
  );
}
