import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const conditionLabels = { 1: 'とても悪い', 2: '悪い', 3: '普通', 4: '良い', 5: 'とても良い' };

export default function Show({ workout }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">ワークアウト詳細</h2>}
        >
            <Head title="ワークアウト詳細" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div>
                                <p className="text-sm font-medium text-gray-500">日付</p>
                                <p className="text-lg text-gray-900">{new Date(workout.date).toLocaleDateString('ja-JP')}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">合計時間</p>
                                <p className="text-lg text-gray-900">{workout.total_duration ? workout.total_duration + '分' : '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">体調</p>
                                <p className="text-lg text-gray-900">{workout.condition ? conditionLabels[workout.condition] : '-'}</p>
                            </div>
                        </div>

                        {workout.memo && (
                            <div className="mb-6">
                                <p className="text-sm font-medium text-gray-500">メモ</p>
                                <p className="mt-1 text-gray-900">{workout.memo}</p>
                            </div>
                        )}

                        <h3 className="mb-4 text-lg font-medium text-gray-900">種目</h3>
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">#</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">種目</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">セット</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">レップ</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">重量</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">メモ</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {workout.workout_exercises.map((we, index) => (
                                        <tr key={we.id}>
                                            <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{we.exercise?.name}</td>
                                            <td className="px-4 py-3 text-center text-sm text-gray-900">{we.sets}</td>
                                            <td className="px-4 py-3 text-center text-sm text-gray-900">{we.reps}</td>
                                            <td className="px-4 py-3 text-center text-sm text-gray-900">{we.weight ? we.weight + 'kg' : '-'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{we.memo || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 flex gap-4">
                            <Link href={route('workouts.edit', workout.id)} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                                編集
                            </Link>
                            <Link href={route('workouts.index')} className="text-sm leading-8 text-gray-600 hover:text-gray-900">
                                一覧に戻る
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
