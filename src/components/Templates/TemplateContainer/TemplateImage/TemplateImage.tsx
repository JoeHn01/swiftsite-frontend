'use client';

import React, { useState, useRef } from 'react';
import styles from './TemplateImage.module.css';

const TemplateImage: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div
      className={styles.imageWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovering && (
        <div className={styles.hoverBar}>
            {/* TODO: Add buttons for template-related actions (fullscreen, zooming, etc.) */}
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

export default TemplateImage;
