'use client'

import React, { useState, useRef } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { usePathname } from 'next/navigation';
import styles from './HeaderNav.module.css';
import toast from 'react-hot-toast';

interface NavItem {
  label: string;
}

const HeaderNav: React.FC = () => {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  if (!isLandingPage) {
    return null;
  }

  const navigationItems: NavItem[] = [
    { label: "Home" },
    { label: "Templates" },
    { label: "News" },
    { label: "About" },
  ];

  const handleNavClick = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId.toLowerCase());
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      toast.error(`Element with ID '${sectionId}' not found.`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div ref={headerRef} className={styles.headerNav}>
      <button onClick={toggleMenu} className={styles.burgerButton}>
        <GiHamburgerMenu />
      </button>
      <ul
        className={`${styles.headerNavList} ${isMenuOpen ? styles.mobileMenu : ''}`}
      >
        {navigationItems.map((item) => (
          <li key={item.label} className={styles.headerNavItem}>
            <button
              onClick={() => handleNavClick(item.label.toLowerCase())}
              className={styles.headerNavButton}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeaderNav;
