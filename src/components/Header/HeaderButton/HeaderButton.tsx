'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button/Button';

const HeaderButton: React.FC = () => {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth';

  return !isAuthPage ? (
    <Link href="/auth">
      <Button variant="primary">Get Started</Button>
    </Link>
  ) : null;
};

export default HeaderButton;
