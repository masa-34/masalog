import { LegalLayout, LegalSection } from "@/app/_components/legal-layout";
import {
  LEGAL_ADDRESS,
  LEGAL_CONTACT,
  LEGAL_LAST_UPDATED,
  LEGAL_OPERATOR_NAME,
  LEGAL_SITE_NAME,
} from "@/lib/legal-site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `特定商取引法に基づく表記 | ${LEGAL_SITE_NAME}`,
  description: `${LEGAL_SITE_NAME}の特定商取引法に基づく表記`,
};

export default function TokushoPage() {
  return (
    <LegalLayout
      title="特定商取引法に基づく表記"
      lastUpdated={LEGAL_LAST_UPDATED}
    >
      <p>
        「特定商取引に関する法律」に基づき、当サイトで<strong>通信販売（商品の販売や有料サービスの提供）</strong>
        を行う場合に必要となる情報を以下に示します。現時点で当サイトが直接、商品・有料デジタルコンテンツ等の販売を行っていない場合でも、今後行う場合に備えた枠としてご利用ください。
      </p>

      <LegalSection title="販売事業者名">
        <p>{LEGAL_OPERATOR_NAME}</p>
      </LegalSection>

      <LegalSection title="運営責任者">
        <p>{LEGAL_OPERATOR_NAME}</p>
      </LegalSection>

      <LegalSection title="所在地">
        <p>
          {LEGAL_ADDRESS}
          <br />
          <span className="text-gray-500 dark:text-slate-500 text-xs">
            ※
            電話での問い合わせを受け付けない場合、法令上は請求があれば遅滞なく開示する方法で住所を示すことが認められる場合があります。個人の住所公開を避ける運用をする場合は、弁護士等にご相談のうえ表記を調整してください。
          </span>
        </p>
      </LegalSection>

      <LegalSection title="電話番号">
        <p>
          （電話対応を行う場合は番号を記載。行わない場合は「お問い合わせはメールにて」等とし、法令に照らして整理してください）
        </p>
      </LegalSection>

      <LegalSection title="メールアドレス">
        <p>{LEGAL_CONTACT}</p>
      </LegalSection>

      <LegalSection title="商品代金以外の必要料金">
        <p>
          消費税、送料、振込手数料等（販売形態に応じて記載）
        </p>
      </LegalSection>

      <LegalSection title="代金の支払時期・方法">
        <p>（クレジットカード決済、銀行振込等、実際の方法を記載）</p>
      </LegalSection>

      <LegalSection title="サービス提供・発送時期">
        <p>（デジタル商品の場合は即時ダウンロード等、物理商品は発送目安を記載）</p>
      </LegalSection>

      <LegalSection title="返品・キャンセル">
        <p>
          法令に基づくクーリングオフ・不良品対応の有無、デジタルコンテンツの性質上返品不可の場合はその旨を記載。
        </p>
      </LegalSection>

      <LegalSection title="当サイトの現状（参考）">
        <p>
          ブログとして情報提供・広告・アフィリエイトのみを行い、<strong>当サイト上で直接商品の注文・代金決済を行っていない場合</strong>
          、上記の「販売」に該当しないため、本表記の多くの項目は空欄または「該当なし」として運用されることがあります。有料コンテンツや物販を開始する際は、必ず最新の法令・ガイドラインを確認し、内容を更新してください。
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
