import Link from 'next/link';
import styles from './SignIn.module.css';

interface FormField {
  label: string;
  type: string;
  id: string;
  name: string;
}

const formFields: FormField[] = [
  { label: "Email:", type: "email", id: "email", name: "email" },
  { label: "Password:", type: "password", id: "password", name: "password" },
];  

const SignIn = () => {
  return (
    <div className={styles.signInContainer}>
      <h1 className={styles.signInHeading}>Sign In</h1>
      <form className={styles.signInForm}>
        {formFields.map((field) => (
          <div key={field.id} className={styles.inputContainer}>
            <label className={styles.signInLabel} htmlFor={field.id}>
              {field.label}
            </label>
            <input
              className={styles.signInInput}
              type={field.type}
              id={field.id}
              name={field.name}
              required
            />
          </div>
        ))}
        <button type="submit" className={styles.signInButton}>
          Sign In
        </button>
      </form>
      <p className={styles.signInPar}>
        Don't have an account? <Link href="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
