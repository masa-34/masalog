---
title: "SQLクエリ作成の基本を理解する"

category: "開発"

tags:
  - SQL
  - データベース

excerpt: "SQLでクエリを書くときの基本構文をまとめた個人メモです。SELECT・WHERE・ORDER BY・GROUP BY・JOINなど、よく使う要素を整理しています。"

coverImage: "/assets/blog/sql-basic-query/SQL.jpg"

date: "auto"

ogImage:
  url: "/assets/blog/sql-basic-query/SQL.jpg"
---

<!-- この下から本文（Markdown）。上の --- までがメタ情報です -->

SQLでデータベースからデータを取得・操作する際の基本的なクエリの書き方を整理したメモです。
以降の例では、以下のような`users`テーブルと`orders`テーブルを想定して説明します。

```text
users
+----+----------+------+--------+
| id | name     | age  | city   |
+----+----------+------+--------+
| 1  | 田中     | 28   | 東京   |
| 2  | 佐藤     | 34   | 大阪   |
| 3  | 鈴木     | 22   | 東京   |
+----+----------+------+--------+

orders
+----+---------+------------+--------+
| id | user_id | item       | price  |
+----+---------+------------+--------+
| 1  | 1       | 本         | 1500   |
| 2  | 1       | ペン       | 300    |
| 3  | 2       | ノート     | 200    |
+----+---------+------------+--------+
```

## SELECT：データを取得する

もっとも基本となる構文です。どの列を取得するかを指定します。

```sql
-- 全ての列を取得
SELECT * FROM users;

-- 特定の列だけを取得
SELECT name, age FROM users;
```

`*`は「全ての列」を意味しますが、必要な列だけを明示的に指定した方が、意図が伝わりやすく無駄なデータ転送も減らせます。

## WHERE：条件で絞り込む

取得する行を条件で絞り込みます。

```sql
SELECT * FROM users WHERE city = '東京';
SELECT * FROM users WHERE age >= 25;
SELECT * FROM users WHERE city = '東京' AND age < 30;
```

よく使う比較・論理演算子は以下の通りです。

| 演算子 | 意味 |
|--------|------|
| `=` | 等しい |
| `<>` / `!=` | 等しくない |
| `>` `<` `>=` `<=` | 大小比較 |
| `AND` / `OR` | 複数条件の組み合わせ |
| `BETWEEN a AND b` | aとbの範囲内 |
| `IN (a, b, c)` | いずれかに一致 |
| `LIKE '%東%'` | 部分一致（あいまい検索） |
| `IS NULL` / `IS NOT NULL` | NULL判定 |

```sql
-- 東京か大阪の人
SELECT * FROM users WHERE city IN ('東京', '大阪');

-- 名前に「田」を含む人
SELECT * FROM users WHERE name LIKE '%田%';
```

## ORDER BY：並び替える

取得結果の並び順を指定します。デフォルトは昇順（`ASC`）で、降順にするには`DESC`を指定します。

```sql
-- 年齢の若い順
SELECT * FROM users ORDER BY age ASC;

-- 年齢の高い順
SELECT * FROM users ORDER BY age DESC;

-- 複数条件での並び替え（都市→年齢の順）
SELECT * FROM users ORDER BY city, age DESC;
```

## LIMIT：取得件数を制限する

大量データの中から一部だけを取得したい場合に使います。

```sql
-- 上位3件だけ取得
SELECT * FROM users ORDER BY age DESC LIMIT 3;
```

## GROUP BYと集計関数：グループごとに集計する

`GROUP BY`は指定した列の値ごとにグループ化し、集計関数と組み合わせて使うのが基本パターンです。

| 集計関数 | 意味 |
|----------|------|
| `COUNT()` | 件数 |
| `SUM()` | 合計 |
| `AVG()` | 平均 |
| `MAX()` / `MIN()` | 最大値 / 最小値 |

```sql
-- 都市ごとの人数
SELECT city, COUNT(*) AS user_count
FROM users
GROUP BY city;

-- ユーザーごとの注文合計金額
SELECT user_id, SUM(price) AS total_price
FROM orders
GROUP BY user_id;
```

### HAVING：集計後の結果を絞り込む

`WHERE`は集計前の行を絞り込むのに対し、`HAVING`は`GROUP BY`で集計した後の結果を絞り込みます。

```sql
-- 注文合計金額が1000円を超えるユーザーのみ
SELECT user_id, SUM(price) AS total_price
FROM orders
GROUP BY user_id
HAVING SUM(price) > 1000;
```

## JOIN：複数テーブルを結合する

`users`と`orders`のように、テーブルが分かれている場合は`JOIN`で結合して取得します。

```sql
-- ユーザーと注文情報を結合して取得
SELECT users.name, orders.item, orders.price
FROM users
INNER JOIN orders ON users.id = orders.user_id;
```

| 結合方法 | 説明 |
|----------|------|
| `INNER JOIN` | 両方のテーブルに一致するデータがある行のみ取得 |
| `LEFT JOIN` | 左側（`FROM`側）のテーブルを全て取得し、一致しない右側はNULLになる |
| `RIGHT JOIN` | `LEFT JOIN`の逆。右側のテーブルを全て取得 |

例えば、注文が一件もないユーザーも含めて一覧を出したい場合は`LEFT JOIN`を使います。

```sql
SELECT users.name, orders.item
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
```

`鈴木`さんはまだ注文がないため、`orders.item`は`NULL`として結果に含まれます。

## 実行順序を意識する

SQLは書く順序と、実際に処理される順序が異なります。処理は概ね以下の順番で行われます。

```text
FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

`WHERE`で列の別名（`SELECT`で`AS`をつけた名前）が使えない、`GROUP BY`より前に絞り込みたいときは`WHERE`を使う、といった挙動はこの実行順序に基づいています。

## まとめ

- `SELECT`で取得する列、`WHERE`で行の絞り込みを指定する
- `ORDER BY`で並び替え、`LIMIT`で件数制限
- `GROUP BY`と集計関数を組み合わせてグループごとの集計を行い、集計後の絞り込みは`HAVING`を使う
- 複数テーブルを扱う場合は`JOIN`で結合する。存在しないデータも含めたい場合は`LEFT JOIN`
- 書く順序と実行順序（`FROM`→`WHERE`→`GROUP BY`→`SELECT`→`ORDER BY`）が異なる点を意識すると理解しやすい

まずはこの基本構文の組み合わせを覚えておけば、日常的なクエリの大半はカバーできそうです。
