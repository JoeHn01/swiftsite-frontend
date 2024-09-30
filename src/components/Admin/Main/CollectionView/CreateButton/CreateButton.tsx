import React, { useState } from 'react';
import Button from '@/components/Button/Button';
import Modal from '../Modal/Modal';

interface CreateButtonProps {
  collectionName: string;
  columns: string[];
  onCreate: (formData: { [key: string]: any }) => void;
}

const CreateButton: React.FC<CreateButtonProps> = ({ collectionName, columns, onCreate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    closeModal();
    setFormData({});
  };

  return (
    <div>
      <Button variant="primary" onClick={openModal}>
        Create
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal} content={
        <div>
          <h2>Create New {collectionName} Entry</h2>
          <form onSubmit={handleSubmit}>
            {columns.map((column) => (
              <div key={column}>
                <label htmlFor={column}>{column}</label>
                <input
                  type="text"
                  name={column}
                  id={column}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </div>
      } />
    </div>
  );
};

export default CreateButton;
