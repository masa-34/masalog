import { Post } from "@/interfaces/post";
import {
  getMarkdownUpdatedAtIso,
  resolveMarkdownPublishedAtIso,
} from "@/lib/postUpdatedAt";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

/** フロントマターに category がないとき */
export const DEFAULT_POST_CATEGORY = "未分類";

/** `_posts/カテゴリ名/記事.md` を走査（`_` 始まりディレクトリは除外） */
export function discoverMarkdownPosts(): { slug: string; fullPath: string }[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const results: { slug: string; fullPath: string }[] = [];
  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    if (ent.name.startsWith("_") || ent.name.startsWith(".")) continue;
    const subDir = join(postsDirectory, ent.name);
    let files: string[];
    try {
      files = fs.readdirSync(subDir);
    } catch {
      continue;
    }
    for (const file of files) {
      if (
        file.endsWith(".md") &&
        !file.startsWith("_") &&
        file.toLowerCase() !== "readme.md"
      ) {
        const slug = file.replace(/\.md$/, "");
        results.push({ slug, fullPath: join(subDir, file) });
      }
    }
  }
  return results;
}

/** 毎回構築（開発時の HMR／ファイル変更でキャッシュが古くなるのを防ぐ） */
function getSlugPathMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const { slug, fullPath } of discoverMarkdownPosts()) {
    if (map.has(slug)) {
      throw new Error(
        `記事のスラッグ "${slug}" が重複しています。フォルダをまたいでもファイル名（拡張子除く）は一意にしてください。`,
      );
    }
    map.set(slug, fullPath);
  }
  return map;
}

export function getPostSlugs() {
  return discoverMarkdownPosts().map(({ slug }) => `${slug}.md`);
}

function normalizeCategory(value: unknown): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  return DEFAULT_POST_CATEGORY;
}

/** `tags: [a, b]` または `tags: "a, b"` などを正規化（重複除去・順序維持） */
function normalizeTags(value: unknown): string[] {
  if (value == null) return [];
  if (typeof value === "string") {
    const parts = value
      .split(/[,，、]/)
      .map((s) => s.trim())
      .filter(Boolean);
    return [...new Set(parts)];
  }
  if (Array.isArray(value)) {
    const parts: string[] = [];
    for (const item of value) {
      if (typeof item === "string" && item.trim()) {
        parts.push(item.trim());
      }
    }
    return [...new Set(parts)];
  }
  return [];
}

function readPostFromPath(slug: string, fullPath: string): Post {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const category = normalizeCategory(data.category);
  const tags = normalizeTags(data.tags);
  const updatedAt = getMarkdownUpdatedAtIso(fullPath);
  const date = resolveMarkdownPublishedAtIso(fullPath, data.date);
  return { ...data, slug, content, category, tags, date, updatedAt } as Post;
}

export function getPostBySlug(slug: string): Post | undefined {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = getSlugPathMap().get(realSlug);
  if (!fullPath) return undefined;
  return readPostFromPath(realSlug, fullPath);
}

export function getAllPosts(): Post[] {
  const map = getSlugPathMap();
  const posts = [...map.entries()].map(([slug, fullPath]) =>
    readPostFromPath(slug, fullPath),
  );
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** 記事からユニークなカテゴリ一覧（表示用・ソート済み） */
export function getAllCategories(): string[] {
  const names = new Set(getAllPosts().map((p) => p.category));
  return [...names].sort((a, b) => a.localeCompare(b, "ja"));
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function categoryFromPathSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/** 記事からユニークなタグ一覧（表示用・ソート済み） */
export function getAllTags(): string[] {
  const names = new Set<string>();
  for (const p of getAllPosts()) {
    for (const t of p.tags) {
      names.add(t);
    }
  }
  return [...names].sort((a, b) => a.localeCompare(b, "ja"));
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function tagFromPathSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}
