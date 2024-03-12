<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Source extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
    ];

    public function getMonthlyTransactions(): HasMany
    {
        $now = Carbon::now();

        return $this->hasMany(Transaction::class)->whereDate('created_at', '>=', $now->startOfMonth())->whereDate('created_at', '<=', $now->lastOfMonth());
    }

    public function getTodayTransactions(): HasMany
    {
        $now = Carbon::now();

        return $this->hasMany(Transaction::class)->whereDate('created_at', $now);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
