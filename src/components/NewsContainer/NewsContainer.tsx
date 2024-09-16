import React from 'react';
import styles from './NewsContainer.module.css';
import NewsImage from './NewsImage/NewsImage';

interface NewsContainerProps {
  title: string;
  date: string;
  content: string;
}

const NewsContainer: React.FC<NewsContainerProps> = ({ title, date, content }) => {
  return (
    <div className={styles.newsContainer}>
      <h1 className={styles.newsTitle}>{title}</h1>
      <p className={styles.newsDate}>{date}</p>
      <NewsImage />
      <div className={styles.newsContent}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default NewsContainer;