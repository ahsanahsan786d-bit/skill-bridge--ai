import React from 'react';
import { UserRole, Worker, Job } from '../types';
import { 
  Sparkles, 
  Bot, 
  FileText, 
  Zap, 
  Users, 
  Briefcase, 
  Award, 
  MapPin, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  PlusCircle, 
  Clock,
  Mic,
  Lock,
  Camera,
  Calculator,
  Video,
  BookOpen
} from 'lucide-react';

interface HomeDashboardProps {
  role: UserRole;
  workers: Worker[];
  jobs: Job[];
  onOpenAiProfileModal: () => void;
  onOpenPostJobModal: () => void;
  onOpenVoiceJobModal?: () => void;
  onOpenEscrowModal?: () => void;
  onOpenWorkInspectionModal?: () => void;
  onOpenLiveInterviewModal?: () => void;
  onOpenPriceCalculatorModal?: () => void;
  onOpenReadmeModal?: () => void;
  onOpenAiResume: (worker: Worker) => void;
  onSelectWorker: (worker: Worker) => void;
  onNavigateTab: (tab: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  role,
  workers,
  jobs,
  onOpenAiProfileModal,
  onOpenPostJobModal,
  onOpenVoiceJobModal,
  onOpenEscrowModal,
  onOpenWorkInspectionModal,
  onOpenLiveInterviewModal,
  onOpenPriceCalculatorModal,
  onOpenReadmeModal,
  onOpenAiResume,
  onSelectWorker,
  onNavigateTab,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-slate-100">
      
      {/* Role Context Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200">
            <span>Current Role:</span>
            <span className="text-emerald-400 capitalize font-bold">{role} Mode</span>
            <span className="text-[10px] text-slate-400">| Pakistan Network Active</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            Welcome to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">SkillBridge AI</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {role === 'worker'
              ? 'Empowering electricians, solar technicians, plumbers, tailors, and freelancers across Pakistan with AI Profile Generation, AI Skill Resumes, and instant client matching.'
              : role === 'client'
              ? 'Instantly post requirements in Roman Urdu or English. Gemini AI formats your job post and ranks the highest-rated local workers in your city.'
              : 'Startup Founder Overview: Track platform volume, PKR transactions, city coverage, and AI match accuracy.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {role === 'client' && (
              <button
                onClick={onOpenPostJobModal}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:shadow-lg transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>AI Write & Post Job</span>
              </button>
            )}

            {role === 'worker' && (
              <button
                onClick={onOpenAiProfileModal}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate AI Profile</span>
              </button>
            )}

            <button
              onClick={() => onNavigateTab('aimatch')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Launch AI Skill Matcher</span>
            </button>

            {onOpenReadmeModal && (
              <button
                onClick={onOpenReadmeModal}
                className="px-5 py-2.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 font-bold text-xs border border-emerald-500/40 transition-all flex items-center gap-2 shadow-md"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Project Motivation & README</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* AI Quick Tools Hub */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            AI Features Powered by Gemini
          </h2>
          <span className="text-xs text-slate-400">Integrated Core Platform Tools</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Tool 1: Voice AI Boli */}
          <div
            onClick={onOpenVoiceJobModal}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all space-y-3 group shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Awaaz Boli Job Post
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full">New</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Speak requirement in Roman Urdu/English; AI auto-creates job post.
              </p>
            </div>
          </div>

          {/* Tool 2: Escrow Vault */}
          <div
            onClick={onOpenEscrowModal}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all space-y-3 group shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                  Pakistan Escrow Vault
                </h3>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-semibold px-2 py-0.5 rounded-full">JazzCash</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Lock funds safely in JazzCash, EasyPaisa or Bank; zero fraud guarantee.
              </p>
            </div>
          </div>

          {/* Tool 3: Work Inspector */}
          <div
            onClick={onOpenWorkInspectionModal}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all space-y-3 group shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                  AI Work Quality Inspector
                </h3>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-semibold px-2 py-0.5 rounded-full">Gemini Vision</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Upload work completion photo; AI verifies quality score & safety.
              </p>
            </div>
          </div>

          {/* Tool 4: Pak-Rate Price Benchmark */}
          <div
            onClick={onOpenPriceCalculatorModal}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all space-y-3 group shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  Pak-Rate Price Calculator
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full">2026 Rates</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Calculate standard fair labor & material rates across Pakistan cities.
              </p>
            </div>
          </div>

          {/* Tool 5: Live AI Interview Room */}
          <div
            onClick={onOpenLiveInterviewModal}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition-all space-y-3 group shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                  AI Oral Interview Room
                </h3>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 font-semibold px-2 py-0.5 rounded-full">Badge Cert</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Oral quiz simulator for workers to earn AI Verified Master Badges.
              </p>
            </div>
          </div>

          {/* Tool 6 */}
          <div
            onClick={onOpenAiProfileModal}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all space-y-3 group shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                AI Profile Generator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Converts rough worker notes into professional bio, badges & fair PKR rates.
              </p>
            </div>
          </div>

          {/* Tool 5 */}
          <div
            onClick={onOpenPostJobModal}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all space-y-3 group shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                AI Job Writer
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Type rough requirements in Roman Urdu or English; Gemini formats job scope.
              </p>
            </div>
          </div>

          {/* Tool 6 */}
          <div
            onClick={() => onNavigateTab('aimatch')}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 cursor-pointer transition-all space-y-3 group shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">
                AI Skill Matcher
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Ranks candidate workers based on skill fit, location proximity & budget.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Recommended Workers Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            Top Recommended Workers Near You
          </h2>
          <button
            onClick={() => onNavigateTab('workers')}
            className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All Workers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workers.slice(0, 3).map((worker) => (
            <div
              key={worker.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src={worker.avatar}
                    alt={worker.name}
                    className="w-12 h-12 rounded-xl object-cover border border-cyan-500/30"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1">
                      {worker.name}
                      {worker.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                    </h3>
                    <p className="text-xs text-slate-400">{worker.category}</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{worker.city}, {worker.area}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-medium line-clamp-2 italic">
                  "{worker.tagline}"
                </p>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 text-xs">
                  <span className="font-bold text-emerald-400">PKR {worker.hourlyRatePKR}/hr</span>
                  <span className="text-slate-300 flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {worker.rating}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onSelectWorker(worker)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs transition-all text-center"
              >
                View Full Profile
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Open Jobs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            Active Job Opportunities in Pakistan
          </h2>
          <button
            onClick={() => onNavigateTab('jobs')}
            className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Browse All Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.slice(0, 4).map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{job.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-400" /> {job.city}, {job.area}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-400"><Clock className="w-3 h-3" /> {job.urgency}</span>
                  </div>
                </div>

                <span className="text-sm font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20 whitespace-nowrap">
                  PKR {job.budgetPKR.toLocaleString()}
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {job.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400 text-[11px]">{job.proposalsCount} proposals submitted</span>
                <button
                  onClick={() => onNavigateTab('aimatch')}
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>AI Match Candidate Workers</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
