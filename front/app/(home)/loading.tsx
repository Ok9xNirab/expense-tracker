import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SectionTitle from "@/components/ui/custom/section-title";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingContent = () => (
  <>
    <CardTitle className="text-3xl">
      <Skeleton className="h-10 w-32" />
    </CardTitle>
    <CardDescription>
      <Skeleton className="h-4 w-52 lg:w-full" />
    </CardDescription>
  </>
);

export default function DashboardLoading() {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 w-full mb-6">
        <Card className="w-full lg:w-1/4">
          <CardHeader>
            <p className="tracking-tight text-sm font-normal">
              Today's Summary
            </p>
            <LoadingContent />
          </CardHeader>
        </Card>
        <Card className="w-full lg:w-1/4">
          <CardHeader>
            <p className="tracking-tight text-sm font-normal">
              Today's Savings
            </p>
            <LoadingContent />
          </CardHeader>
        </Card>
        <Card className="w-full lg:w-1/4">
          <CardHeader>
            <p className="tracking-tight text-sm font-normal">
              Today's Outcomes
            </p>
            <LoadingContent />
          </CardHeader>
        </Card>
        <Card className="w-full lg:w-1/4">
          <CardHeader>
            <p className="tracking-tight text-sm font-normal">
              Today's Incomes
            </p>
            <LoadingContent />
          </CardHeader>
        </Card>
      </div>
      <SectionTitle className="mb-4 mt-8"> Monthly Records</SectionTitle>
      <div className="flex flex-col lg:flex-row gap-4 w-full mb-6">
        <Card className="w-full lg:w-1/4">
          <CardHeader>
            <p className="tracking-tight text-sm font-normal">Summary</p>
            <LoadingContent />
          </CardHeader>
        </Card>
        <Card className="w-full lg:w-1/4">
          <CardHeader>
            <p className="tracking-tight text-sm font-normal">Savings</p>
            <LoadingContent />
          </CardHeader>
        </Card>
        <Card className="w-full lg:w-1/4">
          <CardHeader>
            <p className="tracking-tight text-sm font-normal">Outcomes</p>
            <LoadingContent />
          </CardHeader>
        </Card>
        <Card className="w-full lg:w-1/4">
          <CardHeader>
            <p className="tracking-tight text-sm font-normal">Incomes</p>
            <LoadingContent />
          </CardHeader>
        </Card>
      </div>
      <SectionTitle className="mb-4 mt-8"> Yearly Records</SectionTitle>
      <div className="flex flex-col lg:flex-row gap-4 w-full mb-6">
        <Card className="w-full lg:w-1/4">
          <CardHeader>
            <p className="tracking-tight text-sm font-normal">Total Summary</p>
            <LoadingContent />
          </CardHeader>
        </Card>
        <Card className="w-full lg:w-1/4">
          <CardHeader>
            <p className="tracking-tight text-sm font-normal">Total Savings</p>
            <LoadingContent />
          </CardHeader>
        </Card>
        <Card className="w-full lg:w-1/4">
          <CardHeader>
            <p className="tracking-tight text-sm font-normal">Total Outcomes</p>
            <LoadingContent />
          </CardHeader>
        </Card>
        <Card className="w-full lg:w-1/4">
          <CardHeader>
            <p className="tracking-tight text-sm font-normal">Total Incomes</p>
            <LoadingContent />
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
