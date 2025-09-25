import styles from "./HeroHeader.module.css";

export default function HeroHeader() {
  return (
    <section className={styles.heroHeaderContainer}>
      <h1>Design Your Card</h1>
      <p>
        Create a credit card that reflects your style. Customize colors,
        patterns and personalization to make it uniquely yours{" "}
      </p>
    </section>
  );
}
