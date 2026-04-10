import styles from "./Hero.module.css";
import Image from "next/image";
export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className="section-label">Welcome to FleetManager</span>
          <h1 className={styles.headline}>
            Your Journey,<br />Your Way!
          </h1>
          <p className={styles.sub}>
            Experience premium fleet management services with professional drivers,
            reliable vehicles, and seamless booking. We are committed to getting you
            to your destination safely and on time.
          </p>
          <a href="#book-now" className={styles.cta}>Book Your Ride</a>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.statsBox}>
            <span className={styles.statNum}>22+</span>
            <span className={styles.statLabel}>Years of Experience</span>
          </div>
          <div className={styles.imageBox}>
            <Image
              src="/hero_section.png"
              alt="Hero section"
              fill={true}
              className={styles.image}
            />
          </div>
        </div>
      </div>

      <div className={styles.bottomDecor}>
        <div className={styles.yellowStripe}></div>
      </div>
    </section>
  );
}
