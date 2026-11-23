import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Reminder } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || 'usr_jarvis_master';
  const reminders = db.getReminders(userId);
  return NextResponse.json({ reminders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId || 'usr_jarvis_master';

    const newReminder: Reminder = {
      id: `rem_${Date.now()}`,
      userId,
      taskId: body.taskId,
      title: body.title,
      scheduledTime: body.scheduledTime || new Date(Date.now() + 3600000).toISOString(),
      recurrence: body.recurrence || 'none',
      ringtone: body.ringtone || 'chime',
      voiceAnnouncement: body.voiceAnnouncement ?? true,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    db.addReminder(newReminder);

    db.addAuditLog({
      id: `aud_${Date.now()}`,
      userId,
      action: 'Reminder Created',
      resource: `Reminder: ${newReminder.title}`,
      permissionLevelUsed: 'EXECUTE',
      status: 'success',
      timestamp: new Date().toISOString(),
      details: `Scheduled reminder at ${newReminder.scheduledTime} with recurrence ${newReminder.recurrence}`,
    });

    return NextResponse.json({ success: true, reminder: newReminder });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Reminder ID is required' }, { status: 400 });
    }

    const updated = db.updateReminder(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Reminder not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, reminder: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Reminder ID required' }, { status: 400 });
  }

  db.deleteReminder(id);
  return NextResponse.json({ success: true });
}
