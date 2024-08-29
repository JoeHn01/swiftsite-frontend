'use client'

import styles from "../page.module.css";
import StoreProvider from "@/components/StoreProvider/StoreProvider";
import AuthForm from "@/components/AuthForm/AuthForm";

export default function Auth() {
  return (
    <main className={styles.main}>
      <StoreProvider>
        <AuthForm />
      </StoreProvider>
    </main>
  );
}
