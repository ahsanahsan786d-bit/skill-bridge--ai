import React, { useState } from 'react';
import { X, Video, Mic, Sparkles, CheckCircle2, Loader2, Award, ShieldCheck, Play, ArrowRight, UserCheck } from 'lucide-react';

interface LiveInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerName?: string;
  category?: string;
}

export const LiveInterviewModal: React.FC<LiveInterviewModalProps> = ({
  isOpen,
  onClose,
  workerName = "Muhammad Rashid",
  category = "Solar Technician & Electrician",
}) => {
  const [step, setStep] = useState<'intro' | 'interview' | 'evaluating' | 'result'>('intro');
  const [answer1, setAnswer1] = useState("Pehle main digital multimeter se voltage aur grounding test karta hoon, phir main breaker off karke rewiring shuru karta hoon.");
  const [answer2, setAnswer2] = useState("Main customer ko bill receipt aur 6 months ki replacement warranty deta hoon taake trust bano rahe.");
  const [result, setResult] = useState<{
    interviewScore: number;
    certifiedBadge: string;
    strengths: string[];
    improvementTips: string;
    romanUrduFeedback: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleStartInterview = () => {
    setStep('interview');
  };

  const handleEvaluate = async () => {
    setStep('evaluating');
    try {
      const res = await fetch('/api/ai/live-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workerName,
          category,
          answer1,
          answer2,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
        setStep('result');
      }
    } catch (err) {
      console.error('Interview error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                AI Live Oral Interview Room
                <span className="text-[10px] bg-purple-500/20 text-purple-300 font-semibold px-2 py-0.5 rounded-full border border-purple-500/30">
                  Instant Certification
                </span>
              </h3>
              <p className="text-xs text-slate-400">Oral technical assessment in Roman Urdu or English</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {step === 'intro' && (
            <div className="text-center space-y-5 py-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-xl shadow-purple-500/20">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-purple-400">
                  <UserCheck className="w-10 h-10" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">Earn "AI Verified Master Badge"</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  Answer 2 quick technical & customer handling questions. Gemini AI will evaluate technical precision and award a verified badge on your profile.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1.5 max-w-md mx-auto">
                <div className="font-semibold text-slate-300">Candidate Info:</div>
                <div className="text-slate-400">Name: <span className="text-white font-medium">{workerName}</span></div>
                <div className="text-slate-400">Field: <span className="text-purple-400 font-medium">{category}</span></div>
              </div>

              <button
                onClick={handleStartInterview}
                className="px-8 py-3 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition flex items-center gap-2 mx-auto shadow-lg shadow-purple-500/20"
              >
                <Play className="w-4 h-4" /> Start Live AI Interview
              </button>
            </div>
          )}

          {step === 'interview' && (
            <div className="space-y-4">
              {/* Simulated Camera Feed View */}
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-slate-950 h-44 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                  alt="Candidate feed"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-slate-950/80 px-2.5 py-1 rounded-full text-[10px] text-emerald-400 border border-emerald-500/30 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Live Gemini AI Camera Feed
                </div>
                <div className="absolute bottom-3 right-3 bg-purple-950/90 text-purple-200 px-2.5 py-1 rounded-md text-[10px] font-mono border border-purple-800">
                  Topic: {category}
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-200 block mb-1">
                    Q1. How do you ensure safety & diagnose high voltage/technical faults?
                  </label>
                  <textarea
                    rows={2}
                    value={answer1}
                    onChange={(e) => setAnswer1(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-200 block mb-1">
                    Q2. How do you handle customer budget questions & warranty assurance?
                  </label>
                  <textarea
                    rows={2}
                    value={answer2}
                    onChange={(e) => setAnswer2(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <button
                onClick={handleEvaluate}
                className="w-full py-3 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
              >
                Submit & Analyze Interview with AI <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 'evaluating' && (
            <div className="py-12 text-center bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <Loader2 className="w-10 h-10 text-purple-400 animate-spin mx-auto" />
              <p className="text-sm font-bold text-purple-300">Gemini AI Evaluating Technical & Oral Communication...</p>
              <p className="text-xs text-slate-400">Scoring technical accuracy, safety compliance, and Roman Urdu clarity</p>
            </div>
          )}

          {step === 'result' && result && (
            <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/40 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{result.certifiedBadge}</h4>
                    <p className="text-[10px] text-slate-400">Oral Assessment Passed</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-purple-400">{result.interviewScore}%</span>
                  <span className="text-[10px] text-slate-400 block">AI Score</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-300 block mb-1">Key Strengths Demonstrated:</span>
                <ul className="space-y-1">
                  {result.strengths.map((s, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-purple-950/30 border border-purple-800/40 rounded-xl text-xs text-purple-200">
                <span className="font-bold text-purple-400 block mb-0.5">Urdu Feedback:</span>
                {result.romanUrduFeedback}
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition shadow-lg shadow-purple-500/20"
              >
                Apply Badge to Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
