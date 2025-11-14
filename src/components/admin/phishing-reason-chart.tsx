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

// 🟢 Updated: Added 4 custom bright colors for your chart
const chartData = [
  { reason: 'Deceptive Link', count: 320, fill: '#FF6B6B' },   // red-pink
  { reason: 'Urgent Language', count: 250, fill: '#FFD93D' },  // yellow
  { reason: 'Spoofed Sender', count: 210, fill: '#6BCB77' },   // green
  { reason: 'Suspicious TLD', count: 180, fill: '#4D96FF' },   // blue
];

// 🟢 Updated: Match config colors to chartData colors
const chartConfig = {
  count: {
    label: 'Count',
  },
  deceptive: {
    label: 'Deceptive Link',
    color: '#FF6B6B',
  },
  urgent: {
    label: 'Urgent Language',
    color: '#FFD93D',
  },
  spoofed: {
    label: 'Spoofed Sender',
    color: '#6BCB77',
  },
  tld: {
    label: 'Suspicious TLD',
    color: '#4D96FF',
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
