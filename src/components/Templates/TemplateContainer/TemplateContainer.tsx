import React, { FC } from 'react';
import TemplateImage from './TemplateImage/TemplateImage';
import styles from './TemplateContainer.module.css';

interface TemplateContainerProps {
  templateName: string;
  templateDescription: string;
}
  
const TemplateContainer: FC<TemplateContainerProps> = ({ templateName, templateDescription }) => {
  return (
    <div className={styles.templateContainer}>
      <h1>{templateName}</h1>
      <h3>{templateDescription}</h3>
      <TemplateImage />
    </div>
  );
};

export default TemplateContainer;
