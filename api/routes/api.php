<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\SourceController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return response()->json([
        'Expense Tracker API',
    ]);
});

Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'user']);
    Route::get('/analytics', [UserController::class, 'analytics']);

    Route::apiResource('sources', SourceController::class)->except('show');
    Route::apiResource('transactions', TransactionController::class)->except('show');

    Route::patch('/update-email', [AccountController::class, 'update_email']);
    Route::patch('/change-password', [AccountController::class, 'change_password']);
});
