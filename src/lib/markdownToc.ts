import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";
import type { Heading, Root } from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export type MarkdownTocChild = { id: string; title: string };

export type MarkdownTocSection = {
  id: string;
  title: string;
  children: MarkdownTocChild[];
};

export type MarkdownTocData = {
  sections: MarkdownTocSection[];
  looseH3: MarkdownTocChild[];
};

/** `rehype-slug` と同じ slug 順。`##` を節、`###` をその子として抽出 */
export function extractMarkdownTocTree(markdown: string): MarkdownTocData {
  const tree = unified().use(remarkParse).parse(markdown) as Root;
  const slugger = new GithubSlugger();
  const sections: MarkdownTocSection[] = [];
  const looseH3: MarkdownTocChild[] = [];
  let current: MarkdownTocSection | null = null;

  visit(tree, "heading", (node: Heading) => {
    const text = toString(node).trim();
    if (!text) return;
    const id = slugger.slug(text);

    if (node.depth === 2) {
      current = { id, title: text, children: [] };
      sections.push(current);
    } else if (node.depth === 3) {
      const child: MarkdownTocChild = { id, title: text };
      if (current) {
        current.children.push(child);
      } else {
        looseH3.push(child);
      }
    }
  });

  return { sections, looseH3 };
}
