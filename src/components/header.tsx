'use client';
import Link from 'next/link';
import { Shield, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    const auth = (await import('@/firebase')).getAuth();
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background border-b">
      <Link href="/" className="flex items-center justify-center">
        <Shield className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold font-headline">PhishGuard</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Button variant="ghost" asChild>
          <Link
            href="/admin"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Admin
          </Link>
        </Button>
        {loading ? (
          <div className="h-8 w-20 rounded-md bg-muted animate-pulse" />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.photoURL || ''}
                    alt={user.displayName || ''}
                  />
                  <AvatarFallback>
                    {user.displayName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.displayName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/login">Log In</Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
