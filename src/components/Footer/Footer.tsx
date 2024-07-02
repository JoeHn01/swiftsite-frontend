import React from 'react';
import styles from './footer.module.css';

const footerLinks = [
  { text: 'Privacy Policy', link: '/privacy-policy' },
  { text: 'Terms of Service', link: '/terms-of-service' },
  { text: 'Contact Us', link: '/contact-us' },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footerList}>
        {footerLinks.map((link) => (
          <li className={styles.footerListItem} key={link.text}>
            <a className={styles.footerListLink} href={link.link}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
      <p className={styles.footerCopyright}>&copy; 2024 SwiftSite. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
