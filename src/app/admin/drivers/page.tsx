'use client';

import { useState, useEffect } from 'react';
import { Driver } from '@/types';

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    licenseNumber: '',
    status: 'available' as Driver['status'],
  });

  const fetchDrivers = async () => {
    const res = await fetch('/api/drivers');
    const data = await res.json();
    setDrivers(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/drivers/${editingId}` : '/api/drivers';
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setFormData({ name: '', phone: '', licenseNumber: '', status: 'available' });
    setShowForm(false);
    setEditingId(null);
    fetchDrivers();
  };

  const handleEdit = (driver: Driver) => {
    setFormData({
      name: driver.name,
      phone: driver.phone,
      licenseNumber: driver.licenseNumber,
      status: driver.status,
    });
    setEditingId(driver.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this driver?')) {
      await fetch(`/api/drivers/${id}`, { method: 'DELETE' });
      fetchDrivers();
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--dark-accent)', marginBottom: '0.25rem' }}>
            Drivers
          </h1>
          <p style={{ color: 'var(--gray-text)', fontSize: '0.95rem' }}>
            Manage your fleet drivers
          </p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: '', phone: '', licenseNumber: '', status: 'available' }); }}
          className="admin-btn admin-btn-primary"
        >
          + Add Driver
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        {drivers.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-text)' }}>
            No drivers found. Add your first driver to get started.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>License Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id}>
                  <td style={{ fontWeight: 600 }}>{driver.name}</td>
                  <td>{driver.phone}</td>
                  <td>{driver.licenseNumber}</td>
                  <td>
                    <span className={`status-badge status-${driver.status}`}>{driver.status}</span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(driver)} className="admin-btn admin-btn-secondary admin-btn-sm" style={{ marginRight: '0.5rem' }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(driver.id)} className="admin-btn admin-btn-danger admin-btn-sm">
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
              <h2 className="modal-title">{editingId ? 'Edit Driver' : 'Add Driver'}</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  placeholder="Full Name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                  placeholder="Phone Number"
                />
              </div>
              <div className="form-group">
                <label className="form-label">License Number</label>
                <input
                  type="text"
                  required
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="form-input"
                  placeholder="License Number"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Driver['status'] })}
                  className="form-select"
                >
                  <option value="available">Available</option>
                  <option value="on-trip">On Trip</option>
                  <option value="off-duty">Off Duty</option>
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
