'use client';

import { useState, useEffect } from 'react';
import { Trip, Vehicle, Driver } from '@/types';

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    vehicleId: '',
    driverId: '',
    origin: '',
    destination: '',
    departureTime: '',
  });

  const fetchData = async () => {
    const [tripsRes, vehiclesRes, driversRes] = await Promise.all([
      fetch('/api/trips').then((r) => r.json()),
      fetch('/api/vehicles').then((r) => r.json()),
      fetch('/api/drivers').then((r) => r.json()),
    ]);
    setTrips(tripsRes);
    setVehicles(vehiclesRes);
    setDrivers(driversRes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/trips/${editingId}` : '/api/trips';
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setFormData({ vehicleId: '', driverId: '', origin: '', destination: '', departureTime: '' });
    setShowForm(false);
    setEditingId(null);
    fetchData();
  };

  const handleEdit = (trip: Trip) => {
    setFormData({
      vehicleId: trip.vehicleId,
      driverId: trip.driverId,
      origin: trip.origin,
      destination: trip.destination,
      departureTime: trip.departureTime.slice(0, 16),
    });
    setEditingId(trip.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this trip?')) {
      await fetch(`/api/trips/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  const getVehiclePlate = (id: string) => vehicles.find((v) => v.id === id)?.plateNumber || '-';
  const getDriverName = (id: string) => drivers.find((d) => d.id === id)?.name || '-';

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--dark-accent)', marginBottom: '0.25rem' }}>
            Trips
          </h1>
          <p style={{ color: 'var(--gray-text)', fontSize: '0.95rem' }}>
            Manage your fleet trips
          </p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setFormData({ vehicleId: '', driverId: '', origin: '', destination: '', departureTime: '' }); }}
          className="admin-btn admin-btn-primary"
        >
          + Add Trip
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        {trips.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-text)' }}>
            No trips found. Create your first trip to get started.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Origin</th>
                <th>Destination</th>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Departure</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip.id}>
                  <td style={{ fontWeight: 600 }}>{trip.origin}</td>
                  <td>{trip.destination}</td>
                  <td>{getVehiclePlate(trip.vehicleId)}</td>
                  <td>{getDriverName(trip.driverId)}</td>
                  <td style={{ fontSize: '0.875rem', color: 'var(--gray-text)' }}>
                    {formatDate(trip.departureTime)}
                  </td>
                  <td>
                    <span className={`status-badge status-${trip.status}`}>{trip.status}</span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(trip)} className="admin-btn admin-btn-secondary admin-btn-sm" style={{ marginRight: '0.5rem' }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(trip.id)} className="admin-btn admin-btn-danger admin-btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{editingId ? 'Edit Trip' : 'Add Trip'}</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Vehicle</label>
                <select
                  required
                  value={formData.vehicleId}
                  onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                  className="form-select"
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>{v.plateNumber} - {v.model}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Driver</label>
                <select
                  required
                  value={formData.driverId}
                  onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                  className="form-select"
                >
                  <option value="">Select Driver</option>
                  {drivers.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Origin</label>
                <input
                  type="text"
                  required
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="form-input"
                  placeholder="Starting point"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Destination</label>
                <input
                  type="text"
                  required
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="form-input"
                  placeholder="Ending point"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Departure Time</label>
                <input
                  type="datetime-local"
                  required
                  value={formData.departureTime}
                  onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowForm(false)} className="admin-btn admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
