import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const users = db.getUsers();
  const user = users[0];
  return NextResponse.json({ user });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id = 'usr_jarvis_master', ...updates } = body;

    const updated = db.updateUserPreferences(id, updates);
    return NextResponse.json({ success: true, user: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
