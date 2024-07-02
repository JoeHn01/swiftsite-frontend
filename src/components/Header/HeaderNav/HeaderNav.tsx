'use client'

import React from 'react'
import styles from './HeaderNav.module.css'

interface NavItem {
  label: string;
}

const HeaderNav = () => {
  const navigationItems: NavItem[] = [
    { label: "Home" },
    { label: "Templates" },
    { label: "About" },
  ];

  const handleNavClick = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId.toLowerCase());
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Element with ID '${sectionId}' not found.`);
    }
  };

  return (
    <div className={styles.headerNav}>
      <ul className={styles.headerNavList}>
        {navigationItems.map((item) => (
          <li key={item.label} className={styles.headerNavItem}>
            <button onClick={() => handleNavClick(item.label.toLowerCase())} className={styles.headerNavButton}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeaderNav;
