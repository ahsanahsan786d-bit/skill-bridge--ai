import React, { useState } from 'react';
import { Sliders, CheckCircle2, ShieldCheck, Moon, Globe, Sparkles } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [defaultCity, setDefaultCity] = useState('Lahore');
  const [language, setLanguage] = useState('Roman Urdu & English');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Platform Settings & Configuration</h1>
            <p className="text-xs text-slate-400">Localization, AI response speed, & Pakistani region preferences</p>
          </div>
        </div>
      </div>

      {/* Settings Options */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        
        {/* Region */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Default City in Pakistan
          </label>
          <select
            value={defaultCity}
            onChange={(e) => setDefaultCity(e.target.value)}
            className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
          >
            <option value="Lahore">Lahore (Punjab)</option>
            <option value="Karachi">Karachi (Sindh)</option>
            <option value="Islamabad">Islamabad (Federal Capital)</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Peshawar">Peshawar (KPK)</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Multan">Multan</option>
          </select>
        </div>

        {/* Language Preference */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            AI Assistant & Translation Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
          >
            <option value="Roman Urdu & English">Roman Urdu & English (Recommended)</option>
            <option value="English Only">English Only</option>
            <option value="Urdu Script">Urdu Script (اردو)</option>
          </select>
        </div>

        {/* Dark Theme Notice */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-cyan-400" />
            <div>
              <h4 className="text-xs font-bold text-white">Visual Aesthetic: Dark Glassmorphic Theme</h4>
              <p className="text-[11px] text-slate-400">High-contrast dark mode optimized for eyes & mobile screens across Pakistan.</p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
            Active
          </span>
        </div>

        {/* Gemini API Status */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-950 border border-emerald-500/30 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Gemini 3.6 Flash Server Integration
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
              Server-Side Connected
            </span>
          </div>
          <p className="text-[11px] text-slate-300">
            All AI operations (Profile Generator, Job Description Writer, Skill Matching, Resume Builder, Chat Translator) execute via secure server-side routes in `server.ts`.
          </p>
        </div>

      </div>

    </div>
  );
};
