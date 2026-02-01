import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const conditionLabels = { 1: 'とても悪い', 2: '悪い', 3: '普通', 4: '良い', 5: 'とても良い' };
const mealTypeLabels = { breakfast: '朝食', lunch: '昼食', dinner: '夕食', snack: '間食' };

export default function Dashboard({
    latestWeight,
    previousWeight,
    todayWorkout,
    todayMeals,
    todayCalories,
    todayProtein,
    todayCarbs,
    todayFat,
    weeklyWorkoutCount,
}) {
    const weightDiff = latestWeight && previousWeight
        ? (parseFloat(latestWeight.weight) - parseFloat(previousWeight.weight)).toFixed(1)
        : null;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">ダッシュボード</h2>}
        >
            <Head title="ダッシュボード" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* クイックアクション */}
                    <div className="mb-6 flex flex-wrap gap-3">
                        <Link href={route('workouts.create')} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                            ワークアウトを記録
                        </Link>
                        <Link href={route('meals.create')} className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                            食事を記録
                        </Link>
                        <Link href={route('body-weights.create')} className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
                            体重を記録
                        </Link>
                    </div>

                    {/* サマリーカード */}
                    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {/* 体重 */}
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">直近の体重</p>
                            {latestWeight ? (
                                <>
                                    <p className="mt-2 text-3xl font-bold text-gray-900">
                                        {parseFloat(latestWeight.weight).toFixed(1)} <span className="text-lg font-normal">kg</span>
                                    </p>
                                    {weightDiff !== null && (
                                        <p className={'mt-1 text-sm ' + (parseFloat(weightDiff) > 0 ? 'text-red-600' : parseFloat(weightDiff) < 0 ? 'text-green-600' : 'text-gray-500')}>
                                            {parseFloat(weightDiff) > 0 ? '+' : ''}{weightDiff} kg
                                        </p>
                                    )}
                                </>
                            ) : (
                                <p className="mt-2 text-sm text-gray-400">記録なし</p>
                            )}
                        </div>

                        {/* 今週のトレーニング */}
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">今週のトレーニング</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                {weeklyWorkoutCount} <span className="text-lg font-normal">回</span>
                            </p>
                        </div>

                        {/* 今日のカロリー */}
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">今日のカロリー</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                {todayCalories || 0} <span className="text-lg font-normal">kcal</span>
                            </p>
                        </div>

                        {/* PFC */}
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">今日のPFC</p>
                            <div className="mt-2 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">タンパク質</span>
                                    <span className="font-medium">{todayProtein || 0}g</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">脂質</span>
                                    <span className="font-medium">{todayFat || 0}g</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">炭水化物</span>
                                    <span className="font-medium">{todayCarbs || 0}g</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 今日のワークアウト */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900">今日のトレーニング</h3>
                            {todayWorkout ? (
                                <div className="mt-4">
                                    <div className="mb-2 flex gap-4 text-sm text-gray-500">
                                        {todayWorkout.total_duration && <span>{todayWorkout.total_duration}分</span>}
                                        {todayWorkout.condition && <span>体調: {conditionLabels[todayWorkout.condition]}</span>}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {todayWorkout.workout_exercises && todayWorkout.workout_exercises.map((we) => (
                                            <span key={we.id} className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs text-indigo-700">
                                                {we.exercise?.name} {we.sets}x{we.reps} {we.weight ? we.weight + 'kg' : ''}
                                            </span>
                                        ))}
                                    </div>
                                    <Link href={route('workouts.show', todayWorkout.id)} className="mt-2 inline-block text-sm text-indigo-600 hover:text-indigo-900">
                                        詳細を見る
                                    </Link>
                                </div>
                            ) : (
                                <p className="mt-4 text-sm text-gray-400">今日のトレーニング記録はありません。</p>
                            )}
                        </div>
                    </div>

                    {/* 今日の食事 */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900">今日の食事</h3>
                            {todayMeals && todayMeals.length > 0 ? (
                                <div className="mt-4 space-y-2">
                                    {todayMeals.map((meal) => (
                                        <div key={meal.id} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-medium text-gray-500">{mealTypeLabels[meal.meal_type]}</span>
                                                <span className="text-sm font-medium text-gray-900">{meal.meal_name}</span>
                                            </div>
                                            <span className="text-sm text-gray-500">{meal.calories ? meal.calories + ' kcal' : ''}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-4 text-sm text-gray-400">今日の食事記録はありません。</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
