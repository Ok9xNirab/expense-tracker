export default interface SiteAnalytics {
  today: Analytics | null;
  monthly: Analytics | null;
  yearly: Analytics | null;
}

interface Analytics {
  summary: Data;
  savings: Data;
  expenses: Data;
  incomes: Data;
}

interface Data {
  amount: number;
  percentage: number;
}
