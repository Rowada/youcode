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
    const course = await prisma.course.update({
      where: {
        id: parsedInput.courseId,
        creatorId: ctx.userId,
      },
      data: parsedInput.data,
    });

    return {
      message: "Course updated successfully",
      course,
    };
  });

const CourseActionCreateProps = z.object({
  data: CourseFormSchema,
});

export const courseActionCreate = authenticatedAction
  .schema(CourseActionCreateProps)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.userId) {
      throw new Error("User is not authenticated");
    }

    const course = await prisma.course.create({
      data: {
        ...parsedInput.data,
        creatorId: ctx.userId,
      },
    });

    return {
      message: "Course created successfully",
      course,
    };
  });
