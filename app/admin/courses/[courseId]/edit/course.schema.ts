import { z } from "zod";

export const CourseFormSchema = z.object({
  name: z.string().min(3).max(50),
  image: z.string().url(),
  description: z.string().min(3).max(500),
});

export type CourseFormSchema = z.infer<typeof CourseFormSchema>;
