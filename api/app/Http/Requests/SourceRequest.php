<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SourceRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required'],
            'type' => ['required', 'in:income,outcome'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
