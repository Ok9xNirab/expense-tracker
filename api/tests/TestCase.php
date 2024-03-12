<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function setUp(): void
    {
        parent::setUp();
        User::create([
            'name' => 'Istiaq Nirab',
            'email' => 'user@test.com',
            'password' => bcrypt('password'),
        ]);
    }
}
