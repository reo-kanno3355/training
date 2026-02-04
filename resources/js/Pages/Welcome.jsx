import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, canLogin, canRegister }) {
    const features = [
        {
            title: 'ワークアウト記録',
            description:
                '日々のトレーニング内容を詳細に記録。種目・セット数・レップ数・重量を管理し、トレーニングの進捗を可視化できます。',
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
            ),
            color: 'from-purple-500 to-indigo-600',
            bgLight: 'bg-purple-50',
            textColor: 'text-purple-600',
        },
        {
            title: '食事管理',
            description:
                '毎日の食事をカロリー・PFC（タンパク質・脂質・炭水化物）で記録。朝食・昼食・夕食・間食を分けて管理できます。',
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M16.5 8.25V6.75a4.5 4.5 0 10-9 0v1.5" />
                </svg>
            ),
            color: 'from-green-500 to-emerald-600',
            bgLight: 'bg-green-50',
            textColor: 'text-green-600',
        },
        {
            title: '体重トラッキング',
            description:
                '体重と体脂肪率を日々記録して変化を追跡。目標に向けた進捗をひと目で確認できます。',
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
            ),
            color: 'from-orange-500 to-amber-600',
            bgLight: 'bg-orange-50',
            textColor: 'text-orange-600',
        },
        {
            title: '種目カスタマイズ',
            description:
                'トレーニング種目を自由に登録・管理。カテゴリ分けで効率よく種目を整理できます。',
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            color: 'from-blue-500 to-cyan-600',
            bgLight: 'bg-blue-50',
            textColor: 'text-blue-600',
        },
    ];

    return (
        <>
            <Head title="FitTrack - あなたの健康管理パートナー" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* ナビゲーション */}
                <nav className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-8">
                    <div className="text-2xl font-bold text-gray-900">
                        FitTrack
                    </div>
                    {canLogin && (
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                                >
                                    ダッシュボード
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-semibold text-gray-700 transition hover:text-gray-900"
                                    >
                                        ログイン
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                                        >
                                            新規登録
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </nav>

                {/* ヒーローセクション */}
                <section className="relative overflow-hidden px-6 py-20 lg:px-8 lg:py-32">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4">
                            <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 opacity-30 blur-3xl" />
                        </div>
                    </div>
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            カラダづくりを
                            <br />
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                もっとスマートに
                            </span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            トレーニング・食事・体重をまとめて記録。
                            <br className="hidden sm:block" />
                            シンプルな操作で日々の健康管理を習慣にしましょう。
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-500"
                                >
                                    ダッシュボードへ
                                </Link>
                            ) : (
                                <>
                                    {canRegister && (
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-500"
                                        >
                                            無料で始める
                                        </Link>
                                    )}
                                    {canLogin && (
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-semibold text-gray-700 transition hover:text-gray-900"
                                        >
                                            ログインはこちら &rarr;
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* 機能紹介セクション */}
                <section className="px-6 py-16 lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                主な機能
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                健康管理に必要な機能をひとつのアプリに。
                            </p>
                        </div>
                        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="group rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition hover:shadow-lg hover:ring-gray-300"
                                >
                                    <div
                                        className={`inline-flex rounded-xl ${feature.bgLight} p-3 ${feature.textColor}`}
                                    >
                                        {feature.icon}
                                    </div>
                                    <h3 className="mt-5 text-lg font-semibold text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 使い方セクション */}
                <section className="bg-white px-6 py-16 lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-5xl">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                かんたん3ステップ
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                すぐに使い始められます。
                            </p>
                        </div>
                        <div className="mt-16 grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    step: '1',
                                    title: 'アカウント作成',
                                    description: 'メールアドレスとパスワードを入力するだけ。',
                                },
                                {
                                    step: '2',
                                    title: '日々の記録',
                                    description: 'トレーニング・食事・体重をサクッと記録。',
                                },
                                {
                                    step: '3',
                                    title: '振り返り',
                                    description: 'ダッシュボードで日々の変化をチェック。',
                                },
                            ].map((item) => (
                                <div key={item.step} className="text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-bold text-white shadow-md">
                                        {item.step}
                                    </div>
                                    <h3 className="mt-5 text-lg font-semibold text-gray-900">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTAセクション */}
                {!auth.user && (
                    <section className="px-6 py-16 lg:px-8 lg:py-24">
                        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-16 text-center shadow-xl">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">
                                今日からはじめよう
                            </h2>
                            <p className="mt-4 text-lg text-indigo-100">
                                無料でアカウントを作成して、健康管理をスタートしましょう。
                            </p>
                            {canRegister && (
                                <Link
                                    href={route('register')}
                                    className="mt-8 inline-block rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-md transition hover:bg-indigo-50"
                                >
                                    無料で始める
                                </Link>
                            )}
                        </div>
                    </section>
                )}

                {/* フッター */}
                <footer className="border-t border-gray-200 bg-white px-6 py-8 lg:px-8">
                    <div className="mx-auto max-w-7xl text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} FitTrack. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    );
}
