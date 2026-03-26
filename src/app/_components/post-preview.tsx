import { PostDates } from "@/app/_components/post-dates";
import Link from "next/link";
import CoverImage from "./cover-image";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  updatedAt: string;
  excerpt: string;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  updatedAt,
  excerpt,
  slug,
}: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <PostDates date={date} updatedAt={updatedAt} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  );
}
