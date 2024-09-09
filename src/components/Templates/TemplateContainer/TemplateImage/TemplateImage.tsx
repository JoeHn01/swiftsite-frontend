'use client';

import React, { useState, useRef } from 'react';
import { ImEnlarge2 } from 'react-icons/im';
import styles from './TemplateImage.module.css';

const HoverImage: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const handleFullscreen = () => {
    const image = imageRef.current;
    if (image) {
      if (image.requestFullscreen) {
        image.requestFullscreen();
      } else if ((image as any).webkitRequestFullscreen) {
        // Safari specific
        (image as any).webkitRequestFullscreen();
      } else if ((image as any).msRequestFullscreen) {
        // IE11 specific
        (image as any).msRequestFullscreen();
      }
    }
  };

  return (
    <div
      className={styles.imageWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovering && (
        <div className={styles.hoverBar}>
          <button className={styles.hoverBarButton} onClick={handleFullscreen}>
            <ImEnlarge2 />
          </button>
        </div>
      )}
      <img
        ref={imageRef}
        src='/empty-image.jpg'
        alt='Placeholder for template'
        className={styles.placeholderImage}
      />
    </div>
  );
};

export default HoverImage;
