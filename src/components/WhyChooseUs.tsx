import styles from "./WhyChooseUs.module.css";

const features = [
  {
    icon: "🚕",
    title: "Reliable Service",
    desc: "Count on us for punctual pickups and drop-offs. We value your time and ensure you reach your destination safely.",
  },
  {
    icon: "🛡️",
    title: "Safety First",
    desc: "Your safety is our top priority. All vehicles undergo regular maintenance and drivers follow strict safety protocols.",
  },
  {
    icon: "📱",
    title: "Easy Booking",
    desc: "Book your ride in seconds with our user-friendly platform. Multiple payment options and instant confirmation.",
  },
  {
    icon: "🎯",
    title: "Professional Drivers",
    desc: "Our drivers are experienced, courteous, and knowledgeable about local routes for the best travel experience.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <div className={styles.iconBubble}>🏅</div>
            <div className={styles.pillLabel}>Why Choose Us?</div>
          </div>
          <p className={styles.headerDesc}>
            We combine technology with exceptional service to deliver a premium fleet management 
            experience. Discover why thousands of customers trust us for their transportation needs.
          </p>
        </div>

        <hr className={styles.divider} />

        <div className={styles.grid}>
          {features.map((f) => (
            <div key={f.title} className={styles.card}>
              <div className={styles.iconWrap}>
                <span className={styles.iconEmoji}>{f.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.videoBlock}>
          <button className={styles.playBtn} aria-label="Play video">
            <span className={styles.playTriangle}></span>
          </button>
        </div>
      </div>
    </section>
  );
}
