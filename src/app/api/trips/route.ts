import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const trips = db.trips.getAll();
  return NextResponse.json(trips);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const trip = db.trips.create({
    ...body,
    arrivalTime: null,
    status: 'scheduled',
  });
  return NextResponse.json(trip, { status: 201 });
}
