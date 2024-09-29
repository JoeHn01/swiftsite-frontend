import React from 'react';
import styles from './NewsImage.module.css';

const NewsImage: React.FC = () => {

  return (
    <div className={styles.imageWrapper}>
      <img src='/empty-image.jpg' className={styles.newsImage} />
    </div>
  );
};

export default NewsImage;
