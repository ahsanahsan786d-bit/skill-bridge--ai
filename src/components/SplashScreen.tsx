import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Bot, 
  Zap, 
  FileText, 
  Search, 
  ArrowRight,
  MessageSquare,
  Award
} from 'lucide-react';

interface SplashScreenProps {
  onGetStarted: () => void;
  onExploreWorkers: () => void;
  onExploreJobs: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onGetStarted,
  onExploreWorkers,
  onExploreJobs,
}) => {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100 py-12 md:py-20 border-b border-slate-800/80">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Vision & Pitch */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-lg shadow-emerald-500/10"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Turn Skills into Opportunities</span>
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px]">
                Made for Pakistan 🇵🇰
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              Bridge the Gap Between <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Talented Workers & Clients
              </span>
            </motion.h1>

            {/* Problem & Solution Statement */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl"
            >
              In Pakistan, millions of skilled workers—electricians, solar mechanics, plumbers, tailors, freelancers—possess incredible craft but lack client reach. <strong className="text-white font-semibold">SkillBridge AI</strong> instantly matches clients with verified local experts, generates professional profiles, and translates communications seamlessly.
            </motion.p>

            {/* Core Feature Bullets */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2"
            >
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <Bot className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">AI Profile Generator</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">AI Job Description Writer</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">AI Skill Matching</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <Award className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">AI Resume Builder</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <MessageSquare className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Urdu AI Translator</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Verified PKR Rates</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={onExploreWorkers}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold text-sm hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Find Skilled Workers</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreJobs}
                className="px-6 py-3.5 rounded-xl bg-slate-900 text-slate-200 hover:text-white font-semibold text-sm border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-2"
              >
                <span>Browse Local Jobs</span>
              </button>
            </motion.div>

          </div>

          {/* Right Column: Glassmorphic AI Showcase Card */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-6 border border-slate-800 backdrop-blur-xl shadow-2xl shadow-emerald-500/5"
            >
              {/* Header inside Showcase Card */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-semibold text-slate-200">
                    Live AI Engine Demo
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full">
                  Gemini 3.6 Flash Active
                </span>
              </div>

              {/* Sample AI Recommendation Block */}
              <div className="space-y-4">
                
                {/* Client Input Prompt Simulation */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                    Client Prompt (Roman Urdu / English)
                  </span>
                  <p className="text-slate-300 italic">
                    "Lahore Gulberg mein 15KW solar inverter trip ho raha ha, emergency technician chahiye DB box balance karne ke liye..."
                  </p>
                </div>

                {/* AI Processing Animation */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 animate-bounce" />
                    <span className="font-medium text-emerald-300">
                      AI Calculating Match & Skill Rationales...
                    </span>
                  </div>
                  <span className="font-bold text-emerald-400">98% Match</span>
                </div>

                {/* Matched Result Card Preview */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80" 
                    alt="Ali Raza" 
                    className="w-12 h-12 rounded-xl object-cover border border-emerald-500/30"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white truncate">Muhammad Ali Raza</h4>
                      <span className="text-xs font-semibold text-emerald-400">PKR 1,500/hr</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">Solar & Electrical Expert • Lahore</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">
                        PEC Certified
                      </span>
                      <span className="text-[10px] text-slate-400">★ 4.9 (48 reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Live Stats Row */}
                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-800">
                  <div>
                    <span className="block text-base font-bold text-white">4,850+</span>
                    <span className="text-[10px] text-slate-400">Workers Onboarded</span>
                  </div>
                  <div>
                    <span className="block text-base font-bold text-emerald-400">PKR 84.5M</span>
                    <span className="text-[10px] text-slate-400">Transacted</span>
                  </div>
                  <div>
                    <span className="block text-base font-bold text-cyan-400">96.4%</span>
                    <span className="text-[10px] text-slate-400">AI Match Accuracy</span>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};
