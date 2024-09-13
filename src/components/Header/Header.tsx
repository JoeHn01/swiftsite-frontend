import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import HeaderNav from './HeaderNav/HeaderNav';
import HeaderButton from './HeaderButton/HeaderButton';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link className={styles.mainLink} href="/">
          <div className={styles.logo}>SwiftSite</div>
        </Link>
        <HeaderNav />
        <HeaderButton />
      </div>
    </header>
  );
};

export default Header;
