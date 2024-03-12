<?php

use App\Models\Source;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function PHPUnit\Framework\assertCount;
use function PHPUnit\Framework\assertNotEquals;

uses(RefreshDatabase::class);

test('empty body on creating source', function () {
    $response = asUser()->post('/sources', []);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['name', 'type']);
    $response->assertJsonStructure([
        'message',
        'errors' => ['name', 'type'],
    ]);
});

test('invalid type on creating source', function () {
    $response = asUser()->post('/sources', [
        'name' => 'Salary',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['type']);
    $response->assertJsonStructure([
        'message',
        'errors' => ['type'],
    ]);
});

test('creating source', function () {
    $response = asUser()->post('/sources', [
        'name' => 'salary',
        'type' => 'income',
    ]);

    $response->assertStatus(201);
});

test('List of sources', function () {
    Source::factory()->count(10)->create();

    $response = asUser()->get('/sources');

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'data' => [
            ['id', 'name', 'type', 'amount'],
        ],
        'meta' => [
            'current_page',
            'from',
            'last_page',
            'per_page',
            'to',
            'total',
            'links' => [
                ['url', 'label', 'active'],
            ],
        ],
    ]);
});

test('empty body on updating source', function () {
    $source = Source::factory()->create();
    $response = asUser()->patch("/sources/{$source->id}");

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['name', 'type']);
    $response->assertJsonStructure([
        'message',
        'errors' => ['name', 'type'],
    ]);
});

test('invalid type on updating source', function () {
    $source = Source::factory()->create();
    $response = asUser()->patch("/sources/{$source->id}", [
        'name' => 'Salary',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['type']);
    $response->assertJsonStructure([
        'message',
        'errors' => ['type'],
    ]);
});

test('updating source', function () {
    $source = Source::factory()->create();
    $response = asUser()->patch("/sources/{$source->id}", [
        'name' => 'Salary',
        'type' => 'income'
    ]);

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'data' => ['id', 'name', 'type']
    ]);
    $data = $response->decodeResponseJson()['data'];
    assertNotEquals($source->name, $data['name']);
});

test('deleting source', function () {
    $source = Source::factory()->create();
    $response = asUser()->delete("/sources/{$source->id}");

    $response->assertStatus(200);
    assertCount(0, Source::all());
});
