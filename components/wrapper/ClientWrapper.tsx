'use client';

import React from 'react';
import { useAuth } from '@/providers/AuthProvider';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
