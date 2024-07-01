import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css'

interface HeaderProps {}

interface NavItem {
  href: string;
  label: string;
}

const navigationItems: NavItem[] = [
  { href: "/section1", label: "Section 1" },
  { href: "/section2", label: "Section 2" },
  { href: "/section3", label: "Section 3" },
]; // needs to pass the id of the section instead ofthe href (navigates through the same page)

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.logo}>SwiftSite</div>
        </Link>
        <nav className={styles.headerNav}>
          <ul>
            {navigationItems.map((item) => (
            <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
            </li>
            ))}
          </ul>
        </nav>
        <button className={styles.headerButton}>Get Started</button>
      </div>
    </header>
  );
};

export default Header;
