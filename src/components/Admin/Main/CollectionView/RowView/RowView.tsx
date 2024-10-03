import React, { useState } from 'react';
import styles from './RowView.module.css';
import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';
import toast from 'react-hot-toast';
import Button from '@/components/Button/Button';

interface RowViewProps {
  isOpen: boolean;
  onClose: () => void;
  content: any;
  collectionName: string;
  reloadData: () => void;
}

const RowView: React.FC<RowViewProps> = ({ isOpen, onClose, content, collectionName, reloadData }) => {
  if (!isOpen) return null;

  const [editData, setEditData] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(content);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setEditData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/${collectionName}/${content._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editData),
    });

    if (response.ok) {
      toast.success('Updated document successfully!');
      onClose();
      reloadData();
    } else {
      toast.error('Failed to edit entry');
    }
  };

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
          {Object.entries(data)
            .filter(
              ([key]) =>
                !key.startsWith('_') &&
                (!isEditing || (key !== 'createdAt' && key !== 'updatedAt'))
            )
            .map(([key, value]) => (
              <div key={key} className={styles.viewRow}>
                <span className={styles.rowViewKey}>{key}:</span>
                {isEditing ? (
                  key === 'featured' ? (
                    <input
                      type="checkbox"
                      name={key}
                      checked={editData[key] || false}
                      onChange={handleChange}
                      className={styles.inputField}
                    />
                  ) : (
                    <input
                      type="text"
                      name={key}
                      value={editData[key] || ''}
                      onChange={handleChange}
                      className={styles.inputField}
                    />
                  )
                ) : (
                  <span className={styles.rowViewValue}>
                    {Array.isArray(value)
                      ? value.join(', ')
                      : typeof value === 'object' && value !== null
                      ? JSON.stringify(value, null, 2)
                      : String(value)}
                  </span>
                )}
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
        <h2>{isEditing ? 'Edit Document' : `Details for ${collectionName.toLowerCase()} document: ${content._id}`}</h2>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.mainContent}>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              {renderContent(editData)}
              <div className={styles.buttonContainer}>
                <Button variant="primary" type="submit">Save</Button>
                <Button variant="secondary" type="button" onClick={handleCancel}>Cancel</Button>
              </div>
            </form>
          ) : (
            <>
              {renderContent(content)}
              <div className={styles.buttonContainer}>
                <EditButton onEdit={handleEdit} />
                <DeleteButton onDelete={handleDelete} itemId={content._id} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RowView;
