import React, { useState } from 'react';
import { Worker, AIResumeData } from '../types';
import { X, Sparkles, Loader2, Download, Printer, CheckCircle2, Award, Phone, MapPin, Briefcase } from 'lucide-react';

interface AIResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  worker: Worker | null;
}

export const AIResumeModal: React.FC<AIResumeModalProps> = ({
  isOpen,
  onClose,
  worker,
}) => {
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState<AIResumeData | null>(null);

  if (!isOpen || !worker) return null;

  const handleGenerateResume = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ worker }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setResumeData(json.data);
      }
    } catch (err) {
      console.error('Error generating AI resume:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

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

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                🤖 AI Resume Builder for Pakistan
              </h2>
              <p className="text-xs text-slate-400">
                Generate a professional printable Pakistani Skill CV for {worker.name}
              </p>
            </div>
          </div>

          {resumeData && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Printer className="w-3.5 h-3.5" /> Print / PDF
              </button>
            </div>
          )}
        </div>

        {/* Action Button if not generated yet */}
        {!resumeData && (
          <div className="p-8 text-center space-y-4 bg-slate-950/60 rounded-2xl border border-slate-800">
            <Sparkles className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-base font-bold text-white">Generate Official Skill CV</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Gemini will format a verified resume highlighting verified client reviews, Pakistani work history, certificated skills, and an AI recommendation stamp.
            </p>
            <button
              onClick={handleGenerateResume}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Gemini Formatting Skill Resume...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Build AI Resume Now</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Printable Resume Canvas */}
        {resumeData && (
          <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl print:shadow-none print:p-0">
            
            {/* CV Header */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b pb-6 border-slate-200">
              <div className="flex items-center gap-4">
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-500 shadow-md"
                />
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">{resumeData.fullName}</h1>
                  <p className="text-sm font-semibold text-emerald-600">{resumeData.title}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {resumeData.city}, Pakistan</span>
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-400" /> {resumeData.phone}</span>
                  </div>
                </div>
              </div>

              {/* Verified Badge Stamp */}
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-right space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                  🇵🇰 SkillBridge AI Verified
                </span>
                <span className="text-xs font-bold text-slate-800">Rating: ★ {worker.rating}/5.0</span>
                <span className="text-[10px] text-slate-500 block">{worker.completedJobs} Verified Jobs Done</span>
              </div>
            </div>

            {/* AI Summary */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Professional Profile
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {resumeData.summary}
              </p>
            </div>

            {/* Key Skills Grid */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Technical Expertise & Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.keySkills.map((sk) => (
                  <span
                    key={sk}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                  >
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Verified Work Experience in Pakistan
              </h3>
              {resumeData.experienceList.map((exp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{exp.role}</h4>
                    <span className="text-[10px] text-slate-500 font-semibold">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* AI Endorsement Note */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI System Recommendation
              </span>
              <p className="text-slate-700 italic text-[11px]">
                "{resumeData.aiRecommendationNote}"
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
