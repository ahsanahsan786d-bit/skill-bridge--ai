import React, { useState } from 'react';
import { UserRole } from '../types';
import { X, Bot, Sparkles, Send, Loader2, User } from 'lucide-react';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  role,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Assalam-o-Alaikum! Main SkillBridge AI Assistant hu. Aap mujh se Pakistani market mein rates, solar/AC/electrical issues, ya client hire karne ke baare mein kuch bhi pooch sakte hain (Roman Urdu / English).`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: userText,
          role,
        }),
      });

      const json = await res.json();
      if (json.success && json.reply) {
        setMessages((prev) => [...prev, { sender: 'ai', text: json.reply }]);
      }
    } catch (err) {
      console.error('Error with AI assistant:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-slate-100">
      
      {/* Drawer Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              SkillBridge AI Assistant
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            </h3>
            <p className="text-[10px] text-slate-400">Pakistani Market Career & Hiring Guide</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Prompt Chips */}
      <div className="p-3 bg-slate-950/60 border-b border-slate-800 flex gap-2 overflow-x-auto text-[11px] text-slate-300 scrollbar-none">
        <button
          onClick={() => setInput('Solar inverter installation rates in Lahore?')}
          className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 whitespace-nowrap"
        >
          ☀️ Solar Rates
        </button>
        <button
          onClick={() => setInput('How to write a good worker profile in Roman Urdu?')}
          className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 whitespace-nowrap"
        >
          ✍️ Profile Tips
        </button>
        <button
          onClick={() => setInput('AC jet wash charges in Karachi?')}
          className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 whitespace-nowrap"
        >
          ❄️ AC Wash PKR
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                m.sender === 'user'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-emerald-400 border border-slate-700'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
            <span>SkillBridge AI is thinking...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI Assistant (Roman Urdu / English)..."
            className="flex-1 p-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
