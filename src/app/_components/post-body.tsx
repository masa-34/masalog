import cn from "classnames";
import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
  className?: string;
};

export function PostBody({ content, className }: Props) {
  return (
    <div className={cn("max-w-2xl mx-auto w-full min-w-0", className)}>
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
