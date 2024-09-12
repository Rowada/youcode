import { z } from "zod";

export const LESSON_STATE = ["PUBLISHED", "HIDDEN", "PUBLIC"] as const;

export const LessonDetailsSchema = z.object({
  name: z.string().min(1).max(255),
  state: z.enum(LESSON_STATE),
});

export type LessonDetailsSchema = z.infer<typeof LessonDetailsSchema>;
