import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ meal, mealTypes }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        date: meal.date.split('T')[0],
        meal_type: meal.meal_type,
        meal_name: meal.meal_name,
        calories: meal.calories || '',
        protein: meal.protein || '',
        carbs: meal.carbs || '',
        fat: meal.fat || '',
        memo: meal.memo || '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('meals.update', meal.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">食事記録編集</h2>}
        >
            <Head title="食事記録編集" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="date" value="日付" />
                                    <TextInput id="date" type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} className="mt-1 block w-full" required />
                                    <InputError message={errors.date} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="meal_type" value="食事タイプ" />
                                    <select id="meal_type" value={data.meal_type} onChange={(e) => setData('meal_type', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                                        <option value="">選択してください</option>
                                        {Object.entries(mealTypes).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.meal_type} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="meal_name" value="食事名" />
                                <TextInput id="meal_name" value={data.meal_name} onChange={(e) => setData('meal_name', e.target.value)} className="mt-1 block w-full" required />
                                <InputError message={errors.meal_name} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                                <div>
                                    <InputLabel htmlFor="calories" value="カロリー (kcal)" />
                                    <TextInput id="calories" type="number" value={data.calories} onChange={(e) => setData('calories', e.target.value)} className="mt-1 block w-full" min="0" />
                                    <InputError message={errors.calories} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="protein" value="タンパク質 (g)" />
                                    <TextInput id="protein" type="number" value={data.protein} onChange={(e) => setData('protein', e.target.value)} className="mt-1 block w-full" min="0" step="0.1" />
                                    <InputError message={errors.protein} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="carbs" value="炭水化物 (g)" />
                                    <TextInput id="carbs" type="number" value={data.carbs} onChange={(e) => setData('carbs', e.target.value)} className="mt-1 block w-full" min="0" step="0.1" />
                                    <InputError message={errors.carbs} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="fat" value="脂質 (g)" />
                                    <TextInput id="fat" type="number" value={data.fat} onChange={(e) => setData('fat', e.target.value)} className="mt-1 block w-full" min="0" step="0.1" />
                                    <InputError message={errors.fat} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="memo" value="メモ" />
                                <textarea id="memo" value={data.memo} onChange={(e) => setData('memo', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows="2" />
                                <InputError message={errors.memo} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="image" value="画像" />
                                {meal.image && (
                                    <p className="mb-2 text-sm text-gray-500">現在の画像: {meal.image}</p>
                                )}
                                <input id="image" type="file" accept="image/*" onChange={(e) => setData('image', e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100" />
                                <InputError message={errors.image} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>更新する</PrimaryButton>
                                <Link href={route('meals.index')} className="text-sm text-gray-600 hover:text-gray-900">キャンセル</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
