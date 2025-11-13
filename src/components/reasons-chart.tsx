'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
} from '@/components/ui/chart';
import type { PredictionFeature } from '@/lib/types';
import { useMemo } from 'react';

interface ReasonsChartProps {
  reasons: PredictionFeature[];
}

export function ReasonsChart({ reasons }: ReasonsChartProps) {
  const chartData = useMemo(() => {
    return reasons
      .map(reason => ({
        name: reason.feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        score: Math.round(reason.score * 100),
        value: reason.value,
        explanation: reason.explanation,
      }))
      .sort((a, b) => b.score - a.score);
  }, [reasons]);

  return (
    <div className="w-full h-32">
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer
          config={{
            score: {
              label: 'Risk Contribution',
              color: 'hsl(var(--destructive))',
            },
          }}
        >
          <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 10 }}>
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
              width={120}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              content={
                <ChartTooltipContent
                  formatter={(value, name, props) => (
                    <div>
                      <p className="font-bold">{props.payload.name}</p>
                      <p>{props.payload.explanation}</p>
                      <p className="text-sm text-muted-foreground mt-1">Value: {String(props.payload.value)}</p>
                    </div>
                  )}
                  hideLabel
                  hideIndicator
                />
              }
            />
            <Bar dataKey="score" fill="var(--color-score)" radius={4} />
          </BarChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  );
}
