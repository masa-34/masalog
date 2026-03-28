import Container from "@/app/_components/container";
import { MasaLogsLogo } from "@/app/_components/masa-logs-logo";
import { ThemeSwitcher } from "@/app/_components/theme-switcher";
import { getAllCategories } from "@/lib/api";
import Link from "next/link";

export default async function Header() {
  const categories = getAllCategories();

  return (
    <header className="shrink-0 border-b border-neutral-200 bg-white/80 text-gray-600 backdrop-blur-sm body-font dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-400">
      <Container>
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:gap-6">
          <Link
            href="/"
            className="flex shrink-0 justify-center title-font font-medium text-gray-900 dark:text-slate-100 md:justify-start"
          >
            <MasaLogsLogo imgClassName="h-10 w-auto max-w-[200px] md:h-11" />
          </Link>
          <nav
            className="flex flex-1 flex-wrap items-center justify-center gap-x-5 gap-y-2 text-base md:justify-start md:border-l md:border-gray-400 md:pl-6 dark:md:border-slate-600"
            aria-label="Main"
          >
            <Link
              href="/posts"
              className="whitespace-nowrap hover:text-gray-900 dark:hover:text-slate-100"
            >
              記事一覧
            </Link>
            {categories.map((name) => (
              <Link
                key={name}
                href={`/categories/${encodeURIComponent(name)}`}
                className="whitespace-nowrap hover:text-gray-900 dark:hover:text-slate-100"
              >
                {name}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 justify-center md:ml-auto md:justify-end">
            <ThemeSwitcher embedded />
          </div>
        </div>
      </Container>
    </header>
  );
}
