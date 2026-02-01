<?php

namespace App\Http\Controllers;

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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'weight' => 'required|numeric|min:20|max:300',
            'body_fat_percentage' => 'nullable|numeric|min:1|max:60',
        ]);

        $exists = $request->user()->bodyWeights()->where('date', $validated['date'])->exists();
        if ($exists) {
            return back()->withErrors(['date' => 'この日付の記録は既に存在します。']);
        }

        $request->user()->bodyWeights()->create($validated);

        return redirect()->route('body-weights.index')->with('message', '体重を記録しました。');
    }

    public function edit(BodyWeight $bodyWeight)
    {
        $this->authorize($bodyWeight);

        return Inertia::render('BodyWeights/Edit', [
            'bodyWeight' => $bodyWeight,
        ]);
    }

    public function update(Request $request, BodyWeight $bodyWeight)
    {
        $this->authorize($bodyWeight);

        $validated = $request->validate([
            'date' => 'required|date',
            'weight' => 'required|numeric|min:20|max:300',
            'body_fat_percentage' => 'nullable|numeric|min:1|max:60',
        ]);

        $exists = $request->user()->bodyWeights()
            ->where('date', $validated['date'])
            ->where('id', '!=', $bodyWeight->id)
            ->exists();
        if ($exists) {
            return back()->withErrors(['date' => 'この日付の記録は既に存在します。']);
        }

        $bodyWeight->update($validated);

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
