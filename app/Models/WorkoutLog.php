<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WorkoutLog extends Model
{
    protected $fillable = [
        'user_id',
        'date',
        'total_duration',
        'memo',
        'condition',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function workoutExercises(): HasMany
    {
        return $this->hasMany(WorkoutExercise::class)->orderBy('order');
    }
}
