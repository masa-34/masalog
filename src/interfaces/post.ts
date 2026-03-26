export type Post = {
  slug: string;
  title: string;
  /**
   * 公開日の表示に使用。フロントマターで省略・空・`auto` のときは
   * Git の初回追加コミット日時（なければファイルの作成日時／更新日時）から自動。
   */
  date: string;
  /** ビルド時に Git / ファイル更新日時から自動付与（ISO 8601） */
  updatedAt: string;
  coverImage: string;
  /** フロントマター `category`（未指定時は「未分類」） */
  category: string;
  /** フロントマター `tags`（省略時は空配列） */
  tags: string[];
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
};
