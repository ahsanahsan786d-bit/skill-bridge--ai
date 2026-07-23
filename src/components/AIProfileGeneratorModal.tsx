import React, { useState } from 'react';
import { Worker, Category, City } from '../types';
import { X, Sparkles, Loader2, CheckCircle2, UserCheck } from 'lucide-react';

interface AIProfileGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileCreated: (profile: Partial<Worker>) => void;
}

const CATEGORIES: Category[] = [
  'Solar Technician',
  'AC & Refrigeration',
  'Electrician',
  'Plumber',
  'Tailor & Fashion',
  'Freelance Web Dev',
  'Graphic Designer',
  'Auto Mechanic',
  'Video Editor',
  'Carpenter',
  'Painter & Decorator',
  'Tutor & Educator',
];

const CITIES: City[] = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
  'Faisalabad',
  'Multan',
  'Quetta',
  'Sialkot',
  'Gujranwala',
];

export const AIProfileGeneratorModal: React.FC<AIProfileGeneratorModalProps> = ({
  isOpen,
  onClose,
  onProfileCreated,
}) => {
  const [name, setName] = useState('Ustad Muhammad Bilal');
  const [profession, setProfession] = useState<Category>('AC & Refrigeration');
  const [city, setCity] = useState<City>('Karachi');
  const [area, setArea] = useState('Gulshan-e-Iqbal');
  const [experience, setExperience] = useState(6);
  const [rawSkills, setRawSkills] = useState(
    'Inverter AC gas refilling R32, jet chemical washing, PCB board repairing, 3-phase DB box wiring, compressor testing'
  );

  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<any>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!rawSkills.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          profession,
          city,
          experience,
          rawSkills,
          workType: 'Both Hourly & Fixed',
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setGeneratedData(json.data);
      }
    } catch (err) {
      console.error('Error generating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToProfile = () => {
    if (!generatedData) return;

    const newWorkerPartial: Partial<Worker> = {
      name,
      tagline: generatedData.tagline || `Certified ${profession} Specialist`,
      category: profession,
      city,
      area,
      experienceYears: Number(experience),
      hourlyRatePKR: generatedData.suggestedHourlyRatePKR || 1200,
      fixedRatePKR: generatedData.suggestedFixedRatePKR || 5000,
      bio: generatedData.bio || '',
      skills: generatedData.skills || [],
      aiBadge: generatedData.aiBadge || 'Top AI Recommended',
    };

    onProfileCreated(newWorkerPartial);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative text-slate-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              🤖 AI Profile Generator for Workers
            </h2>
            <p className="text-xs text-slate-400">
              Transform basic skills & experience into a high-converting profile & fair PKR pricing.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Your Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Profession / Trade</label>
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value as Category)}
                className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">City in Pakistan</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as City)}
                className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Area / Town</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Years of Experience</label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Describe your skills / tools / background (Urdu / Roman Urdu / English)
            </label>
            <textarea
              value={rawSkills}
              onChange={(e) => setRawSkills(e.target.value)}
              rows={3}
              className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:opacity-95 shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gemini AI Crafting Profile & PKR Rates...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Professional Profile with AI</span>
              </>
            )}
          </button>
        </div>

        {/* AI Output Display */}
        {generatedData && (
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> AI Generated Profile Preview
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                {generatedData.aiBadge}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase text-slate-500 font-bold">Tagline</span>
              <p className="text-xs font-semibold text-white">{generatedData.tagline}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase text-slate-500 font-bold">Professional Bio</span>
              <p className="text-xs text-slate-300 leading-relaxed">{generatedData.bio}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Suggested Hourly Rate</span>
                <span className="text-sm font-bold text-emerald-400">PKR {generatedData.suggestedHourlyRatePKR}/hr</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Suggested Fixed Job Rate</span>
                <span className="text-sm font-bold text-cyan-400">PKR {generatedData.suggestedFixedRatePKR}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Generated Skill Badges</span>
              <div className="flex flex-wrap gap-1.5">
                {(generatedData.skills || []).map((s: string) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-200 border border-slate-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleApplyToProfile}
              className="w-full mt-2 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Apply AI Profile to Account</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
