<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\WorkoutLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class WorkoutLogController extends Controller
{
    public function index(Request $request)
    {
        $workouts = $request->user()
            ->workoutLogs()
            ->with('workoutExercises.exercise')
            ->orderByDesc('date')
            ->paginate(20);

        return Inertia::render('Workouts/Index', [
            'workouts' => $workouts,
        ]);
    }

    public function create()
    {
        return Inertia::render('Workouts/Create', [
            'exercises' => Exercise::orderBy('category')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'total_duration' => 'nullable|integer|min:1',
            'condition' => 'nullable|integer|min:1|max:5',
            'memo' => 'nullable|string|max:1000',
            'exercises' => 'required|array|min:1',
            'exercises.*.exercise_id' => 'required|exists:exercises,id',
            'exercises.*.sets' => 'required|integer|min:1',
            'exercises.*.reps' => 'required|integer|min:1',
            'exercises.*.weight' => 'nullable|numeric|min:0',
            'exercises.*.memo' => 'nullable|string|max:500',
        ]);

        DB::transaction(function () use ($request, $validated) {
            $workoutLog = $request->user()->workoutLogs()->create([
                'date' => $validated['date'],
                'total_duration' => $validated['total_duration'] ?? null,
                'condition' => $validated['condition'] ?? null,
                'memo' => $validated['memo'] ?? null,
            ]);

            foreach ($validated['exercises'] as $index => $exercise) {
                $workoutLog->workoutExercises()->create([
                    'exercise_id' => $exercise['exercise_id'],
                    'sets' => $exercise['sets'],
                    'reps' => $exercise['reps'],
                    'weight' => $exercise['weight'] ?? null,
                    'memo' => $exercise['memo'] ?? null,
                    'order' => $index,
                ]);
            }
        });

        return redirect()->route('workouts.index')->with('message', 'ワークアウトを記録しました。');
    }

    public function show(WorkoutLog $workout)
    {
        $this->authorize($workout);

        $workout->load('workoutExercises.exercise');

        return Inertia::render('Workouts/Show', [
            'workout' => $workout,
        ]);
    }

    public function edit(WorkoutLog $workout)
    {
        $this->authorize($workout);

        $workout->load('workoutExercises.exercise');

        return Inertia::render('Workouts/Edit', [
            'workout' => $workout,
            'exercises' => Exercise::orderBy('category')->orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, WorkoutLog $workout)
    {
        $this->authorize($workout);

        $validated = $request->validate([
            'date' => 'required|date',
            'total_duration' => 'nullable|integer|min:1',
            'condition' => 'nullable|integer|min:1|max:5',
            'memo' => 'nullable|string|max:1000',
            'exercises' => 'required|array|min:1',
            'exercises.*.exercise_id' => 'required|exists:exercises,id',
            'exercises.*.sets' => 'required|integer|min:1',
            'exercises.*.reps' => 'required|integer|min:1',
            'exercises.*.weight' => 'nullable|numeric|min:0',
            'exercises.*.memo' => 'nullable|string|max:500',
        ]);

        DB::transaction(function () use ($workout, $validated) {
            $workout->update([
                'date' => $validated['date'],
                'total_duration' => $validated['total_duration'] ?? null,
                'condition' => $validated['condition'] ?? null,
                'memo' => $validated['memo'] ?? null,
            ]);

            $workout->workoutExercises()->delete();

            foreach ($validated['exercises'] as $index => $exercise) {
                $workout->workoutExercises()->create([
                    'exercise_id' => $exercise['exercise_id'],
                    'sets' => $exercise['sets'],
                    'reps' => $exercise['reps'],
                    'weight' => $exercise['weight'] ?? null,
                    'memo' => $exercise['memo'] ?? null,
                    'order' => $index,
                ]);
            }
        });

        return redirect()->route('workouts.index')->with('message', 'ワークアウトを更新しました。');
    }

    public function destroy(WorkoutLog $workout)
    {
        $this->authorize($workout);

        $workout->delete();

        return redirect()->route('workouts.index')->with('message', 'ワークアウトを削除しました。');
    }

    private function authorize(WorkoutLog $workout): void
    {
        if ($workout->user_id !== auth()->id()) {
            abort(403);
        }
    }
}
