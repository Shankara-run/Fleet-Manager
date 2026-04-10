'use client';

import { useState, useEffect } from 'react';
import { Vehicle } from '@/types';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    plateNumber: '',
    model: '',
    capacity: 0,
    status: 'available' as Vehicle['status'],
  });

  const fetchVehicles = async () => {
    const res = await fetch('/api/vehicles');
    const data = await res.json();
    setVehicles(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/vehicles/${editingId}` : '/api/vehicles';
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setFormData({ plateNumber: '', model: '', capacity: 0, status: 'available' });
    setShowForm(false);
    setEditingId(null);
    fetchVehicles();
  };

  const handleEdit = (vehicle: Vehicle) => {
    setFormData({
      plateNumber: vehicle.plateNumber,
      model: vehicle.model,
      capacity: vehicle.capacity,
      status: vehicle.status,
    });
    setEditingId(vehicle.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this vehicle?')) {
      await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
      fetchVehicles();
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--dark-accent)', marginBottom: '0.25rem' }}>
            Vehicles
          </h1>
          <p style={{ color: 'var(--gray-text)', fontSize: '0.95rem' }}>
            Manage your fleet vehicles
          </p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setFormData({ plateNumber: '', model: '', capacity: 0, status: 'available' }); }}
          className="admin-btn admin-btn-primary"
        >
          + Add Vehicle
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        {vehicles.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-text)' }}>
            No vehicles found. Add your first vehicle to get started.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Plate Number</th>
                <th>Model</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td style={{ fontWeight: 600 }}>{vehicle.plateNumber}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.capacity} seats</td>
                  <td>
                    <span className={`status-badge status-${vehicle.status}`}>{vehicle.status}</span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(vehicle)} className="admin-btn admin-btn-secondary admin-btn-sm" style={{ marginRight: '0.5rem' }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(vehicle.id)} className="admin-btn admin-btn-danger admin-btn-sm">
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
              <h2 className="modal-title">{editingId ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Plate Number</label>
                <input
                  type="text"
                  required
                  value={formData.plateNumber}
                  onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                  className="form-input"
                  placeholder="e.g., ABC-1234"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Model</label>
                <input
                  type="text"
                  required
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="form-input"
                  placeholder="e.g., Toyota Camry"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Capacity (seats)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Vehicle['status'] })}
                  className="form-select"
                >
                  <option value="available">Available</option>
                  <option value="in-use">In Use</option>
                  <option value="maintenance">Maintenance</option>
                </select>
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
