'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './AuthForm.module.css';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import Button from '../Button/Button';
import AuthInput from './AuthInput/AuthInput';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleSignIn, setFormData } from '../../redux/features/auth/authSlice';
import { signInFields, signUpFields, signInValidationSchema, signUpValidationSchema } from './authFields';


const AuthForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isSignIn, formData } = useAppSelector((state) => state.auth);

  const initialValues = formData;
  const validationSchema = isSignIn ? signInValidationSchema : signUpValidationSchema;

  const handleToggleForm = () => {
    dispatch(toggleSignIn());
  };

  const signUp = async (signUpData: typeof formData) => {
    const { firstName, lastName, email, password } = signUpData;
    const username = email.split('@')[0];
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          name: `${firstName} ${lastName}`,
          email,
          password,
        }),
      });

      if (response.ok) {
        const { userToken } = await response.json();
        const userData = getTokenStatus(userToken);
        console.log(`User Object: ${userData}`);
        toast.success('Account Created Successfully!');
        router.push('/templates');
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      toast.error('A network error occurred!');
    }
  };

  const signIn = async (signInData: typeof formData) => {
    const { userName, password } = signInData;

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
          password
        }),
      });

      if (response.ok) {
        const { userToken } = await response.json();
        const userData = getTokenStatus(userToken);
        console.log(`User Object: ${userData}`);
        toast.success('Signed In Successfully!');
        router.push('/templates')
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch(error) {
      toast.error('A network error occurred!');
    }
  };

  const getTokenStatus = async (userToken: string) => {
    try {
      const response = await fetch('http://localhost:3000/auth/status', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
      }
    } catch(error) {
      toast.error('A network error occured!');
    }
  };

  const handleSubmit = async (values: typeof initialValues) => {
    dispatch(setFormData(values));

    if (!isSignIn) {
      signUp(values);
    } else {
      signIn(values);
    }
  };
  
  const formFields = isSignIn ? signInFields : signUpFields;

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <div className={styles.authContainer}>
        <h1 className={styles.authHeading}>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
        <Form className={styles.authForm}>
          {formFields.map((field) => (
            <AuthInput key={field.id} field={field} />
          ))}
          <Button variant='primary' type='submit' className={styles.authButton}>
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
