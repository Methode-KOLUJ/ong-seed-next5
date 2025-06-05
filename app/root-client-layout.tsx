// app/root-client-layout.tsx

'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';

export function RootClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavbarOn = ['/notre-histoire','/nos-films','/faites-un-don','/opportunites-d-emploi','/conversations','/postuler'];
  const showNavbar = !hideNavbarOn.includes(pathname);
  

  return (
    <>
      {showNavbar && <Navbar />}
      <Loader />
      <main>{children}</main>
    </>
  );
}
