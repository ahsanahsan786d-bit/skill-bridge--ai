import React, { useState } from 'react';
import { Job, Category, City } from '../types';
import { X, Sparkles, Loader2, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AIPostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (job: Job) => void;
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

export const AIPostJobModal: React.FC<AIPostJobModalProps> = ({
  isOpen,
  onClose,
  onAddJob,
}) => {
  const [roughText, setRoughText] = useState('');
  const [category, setCategory] = useState<Category>('Solar Technician');
  const [city, setCity] = useState<City>('Lahore');
  const [area, setArea] = useState('DHA Phase 5');
  const [loading, setLoading] = useState(false);
  const [aiGenerated, setAiGenerated] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budgetPKR, setBudgetPKR] = useState(15000);
  const [urgency, setUrgency] = useState<'Immediate' | 'Within 3 Days' | 'Flexible'>('Immediate');
  const [requiredSkillsStr, setRequiredSkillsStr] = useState('Solar Inverter, Wiring, Testing');

  if (!isOpen) return null;

  const handleAiEnhance = async () => {
    if (!roughText.trim()) {
      alert('Please enter your rough job requirement first (e.g., in English or Roman Urdu).');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/ai/write-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roughText,
          category,
          city,
          area,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setTitle(json.data.title || '');
        setDescription(json.data.description || '');
        setBudgetPKR(json.data.suggestedBudgetPKR || 15000);
        setRequiredSkillsStr((json.data.requiredSkills || []).join(', '));
        if (json.data.urgency) setUrgency(json.data.urgency);
        setAiGenerated(true);
      }
    } catch (err) {
      console.error('Error enhancing job description:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newJob: Job = {
      id: `j-${Date.now()}`,
      title,
      category,
      clientName: 'Sana Tariq (Verified Client)',
      clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      city,
      area,
      budgetPKR: Number(budgetPKR),
      urgency,
      postedTime: 'Just now',
      description,
      requiredSkills: requiredSkillsStr.split(',').map((s) => s.trim()).filter(Boolean),
      proposalsCount: 0,
      status: 'Open',
      aiEnhanced: aiGenerated,
    };

    onAddJob(newJob);
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

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              🤖 AI Job Description Writer
            </h2>
            <p className="text-xs text-slate-400">
              Type rough notes in Roman Urdu or English. Gemini will format a professional job posting.
            </p>
          </div>
        </div>

        {/* Step 1: Rough Input Bar */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              1. Enter Rough Job Idea (Urdu / Roman Urdu / English)
            </label>
            <span className="text-[10px] text-slate-400">e.g. "Lahore main 2 Inverter AC jet wash..."</span>
          </div>

          <textarea
            value={roughText}
            onChange={(e) => setRoughText(e.target.value)}
            placeholder="e.g. Mujhe DHA Lahore Phase 5 main 10KW solar inverter tripping issue resolve karwana ha emergency mein. Inverter Growatt ha..."
            rows={3}
            className="w-full p-3 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full p-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as City)}
                className="w-full p-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Area / Town</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Gulberg, Clifton"
                className="w-full p-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAiEnhance}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold text-xs hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI Generating Professional Job Post...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Enhance Job Post with Gemini AI</span>
              </>
            )}
          </button>
        </div>

        {/* Step 2: Form Review */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">
              2. Review & Post Job to Pakistan Market
            </span>
            {aiGenerated && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> AI Enhanced
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Emergency 15KW Solar Inverter Tripping Repair"
              required
              className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Detailed Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              placeholder="Detailed job description..."
              className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Budget in PKR (Pakistani Rupees)</label>
              <input
                type="number"
                value={budgetPKR}
                onChange={(e) => setBudgetPKR(Number(e.target.value))}
                required
                className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Urgency</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              >
                <option value="Immediate">Immediate (Within hours)</option>
                <option value="Within 3 Days">Within 3 Days</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Required Skills (Comma separated)</label>
            <input
              type="text"
              value={requiredSkillsStr}
              onChange={(e) => setRequiredSkillsStr(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Post Job & Trigger AI Worker Matching</span>
          </button>
        </form>

      </div>
    </div>
  );
};
