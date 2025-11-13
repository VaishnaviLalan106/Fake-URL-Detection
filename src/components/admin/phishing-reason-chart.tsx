'use client';
import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { reason: 'Suspicious TLD', count: 275, fill: 'var(--color-tld)' },
  { reason: 'IP Address URL', count: 200, fill: 'var(--color-ip)' },
  { reason: 'Keyword Use', count: 187, fill: 'var(--color-keyword)' },
  { reason: 'URL Length', count: 173, fill: 'var(--color-length)' },
  { reason: 'Other', count: 90, fill: 'var(--color-other)' },
];

const chartConfig = {
  count: {
    label: 'Count',
  },
  tld: {
    label: 'Suspicious TLD',
    color: 'hsl(var(--chart-1))',
  },
  ip: {
    label: 'IP Address URL',
    color: 'hsl(var(--chart-2))',
  },
  keyword: {
    label: 'Keyword Use',
    color: 'hsl(var(--chart-3))',
  },
  length: {
    label: 'URL Length',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function PhishingReasonChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Phishing Reasons</CardTitle>
        <CardDescription>Breakdown by detection method</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="reason"
              innerRadius={60}
              strokeWidth={5}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="reason" />}
              className="-translate-y-[2rem] flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Suspicious TLDs are the most common indicator{' '}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing breakdown for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
