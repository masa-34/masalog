import { BlogCardsSection } from "@/app/_components/blog-cards-section";
import Container from "@/app/_components/container";
import {
  categoryFromPathSegment,
  getAllCategories,
  getPostsByCategory,
} from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage(props: Props) {
  const params = await props.params;
  const category = categoryFromPathSegment(params.category);
  const known = getAllCategories();
  if (!known.includes(category)) {
    notFound();
  }

  const posts = getPostsByCategory(category);

  return (
    <main>
      <Container>
        <nav className="mt-8 text-sm text-gray-500 dark:text-slate-500">
          <Link href="/" className="hover:text-indigo-500 dark:hover:text-indigo-400">
            ホーム
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-slate-200">{category}</span>
        </nav>
        <h1 className="mt-4 mb-2 text-4xl font-bold text-gray-900 dark:text-slate-100">
          カテゴリ: {category}
        </h1>
        <p className="mb-8 text-gray-600 dark:text-slate-400">
          {posts.length} 件の記事
        </p>
      </Container>
      <BlogCardsSection posts={posts} heading={`「${category}」の記事`} />
    </main>
  );
}

export async function generateStaticParams() {
  const isProd = process.env.NODE_ENV === "production";
  return getAllCategories().map((category) => ({
    category: isProd ? category : encodeURIComponent(category),
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const category = categoryFromPathSegment(params.category);
  const title = `${category} | ${CMS_NAME}`;
  return { title };
}
