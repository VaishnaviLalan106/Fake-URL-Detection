'use client';

import { useState } from 'react';
import type { PredictionResult } from '@/lib/types';
import DetectForm from '@/components/detect-form';
import ResultCard from '@/components/result-card';
import HistoryList from '@/components/history-list';
import { useHistory } from '@/hooks/use-history';
import { motion } from 'framer-motion';
import GlobalStats from '@/components/global-stats';

export default function Home() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const { history, addHistoryItem } = useHistory();

  const handleAnalysis = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setCurrentUrl(url);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An unexpected error occurred.');
      }

      const data: PredictionResult = await response.json();
      setResult(data);
      addHistoryItem({ url, verdict: data.label, timestamp: data.timestamp });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReport = () => {
    // Reporting logic will be handled inside ResultCard
    // After reporting, we might want to clear the result
    // setResult(null);
  };

  const handleHistorySelect = (url: string) => {
    setCurrentUrl(url);
    handleAnalysis(url);
  };

  return (
    <div className="w-full">
      <section className="w-full py-20 md:py-24 lg:py-32 bg-transparent">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                Instant AI-Powered URL Analysis
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Protect yourself from phishing and malicious links. PhishGuard uses advanced analysis to detect threats in real-time.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-2xl space-y-4"
            >
              <DetectForm
                onAnalyze={handleAnalysis}
                isLoading={isLoading}
                initialUrl={currentUrl}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </motion.div>
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="transition-transform duration-300 ease-in-out hover:scale-[1.02]"
      >
        <GlobalStats />
      </motion.div>

      <div className="container px-4 md:px-6 my-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <h2 className="text-2xl font-bold mb-4 font-headline">Analysis Result</h2>
            <ResultCard
              result={result}
              isLoading={isLoading}
              url={currentUrl}
              onReport={handleReport}
            />
          </div>
          <div className="transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <h2 className="text-2xl font-bold mb-4 font-headline">Recent Checks</h2>
            <HistoryList history={history} onSelect={handleHistorySelect} />
          </div>
        </div>
      </div>
    </div>
  );
}
