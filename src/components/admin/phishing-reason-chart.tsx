'use client';
import { TrendingUp } from 'lucide-react';
import { RadialBar, RadialBarChart, PolarAngleAxis } from 'recharts';

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
} from '@/components/ui/chart';

const chartData = [
  { reason: 'Suspicious TLD', value: 45, fill: 'var(--color-tld)' },
  { reason: 'IP Address URL', value: 30, fill: 'var(--color-ip)' },
  { reason: 'Keyword Use', value: 15, fill: 'var(--color-keyword)' },
  { reason: 'URL Length', value: 10, fill: 'var(--color-length)' },
];

const chartConfig = {
  value: {
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
};

export function PhishingReasonChart() {
  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Phishing Reasons</CardTitle>
        <CardDescription>Breakdown by detection method</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={270}
            innerRadius={30}
            outerRadius={100}
            barSize={20}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              dataKey="value"
              tick={false}
            />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name, props) => (
                     <div>
                       <p className="font-bold">{props.payload.reason}</p>
                       <p className="text-sm">{value}% of detections</p>
                     </div>
                   )}
                />
              }
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Suspicious TLDs are the most common indicator <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing breakdown for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
