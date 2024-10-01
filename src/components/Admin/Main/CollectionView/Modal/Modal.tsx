import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const isCellView = typeof content === 'string';

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={`${styles.mainContent} ${isCellView ? styles.cellView : styles.createForm}`}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
