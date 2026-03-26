import { format, isSameDay, parseISO } from "date-fns";

function formatYmd(iso: string) {
  return format(parseISO(iso), "yyyy/MM/dd");
}

type Props = {
  date: string;
  updatedAt: string;
  className?: string;
  /** カードなど狭いレイアウト用の 1 行寄り表示 */
  compact?: boolean;
};

/**
 * フロントマターの date（公開）と、ビルド時に付与した updatedAt（更新）を表示する。
 * 同一日付なら 1 行にまとめる。
 */
export function PostDates({ date, updatedAt, className = "", compact }: Props) {
  const pub = formatYmd(date);
  const upd = formatYmd(updatedAt);
  const sameCalendarDay = isSameDay(parseISO(date), parseISO(updatedAt));

  if (sameCalendarDay) {
    return (
      <p className={`text-gray-500 dark:text-slate-500 ${className}`}>
        <time dateTime={date}>{pub}</time>
        <span className="text-sm">（公開・更新）</span>
      </p>
    );
  }

  if (compact) {
    return (
      <p className={`text-sm text-gray-500 dark:text-slate-500 ${className}`}>
        <span>
          公開 <time dateTime={date}>{pub}</time>
        </span>
        <span className="mx-1.5">·</span>
        <span>
          更新 <time dateTime={updatedAt}>{upd}</time>
        </span>
      </p>
    );
  }

  return (
    <div className={`text-gray-600 dark:text-slate-400 ${className}`}>
      <p className="mb-1">
        公開日{" "}
        <time dateTime={date} className="font-medium text-gray-900 dark:text-slate-200">
          {pub}
        </time>
      </p>
      <p>
        更新日{" "}
        <time
          dateTime={updatedAt}
          className="font-medium text-gray-900 dark:text-slate-200"
        >
          {upd}
        </time>
      </p>
    </div>
  );
}
