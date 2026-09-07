---
title: "Laravelでスロークエリ・N+1問題を検知する仕組みと活用方法"
category: "開発"
tags:
  - Laravel
  - パフォーマンス
  - N+1
excerpt: "DB::listenとpreventLazyLoadingでスロークエリ・N+1を自動検知する仕組みを教えてもらったので、調査の仕方も含めてメモにしました。"
coverImage: "/assets/blog/laravel-slow-query-n-plus-one/cover.svg"
date: "auto"
ogImage:
  url: "/assets/blog/laravel-slow-query-n-plus-one/cover.svg"
---

Laravelアプリのパフォーマンス問題は、大体「特定のクエリが遅い（スロークエリ）」か「1回で済むはずのクエリがループの中で何度も発行されている（N+1問題）」のどちらかです。どちらも気づかずに本番で放置されがちですが、実は数行の設定でほぼ自動的に検知できると聞いたので、仕組みと調査の進め方を整理しておきます。

## 検知の仕組み: AppServiceProviderに仕込む

Laravelには、クエリが実行されるたびにフックできる仕組みと、N+1の原因になる「遅延読み込み（Lazy Loading）」自体を禁止できる仕組みが標準で用意されているようです。これを `boot()` メソッドに書くだけで、開発中も本番でも自動的に検知が働くようになります。

```php
// App\Providers\AppServiceProvider.php

use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Database\Eloquent\Model;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // スロークエリ調査用
        DB::listen(function (QueryExecuted $query) {
            if ($query->time > 1000) {
                Log::warning("Slow Query [{$query->time}ms]: {$query->sql}");
            }
        });

        // N+1問題（Eager Loading未定義）検出用
        Model::preventLazyLoading(!(app()->isProduction()));
    }
}
```

やっていることは2つだけなので、それぞれ中身を追ってみます。

## 仕組み①: DB::listenでスロークエリを検知する

`DB::listen()` は、Laravelが発行するすべてのSQLクエリの実行後に呼ばれるコールバックを登録する仕組みでした。引数の `QueryExecuted` イベントには、実行された内容が詰まっています。

| プロパティ | 内容 |
|------------|------|
| `$query->sql` | 実行されたSQL文（プレースホルダ `?` のまま） |
| `$query->bindings` | `?` に入った実際の値の配列 |
| `$query->time` | 実行にかかった時間（**ミリ秒**） |
| `$query->connectionName` | 使用したDB接続名 |

サンプルの `$query->time > 1000` は「**1000ミリ秒（1秒）を超えたクエリだけログに残す**」という条件です。この閾値は環境やアプリの特性次第で調整するのが良さそうです（例: APIなら `500` ms、バッチなら `3000` ms など）。

条件に一致すると `Log::warning()` が実行され、`storage/logs/laravel.log` にこんな形式で出力されます。

```text
[2026-09-07 10:32:15] production.WARNING: Slow Query [1523ms]: select * from `orders` where `status` = ? and `created_at` > ?
```

ただ、**この方法はすべてのクエリを一度フックする**ので、閾値を極端に低くしたり、アクセス数が多い環境で常時有効にしたりすると、ログ出力自体がオーバーヘッドになりそうです。本番運用では閾値を余裕を持った値にする、あるいはサンプリングする、といった工夫が必要そうだと感じました。

## 仕組み②: preventLazyLoadingでN+1問題を検知する

N+1問題とは、リレーション先のデータをループの中で1件ずつ取得してしまい、本来1〜2回で済むはずのクエリがレコード数分（N+1回）発行されてしまう問題です。

```php
// N+1が発生する例
$orders = Order::all(); // 1回のクエリ

foreach ($orders as $order) {
    echo $order->user->name; // ← ループのたびにクエリが発行される（N回）
}
```

`Model::preventLazyLoading()` は、Eloquentモデルの**遅延読み込み（Lazy Loading）そのものを禁止**するメソッドです。有効にすると、`with()` などで事前に読み込んでいないリレーションにアクセスした瞬間、例外 `Illuminate\Database\LazyLoadingViolationException` が投げられます。

```text
Illuminate\Database\LazyLoadingViolationException: Attempted to lazy load [user] on model [App\Models\Order] but lazy loading is disabled.
```

サンプルコードの `!(app()->isProduction())` がポイントで、**「本番以外（ローカル・ステージング・テスト環境）では例外を投げて開発者に気づかせる」「本番では例外を投げずに動作を継続させる」**という切り分けをしているんだなと理解しました。本番でいきなり例外を投げて画面がエラーになるのを避けつつ、開発中に確実にN+1を潰せる、うまい設計だと思います。

## 検知後の調査の仕方

### スロークエリの調査

1. **ログを確認する**

   ```bash
   tail -f storage/logs/laravel.log | grep "Slow Query"
   ```

   `tail -f` でリアルタイムに眺めながら操作すると、どの画面・処理で遅いクエリが出ているか特定しやすかったです。

2. **SQLを実際に発行してみる**

   ログに出ているSQLとbindingsを組み合わせて、DBクライアント（TablePlus、phpMyAdmin、`mysql`コマンドなど）で直接実行し、`EXPLAIN` を付けて実行計画を見ます。

   ```sql
   EXPLAIN SELECT * FROM orders WHERE status = 'paid' AND created_at > '2026-01-01';
   ```

   `type` が `ALL`（フルスキャン）になっていないか、`key` が `NULL`（インデックスが使われていない）になっていないかを確認します。

3. **典型的な原因を疑う**

   - 検索条件のカラムに**インデックスが無い**
   - `LIKE '%キーワード%'`のような**前方一致以外のあいまい検索**
   - `SELECT *` で不要なカラムまで読み込んでいる
   - 件数の多いテーブルに対する**ページネーション無しの全件取得**

### N+1問題の調査

1. **例外のスタックトレースを見る**

   `LazyLoadingViolationException` が出た場合、ログまたは画面のエラー表示に**どのモデルのどのリレーション**でループしたか（`Attempted to lazy load [xxx] on model [yyy]`）が出るので、該当のコントローラーやBladeのコード箇所を特定します。

2. **Eager Loadingで修正する**

   原因箇所が分かったら、`with()` を使って事前に関連データをまとめて取得するように直します。

   ```php
   // Before（N+1が発生する）
   $orders = Order::all();

   // After（1回の追加クエリでまとめて取得）
   $orders = Order::with('user')->get();
   ```

   ネストしたリレーションや、必要なカラムだけに絞りたい場合はこう書けます。

   ```php
   $orders = Order::with(['user:id,name', 'items.product'])->get();
   ```

3. **Laravel Debugbar / Telescopeも併用する**

   開発環境では [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar) や標準の [Laravel Telescope](https://laravel.com/docs/telescope) を入れておくと、**発行されたクエリの本数と内容が画面上で一覧できる**ので、`preventLazyLoading` で例外に気づく前段階として「そもそも何回クエリが飛んでいるか」を可視化するのに便利そうです。

## 活用時の注意点

- **`preventLazyLoading` を本番でも `true` にする場合**は、例外が発生した瞬間にユーザーに500エラーが返ってしまうので、事前にステージング環境で十分に洗い出してから切り替えるのが安全そうです
- スロークエリログの閾値（サンプルの `1000`）は、**まず緩めに設定して様子を見て、徐々に厳しくする**運用がやりやすい気がします
- どちらの仕組みも `AppServiceProvider` に書くだけで**アプリ全体に効く**ので、個別のコントローラーやリポジトリに調査コードを仕込む必要がないのは楽でした

## まとめ：検知の仕組みと活用方法

- `DB::listen()` で全クエリの実行時間をフックし、閾値超えを `Log::warning` で記録すれば**スロークエリを自動検知**できる
- `Model::preventLazyLoading()` で遅延読み込みを禁止すれば、**N+1の原因になるアクセスをその場で例外として検知**できる
- 本番では例外を止めずログだけ、開発環境では例外を投げて気づかせる、という**環境ごとの切り分け**が実運用のコツになりそう
- 検知後は、スロークエリなら`EXPLAIN`でインデックス・実行計画を確認し、N+1なら例外のスタックトレースから該当箇所を特定して`with()`によるEager Loadingで修正する

数行の設定を`AppServiceProvider`に足しておくだけで、パフォーマンス問題に気づける仕組みが手に入るのはかなりお得だと感じました。まだ入れていないプロジェクトがあれば、閾値を緩めに設定して仕込んでみようと思います。

## 参考

- [Laravel公式ドキュメント: Database - Eager Loading](https://laravel.com/docs/eloquent-relationships#eager-loading)
- [Laravel公式ドキュメント: Events - Query Events](https://laravel.com/docs/database#listening-for-query-events)
