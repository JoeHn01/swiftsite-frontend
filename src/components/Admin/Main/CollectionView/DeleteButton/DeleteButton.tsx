import React, { useState } from 'react';
import Button from '@/components/Button/Button';
import Modal from '../Modal/Modal';
import styles from './DeleteButton.module.css';

interface DeleteButtonProps {
  onDelete: (id: number) => void;
  itemId: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, itemId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleDelete = () => {
    onDelete(itemId);
    closeModal();
  };

  return (
    <div className={styles.deleteButtonContainer}>
      <Button variant="danger" onClick={openModal}>
        Delete
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={
          <div className={styles.modalContent}>
            <p className={styles.modalText}>
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className={styles.modalButtons}>
              <Button variant="danger" onClick={handleDelete}>
                Yes, Delete
              </Button>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DeleteButton;
