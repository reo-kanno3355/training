import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

const mealTypeLabels = { breakfast: '朝食', lunch: '昼食', dinner: '夕食', snack: '間食' };
const mealTypeColors = {
    breakfast: 'bg-yellow-100 text-yellow-800',
    lunch: 'bg-blue-100 text-blue-800',
    dinner: 'bg-purple-100 text-purple-800',
    snack: 'bg-green-100 text-green-800',
};

export default function Index({ meals, mealTypes }) {
    const handleDelete = (id) => {
        if (confirm('この食事記録を削除しますか？')) {
            router.delete(route('meals.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">食事記録一覧</h2>
                    <Link
                        href={route('meals.create')}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        新規記録
                    </Link>
                </div>
            }
        >
            <Head title="食事記録一覧" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">日付</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">タイプ</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">食事名</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">カロリー</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">P / F / C</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">操作</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {meals.data.map((meal) => (
                                    <tr key={meal.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                            {new Date(meal.date).toLocaleDateString('ja-JP')}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            <span className={'inline-flex rounded-full px-2 text-xs font-semibold leading-5 ' + (mealTypeColors[meal.meal_type] || '')}>
                                                {mealTypeLabels[meal.meal_type]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{meal.meal_name}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-900">
                                            {meal.calories ? meal.calories + ' kcal' : '-'}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                                            {meal.protein || '-'}g / {meal.fat || '-'}g / {meal.carbs || '-'}g
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <Link href={route('meals.edit', meal.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">編集</Link>
                                            <button onClick={() => handleDelete(meal.id)} className="text-red-600 hover:text-red-900">削除</button>
                                        </td>
                                    </tr>
                                ))}
                                {meals.data.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">食事記録がありません。</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {meals.links && meals.last_page > 1 && (
                        <div className="mt-4 flex justify-center gap-1">
                            {meals.links.map((link, i) => (
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
