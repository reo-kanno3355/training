<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkoutExercise extends Model
{
    protected $fillable = [
        'workout_log_id',
        'exercise_id',
        'sets',
        'reps',
        'weight',
        'memo',
        'order',
    ];

    public function workoutLog(): BelongsTo
    {
        return $this->belongsTo(WorkoutLog::class);
    }

    public function exercise(): BelongsTo
    {
        return $this->belongsTo(Exercise::class);
    }
}
