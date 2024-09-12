import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CourseForm } from "./CourseForm";

export default async function CourseEditPage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getRequiredAuthSession();

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      creatorId: session.user.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Edit course</LayoutTitle>
        <LayoutContent>
          <Card className="flex-[2]">
            <CardContent className="mt-6">
              <CourseForm defaultValue={course} />
            </CardContent>
          </Card>
        </LayoutContent>
      </LayoutHeader>
    </Layout>
  );
}
