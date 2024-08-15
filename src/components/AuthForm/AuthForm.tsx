'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AuthForm.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface FormField {
  label: string;
  type: string;
  id: string;
  name: string;
  required?: boolean;
}

const signInFields: FormField[] = [
  { label: 'Email', type: 'email', id: 'email', name: 'email', required: true },
  { label: 'Password', type: 'password', id: 'password', name: 'password', required: true },
];

const signUpFields: FormField[] = [
  { label: 'First Name', type: 'text', id: 'firstName', name: 'firstName', required: true },
  { label: 'Last Name', type: 'text', id: 'lastName', name: 'lastName', required: true },
  ...signInFields,
  { label: 'Confirm Password', type: 'password', id: 'confirmPassword', name: 'confirmPassword', required: true },
];

const AuthForm: React.FC = () => {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignIn) {
      const { firstName, lastName, email, password, confirmPassword } = formData;
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      const username = email.split('@')[0];
    
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            name: `${firstName} ${lastName}`,
            email,
            password,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          alert('Account created successfully!');
          router.push('/templates');
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        alert('A network error occurred!');
      }
    } else {
      // Sign in logic
    }
  };
  
  const formFields = isSignIn ? signInFields : signUpFields;

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authHeading}>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.id} className={styles.inputContainer}>
            <input
              className={styles.authInput}
              type={field.type === 'password' && showPassword ? 'text' : field.type}
              id={field.id}
              name={field.name}
              required={field.required}
              placeholder=" "
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
            />
            <label className={styles.authLabel} htmlFor={field.id}>
              {field.label}
            </label>
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
