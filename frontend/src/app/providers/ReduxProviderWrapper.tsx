'use client';

import { ReduxProvider } from '@/store/store';

export function ReduxProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
