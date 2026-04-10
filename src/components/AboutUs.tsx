import styles from "./AboutUs.module.css";

const skills = [
  { label: "Experienced", pct: 98 },
  { label: "Reliable", pct: 86 },
  { label: "Skilled & Capable", pct: 90 },
  { label: "Flexible", pct: 80 },
];

const features = [
  {
    title: "Professional Drivers",
    desc: "All our drivers are professionally trained, licensed, and committed to providing safe and comfortable journeys.",
  },
  {
    title: "Flexible Scheduling",
    desc: "Book your rides at any time that suits you. We offer 24/7 availability with flexible scheduling options.",
  },
  {
    title: "Customer Centric",
    desc: "Your satisfaction is our priority. We continuously strive to exceed expectations with every trip.",
  },
];

export default function AboutUs() {
  return (
    <section className={styles.section} id="about-us">
      <div className="container">
        <div className={styles.topGrid}>
          <div className={styles.leftContent}>
            <span className="section-label">About Us</span>
            <h2 className={styles.title}>
              Empowering Your Travel Experience with FleetManager
            </h2>
            <p className={styles.desc}>
              With over 22 years of experience in fleet management, we have built a reputation 
              for reliability, safety, and exceptional service. Our commitment to excellence 
              ensures that every journey with us is a pleasant one.
            </p>
          </div>

          <div className={styles.skillsPanel}>
            {skills.map((s) => (
              <div key={s.label} className={styles.skillItem}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillLabel}>{s.label}</span>
                  <span className={styles.skillPct}>{s.pct}%</span>
                </div>
                <div className={styles.skillTrack}>
                  <div
                    className={styles.skillBar}
                    style={{ width: `${s.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.midGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNum}>99%</span>
            <span className={styles.statLabel}>Satisfied Clients</span>
          </div>
          <div className={styles.imageBlock}>🚗</div>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((f) => (
            <div key={f.title} className={styles.feature}>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
