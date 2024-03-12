<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function PHPUnit\Framework\assertNotEquals;
use function PHPUnit\Framework\assertTrue;

uses(RefreshDatabase::class);

test('empty body on updating email', function () {
    $response = asUser()->patch('/update-email');

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['email']);
    $response->assertJsonStructure(['message', 'errors' => ['email']]);
});

test('invalid email on updating email', function () {
    $response = asUser()->patch('/update-email', ['email' => 'user#test.com']);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['email']);
    $response->assertJsonStructure(['message', 'errors' => ['email']]);
});

test('updating email', function () {
    $response = asUser()->patch('/update-email', ['email' => 'user@test1.com']);

    $response->assertStatus(200);
    assertNotEquals('user@test.com', User::first());
});

test('empty body on changing password', function () {
    $response = asUser()->patch('/change-password');

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['password', 'new_password']);
    $response->assertJsonStructure(['message', 'errors' => ['password', 'new_password']]);
});

test('wrong current password on changing password', function () {
    $response = asUser()->patch('/change-password', [
        'password' => 'password1',
        'new_password' => 'password',
        'new_password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['password']);
    $response->assertJsonStructure(['message', 'errors' => ['password']]);
});

test('new password without on changing password', function () {
    $response = asUser()->patch('/change-password', [
        'password' => 'password',
        'new_password' => 'password1',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['new_password']);
    $response->assertJsonStructure(['message', 'errors' => ['new_password']]);
});

test('changing password', function () {
    $response = asUser()->patch('/change-password', [
        'password' => 'password',
        'new_password' => 'password1',
        'new_password_confirmation' => 'password1',
    ]);

    $response->assertStatus(200);
    $response->assertJsonStructure(['success']);
});
