import styles from "./Services.module.css";
import Image from "next/image";

const services = [
  {
    title: "Airport Transfers",
    desc: "Start or end your journey with our reliable airport transfer service. Professional drivers, comfortable vehicles, and timely arrivals guaranteed.",
    icon: "/airport_taxi.png",
  },
  {
    title: "Ride-Hailing",
    desc: "Need a Private ride? Our ride-hailing service connects you with nearby drivers instantly. Book with ease and travel with confidence.",
    icon: "/private_taxi.png"
  },
  {
    title: "Corporate Accounts",
    desc: "Streamline your business travel with our corporate accounts. Dedicated support, detailed reporting, and preferential rates for your team.",
    icon: "/corporate_taxi.png"
  },
];

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className="section-label">Our Services</span>
            <h2 className={styles.title}>
              Elevate Your Experience<br />with Our Services
            </h2>
          </div>
        </div>

        <div className={styles.grid}>
          {services.map((s) => (
            <div key={s.title} className={styles.card}>
              <div className={styles.cardImage}>
                <Image src={s.icon} alt={s.title} fill className={styles.image} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
                <a href="#book-now" className={styles.learnMore}>Learn More</a>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            From airport pickups to corporate travel, we offer comprehensive fleet management
            solutions tailored to your needs. Experience excellence in every journey.
          </p>
          <a href="#book-now" className="btn-primary">See All Services</a>
        </div>
      </div>
    </section>
  );
}
