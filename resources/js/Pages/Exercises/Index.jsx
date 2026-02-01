import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ exercises, filters, categories }) {
    const handleDelete = (id) => {
        if (confirm('この種目を削除しますか？')) {
            router.delete(route('exercises.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">種目一覧</h2>
                    <Link
                        href={route('exercises.create')}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        新規登録
                    </Link>
                </div>
            }
        >
            <Head title="種目一覧" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex flex-wrap gap-4">
                        <select
                            value={filters.category || ''}
                            onChange={(e) =>
                                router.get(route('exercises.index'), { ...filters, category: e.target.value }, { preserveState: true })
                            }
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">全カテゴリ</option>
                            {Object.entries(categories).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="種目名で検索..."
                            defaultValue={filters.search || ''}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    router.get(route('exercises.index'), { ...filters, search: e.target.value }, { preserveState: true });
                                }
                            }}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">種目名</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">カテゴリ</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">説明</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">操作</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {exercises.data.map((exercise) => (
                                    <tr key={exercise.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{exercise.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            <span className="inline-flex rounded-full bg-indigo-100 px-2 text-xs font-semibold leading-5 text-indigo-800">
                                                {categories[exercise.category] || exercise.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{exercise.description || '-'}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <Link href={route('exercises.edit', exercise.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                編集
                                            </Link>
                                            <button onClick={() => handleDelete(exercise.id)} className="text-red-600 hover:text-red-900">
                                                削除
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {exercises.data.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">種目が登録されていません。</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {exercises.links && exercises.last_page > 1 && (
                        <div className="mt-4 flex justify-center gap-1">
                            {exercises.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={
                                        'rounded px-3 py-1 text-sm ' +
                                        (link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50') +
                                        (!link.url ? ' cursor-not-allowed opacity-50' : '')
                                    }
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
