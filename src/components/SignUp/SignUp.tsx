import React from 'react';
import Link from 'next/link';
import styles from './SignUp.module.css';

interface FormField {
  label: string;
  type: string;
  id: string;
  name: string;
  required?: boolean;
}

const formFields: FormField[] = [
  { label: "First Name:", type: "text", id: "firstName", name: "firstName", required: true },
  { label: "Last Name:", type: "text", id: "lastName", name: "lastName", required: true },
  { label: "Email:", type: "email", id: "email", name: "email", required: true },
  { label: "Password:", type: "password", id: "password", name: "password", required: true },
  { label: "Confirm Password:", type: "password", id: "confirmPassword", name: "confirmPassword", required: true },
];

const SignUp = () => {
  return (
    <div className={styles.signUpContainer}>
      <h1 className={styles.signUpHeading}>Sign Up</h1>
      <form className={styles.signUpForm}>
        {formFields.map((field) => (
          <div key={field.id} className={styles.inputContainer}>
            <label className={styles.signUpLabel} htmlFor={field.id}>
              {field.label}
            </label>
            <input
              className={styles.signUpInput}
              type={field.type}
              id={field.id}
              name={field.name}
              required={field.required}
            />
          </div>
        ))}
        <button type="submit" className={styles.signUpButton}>
          Sign Up
        </button>
      </form>
      <p className={styles.signUpPar}>
        Already have an account? <Link href="/sign-in">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
