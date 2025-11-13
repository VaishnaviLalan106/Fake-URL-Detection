'use client';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', legitimate: 186, phishing: 80 },
  { month: 'February', legitimate: 305, phishing: 200 },
  { month: 'March', legitimate: 237, phishing: 120 },
  { month: 'April', legitimate: 73, phishing: 190 },
  { month: 'May', legitimate: 209, phishing: 130 },
  { month: 'June', legitimate: 214, phishing: 140 },
];

const chartConfig = {
  legitimate: {
    label: 'Legitimate',
    color: 'hsl(var(--chart-2))',
  },
  phishing: {
    label: 'Phishing',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function PredictionTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prediction Trends</CardTitle>
        <CardDescription>
          Showing total predictions for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="legitimate"
              type="natural"
              fill="var(--color-legitimate)"
              fillOpacity={0.4}
              stroke="var(--color-legitimate)"
              stackId="a"
            />
            <Area
              dataKey="phishing"
              type="natural"
              fill="var(--color-phishing)"
              fillOpacity={0.4}
              stroke="var(--color-phishing)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
