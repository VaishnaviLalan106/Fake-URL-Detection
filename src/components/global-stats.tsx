'use client';
import { Card } from '@/components/ui/card';
import { ShieldCheck, Target, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setCount(value);
    });
    return () => cancelAnimationFrame(animation);
  }, [value]);
  
  // This is a simplified animation. For a proper animated counter,
  // we would increment the number over time.
  // For now, it just sets the final number.
  // A real implementation would use a library or a more complex useEffect.
  return <span className="transition-all duration-1000 ease-out">{Math.round(count).toLocaleString()}</span>
};

const stats = [
  {
    icon: Globe,
    label: 'URLs Scanned Today',
    value: 142034,
  },
  {
    icon: Target,
    label: 'Active Threats Detected',
    value: 8921,
  },
  {
    icon: ShieldCheck,
    label: 'Detection Accuracy',
    value: 99.8,
    unit: '%',
  },
];

export default function GlobalStats() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }


  return (
    <section className="container px-4 md:px-6">
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 flex items-center gap-4">
            <stat.icon className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">
                <AnimatedCounter value={stat.value} />
                {stat.unit}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
