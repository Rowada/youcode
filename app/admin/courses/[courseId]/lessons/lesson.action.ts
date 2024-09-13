"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authenticatedAction } from "@/lib/action";
import { getMiddleRank } from "@/lib/getMiddleRank";

const SaveLessonMoveSchema = z.object({
  upItemRank: z.string().optional(),
  downItemRank: z.string().optional(),
  lessonId: z.string(),
});

export const saveLessonMove = authenticatedAction
  .schema(SaveLessonMoveSchema)
  .action(async ({ parsedInput, ctx }) => {
    const course = await prisma.course.findFirst({
      where: {
        lessons: {
          some: {
            id: parsedInput.lessonId,
          },
        },
        creatorId: ctx.userId,
      },
    });

    if (!course) {
      throw new Error("Course not found");
    }

    const lesson = await prisma.lesson.findFirst({
      where: {
        id: parsedInput.lessonId,
        courseId: course.id,
      },
    });
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    const newRank = getMiddleRank(
      parsedInput.upItemRank,
      parsedInput.downItemRank
    );

    await prisma.lesson.update({
      where: {
        id: lesson.id,
      },
      data: {
        rank: newRank,
      },
    });

    return {
      message: "Lesson moved successfully",
      newRank,
    };
  });
