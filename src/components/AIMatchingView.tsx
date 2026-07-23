import React, { useState } from 'react';
import { Job, Worker, AIMatchScore } from '../types';
import { 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  MapPin, 
  Award, 
  Zap, 
  DollarSign, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';

interface AIMatchingViewProps {
  jobs: Job[];
  workers: Worker[];
  onSelectWorker: (worker: Worker) => void;
}

export const AIMatchingView: React.FC<AIMatchingViewProps> = ({
  jobs,
  workers,
  onSelectWorker,
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<AIMatchScore[]>([]);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const handleRunMatch = async () => {
    setLoading(true);
    try {
      const targetJob = customPrompt.trim()
        ? {
            title: 'Custom Client Requirement',
            category: 'Solar Technician',
            city: 'Lahore',
            area: 'Gulberg',
            budgetPKR: 20000,
            description: customPrompt,
            requiredSkills: ['Troubleshooting', 'Wiring', 'Setup'],
          }
        : selectedJob;

      const res = await fetch('/api/ai/match-workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job: targetJob,
          workers,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setMatches(json.data);
      }
    } catch (err) {
      console.error('Error running AI match:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Automated Skill Matching Engine</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Smart Matching for Pakistani Workers & Jobs
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Gemini AI evaluates candidate technical skills, city proximity, client budget, and past Pakistani reviews to calculate real-time compatibility scores.
          </p>
        </div>
      </div>

      {/* Input Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Job Selector */}
        <div className="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            Select Job or Type Client Need
          </h3>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Select Posted Job</label>
            <select
              value={selectedJobId}
              onChange={(e) => {
                setSelectedJobId(e.target.value);
                setCustomPrompt('');
              }}
              className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.city} - PKR {job.budgetPKR.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-slate-800" />
            <span className="flex-shrink mx-3 text-[10px] uppercase text-slate-500 font-bold">OR</span>
            <div className="flex-grow border-t border-slate-800" />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Type Natural Language Client Need</label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Need an expert in Karachi PECHS for 2 Ton Gree inverter AC PCB repair and R32 gas refill under 8000 PKR..."
              rows={3}
              className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {selectedJob && !customPrompt && (
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Selected Job Details</span>
              <p className="font-semibold text-white">{selectedJob.title}</p>
              <p className="text-slate-400 text-[11px] line-clamp-2">{selectedJob.description}</p>
              <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-semibold pt-1">
                <span>{selectedJob.city}, {selectedJob.area}</span>
                <span>•</span>
                <span>PKR {selectedJob.budgetPKR.toLocaleString()}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleRunMatch}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold text-xs hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gemini Analyzing Candidate Profiles...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run AI Skill Matcher</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Matched Candidate Stream */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              AI Evaluated Workers ({matches.length > 0 ? matches.length : workers.length})
            </h3>
            <span className="text-xs text-slate-400">
              Sorted by AI Match Precision
            </span>
          </div>

          {matches.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-sm font-bold text-white">Click "Run AI Skill Matcher"</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Gemini will scan all Pakistani workers in Lahore, Karachi, Islamabad, Peshawar and rank the top recommendations with detailed match rationales.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {matches.map((matchScore) => {
                const worker = workers.find((w) => w.id === matchScore.workerId);
                if (!worker) return null;

                return (
                  <div
                    key={worker.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-3 shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={worker.avatar}
                          alt={worker.name}
                          className="w-12 h-12 rounded-xl object-cover border border-emerald-500/30"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{worker.name}</h4>
                            {worker.verified && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400">{worker.tagline}</p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                              <Star className="w-3 h-3 fill-amber-400" /> {worker.rating}
                            </span>
                            <span>({worker.reviewCount} reviews)</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5 text-slate-300">
                              <MapPin className="w-3 h-3 text-cyan-400" /> {worker.city}, {worker.area}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Match Percentage Badge */}
                      <div className="text-right">
                        <div className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-extrabold inline-flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                          <span>{matchScore.matchPercentage}% Match</span>
                        </div>
                        <span className="block text-[10px] text-slate-400 mt-1">
                          PKR {worker.hourlyRatePKR}/hr
                        </span>
                      </div>
                    </div>

                    {/* AI Rationale */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                        🤖 AI Match Rationale
                      </span>
                      <p className="text-slate-300 leading-relaxed">{matchScore.rationale}</p>
                    </div>

                    {/* Key Strengths */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800">
                      <div className="flex flex-wrap gap-1.5">
                        {matchScore.keyStrengths.map((str) => (
                          <span
                            key={str}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-200"
                          >
                            ✓ {str}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => onSelectWorker(worker)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-semibold transition-all flex items-center gap-1"
                      >
                        <span>View Worker Profile</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
