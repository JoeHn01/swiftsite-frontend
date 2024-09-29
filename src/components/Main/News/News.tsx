'use client';

import { useEffect, useState } from 'react';
import Error from 'next/error';
import toast from 'react-hot-toast';
import { LiaSpinnerSolid } from "react-icons/lia";
import Link from 'next/link';
import styles from './News.module.css';

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[] | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchFeaturedNews() {
      try {
        const response = await fetch('http://localhost:3000/news/featured');
        if (!response.ok) {
          setError(true);
          return;
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        toast.error('A network error occurred!');
        setError(true);
      }
    }
    fetchFeaturedNews();
  }, []);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!news) {
    return (
      <div className="spinner-container">
        <LiaSpinnerSolid className="spinner" />
      </div>
    );
  }

  return (
    <div id="news" className={styles.news}>
      <h2 className={styles.newsTitle}>Latest News</h2>
      <div className={styles.newsContainer}>
        {news.length === 0 ? (
          <p>No featured news available.</p>
        ) : (
          news.map((item) => (
            <div key={item._id} className={styles.newsItem}>
              <img src={ item.image ? item.image : 'empty-image.jpg' } alt={item.title} className={styles.newsImage} />
              <div className={styles.newsContent}>
                <h3 className={styles.newsItemTitle}>{item.title}</h3>
                <p className={styles.newsDate}>{new Date(item.date).toLocaleDateString()}</p>
                <p className={styles.newsContentText}>{item.content}</p>
                <Link href={`/news/${item._id}`} className={styles.newsLink}>
                  Read More
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
