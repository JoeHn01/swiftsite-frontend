import React from 'react';
import styles from './HoverBarButton.module.css';

interface HoverBarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  tooltip: string;
}

const HoverBarButton: React.FC<HoverBarButtonProps> = ({ icon, onClick, tooltip }) => {
  return (
    <button className={styles.hoverBarButton} onClick={onClick}>
      {icon}
      <span className={styles.tooltip}>{tooltip}</span>
    </button>
  );
};

export default HoverBarButton;
