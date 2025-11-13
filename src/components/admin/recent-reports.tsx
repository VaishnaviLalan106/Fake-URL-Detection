'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface Report {
  url: string;
  predicted: string;
  reported: string;
  date: string;
}

interface RecentReportsProps {
  reports: Report[];
}

export default function RecentReports({ reports }: RecentReportsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
        <CardDescription>
          User feedback on prediction accuracy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Prediction</TableHead>
              <TableHead>User Report</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium max-w-xs truncate">{report.url}</TableCell>
                <TableCell>
                  <Badge variant={report.predicted === 'phishing' ? 'destructive' : 'secondary'}>
                    {report.predicted}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={report.reported === 'phishing' ? 'destructive' : 'secondary'}>
                    {report.reported}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-xs">
                  {formatDistanceToNow(new Date(report.date), { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
