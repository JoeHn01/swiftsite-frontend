import React, { FC } from 'react';
import TemplateImage from './TemplateImage/TemplateImage';
import styles from './TemplateContainer.module.css';

interface TemplateContainerProps {
  templateId: string;
}
  
const TemplateContainer: FC<TemplateContainerProps> = ({ templateId }) => {
  return (
    <div className={styles.templateContainer}>
      <h1>Template with ID: {templateId}</h1>
      <TemplateImage />
    </div>
  );
};

export default TemplateContainer;
