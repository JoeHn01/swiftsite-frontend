import React from 'react';
import styles from './Hero.module.css'
import SearchBar from './SearchBar/SearchBar';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Build Stunning Websites in Minutes</h1>
        <p>Create professional websites with our pre-designed, customizable templates.</p>
      <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
