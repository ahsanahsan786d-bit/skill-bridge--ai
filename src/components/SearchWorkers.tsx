import React, { useState } from 'react';
import { Worker, Category, City } from '../types';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Award, 
  SlidersHorizontal,
  Briefcase,
  FileText
} from 'lucide-react';

interface SearchWorkersProps {
  workers: Worker[];
  onSelectWorker: (worker: Worker) => void;
  onOpenAiResume: (worker: Worker) => void;
  onOpenAiProfileModal: () => void;
}

const CATEGORIES: string[] = [
  'All',
  'Solar Technician',
  'AC & Refrigeration',
  'Electrician',
  'Plumber',
  'Tailor & Fashion',
  'Freelance Web Dev',
  'Graphic Designer',
  'Auto Mechanic',
];

const CITIES: string[] = [
  'All',
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
  'Faisalabad',
];

export const SearchWorkers: React.FC<SearchWorkersProps> = ({
  workers,
  onSelectWorker,
  onOpenAiResume,
  onOpenAiProfileModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [minRating, setMinRating] = useState(0);

  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      worker.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || worker.category === selectedCategory;

    const matchesCity = selectedCity === 'All' || worker.city === selectedCity;

    const matchesRating = worker.rating >= minRating;

    return matchesSearch && matchesCategory && matchesCity && matchesRating;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            Find Skilled Workers in Pakistan
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse verified solar technicians, electricians, plumbers, tailors, and freelancers across Lahore, Karachi, Islamabad, & more.
          </p>
        </div>

        <button
          onClick={onOpenAiProfileModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate AI Worker Profile</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by worker name, skill (e.g. Inverter, Solar, 3-Phase), or area..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">City in Pakistan</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Minimum Rating</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
            >
              <option value={0}>All Ratings</option>
              <option value={4.5}>4.5★ & above</option>
              <option value={4.8}>4.8★ & above</option>
            </select>
          </div>

        </div>

      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-5 space-y-4 transition-all shadow-xl hover:shadow-cyan-500/5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              
              {/* Header Info */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={worker.avatar}
                    alt={worker.name}
                    className="w-12 h-12 rounded-xl object-cover border border-cyan-500/30 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {worker.name}
                      {worker.verified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      )}
                    </h3>
                    <p className="text-xs text-slate-400">{worker.category}</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{worker.city}, {worker.area}</span>
                    </div>
                  </div>
                </div>

                {/* AI Badge */}
                {worker.aiBadge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20 whitespace-nowrap">
                    {worker.aiBadge}
                  </span>
                )}
              </div>

              {/* Tagline */}
              <p className="text-xs text-slate-300 font-medium line-clamp-2">
                "{worker.tagline}"
              </p>

              {/* Rate & Rating Row */}
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Rate (PKR)</span>
                  <span className="font-extrabold text-emerald-400">
                    PKR {worker.hourlyRatePKR.toLocaleString()}/hr
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Rating & Jobs</span>
                  <span className="font-bold text-slate-200 flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {worker.rating} ({worker.completedJobs} jobs)
                  </span>
                </div>
              </div>

              {/* Skills Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {worker.skills.slice(0, 4).map((sk) => (
                  <span
                    key={sk}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                  >
                    {sk}
                  </span>
                ))}
              </div>

            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => onOpenAiResume(worker)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-all"
                title="Generate AI Skill CV"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI CV</span>
              </button>

              <button
                onClick={() => onSelectWorker(worker)}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs hover:opacity-95 shadow-md transition-all text-center"
              >
                View Profile & Hire
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
