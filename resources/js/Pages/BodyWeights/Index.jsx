import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ bodyWeights, chartData }) {
    const handleDelete = (id) => {
        if (confirm('この体重記録を削除しますか？')) {
            router.delete(route('body-weights.destroy', id));
        }
    };

    const maxWeight = chartData.length > 0 ? Math.max(...chartData.map(d => parseFloat(d.weight))) : 0;
    const minWeight = chartData.length > 0 ? Math.min(...chartData.map(d => parseFloat(d.weight))) : 0;
    const weightRange = maxWeight - minWeight || 1;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">体重記録</h2>
                    <Link
                        href={route('body-weights.create')}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        新規記録
                    </Link>
                </div>
            }
        >
            <Head title="体重記録" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {chartData.length > 1 && (
                        <div className="mb-6 overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                            <h3 className="mb-4 text-lg font-medium text-gray-900">体重推移</h3>
                            <div className="relative h-64">
                                <svg viewBox={'0 0 ' + Math.max(chartData.length * 40, 200) + ' 200'} className="h-full w-full" preserveAspectRatio="none">
                                    {chartData.map((d, i) => {
                                        const x = (i / (chartData.length - 1)) * (Math.max(chartData.length * 40, 200) - 40) + 20;
                                        const y = 180 - ((parseFloat(d.weight) - minWeight) / weightRange) * 160;
                                        const nextD = chartData[i + 1];
                                        return (
                                            <g key={i}>
                                                {nextD && (
                                                    <line
                                                        x1={x}
                                                        y1={y}
                                                        x2={((i + 1) / (chartData.length - 1)) * (Math.max(chartData.length * 40, 200) - 40) + 20}
                                                        y2={180 - ((parseFloat(nextD.weight) - minWeight) / weightRange) * 160}
                                                        stroke="#6366f1"
                                                        strokeWidth="2"
                                                    />
                                                )}
                                                <circle cx={x} cy={y} r="3" fill="#6366f1" />
                                            </g>
                                        );
                                    })}
                                </svg>
                                <div className="mt-2 flex justify-between text-xs text-gray-500">
                                    <span>{chartData[0] && new Date(chartData[0].date).toLocaleDateString('ja-JP')}</span>
                                    <span>{minWeight.toFixed(1)}kg - {maxWeight.toFixed(1)}kg</span>
                                    <span>{chartData[chartData.length - 1] && new Date(chartData[chartData.length - 1].date).toLocaleDateString('ja-JP')}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">日付</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">体重 (kg)</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">体脂肪率 (%)</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">操作</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {bodyWeights.data.map((bw) => (
                                    <tr key={bw.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                            {new Date(bw.date).toLocaleDateString('ja-JP')}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-900">
                                            {parseFloat(bw.weight).toFixed(1)}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                                            {bw.body_fat_percentage ? parseFloat(bw.body_fat_percentage).toFixed(1) : '-'}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <Link href={route('body-weights.edit', bw.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">編集</Link>
                                            <button onClick={() => handleDelete(bw.id)} className="text-red-600 hover:text-red-900">削除</button>
                                        </td>
                                    </tr>
                                ))}
                                {bodyWeights.data.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">体重記録がありません。</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {bodyWeights.links && bodyWeights.last_page > 1 && (
                        <div className="mt-4 flex justify-center gap-1">
                            {bodyWeights.links.map((link, i) => (
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
