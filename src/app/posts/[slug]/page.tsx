import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import { extractMarkdownTocTree } from "@/lib/markdownToc";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { PostToc } from "@/app/_components/post-toc";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const raw = post.content || "";
  const toc = extractMarkdownTocTree(raw);
  const content = await markdownToHtml(raw);

  return (
    <main>
      <Alert preview={post.preview} />
      <Container>
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            updatedAt={post.updatedAt}
            tags={post.tags}
          />
          {/*
            タイトル・カバーは従来どおり全幅。本文列だけ左右 1fr の余白に挟み、
            右の余白に目次（記事本文の max-w-2xl 位置は従来と同じ中央寄せ）。
          */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,42rem)_1fr] lg:items-start">
            <div className="hidden min-w-0 lg:block" aria-hidden />
            <div className="min-w-0">
              <PostBody content={content} className="mx-0 max-w-none" />
            </div>
            <aside className="hidden min-w-0 lg:block">
              <div className="sticky top-28 max-w-[17rem] pl-4 pr-1">
                <PostToc toc={toc} />
              </div>
            </aside>
          </div>
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
