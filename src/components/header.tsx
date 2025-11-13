'use client';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-transparent border-b">
      <Link href="/" className="flex items-center justify-center">
        <Shield className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold font-headline">PhishGuard</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center"></nav>
    </header>
  );
}
