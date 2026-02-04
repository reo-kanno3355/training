<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBodyWeightRequest;
use App\Http\Requests\UpdateBodyWeightRequest;
use App\Models\BodyWeight;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BodyWeightController extends Controller
{
    public function index(Request $request)
    {
        $bodyWeights = $request->user()
            ->bodyWeights()
            ->orderByDesc('date')
            ->paginate(20);

        $chartData = $request->user()
            ->bodyWeights()
            ->orderBy('date')
            ->limit(90)
            ->get(['date', 'weight', 'body_fat_percentage']);

        return Inertia::render('BodyWeights/Index', [
            'bodyWeights' => $bodyWeights,
            'chartData' => $chartData,
        ]);
    }

    public function create()
    {
        return Inertia::render('BodyWeights/Create');
    }

    public function store(StoreBodyWeightRequest $request)
    {
        $request->user()->bodyWeights()->create($request->validated());

        return redirect()->route('body-weights.index')->with('message', '体重を記録しました。');
    }

    public function edit(BodyWeight $bodyWeight)
    {
        $this->authorize($bodyWeight);

        return Inertia::render('BodyWeights/Edit', [
            'bodyWeight' => $bodyWeight,
        ]);
    }

    public function update(UpdateBodyWeightRequest $request, BodyWeight $bodyWeight)
    {
        $this->authorize($bodyWeight);

        $bodyWeight->update($request->validated());

        return redirect()->route('body-weights.index')->with('message', '体重記録を更新しました。');
    }

    public function destroy(BodyWeight $bodyWeight)
    {
        $this->authorize($bodyWeight);

        $bodyWeight->delete();

        return redirect()->route('body-weights.index')->with('message', '体重記録を削除しました。');
    }

    private function authorize(BodyWeight $bodyWeight): void
    {
        if ($bodyWeight->user_id !== auth()->id()) {
            abort(403);
        }
    }
}
