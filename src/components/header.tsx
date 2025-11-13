'use client';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background border-b">
      <Link href="/" className="flex items-center justify-center">
        <Shield className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold font-headline">PhishGuard</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button variant="ghost" asChild>
          <Link
            href="/admin"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Admin
          </Link>
        </Button>
        <Button>Log In</Button>
      </nav>
    </header>
  );
}
