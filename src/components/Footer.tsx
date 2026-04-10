import styles from "./Footer.module.css";

const companyLinks = ["About Us", "Contact Info", "Our Service", "Career"];
const serviceLinks = ["Airport Transfers", "Ride-Hailing", "Corporate Accounts", "Hourly Rentals"];

const socialIcons = [
  { label: "Facebook", icon: "f" },
  { label: "Twitter", icon: "t" },
  { label: "LinkedIn", icon: "in" },
  { label: "Instagram", icon: "ig" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.checker}></span>
            <span className={styles.logoText}>
              <span className={styles.logoTaxi}>Fleet</span>
              <span className={styles.logoTema}>Manager</span>
            </span>
          </div>
          <p className={styles.brandDesc}>
            Premium fleet management services with professional drivers and reliable vehicles. 
            Your trusted partner for all transportation needs.
          </p>
          <div className={styles.socials}>
            {socialIcons.map((s) => (
              <a key={s.label} href="#" className={styles.socialBtn} aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Company</h4>
          <ul className={styles.linkList}>
            {companyLinks.map((l) => (
              <li key={l}><a href="#about-us" className={styles.link}>{l}</a></li>
            ))}
          </ul>
        </div>

        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Services</h4>
          <ul className={styles.linkList}>
            {serviceLinks.map((l) => (
              <li key={l}><a href="#services" className={styles.link}>{l}</a></li>
            ))}
          </ul>
        </div>

        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Work Hours</h4>
          <div className={styles.workHoursItem}>
            <span className={styles.workIcon}>🕘</span>
            <span>9 AM - 5 PM, Monday - Saturday</span>
          </div>
          <div className={styles.workHoursItem}>
            <span className={styles.workIcon}>📞</span>
            <span>+1 (333) 000-0000</span>
          </div>
          <p className={styles.supportNote}>
            Our Support and Sales team is available 24/7 to answer your queries
          </p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <span className={styles.copyright}>
            Copyright © 2026 FleetManager | All Rights Reserved
          </span>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Terms of Use</a>
            <span className={styles.sep}>|</span>
            <a href="#" className={styles.bottomLink}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
