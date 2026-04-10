import styles from "./AppDownload.module.css";

export default function AppDownload() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Download the FleetManager App Today</h2>
        <p className={styles.sub}>
          Get instant access to our fleet services. Book rides, track your trips, 
          and manage your account all from the palm of your hand.
        </p>
        <div className={styles.storeBtns}>
          <a href="#" className={styles.storeBtn}>
            <span className={styles.storeLogo}>▶</span>
            <span className={styles.storeText}>
              <span className={styles.storeSmall}>GET IT ON</span>
              <span className={styles.storeBig}>Google Play</span>
            </span>
          </a>
          <a href="#" className={styles.storeBtn}>
            <span className={styles.storeLogo}>🍎</span>
            <span className={styles.storeText}>
              <span className={styles.storeSmall}>Download on the</span>
              <span className={styles.storeBig}>App Store</span>
            </span>
          </a>
          <a href="#" className={styles.storeBtn}>
            <span className={styles.storeLogo}>⬡</span>
            <span className={styles.storeText}>
              <span className={styles.storeSmall}>Available on</span>
              <span className={styles.storeBig}>Galaxy Store</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
