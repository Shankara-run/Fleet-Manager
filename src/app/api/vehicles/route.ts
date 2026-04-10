import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const vehicles = db.vehicles.getAll();
  return NextResponse.json(vehicles);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const vehicle = db.vehicles.create(body);
  return NextResponse.json(vehicle, { status: 201 });
}
