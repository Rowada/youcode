import {
  Layout,
  LayoutHeader,
  LayoutTitle,
  LayoutContent,
  LayoutActions,
} from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/Typography";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export default async function CoursesPages() {
  const session = await getRequiredAuthSession();

  const courses = await prisma.course.findMany({
    where: {
      creatorId: session.user.id,
    },
  });
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>{" "}
      <LayoutActions>
        <Link
          href="/admin/courses/new"
          className={buttonVariants({ variant: "secondary" })}
        >
          New Course
        </Link>
      </LayoutActions>
      <LayoutContent>
        <Card>
          <CardContent className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow>
                    <TableCell>
                      <Avatar className="rounded">
                        <AvatarFallback>{course.name[0]}</AvatarFallback>
                        {course.image && (
                          <AvatarImage src={course.image} alt={course.name} />
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography
                        as={Link}
                        variant="large"
                        href={`/admin/courses/${course.id}`}
                      >
                        {course.name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
