# Fleet Manager - Admin Guide

## How to Open Admin Page

Navigate to: **http://localhost:3000/admin**

## Data Storage

Data is stored in **in-memory** (resets when server restarts):

| File | Data |
|------|------|
| `src/lib/db.ts` | All data (vehicles, drivers, trips, bookings) |

### Initial Data:
- **2 Vehicles**: ABC-123 (Toyota Hiace, 12 seats), DEF-456 (Ford Transit, 15 seats)
- **2 Drivers**: John Smith, Jane Doe
- **1 Trip**: New York → Boston (scheduled)
- **0 Bookings** (empty)

## Navigation

Sidebar menu:
- `/admin` - Dashboard (stats overview)
- `/admin/trips` - Trip management
- `/admin/drivers` - Driver management  
- `/admin/vehicles` - Vehicle management
- `/admin/bookings` - Customer bookings (read-only, no add button)

## Data Flow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│   Frontend      │────▶│  Next.js API     │────▶│  In-memory  │
│  (React Pages)  │◀────│  Routes          │◀────│  Database   │
└─────────────────┘     └──────────────────┘     └─────────────┘
```

### API Endpoints:
| Resource | GET | POST | PUT | DELETE |
|----------|-----|------|-----|--------|
| `/api/vehicles` | List all | Create | - | - |
| `/api/vehicles/[id]` | Get one | - | Update | Delete |
| `/api/drivers` | List all | Create | - | - |
| `/api/drivers/[id]` | Get one | - | Update | Delete |
| `/api/trips` | List all | Create | - | - |
| `/api/trips/[id]` | Get one | - | Update | Delete |
| `/api/bookings` | List all | Create | - | - |
| `/api/bookings/[id]` | Get one | - | Update | Delete |

## Testing Guide - Adding Test Data

### 1. Add Vehicles
1. Go to `/admin/vehicles`
2. Click **+ Add Vehicle**
3. Fill form:
   - Plate Number: `XYZ-789`
   - Model: `Mercedes Sprinter`
   - Capacity: `14`
   - Status: `available`
4. Click **Save**

### 2. Add Drivers
1. Go to `/admin/drivers`
2. Click **+ Add Driver**
3. Fill form:
   - Name: `Mike Johnson`
   - Phone: `+1987654321`
   - License Number: `DL-11111`
   - Status: `available`
4. Click **Save**

### 3. Add Trips
1. Go to `/admin/trips`
2. Click **+ Add Trip**
3. Fill form:
   - Vehicle: Select a vehicle
   - Driver: Select a driver
   - Origin: `San Francisco`
   - Destination: `Los Angeles`
   - Departure Time: Choose a future date/time
4. Click **Save**

### 4. Create Booking (via API)
Use browser DevTools Console or Postman:
```javascript
fetch('/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    tripId: '1',
    customerName: 'Alice Smith',
    customerEmail: 'alice@example.com',
    customerPhone: '+123456789',
    seatsBooked: 2,
    status: 'pending'
  })
});
```

Then view at `/admin/bookings`

## Button Actions to Test

| Page | Buttons |
|------|---------|
| Dashboard | View stats cards, tables (read-only) |
| Vehicles | Add, Edit, Delete |
| Drivers | Add, Edit, Delete |
| Trips | Add, Edit, Delete |
| Bookings | Confirm, Cancel, Delete |
