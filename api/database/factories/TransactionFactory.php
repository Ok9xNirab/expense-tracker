<?php

namespace Database\Factories;

use App\Models\Source;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    protected $model = Transaction::class;

    public function definition(): array
    {
        return [
            'source_id' => Source::factory()->create()->id,
            'remarks' => $this->faker->sentence(),
            'amount' => $this->faker->randomFloat(nbMaxDecimals: 2, max: 99999),
            'type' => $this->faker->randomElement(['income', 'outcome']),
            'created_at' => $this->faker->dateTimeBetween('-60 day', now()),
            'updated_at' => $this->faker->dateTimeBetween('-60 day', now()),
        ];
    }
}
