export const THEME_STORAGE_KEY = "nextjs-blog-starter-theme";

/**
 * Injected via next/script (beforeInteractive). Do not call from Node —
 * only `.toString()` is used on the server.
 */
export const NoFOUCScript = (storageKey: string) => {
  const DARK = "dark";
  const LIGHT = "light";

  const modifyTransition = () => {
    const css = document.createElement("style");
    css.textContent = "*,*:after,*:before{transition:none !important;}";
    document.head.appendChild(css);

    return () => {
      getComputedStyle(document.body);
      setTimeout(() => document.head.removeChild(css), 1);
    };
  };

  const media = matchMedia(`(prefers-color-scheme: ${DARK})`);

  window.updateDOM = () => {
    const restoreTransitions = modifyTransition();
    const raw = localStorage.getItem(storageKey);
    const mode =
      raw === DARK || raw === LIGHT
        ? raw
        : media.matches
          ? DARK
          : LIGHT;
    const classList = document.documentElement.classList;
    if (mode === DARK) classList.add(DARK);
    else classList.remove(DARK);
    document.documentElement.setAttribute("data-mode", mode);
    restoreTransitions();
  };
  window.updateDOM();
};

declare global {
  interface Window {
    updateDOM?: () => void;
  }
}
