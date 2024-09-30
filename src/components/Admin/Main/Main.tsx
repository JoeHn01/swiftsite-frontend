import styles from './Main.module.css';

interface MainSectionProps {
  selectedCollection: string;
}

const Main: React.FC<MainSectionProps> = ({ selectedCollection }) => {
  return (
    <div className={styles.main}>
      <h1>{selectedCollection} Collection</h1>
      <div className={styles.content}>
        <p>Currently viewing: {selectedCollection}</p>
      </div>
    </div>
  );
};

export default Main;
