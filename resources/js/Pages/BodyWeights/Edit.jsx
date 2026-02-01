import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ bodyWeight }) {
    const { data, setData, put, processing, errors } = useForm({
        date: bodyWeight.date.split('T')[0],
        weight: bodyWeight.weight,
        body_fat_percentage: bodyWeight.body_fat_percentage || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('body-weights.update', bodyWeight.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">体重記録編集</h2>}
        >
            <Head title="体重記録編集" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="date" value="日付" />
                                <TextInput id="date" type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} className="mt-1 block w-full" required />
                                <InputError message={errors.date} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="weight" value="体重 (kg)" />
                                <TextInput id="weight" type="number" value={data.weight} onChange={(e) => setData('weight', e.target.value)} className="mt-1 block w-full" min="20" max="300" step="0.1" required />
                                <InputError message={errors.weight} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="body_fat_percentage" value="体脂肪率 (%)" />
                                <TextInput id="body_fat_percentage" type="number" value={data.body_fat_percentage} onChange={(e) => setData('body_fat_percentage', e.target.value)} className="mt-1 block w-full" min="1" max="60" step="0.1" />
                                <InputError message={errors.body_fat_percentage} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>更新する</PrimaryButton>
                                <Link href={route('body-weights.index')} className="text-sm text-gray-600 hover:text-gray-900">キャンセル</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
