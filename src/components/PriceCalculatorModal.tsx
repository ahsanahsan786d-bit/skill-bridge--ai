import React, { useState } from 'react';
import { X, Calculator, Sparkles, TrendingUp, CheckCircle2, Loader2, MapPin, Tag, HelpCircle } from 'lucide-react';
import { Category, City } from '../types';

interface PriceCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceCalculatorModal: React.FC<PriceCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [category, setCategory] = useState<Category>('Electrician');
  const [city, setCity] = useState<City>('Lahore');
  const [taskDescription, setTaskDescription] = useState('20KW Growatt solar inverter installation and DB box wiring');
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<{
    estimatedMinPKR: number;
    estimatedMaxPKR: number;
    recommendedFairPKR: number;
    marketPriceStatus: string;
    costBreakdown: { item: string; costPKR: number }[];
    priceAdviceUrdu: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleCalculateRate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/price-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          city,
          taskDescription,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setEstimate(data.data);
      }
    } catch (err) {
      console.error('Price calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Pak-Rate AI Price Benchmark
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                  2026 Market Rates 🇵🇰
                </span>
              </h3>
              <p className="text-xs text-slate-400">Check standard labor & component rates across Pakistan cities</p>
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
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Select Skill / Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Electrician">Electrician & Wiring</option>
                <option value="Solar Technician">Solar & Inverters</option>
                <option value="AC & Refrigeration">AC & HVAC Service</option>
                <option value="Plumber">Plumbing & Pipes</option>
                <option value="Tailor & Fashion">Tailoring & Stitching</option>
                <option value="Freelance Web Dev">Software & Web Development</option>
                <option value="Graphic Designer">Graphics & UI Design</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Select City in Pakistan:</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as City)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Multan">Multan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Task Description or Material Details:
            </label>
            <input
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="e.g. 2 Ton AC gas pressure refill + copper pipe brazing"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            onClick={handleCalculateRate}
            disabled={loading}
            className="w-full py-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                Calculating Market Benchmark in {city}...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Calculate Fair Market Rate
              </>
            )}
          </button>

          {estimate && (
            <div className="p-5 bg-slate-950 rounded-2xl border border-amber-500/40 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Recommended Fair Budget</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">
                    PKR {estimate.recommendedFairPKR.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-300 block">{estimate.marketPriceStatus}</span>
                  <span className="text-[10px] text-slate-400">Range: PKR {estimate.estimatedMinPKR.toLocaleString()} - {estimate.estimatedMaxPKR.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-300 block mb-2">Itemized Market Breakdown:</span>
                <div className="space-y-1.5">
                  {estimate.costBreakdown.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <span className="text-slate-300">{item.item}</span>
                      <span className="font-mono font-bold text-amber-400">PKR {item.costPKR.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {estimate.priceAdviceUrdu && (
                <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl text-xs text-amber-200">
                  <span className="font-bold text-amber-400 block mb-0.5">Urdu Advice:</span>
                  {estimate.priceAdviceUrdu}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
