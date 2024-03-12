import AnalyticsCard from "@/components/dashboard/card";
import SectionTitle from "@/components/ui/custom/section-title";
import SiteAnalytics from "@/types/Analytics";
import { requestAPI } from "@/utils/session";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Web Based Personal Expense Tracker.",
};

export default async function Home() {
  const analytics = await getAnalytics();
  async function getAnalytics() {
    return await requestAPI<SiteAnalytics>(`/analytics`);
  }

  return (
    <>
      {"message" in analytics ? (
        <p className="text-red-600 font-medium text-xl">{analytics.message}</p>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-4 w-full mb-6">
            <AnalyticsCard
              title="Today's Summary"
              amount={analytics.today?.summary.amount ?? 0}
              percentage={analytics.today?.summary.percentage ?? null}
              prev="day"
            />
            <AnalyticsCard
              title="Today's Savings"
              amount={analytics.today?.savings.amount ?? 0}
              percentage={analytics.today?.savings.percentage ?? null}
              prev="day"
            />
            <AnalyticsCard
              title="Today's Outcomes"
              amount={analytics.today?.expenses.amount ?? 0}
              percentage={analytics.today?.expenses.percentage ?? null}
              prev="day"
            />
            <AnalyticsCard
              title="Today's Incomes"
              amount={analytics.today?.incomes.amount ?? 0}
              percentage={analytics.today?.incomes.percentage ?? null}
              prev="day"
            />
          </div>
          <SectionTitle className="mb-4 mt-8"> Monthly Records</SectionTitle>
          <div className="flex flex-col lg:flex-row gap-4 w-full mb-6">
            <AnalyticsCard
              title="Summary"
              amount={analytics.monthly?.summary.amount ?? 0}
              percentage={analytics.monthly?.summary.percentage ?? null}
              prev="day"
            />
            <AnalyticsCard
              title="Savings"
              amount={analytics.monthly?.savings.amount ?? 0}
              percentage={analytics.monthly?.savings.percentage ?? null}
              prev="day"
            />
            <AnalyticsCard
              title="Outcomes"
              amount={analytics.monthly?.expenses.amount ?? 0}
              percentage={analytics.monthly?.expenses.percentage ?? null}
              prev="day"
            />
            <AnalyticsCard
              title="Incomes"
              amount={analytics.monthly?.incomes.amount ?? 0}
              percentage={analytics.monthly?.incomes.percentage ?? null}
              prev="day"
            />
          </div>
          <SectionTitle className="mb-4 mt-8"> Yearly Records</SectionTitle>
          <div className="flex flex-col lg:flex-row gap-4 w-full mb-6">
            <AnalyticsCard
              title="Total Summary"
              amount={analytics.yearly?.summary.amount ?? 0}
              percentage={analytics.yearly?.summary.percentage ?? null}
              prev="year"
            />
            <AnalyticsCard
              title="Total Savings"
              amount={analytics.yearly?.savings.amount ?? 0}
              percentage={analytics.yearly?.savings.percentage ?? null}
              prev="year"
            />
            <AnalyticsCard
              title="Total Outcomes"
              amount={analytics.yearly?.expenses.amount ?? 0}
              percentage={analytics.yearly?.expenses.percentage ?? null}
              prev="year"
            />
            <AnalyticsCard
              title="Total Incomes"
              amount={analytics.yearly?.incomes.amount ?? 0}
              percentage={analytics.yearly?.incomes.percentage ?? null}
              prev="year"
            />
          </div>
        </>
      )}
    </>
  );
}
