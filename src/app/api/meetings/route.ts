import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Meeting } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || 'usr_jarvis_master';
  const meetings = db.getMeetings(userId);
  return NextResponse.json({ meetings });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId || 'usr_jarvis_master';

    const newMeeting: Meeting = {
      id: `meet_${Date.now()}`,
      userId,
      title: body.title,
      startTime: body.startTime,
      endTime: body.endTime,
      platform: body.platform || 'google_meet',
      participants: body.participants || [],
      link: body.link || 'https://meet.google.com/jarvis-sync',
      agenda: body.agenda || [],
      prepNotes: body.prepNotes || '',
      actionItems: body.actionItems || [],
      createdAt: new Date().toISOString(),
    };

    db.addMeeting(newMeeting);

    db.addAuditLog({
      id: `aud_${Date.now()}`,
      userId,
      action: 'Meeting Scheduled',
      resource: `Meeting: ${newMeeting.title}`,
      permissionLevelUsed: 'EXECUTE',
      status: 'success',
      timestamp: new Date().toISOString(),
      details: `Scheduled meeting on ${newMeeting.platform} at ${newMeeting.startTime}`,
    });

    return NextResponse.json({ success: true, meeting: newMeeting });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
