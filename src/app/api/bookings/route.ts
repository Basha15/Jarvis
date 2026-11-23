import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Booking } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || 'usr_jarvis_master';
  const bookings = db.getBookings(userId);
  return NextResponse.json({ bookings });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId || 'usr_jarvis_master';

    const newBooking: Booking = {
      id: `book_${Date.now()}`,
      userId,
      serviceType: body.serviceType || 'flight',
      title: body.title,
      status: 'options_ready',
      searchCriteria: body.searchCriteria || {},
      options: body.options || [],
      userConfirmed: false,
      createdAt: new Date().toISOString(),
    };

    db.addBooking(newBooking);

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, confirmBooking, selectedOptionId } = body;

    if (!id) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    const updates: Partial<Booking> = {};
    if (selectedOptionId) {
      updates.selectedOptionId = selectedOptionId;
    }

    if (confirmBooking) {
      // Permission safeguards: Must have explicit confirmation
      updates.userConfirmed = true;
      updates.status = 'confirmed';
      updates.confirmationCode = `JRV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      updates.confirmedDetails = `Confirmed reservation with provider. Booking reference recorded.`;

      db.addAuditLog({
        id: `aud_${Date.now()}`,
        userId: 'usr_jarvis_master',
        action: 'Booking Confirmed with Authorization',
        resource: `Booking ID: ${id}`,
        permissionLevelUsed: 'EXECUTE',
        status: 'success',
        timestamp: new Date().toISOString(),
        details: `User explicitly approved booking transaction. Confirmation code: ${updates.confirmationCode}`,
      });
    }

    const updated = db.updateBooking(id, updates);
    return NextResponse.json({ success: true, booking: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
