import { useState, useEffect } from 'react';
import styles from './CollectionView.module.css';
import Modal from './Modal/Modal';

interface DataRow {
  [key: string]: any;
}

interface CollectionViewProps {
  collectionName: string;
  rowsPerPage: number;
}

const columnOrderMap: { [key: string]: string[] } = {
  Users: ['_id', 'username', 'email', 'password', 'templateIds', 'createdAt', 'updatedAt'],
  Templates: ['_id', 'name', 'description', 'categoryId', 'previewImage', 'code', 'featured', 'createdAt', 'updatedAt'],
  Categories: ['_id', 'name', 'description', 'templateIds', 'createdAt', 'updatedAt'],
  News: ['_id', 'title', 'content', 'authorId', 'category', 'featured', 'createdAt', 'updatedAt'],
};

const MAX_CONTENT_LENGTH = 50;

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

const CollectionView: React.FC<CollectionViewProps> = ({
  collectionName,
  rowsPerPage,
}) => {
  const [data, setData] = useState<DataRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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

    loadData();
  }, [collectionName]);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = data.slice(startIndex, startIndex + rowsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const displayColumns = columnOrderMap[collectionName] || [];

  const renderCellValue = (value: any, key: string) => {
    if (key === 'createdAt' || key === 'updatedAt') {
      return formatDate(value);
    }
    if (typeof value === 'boolean') {
      return value ? 'True' : 'False';
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    if (typeof value === 'string' && value.length > MAX_CONTENT_LENGTH) {
      return (
        <div
          onClick={() => {
            setModalContent(value);
            setIsModalOpen(true);
          }}
          className={styles.viewMore}
        >
          View More
        </div>
      );
    }
    return value !== undefined && value !== null ? value : 'N/A';
  };

  return (
    <div>
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
