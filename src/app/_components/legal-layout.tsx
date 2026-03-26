import Container from "@/app/_components/container";
import Link from "next/link";

type Props = {
  title: string;
  /** 制定日・最終更新（省略可） */
  lastUpdated?: string;
  children: React.ReactNode;
};

export function LegalLayout({ title, lastUpdated, children }: Props) {
  return (
    <main>
      <Container>
        <nav className="mt-8 text-sm text-gray-500 dark:text-slate-500">
          <Link href="/" className="hover:text-indigo-500 dark:hover:text-indigo-400">
            ホーム
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-slate-200">{title}</span>
        </nav>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
          {title}
        </h1>
        {lastUpdated ? (
          <p className="mt-2 text-sm text-gray-500 dark:text-slate-500">
            制定・最終更新: {lastUpdated}
          </p>
        ) : null}
        <article className="max-w-3xl mt-10 pb-20 space-y-8 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
          {children}
        </article>
      </Container>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 border-b border-gray-200 dark:border-slate-600 pb-2">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
