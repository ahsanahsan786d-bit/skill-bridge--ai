import React, { useState, useEffect } from 'react';
import { Job, Category, City } from '../types';
import { X, Mic, MicOff, Sparkles, Loader2, CheckCircle2, Play, Pause, Volume2, Shield, ArrowRight } from 'lucide-react';

interface VoiceJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (job: Job) => void;
}

const SAMPLE_VOICE_SCRIPTS = [
  {
    label: "Solar Inverter Wiring (Lahore)",
    audioText: "Assalam o Alaikum, mujhe Gulberg Phase 3 Lahore main 20KW Growatt inverter ki DB box rewiring aur net metering testing karwani hai. Total budget PKR 18,000 hai aur kaam aaj hi chahiye.",
  },
  {
    label: "AC Master Service & Gas Refill (Karachi)",
    audioText: "Hi, PECHS Block 6 Karachi main 2 Ton inverter AC leak testing aur R410 gas pressure refill karwani ha. Honest AC technician chahiye, budget 10,000 PKR.",
  },
  {
    label: "React & Node.js E-Commerce Fix (Islamabad)",
    audioText: "AOA, Islamabad F-8 freelance project. Need React developer for payment gateway integration and bug fixes. Budget PKR 45,000, deadline 3 days.",
  },
];

export const VoiceJobModal: React.FC<VoiceJobModalProps> = ({
  isOpen,
  onClose,
  onJobCreated,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState<{
    title: string;
    category: string;
    city: string;
    area: string;
    budgetPKR: number;
    urgency: 'Immediate' | 'Within 3 Days' | 'Flexible';
    description: string;
    requiredSkills: string[];
    romanUrduSummary: string;
  } | null>(null);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  if (!isOpen) return null;

  const handleStartRecording = () => {
    setIsRecording(true);
    setTranscript('');
    setParsedData(null);
  };

  const handleStopRecording = async (customText?: string) => {
    setIsRecording(false);
    const textToAnalyze = customText || transcript || SAMPLE_VOICE_SCRIPTS[0].audioText;
    setTranscript(textToAnalyze);

    setLoading(true);
    try {
      const res = await fetch('/api/ai/voice-to-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcriptText: textToAnalyze }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setParsedData(data.data);
      }
    } catch (err) {
      console.error('Voice parsing error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = (script: typeof SAMPLE_VOICE_SCRIPTS[0]) => {
    handleStopRecording(script.audioText);
  };

  const handleConfirmPublish = () => {
    if (!parsedData) return;

    const newJob: Job = {
      id: `job-voice-${Date.now()}`,
      title: parsedData.title,
      category: (parsedData.category as Category) || 'Electrician',
      clientName: 'Ahsan Khan (Client)',
      clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      city: (parsedData.city as City) || 'Lahore',
      area: parsedData.area || 'Model Town',
      budgetPKR: Number(parsedData.budgetPKR) || 15000,
      urgency: parsedData.urgency || 'Immediate',
      postedTime: 'Just now',
      description: parsedData.description,
      requiredSkills: parsedData.requiredSkills || ['Skilled Repair', 'Inspection'],
      proposalsCount: 0,
      status: 'Open',
      aiEnhanced: true,
    };

    onJobCreated(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Awaaz Boli Job Post (Voice AI)
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Urdu & English
                </span>
              </h3>
              <p className="text-xs text-slate-400">Speak or record your requirement in Roman Urdu or English</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Microphone recording box */}
          <div className="bg-slate-950/70 rounded-2xl p-6 border border-slate-800 text-center relative overflow-hidden">
            <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> AI Speech-to-Job
            </div>

            {isRecording ? (
              <div className="py-4 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 animate-pulse">
                  <Mic className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-400">Recording Audio... {recordingTime}s</p>
                  <p className="text-xs text-slate-400 mt-1">Speak clearly about city, work detail, and budget in PKR</p>
                </div>
                <button
                  onClick={() => handleStopRecording()}
                  className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl text-xs transition shadow-lg shadow-red-500/20"
                >
                  Stop Recording & Parse AI
                </button>
              </div>
            ) : (
              <div className="py-2 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500 transition cursor-pointer"
                     onClick={handleStartRecording}>
                  <Mic className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Tap Microphone to Speak</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Or test with pre-recorded voice samples below</p>
                </div>
              </div>
            )}
          </div>

          {/* Sample Audio Presets */}
          {!isRecording && !loading && !parsedData && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                Quick Voice Sample Testing (Roman Urdu):
              </label>
              <div className="space-y-2">
                {SAMPLE_VOICE_SCRIPTS.map((script, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSample(script)}
                    className="w-full text-left p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 transition flex items-start gap-3 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500 group-hover:text-slate-950 transition">
                      <Play className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white flex items-center justify-between">
                        {script.label}
                        <span className="text-[10px] text-emerald-400 font-normal">Parse Voice →</span>
                      </h4>
                      <p className="text-[11px] text-slate-400 italic line-clamp-2 mt-0.5">"{script.audioText}"</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="p-8 text-center bg-slate-950/50 rounded-2xl border border-slate-800 space-y-3">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
              <p className="text-xs font-semibold text-emerald-300">Gemini AI Transcribing Audio & Extracting Scope...</p>
              <p className="text-[11px] text-slate-400">Extracting Budget (PKR), City, Category, and Urgency</p>
            </div>
          )}

          {/* Parsed Output Result */}
          {parsedData && !loading && (
            <div className="bg-slate-950 rounded-2xl p-5 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> AI Voice Parsing Complete
                </span>
                <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-mono">
                  PKR {parsedData.budgetPKR.toLocaleString()}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{parsedData.title}</h4>
                <p className="text-xs text-slate-300 mt-1">{parsedData.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Category & Location</span>
                  <span className="font-semibold text-white">{parsedData.category} • {parsedData.city}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Urgency</span>
                  <span className="font-semibold text-emerald-400">{parsedData.urgency}</span>
                </div>
              </div>

              {parsedData.romanUrduSummary && (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200">
                  <span className="font-bold text-emerald-400 block mb-0.5">Urdu Summary:</span>
                  {parsedData.romanUrduSummary}
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setParsedData(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Record Again
                </button>
                <button
                  onClick={handleConfirmPublish}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-2 transition shadow-lg shadow-emerald-500/20"
                >
                  Publish Voice Job <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
