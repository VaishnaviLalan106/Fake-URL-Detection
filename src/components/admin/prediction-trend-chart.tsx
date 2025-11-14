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
            {/* 🌈 Define gradient colors */}
            <defs>
              <linearGradient id="colorLegitimate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPhishing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F44336" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F44336" stopOpacity={0}/>
              </linearGradient>
            </defs>

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

            {/* ✅ Gradient-filled areas */}
            <Area
              dataKey="legitimate"
              type="natural"
              stroke="#2E7D32"
              fill="url(#colorLegitimate)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey="phishing"
              type="natural"
              stroke="#C62828"
              fill="url(#colorPhishing)"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
