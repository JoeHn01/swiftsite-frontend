import React, { useState, useEffect } from 'react';
import { LiaSpinnerSolid } from "react-icons/lia";
import styles from './CollectionView.module.css';
import Modal from './Modal/Modal';
import CreateButton from './CreateButton/CreateButton';
import toast from 'react-hot-toast';

interface DataRow {
  [key: string]: any;
}

interface CollectionViewProps {
  collectionName: string;
  rowsPerPage: number;
}

const columnOrderMap: { [key: string]: string[] } = {
  Users: ['_id', 'name', 'username', 'email', 'password', 'templateIds', 'createdAt', 'updatedAt'],
  Templates: ['_id', 'name', 'description', 'categoryId', 'userId', 'previewImage', 'code', 'featured', 'createdAt', 'updatedAt'],
  Categories: ['_id', 'name', 'description', 'templateIds', 'createdAt', 'updatedAt'],
  News: ['_id', 'title', 'content', 'authorId', 'category', 'featured', 'createdAt', 'updatedAt'],
};

const CollectionView: React.FC<CollectionViewProps> = ({ collectionName, rowsPerPage }) => {
  const [data, setData] = useState<DataRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/${collectionName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result: DataRow[] = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [collectionName]);

  const handleCreate = async (formData: { [key: string]: any }) => {
    try {
      const response = await fetch(`http://localhost:3000/${collectionName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create entry in ${collectionName}`);
      }

      const createdDocument = await response.json();
      console.log(createdDocument);
      toast.success('Created document successfully!');
      loadData();

    } catch (error) {
      toast.error(`Error creating document: ${error}`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  
    return `${formattedDate} at ${formattedTime}`;
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = data.slice(startIndex, startIndex + rowsPerPage);

  if (loading) {
    return (
      <div className="spinner-container">
        <LiaSpinnerSolid className="spinner" />
      </div>
    );
  }
  
  if (error) {
    return <p>Error: {error}</p>;
  }

  const displayColumns = columnOrderMap[collectionName] || [];

  const renderCellValue = (value: any, key: string) => {
    if (Array.isArray(value)) {
      return (
        <div>
          {value.length > 3 ? (
            <>
              {value.slice(0, 3).join(', ')}...{' '}
              <span
                onClick={() => {
                  setModalContent(value.join(', '));
                  setIsModalOpen(true);
                }}
                className={styles.viewMore}
              >
                View More
              </span>
            </>
          ) : (
            value.join(', ')
          )}
        </div>
      );
    }
    if (typeof value === 'string' && value.length > 50) {
      return (
        <>
          <div className={styles.cellText}>
            {value.slice(0, 20)}...
          </div>
          <div
            onClick={() => {
              setModalContent(value);
              setIsModalOpen(true);
            }}
            className={styles.viewMore}
          >
            View More
          </div>
        </>
      );
    }
    if (key === 'createdAt' || key === 'updatedAt') {
      return formatDate(value);
    }
    if (typeof value === 'boolean') {
      return value ? 'True' : 'False';
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return value !== undefined && value !== null ? value : 'N/A';
  };
  
  return (
    <div>
      <CreateButton 
        collectionName={collectionName} 
        columns={displayColumns}
        onCreate={handleCreate}
      />
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {displayColumns.map((key) => (
                <th key={key} className={styles.tableHead}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {displayColumns.map((key) => (
                  <td key={key} className={styles.tableCell}>
                    {renderCellValue(row[key], key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={modalContent}
      />
    </div>
  );
};

export default CollectionView;
