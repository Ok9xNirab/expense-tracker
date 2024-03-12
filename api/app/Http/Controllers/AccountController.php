<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AccountController extends Controller
{
    public function update_email(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $request->user()->update([
            'email' => $request->email,
        ]);

        return response()->json([
            'id' => $request->user()->id,
            'email' => $request->user()->email,
        ]);
    }

    public function change_password(Request $request)
    {
        $request->validate([
            'password' => ['required'],
            'new_password' => ['required', 'confirmed'],
        ]);

        if (! Hash::check($request->password, $request->user()->password)) {
            return throw ValidationException::withMessages(['password' => 'You entered wrong current password!']);
        }

        $request->user()->update(['password' => bcrypt($request->new_password)]);

        return response()->json(['success' => true]);
    }
}
