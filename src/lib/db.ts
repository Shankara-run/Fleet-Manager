import { Vehicle, Driver, Trip, Booking } from '@/types';

const vehicles: Vehicle[] = [
  {
    id: '1',
    plateNumber: 'ABC-123',
    model: 'Toyota Hiace',
    capacity: 12,
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    plateNumber: 'DEF-456',
    model: 'Ford Transit',
    capacity: 15,
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const drivers: Driver[] = [
  {
    id: '1',
    name: 'John Smith',
    phone: '+1234567890',
    licenseNumber: 'DL-12345',
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Doe',
    phone: '+0987654321',
    licenseNumber: 'DL-67890',
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const trips: Trip[] = [
  {
    id: '1',
    vehicleId: '1',
    driverId: '1',
    origin: 'New York',
    destination: 'Boston',
    departureTime: new Date(Date.now() + 86400000).toISOString(),
    arrivalTime: null,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const bookings: Booking[] = [];

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export const db = {
  vehicles: {
    getAll: () => [...vehicles],
    getById: (id: string) => vehicles.find((v) => v.id === id),
    create: (data: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) => {
      const vehicle: Vehicle = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      vehicles.push(vehicle);
      return vehicle;
    },
    update: (id: string, data: Partial<Vehicle>) => {
      const index = vehicles.findIndex((v) => v.id === id);
      if (index === -1) return null;
      vehicles[index] = { ...vehicles[index], ...data, updatedAt: new Date().toISOString() };
      return vehicles[index];
    },
    delete: (id: string) => {
      const index = vehicles.findIndex((v) => v.id === id);
      if (index === -1) return false;
      vehicles.splice(index, 1);
      return true;
    },
  },
  drivers: {
    getAll: () => [...drivers],
    getById: (id: string) => drivers.find((d) => d.id === id),
    create: (data: Omit<Driver, 'id' | 'createdAt' | 'updatedAt'>) => {
      const driver: Driver = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      drivers.push(driver);
      return driver;
    },
    update: (id: string, data: Partial<Driver>) => {
      const index = drivers.findIndex((d) => d.id === id);
      if (index === -1) return null;
      drivers[index] = { ...drivers[index], ...data, updatedAt: new Date().toISOString() };
      return drivers[index];
    },
    delete: (id: string) => {
      const index = drivers.findIndex((d) => d.id === id);
      if (index === -1) return false;
      drivers.splice(index, 1);
      return true;
    },
  },
  trips: {
    getAll: () => [...trips],
    getById: (id: string) => trips.find((t) => t.id === id),
    create: (data: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) => {
      const trip: Trip = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      trips.push(trip);
      return trip;
    },
    update: (id: string, data: Partial<Trip>) => {
      const index = trips.findIndex((t) => t.id === id);
      if (index === -1) return null;
      trips[index] = { ...trips[index], ...data, updatedAt: new Date().toISOString() };
      return trips[index];
    },
    delete: (id: string) => {
      const index = trips.findIndex((t) => t.id === id);
      if (index === -1) return false;
      trips.splice(index, 1);
      return true;
    },
  },
  bookings: {
    getAll: () => [...bookings],
    getById: (id: string) => bookings.find((b) => b.id === id),
    getByTripId: (tripId: string) => bookings.filter((b) => b.tripId === tripId),
    create: (data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
      const booking: Booking = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      bookings.push(booking);
      return booking;
    },
    update: (id: string, data: Partial<Booking>) => {
      const index = bookings.findIndex((b) => b.id === id);
      if (index === -1) return null;
      bookings[index] = { ...bookings[index], ...data, updatedAt: new Date().toISOString() };
      return bookings[index];
    },
    delete: (id: string) => {
      const index = bookings.findIndex((b) => b.id === id);
      if (index === -1) return false;
      bookings.splice(index, 1);
      return true;
    },
  },
};
