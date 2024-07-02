'use client';

import React, { useState } from 'react';
import styles from './AuthForm.module.css';

interface FormField {
  label: string;
  type: string;
  id: string;
  name: string;
  required?: boolean;
}

const signInFields: FormField[] = [
  { label: 'Email:', type: 'email', id: 'email', name: 'email', required: true },
  { label: 'Password:', type: 'password', id: 'password', name: 'password', required: true },
];

const signUpFields: FormField[] = [
  { label: 'First Name:', type: 'text', id: 'firstName', name: 'firstName', required: true },
  { label: 'Last Name:', type: 'text', id: 'lastName', name: 'lastName', required: true },
  ...signInFields,
  { label: 'Confirm Password:', type: 'password', id: 'confirmPassword', name: 'confirmPassword', required: true },
];

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Default to sign-in

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };

  const formFields = isSignIn ? signInFields : signUpFields;

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authHeading}>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
      <form className={styles.authForm}>
        {formFields.map((field) => (
          <div key={field.id} className={styles.inputContainer}>
            <label className={styles.authLabel} htmlFor={field.id}>
              {field.label}
            </label>
            <input
              className={styles.authInput}
              type={field.type}
              id={field.id}
              name={field.name}
              required={field.required}
            />
          </div>
        ))}
        <button type="submit" className={styles.authButton}>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <p className={styles.authPar}>
        {isSignIn ? (
          <>
            Don't have an account?{' '}
            <a onClick={handleToggle} className={styles.toggleLink}>Sign Up</a>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <a onClick={handleToggle} className={styles.toggleLink}>Sign In</a>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
