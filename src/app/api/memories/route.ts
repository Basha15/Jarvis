import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { MemoryItem } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || 'usr_jarvis_master';
  const query = searchParams.get('q')?.toLowerCase();
  const category = searchParams.get('category');

  let memories = db.getMemories(userId);

  if (category) {
    memories = memories.filter((m) => m.category === category);
  }

  if (query) {
    memories = memories.filter(
      (m) =>
        m.content.toLowerCase().includes(query) ||
        m.normalizedSummary.toLowerCase().includes(query) ||
        m.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  return NextResponse.json({ memories });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId || 'usr_jarvis_master';

    const newMemory: MemoryItem = {
      id: `mem_${Date.now()}`,
      userId,
      category: body.category || 'fact',
      content: body.content,
      normalizedSummary: body.normalizedSummary || body.content,
      tags: body.tags || [],
      language: body.language || 'en',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.addMemory(newMemory);

    db.addAuditLog({
      id: `aud_${Date.now()}`,
      userId,
      action: 'Memory Stored',
      resource: `Memory [${newMemory.category}]`,
      permissionLevelUsed: 'EXECUTE',
      status: 'success',
      timestamp: new Date().toISOString(),
      details: `Saved memory item: ${newMemory.normalizedSummary}`,
    });

    return NextResponse.json({ success: true, memory: newMemory });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Memory ID is required' }, { status: 400 });
    }

    const updated = db.updateMemory(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Memory not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, memory: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Memory ID required' }, { status: 400 });
  }

  db.deleteMemory(id);

  db.addAuditLog({
    id: `aud_${Date.now()}`,
    userId: 'usr_jarvis_master',
    action: 'Memory Deleted',
    resource: `Memory ID: ${id}`,
    permissionLevelUsed: 'EXECUTE',
    status: 'success',
    timestamp: new Date().toISOString(),
    details: 'User explicitly deleted memory item',
  });

  return NextResponse.json({ success: true });
}
