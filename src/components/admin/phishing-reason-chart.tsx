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
  { reason: 'Deceptive Link', count: 320, fill: 'var(--color-blue)' },
  { reason: 'Urgent Language', count: 250, fill: 'var(--color-orange)' },
  { reason: 'Spoofed Sender', count: 210, fill: 'var(--color-green)' },
  { reason: 'Suspicious TLD', count: 180, fill: 'var(--color-yellow)' },
];

const chartConfig = {
  count: {
    label: 'Count',
  },
  blue: {
    label: 'Deceptive Link',
    color: 'hsl(var(--chart-1))',
  },
  orange: {
    label: 'Urgent Language',
    color: 'hsl(var(--chart-2))',
  },
  green: {
    label: 'Spoofed Sender',
    color: 'hsl(var(--chart-5))',
  },
  yellow: {
    label: 'Suspicious TLD',
    color: 'hsl(var(--chart-4))',
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
          Deceptive links are the most common indicator{' '}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing breakdown for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
