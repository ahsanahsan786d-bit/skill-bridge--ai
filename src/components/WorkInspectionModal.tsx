import React, { useState } from 'react';
import { X, Sparkles, Upload, CheckCircle2, AlertTriangle, ShieldCheck, Camera, Loader2, Award } from 'lucide-react';

interface WorkInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
  workerName?: string;
}

const PRESET_SAMPLE_WORK_PHOTOS = [
  {
    title: "Solar DB Panel Rewiring",
    url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80",
    desc: "20KW hybrid Growatt inverter with isolated breaker busbars",
  },
  {
    title: "AC PCB & Pressure Refill",
    url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    desc: "Inverter unit leak detection and copper pipe brazing",
  },
  {
    title: "Custom Tailored Sherwani & Suit",
    url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80",
    desc: "Double-stitched raw silk wedding sherwani with hand embroidery",
  },
];

export const WorkInspectionModal: React.FC<WorkInspectionModalProps> = ({
  isOpen,
  onClose,
  jobTitle = "Solar Net Metering & Inverter Wiring",
  workerName = "Muhammad Rashid",
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>(PRESET_SAMPLE_WORK_PHOTOS[0].url);
  const [customDescription, setCustomDescription] = useState(PRESET_SAMPLE_WORK_PHOTOS[0].desc);
  const [loading, setLoading] = useState(false);
  const [inspectionResult, setInspectionResult] = useState<{
    passedInspection: boolean;
    qualityScore: number;
    verificationBadge: string;
    observedDetails: string[];
    safetyNotes: string;
    urduRecommendation: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedPhoto(reader.result as string);
        setInspectionResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInspectWithAI = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/inspect-work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedPhoto,
          jobTitle,
          expectedWorkDescription: customDescription,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setInspectionResult(data.data);
      }
    } catch (err) {
      console.error('Work inspection error:', err);
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
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                AI Work Quality Inspector
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-semibold px-2 py-0.5 rounded-full border border-indigo-500/30">
                  Multimodal Gemini
                </span>
              </h3>
              <p className="text-xs text-slate-400">Scan proof photos for standards & dispute-free payouts</p>
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
          {/* Work photo preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Work Completion Proof Image:</span>
              <label className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" /> Upload Custom Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-52 group">
              <img src={selectedPhoto} alt="Work proof" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-medium">
                <span className="truncate">{jobTitle} — by {workerName}</span>
                <span className="text-[10px] bg-indigo-950/80 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                  Proof Photo
                </span>
              </div>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-3 gap-2">
              {PRESET_SAMPLE_WORK_PHOTOS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedPhoto(item.url);
                    setCustomDescription(item.desc);
                    setInspectionResult(null);
                  }}
                  className={`p-1.5 rounded-xl border text-left transition overflow-hidden ${
                    selectedPhoto === item.url
                      ? 'border-indigo-500 bg-indigo-950/30'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <img src={item.url} alt={item.title} className="w-full h-12 object-cover rounded-lg mb-1" />
                  <div className="text-[10px] font-bold text-white truncate">{item.title}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Expected Work Scope / Detail:
            </label>
            <input
              type="text"
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Action button */}
          {!inspectionResult && (
            <button
              onClick={handleInspectWithAI}
              disabled={loading}
              className="w-full py-3 rounded-xl text-xs font-bold bg-indigo-500 hover:bg-indigo-400 text-white transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Analyzing Photo with Gemini Vision...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Run AI Visual Inspection & Verify Quality
                </>
              )}
            </button>
          )}

          {/* Inspection Report Card */}
          {inspectionResult && (
            <div className="p-5 bg-slate-950 rounded-2xl border border-indigo-500/40 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{inspectionResult.verificationBadge}</h4>
                    <p className="text-[10px] text-slate-400">Safety & Execution Standards Met</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-emerald-400">{inspectionResult.qualityScore}%</span>
                  <span className="text-[10px] text-slate-400 block">Quality Score</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-300 block mb-1.5">Key AI Visual Observations:</span>
                <ul className="space-y-1.5">
                  {inspectionResult.observedDetails.map((detail, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {inspectionResult.urduRecommendation && (
                <div className="p-3 bg-indigo-950/30 border border-indigo-800/40 rounded-xl text-xs text-indigo-200">
                  <span className="font-bold text-indigo-400 block mb-0.5">Urdu Inspection Notes:</span>
                  {inspectionResult.urduRecommendation}
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setInspectionResult(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Inspect Another Photo
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-500 hover:bg-indigo-400 text-white transition shadow-lg shadow-indigo-500/20"
                >
                  Accept & Issue Certificate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
