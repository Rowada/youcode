"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { CourseFormSchema } from "./course.schema";
import { useRouter } from "next/navigation";
import { courseActionCreate, courseActionEdit } from "./course.action";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export type CourseFormProps = {
  defaultValue?: CourseFormSchema & {
    id: string;
  };
};

export const CourseForm = ({ defaultValue }: CourseFormProps) => {
  const form = useZodForm({
    schema: CourseFormSchema,
    defaultValues: defaultValue || {
      name: "",
      description: "",
      image: "",
    },
  });

  const router = useRouter();

  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        if (defaultValue?.id) {
          const result = await courseActionEdit({
            courseId: defaultValue.id,
            data: values,
          });

          if (result?.data) {
            toast.success(result.data.message);
            router.push(`/admin/courses/${defaultValue.id}`);
            router.refresh();
            return;
          }

          toast.error("Some error occured", {
            description: result?.serverError,
          });
          return;
        } else {
          const result = await courseActionCreate({
            data: values,
          });
          if (result?.data) {
            toast.success(result.data.message);
            router.push(`/admin/courses/${result.data.course.id}`);
            router.refresh();
            return;
          }

          toast.error("Some error occured", {
            description: result?.serverError,
          });
        }
      }}
    >
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input placeholder="https://googleimage.com" {...field} />
            </FormControl>
            <FormDescription>
              Host and use an image. You can use {""}
              <Link href="https://imgur.com/" target="_blank">
                imgur
              </Link>{" "}
              to host your image.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Course name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="## Some title" {...field} />
            </FormControl>
            <FormDescription>Markdown is supported.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit">Submit</Button>
    </Form>
  );
};
