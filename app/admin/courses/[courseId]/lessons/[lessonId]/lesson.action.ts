"use server";

import { z } from "zod";
import { LessonDetailsSchema } from "./form/lesson.schema";
import { prisma } from "@/lib/prisma";
import { authenticatedAction } from "@/lib/action";

const LessonActionEditProps = z.object({
  lessonId: z.string(),
  data: LessonDetailsSchema,
});

export const lessonActionEdit = authenticatedAction
  .schema(LessonActionEditProps)
  .action(async ({ parsedInput, ctx }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: parsedInput.lessonId,
        course: {
          creatorId: ctx.userId,
        },
      },
      data: parsedInput.data,
    });

    return {
      message: "Lesson updated successfully",
      lesson,
    };
  });

const LessonActionEditContentSchema = z.object({
  lessonId: z.string(),
  markdown: z.string(),
});

export const lessonActionEditContent = authenticatedAction
  .schema(LessonActionEditContentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: parsedInput.lessonId,
        course: {
          creatorId: ctx.userId,
        },
      },
      data: {
        content: parsedInput.markdown,
      },
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });

    return {
      message: "Lesson updated successfully",
      lesson,
    };
  });
