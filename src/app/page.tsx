'use client';

import { useState } from 'react';
import type { PredictionResult, HistoryItem } from '@/lib/types';
import DetectForm from '@/components/detect-form';
import ResultCard from '@/components/result-card';
import HistoryList from '@/components/history-list';
import { useHistory } from '@/hooks/use-history';
import { ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { motion } from 'framer-motion';

export default function Home() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const { history, addHistoryItem } = useHistory();

  const heroImage = placeholderImages.find(p => p.id === 'hero-shield');

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
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-transparent">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Stay Ahead of Phishing Scams
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  PhishGuard provides instant analysis of URLs to protect you from malicious links. Enter a URL to check its safety.
                </p>
              </div>
              <div className="w-full max-w-2xl space-y-4">
                <DetectForm
                  onAnalyze={handleAnalysis}
                  isLoading={isLoading}
                  initialUrl={currentUrl}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative flex items-center justify-center">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={400}
                  height={400}
                  className="rounded-full object-cover aspect-square shadow-2xl"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ShieldCheck className="absolute text-primary-foreground h-1/2 w-1/2 top-1/4 left-1/4" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 my-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold mb-4 font-headline">Analysis Result</h2>
            <ResultCard
              result={result}
              isLoading={isLoading}
              url={currentUrl}
              onReport={handleReport}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 font-headline">Recent Checks</h2>
            <HistoryList history={history} onSelect={handleHistorySelect} />
          </div>
        </div>
      </div>
    </div>
  );
}
