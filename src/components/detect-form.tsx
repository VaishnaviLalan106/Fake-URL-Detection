'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

interface DetectFormProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  initialUrl?: string;
}

export default function DetectForm({
  onAnalyze,
  isLoading,
  initialUrl = '',
}: DetectFormProps) {
  const [url, setUrl] = useState(initialUrl);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  useEffect(() => {
    // A simple regex to check for something that looks like a domain.
    // This is not a full URL validation, but good enough for enabling the button.
    const urlRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    const protocolRegex = /^(https?:\/\/)/i;
    
    let domainPart = url;
    if (protocolRegex.test(url)) {
      try {
        domainPart = new URL(url).hostname;
      } catch (e) {
        setIsValid(false);
        return;
      }
    }
    
    setIsValid(urlRegex.test(domainPart));

  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !isLoading) {
      onAnalyze(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="e.g., example-login-paypal.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-10"
            aria-label="URL to analyze"
          />
        </div>
        <Button type="submit" disabled={!isValid || isLoading}>
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Check URL'
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground px-1">
        We analyze only the URL string. We do not visit or fetch page contents. URLs may be stored for analysis.
      </p>
    </form>
  );
}
