import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

import { Button } from '../ui/button';

export default function SignOut({ className }: { className?: string }) {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = useCallback(() => {
    signOut();
    router.push('/');
  }, [signOut, router]);

  return (
    <Button className={className} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
