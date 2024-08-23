import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { getCourses } from "../courses/course.query";
import { CourseCard } from "../courses/CourseCard";

export default async function ExplorerPage() {
  const courses = await getCourses();
  return (
    <>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Explorer</LayoutTitle>
          <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
            {courses.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
          </LayoutContent>
        </LayoutHeader>
      </Layout>
    </>
  );
}
