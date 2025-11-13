'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Info, AlertTriangle, ShieldCheck, Flag } from 'lucide-react';
import type { PredictionResult } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface ResultCardProps {
  result: PredictionResult | null;
  isLoading: boolean;
  url: string;
  onReport: () => void;
}

export default function ResultCard({
  result,
  isLoading,
  url,
  onReport,
}: ResultCardProps) {
  const { toast } = useToast();

  const handleReport = async (correctLabel: 'phishing' | 'legitimate') => {
    if (!result) return;
    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          predicted_label: result.label,
          correct_label: correctLabel,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit report.');

      toast({
        title: 'Report Submitted',
        description: 'Thank you for your feedback!',
      });
      onReport();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Could not submit report.',
      });
    }
  };

  if (isLoading) {
    return <ResultSkeleton />;
  }

  if (!result) {
    return (
      <Card className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <Info className="h-12 w-12 text-muted-foreground mb-4" />
        <CardHeader>
          <CardTitle>Awaiting Analysis</CardTitle>
          <CardDescription>
            Enter a URL above to check its safety.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const isPhishing = result.label === 'phishing';
  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <TooltipProvider>
      <Card
        className={`min-h-[400px] border-2 ${
          isPhishing ? 'border-destructive' : 'border-green-500'
        }`}
      >
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2">
            {isPhishing ? (
              <AlertTriangle className="h-8 w-8 text-destructive" />
            ) : (
              <ShieldCheck className="h-8 w-8 text-green-500" />
            )}
            <CardTitle
              className={`text-2xl font-bold ${
                isPhishing ? 'text-destructive' : 'text-green-500'
              }`}
            >
              {isPhishing ? 'Phishing Detected' : 'Looks Legitimate'}
            </CardTitle>
          </div>
          <CardDescription className="break-all">{url}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <p className="text-sm font-medium">Confidence Score</p>
              <p
                className={`text-lg font-bold ${
                  isPhishing ? 'text-destructive' : 'text-green-500'
                }`}
              >
                {confidencePercent}%
              </p>
            </div>
            <Progress
              value={confidencePercent}
              className={isPhishing ? '[&>div]:bg-destructive' : '[&>div]:bg-green-500'}
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Top Reasons</h4>
            <ul className="space-y-2">
              {result.top_reasons.map((reason) => (
                <li key={reason.feature} className="flex items-center gap-2 text-sm">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{reason.explanation}</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="flex-grow">{reason.feature.replace(/_/g, ' ')}</span>
                  <Badge variant="secondary" className="font-mono">
                    {String(reason.value)}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4">
          <p className="text-xs text-muted-foreground">
            Model: v{result.model_version}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Incorrect?</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleReport(isPhishing ? 'legitimate' : 'phishing')}
            >
              <Flag className="h-4 w-4 mr-2" /> Report
            </Button>
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}

function ResultSkeleton() {
  return (
    <Card className="min-h-[400px]">
      <CardHeader className="text-center">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-full max-w-sm mx-auto mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-12" />
          </div>
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-20 mb-3" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 flex-grow" />
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24" />
      </CardFooter>
    </Card>
  );
}
