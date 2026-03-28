import { withBasePath } from "@/lib/base-path";
import cn from "classnames";

type Props = {
  /** img に付与（サイズ・配置など） */
  imgClassName?: string;
  className?: string;
};

/**
 * logs.png は白背景のため、ダークモードでは #94A3B8 を敷き multiply で白を置き換える。
 */
export function MasaLogsLogo({ imgClassName, className }: Props) {
  return (
    <span
      className={cn(
        "inline-block dark:isolate dark:rounded-sm dark:bg-[#94A3B8]",
        className,
      )}
    >
      <img
        src={withBasePath("/assets/blog/logs.png")}
        alt="masaLogs"
        className={cn("object-contain object-left dark:mix-blend-multiply", imgClassName)}
        width={200}
        height={60}
      />
    </span>
  );
}
