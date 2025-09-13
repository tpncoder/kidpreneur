"use client"; // <-- Add this at the very top

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function GlobalLoader() {
  const pathname = usePathname();

  useEffect(() => {
    console.log("Pathname changed:", pathname);
  }, [pathname]);

  return null; // Or your loader JSX
}
