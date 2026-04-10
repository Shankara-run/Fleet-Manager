'use client';

import { useState, useEffect } from 'react';
import { Booking, Trip } from '@/types';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);

  const fetchData = async () => {
    const [bookingsRes, tripsRes] = await Promise.all([
      fetch('/api/bookings').then((r) => r.json()),
      fetch('/api/trips').then((r) => r.json()),
    ]);
    setBookings(bookingsRes);
    setTrips(tripsRes);
  };

  const getTripInfo = (tripId: string) => {
    const trip = trips.find((t) => t.id === tripId);
    return trip ? `${trip.origin} → ${trip.destination}` : tripId;
  };

  const handleUpdateStatus = async (id: string, status: Booking['status']) => {
    await fetch(`/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this booking?')) {
      await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--dark-accent)', marginBottom: '0.25rem' }}>
            Bookings
          </h1>
          <p style={{ color: 'var(--gray-text)', fontSize: '0.95rem' }}>
            Manage customer bookings
          </p>
        </div>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        {bookings.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-text)' }}>
            No bookings found.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Trip</th>
                <th>Seats</th>
                <th>Booked At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td style={{ fontWeight: 600 }}>{booking.customerName}</td>
                  <td>{booking.customerEmail}</td>
                  <td>{booking.customerPhone}</td>
                  <td style={{ fontSize: '0.875rem' }}>{getTripInfo(booking.tripId)}</td>
                  <td>{booking.seatsBooked}</td>
                  <td style={{ fontSize: '0.875rem', color: 'var(--gray-text)' }}>
                    {formatDate(booking.createdAt)}
                  </td>
                  <td>
                    <span className={`status-badge status-${booking.status}`}>{booking.status}</span>
                  </td>
                  <td>
                    {booking.status === 'pending' && (
                      <button 
                        onClick={() => handleUpdateStatus(booking.id, 'confirmed')} 
                        className="admin-btn admin-btn-secondary admin-btn-sm" 
                        style={{ marginRight: '0.5rem' }}
                      >
                        Confirm
                      </button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <button 
                        onClick={() => handleUpdateStatus(booking.id, 'cancelled')} 
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        style={{ marginRight: '0.5rem' }}
                      >
                        Cancel
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(booking.id)} 
                      className="admin-btn admin-btn-danger admin-btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
