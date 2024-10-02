import React, { useState } from 'react';
import Button from '@/components/Button/Button';
import Modal from '../Modal/Modal';
import styles from './CreateButton.module.css';

interface CreateButtonProps {
  collectionName: string;
  columns: string[];
  onCreate: (formData: { [key: string]: any }) => void;
}

const excludedFields = ['_id', 'createdAt', 'updatedAt', '__v', 'templateIds', 'categoryId'];

const CreateButton: React.FC<CreateButtonProps> = ({ collectionName, columns, onCreate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    closeModal();
    setFormData({});
  };

  const filteredColumns = columns.filter((column) => {
    return !excludedFields.includes(column);
  });

  return (
    <div className={styles.createButtonContainer}>
      <Button variant="primary" onClick={openModal}>
        Create
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Create New {collectionName} Entry</h2>
            <form onSubmit={handleSubmit}>
              {filteredColumns.map((column) => (
                <div key={column}>
                  <label className={styles.formLabel} htmlFor={column}>{column}</label>
                  {column === 'featured' ? (
                    <input
                      className={styles.formInput}
                      type="checkbox"
                      name={column}
                      id={column}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      className={styles.formInput}
                      type="text"
                      name={column}
                      id={column}
                      onChange={handleChange}
                      required
                    />
                  )}
                  {column === 'description' && collectionName.toLowerCase() === 'templates' && (
                    <div>
                      <label className={styles.formLabel} htmlFor="categoryName">categoryName</label>
                      <input
                        className={styles.formInput}
                        type="text"
                        name="categoryName"
                        id="categoryName"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}
                </div>
              ))}
              <Button className={styles.submitButton} variant="primary" type="submit">
                Submit
              </Button>
            </form>
          </div>
        }
      />
    </div>
  );
};

export default CreateButton;
