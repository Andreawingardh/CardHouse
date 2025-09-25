import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.headerNavContainer}>
      <div className={styles.headerLogo}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
          aria-hidden="true"
        >
          <rect width="31" height="31" rx="8" fill="url(#paint0_linear_12_4)" />
          <rect x="6" y="10" width="19" height="11" rx="2" fill="white" />
          <defs>
            <linearGradient
              id="paint0_linear_12_4"
              x1="15.5"
              y1="0"
              x2="15.5"
              y2="31"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4165DD" />
              <stop offset="1" stopColor="#922EFC" />
            </linearGradient>
          </defs>
        </svg>
        <h3>Card House</h3>
      </div>
      <nav className={styles.headerNav}>
        <a href="#" className={styles.link}>
          Cards
        </a>
        <a href="#" className={styles.link}>
          Rewards
        </a>
        <a href="#" className={styles.link}>
          Support
        </a>
      </nav>
    </header>
  );
}
