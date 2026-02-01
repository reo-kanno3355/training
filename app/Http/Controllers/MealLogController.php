<?php

namespace App\Http\Controllers;

use App\Models\MealLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MealLogController extends Controller
{
    public function index(Request $request)
    {
        $meals = $request->user()
            ->mealLogs()
            ->orderByDesc('date')
            ->orderByRaw("CASE meal_type WHEN 'breakfast' THEN 1 WHEN 'lunch' THEN 2 WHEN 'dinner' THEN 3 WHEN 'snack' THEN 4 ELSE 5 END")
            ->paginate(20);

        return Inertia::render('Meals/Index', [
            'meals' => $meals,
            'mealTypes' => self::mealTypes(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Meals/Create', [
            'mealTypes' => self::mealTypes(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'meal_type' => 'required|in:breakfast,lunch,dinner,snack',
            'meal_name' => 'required|string|max:255',
            'calories' => 'nullable|integer|min:0',
            'protein' => 'nullable|numeric|min:0',
            'carbs' => 'nullable|numeric|min:0',
            'fat' => 'nullable|numeric|min:0',
            'memo' => 'nullable|string|max:1000',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('meals', 'public');
        }

        $request->user()->mealLogs()->create($validated);

        return redirect()->route('meals.index')->with('message', '食事を記録しました。');
    }

    public function edit(MealLog $meal)
    {
        $this->authorize($meal);

        return Inertia::render('Meals/Edit', [
            'meal' => $meal,
            'mealTypes' => self::mealTypes(),
        ]);
    }

    public function update(Request $request, MealLog $meal)
    {
        $this->authorize($meal);

        $validated = $request->validate([
            'date' => 'required|date',
            'meal_type' => 'required|in:breakfast,lunch,dinner,snack',
            'meal_name' => 'required|string|max:255',
            'calories' => 'nullable|integer|min:0',
            'protein' => 'nullable|numeric|min:0',
            'carbs' => 'nullable|numeric|min:0',
            'fat' => 'nullable|numeric|min:0',
            'memo' => 'nullable|string|max:1000',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($meal->image) {
                Storage::disk('public')->delete($meal->image);
            }
            $validated['image'] = $request->file('image')->store('meals', 'public');
        }

        $meal->update($validated);

        return redirect()->route('meals.index')->with('message', '食事記録を更新しました。');
    }

    public function destroy(MealLog $meal)
    {
        $this->authorize($meal);

        if ($meal->image) {
            Storage::disk('public')->delete($meal->image);
        }

        $meal->delete();

        return redirect()->route('meals.index')->with('message', '食事記録を削除しました。');
    }

    private function authorize(MealLog $meal): void
    {
        if ($meal->user_id !== auth()->id()) {
            abort(403);
        }
    }

    public static function mealTypes(): array
    {
        return [
            'breakfast' => '朝食',
            'lunch' => '昼食',
            'dinner' => '夕食',
            'snack' => '間食',
        ];
    }
}
