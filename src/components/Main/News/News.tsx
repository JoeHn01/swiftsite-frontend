import React from 'react';
import styles from './News.module.css';

const news = [
  {
    id: '1',
    title: 'Exciting Feature Update',
    description: 'We have launched a new feature to enhance your experience.',
    date: '2024-09-01',
    image: 'empty-image.jpg',
    link: '/news/feature-update',
  },
  {
    id: '2',
    title: 'Platform Maintenance',
    description: 'Scheduled maintenance will occur this weekend.',
    date: '2024-08-25',
    // image: 'empty-image.jpg',
    link: '/news/maintenance',
  },
  {
    id: '3',
    title: 'New Template Designs Available',
    description: 'Check out our latest template designs.',
    date: '2024-08-15',
    // image: 'empty-image.jpg',
    link: '/news/new-templates',
  },
];

const News: React.FC = () => {

  return (
    <div className={styles.news}>
      <h2 className={styles.newsTitle}>Latest News</h2>
      <div className={styles.newsContainer}>
        {news.map((item) => (
          <div key={item.id} className={styles.newsItem}>
            {item.image && (
              <img src={item.image} alt={item.title} className={styles.newsImage} />
            )}
            <div className={styles.newsContent}>
              <h3 className={styles.newsItemTitle}>{item.title}</h3>
              <p className={styles.newsDate}>{new Date(item.date).toLocaleDateString()}</p>
              <p className={styles.newsDescription}>{item.description}</p>
              <a href={item.link} className={styles.newsLink}>Read More...</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
