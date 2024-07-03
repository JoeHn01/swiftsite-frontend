import React from 'react';
import styles from './Templates.module.css';
import Link from 'next/link';

const templates = [
  {
    id: 1,
    title: 'Business Template',
    description: 'A sleek and professional business template.',
    image: 'empty-image.jpg'
  },
  {
    id: 2,
    title: 'Portfolio Template',
    description: 'Showcase your work with this stunning portfolio template.',
    image: 'empty-image.jpg'
  },
  {
    id: 3,
    title: 'E-commerce Template',
    description: 'An elegant template for your online store.',
    image: 'empty-image.jpg'
  }
];

const Templates: React.FC = () => {
  return (
    <div id="templates" className={styles.templates}>
      <h2 className={styles.sectionTitle}>Featured Templates</h2>
      <div className={styles.arrowContainer}>
        <div className={styles.arrowLeft}>{'<'}</div>
        <div className={styles.templatesGrid}>
          {templates.map(template => (
            <div key={template.id} className={styles.templateCard}>
              <img src={template.image} alt={template.title} className={styles.templateImage} />
              <h3 className={styles.templateTitle}>{template.title}</h3>
              <p className={styles.templateDescription}>{template.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.arrowRight}>{'>'}</div>
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/templates">
          <button className={styles.btnPrimary}>View All Templates</button>
        </Link>
        <div className={styles.searchBar}>
        <input className={styles.searchBarInput} type="text" placeholder="Search templates..." />
      </div>
      </div>
    </div>
  );
}

export default Templates;