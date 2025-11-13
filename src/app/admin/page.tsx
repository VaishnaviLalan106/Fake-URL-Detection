'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import StatsCards from '@/components/admin/stats-cards';
import RecentReports from '@/components/admin/recent-reports';

// Mock data, to be replaced with API calls
const stats = {
  totalChecks: 10234,
  phishingRate: 0.15,
  reportsCount: 128,
};

const reports = [
  {
    url: 'http://secure-login-apple.com/update-id',
    predicted: 'phishing',
    reported: 'phishing',
    date: new Date().toISOString(),
  },
  {
    url: 'http://my-bank-portal.co/login.html',
    predicted: 'legitimate',
    reported: 'phishing',
    date: new Date(Date.now() - 3600 * 1000).toISOString(),
  },
  {
    url: 'https://github.com/features/actions',
    predicted: 'legitimate',
    reported: 'legitimate',
    date: new Date(Date.now() - 3600 * 2000).toISOString(),
  },
  {
    url: 'https://some-random-blog.info',
    predicted: 'phishing',
    reported: 'legitimate',
    date: new Date(Date.now() - 3600 * 5000).toISOString(),
  },
];


export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of URL analysis activity and user reports.
          </p>
        </div>

        <StatsCards stats={stats} />

        <RecentReports reports={reports} />
      </div>
    </div>
  );
}
