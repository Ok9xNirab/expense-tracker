<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Transaction */
class TransactionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'remarks' => $this->remarks,
            'amount' => $this->amount,
            'type' => $this->type,
            'source' => [
                'id' => $this->source?->id,
                'name' => $this->source?->name
            ],
            'created_at' => $this->created_at->format('F d, Y'),
            'updated_at' => $this->updated_at?->format('F d, Y'),
        ];
    }
}
