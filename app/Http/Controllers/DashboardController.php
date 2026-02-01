<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $today = Carbon::today();
        $weekStart = Carbon::now()->startOfWeek();

        $latestWeight = $user->bodyWeights()->orderByDesc('date')->first();
        $previousWeight = $user->bodyWeights()->orderByDesc('date')->skip(1)->first();

        $todayWorkout = $user->workoutLogs()
            ->where('date', $today)
            ->with('workoutExercises.exercise')
            ->first();

        $todayMeals = $user->mealLogs()
            ->where('date', $today)
            ->orderByRaw("CASE meal_type WHEN 'breakfast' THEN 1 WHEN 'lunch' THEN 2 WHEN 'dinner' THEN 3 WHEN 'snack' THEN 4 ELSE 5 END")
            ->get();

        $weeklyWorkoutCount = $user->workoutLogs()
            ->whereBetween('date', [$weekStart, Carbon::now()->endOfWeek()])
            ->count();

        return Inertia::render('Dashboard', [
            'latestWeight' => $latestWeight,
            'previousWeight' => $previousWeight,
            'todayWorkout' => $todayWorkout,
            'todayMeals' => $todayMeals,
            'todayCalories' => $todayMeals->sum('calories'),
            'todayProtein' => $todayMeals->sum('protein'),
            'todayCarbs' => $todayMeals->sum('carbs'),
            'todayFat' => $todayMeals->sum('fat'),
            'weeklyWorkoutCount' => $weeklyWorkoutCount,
        ]);
    }
}
