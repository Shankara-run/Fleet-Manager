"use client";
import { useState, useEffect } from "react";
import { Trip } from "@/types";
import styles from "./Booking.module.css";

export default function Booking() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    passengers: 1,
    date: "",
    pickupAddress: "",
    dropoffAddress: "",
    tripId: "",
  });
  const [message, setMessage] = useState("");

  const fetchTrips = async () => {
    const res = await fetch("/api/trips");
    const data = await res.json();
    setTrips(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.tripId) {
      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId: formData.tripId,
          customerName: formData.name,
          customerEmail: `${formData.name.toLowerCase().replace(" ", "")}@example.com`,
          customerPhone: formData.phone,
          seatsBooked: formData.passengers,
        }),
      });

      if (bookingRes.ok) {
        setMessage("Booking confirmed! We will contact you shortly.");
        setFormData({
          name: "",
          phone: "",
          passengers: 1,
          date: "",
          pickupAddress: "",
          dropoffAddress: "",
          tripId: "",
        });
        setTimeout(() => setMessage(""), 5000);
      }
    } else {
      setMessage("Please select a trip to book.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <section className={styles.section} id="book-now">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Swift Reservations</span>
          <h2 className={styles.title}>Book Your Ride in Seconds!</h2>
          <p className={styles.sub}>
            Experience seamless booking with our fleet management system. 
            Select your trip, provide your details, and we will handle the rest.
          </p>
        </div>

        {message && (
          <div className={styles.successMessage}>{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className={styles.input}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Phone Number</label>
              <input
                type="tel"
                placeholder="Your Phone Number"
                className={styles.input}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Passengers</label>
              <input
                type="number"
                placeholder="Passengers"
                className={styles.input}
                min={1}
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Pick Up Date</label>
              <input
                type="date"
                className={styles.input}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Pick Up Address</label>
              <input
                type="text"
                placeholder="Start Destination"
                className={styles.input}
                value={formData.pickupAddress}
                onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Drop Off Address</label>
              <input
                type="text"
                placeholder="End Destination"
                className={styles.input}
                value={formData.dropoffAddress}
                onChange={(e) => setFormData({ ...formData, dropoffAddress: e.target.value })}
                required
              />
            </div>
          </div>

          <div className={styles.formGrid} style={{ maxWidth: "600px" }}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Select Trip</label>
              <select
                className={styles.input}
                value={formData.tripId}
                onChange={(e) => setFormData({ ...formData, tripId: e.target.value })}
                required
              >
                <option value="">Choose a Trip</option>
                {trips.filter(t => t.status === 'scheduled').map((trip) => (
                  <option key={trip.id} value={trip.id}>
                    {trip.origin} → {trip.destination} ({new Date(trip.departureTime).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>Book Taxi Now!</button>
        </form>
      </div>

      <div className={styles.checkerBottom}></div>
    </section>
  );
}
