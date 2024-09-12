import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  return (
    <div className={styles.searchBar}>
      <input className={styles.searchBarInput} type="text" placeholder="Search templates..." />
    </div>
  );
};

export default SearchBar;
