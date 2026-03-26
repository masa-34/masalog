import { LegalLayout, LegalSection } from "@/app/_components/legal-layout";
import {
  LEGAL_CONTACT,
  LEGAL_LAST_UPDATED,
  LEGAL_OPERATOR_NAME,
  LEGAL_SITE_NAME,
} from "@/lib/legal-site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `プライバシーポリシー | ${LEGAL_SITE_NAME}`,
  description: `${LEGAL_SITE_NAME}の個人情報・Cookie・広告に関する方針`,
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="プライバシーポリシー" lastUpdated={LEGAL_LAST_UPDATED}>
      <p>
        {LEGAL_SITE_NAME}（以下「当サイト」）は、利用者の個人情報の保護に努めます。本ポリシーは、当サイトの利用にあたって収集・利用する情報と、その取扱いについて定めます。
      </p>

      <LegalSection title="1. 運営者">
        <p>
          当サイトは、{LEGAL_OPERATOR_NAME}により運営されています。お問い合わせは{" "}
          <span className="font-medium text-gray-900 dark:text-slate-100">
            {LEGAL_CONTACT}
          </span>{" "}
          までご連絡ください。
        </p>
      </LegalSection>

      <LegalSection title="2. 収集する情報">
        <p>当サイトでは、次の情報を取得する場合があります。</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>アクセス解析</strong>
            ：ページ閲覧に関する統計情報（Cookie、IPアドレス、ブラウザ種別、参照元URL
            等）。個人を特定する目的では使用しません。
          </li>
          <li>
            <strong>お問い合わせ</strong>
            ：ご連絡いただいた際のメールアドレス・お名前・内容など、ご入力いただいた情報。
          </li>
          <li>
            <strong>広告・第三者サービス</strong>
            ：広告配信事業者等が、Cookie 等を用いて利用者の興味に応じた広告を表示するために情報を取得する場合があります。取得・利用は各事業者のポリシーに従います。
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. 利用目的">
        <ul className="list-disc pl-5 space-y-2">
          <li>当サイトの提供・改善・不正利用の防止</li>
          <li>お問い合わせへの対応</li>
          <li>アクセス状況の分析（匿名・統計的な範囲）</li>
          <li>広告の配信・効果測定（第三者広告サービスを利用する場合）</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Cookie について">
        <p>
          当サイトは、利便性向上やアクセス解析、広告配信のために Cookie
          を使用することがあります。ブラウザの設定により Cookie
          を無効にできますが、一部機能が利用できなくなる場合があります。
        </p>
      </LegalSection>

      <LegalSection title="5. 第三者への提供">
        <p>
          法令に基づく場合を除き、本人の同意なく第三者に個人情報を提供しません。広告配信や解析のために、各サービス提供者がポリシーに従いデータを処理する場合があります（例:
          Google アナリティクス、Google AdSense 等を導入する場合）。
        </p>
      </LegalSection>

      <LegalSection title="6. 開示・訂正・削除">
        <p>
          保有する個人情報の開示・訂正・利用停止等のご請求は、上記お問い合わせ先までご連絡ください。本人確認のうえ、合理的な範囲で対応します。
        </p>
      </LegalSection>

      <LegalSection title="7. 本ポリシーの変更">
        <p>
          法令の改正や当サイトの運営に伴い、本ポリシーを変更することがあります。変更後の内容は当ページに掲載した時点から効力を生じます。
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
