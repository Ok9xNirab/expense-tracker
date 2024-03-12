<?php

use App\Jobs\AnalyticsGenerationJob;
use App\Models\Source;
use App\Models\Transaction;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function PHPUnit\Framework\assertCount;
use function PHPUnit\Framework\assertEquals;

uses(RefreshDatabase::class);

test('empty body on creating transaction', function () {
    $response = asUser()->post('/transactions');

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['source_id', 'amount']);
    $response->assertJsonStructure([
        'message',
        'errors' => ['source_id', 'amount'],
    ]);
});

test('invalid source on creating transaction', function () {
    $response = asUser()->post('/transactions', [
        'source_id' => 55,
        'amount' => 10,
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['source_id']);
    $response->assertJsonStructure([
        'message',
        'errors' => ['source_id'],
    ]);
});

test('creating transaction', function () {
    Bus::fake();

    $source = Source::factory()->create();
    $response = asUser()->post('/transactions', [
        'source_id' => $source->id,
        'amount' => 10,
        'remarks' => 'Test remarks',
    ]);

    $response->assertStatus(201);
    $response->assertJsonStructure([
        'data' => [
            'id', 'remarks', 'amount', 'type', 'source' => ['id', 'name'], 'created_at', 'updated_at',
        ],
    ]);
    assertCount(1, Transaction::all());
    $transaction = Transaction::first();
    assertEquals(10, $transaction->amount);
    assertEquals($source->id, $transaction->source_id);
    assertEquals('Test remarks', $transaction->remarks);

    Bus::assertDispatched(AnalyticsGenerationJob::class);
});

test('List of transactions', function () {
    Transaction::factory()->count(25)->create();
    $response = asUser()->get('/transactions');

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'data' => [['id', 'remarks', 'amount', 'type', 'source' => ['id', 'name'], 'created_at', 'updated_at']],
        'meta' => ['current_page', 'from', 'last_page', 'per_page', 'to', 'total']
    ]);
    $res_meta = $response->decodeResponseJson()['meta'];
    assertEquals(Transaction::whereDate('created_at', '>=', now()->startOfMonth())->whereDate('created_at', '<=', now()->lastOfMonth())->count(), $res_meta['total']);
});

test('empty body on updating transaction', function () {
    $transaction = Transaction::factory()->create();
    $response = asUser()->patch("/transactions/{$transaction->id}");

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['source_id', 'amount']);
    $response->assertJsonStructure([
        'message',
        'errors' => ['source_id', 'amount'],
    ]);
});

test('invalid source on updating transaction', function () {
    $transaction = Transaction::factory()->create();
    $response = asUser()->patch("/transactions/{$transaction->id}", [
        'source_id' => 100
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['source_id']);
    $response->assertJsonStructure([
        'message',
        'errors' => ['source_id'],
    ]);
});

test('updating transaction', function () {
    Bus::fake();

    $source = Source::factory()->create();
    $transaction = Transaction::factory()->create([
        'amount' => 15
    ]);
    $response = asUser()->patch("/transactions/{$transaction->id}", [
        'source_id' => $source->id,
        'amount' => 12,
        'remarks' => 'Test remarks'
    ]);

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'data' => ['id', 'remarks', 'amount', 'type', 'created_at', 'updated_at']
    ]);
    $fresh_transaction = $transaction->fresh();
    assertEquals(12, $fresh_transaction->amount);
    assertEquals($source->id, $fresh_transaction->source_id);
    assertEquals('Test remarks', $fresh_transaction->remarks);

    Bus::assertDispatched(AnalyticsGenerationJob::class);
});

test('deleting transaction', function () {
    Bus::fake();

    $transaction = Transaction::factory()->create();
    $response = asUser()->delete("/transactions/{$transaction->id}");

    $response->assertStatus(200);
    assertCount(0, Transaction::all());

    Bus::assertDispatched(AnalyticsGenerationJob::class);
});
