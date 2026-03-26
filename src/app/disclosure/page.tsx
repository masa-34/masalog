import { LegalLayout, LegalSection } from "@/app/_components/legal-layout";
import {
  LEGAL_CONTACT,
  LEGAL_LAST_UPDATED,
  LEGAL_SITE_NAME,
} from "@/lib/legal-site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `広告・免責・アフィリエイト | ${LEGAL_SITE_NAME}`,
  description: `${LEGAL_SITE_NAME}の広告表示・アフィリエイト・免責の考え方`,
};

export default function DisclosurePage() {
  return (
    <LegalLayout
      title="広告・免責・アフィリエイトについて"
      lastUpdated={LEGAL_LAST_UPDATED}
    >
      <p>
        {LEGAL_SITE_NAME}
        （以下「当サイト」）は、収益化の一環として、第三者による広告の掲載やアフィリエイトプログラムの利用を行う場合があります。利用者の皆様に誤解のないよう、方針を明示します。
      </p>

      <LegalSection title="1. 広告について">
        <p>
          当サイトには、Google AdSense
          等の第三者広告ネットワークによる広告が表示されることがあります。これらの広告配信事業者は、利用者の興味に応じた広告を表示するために
          Cookie
          を使用することがあります。パーソナライズド広告の無効化については、各事業者が提供するオプトアウト手段や、ブラウザの設定をご利用ください。
        </p>
        <p className="text-gray-600 dark:text-slate-400">
          ※ 実際に導入する広告サービス名・リンクは、契約後に本ページへ追記してください。
        </p>
      </LegalSection>

      <LegalSection title="2. アフィリエイト（成果報酬型広告）について">
        <p>
          当サイトの記事には、商品・サービスへのリンクが含まれる場合があります。当該リンクがアフィリエイトプログラムに基づくものである場合、利用者がリンク経由で購入等を行ったときに、運営者に紹介料が支払われることがあります。
        </p>
        <p>
          アフィリエイトによる紹介は、記事の内容や評価を不当に歪めるものではないよう努めますが、最終的な購入・契約の判断は利用者ご自身の責任で行ってください。
        </p>
      </LegalSection>

      <LegalSection title="3. 情報の正確性">
        <p>
          当サイトの情報は、公開時点のものです。価格・仕様・法規制等は変更される場合があります。重要な判断を行う前には、必ず公式情報をご確認ください。
        </p>
      </LegalSection>

      <LegalSection title="4. 免責">
        <p>
          当サイトの利用により生じた損害（間接損害・逸失利益等を含む）について、運営者に故意または重過失がある場合を除き、一切の責任を負いません。
        </p>
      </LegalSection>

      <LegalSection title="5. お問い合わせ">
        <p>本ページに関するお問い合わせ: {LEGAL_CONTACT}</p>
      </LegalSection>
    </LegalLayout>
  );
}
