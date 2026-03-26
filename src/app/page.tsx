import { BlogCardsSection } from "@/app/_components/blog-cards-section";
import Container from "@/app/_components/container";
import { HomeAbout } from "@/app/_components/home-about";
import { HomeHeroImage } from "@/app/_components/home-hero-image";
import { HomePostsScroll } from "@/app/_components/home-posts-scroll";
import { HomeTagsSection } from "@/app/_components/home-tags-section";
import { Intro } from "@/app/_components/intro";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  if (allPosts.length === 0) {
    return (
      <main>
        <HomePostsScroll />
        <Container>
          <Intro />
          <HomeHeroImage />
          <HomeAbout />
          <p className="mb-16 text-center text-gray-600 dark:text-slate-400">
            `_posts/開発/` などの<strong>カテゴリフォルダの中</strong>に{" "}
            <code className="rounded bg-gray-100 px-1 dark:bg-slate-800">
              .md
            </code>{" "}
            を置くと、ここに表示されます。
          </p>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <HomePostsScroll />
      <Container>
        <Intro />
        <HomeHeroImage />
        <HomeAbout />
      </Container>
      <BlogCardsSection
        posts={allPosts}
        innerClassName="pt-6 pb-12 md:pt-8 md:pb-14"
      />
      <HomeTagsSection />
    </main>
  );
}
