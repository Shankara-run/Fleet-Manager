'use client';

import { useState, useEffect } from 'react';
import { Vehicle, Driver, Trip, Booking } from '@/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    vehicles: 0,
    drivers: 0,
    trips: 0,
    bookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [activeTrips, setActiveTrips] = useState<Trip[]>([]);

  const fetchData = async () => {
    const [vehicles, drivers, trips, bookings] = await Promise.all([
      fetch('/api/vehicles').then((r) => r.json()),
      fetch('/api/drivers').then((r) => r.json()),
      fetch('/api/trips').then((r) => r.json()),
      fetch('/api/bookings').then((r) => r.json()),
    ]);
    setStats({
      vehicles: vehicles.length,
      drivers: drivers.length,
      trips: trips.length,
      bookings: bookings.length,
    });
    setRecentBookings(bookings.slice(0, 5));
    setActiveTrips(trips.filter((t: Trip) => t.status === 'in-progress' || t.status === 'scheduled').slice(0, 5));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statCards = [
    { label: 'Vehicles', value: stats.vehicles, icon: '🚙', color: '#3D90DE', bg: '#EBF5FF' },
    { label: 'Drivers', value: stats.drivers, icon: '👤', color: '#10B981', bg: '#ECFDF5' },
    { label: 'Trips', value: stats.trips, icon: '🚗', color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Bookings', value: stats.bookings, icon: '📋', color: '#8B5CF6', bg: '#F5F3FF' },
  ];

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--dark-accent)', marginBottom: '0.25rem' }}>
            Dashboard
          </h1>
          <p style={{ color: 'var(--gray-text)', fontSize: '0.95rem' }}>
            Welcome back! Here is an overview of your fleet.
          </p>
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--gray-text)' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {statCards.map((stat) => (
          <div key={stat.label} className="admin-card" style={{ background: stat.bg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: stat.color, fontWeight: 600, marginBottom: '0.5rem' }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: '2.5rem', fontWeight: 900, color: stat.color, lineHeight: 1 }}>
                  {stat.value}
                </p>
              </div>
              <span style={{ fontSize: '2.5rem' }}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="admin-card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dark-accent)', marginBottom: '1.5rem' }}>
            Recent Bookings
          </h2>
          {recentBookings.length === 0 ? (
            <p style={{ color: 'var(--gray-text)', textAlign: 'center', padding: '2rem' }}>No bookings yet</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Seats</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{booking.customerName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray-text)' }}>{booking.customerEmail}</div>
                    </td>
                    <td>{booking.seatsBooked}</td>
                    <td>
                      <span className={`status-badge status-${booking.status}`}>{booking.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="admin-card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dark-accent)', marginBottom: '1.5rem' }}>
            Active Trips
          </h2>
          {activeTrips.length === 0 ? (
            <p style={{ color: 'var(--gray-text)', textAlign: 'center', padding: '2rem' }}>No active trips</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activeTrips.map((trip) => (
                  <tr key={trip.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{trip.origin}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray-text)' }}>→ {trip.destination}</div>
                    </td>
                    <td>
                      <span className={`status-badge status-${trip.status}`}>{trip.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
