import cn from "classnames";
import Link from "next/link";

type Props = {
  tags: string[];
  className?: string;
};

export function PostTags({ tags, className }: Props) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul
      className={cn(
        "m-0 flex list-none flex-wrap gap-2 p-0",
        className,
      )}
      aria-label="タグ"
    >
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/tags/${encodeURIComponent(tag)}`}
            className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 transition-colors hover:bg-indigo-100 hover:text-indigo-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
