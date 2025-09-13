import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function GlobalLoader() {
  const pathname = usePathname();

  useEffect(() => {
    // Trigger logic whenever the route changes
    console.log("Route changed to", pathname);
  }, [pathname]);

  return <div>Loading...</div>;
}
