'use client';

import { useEffect } from 'react';
import { useRouter } from '@gc-broadcast-web/utils/routes/hooks';
// ----------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();


  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return <></>;
}
