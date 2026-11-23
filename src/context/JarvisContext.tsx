'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ConversationMessage, Language, Reminder, Task, Project, User } from '@/types';

interface JarvisContextType {
  user: User | null;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  activeLanguage: Language;
  setActiveLanguage: (lang: Language) => void;
  voiceSpeed: number;
  setVoiceSpeed: (speed: number) => void;
  messages: ConversationMessage[];
  tasks: Task[];
  reminders: Reminder[];
  projects: Project[];
  startListening: () => void;
  stopListening: () => void;
  stopSpeaking: () => void;
  sendMessage: (text: string) => Promise<void>;
  speakText: (text: string, lang: Language) => void;
  refreshData: () => Promise<void>;
  permissionStatus: 'prompt' | 'granted' | 'denied';
  requestNotificationPermission: () => Promise<void>;
  lastSpokenText: string;
  repeatLastResponse: () => void;
}

const JarvisContext = createContext<JarvisContextType | undefined>(undefined);

export function JarvisProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [voiceSpeed, setVoiceSpeed] = useState<number>(1.18);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [lastSpokenText, setLastSpokenText] = useState<string>('');
  const [lastSpokenLang, setLastSpokenLang] = useState<Language>('en');

  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Load initial data
  const refreshData = async () => {
    try {
      const [uRes, chatRes, taskRes, remRes, projRes] = await Promise.all([
        fetch('/api/user').then((r) => r.json()),
        fetch('/api/chat').then((r) => r.json()),
        fetch('/api/tasks').then((r) => r.json()),
        fetch('/api/reminders').then((r) => r.json()),
        fetch('/api/projects').then((r) => r.json()),
      ]);

      if (uRes.user) {
        setUser(uRes.user);
        setTheme(uRes.user.theme || 'dark');
        setActiveLanguage(uRes.user.languagePreference || 'en');
        setVoiceSpeed(uRes.user.voiceSpeed || 1.18);
      }
      if (chatRes.messages) setMessages(chatRes.messages);
      if (taskRes.tasks) setTasks(taskRes.tasks);
      if (remRes.reminders) setReminders(remRes.reminders);
      if (projRes.projects) setProjects(projRes.projects);
    } catch (err) {
      console.error('Error refreshing JARVIS data:', err);
    }
  };

  useEffect(() => {
    refreshData();

    // Check notification permission
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermissionStatus(Notification.permission as any);
    }

    // Apply dark class to document
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (typeof document !== 'undefined') {
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    }
    fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: nextTheme }),
    });
  };

  const requestNotificationPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setPermissionStatus(perm as any);
      } catch (err) {
        console.error('Notification permission error:', err);
      }
    }
  };

  // Web Speech Synthesis with natural male voice priority
  const speakText = (text: string, lang: Language) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    setLastSpokenText(text);
    setLastSpokenLang(lang);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = voiceSpeed;
    utterance.pitch = 0.92; // Deep, mature tone

    // Target language tag
    if (lang === 'te') {
      utterance.lang = 'te-IN';
    } else if (lang === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-US';
    }

    const voices = window.speechSynthesis.getVoices();
    // Prioritize natural male neural voices
    const maleVoice = voices.find((v) => {
      const vName = v.name.toLowerCase();
      if (lang === 'te') {
        return v.lang.includes('te') || vName.includes('telugu') || vName.includes('mohan');
      }
      if (lang === 'hi') {
        return (v.lang.includes('hi') || vName.includes('hindi') || vName.includes('ravi')) && (vName.includes('male') || !vName.includes('female'));
      }
      return (
        (vName.includes('male') || vName.includes('guy') || vName.includes('george') || vName.includes('david')) &&
        (v.lang.startsWith('en') || v.lang.includes('en-US') || v.lang.includes('en-GB'))
      );
    });

    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const repeatLastResponse = () => {
    if (lastSpokenText) {
      speakText(lastSpokenText, lastSpokenLang);
    }
  };

  // Web Speech Recognition
  const startListening = () => {
    if (typeof window === 'undefined') return;

    // Interrupt any active speech immediately
    stopSpeaking();

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    if (activeLanguage === 'te') {
      recognition.lang = 'te-IN';
    } else if (activeLanguage === 'hi') {
      recognition.lang = 'hi-IN';
    } else {
      recognition.lang = 'en-US';
    }

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      if (transcript) {
        sendMessage(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition status:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Send message to JARVIS
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Interrupt any playing speech
    stopSpeaking();
    setIsProcessing(true);

    // Optimistically show user message
    const tempUserMsg: ConversationMessage = {
      id: `temp_${Date.now()}`,
      conversationId: 'conv_initial',
      role: 'user',
      content: text,
      language: activeLanguage,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language: activeLanguage }),
      });

      const data = await res.json();
      setIsProcessing(false);

      if (data.message) {
        setMessages((prev) => [...prev, data.message]);

        // Speak response immediately using natural male voice
        if (data.spokenText) {
          speakText(data.spokenText, data.spokenLanguage || 'en');
        }

        // If intent created/updated entities, refresh app data
        if (data.intent && data.intent !== 'general_chat') {
          await refreshData();
        }
      }
    } catch (err) {
      console.error('Send message error:', err);
      setIsProcessing(false);
    }
  };

  // Persistent Reminder Background Engine
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date().getTime();
      reminders.forEach((rem) => {
        if (rem.status === 'active') {
          const remTime = new Date(rem.scheduledTime).getTime();
          // Check if due within past 60s or overdue
          if (now >= remTime && now - remTime < 60000) {
            // Play notification tone or speech
            if (rem.voiceAnnouncement) {
              speakText(`Attention: ${rem.title} is now due.`, 'en');
            }
            if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
              new Notification('JARVIS Reminder', {
                body: rem.title,
                icon: '/icons/icon-192.png',
              });
            }
          }
        }
      });
    };

    const interval = setInterval(checkReminders, 15000);
    return () => clearInterval(interval);
  }, [reminders]);

  return (
    <JarvisContext.Provider
      value={{
        user,
        theme,
        toggleTheme,
        isListening,
        isSpeaking,
        isProcessing,
        activeLanguage,
        setActiveLanguage,
        voiceSpeed,
        setVoiceSpeed,
        messages,
        tasks,
        reminders,
        projects,
        startListening,
        stopListening,
        stopSpeaking,
        sendMessage,
        speakText,
        refreshData,
        permissionStatus,
        requestNotificationPermission,
        lastSpokenText,
        repeatLastResponse,
      }}
    >
      {children}
    </JarvisContext.Provider>
  );
}

export function useJarvis() {
  const context = useContext(JarvisContext);
  if (!context) {
    throw new Error('useJarvis must be used within a JarvisProvider');
  }
  return context;
}
