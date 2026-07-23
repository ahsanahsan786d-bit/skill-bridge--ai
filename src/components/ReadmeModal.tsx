import React from 'react';
import { X, BookOpen, Sparkles, ShieldCheck, Mic, Camera, Calculator, Video, ArrowRight, Heart } from 'lucide-react';

interface ReadmeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReadmeModal: React.FC<ReadmeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-8 text-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-wide flex items-center gap-2">
                SkillBridge AI — Project README & Vision 🇵🇰
              </h3>
              <p className="text-xs text-emerald-400 font-medium">Empowering Pakistan's Skilled Workers & Digital Workforce</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Motivation Hero Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/30 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Vision & Mission statement
            </div>
            <h4 className="text-lg font-bold text-white">
              Building Pakistan's Most Trusted & Powerful AI Skilled Work Platform
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>SkillBridge AI</strong> connects over 100 million skilled technicians (Solar Inverter Experts, Electricians, AC Mechanics, Tailors, Software Freelancers) with clients in Lahore, Karachi, Islamabad, Rawalpindi, Peshawar, Faisalabad, and Multan.
            </p>
            <div className="p-3 bg-emerald-900/30 rounded-xl border border-emerald-700/30 text-xs text-emerald-200 font-medium">
              "ہمارا مقصد پاکستان کے ہر ہنر مند کو جدید ترین AI، محفوظ ادائیگی (Escrow) اور آواز سے جاب پوسٹنگ کی سہولت فراہم کرنا ہے۔"
            </div>
          </div>

          {/* Core Feature Breakdown */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Platform Features & Backend Services
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <Mic className="w-4 h-4" /> 1. Awaaz Boli (Voice AI)
                </div>
                <p className="text-slate-400">
                  Speak requirements in Roman Urdu or English. Gemini AI automatically extracts city, category, PKR budget & urgency.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-cyan-400">
                  <ShieldCheck className="w-4 h-4" /> 2. Pakistan Escrow Vault
                </div>
                <p className="text-slate-400">
                  0% fraud protection using JazzCash, EasyPaisa, SadaPay or Bank accounts. Funds stay locked until client approves completed work.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-indigo-400">
                  <Camera className="w-4 h-4" /> 3. AI Work Quality Inspector
                </div>
                <p className="text-slate-400">
                  Multimodal Gemini vision analyzes work completion proof photos (solar wiring, AC piping, tailoring) for quality & safety scoring.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <ShieldCheck className="w-4 h-4" /> 4. AI Anti-Scam Threat Scan
                </div>
                <p className="text-slate-400">
                  Scans chat messages for off-platform advance demands or phishing, warning users in real-time with risk scores.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-purple-400">
                  <Video className="w-4 h-4" /> 5. AI Live Oral Interview
                </div>
                <p className="text-slate-400">
                  Workers take oral technical quizzes in Roman Urdu/English to earn "AI Verified Master Specialist" badges.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-teal-400">
                  <Calculator className="w-4 h-4" /> 6. Pak-Rate 2026 Price Engine
                </div>
                <p className="text-slate-400">
                  City-specific price calculator giving fair market estimates for labor and component costs in PKR.
                </p>
              </div>
            </div>
          </div>

          {/* Backend Reliability Note */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-white flex items-center justify-between">
              <span>⚡ Strong Server Backend (Express + Gemini API)</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded">
                7 REST API Routes
              </span>
            </div>
            <p className="text-slate-400">
              All intelligence, voice processing, visual photo scanning, escrow deposits, anti-scam threat scoring, and pricing calculations run on a high-speed Express server backend for enterprise reliability.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Designed for Pakistan</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>2026</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            Explore Application <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
