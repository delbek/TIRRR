// app/error.tsx
'use client';

import { useEffect } from 'react';

export default function RootError({ 
  error, 
  reset 
}: { 
  error: Error; 
  reset: () => void; 
}) {
  useEffect(() => {
    // if it's a chunk‐load problem, reload the browser
    if (error.message.includes('Loading chunk')) {
      window.location.reload();
    }
  }, [error]);

  // you can render nothing or a “reloading…” UI
  return null;
}