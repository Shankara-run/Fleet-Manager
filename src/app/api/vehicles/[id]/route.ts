import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const vehicle = db.vehicles.getById(id);
  if (!vehicle) {
    return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
  }
  return NextResponse.json(vehicle);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const vehicle = db.vehicles.update(id, body);
  if (!vehicle) {
    return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
  }
  return NextResponse.json(vehicle);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = db.vehicles.delete(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
