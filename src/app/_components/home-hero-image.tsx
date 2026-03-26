import CoverImage from "@/app/_components/cover-image";

/** トップページ用のメインビジュアル（従来のヒローと同じ `/assets/blog/icon.png`） */
export function HomeHeroImage() {
  return (
    <div className="mb-8 md:mb-16 sm:mx-0">
      <CoverImage
        title="masaLogs"
        src="/assets/blog/icon.png"
        priority
      />
    </div>
  );
}
