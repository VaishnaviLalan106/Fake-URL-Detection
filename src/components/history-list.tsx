'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import type { HistoryItem } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface HistoryListProps {
  history: HistoryItem[];
  onSelect: (url: string) => void;
}

export default function HistoryList({ history, onSelect }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center min-h-[438px] text-center p-6 border-dashed border-2">
        <CardHeader>
          <CardTitle>No History</CardTitle>
          <CardDescription>
            Your recent checks will appear here.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="min-h-[438px]">
      <CardContent className="p-0">
        <ScrollArea className="h-[438px]">
          <div className="p-6 space-y-4">
            {history.map((item, index) => (
              <button
                key={`${item.timestamp}-${index}`}
                onClick={() => onSelect(item.url)}
                className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors block"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-grow break-all pr-4">
                    <p className="font-medium text-sm">{item.url}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  <Badge
                    variant={item.verdict === 'phishing' ? 'destructive' : 'default'}
                    className={item.verdict === 'legitimate' ? 'bg-green-500' : ''}
                  >
                    {item.verdict}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
