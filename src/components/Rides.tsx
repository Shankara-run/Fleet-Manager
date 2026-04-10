import styles from "./Rides.module.css";

const plans = [
  {
    icon: "🚗",
    title: "Basic Commuter",
    desc: "Perfect for daily commutes and short trips. Reliable service at an affordable price.",
    price: "$8.00",
    unit: "per ride",
    features: [
      "Hatchback Vehicles",
      "Pay-per-ride Pricing",
      "Flexible Scheduling",
      "Real-time Tracking",
    ],
    featured: false,
  },
  {
    icon: "💼",
    title: "Business Traveler",
    desc: "Premium service for business professionals. Executive vehicles with priority booking.",
    price: "$40.00",
    unit: "per month",
    features: [
      "Executive-class Vehicles",
      "Priority Booking",
      "Airport Transfer Included",
      "24/7 Customer Support",
    ],
    featured: true,
  },
  {
    icon: "🗺️",
    title: "Explorer Package",
    desc: "Ideal for city tours, events, and long-distance travel. SUVs and premium vehicles available.",
    price: "$16.00",
    unit: "per hour",
    features: [
      "SUVs or Premium Vehicles",
      "Flexible Hourly Rentals",
      "Experienced Drivers",
      "Ideal for City Tours or Events",
    ],
    featured: false,
  },
];

export default function Rides() {
  return (
    <section className={styles.section} id="rides">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Swift Reservations</span>
          <h2 className={styles.title}>Explore Our Budget-Friendly Rates</h2>
          <p className={styles.sub}>
            Choose the plan that fits your needs. From daily commutes to business travel, 
            we have competitive pricing with no hidden fees.
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`${styles.card} ${plan.featured ? styles.featured : ""}`}
            >
              <div className={`${styles.iconBox} ${plan.featured ? styles.iconBoxDark : ""}`}>
                <span className={styles.iconEmoji}>{plan.icon}</span>
              </div>
              <h3 className={`${styles.planTitle} ${plan.featured ? styles.featuredText : ""}`}>
                {plan.title}
              </h3>
              <p className={`${styles.planDesc} ${plan.featured ? styles.featuredMuted : ""}`}>
                {plan.desc}
              </p>
              <div className={styles.priceRow}>
                <span className={`${styles.priceLabel} ${plan.featured ? styles.featuredMuted : ""}`}>
                  Start From :
                </span>
                <div>
                  <span className={`${styles.price} ${plan.featured ? styles.featuredText : ""}`}>
                    {plan.price}
                  </span>
                  <span className={`${styles.unit} ${plan.featured ? styles.featuredMuted : ""}`}>
                    {" "}{plan.unit}
                  </span>
                </div>
              </div>
              <hr className={`${styles.divider} ${plan.featured ? styles.dividerDark : ""}`} />
              <p className={`${styles.featuresLabel} ${plan.featured ? styles.featuredText : ""}`}>
                Features :
              </p>
              <ul className={styles.featureList}>
                {plan.features.map((f) => (
                  <li key={f} className={`${styles.featureItem} ${plan.featured ? styles.featuredText : ""}`}>
                    <span className={styles.bullet}>⊕</span> {f}
                  </li>
                ))}
              </ul>
              <a href="#book-now" className={styles.planBtn}>Book Now</a>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.checkerBottom}></div>
    </section>
  );
}
