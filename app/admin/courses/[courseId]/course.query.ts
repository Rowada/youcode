import { prisma } from "@/lib/prisma";

export const getAdminCourse = async ({
  courseId,
  userId,
  userPage,
}: {
  courseId: string;
  userId: string;
  userPage: number;
}) => {
  const usersPerPage = 5;

  const courses = await prisma.course.findUnique({
    where: {
      creatorId: userId,
      id: courseId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      users: {
        skip: (userPage - 1) * usersPerPage,
        take: usersPerPage,
        select: {
          canceledAt: true,
          id: true,
          user: {
            select: {
              email: true,
              id: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });

  const users = courses?.users.map((user) => {
    return {
      canceled: user.canceledAt ? true : false,
      ...user.user,
    };
  });

  return {
    ...courses,
    users,
  };
};
