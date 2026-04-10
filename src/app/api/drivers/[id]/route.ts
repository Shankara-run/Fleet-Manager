import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const driver = db.drivers.getById(id);
  if (!driver) {
    return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
  }
  return NextResponse.json(driver);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const driver = db.drivers.update(id, body);
  if (!driver) {
    return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
  }
  return NextResponse.json(driver);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = db.drivers.delete(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
