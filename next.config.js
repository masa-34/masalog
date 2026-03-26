/** @type {import('next').NextConfig} */

// GitHub Pages の「プロジェクトサイト」用（例: https://user.github.io/masalog/）
// ルートドメインのみ（user.github.io のリポジトリ名が user.github.io の場合）は未設定のまま。
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  output: "export",
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: {
    // 静的エクスポートでは画像最適化 API が使えないため必須
    unoptimized: true,
  },
};

module.exports = nextConfig;
