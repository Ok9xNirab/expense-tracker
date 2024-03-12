<?php

namespace App\Helpers;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;

class Analytics
{
    /**
     * Generate Analytics.
     */
    public static function generate_analytics(): void
    {
        $analytics = new self();
        $analytics->generate_today_analytics();
        $analytics->generate_monthly_analytics();
        $analytics->generate_yearly_analytics();
    }

    /**
     * Generate Today's Analytics
     */
    public function generate_today_analytics(): void
    {
        $now = Carbon::now();

        $yesterday_transactions = Transaction::whereDate('created_at', Carbon::yesterday());
        $today_transactions = Transaction::whereDate('created_at', $now);

        Cache::put('today_analytics', json_encode(
            $this->generate_analytics_from_structure($today_transactions, $yesterday_transactions)
        ));

    }

    /**
     * Generate Monthly Analytics
     */
    public function generate_monthly_analytics(): void
    {
        $now = Carbon::now();
        $current_monthly_transactions = Transaction::whereDate('created_at', '>=', $now->startOfMonth())->whereDate('created_at', '<=', $now->lastOfMonth());
        $last_monthly_transactions = Transaction::whereDate('created_at', '>=', $now->subMonthsNoOverflow()->startOfMonth())->whereDate('created_at', '<=', $now->endOfMonth());

        Cache::put('monthly_analytics', json_encode(
            $this->generate_analytics_from_structure($current_monthly_transactions, $last_monthly_transactions)
        ));
    }

    /**
     * Generate Yearly Analytics
     */
    public function generate_yearly_analytics(): void
    {
        $now = Carbon::now();
        $current_yearly_transactions = Transaction::whereDate('created_at', '>=', $now->startOfYear())->whereDate('created_at', '<=', $now->lastOfYear());
        $last_yearly_transactions = Transaction::whereDate('created_at', '>=', $now->subYearNoOverflow()->startOfYear())->whereDate('created_at', '<=', $now->endOfYear());

        Cache::put('yearly_analytics', json_encode(
            $this->generate_analytics_from_structure($current_yearly_transactions, $last_yearly_transactions)
        ));
    }

    /**
     * Helper function to generate analytics data from two builders.
     *
     * @param  Builder  $current  current transaction builder.
     * @param  Builder  $last  previous transaction builder.
     * @return array[]
     */
    public function generate_analytics_from_structure(Builder $current, Builder $last): array
    {
        $summary = round($current->clone()->sum('amount'), 2);

        $current_incomes = round($current->clone()->where('type', 'income')->sum('amount'), 2);
        $current_outcomes = round($current->clone()->where('type', 'outcome')->sum('amount'), 2);

        $last_incomes = $last->clone()->where('type', 'income')->sum('amount');
        $last_outcomes = $last->clone()->where('type', 'outcome')->sum('amount');

        $current_savings = round($current_incomes - $current_outcomes, 2);
        $last_savings = round($last_incomes - $last_outcomes, 2);
        $savings_percentage = $last_savings != 0 ? round((($current_savings - $last_savings) / $last_savings) * 100) : 0;

        $incomes_percentage = $last_incomes !== 0 ? round((($current_incomes - $last_incomes) / $last_incomes) * 100) : 0;
        $outcomes_percentage = $last_outcomes !== 0 ? round((($current_outcomes - $last_outcomes) / $last_outcomes) * 100) : 0;

        return [
            'summary' => [
                'amount' => $summary,
                'percentage' => null,
            ],
            'savings' => [
                'amount' => $current_savings,
                'percentage' => $savings_percentage,
            ],
            'expenses' => [
                'amount' => $current_outcomes,
                'percentage' => $outcomes_percentage,
            ],
            'incomes' => [
                'amount' => $current_incomes,
                'percentage' => $incomes_percentage,
            ],
        ];
    }
}
