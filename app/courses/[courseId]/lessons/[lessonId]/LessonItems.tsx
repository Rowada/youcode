import { CheckCircle, Circle, CircleDashed } from "lucide-react";
import { CourseLessonItem } from "../../course.query";
import Link from "next/link";
import { Typography } from "@/components/ui/Typography";

export type LessonItemProps = {
  lesson: CourseLessonItem;
};

export const getLessonIcon = (status: CourseLessonItem["progress"]) => {
  switch (status) {
    case "COMPLETED":
      return CheckCircle;
    case "IN_PROGRESS":
      return Circle;

    default:
      return CircleDashed;
  }

  // if (status === "COMPLETED") {
  //   return CheckCircle;
  // }

  // if (status === "IN_PROGRESS") {
  //   return Circle;
  // }
  // return CircleDashed;
};

export const LessonItem = ({ lesson }: LessonItemProps) => {
  const Icon = getLessonIcon(lesson.progress);
  return (
    <Link href={`/courses/${lesson.courseId}/lessons/${lesson.id}`}>
      <div className="flex items-center gap-3 rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
        <Icon size={16} />
        <Typography variant="small" className="flex-1">
          {lesson.name}
        </Typography>
      </div>
    </Link>
  );
};
