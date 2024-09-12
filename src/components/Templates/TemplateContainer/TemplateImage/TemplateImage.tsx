import React, { useState, useRef } from 'react';
import HoverBar from './HoverBar/HoverBar';
import styles from './TemplateImage.module.css';

interface TemplateImageProps {
  templateName: string;
}

const TemplateImage: React.FC<TemplateImageProps> = ({ templateName }) => {
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
        <HoverBar templateName={templateName} imageRef={imageRef} />
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
