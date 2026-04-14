import Footer from "@/app/_components/footer";
import { CMS_NAME, HOME_HERO_IMAGE_PATH, HOME_OG_IMAGE_URL } from "@/lib/constants";
import { withBasePath } from "@/lib/base-path";
import { NoFOUCScript, THEME_STORAGE_KEY } from "@/lib/theme-init";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import Script from "next/script";
import Header from "./_components/header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: CMS_NAME,
  description: `${CMS_NAME} — システムエンジニアのメモブログ`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          href={withBasePath(HOME_HERO_IMAGE_PATH)}
        />
        <link
          rel="icon"
          type="image/png"
          href={withBasePath(HOME_HERO_IMAGE_PATH)}
        />
        <link rel="manifest" href={withBasePath("/favicon/site.webmanifest")} />
        <link rel="shortcut icon" href={withBasePath(HOME_HERO_IMAGE_PATH)} />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content={withBasePath("/favicon/browserconfig.xml")}
        />
        <meta name="theme-color" content="#000" />
        <link
          rel="alternate"
          type="application/rss+xml"
          href={withBasePath("/feed.xml")}
        />
      </head>
      <body
        className={cn(
          inter.className,
          "flex min-h-screen flex-col overflow-x-hidden dark:bg-slate-900 dark:text-slate-400",
        )}
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(${NoFOUCScript.toString()})(${JSON.stringify(THEME_STORAGE_KEY)})`,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M337E1EMWK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M337E1EMWK');
          `}
        </Script>
        <Header />
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
