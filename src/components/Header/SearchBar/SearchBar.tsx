'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import styles from './SearchBar.module.css'

const SearchBar: React.FC = () => {
  const pathname = usePathname();

  if (pathname !== '/templates') {
    return null;
  }

  return (
    <div className={styles.searchBarContainer}>
      <input className={styles.searchBar} type="text" placeholder="Search templates..." />
    </div>
  );
};

export default SearchBar;
