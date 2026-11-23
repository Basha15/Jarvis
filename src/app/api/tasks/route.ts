import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Task } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || 'usr_jarvis_master';
  const category = searchParams.get('category');
  const status = searchParams.get('status');

  let tasks = db.getTasks(userId);
  if (category) {
    tasks = tasks.filter((t) => t.category === category);
  }
  if (status) {
    tasks = tasks.filter((t) => t.status === status);
  }

  return NextResponse.json({ tasks });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId || 'usr_jarvis_master';

    const newTask: Task = {
      id: `task_${Date.now()}`,
      userId,
      projectId: body.projectId,
      title: body.title,
      description: body.description || '',
      category: body.category || 'work',
      priority: body.priority || 'medium',
      status: body.status || 'pending',
      dueDate: body.dueDate || new Date(Date.now() + 86400000).toISOString(),
      subtasks: body.subtasks || [],
      sourceLanguage: body.sourceLanguage || 'en',
      createdAt: new Date().toISOString(),
    };

    db.addTask(newTask);

    db.addAuditLog({
      id: `aud_${Date.now()}`,
      userId,
      action: 'Task Created',
      resource: `Task: ${newTask.title}`,
      permissionLevelUsed: 'EXECUTE',
      status: 'success',
      timestamp: new Date().toISOString(),
      details: `Created task with priority ${newTask.priority}`,
    });

    return NextResponse.json({ success: true, task: newTask });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    if (updates.status === 'completed' && !updates.completedAt) {
      updates.completedAt = new Date().toISOString();
    }

    const updated = db.updateTask(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, task: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Task ID required' }, { status: 400 });
  }

  db.deleteTask(id);
  return NextResponse.json({ success: true });
}
