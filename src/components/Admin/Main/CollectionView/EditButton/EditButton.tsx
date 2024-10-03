import React from 'react';
import styles from './EditButton.module.css';
import Button from '@/components/Button/Button';

interface EditButtonProps {
  onEdit: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onEdit }) => {
  return (
    <Button variant="primary" onClick={onEdit}>
      Edit
    </Button>
  );
};

export default EditButton;
