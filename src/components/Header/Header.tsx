import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import HeaderNav from './HeaderNav/HeaderNav';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link className={styles.mainLink} href="/">
          <div className={styles.logo}>SwiftSite</div>
        </Link>
        <HeaderNav />
        <Link href="/auth">
          <button className={styles.headerButton}>Get Started</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
