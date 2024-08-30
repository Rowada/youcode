"use server";

import { z } from "zod";
import { CourseFormSchema } from "./course.schema";
import { prisma } from "@/lib/prisma";
import { authenticatedAction } from "@/lib/action";

const CourseActionEditProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});

export const courseActionEdit = authenticatedAction
  .schema(CourseActionEditProps)
  .action(async ({ parsedInput, ctx }) => {
    await prisma.course.update({
      where: {
        id: parsedInput.courseId,
        creatorId: ctx.userId,
      },
      data: parsedInput.data,
    });

    return "Course updated successfully";
  });
