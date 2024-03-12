<?php

use App\Helpers\Analytics;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function PHPUnit\Framework\assertEquals;

uses(RefreshDatabase::class);

test('today', function () {
    Transaction::factory()->count(5)->create([
        'amount' => 10,
        'type' => 'income',
        'created_at' => Carbon::yesterday(),
        'updated_at' => Carbon::yesterday()
    ]);

    Transaction::factory()->count(5)->create([
        'amount' => 5,
        'type' => 'outcome',
        'created_at' => Carbon::yesterday(),
        'updated_at' => Carbon::yesterday()
    ]);

    Transaction::factory()->count(10)->create([
        'amount' => 10,
        'type' => 'income',
        'created_at' => now(),
        'updated_at' => now()
    ]);

    Transaction::factory()->count(10)->create([
        'amount' => 5,
        'type' => 'outcome',
        'created_at' => now(),
        'updated_at' => now()
    ]);

    Analytics::generate_analytics();
    $response = asUser()->get("/analytics", []);
    $response->assertStatus(200);
    $res_data = $response->decodeResponseJson()['today'];

    analyticsTest($res_data);
});

test('monthly', function () {
    Transaction::factory()->count(5)->create([
        'amount' => 10,
        'type' => 'income',
        'created_at' => now()->subMonthsNoOverflow()->startOfMonth(),
        'updated_at' => now()->subMonthsNoOverflow()->startOfMonth()
    ]);

    Transaction::factory()->count(5)->create([
        'amount' => 5,
        'type' => 'outcome',
        'created_at' => now()->subMonthsNoOverflow()->startOfMonth(),
        'updated_at' => now()->subMonthsNoOverflow()->startOfMonth()
    ]);

    Transaction::factory()->count(10)->create([
        'amount' => 10,
        'type' => 'income',
        'created_at' => now(),
        'updated_at' => now()
    ]);

    Transaction::factory()->count(10)->create([
        'amount' => 5,
        'type' => 'outcome',
        'created_at' => now(),
        'updated_at' => now()
    ]);

    Analytics::generate_analytics();
    $response = asUser()->get("/analytics", []);
    $response->assertStatus(200);
    $res_data = $response->decodeResponseJson()['monthly'];

    analyticsTest($res_data);
});

test('yearly', function () {
    Transaction::factory()->count(5)->create([
        'amount' => 10,
        'type' => 'income',
        'created_at' => now()->subYearNoOverflow()->startOfYear(),
        'updated_at' => now()->subYearNoOverflow()->startOfYear()
    ]);

    Transaction::factory()->count(5)->create([
        'amount' => 5,
        'type' => 'outcome',
        'created_at' => now()->subYearNoOverflow()->startOfYear(),
        'updated_at' => now()->subYearNoOverflow()->startOfYear()
    ]);

    Transaction::factory()->count(10)->create([
        'amount' => 10,
        'type' => 'income',
        'created_at' => now(),
        'updated_at' => now()
    ]);

    Transaction::factory()->count(10)->create([
        'amount' => 5,
        'type' => 'outcome',
        'created_at' => now(),
        'updated_at' => now()
    ]);

    Analytics::generate_analytics();
    $response = asUser()->get("/analytics", []);
    $response->assertStatus(200);
    $res_data = $response->decodeResponseJson()['yearly'];

    analyticsTest($res_data);
});
