import React from 'react';
import { UserRole } from '../types';
import { X, ShieldCheck, UserCheck, Briefcase, Zap, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  role,
  setRole,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 mb-3 flex items-center justify-center">
            <Zap className="w-6 h-6 text-slate-950 fill-slate-950" />
          </div>
          <h2 className="text-xl font-bold text-white">SkillBridge AI Sandbox Access</h2>
          <p className="text-xs text-slate-400 mt-1">
            Select a sample persona to test features from different perspectives across Pakistan.
          </p>
        </div>

        {/* Persona Options */}
        <div className="space-y-3">
          
          {/* Client Persona */}
          <div
            onClick={() => {
              setRole('client');
              onClose();
            }}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              role === 'client'
                ? 'bg-emerald-500/10 border-emerald-500 text-white'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Client Persona (Homeowner / Business)</h4>
                <p className="text-xs text-slate-400">Post jobs, use AI Job Description Writer & hire workers in PKR.</p>
              </div>
            </div>
            {role === 'client' && <Check className="w-5 h-5 text-emerald-400" />}
          </div>

          {/* Worker Persona */}
          <div
            onClick={() => {
              setRole('worker');
              onClose();
            }}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              role === 'worker'
                ? 'bg-cyan-500/10 border-cyan-500 text-white'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Skilled Worker Persona</h4>
                <p className="text-xs text-slate-400">Use AI Profile Generator, AI Resume Builder & apply to jobs.</p>
              </div>
            </div>
            {role === 'worker' && <Check className="w-5 h-5 text-cyan-400" />}
          </div>

          {/* Startup Admin Persona */}
          <div
            onClick={() => {
              setRole('admin');
              onClose();
            }}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              role === 'admin'
                ? 'bg-amber-500/10 border-amber-500 text-white'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Startup Founder / Admin View</h4>
                <p className="text-xs text-slate-400">Inspect platform metrics, PKR volume, city distribution & AI accuracy.</p>
              </div>
            </div>
            {role === 'admin' && <Check className="w-5 h-5 text-amber-400" />}
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all"
          >
            Continue with Selected View
          </button>
        </div>

      </div>
    </div>
  );
};
