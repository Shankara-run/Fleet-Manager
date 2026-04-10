import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const trip = db.trips.getById(id);
  if (!trip) {
    return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
  }
  return NextResponse.json(trip);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const trip = db.trips.update(id, body);
  if (!trip) {
    return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
  }
  return NextResponse.json(trip);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = db.trips.delete(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
