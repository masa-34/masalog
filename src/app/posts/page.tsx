import { BlogCardsSection } from "@/app/_components/blog-cards-section";
import Container from "@/app/_components/container";
import { CMS_NAME } from "@/lib/constants";
import { getAllPosts } from "@/lib/api";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `記事一覧 | ${CMS_NAME}`,
};

export default function AllPostsPage() {
  const posts = getAllPosts();

  return (
    <main>
      <Container>
        <nav className="mt-8 text-sm text-gray-500 dark:text-slate-500">
          <Link href="/" className="hover:text-indigo-500 dark:hover:text-indigo-400">
            ホーム
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-slate-200">記事一覧</span>
        </nav>
        <h1 className="mt-4 mb-2 text-4xl font-bold text-gray-900 dark:text-slate-100">
          記事一覧
        </h1>
        <p className="mb-8 text-gray-600 dark:text-slate-400">
          全 {posts.length} 件
        </p>
      </Container>
      <BlogCardsSection posts={posts} heading="すべての記事" />
    </main>
  );
}
