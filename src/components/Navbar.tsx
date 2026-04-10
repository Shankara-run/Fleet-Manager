"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const navLinks = ["Home", "About Us", "Services", "Book Now"];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <span className={styles.checker}></span>
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoTaxi}>Fleet</span>
            <span className={styles.logoTema}>Manager</span>
          </span>
        </Link>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className={`${styles.navLink} ${active === link ? styles.activeLink : ""}`}
                onClick={() => { setActive(link); setMenuOpen(false); }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <a href="#book-now" className={styles.bookBtn}>Book Now</a>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
