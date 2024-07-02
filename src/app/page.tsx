import styles from "./page.module.css";
import Hero from "@/components/Main/Hero/Hero";
import Templates from "@/components/Main/Templates/Templates";
import About from "@/components/Main/About/About";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Templates />
      <About />
    </main>
  );
}
