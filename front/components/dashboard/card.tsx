import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type PropsType = {
  title: string;
  amount: number;
  percentage: number | null;
  prev: "day" | "month" | "year";
};

export default function AnalyticsCard({
  title,
  amount,
  percentage,
  prev,
}: PropsType) {
  return (
    <Card className="w-full lg:w-1/4">
      <CardHeader>
        <p className="tracking-tight text-sm font-normal">{title}</p>
        <CardTitle className="text-3xl">$ {amount}</CardTitle>
        {percentage ? (
          <CardDescription>
            {percentage > 0 && "+"}
            {percentage}% from last {prev}
          </CardDescription>
        ) : (
          ""
        )}
      </CardHeader>
    </Card>
  );
}
