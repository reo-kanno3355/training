<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function workoutLogs(): HasMany
    {
        return $this->hasMany(WorkoutLog::class);
    }

    public function mealLogs(): HasMany
    {
        return $this->hasMany(MealLog::class);
    }

    public function bodyWeights(): HasMany
    {
        return $this->hasMany(BodyWeight::class);
    }
}
