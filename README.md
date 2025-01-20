## package.json変更時の注意事項

npm installでnode_modulesの更新が必要です

## ディレクトリ構造（案）

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── api名/
│   │   │       └── route.ts
│   │   ├── [game-uuid]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui
│   │   └── game/
│   │   │   ├── GamePage.tsx
│   │   │   └── layouts
│   │   │       └── レイアウト名.tsx
│   │   └── top/
│   │       ├── TopPage.tsx
│   │       └── layouts
│   │           └── レイアウト名.tsx
│   ├── hooks/
│   │   ├── ui/
│   │   │   └── use + ui名.ts
│   │   └── game/
│   │       └── useGameHome.ts
│   ├── lib/
│   ├── atoms/
│   ├── styles/
│   ├── types/
│   └── utils/
│       ├── client/
│       ├── common/
│       └── server/
│   　       └── api/
└── middleware.ts
```

## ディレクトリ/ファイル解説

| ディレクトリ/ファイル          | 説明                                                                      |
| ------------------------------ | ------------------------------------------------------------------------- |
| `src/app/api/`                 | APIを格納                                                                 |
| `src/app/[game-uuid]/page.tsx` | ユーザーごとに異なるページを返すためのpage.tsx                            |
| `src/app/page.tsx`             | サイトのトップページ                                                      |
| `src/components/`              | Reactコンポーネント                                                       |
| `src/components/ui/`           | shadcn/uiのコンポーネント                                                 |
| `src/components/game/`         | ゲーム画面用のコンポーネント                                              |
| `src/components/top/`          | トップ画面用のコンポーネント                                              |
| `src/hooks/`                   | useState,handleClickなど、ReactコンポーネントのJSX以外を格納              |
| `src/lib/`                     | ライブラリ特有の設定用関数などを格納                                      |
| `src/atoms/`                   | グローバルな状態管理を行うJotai用                                         |
| `src/styles/`                  | グローバルなcssなどを格納                                                 |
| `src/types/`                   | TypeScriptの型定義                                                        |
| `src/utils/`                   | 汎用の関数群                                                              |
| `src/utils/client/`            | クライアントサイドで使用する関数群                                        |
| `src/utils/common/`            | サーバー、クライアント両方で使用する関数群                                |
| `src/utils/server/`            | サーバーサイドでのみ使用する関数群                                        |
| `src/utils/server/api`         | APIで行う処理を記述した関数群                                             |
| `middleware.ts`                | アクセスしてきたユーザーをそれぞれのgame-uuidにリダイレクトするために使用 |

## ディレクトリ/ファイル命名規則（案）

| 種別（ディレクトリ名）                    | 命名規則 | 例                              |
| ----------------------------------------- | -------- | ------------------------------- |
| Reactコンポーネント全般（components/）    | パスカル | `CustomButton.tsx`              |
| React Page用コンポーネント（components/） | パスカル | `GamePage.tsx`                  |
| ReactカスタムHooks（hooks/）              | キャメル | `useCustomButtonHook.ts`        |
| apiエンドポイント名（api/）               | ケバブ   | `image/generate-image/route.ts` |
| 型定義ファイル（types/）                  | パスカル | `GeneratedImage.ts`             |
| style名（styles/）                        | パスカル | `GlobalStyle.ts`                |
| store用ファイル名（stores/）              | パスカル | `GameHomeStore.ts`              |
| util関数群、lib関数群（utils/,lib/）      | キャメル | `convertImage.ts`               |

## API一覧

| 種別 | HTTPメソッド | URI                | 説明                                                     |
| ---- | ------------ | ------------------ | -------------------------------------------------------- |
| API  | GET/POST     | api/game-state     | ゲーム進行状況の確認と更新を行う                         |
| API  | POST         | api/generate-image | 渡されたプロンプトに応じて生成された画像を1枚返す        |
| API  | POST         | api/translate      | 渡された日本語のテキストを英語にして返す                 |
