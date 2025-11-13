'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp, Target, Flag } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalChecks: number;
    phishingRate: number;
    reportsCount: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Checks</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.totalChecks.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Total URLs analyzed
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Phishing Rate</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(stats.phishingRate * 100).toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            Percentage of URLs flagged as phishing
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">User Reports</CardTitle>
          <Flag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.reportsCount.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Total feedback submissions from users
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
