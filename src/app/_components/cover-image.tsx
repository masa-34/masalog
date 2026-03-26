import cn from "classnames";
import { withBasePath } from "@/lib/base-path";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
  /** ファーストビュー用（LCP 画像など） */
  priority?: boolean;
};

const CoverImage = ({ title, src, slug, priority }: Props) => {
  const image = (
    <Image
      src={withBasePath(src)}
      alt={`Cover Image for ${title}`}
      priority={priority}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={1300}
      height={630}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
