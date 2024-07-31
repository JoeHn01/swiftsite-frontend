import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant, className, children, ...props }) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className ? className : ''}`;
  
  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}

export default Button;
