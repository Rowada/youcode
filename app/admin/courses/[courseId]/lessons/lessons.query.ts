import { prisma } from "@/lib/prisma";

export const getLessons = async ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  const lessons = await prisma.course.findFirst({
    where: {
      id: courseId,
      creatorId: userId,
    },
    select: {
      id: true,
      name: true,
      lessons: true,
    },
  });

  return lessons;
};
