import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { processUserInstruction } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, conversationId = 'conv_initial', userId = 'usr_jarvis_master' } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message text is required' }, { status: 400 });
    }

    // Record user message
    const userMsg = db.addMessage({
      id: `msg_${Date.now()}_u`,
      conversationId,
      role: 'user',
      content: message,
      language: 'en', // will be refined by processor
      createdAt: new Date().toISOString(),
    });

    // Process instruction
    const result = await processUserInstruction(message, userId);

    // Update user msg language
    userMsg.language = result.detectedLanguage;

    // Record assistant message
    const assistantMsg = db.addMessage({
      id: `msg_${Date.now()}_a`,
      conversationId,
      role: 'assistant',
      content: result.responseEnglish,
      language: result.spokenLanguage,
      createdAt: new Date().toISOString(),
      intent: result.intent,
      actionTaken: result.normalizedAction,
    });

    return NextResponse.json({
      success: true,
      message: assistantMsg,
      spokenText: result.responseSpoken,
      spokenLanguage: result.spokenLanguage,
      detectedLanguage: result.detectedLanguage,
      intent: result.intent,
      normalizedAction: result.normalizedAction,
      affectedEntities: result.affectedEntities,
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get('conversationId') || 'conv_initial';
  const messages = db.getMessages(conversationId);
  return NextResponse.json({ messages });
}
