"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { lessonActionEdit } from "../lesson.action";
import { LESSON_STATE, LessonDetailsSchema } from "./lesson.schema";

import { Button } from "@/components/ui/button";

export type LessonDetailsFormProps = {
  defaultValue?: LessonDetailsSchema & {
    id: string;
  };
};

export const LessonDetailsForm = ({ defaultValue }: LessonDetailsFormProps) => {
  const form = useZodForm({
    schema: LessonDetailsSchema,
    defaultValues: defaultValue || {
      name: "",
      state: "PUBLISHED",
    },
  });

  const router = useRouter();

  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        if (defaultValue?.id) {
          const result = await lessonActionEdit({
            lessonId: defaultValue.id,
            data: values,
          });

          if (result?.data) {
            toast.success(result.data.message);
            router.refresh();
            return;
          }

          toast.error("Some error occured", {
            description: result?.serverError,
          });
          return;
        }
      }}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Lesson name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>

            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {LESSON_STATE.map((state) => (
                  <SelectItem key={state} value={state} className="capitalize">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />

      <Button className="mt-3 w-full" type="submit">
        Submit
      </Button>
    </Form>
  );
};
