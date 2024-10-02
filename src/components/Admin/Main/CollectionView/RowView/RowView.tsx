import React from 'react';
import styles from './RowView.module.css';

interface RowViewProps {
  isOpen: boolean;
  onClose: () => void;
  content: any;
}

const RowView: React.FC<RowViewProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

const renderContent = (data: any) => {
  if (typeof data === 'object' && data !== null) {
    return (
      <div className={styles.rowViewContentWrapper}>
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className={styles.viewRow}>
            <span className={styles.rowViewKey}>{key}:</span>
            <span className={styles.rowViewValue}>
              {Array.isArray(value)
                ? value.join(', ') : typeof value === 'object' && value !== null
                ? JSON.stringify(value, null, 2) : String(value)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return <div>{String(data)}</div>;
};


  return (
    <div className={styles.rowViewOverlay}>
      <div className={styles.rowViewContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.mainContent}>
          {renderContent(content)}
        </div>
      </div>
    </div>
  );
};

export default RowView;
