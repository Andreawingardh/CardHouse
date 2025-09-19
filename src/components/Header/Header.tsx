import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerNavContainer}>
        <div className={styles.headerLogo}>
          <img src="public/assets/images/CardHouse_logo.svg"></img>
          <h3>Card House</h3>
        </div>
        <div className={styles.headerNav}>
          <p>Cards</p>
          <p>Rewards</p>
          <p>Support</p>
        </div>
      </div>
      <div className={styles.headerBorder}></div>
    </div>
  );
}
