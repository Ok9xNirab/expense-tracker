<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionRequest;
use App\Http\Resources\TransactionResource;
use App\Jobs\AnalyticsGenerationJob;
use App\Models\Source;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $transactions = Transaction::orderBy('id', 'DESC');

        if ($request->has('type')) {
            $transactions->where('type', $request->get('type'));
        }

        $now = Carbon::now();
        if ($request->has('filter')) {
            if ($request->get('filter') === 'today') {
                $transactions->whereDate('created_at', $now);
            }
        } else {
            $transactions->whereDate('created_at', '>=', $now->startOfMonth())->whereDate('created_at', '<=', $now->lastOfMonth());
        }

        return TransactionResource::collection($transactions->paginate(10));
    }

    public function store(TransactionRequest $request)
    {
        $source = Source::where('id', $request->source_id)->first();

        dispatch(new AnalyticsGenerationJob());

        return new TransactionResource(Transaction::create(array_merge(
            $request->validated(), ['type' => $source->type]
        )));
    }

    public function update(TransactionRequest $request, Transaction $transaction)
    {
        $source = Source::where('id', $request->source_id)->first();

        $transaction->update(array_merge($request->validated(), ['type' => $source->type]));

        dispatch(new AnalyticsGenerationJob());

        return new TransactionResource($transaction);
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        dispatch(new AnalyticsGenerationJob());

        return response()->json();
    }
}
