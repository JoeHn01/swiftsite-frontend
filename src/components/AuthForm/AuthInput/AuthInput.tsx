import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { togglePasswordVisibility } from '../../../redux/features/auth/authSlice';
import styles from './AuthInput.module.css';

const AuthInput: React.FC<{ field: any }> = ({ field }) => {
  const dispatch = useAppDispatch();
  const { showPassword } = useAppSelector((state) => state.auth);

  const handleTogglePassword = () => {
    dispatch(togglePasswordVisibility());
  };

  return (
    <div className={styles.inputContainer}>
      <Field
        className={styles.authInput}
        type={field.type === 'password' && showPassword ? 'text' : field.type}
        id={field.id}
        name={field.name}
        placeholder=""
      />
      <label className={styles.authLabel} htmlFor={field.id}>
        {field.label}
      </label>
      <ErrorMessage name={field.name} component="div" className={styles.error} />

      {field.type === 'password' && (
        <button
          type="button"
          className={styles.passwordToggle}
          onClick={handleTogglePassword}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default AuthInput;
