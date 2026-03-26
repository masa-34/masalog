import { LegalLayout, LegalSection } from "@/app/_components/legal-layout";
import {
  LEGAL_CONTACT,
  LEGAL_LAST_UPDATED,
  LEGAL_OPERATOR_NAME,
  LEGAL_SITE_NAME,
} from "@/lib/legal-site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `利用規約 | ${LEGAL_SITE_NAME}`,
  description: `${LEGAL_SITE_NAME}のご利用条件`,
};

export default function TermsPage() {
  return (
    <LegalLayout title="利用規約" lastUpdated={LEGAL_LAST_UPDATED}>
      <p>
        本規約は、{LEGAL_SITE_NAME}（以下「当サイト」）の利用条件を定めるものです。当サイトを利用された時点で、本規約に同意したものとみなします。
      </p>

      <LegalSection title="1. 適用">
        <p>
          当サイトは、{LEGAL_OPERATOR_NAME}
          が運営します。本規約に付帯するガイドライン等は、本規約の一部を構成します。
        </p>
      </LegalSection>

      <LegalSection title="2. 禁止事項">
        <p>利用者は、当サイトの利用にあたり、次の行為をしてはなりません。</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>法令または公序良俗に違反する行為</li>
          <li>当サイトまたは第三者のサーバ・ネットワークに不当な負荷を与える行為</li>
          <li>当サイトの内容の無断複製・転載・改変（引用の範囲を超える場合）</li>
          <li>運営者・第三者を誹謗中傷し、または虚偽の情報を流布する行為</li>
          <li>その他、運営者が不適切と判断する行為</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. 著作権">
        <p>
          当サイトに掲載する文章・画像・デザイン等の著作権は、運営者または正当な権利者に帰属します。私的利用の範囲を超える利用には、事前の許可が必要です。
        </p>
      </LegalSection>

      <LegalSection title="4. 外部リンク">
        <p>
          当サイトから第三者のウェブサイトへリンクしている場合があります。リンク先の内容・サービス・プライバシー方針について、当サイトは責任を負いません。
        </p>
      </LegalSection>

      <LegalSection title="5. 免責事項">
        <p>
          当サイトの情報は可能な限り正確であるよう努めますが、その完全性・正確性・有用性等について保証するものではありません。当サイトの利用により生じたいかなる損害についても、運営者に故意または重過失がある場合を除き、責任を負いません。
        </p>
      </LegalSection>

      <LegalSection title="6. 広告・アフィリエイト">
        <p>
          当サイトは、広告表示やアフィリエイトプログラムを利用する場合があります。詳細は
          <a
            href="/disclosure"
            className="text-indigo-600 dark:text-indigo-400 underline"
          >
            広告・免責・アフィリエイトについて
          </a>
          をご確認ください。
        </p>
      </LegalSection>

      <LegalSection title="7. 規約の変更">
        <p>
          運営者は、必要に応じて本規約を変更できます。変更後の規約は、当ページに掲載した時点から効力を生じます。
        </p>
      </LegalSection>

      <LegalSection title="8. 準拠法・管轄">
        <p>
          本規約は日本法に準拠します。当サイトに関して紛争が生じた場合、運営者の所在地を管轄する裁判所を第一審の専属的合意管轄とします（個人ブログの場合は実情に合わせて調整してください）。
        </p>
      </LegalSection>

      <LegalSection title="9. お問い合わせ">
        <p>{LEGAL_CONTACT}</p>
      </LegalSection>
    </LegalLayout>
  );
}
