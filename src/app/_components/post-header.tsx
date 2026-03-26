import { PostDates } from "@/app/_components/post-dates";
import { PostTags } from "@/app/_components/post-tags";
import { PostTitle } from "@/app/_components/post-title";
import CoverImage from "./cover-image";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  updatedAt: string;
  tags?: string[];
};

export function PostHeader({
  title,
  coverImage,
  date,
  updatedAt,
  tags = [],
}: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="mx-auto mb-6 max-w-2xl">
        <div className="mb-4 text-lg">
          <PostDates date={date} updatedAt={updatedAt} />
        </div>
        <PostTags tags={tags} />
      </div>
    </>
  );
}
