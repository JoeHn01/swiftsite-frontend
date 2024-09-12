'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import styles from './HeaderButton.module.css'

const HeaderButton: React.FC = () => {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth';

  return !isAuthPage ? (
    <div className={styles.headerButtonWrapper}>
      <Link href="/auth" >
        <Button variant="primary">Get Started</Button>
      </Link>
    </div>
  ) : null;
};

export default HeaderButton;
