import React from 'react';
import { ImEnlarge2, ImDownload3 } from 'react-icons/im';
import { FaRegEdit } from "react-icons/fa";
import styles from './HoverBar.module.css';
import { useRouter } from 'next/navigation';

interface HoverBarProps {
  templateName: string;
  imageRef: React.RefObject<HTMLImageElement>;
}

const HoverBar: React.FC<HoverBarProps> = ({ templateName, imageRef }) => {
  const router = useRouter();

  const handleFullscreen = () => {
    const image = imageRef.current;
    if (image) {
      if (image.requestFullscreen) {
        image.requestFullscreen();
      } else if ((image as any).webkitRequestFullscreen) {
        (image as any).webkitRequestFullscreen();
      } else if ((image as any).msRequestFullscreen) {
        (image as any).msRequestFullscreen();
      }
    }
  };

  const handleDownload = () => {
    const image = imageRef.current;
    if (image) {
      const link = document.createElement('a');
      link.href = image.src;
      link.setAttribute('download', `${templateName}.jpg`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const handleEdit = () => {
    const currentPath = window.location.pathname;
    router.push(`${currentPath}/edit`);
  };

  return (
    <div className={styles.hoverBar}>
      <div className={styles.hoverBarItem}>
        <button className={styles.hoverBarButton} onClick={handleFullscreen}>
          <ImEnlarge2 />
          <span className={styles.tooltip}>Fullscreen</span>
        </button>
      </div>
      <div className={styles.hoverBarItem}>
        <button className={styles.hoverBarButton} onClick={handleDownload}>
          <ImDownload3  />
          <span className={styles.tooltip}>Download</span>
        </button>
      </div>
      <div className={styles.hoverBarItem}>
        <button className={styles.hoverBarButton} onClick={handleEdit}>
          <FaRegEdit />
          <span className={styles.tooltip}>Edit</span>
        </button>
      </div>
    </div>
  );
};

export default HoverBar;
