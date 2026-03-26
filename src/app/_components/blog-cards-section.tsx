import { PostDates } from "@/app/_components/post-dates";
import { PostTags } from "@/app/_components/post-tags";
import type { Post } from "@/interfaces/post";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

function LearnMoreIcon() {
  return (
    <svg
      className="w-4 h-4 ml-2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

type Props = {
  posts: Post[];
  /** セクション見出し（省略時は「記事一覧」） */
  heading?: string;
  /** 内側コンテナのクラス（例: トップで `pt` を詰める） */
  innerClassName?: string;
};

export function BlogCardsSection({
  posts,
  heading = "記事一覧",
  innerClassName,
}: Props) {
  if (posts.length === 0) {
    return (
      <section className="text-gray-600 body-font dark:text-slate-400">
        <div className="container px-5 py-16 mx-auto">
          <p className="text-center text-gray-500 dark:text-slate-500">
            この条件の記事はまだありません。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="text-gray-600 body-font dark:text-slate-400" id="posts">
      <div
        className={cn("container mx-auto px-5 py-24", innerClassName)}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-10">
          {heading}
        </h2>
        <div className="flex flex-wrap -m-4">
          {posts.map((post) => (
            <div key={post.slug} className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 dark:border-slate-600 dark:border-opacity-60 rounded-lg overflow-hidden">
                <Link href={`/posts/${post.slug}`} className="block">
                  <Image
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src={post.coverImage}
                    alt=""
                    width={720}
                    height={400}
                  />
                </Link>
                <div className="p-6">
                  <Link
                    href={`/categories/${encodeURIComponent(post.category)}`}
                    className="tracking-widest text-xs title-font font-medium text-indigo-500 dark:text-indigo-400 mb-1 inline-block hover:underline"
                  >
                    {post.category}
                  </Link>
                  <h3 className="title-font text-lg font-medium text-gray-900 dark:text-slate-100 mb-2">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <PostDates
                    date={post.date}
                    updatedAt={post.updatedAt}
                    compact
                    className="mb-2"
                  />
                  <PostTags tags={post.tags} className="mb-3" />
                  <p className="leading-relaxed mb-3 line-clamp-4">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-indigo-500 dark:text-indigo-400 inline-flex items-center"
                  >
                    続きを読む
                    <LearnMoreIcon />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
