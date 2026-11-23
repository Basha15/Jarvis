import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Project } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || 'usr_jarvis_master';
  const projects = db.getProjects(userId);
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId || 'usr_jarvis_master';

    const newProject: Project = {
      id: `proj_${Date.now()}`,
      userId,
      name: body.name,
      description: body.description || '',
      objective: body.objective || '',
      category: body.category || 'technical',
      startDate: body.startDate || new Date().toISOString().split('T')[0],
      deadline: body.deadline || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      priority: body.priority || 'high',
      status: body.status || 'active',
      progressPercentage: body.progressPercentage || 0,
      milestones: body.milestones || [],
      dependencies: body.dependencies || [],
      budgetEstimated: body.budgetEstimated,
      budgetSpent: body.budgetSpent || 0,
      resources: body.resources || [],
      nextAction: body.nextAction || 'Initialize project blueprint',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.addProject(newProject);

    db.addAuditLog({
      id: `aud_${Date.now()}`,
      userId,
      action: 'Project Initialized',
      resource: `Project: ${newProject.name}`,
      permissionLevelUsed: 'EXECUTE',
      status: 'success',
      timestamp: new Date().toISOString(),
      details: `Created project with ${newProject.milestones.length} milestones`,
    });

    return NextResponse.json({ success: true, project: newProject });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const updated = db.updateProject(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
  }

  db.deleteProject(id);
  return NextResponse.json({ success: true });
}
