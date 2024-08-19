import {
  LayoutContent,
  LayoutHeader,
  Layout,
  LayoutTitle,
} from "@/components/layout/Layout";

import Link from "next/link";

export default async function CoursesPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Link href="/admin/courses">Courses</Link>
      </LayoutContent>
    </Layout>
  );
}
