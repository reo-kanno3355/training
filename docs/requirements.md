# トレーニング管理アプリ 要件定義書

## 1. プロジェクト概要

### 1.1 目的
日々のトレーニング（筋トレ）の記録・管理を行い、食事管理や体重管理と合わせて
ユーザーの健康・フィットネス目標達成を支援するWebアプリケーション。

### 1.2 技術スタック
| レイヤー | 技術 |
|---------|------|
| バックエンド | Laravel 12 (PHP 8.2+) |
| フロントエンド | React 18 + Inertia.js |
| スタイリング | Tailwind CSS |
| ビルドツール | Vite |
| データベース | SQLite（開発） / MySQL 8.4（本番） |
| 認証 | Laravel Breeze / Sanctum |
| コンテナ | Docker Compose (Laravel Sail) |
| テスト | PHPUnit |

---

## 2. ユーザー管理機能（実装済み）

### 2.1 ユーザー登録・認証
- ユーザー登録（名前・メール・パスワード）
- ログイン / ログアウト
- パスワードリセット（メール経由）
- メール認証
- パスワード変更

### 2.2 プロフィール管理
- プロフィール情報の編集（名前・メール）
- アカウント削除

---

## 3. トレーニング記録機能

### 3.1 種目マスタ管理（exercises）

#### データ構造
| カラム | 型 | 説明 |
|--------|-----|------|
| id | bigint | 主キー |
| name | string | 種目名（例: ベンチプレス） |
| category | string | カテゴリ（胸・背中・脚・肩・腕・腹・その他） |
| description | text (任意) | 種目の説明 |

#### 機能要件
- **一覧表示**: カテゴリ別にフィルタリング可能な種目一覧
- **新規登録**: 種目名・カテゴリ・説明を入力して登録
- **編集**: 既存種目の情報を編集
- **削除**: 種目を削除（ワークアウト記録で使用中の場合は警告表示）

#### カテゴリ一覧
- 胸（Chest）
- 背中（Back）
- 脚（Legs）
- 肩（Shoulders）
- 腕（Arms）
- 腹（Abs）
- その他（Other）

---

### 3.2 ワークアウト記録（workout_logs + workout_exercises）

#### データ構造 - ワークアウトログ
| カラム | 型 | 説明 |
|--------|-----|------|
| id | bigint | 主キー |
| user_id | foreignId | ユーザーID |
| date | date | トレーニング日 |
| total_duration | integer (任意) | 合計時間（分） |
| memo | text (任意) | メモ |
| condition | integer (任意) | 体調 (1〜5) |

#### データ構造 - ワークアウト種目
| カラム | 型 | 説明 |
|--------|-----|------|
| id | bigint | 主キー |
| workout_log_id | foreignId | ワークアウトログID |
| exercise_id | foreignId | 種目ID |
| sets | integer | セット数 |
| reps | integer | レップ数 |
| weight | decimal(5,2) (任意) | 重量 (kg) |
| memo | text (任意) | メモ |
| order | integer | 表示順 |

#### 機能要件
- **一覧表示**: 日付順のワークアウト記録一覧（ページネーション付き）
- **新規記録作成**:
  - 日付・合計時間・体調（1〜5段階）・メモを入力
  - 種目を複数追加可能（種目選択・セット数・レップ数・重量・メモ）
  - 種目の表示順をドラッグ＆ドロップまたは上下ボタンで変更可能
- **記録編集**: 既存のワークアウト記録を編集
- **記録削除**: ワークアウト記録を削除（確認ダイアログ付き）
- **詳細表示**: ワークアウトの全種目とセット情報を表示

#### 体調レベル
| 値 | ラベル |
|----|--------|
| 1 | とても悪い |
| 2 | 悪い |
| 3 | 普通 |
| 4 | 良い |
| 5 | とても良い |

---

## 4. 食事記録機能（meal_logs）

#### データ構造
| カラム | 型 | 説明 |
|--------|-----|------|
| id | bigint | 主キー |
| user_id | foreignId | ユーザーID |
| date | date | 日付 |
| meal_type | enum | 食事タイプ |
| meal_name | string | 食事名 |
| calories | integer (任意) | カロリー (kcal) |
| protein | decimal(5,2) (任意) | タンパク質 (g) |
| carbs | decimal(5,2) (任意) | 炭水化物 (g) |
| fat | decimal(5,2) (任意) | 脂質 (g) |
| memo | text (任意) | メモ |
| image | string (任意) | 画像パス |

#### 食事タイプ
| 値 | ラベル |
|----|--------|
| breakfast | 朝食 |
| lunch | 昼食 |
| dinner | 夕食 |
| snack | 間食 |

#### 機能要件
- **一覧表示**: 日付別の食事記録一覧（日ごとにグルーピング）
- **新規記録**: 食事タイプ・食事名・カロリー・PFC（タンパク質/脂質/炭水化物）・メモ・画像を入力
- **編集**: 既存の食事記録を編集
- **削除**: 食事記録を削除（確認ダイアログ付き）
- **日別サマリー**: 1日のカロリー合計・PFC合計を表示

---

## 5. 体重管理機能（body_weights）

#### データ構造
| カラム | 型 | 説明 |
|--------|-----|------|
| id | bigint | 主キー |
| user_id | foreignId | ユーザーID |
| date | date | 日付 |
| weight | decimal(5,2) | 体重 (kg) |
| body_fat_percentage | decimal(4,2) (任意) | 体脂肪率 (%) |

#### 機能要件
- **一覧表示**: 日付順の体重記録一覧
- **新規記録**: 日付・体重・体脂肪率を入力
- **編集**: 既存の記録を編集
- **削除**: 記録を削除（確認ダイアログ付き）
- **グラフ表示**: 体重・体脂肪率の推移をグラフで表示（折れ線グラフ）

---

## 6. ダッシュボード

ログイン後のトップページに以下の情報を集約表示する。

### 表示項目
- **直近の体重**: 最新の体重と前回比の増減
- **今日のトレーニング**: 本日のワークアウト記録サマリー（なければ「記録なし」）
- **今日の食事**: 本日の食事記録とカロリー合計
- **今週のトレーニング回数**: 当週のトレーニング実施日数
- **クイックアクション**: 各機能への新規作成リンク

---

## 7. 画面一覧

| # | 画面名 | パス | 説明 | 状態 |
|---|--------|------|------|------|
| 1 | ウェルカム | `/` | 未ログインユーザー向けランディングページ | 実装済み |
| 2 | ダッシュボード | `/dashboard` | ログイン後トップ（サマリー表示） | 要実装 |
| 3 | ワークアウト一覧 | `/workouts` | ワークアウト記録一覧 | 未実装 |
| 4 | ワークアウト作成 | `/workouts/create` | 新規ワークアウト記録 | 未実装 |
| 5 | ワークアウト詳細 | `/workouts/{id}` | ワークアウト記録詳細 | 未実装 |
| 6 | ワークアウト編集 | `/workouts/{id}/edit` | ワークアウト記録編集 | 未実装 |
| 7 | 種目一覧 | `/exercises` | 種目マスタ一覧 | 未実装 |
| 8 | 種目作成 | `/exercises/create` | 新規種目登録 | 未実装 |
| 9 | 種目編集 | `/exercises/{id}/edit` | 種目編集 | 未実装 |
| 10 | 食事記録一覧 | `/meals` | 食事記録一覧 | 未実装 |
| 11 | 食事記録作成 | `/meals/create` | 新規食事記録 | 未実装 |
| 12 | 食事記録編集 | `/meals/{id}/edit` | 食事記録編集 | 未実装 |
| 13 | 体重記録一覧 | `/body-weights` | 体重記録一覧（グラフ付き） | 未実装 |
| 14 | 体重記録作成 | `/body-weights/create` | 新規体重記録 | 未実装 |
| 15 | 体重記録編集 | `/body-weights/{id}/edit` | 体重記録編集 | 未実装 |
| 16 | プロフィール編集 | `/profile` | プロフィール管理 | 実装済み |

---

## 8. API / ルーティング設計

すべてのリソースルートは認証必須（`auth`ミドルウェア）。

```
# ワークアウト記録
GET    /workouts                → WorkoutLogController@index
GET    /workouts/create         → WorkoutLogController@create
POST   /workouts                → WorkoutLogController@store
GET    /workouts/{id}           → WorkoutLogController@show
GET    /workouts/{id}/edit      → WorkoutLogController@edit
PUT    /workouts/{id}           → WorkoutLogController@update
DELETE /workouts/{id}           → WorkoutLogController@destroy

# 種目マスタ
GET    /exercises               → ExerciseController@index
GET    /exercises/create        → ExerciseController@create
POST   /exercises               → ExerciseController@store
GET    /exercises/{id}/edit     → ExerciseController@edit
PUT    /exercises/{id}          → ExerciseController@update
DELETE /exercises/{id}          → ExerciseController@destroy

# 食事記録
GET    /meals                   → MealLogController@index
GET    /meals/create            → MealLogController@create
POST   /meals                   → MealLogController@store
GET    /meals/{id}/edit         → MealLogController@edit
PUT    /meals/{id}              → MealLogController@update
DELETE /meals/{id}              → MealLogController@destroy

# 体重記録
GET    /body-weights            → BodyWeightController@index
GET    /body-weights/create     → BodyWeightController@create
POST   /body-weights            → BodyWeightController@store
GET    /body-weights/{id}/edit  → BodyWeightController@edit
PUT    /body-weights/{id}       → BodyWeightController@update
DELETE /body-weights/{id}       → BodyWeightController@destroy
```

---

## 9. バリデーションルール

### 9.1 ワークアウト記録
| フィールド | ルール |
|-----------|--------|
| date | 必須, 日付形式 |
| total_duration | 任意, 整数, 1以上 |
| condition | 任意, 整数, 1〜5 |
| memo | 任意, 最大1000文字 |
| exercises | 必須, 配列, 1件以上 |
| exercises.*.exercise_id | 必須, exercisesテーブルに存在 |
| exercises.*.sets | 必須, 整数, 1以上 |
| exercises.*.reps | 必須, 整数, 1以上 |
| exercises.*.weight | 任意, 数値, 0以上 |

### 9.2 種目
| フィールド | ルール |
|-----------|--------|
| name | 必須, 最大255文字 |
| category | 必須, 指定値のいずれか |
| description | 任意, 最大1000文字 |

### 9.3 食事記録
| フィールド | ルール |
|-----------|--------|
| date | 必須, 日付形式 |
| meal_type | 必須, breakfast/lunch/dinner/snack |
| meal_name | 必須, 最大255文字 |
| calories | 任意, 整数, 0以上 |
| protein | 任意, 数値, 0以上 |
| carbs | 任意, 数値, 0以上 |
| fat | 任意, 数値, 0以上 |
| memo | 任意, 最大1000文字 |
| image | 任意, 画像ファイル, 最大2MB |

### 9.4 体重記録
| フィールド | ルール |
|-----------|--------|
| date | 必須, 日付形式, ユーザーごとにユニーク |
| weight | 必須, 数値, 20〜300 |
| body_fat_percentage | 任意, 数値, 1〜60 |

---

## 10. 非機能要件

### 10.1 セキュリティ
- 全ページで認証必須（ウェルカムページを除く）
- CSRF保護（Laravel標準）
- ユーザーは自分のデータのみ閲覧・編集可能（認可チェック）
- 画像アップロード時のバリデーション（ファイル形式・サイズ制限）

### 10.2 パフォーマンス
- 一覧画面はページネーション対応（1ページ20件）
- N+1問題を防ぐためEager Loading使用

### 10.3 UI/UX
- レスポンシブデザイン（モバイル対応）
- Tailwind CSSによる統一的なデザイン
- フォームバリデーションエラーのリアルタイム表示
- 削除操作時は確認ダイアログを表示
- 操作成功時にフラッシュメッセージを表示

### 10.4 テスト
- 各コントローラーのFeatureテスト
- バリデーションルールのテスト
- 認可チェックのテスト

---

## 11. 実装優先順位

既存のDBスキーマと認証基盤を活かし、以下の順序で実装を進める。

### Phase 1: 基盤整備
1. モデルリレーション定義
2. ルーティング設定
3. ナビゲーションメニュー追加

### Phase 2: 種目マスタ（CRUD）
4. ExerciseController実装
5. 種目一覧・作成・編集画面

### Phase 3: ワークアウト記録（CRUD）
6. WorkoutLogController実装
7. ワークアウト一覧・作成・詳細・編集画面

### Phase 4: 食事記録（CRUD）
8. MealLogController実装
9. 食事記録一覧・作成・編集画面

### Phase 5: 体重管理（CRUD + グラフ）
10. BodyWeightController実装
11. 体重記録一覧・作成・編集画面
12. 体重推移グラフ

### Phase 6: ダッシュボード
13. ダッシュボード画面の実装（サマリー表示）

### Phase 7: テスト・品質向上
14. Featureテスト作成
15. バグ修正・UI調整
