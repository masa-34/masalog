import { execFileSync } from "child_process";
import fs from "fs";
import { relative, sep } from "path";

/**
 * フロントマターの `date` を解決する。
 * - 有効な日付文字列 → そのまま ISO に正規化
 * - 未指定・空・`auto`（大文字小文字無視）→ 下記の推定値
 *
 * 推定: 1) Git でファイルが追加されたコミット日時（--diff-filter=A）
 *       2) 取れなければ birthtime、それも無ければ mtime
 */
export function resolveMarkdownPublishedAtIso(
  fullPath: string,
  frontmatterDate: unknown,
): string {
  if (frontmatterDate instanceof Date) {
    const t = frontmatterDate.getTime();
    if (!Number.isNaN(t)) return frontmatterDate.toISOString();
  }
  if (typeof frontmatterDate === "number" && Number.isFinite(frontmatterDate)) {
    return new Date(frontmatterDate).toISOString();
  }
  if (typeof frontmatterDate === "string") {
    const s = frontmatterDate.trim();
    if (s && s.toLowerCase() !== "auto") {
      const t = Date.parse(s);
      if (!Number.isNaN(t)) return new Date(t).toISOString();
    }
  }
  return inferPublishedAtFromFile(fullPath);
}

function inferPublishedAtFromFile(fullPath: string): string {
  const rel = relative(process.cwd(), fullPath).split(sep).join("/");
  try {
    const out = execFileSync(
      "git",
      [
        "log",
        "--diff-filter=A",
        "--follow",
        "--format=%cI",
        "-1",
        "--",
        rel,
      ],
      {
        encoding: "utf-8",
        cwd: process.cwd(),
        stdio: ["ignore", "pipe", "ignore"],
      },
    ).trim();
    if (out) return out;
  } catch {
    /* 同上 */
  }
  const st = fs.statSync(fullPath);
  if (st.birthtimeMs > 0) return st.birthtime.toISOString();
  return st.mtime.toISOString();
}

/**
 * 記事 .md の「更新日時」。
 * 1. Git で最終コミット日時（本番ビルドで信頼できる）
 * 2. 取れない場合はファイルの mtime（未コミットや Git なしのローカル向け）
 */
export function getMarkdownUpdatedAtIso(fullPath: string): string {
  const rel = relative(process.cwd(), fullPath).split(sep).join("/");
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", rel],
      {
        encoding: "utf-8",
        cwd: process.cwd(),
        stdio: ["ignore", "pipe", "ignore"],
      },
    ).trim();
    if (out) return out;
  } catch {
    /* リポジトリ外・Git 未インストールなど */
  }
  return fs.statSync(fullPath).mtime.toISOString();
}
