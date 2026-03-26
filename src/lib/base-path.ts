const raw = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** ルート相対パス（`/assets/...` など）に basePath を付与 */
export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${raw}${path}`;
}

/**
 * Markdown → HTML 後の、同一オリジン向けルート相対 URL に basePath を付与。
 * GitHub Pages のプロジェクトサイト（`/repo/...`）で画像・内部リンクが切れないようにする。
 */
export function prefixRootRelativeUrlsInHtml(html: string): string {
  if (!raw) return html;
  return html
    .replaceAll(' src="/', ` src="${raw}/`)
    .replaceAll(' href="/', ` href="${raw}/`)
    .replaceAll(' srcset="/', ` srcset="${raw}/`);
}
