import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ exercises }) {
    const { data, setData, post, processing, errors } = useForm({
        date: new Date().toISOString().split('T')[0],
        total_duration: '',
        condition: '',
        memo: '',
        exercises: [{ exercise_id: '', sets: '', reps: '', weight: '', memo: '' }],
    });

    const addExercise = () => {
        setData('exercises', [...data.exercises, { exercise_id: '', sets: '', reps: '', weight: '', memo: '' }]);
    };

    const removeExercise = (index) => {
        if (data.exercises.length > 1) {
            setData('exercises', data.exercises.filter((_, i) => i !== index));
        }
    };

    const updateExercise = (index, field, value) => {
        const updated = [...data.exercises];
        updated[index] = { ...updated[index], [field]: value };
        setData('exercises', updated);
    };

    const moveExercise = (index, direction) => {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= data.exercises.length) return;
        const updated = [...data.exercises];
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        setData('exercises', updated);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('workouts.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">ワークアウト記録</h2>}
        >
            <Head title="ワークアウト記録" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                <div>
                                    <InputLabel htmlFor="date" value="日付" />
                                    <TextInput id="date" type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} className="mt-1 block w-full" required />
                                    <InputError message={errors.date} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="total_duration" value="合計時間（分）" />
                                    <TextInput id="total_duration" type="number" value={data.total_duration} onChange={(e) => setData('total_duration', e.target.value)} className="mt-1 block w-full" min="1" />
                                    <InputError message={errors.total_duration} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="condition" value="体調" />
                                    <select id="condition" value={data.condition} onChange={(e) => setData('condition', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                        <option value="">選択してください</option>
                                        <option value="1">1 - とても悪い</option>
                                        <option value="2">2 - 悪い</option>
                                        <option value="3">3 - 普通</option>
                                        <option value="4">4 - 良い</option>
                                        <option value="5">5 - とても良い</option>
                                    </select>
                                    <InputError message={errors.condition} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="memo" value="メモ" />
                                <textarea id="memo" value={data.memo} onChange={(e) => setData('memo', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows="2" />
                                <InputError message={errors.memo} className="mt-2" />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">種目</h3>
                                    <button type="button" onClick={addExercise} className="rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700">
                                        種目を追加
                                    </button>
                                </div>
                                <InputError message={errors.exercises} className="mb-2" />

                                <div className="space-y-4">
                                    {data.exercises.map((ex, index) => (
                                        <div key={index} className="rounded-lg border border-gray-200 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-700">#{index + 1}</span>
                                                <div className="flex gap-1">
                                                    <button type="button" onClick={() => moveExercise(index, -1)} disabled={index === 0} className="rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-30">↑</button>
                                                    <button type="button" onClick={() => moveExercise(index, 1)} disabled={index === data.exercises.length - 1} className="rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-30">↓</button>
                                                    {data.exercises.length > 1 && (
                                                        <button type="button" onClick={() => removeExercise(index)} className="rounded px-2 py-1 text-xs text-red-500 hover:bg-red-50">削除</button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
                                                <div className="sm:col-span-2">
                                                    <select value={ex.exercise_id} onChange={(e) => updateExercise(index, 'exercise_id', e.target.value)} className="block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                                                        <option value="">種目を選択</option>
                                                        {exercises.map((exercise) => (
                                                            <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                                        ))}
                                                    </select>
                                                    <InputError message={errors['exercises.' + index + '.exercise_id']} className="mt-1" />
                                                </div>
                                                <div>
                                                    <TextInput type="number" value={ex.sets} onChange={(e) => updateExercise(index, 'sets', e.target.value)} className="block w-full text-sm" placeholder="セット数" min="1" required />
                                                    <InputError message={errors['exercises.' + index + '.sets']} className="mt-1" />
                                                </div>
                                                <div>
                                                    <TextInput type="number" value={ex.reps} onChange={(e) => updateExercise(index, 'reps', e.target.value)} className="block w-full text-sm" placeholder="レップ数" min="1" required />
                                                    <InputError message={errors['exercises.' + index + '.reps']} className="mt-1" />
                                                </div>
                                                <div>
                                                    <TextInput type="number" value={ex.weight} onChange={(e) => updateExercise(index, 'weight', e.target.value)} className="block w-full text-sm" placeholder="重量(kg)" min="0" step="0.5" />
                                                    <InputError message={errors['exercises.' + index + '.weight']} className="mt-1" />
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <TextInput value={ex.memo} onChange={(e) => updateExercise(index, 'memo', e.target.value)} className="block w-full text-sm" placeholder="メモ（任意）" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>記録する</PrimaryButton>
                                <Link href={route('workouts.index')} className="text-sm text-gray-600 hover:text-gray-900">キャンセル</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
