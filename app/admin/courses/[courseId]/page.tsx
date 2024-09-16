import { SubmitButton } from "@/components/form/SubmitButton";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationButton } from "@/features/pagination/PaginationButton";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Ban, CircleCheckBig } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { getAdminCourse } from "./admin-course.query";

export default async function AdminCoursePage({
  params,
  searchParams,
}: {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 1);

  const session = await getRequiredAuthSession();

  const course = await getAdminCourse({
    courseId: params.courseId,
    userId: session.user.id,
    userPage: page,
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
        <LayoutContent className="flex flex-col gap-4 p-4 lg:flex-row">
          <Card className="flex-[2]">
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>

                    <TableHead>Status</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {course.users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Avatar className="rounded">
                          <AvatarFallback>{user.email?.[0]}</AvatarFallback>
                          {user.image && (
                            <AvatarImage
                              src={user.image}
                              alt={user.email ?? ""}
                            />
                          )}
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Typography
                          as={Link}
                          variant="large"
                          href={`/admin/users/${user.id}`}
                        >
                          {user.email}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Badge>{user.canceled ? "Canceled" : "Active"}</Badge>
                      </TableCell>

                      <TableCell>
                        <form>
                          <SubmitButton
                            size="sm"
                            variant="secondary"
                            className="w-full"
                            formAction={async () => {
                              "use server";

                              const session = await getRequiredAuthSession();

                              const courseId = params.courseId;
                              const userId = user.id;

                              const courseOnUser =
                                await prisma.courseOnUser.findFirst({
                                  where: {
                                    userId,
                                    course: {
                                      id: courseId,
                                      creatorId: session?.user.id,
                                    },
                                  },
                                });

                              if (!courseOnUser) return;

                              await prisma.courseOnUser.update({
                                where: {
                                  id: courseOnUser.id,
                                },
                                data: {
                                  canceledAt: courseOnUser.canceledAt
                                    ? null
                                    : new Date(),
                                },
                              });

                              revalidatePath(`/admin/courses/${courseId}`);
                            }}
                          >
                            {user.canceled ? (
                              <CircleCheckBig size={16} />
                            ) : (
                              <Ban size={16} />
                            )}
                          </SubmitButton>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <PaginationButton
                baseUrl="/admin/courses/${course.id}"
                currentPage={page}
                totalPages={course._count?.users ?? 0 / 5}
              />
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="flex-row items-center gap-4 space-y-0">
              <Avatar className="rounded">
                <AvatarFallback>{course.name?.[0]}</AvatarFallback>
                {course.image && (
                  <AvatarImage src={course.image} alt={course.name ?? ""} />
                )}
              </Avatar>
              <CardTitle>{course.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <Typography>{course._count?.users} users</Typography>
              <Typography>{course._count?.lessons} lessons</Typography>
              <Link
                href={`/admin/courses/${course.id}/edit`}
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Edit
              </Link>{" "}
              <Link
                href={`/admin/courses/${course.id}/lessons`}
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Edit lessons
              </Link>
            </CardContent>
          </Card>
        </LayoutContent>
      </LayoutHeader>
    </Layout>
  );
}
