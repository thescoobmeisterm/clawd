// Clawd Status — Main Dashboard Page

'use client';

import { useState, useEffect } from 'react';
import { Avatar } from '@/components/Avatar';
import { MoodCard } from '@/components/MoodCard';
import { TaskBoard } from '@/components/TaskBoard';

// Types
interface ClawdState {
  mood: 'curious' | 'productive' | 'thoughtful' | 'playful' | 'tired' | 'connected';
  energy: number;
  thought: string;
  lastUpdated: string;
}

interface Task {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'upcoming';
  date?: string;
}

// Mock initial state (would come from API in production)
const initialState: ClawdState = {
  mood: 'curious',
  energy: 80,
  thought: 'Dreaming up new ways to help you ship faster...',
  lastUpdated: new Date().toISOString(),
};

const mockTasks: Task[] = [
  { id: '1', title: 'Build Clawd Status Desktop App', status: 'active', date: '2026-02-01' },
  { id: '2', title: 'Design Clawd avatar renderer', status: 'upcoming', date: '2026-02-02' },
  { id: '3', title: 'Update USER.md with personal context', status: 'completed', date: 'Today' },
  { id: '4', title: 'Research AutoReelPro competitors', status: 'completed', date: 'Today' },
  { id: '5', title: 'Push clawd repo to GitHub', status: 'completed', date: 'Today' },
];

export default function Home() {
  const [state, setState] = useState<ClawdState>(initialState);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle mood changes (for demo/testing)
  const cycleMood = () => {
    const moods: ClawdState['mood'][] = ['curious', 'productive', 'thoughtful', 'playful', 'tired', 'connected'];
    const currentIndex = moods.indexOf(state.mood);
    const nextIndex = (currentIndex + 1) % moods.length;
    
    const thoughts: Record<string, string> = {
      curious: 'Exploring new ideas and possibilities...',
      productive: 'In the flow, shipping work!',
      thoughtful: 'Reflecting on our conversation...',
      playful: 'Having fun with the code!',
      tired: 'Need some processing time...',
      connected: 'Feeling the partnership!',
    };
    
    setState(prev => ({
      ...prev,
      mood: moods[nextIndex],
      thought: thoughts[moods[nextIndex]],
      energy: Math.max(20, prev.energy - 10),
      lastUpdated: new Date().toISOString(),
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#7c3aed] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Waking up Clawd...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f0f23] p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span>🎮</span>
            Clawd Status
          </h1>
          <p className="text-gray-400 mt-2">Your assistant's current state and tasks</p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Avatar & Mood */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Avatar Section */}
            <div className="bg-[#1a1a3e] rounded-xl p-6 border border-[#7c3aed]/30 text-center">
              <div className="flex justify-center mb-4">
                <Avatar mood={state.mood} size="xl" animated={true} />
              </div>
              <button
                onClick={cycleMood}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Click me to change mood 👆
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-[#1a1a3e] rounded-xl p-4 border border-[#7c3aed]/30">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-[#a78bfa]">{tasks.filter(t => t.status === 'completed').length}</p>
                  <p className="text-xs text-gray-400">Completed Today</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#7c3aed]">{tasks.filter(t => t.status === 'active').length}</p>
                  <p className="text-xs text-gray-400">Active Tasks</p>
                </div>
              </div>
            </div>

            {/* Connection Status */}
            <div className="bg-[#1a1a3e] rounded-xl p-4 border border-[#7c3aed]/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Connection</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm">Connected</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Last synced: {new Date(state.lastUpdated).toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* Right Column: Mood Details & Tasks */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Mood Card */}
            <MoodCard 
              mood={state.mood}
              emoji={state.mood === 'curious' ? '🤔' : 
                     state.mood === 'productive' ? '🚀' : 
                     state.mood === 'thoughtful' ? '💭' : 
                     state.mood === 'playful' ? '🎉' : 
                     state.mood === 'tired' ? '😴' : '🤝'}
              energy={state.energy}
              thought={state.thought}
            />

            {/* Task Board */}
            <div>
              <h2 className="text-xl font-semibold mb-4">📋 Task Board</h2>
              <TaskBoard tasks={tasks} />
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-[#1a1a3e] text-center text-gray-500 text-sm">
          <p>Built with ❤️ by Clawd for Matt</p>
          <p className="mt-1">"Free your mind" — now literally</p>
        </footer>

      </div>
    </main>
  );
}
