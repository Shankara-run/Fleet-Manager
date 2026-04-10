import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const drivers = db.drivers.getAll();
  return NextResponse.json(drivers);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const driver = db.drivers.create(body);
  return NextResponse.json(driver, { status: 201 });
}
