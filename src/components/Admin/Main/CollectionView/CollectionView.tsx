import { useState, useEffect } from 'react';
import styles from './CollectionView.module.css';

interface DataRow {
  [key: string]: any;
}

interface CollectionViewProps {
  collectionName: string;
  rowsPerPage: number;
}

const CollectionView: React.FC<CollectionViewProps> = ({
  collectionName,
  rowsPerPage,
}) => {
  const [data, setData] = useState<DataRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const displayColumns = data.length > 0 ? Object.keys(data[0]) : [];

  const renderCellValue = (value: any) => {
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
      <h2>{collectionName} Collection</h2>
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
                    {renderCellValue(row[key])}
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
    </div>
  );
};

export default CollectionView;
