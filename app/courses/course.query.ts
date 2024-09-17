import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCourses = async (userId?: string, skip = 0, take = 10) => {
  return await prisma.course.findMany({
    skip,
    take,
    where: userId
      ? {
          users: { some: { userId, canceledAt: null } },
        }
      : undefined,
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      creator: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
};

export type CoursesCard = Prisma.PromiseReturnType<typeof getCourses>[number];
