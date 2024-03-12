<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'source_id',
        'remarks',
        'amount',
        'type',
    ];

    protected function source(): BelongsTo
    {
        return $this->belongsTo(Source::class);
    }
}
