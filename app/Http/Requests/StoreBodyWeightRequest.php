<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBodyWeightRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date' => ['required', 'date'],
            'weight' => ['required', 'numeric', 'min:20', 'max:300'],
            'body_fat_percentage' => ['nullable', 'numeric', 'min:1', 'max:60'],
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(\Illuminate\Validation\Validator $validator): void
    {
        $validator->after(function (\Illuminate\Validation\Validator $validator) {
            if ($validator->errors()->isNotEmpty()) {
                return;
            }

            $exists = $this->user()->bodyWeights()
                ->where('date', $this->validated()['date'])
                ->exists();

            if ($exists) {
                $validator->errors()->add('date', 'この日付の記録は既に存在します。');
            }
        });
    }
}
