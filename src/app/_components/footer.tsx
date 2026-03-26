import { LEGAL_SITE_NAME } from "@/lib/legal-site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-gray-600 body-font dark:text-slate-400">
      <div className="container px-5 py-12 mx-auto">
        <div className="text-center md:text-left">
          <Link
            href="/"
            className="inline-flex title-font font-medium items-center text-gray-900 dark:text-slate-100"
          >
            <img
              src="/assets/blog/logs.png"
              alt="masaLogs"
              className="h-10 w-auto max-w-[200px] object-contain object-left"
              width={200}
              height={60}
            />
          </Link>
          <p className="mt-2 text-sm text-gray-500 dark:text-slate-500">
            システムエンジニアのメモブログ
          </p>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
        {/* 収益化で表示する: 下の div ～ nav ブロックを囲むコメント開始行と終了行を削除 */}
        {/*
        <div className="container mx-auto px-5 pt-4 pb-2">
          <nav
            className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600 sm:justify-start dark:text-slate-400"
            aria-label="法務・ポリシー"
          >
            <Link
              href="/privacy"
              className="hover:text-indigo-600 hover:underline dark:hover:text-indigo-400"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/terms"
              className="hover:text-indigo-600 hover:underline dark:hover:text-indigo-400"
            >
              利用規約
            </Link>
            <Link
              href="/disclosure"
              className="hover:text-indigo-600 hover:underline dark:hover:text-indigo-400"
            >
              広告・免責・アフィリエイト
            </Link>
            <Link
              href="/tokusho"
              className="hover:text-indigo-600 hover:underline dark:hover:text-indigo-400"
            >
              特定商取引法に基づく表記
            </Link>
          </nav>
        </div>
        */}
        <div className="container mx-auto border-t border-gray-200/80 px-5 py-3 dark:border-slate-700/80">
          <p className="text-center text-sm text-gray-500 dark:text-slate-500 sm:text-left">
            © {new Date().getFullYear()} {LEGAL_SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
