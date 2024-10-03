import React from 'react';
import styles from './RowView.module.css';
import DeleteButton from '../DeleteButton/DeleteButton';
import toast from 'react-hot-toast';

interface RowViewProps {
  isOpen: boolean;
  onClose: () => void;
  content: any;
  collectionName: string;
  reloadData: () => void;
}

const RowView: React.FC<RowViewProps> = ({ isOpen, onClose, content, collectionName, reloadData }) => {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/${collectionName}/${content._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete entry in ${collectionName}`);
      }

      toast.success('Deleted document successfully!');
      onClose();
      reloadData();
    } catch (error) {
      toast.error(`Error deleting document: ${error}`);
    }
  };

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
          <DeleteButton onDelete={handleDelete} itemId={content._id} />
        </div>
      </div>
    </div>
  );
};

export default RowView;
