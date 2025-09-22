import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.headerNavContainer}>
      <div className={styles.headerLogo}>
        <img src="public/assets/images/CardHouse_logo.svg" />
        <h3>Card House</h3>
      </div>
      <nav className={styles.headerNav}>
        <a className={styles.link}>Cards</a>
        <a className={styles.link}>Rewards</a>
        <a className={styles.link}>Support</a>
      </nav>
    </div>
  );
}
