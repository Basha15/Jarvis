import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const integrations = db.getIntegrations();
  return NextResponse.json({ integrations });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, connected, permissionLevel } = body;

    if (!id) {
      return NextResponse.json({ error: 'Integration ID is required' }, { status: 400 });
    }

    const updated = db.updateIntegration(id, {
      ...(connected !== undefined ? { connected } : {}),
      ...(permissionLevel ? { permissionLevel } : {}),
      lastSync: connected ? 'Just now' : undefined,
    });

    db.addAuditLog({
      id: `aud_${Date.now()}`,
      userId: 'usr_jarvis_master',
      action: `Integration ${connected ? 'Connected' : 'Disconnected'}`,
      resource: `Provider: ${id}`,
      permissionLevelUsed: permissionLevel || 'READ',
      status: 'success',
      timestamp: new Date().toISOString(),
      details: `Updated integration state to connected=${connected}, permissionLevel=${permissionLevel}`,
    });

    return NextResponse.json({ success: true, integration: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
