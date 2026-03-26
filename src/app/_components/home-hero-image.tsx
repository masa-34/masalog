import CoverImage from "@/app/_components/cover-image";

import { HOME_HERO_IMAGE_PATH } from "@/lib/constants";

/** トップページ用のメインビジュアル（ファビコンと同じ画像） */
export function HomeHeroImage() {
  return (
    <div className="mb-8 md:mb-16 sm:mx-0">
      <CoverImage
        title="masaLogs"
        src={HOME_HERO_IMAGE_PATH}
        priority
      />
    </div>
  );
}
