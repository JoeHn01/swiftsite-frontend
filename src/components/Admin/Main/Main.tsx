import styles from './Main.module.css';
import CollectionView from './CollectionView/CollectionView';

interface MainSectionProps {
  selectedCollection: string;
}

const Main: React.FC<MainSectionProps> = ({ selectedCollection }) => {
  return (
    <div className={styles.main}>
      <h1>{selectedCollection} Collection</h1>
      <div className={styles.content}>
        <CollectionView collectionName={selectedCollection} rowsPerPage={5} />
      </div>
    </div>
  );
};

export default Main;
