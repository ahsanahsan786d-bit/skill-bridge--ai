import React from 'react';
import { ADMIN_STATS } from '../data/mockData';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Sparkles, 
  MapPin, 
  PieChart, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight,
  Globe
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/20 shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Startup Founder & Investor Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            SkillBridge AI — Pakistan Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time metric tracking of blue-collar & digital freelancer onboarding, PKR transaction volume, and AI match efficiency.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 font-bold flex items-center gap-1.5">
            <Zap className="w-4 h-4 fill-amber-400" /> Startup Prototype Status: Active
          </span>
        </div>
      </div>

      {/* Hero Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Onboarded Workers</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-white">
            {ADMIN_STATS.totalWorkersOnboarded.toLocaleString()}
          </span>
          <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +28% growth this month
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Total Jobs Posted</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-white">
            {ADMIN_STATS.totalJobsPosted.toLocaleString()}
          </span>
          <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +34% job completion rate
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">PKR Volume Transacted</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-emerald-400">
            PKR {(ADMIN_STATS.pkrVolumeTransacted / 1000000).toFixed(1)}M
          </span>
          <p className="text-[10px] text-slate-400 font-medium">
            Zero cash loss & direct worker payouts
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">AI Skill Match Precision</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-amber-400">
            {ADMIN_STATS.aiMatchAccuracy}
          </span>
          <p className="text-[10px] text-slate-400 font-medium">
            Based on 12,000+ Gemini matches
          </p>
        </div>

      </div>

      {/* Grid: City Breakdown & Skill Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* City Breakdown */}
        <div className="lg:col-span-6 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Pakistani Cities Distribution
            </h3>
            <span className="text-[10px] text-slate-400">Active Nodes</span>
          </div>

          <div className="space-y-3">
            {ADMIN_STATS.cityBreakdown.map((item) => (
              <div key={item.city} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-200">{item.city}</span>
                  <span className="text-slate-400">{item.workers} Workers ({item.jobs} Jobs)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    style={{ width: `${(item.workers / 2000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Category Demand */}
        <div className="lg:col-span-6 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-400" />
              Trade & Skill Demand Trends
            </h3>
            <span className="text-[10px] text-emerald-400 font-bold">MoM Growth</span>
          </div>

          <div className="space-y-3">
            {ADMIN_STATS.categoryDemand.map((cat) => (
              <div key={cat.category} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{cat.category}</h4>
                  <span className="text-[10px] text-slate-400">{cat.percentage}% of overall platform requests</span>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  {cat.growth}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
