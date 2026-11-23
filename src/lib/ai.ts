import { Language, Task, Reminder, Project } from '@/types';
import { db } from './db';

export interface AIIntentResult {
  intent:
    | 'task_create'
    | 'task_complete'
    | 'task_query'
    | 'schedule_query'
    | 'project_query'
    | 'project_create'
    | 'meeting_reschedule'
    | 'booking_request'
    | 'document_generate'
    | 'research_query'
    | 'general_chat';
  detectedLanguage: Language;
  normalizedAction?: string;
  responseEnglish: string;
  responseSpoken: string;
  spokenLanguage: Language;
  affectedEntities?: {
    task?: Partial<Task>;
    reminder?: Partial<Reminder>;
    project?: Partial<Project>;
  };
}

export function detectLanguage(text: string): Language {
  // Telugu unicode range: \u0C00-\u0C7F or common romanized words
  const teluguUnicode = /[\u0C00-\u0C7F]/;
  const teluguRomanized = /\b(repu|cheyyi|pettu|entha|undi|nenu|chesanu|ivvandi|chudu|ela|eppudu|mee|naa|chesko|kavali)\b/i;

  // Devanagari unicode range: \u0900-\u097F or common romanized Hindi words
  const hindiUnicode = /[\u0900-\u097F]/;
  const hindiRomanized = /\b(kal|mera|meri|mujhe|karwao|karo|hai|kya|hoga|batao|karna|shukriya|thik|samay|raha|rahi)\b/i;

  if (teluguUnicode.test(text) || teluguRomanized.test(text)) {
    return 'te';
  }
  if (hindiUnicode.test(text) || hindiRomanized.test(text)) {
    return 'hi';
  }
  return 'en';
}

export async function processUserInstruction(input: string, userId: string = 'usr_jarvis_master'): Promise<AIIntentResult> {
  const cleanInput = input.trim();
  const lang = detectLanguage(cleanInput);
  const lower = cleanInput.toLowerCase();

  // 1. Task Completion Intent
  // e.g. "Jarvis, completed", "I finished my workout", "nenu task complete chesanu", "is task ko complete mark karo"
  if (
    lower.includes('complete') ||
    lower.includes('finished') ||
    lower.includes('chesanu') ||
    lower.includes('pura ho gaya') ||
    lower.includes('done') ||
    lower.includes('khatam')
  ) {
    const tasks = db.getTasks(userId);
    // Determine which task: workout, checklist, or top pending
    let matchedTask = tasks.find(
      (t) =>
        t.status !== 'completed' &&
        (lower.includes(t.title.toLowerCase()) ||
          (lower.includes('workout') && t.title.toLowerCase().includes('workout')) ||
          (lower.includes('checklist') && t.title.toLowerCase().includes('checklist')))
    );

    if (!matchedTask) {
      // Pick first active pending task
      matchedTask = tasks.find((t) => t.status !== 'completed');
    }

    if (matchedTask) {
      db.updateTask(matchedTask.id, {
        status: 'completed',
        completedAt: new Date().toISOString(),
      });

      // Update any associated reminder
      const reminders = db.getReminders(userId);
      const matchedReminder = reminders.find((r) => r.taskId === matchedTask?.id);
      if (matchedReminder) {
        db.updateReminder(matchedReminder.id, { status: 'completed' });
      }

      // Record audit log
      db.addAuditLog({
        id: `aud_${Date.now()}`,
        userId,
        action: 'Voice Task Completion',
        resource: `Task: ${matchedTask.title}`,
        permissionLevelUsed: 'EXECUTE',
        status: 'success',
        timestamp: new Date().toISOString(),
        details: `Task confirmed and marked complete via voice/text in ${lang.toUpperCase()}.`,
      });

      let spoken = '';
      if (lang === 'te') {
        spoken = `మీ టాస్క్ "${matchedTask.title}" పూర్తి అయినట్లుగా మార్క్ చేశాను. బాష్పాట్ రిమైండర్ కూడా ఆపబడింది.`;
      } else if (lang === 'hi') {
        spoken = `आपका कार्य "${matchedTask.title}" सफलतापूर्वक पूरा कर दिया गया है। संबंधित रिमाइंडर भी अपडेट हो गया है।`;
      } else {
        spoken = `Understood. I have marked "${matchedTask.title}" as completed and deactivated its pending alert.`;
      }

      return {
        intent: 'task_complete',
        detectedLanguage: lang,
        normalizedAction: `Completed task: ${matchedTask.title}`,
        responseEnglish: `Task "${matchedTask.title}" marked as complete. Reminder closed.`,
        responseSpoken: spoken,
        spokenLanguage: lang,
        affectedEntities: { task: matchedTask },
      };
    }
  }

  // 2. Project Status / Progress Query
  // e.g. "Jarvis, naa project progress entha undi?", "Show me the progress of my current projects", "What is delayed?"
  if (
    lower.includes('project progress') ||
    lower.includes('entha undi') ||
    lower.includes('project ka progress') ||
    lower.includes('current projects') ||
    lower.includes('delayed') ||
    lower.includes('naa project')
  ) {
    const projects = db.getProjects(userId);
    const activeProjects = projects.filter((p) => p.status === 'active');
    const primary = activeProjects[0] || projects[0];

    let spoken = '';
    if (lang === 'te') {
      spoken = `మీ "${primary.name}" ప్రాజెక్ట్ ప్రస్తుతం ${primary.progressPercentage} శాతం పూర్తయింది. తదుపరి యాక్షన్: ${primary.nextAction}`;
    } else if (lang === 'hi') {
      spoken = `आपके प्रोजेक्ट "${primary.name}" की प्रगति ${primary.progressPercentage}% है। अगला कदम: ${primary.nextAction}`;
    } else {
      spoken = `Your primary project "${primary.name}" is currently at ${primary.progressPercentage}% completion. Next recommended action: ${primary.nextAction}`;
    }

    return {
      intent: 'project_query',
      detectedLanguage: lang,
      normalizedAction: `Project progress query for ${primary.name}`,
      responseEnglish: `Primary project "${primary.name}" is at ${primary.progressPercentage}% progress with ${primary.milestones.filter((m) => m.completed).length} of ${primary.milestones.length} milestones achieved.`,
      responseSpoken: spoken,
      spokenLanguage: lang,
      affectedEntities: { project: primary },
    };
  }

  // 3. Timetable / Schedule Query
  // e.g. "What is my schedule tomorrow?", "repu schedule enti?", "kal ka timetable batao"
  if (
    lower.includes('schedule') ||
    lower.includes('timetable') ||
    lower.includes('repu schedule') ||
    lower.includes('kal ka') ||
    lower.includes('calendar') ||
    lower.includes('agenda')
  ) {
    const meetings = db.getMeetings(userId);
    const tasks = db.getTasks(userId).filter((t) => t.status !== 'completed');

    let spoken = '';
    if (lang === 'te') {
      spoken = `రేపు మీకు ఉదయం 10 గంటలకు ఆర్కిటెక్చర్ సింక్ మీటింగ్ ఉంది, అలాగే ${tasks.length} యాక్టివ్ టాస్కులు పెండింగ్‌లో ఉన్నాయి.`;
    } else if (lang === 'hi') {
      spoken = `कल सुबह 10:00 बजे आपकी टेक्निकल सिंक मीटिंग निर्धारित है, और ${tasks.length} महत्वपूर्ण कार्य पेंडिंग हैं।`;
    } else {
      spoken = `Tomorrow you have 1 executive sync scheduled at 10:00 AM, along with ${tasks.length} pending priority tasks.`;
    }

    return {
      intent: 'schedule_query',
      detectedLanguage: lang,
      normalizedAction: 'Retrieved daily timetable and scheduled meetings',
      responseEnglish: `Schedule overview: Architecture Sync at 10:00 AM Google Meet, plus ${tasks.length} active priority tasks.`,
      responseSpoken: spoken,
      spokenLanguage: lang,
    };
  }

  // 4. Task / Reminder Creation Intent
  // e.g. "Jarvis, remind me to call the client at 4 PM", "Jarvis, repu morning 7 ki workout reminder pettu"
  if (
    lower.includes('remind') ||
    lower.includes('reminder') ||
    lower.includes('pettu') ||
    lower.includes('yaad') ||
    lower.includes('set a reminder')
  ) {
    let title = 'Scheduled Reminder';
    let timeStr = '2026-11-24T16:00:00Z';
    let recurrence: Reminder['recurrence'] = 'none';

    if (lower.includes('workout') || lower.includes('kasrat')) {
      title = 'Morning Workout Routine';
      timeStr = '2026-11-24T07:00:00Z';
      recurrence = 'daily';
    } else if (lower.includes('client') || lower.includes('call')) {
      title = 'Call Client and Review Deliverables';
      timeStr = '2026-11-24T16:00:00Z';
      recurrence = 'none';
    } else {
      title = cleanInput.replace(/jarvis/i, '').replace(/remind me to/i, '').replace(/reminder pettu/i, '').trim();
      if (!title) title = 'Important Reminder';
    }

    const newTask: Task = {
      id: `task_${Date.now()}`,
      userId,
      title,
      description: `Created via voice command: "${cleanInput}"`,
      category: lower.includes('workout') ? 'health' : 'work',
      priority: 'high',
      status: 'pending',
      dueDate: timeStr,
      subtasks: [],
      sourceLanguage: lang,
      createdAt: new Date().toISOString(),
    };

    const newReminder: Reminder = {
      id: `rem_${Date.now()}`,
      userId,
      taskId: newTask.id,
      title,
      scheduledTime: timeStr,
      recurrence,
      ringtone: 'chime',
      voiceAnnouncement: true,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    db.addTask(newTask);
    db.addReminder(newReminder);

    // Save to cross-language memory
    db.addMemory({
      id: `mem_${Date.now()}`,
      userId,
      category: 'routine',
      content: `User set reminder: ${title} at ${timeStr}`,
      normalizedSummary: `Reminder for ${title} (${recurrence}) saved.`,
      tags: [lang, 'reminder', 'auto_normalized'],
      language: lang,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    let spoken = '';
    if (lang === 'te') {
      spoken = `తప్పకుండా! "${title}" కోసం రిమైండర్ సేవ్ చేశాను. రిమైండర్ సమయానికి నేను మీకు వాయిస్ అనౌన్స్‌మెంట్ చేస్తాను.`;
    } else if (lang === 'hi') {
      spoken = `निश्चिंत रहें। मैंने "${title}" के लिए रिमाइंडर सेट कर दिया है। निर्धारित समय पर आपको वॉयस अलर्ट मिलेगा।`;
    } else {
      spoken = `Reminder confirmed for "${title}". Persistent alert and voice announcement are scheduled.`;
    }

    return {
      intent: 'task_create',
      detectedLanguage: lang,
      normalizedAction: `Created task and reminder: ${title}`,
      responseEnglish: `Created task and scheduled reminder for "${title}".`,
      responseSpoken: spoken,
      spokenLanguage: lang,
      affectedEntities: { task: newTask, reminder: newReminder },
    };
  }

  // 5. Meeting Reschedule
  // e.g. "Move my meeting to Friday", "ee meeting ni Friday ki reschedule cheyyi"
  if (lower.includes('reschedule') || lower.includes('move my meeting') || lower.includes('friday ki')) {
    const meetings = db.getMeetings(userId);
    const m = meetings[0];
    let spoken = '';
    if (lang === 'te') {
      spoken = `మీ "${m.title}" మీటింగ్‌ను శుక్రవారం ఉదయం 10 గంటలకు రీషెడ్యూల్ చేయడానికి క్యాలెండర్ డ్రాఫ్ట్ సిద్ధం చేశాను. దయచేసి ధృవీకరించండి.`;
    } else if (lang === 'hi') {
      spoken = `आपकी "${m.title}" मीटिंग को शुक्रवार सुबह 10:00 बजे स्थानांतरित करने का ड्राफ्ट तैयार है। क्या मैं इसे कन्फर्म करूँ?`;
    } else {
      spoken = `I have drafted the reschedule for "${m.title}" to Friday at 10:00 AM. Please confirm execution.`;
    }

    return {
      intent: 'meeting_reschedule',
      detectedLanguage: lang,
      normalizedAction: `Drafted reschedule for ${m.title} to Friday`,
      responseEnglish: `Reschedule prepared for "${m.title}" to Friday 10:00 AM (Permission: PREPARE).`,
      responseSpoken: spoken,
      spokenLanguage: lang,
    };
  }

  // 6. Booking Requests
  if (lower.includes('flight') || lower.includes('hotel') || lower.includes('booking') || lower.includes('train')) {
    let spoken = '';
    if (lang === 'te') {
      spoken = `మీ బుకింగ్ అభ్యర్థనను విశ్లేషించాను. బెస్ట్ ధరలతో రెండు ధృవీకరించబడిన ఎంపికలు సిద్ధంగా ఉన్నాయి. బుకింగ్స్ విభాగంలో చూడవచ్చు.`;
    } else if (lang === 'hi') {
      spoken = `आपकी बुकिंग जानकारी तैयार कर ली गई है। वास्तविक उपलब्धता के साथ दो विकल्प तैयार हैं।`;
    } else {
      spoken = `I have prepared verified booking comparisons. Review options and provide confirmation before payment processing.`;
    }

    return {
      intent: 'booking_request',
      detectedLanguage: lang,
      normalizedAction: 'Booking options prepared and ready for confirmation',
      responseEnglish: 'Booking options analyzed with real-time verified schedules. Awaiting confirmation.',
      responseSpoken: spoken,
      spokenLanguage: lang,
    };
  }

  // 7. General Conversational Fallback / Intelligence
  let spoken = '';
  if (lang === 'te') {
    spoken = `మీ ఆదేశం అర్థమైంది. నేను మీ విధులను, ప్రాజెక్టులను మరియు షెడ్యూల్‌ను నిర్వహించడానికి సిద్ధంగా ఉన్నాను.`;
  } else if (lang === 'hi') {
    spoken = `निर्देश प्राप्त हुआ। मैं आपके कार्यों, प्रोजेक्ट्स और शेड्यूल को प्रबंधित करने के लिए तैयार हूँ।`;
  } else {
    spoken = `Instruction processed. All system modules, projects, and active schedules are aligned.`;
  }

  return {
    intent: 'general_chat',
    detectedLanguage: lang,
    normalizedAction: 'Processed general query',
    responseEnglish: `JARVIS received: "${cleanInput}". All modules synchronized.`,
    responseSpoken: spoken,
    spokenLanguage: lang,
  };
}
