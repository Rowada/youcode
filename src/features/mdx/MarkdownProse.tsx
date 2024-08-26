import Markdown from "react-markdown";

export type MarkdownProseProps = {
  children: string;
};

export const MarkdownProse = ({ children }: MarkdownProseProps) => {
  return (
    <Markdown className="prose dark:prose-invert lg:prose-lg">
      {children}
    </Markdown>
  );
};
