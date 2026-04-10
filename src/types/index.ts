export interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  capacity: number;
  status: 'available' | 'in-use' | 'maintenance';
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  status: 'available' | 'on-trip' | 'off-duty';
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: string;
  vehicleId: string;
  driverId: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string | null;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  tripId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  seatsBooked: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface CreateVehicleInput {
  plateNumber: string;
  model: string;
  capacity: number;
}

export interface CreateDriverInput {
  name: string;
  phone: string;
  licenseNumber: string;
}

export interface CreateTripInput {
  vehicleId: string;
  driverId: string;
  origin: string;
  destination: string;
  departureTime: string;
}

export interface CreateBookingInput {
  tripId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  seatsBooked: number;
}
