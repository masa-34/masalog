---
# ---------------------------------------------------------------------------
# フロントマター（このブロックはそのまま。行頭の # はコメントでサイトに出ません）
# ---------------------------------------------------------------------------
#
# 【置き場所】このファイルをコピーして使うときの例:
#   _posts/開発/my-post.md   → 下の category は "開発" に揃える
#   _posts/その他/foo.md
#   _posts/趣味/bar.md
#   category を書かない・空にすると「未分類」→ _posts/未分類/ がよい
#
# 【URL】スラッグ = ファイル名（拡張子なし）。フォルダをまたいでも名前の重複は不可。
#
# ---------------------------------------------------------------------------

# ページの見出し（h1）・タブタイトルにも使われます
title: "github actionsを使用し、cursorにコードレビューしてもらう"

# 一覧・カードの振り分け。フォルダ名と同じにすると運用しやすいです
category: "開発"

# タグ（任意）。`/tags/タグ名` で一覧へ。配列または "a, b, c" 形式
tags:
  - Cursor
  - github
  - github actions
  - 便利機能
  - AI

# 一覧・ヒーロー下の短い説明。1〜3 文。空でも動きますが、書いた方が読みやすいです
excerpt: "github actionsを使用し、PR作成後Cursorにコードレビューしてもらう手順書。 "

# アイキャッチ（推奨 1300×630 前後の横長）。public からのパス
coverImage: "/assets/blog/cursor-review/Cursor.jpg"

# 公開日時。次のどれでも可:
#   • 行ごと省略（または date: "auto"）→ Git でファイルが初めて追加されたコミット日時。
#     取れない場合は OS のファイル作成日時、なければ更新日時（mtime）。
#   • 明示する → ISO 8601（例: 2025-03-21 正午 JST → "2025-03-21T03:00:00.000Z"）
# 画面上は yyyy/MM/dd 風に表示されます。
date: "auto"

# OGP（シェア時の画像）。迷ったら coverImage と同じパスでよいです
ogImage:
  url: "/assets/blog/cursor-review/Cursor.jpg"
---

<!-- この下から本文（Markdown）。上の --- までがメタ情報です -->

参考公式サイト
https://docs.cursor.com/ja/cli/cookbook/code-review

## step１：github actionsのワークフローを作成

````
〇ファイル構成
.github
 ↳workflowws
　↳cursor-code-review.yml 
````

````yaml
name: コードレビュー

#トリガー
#opened:新規PRが作成されたとき
#synchronize:PRに新しいコミットがプッシュされたとき（更新時）
#reopened:一度クローズされたPRが再度オープンされたとき
#ready_for_review:ドラフト状態のPRがレビュー可能な状態に変更されたとき
on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

#書き込み、読み取り権限付与
permissions:
  pull-requests: write
  contents: read
  #contents: write

jobs:
  code-review:
    runs-on: ubuntu-latest
    #ドラフトPRは自動コードレビューをスキップ
    if: github.event.pull_request.draft == false
    steps:
      - name: リポジトリをチェックアウト
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          ref: ${{ github.event.pull_request.head.sha }}

      - name: Cursor CLI をインストール
        run: |
          curl https://cursor.com/install -fsS | bash
          echo "$HOME/.cursor/bin" >> $GITHUB_PATH

      - name: 自動コードレビューを実行
        env:
          CURSOR_API_KEY: ${{ secrets.CURSOR_API_KEY }}
          MODEL: auto
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          # 問題があった場合はPRをブロックする事が可能：true
          # 変数を作成していないため、ブロックされない
          BLOCKING_REVIEW: ${{ vars.BLOCKING_REVIEW || 'false' }}
        run: |
          cursor-agent --force --model "$MODEL" --output-format=text --print '
          GitHub Actions のランナー上で自動コードレビューを実行してる。
          gh CLI は利用可能で、GH_TOKEN で認証済み。pull request にコメントしてOK。

          指示を記載
````

## step２：APIキーの設定
参考公式サイト①
https://docs.cursor.com/ja/cli/reference/authentication#api-key-authentication

参考公式サイト②
https://docs.cursor.com/ja/cli/github-actions#authentication

### APIキーの生成

**①APIキーの生成**

Cursorにログイン（ダウンロードしているエディタではなく上記のサイトでログイン）

Cursorのダッシュボードの Integrations > User API Keys でAPIキーを生成。

### APIキーの設定

**②APIキーを設定**

Cursor の API キーをリポジトリ内で安全に保存しよう:

1. GitHub のリポジトリへ移動
2. **Settings** → **Secrets and variables** → **Actions** をクリック
3. **New repository secret** をクリック
4. 名前を **`CURSOR_API_KEY`** に設定
5. 値に API キーを貼り付け
6. **Add secret** をクリック

## step３：エージェントの権限を設定する

````
〇ファイル構成
.cursor
 ↳cli.json
````

````
{
  "permissions": {
    "allow": ["read", "write", "suggest"],
    "deny": []
  }
}
````
この設定により、エージェントはファイルを読み取り、コメントには GitHub CLI を使えるけど、リポジトリを変更することはできない。設定の詳細は [permissions reference](https://docs.cursor.com/ja/cli/reference/permissions) を見てね。