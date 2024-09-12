import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/Typography";
import { AdminLessonListType } from "./lessons.query";
import Link from "next/link";

export type AdminLessonListProps = {
  lesson: AdminLessonListType;
};

export const AdminLessonList = (props: AdminLessonListProps) => {
  return (
    <Link
      href={`/admin/courses/${props.lesson.courseId}/lessons/${props.lesson.id}`}
    >
      <div className="flex items-center rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
        <Typography variant={"large"}>{props.lesson.name}</Typography>
        <Badge className="ml-auto">{props.lesson.state}</Badge>
      </div>
    </Link>
  );
};
