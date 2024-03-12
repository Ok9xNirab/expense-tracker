<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Source */
class SourceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $now = Carbon::now();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'amount' => round(
                $request->has('filter') ?
                    $request->get('filter') === 'today' ?
                        $this->getTodayTransactions->sum('amount') :
                        $this->transactions->sum('amount') :
                    $this->getMonthlyTransactions->sum('amount'),
                2
            ),
        ];
    }
}
