import React from 'react';
import Link from 'next/link';
import styles from './News.module.css';

const news = [
  {
    id: '1',
    title: 'Exciting Feature Update',
    content: 'In today’s digital age, innovation is at the forefront of every industry. Our platform has always been committed to providing top-notch services, and this latest feature update is a testament to that promise. With this new feature, users can streamline their workflows, enhance productivity, and enjoy a more intuitive user interface. We have integrated advanced algorithms to optimize performance, ensuring that your experience is seamless and efficient. This update also includes enhanced security protocols, providing peace of mind as you interact with our platform. We’ve listened to your feedback, and we’re confident that this new feature will meet your expectations. Stay tuned for even more improvements, as we’re dedicated to continuous innovation. The future of digital interaction is here, and we’re excited for you to be part of it. Keep exploring, and as always, don’t hesitate to reach out with any questions or feedback you may have. Together, we’ll continue to shape the future of this industry.',
    date: '2024-09-01',
    image: 'empty-image.jpg',
  },
  {
    id: '2',
    title: 'Platform Maintenance',
    content: 'In today’s digital age, innovation is at the forefront of every industry. Our platform has always been committed to providing top-notch services, and this latest feature update is a testament to that promise. With this new feature, users can streamline their workflows, enhance productivity, and enjoy a more intuitive user interface. We have integrated advanced algorithms to optimize performance, ensuring that your experience is seamless and efficient. This update also includes enhanced security protocols, providing peace of mind as you interact with our platform. We’ve listened to your feedback, and we’re confident that this new feature will meet your expectations. Stay tuned for even more improvements, as we’re dedicated to continuous innovation. The future of digital interaction is here, and we’re excited for you to be part of it. Keep exploring, and as always, don’t hesitate to reach out with any questions or feedback you may have. Together, we’ll continue to shape the future of this industry.',
    date: '2024-08-25',
    image: 'empty-image.jpg',
  },
  {
    id: '3',
    title: 'New Template Designs Available',
    content: 'In today’s digital age, innovation is at the forefront of every industry. Our platform has always been committed to providing top-notch services, and this latest feature update is a testament to that promise. With this new feature, users can streamline their workflows, enhance productivity, and enjoy a more intuitive user interface. We have integrated advanced algorithms to optimize performance, ensuring that your experience is seamless and efficient. This update also includes enhanced security protocols, providing peace of mind as you interact with our platform. We’ve listened to your feedback, and we’re confident that this new feature will meet your expectations. Stay tuned for even more improvements, as we’re dedicated to continuous innovation. The future of digital interaction is here, and we’re excited for you to be part of it. Keep exploring, and as always, don’t hesitate to reach out with any questions or feedback you may have. Together, we’ll continue to shape the future of this industry.',
    date: '2024-08-15',
    image: 'empty-image.jpg',
  },
];

const News: React.FC = () => {
  return (
    <div id="news" className={styles.news}>
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
              <p className={styles.newsContentText}>{item.content}</p>
              <Link href={`/news/${item.id}`} className={styles.newsLink}>
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
