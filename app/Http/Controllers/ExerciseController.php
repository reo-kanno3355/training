<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExerciseController extends Controller
{
    public function index(Request $request)
    {
        $query = Exercise::query();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $exercises = $query->orderBy('category')->orderBy('name')->paginate(20)->withQueryString();

        return Inertia::render('Exercises/Index', [
            'exercises' => $exercises,
            'filters' => $request->only(['category', 'search']),
            'categories' => self::categories(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Exercises/Create', [
            'categories' => self::categories(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:' . implode(',', array_keys(self::categories())),
            'description' => 'nullable|string|max:1000',
        ]);

        Exercise::create($validated);

        return redirect()->route('exercises.index')->with('message', '種目を登録しました。');
    }

    public function edit(Exercise $exercise)
    {
        return Inertia::render('Exercises/Edit', [
            'exercise' => $exercise,
            'categories' => self::categories(),
        ]);
    }

    public function update(Request $request, Exercise $exercise)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:' . implode(',', array_keys(self::categories())),
            'description' => 'nullable|string|max:1000',
        ]);

        $exercise->update($validated);

        return redirect()->route('exercises.index')->with('message', '種目を更新しました。');
    }

    public function destroy(Exercise $exercise)
    {
        if ($exercise->workoutExercises()->exists()) {
            return back()->with('error', 'この種目はワークアウト記録で使用されているため削除できません。');
        }

        $exercise->delete();

        return redirect()->route('exercises.index')->with('message', '種目を削除しました。');
    }

    public static function categories(): array
    {
        return [
            'chest' => '胸',
            'back' => '背中',
            'legs' => '脚',
            'shoulders' => '肩',
            'arms' => '腕',
            'abs' => '腹',
            'other' => 'その他',
        ];
    }
}
