import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import TemplateGrid from '../../Templates/TemplateGrid/TemplateGrid';
import styles from './Templates.module.css';

const templates = [
  {
    id: 1,
    title: 'Business',
    description: 'A sleek and professional business template.',
    image: 'business-template.jpg',
  },
  {
    id: 2,
    title: 'Portfolio',
    description: 'Showcase your work with this portfolio template.',
    image: 'portfolio-template.jpg'
  },
  {
    id: 3,
    title: 'E-commerce',
    description: 'An elegant template for your online store.',
    image: 'ecommerce-template.jpg'
  },
  {
    id: 4,
    title: 'Restaurant',
    description: 'A very attractive template for your restaurant.',
    image: 'restaurant-template.jpg'
  },
  {
    id: 5,
    title: 'Blog',
    description: 'A template for your personal or professional blog.',
    image: 'blog-template.jpg'
  },
  {
    id: 6,
    title: 'Event',
    description: 'An engaging template for promoting your events.',
    image: 'event-template.jpg'
  }
];

const Templates: React.FC = () => {
  return (
    <div id="templates" className={styles.templates}>
      <TemplateGrid title="Featured Templates" templates={templates} />
      <div className={styles.buttonContainer}>
        <Link href="templates">
          <Button variant='primary' >Browse All Templates</Button>
        </Link>
      </div>
      <div className={styles.searchBar}>
        <input className={styles.searchBarInput} type="text" placeholder="Search templates..." />
      </div>
    </div>
  );
}

export default Templates;
