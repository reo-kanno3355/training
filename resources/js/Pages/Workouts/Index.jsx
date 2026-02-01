import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

const conditionLabels = { 1: 'とても悪い', 2: '悪い', 3: '普通', 4: '良い', 5: 'とても良い' };

export default function Index({ workouts }) {
    const handleDelete = (id) => {
        if (confirm('このワークアウト記録を削除しますか？')) {
            router.delete(route('workouts.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">ワークアウト一覧</h2>
                    <Link
                        href={route('workouts.create')}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        新規記録
                    </Link>
                </div>
            }
        >
            <Head title="ワークアウト一覧" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="space-y-4">
                        {workouts.data.map((workout) => (
                            <div key={workout.id} className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {new Date(workout.date).toLocaleDateString('ja-JP')}
                                            </h3>
                                            <div className="mt-1 flex gap-4 text-sm text-gray-500">
                                                {workout.total_duration && <span>{workout.total_duration}分</span>}
                                                {workout.condition && <span>体調: {conditionLabels[workout.condition]}</span>}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link href={route('workouts.show', workout.id)} className="text-sm text-indigo-600 hover:text-indigo-900">
                                                詳細
                                            </Link>
                                            <Link href={route('workouts.edit', workout.id)} className="text-sm text-indigo-600 hover:text-indigo-900">
                                                編集
                                            </Link>
                                            <button onClick={() => handleDelete(workout.id)} className="text-sm text-red-600 hover:text-red-900">
                                                削除
                                            </button>
                                        </div>
                                    </div>
                                    {workout.workout_exercises && workout.workout_exercises.length > 0 && (
                                        <div className="mt-3">
                                            <div className="flex flex-wrap gap-2">
                                                {workout.workout_exercises.map((we) => (
                                                    <span key={we.id} className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                                                        {we.exercise?.name} {we.sets}x{we.reps} {we.weight ? we.weight + 'kg' : ''}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {workout.memo && <p className="mt-2 text-sm text-gray-500">{workout.memo}</p>}
                                </div>
                            </div>
                        ))}
                        {workouts.data.length === 0 && (
                            <div className="overflow-hidden bg-white p-6 text-center shadow-sm sm:rounded-lg">
                                <p className="text-gray-500">ワークアウト記録がありません。</p>
                            </div>
                        )}
                    </div>

                    {workouts.links && workouts.last_page > 1 && (
                        <div className="mt-4 flex justify-center gap-1">
                            {workouts.links.map((link, i) => (
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
