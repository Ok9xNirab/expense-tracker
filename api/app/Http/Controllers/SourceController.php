<?php

namespace App\Http\Controllers;

use App\Http\Requests\SourceRequest;
use App\Http\Resources\SourceResource;
use App\Models\Source;
use Illuminate\Http\Request;

class SourceController extends Controller
{
    public function index(Request $request)
    {
        $sources = Source::orderBy('id', 'DESC');

        if ($request->has('type')) {
            $sources->where('type', $request->get('type'));
        }

        if ($request->has('q')) {
            $sources->where('name', 'LIKE', "%{$request->get('q')}%");
        }

        return SourceResource::collection($sources->paginate(10));
    }

    public function store(SourceRequest $request)
    {
        return new SourceResource(Source::create($request->validated()));
    }

    public function update(SourceRequest $request, Source $source)
    {
        $source->update($request->validated());

        return new SourceResource($source);
    }

    public function destroy(Source $source)
    {
        $source->delete();

        return response()->json();
    }
}
