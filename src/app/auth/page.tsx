import styles from "../page.module.css";
import AuthForm from "@/components/AuthForm/AuthForm";

export default function Auth() {
  return (
    <main className={styles.main}>
      <AuthForm />
    </main>
  );
}
