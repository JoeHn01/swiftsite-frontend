import React from 'react';
import styles from './Hero.module.css';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <div id="home" className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroHeading}>Your Ultimate Templating Solution</h1>
        <p className={styles.heroPar}>Create stunning templates effortlessly with our comprehensive library.</p>
        <div className={styles.ctaButtons}>
          <button className={styles.btnPrimary}>
            <Link className={styles.authLink} href="auth">Create an Account</Link>
          </button>
          <button className={styles.btnSecondary}>
            <Link className={styles.aboutLink} href="templates">Learn More</Link>
          </button>
        </div>
        <div className={styles.socialProof}>
          <span>Trusted by 50,000+ users</span>
        </div>
      </div>
      <div className={styles.heroImageContainer}>
        <img className={styles.heroImage} src="hero-image.jpg" alt="Hero" />
      </div>
    </div>
  );
}

export default Hero;
