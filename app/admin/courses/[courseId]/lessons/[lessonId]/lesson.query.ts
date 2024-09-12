import { prisma } from "@/lib/prisma";

export const getAdminLesson = async ({
  lessonId,
  userId,
}: {
  lessonId: string;
  userId: string;
}) => {
  return await prisma.lesson.findUnique({
    where: {
      id: lessonId,
      course: {
        creatorId: userId,
      },
    },
    select: {
      id: true,
      name: true,
      content: true,
      state: true,
      courseId: true,
    },
  });
};
