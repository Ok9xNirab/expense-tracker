<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('required fields', function () {
    $response = $this->post('/login', [], [
        'accept' => 'application/json',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['email', 'password']);
    $response->assertJsonStructure([
        'message',
        'errors' => [
            'email',
            'password',
        ],
    ]);
});

test('wrong credentials', function () {
    $response = $this->post('/login', [
        'email' => 'user@test.com',
        'password' => 'password1',
    ], [
        'accept' => 'application/json',
    ]);

    $response->assertStatus(422);
    $response->assertJsonStructure(['message']);
});

test('correct credentials', function () {
    $response = $this->post('/login', [
        'email' => 'user@test.com',
        'password' => 'password',
    ], [
        'accept' => 'application/json',
    ]);

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'token',
        'user' => [
            'name',
            'email',
        ],
    ]);
});
