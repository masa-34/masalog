import { getAllPosts, getAllTags } from "@/lib/api";
import Link from "next/link";

/** トップページ用：記事一覧の下に出すタグ一覧 */
export function HomeTagsSection() {
  const tags = getAllTags();
  if (tags.length === 0) {
    return null;
  }

  const countByTag = new Map<string, number>();
  for (const p of getAllPosts()) {
    for (const t of p.tags) {
      countByTag.set(t, (countByTag.get(t) ?? 0) + 1);
    }
  }

  return (
    <section
      className="border-t border-gray-200 text-gray-600 body-font dark:border-slate-700 dark:text-slate-400"
      aria-labelledby="home-tags-heading"
    >
      <div className="container mx-auto px-5 pb-20 pt-10 md:pb-24 md:pt-12">
        <h2
          id="home-tags-heading"
          className="mb-2 text-2xl font-bold text-gray-900 dark:text-slate-100"
        >
          タグ
        </h2>
        <p className="mb-6 text-sm text-gray-600 dark:text-slate-400">
          クリックでそのタグの記事一覧へ移動します。
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
          {tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/tags/${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-800 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300"
              >
                {tag}
                <span className="text-xs font-normal text-gray-500 dark:text-slate-400">
                  {countByTag.get(tag) ?? 0}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
