<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (! Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details',
            ], 422);
        }

        $user = User::where('email', $request->email)->first();
        $token = $user->createToken($request->email)->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'success' => true,
        ]);
    }

    public function user(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }

    public function analytics()
    {
        $today = json_decode(Cache::get('today_analytics'));
        $monthly = json_decode(Cache::get('monthly_analytics'));
        $yearly = json_decode(Cache::get('yearly_analytics'));

        return response()->json(compact('today', 'monthly', 'yearly'));
    }
}
