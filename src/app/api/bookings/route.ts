import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const bookings = db.bookings.getAll();
  return NextResponse.json(bookings);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const booking = db.bookings.create({
    ...body,
    status: 'pending',
  });
  return NextResponse.json(booking, { status: 201 });
}
