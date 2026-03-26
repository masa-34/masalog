"use client";

import type { MarkdownTocData } from "@/lib/markdownToc";
import type { MouseEvent } from "react";

type Props = {
  toc: MarkdownTocData;
};

function scrollToHeading(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  el.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });

  window.history.replaceState(null, "", `#${id}`);
}

function handleTocClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  scrollToHeading(id);
}

export function PostToc({ toc }: Props) {
  const { sections, looseH3 } = toc;
  if (sections.length === 0 && looseH3.length === 0) {
    return null;
  }

  const link =
    "text-indigo-600 hover:text-indigo-800 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300";

  return (
    <nav
      aria-label="この記事の目次"
      className="rounded-lg border border-gray-200 bg-white/90 p-4 text-sm shadow-sm backdrop-blur-sm dark:border-slate-600 dark:bg-slate-900/90"
    >
      <p className="mb-3 font-semibold text-gray-900 dark:text-slate-100">
        目次
      </p>
      <ul className="m-0 list-none space-y-3 p-0">
        {looseH3.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`${link} text-xs`}
              onClick={(e) => handleTocClick(e, item.id)}
            >
              {item.title}
            </a>
          </li>
        ))}
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`${link} font-medium`}
              onClick={(e) => handleTocClick(e, section.id)}
            >
              {section.title}
            </a>
            {section.children.length > 0 && (
              <ul className="m-0 mt-2 list-none space-y-2 border-l border-gray-200 py-0 pl-3 dark:border-slate-600">
                {section.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#${child.id}`}
                      className={`${link} text-xs`}
                      onClick={(e) => handleTocClick(e, child.id)}
                    >
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
