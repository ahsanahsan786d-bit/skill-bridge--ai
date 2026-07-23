import React from 'react';
import { UserRole } from '../types';
import { 
  Sparkles, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Bell, 
  Sliders, 
  ShieldCheck, 
  Bot, 
  PlusCircle, 
  User,
  Zap,
  Layers,
  FileText,
  BookOpen
} from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  unreadNotifications: number;
  unreadMessages: number;
  onOpenAiTools: () => void;
  onOpenAuth: () => void;
  onOpenPostJob: () => void;
  onOpenAiAssistant: () => void;
  onOpenReadme?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  setCurrentTab,
  role,
  setRole,
  unreadNotifications,
  unreadMessages,
  onOpenAiTools,
  onOpenAuth,
  onOpenPostJob,
  onOpenAiAssistant,
  onOpenReadme,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                    SkillBridge
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                  Turn Skills into Opportunities
                </p>
              </div>
            </button>

            {/* Role Switcher Pill */}
            <div className="hidden md:flex items-center ml-4 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setRole('client')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  role === 'client' 
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-semibold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Client View
              </button>
              <button
                onClick={() => setRole('worker')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  role === 'worker' 
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-semibold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Worker View
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  role === 'admin' 
                    ? 'bg-amber-500 text-slate-950 shadow-md font-semibold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Startup Admin
              </button>
            </div>
          </div>

          {/* Nav Items - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
            <button
              onClick={() => setCurrentTab('home')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all ${
                currentTab === 'home'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Home
            </button>

            <button
              onClick={() => setCurrentTab('workers')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all ${
                currentTab === 'workers'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-cyan-400" /> Find Workers
            </button>

            <button
              onClick={() => setCurrentTab('jobs')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all ${
                currentTab === 'jobs'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" /> Jobs
            </button>

            <button
              onClick={() => setCurrentTab('aimatch')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all ${
                currentTab === 'aimatch'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> AI Skill Match
            </button>

            <button
              onClick={() => setCurrentTab('messages')}
              className={`relative px-3 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all ${
                currentTab === 'messages'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-sky-400" /> Chat
              {unreadMessages > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            {role === 'admin' && (
              <button
                onClick={() => setCurrentTab('admin')}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all ${
                  currentTab === 'admin'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-amber-400 hover:bg-amber-500/10'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Startup Analytics
              </button>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* README & Vision Guide Button */}
            {onOpenReadme && (
              <button
                onClick={onOpenReadme}
                className="p-2 text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/80 rounded-xl border border-emerald-500/40 transition-all flex items-center gap-1.5 text-xs font-bold shadow-sm"
                title="Read Project Motivation & Vision (README)"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">README Guide</span>
              </button>
            )}

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiAssistant}
              className="p-2 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-xl border border-slate-800 transition-all flex items-center gap-1.5 text-xs font-medium"
              title="Open SkillBridge AI Voice/Text Assistant"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>

            {/* AI Hub Suite Trigger */}
            <button
              onClick={onOpenAiTools}
              className="p-2 text-emerald-300 hover:text-emerald-200 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl border border-emerald-500/30 transition-all flex items-center gap-1.5 text-xs font-medium"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline font-semibold">AI Tools</span>
            </button>

            {/* Post Job CTA */}
            {role === 'client' && (
              <button
                onClick={onOpenPostJob}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:opacity-95 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">AI Post Job</span>
              </button>
            )}

            {/* Notifications */}
            <button
              onClick={() => setCurrentTab('notifications')}
              className="relative p-2 text-slate-400 hover:text-slate-200 bg-slate-900/80 hover:bg-slate-800 rounded-xl border border-slate-800 transition-all"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Settings */}
            <button
              onClick={() => setCurrentTab('settings')}
              className="p-2 text-slate-400 hover:text-slate-200 bg-slate-900/80 hover:bg-slate-800 rounded-xl border border-slate-800 transition-all"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Login/Profile */}
            <button
              onClick={onOpenAuth}
              className="p-2 text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 text-xs font-medium"
            >
              <User className="w-4 h-4 text-slate-300" />
              <span className="hidden md:inline">Demo Users</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sub Nav Bar */}
      <div className="lg:hidden flex items-center justify-around bg-slate-900/90 py-2 px-3 border-t border-slate-800/80 text-xs text-slate-400">
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center gap-1 ${currentTab === 'home' ? 'text-emerald-400 font-bold' : ''}`}
        >
          <Layers className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => setCurrentTab('workers')}
          className={`flex flex-col items-center gap-1 ${currentTab === 'workers' ? 'text-cyan-400 font-bold' : ''}`}
        >
          <Users className="w-4 h-4" />
          <span>Workers</span>
        </button>
        <button
          onClick={() => setCurrentTab('jobs')}
          className={`flex flex-col items-center gap-1 ${currentTab === 'jobs' ? 'text-emerald-400 font-bold' : ''}`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Jobs</span>
        </button>
        <button
          onClick={() => setCurrentTab('aimatch')}
          className={`flex flex-col items-center gap-1 ${currentTab === 'aimatch' ? 'text-emerald-400 font-bold' : ''}`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Match</span>
        </button>
        <button
          onClick={() => setCurrentTab('messages')}
          className={`flex flex-col items-center gap-1 ${currentTab === 'messages' ? 'text-emerald-400 font-bold' : ''}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat</span>
        </button>
      </div>
    </header>
  );
};
