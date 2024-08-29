'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './AuthForm.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleSignIn, togglePasswordVisibility, setFormData } from '../../redux/features/auth/authSlice';

const signInFields = [
  { label: 'Email', type: 'email', id: 'email', name: 'email', required: true },
  { label: 'Password', type: 'password', id: 'password', name: 'password', required: true },
];

const signUpFields = [
  { label: 'First Name', type: 'text', id: 'firstName', name: 'firstName', required: true },
  { label: 'Last Name', type: 'text', id: 'lastName', name: 'lastName', required: true },
  ...signInFields,
  { label: 'Confirm Password', type: 'password', id: 'confirmPassword', name: 'confirmPassword', required: true },
];

const AuthForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isSignIn, showPassword, formData } = useAppSelector((state) => state.auth);

  const initialValues = formData;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleToggleForm = () => {
    dispatch(toggleSignIn());
  };

  const handleTogglePassword = () => {
    dispatch(togglePasswordVisibility());
  };

  const handleSubmit = async (values: typeof initialValues) => {
    dispatch(setFormData(values));

    if (!isSignIn) {
      const { firstName, lastName, email, password } = values;
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
          toast.success('Account Created Successfully!');
          router.push('/templates');
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message}`);
        }
      } catch (error) {
        toast.error('A network error occurred!');
      }
    } else {
      // Sign in logic
    }
  };
  
  const formFields = isSignIn ? signInFields : signUpFields;

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <div className={styles.authContainer}>
        <h1 className={styles.authHeading}>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
        <Form className={styles.authForm}>
          {formFields.map((field) => (
            <div key={field.id} className={styles.inputContainer}>
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
          ))}
          <Button variant='primary' className={styles.authButton}>
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </Form>
        <p className={styles.authPar}>
          {isSignIn ? (
            <>
              Don't have an account?{' '}
              <a onClick={handleToggleForm} className={styles.toggleLink}>Sign Up</a>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <a onClick={handleToggleForm} className={styles.toggleLink}>Sign In</a>
            </>
          )}
        </p>
      </div>
    </Formik>
  );
};

export default AuthForm;
