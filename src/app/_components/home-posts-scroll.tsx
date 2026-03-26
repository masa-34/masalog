"use client";

import { useEffect } from "react";

/**
 * 旧 URL `/#posts` 用: ハッシュを `/` に直し、トップの一覧セクションへスクロール。
 */
export function HomePostsScroll() {
  useEffect(() => {
    if (window.location.hash !== "#posts") return;
    window.history.replaceState(null, "", "/");
    requestAnimationFrame(() => {
      document.getElementById("posts")?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return null;
}
