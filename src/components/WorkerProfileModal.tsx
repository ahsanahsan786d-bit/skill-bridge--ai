import React, { useState } from 'react';
import { Worker } from '../types';
import { 
  X, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  FileText, 
  Briefcase 
} from 'lucide-react';

interface WorkerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  worker: Worker | null;
  onOpenChatWithWorker: (worker: Worker) => void;
  onOpenAiResume: (worker: Worker) => void;
}

export const WorkerProfileModal: React.FC<WorkerProfileModalProps> = ({
  isOpen,
  onClose,
  worker,
  onOpenChatWithWorker,
  onOpenAiResume,
}) => {
  const [hiredStatus, setHiredStatus] = useState(false);

  if (!isOpen || !worker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative text-slate-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Worker Hero Cover */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <img
              src={worker.avatar}
              alt={worker.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-extrabold text-white">{worker.name}</h1>
                {worker.verified && (
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">{worker.tagline}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> {worker.city}, {worker.area}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> Response: {worker.responseTime}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-right shrink-0">
            <span className="text-[10px] text-slate-500 block">Rate in PKR</span>
            <span className="text-lg font-black text-emerald-400">PKR {worker.hourlyRatePKR.toLocaleString()}/hr</span>
            {worker.fixedRatePKR && (
              <span className="text-[11px] text-slate-400 block">Fixed: PKR {worker.fixedRatePKR.toLocaleString()}</span>
            )}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-3 py-4 border-b border-slate-800">
          <button
            onClick={() => {
              onOpenChatWithWorker(worker);
              onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs hover:opacity-95 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat & Negotiate (Urdu / English)</span>
          </button>

          <button
            onClick={() => {
              onOpenAiResume(worker);
              onClose();
            }}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Generate AI Skill CV</span>
          </button>

          <button
            onClick={() => setHiredStatus(!hiredStatus)}
            className={`px-4 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
              hiredStatus
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{hiredStatus ? 'Worker Hired ✓' : 'Direct Hire Worker'}</span>
          </button>
        </div>

        {/* Content Tabs */}
        <div className="space-y-6 pt-4">
          
          {/* Bio */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">About & Technical Background</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              {worker.bio}
            </p>
          </div>

          {/* Skills & Badges */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Verified Skill Badges</h3>
            <div className="flex flex-wrap gap-2">
              {worker.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-lg bg-slate-950 text-slate-200 text-xs font-semibold border border-slate-800 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          {worker.portfolio && worker.portfolio.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Past Project Showcase</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {worker.portfolio.map((item, idx) => (
                  <div key={idx} className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                    <img 
                      src={item.image || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80'} 
                      alt={item.title} 
                      className="w-full h-32 object-cover" 
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="p-3">
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pakistani Client Reviews */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Client Feedback in Pakistan (★ {worker.rating}/5.0)
            </h3>
            <div className="space-y-3">
              {worker.reviews.map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{rev.clientName}</span>
                    <span className="text-[10px] text-slate-500">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold">{rev.rating}.0</span>
                    <span className="text-slate-400 text-[11px]">({rev.jobTitle})</span>
                  </div>
                  <p className="text-xs text-slate-300 italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
