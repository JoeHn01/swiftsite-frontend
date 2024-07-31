import React from 'react';
import styles from './TemplateGrid.module.css';

interface Template {
  id: number;
  title: string;
  description: string;
  image: string;
  category?: string;
}

interface TemplateGridProps {
  title: string;
  templates: Template[];
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ title, templates }) => {
  return (
    <div className={styles.templateGridSection}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.templatesGrid}>
        {templates.map(template => (
          <div key={template.id} className={styles.templateCard}>
            <img src={template.image} alt={template.title} className={styles.templateImage} />
            <h3 className={styles.templateTitle}>{template.title}</h3>
            <p className={styles.templateDescription}>{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGrid;
