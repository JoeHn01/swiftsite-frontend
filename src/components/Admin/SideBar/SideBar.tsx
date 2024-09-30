import styles from './Sidebar.module.css';

interface SidebarProps {
  onSelectCollection: (collection: string) => void;
}

const collections = ['Users', 'News', 'Templates', 'Categories'];

const Sidebar: React.FC<SidebarProps> = ({ onSelectCollection }) => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.navList}>
        {collections.map((collection) => (
          <li key={collection} className={styles.navItem}>
            <a onClick={() => onSelectCollection(collection)} className={styles.navLink}>
              {collection}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
