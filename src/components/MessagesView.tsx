import React, { useState } from 'react';
import { Conversation, ChatMessage } from '../types';
import { 
  Send, 
  Sparkles, 
  Loader2, 
  Languages, 
  FileText, 
  CheckCheck, 
  User, 
  Bot, 
  PhoneCall, 
  ShieldCheck 
} from 'lucide-react';

interface MessagesViewProps {
  conversations: Conversation[];
  onSendMessage: (conversationId: string, text: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  conversations,
  onSendMessage,
}) => {
  const [selectedConvId, setSelectedConvId] = useState<string>(
    conversations[0]?.id || ''
  );
  const [inputText, setInputText] = useState('');
  const [translatingId, setTranslatingId] = useState<string | null>(null);
  const [summarizing, setSummarizing] = useState(false);
  const [activeSummary, setActiveSummary] = useState<string | null>(null);
  const [fraudScanning, setFraudScanning] = useState(false);
  const [fraudReport, setFraudReport] = useState<any>(null);

  const activeConv =
    conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const handleRunFraudScan = async () => {
    if (!activeConv) return;
    setFraudScanning(true);
    setFraudReport(null);
    try {
      const allText = activeConv.messages.map((m) => m.text).join(' ');
      const res = await fetch('/api/ai/fraud-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: allText,
          clientBudget: 18000,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setFraudReport(data.data);
      }
    } catch (err) {
      console.error('Fraud scan error:', err);
    } finally {
      setFraudScanning(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;

    onSendMessage(activeConv.id, inputText);
    setInputText('');
  };

  const handleTranslateMessage = async (msg: ChatMessage, targetLang: string) => {
    setTranslatingId(msg.id);
    try {
      const res = await fetch('/api/ai/chat-translate-summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'translate',
          text: msg.text,
          targetLanguage: targetLang,
        }),
      });

      const json = await res.json();
      if (json.success && json.translatedText) {
        msg.isAiTranslated = true;
        msg.originalText = msg.text;
        msg.text = json.translatedText;
      }
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setTranslatingId(null);
    }
  };

  const handleSummarizeChat = async () => {
    if (!activeConv) return;
    setSummarizing(true);
    try {
      const res = await fetch('/api/ai/chat-translate-summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'summarize',
          messages: activeConv.messages,
        }),
      });

      const json = await res.json();
      if (json.success && json.summary) {
        setActiveSummary(json.summary);
      }
    } catch (err) {
      console.error('Summarize error:', err);
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-100">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[750px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Column: Conversation List */}
        <div className="lg:col-span-4 bg-slate-950/80 border-r border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center justify-between">
              <span>Messages & Negotiations</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                AI Translator Active
              </span>
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50">
            {conversations.map((conv) => {
              const isActive = conv.id === selectedConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    setSelectedConvId(conv.id);
                    setActiveSummary(null);
                  }}
                  className={`p-4 cursor-pointer transition-all flex items-center gap-3 ${
                    isActive
                      ? 'bg-slate-900 border-l-4 border-emerald-500'
                      : 'hover:bg-slate-900/50'
                  }`}
                >
                  <img
                    src={conv.participantAvatar}
                    alt={conv.participantName}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">
                        {conv.participantName}
                      </h4>
                      <span className="text-[10px] text-slate-500">{conv.lastMessageTime}</span>
                    </div>
                    <p className="text-[11px] text-emerald-400 font-medium truncate">
                      {conv.jobTitle}
                    </p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Chat Feed */}
        {activeConv ? (
          <div className="lg:col-span-8 flex flex-col bg-slate-900/90 relative">
            
            {/* Header */}
            <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeConv.participantAvatar}
                  alt={activeConv.participantName}
                  className="w-10 h-10 rounded-xl object-cover border border-emerald-500/30"
                />
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {activeConv.participantName}
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </h3>
                  <p className="text-xs text-slate-400">{activeConv.jobTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* AI Anti-Scam Security Scanner */}
                <button
                  onClick={handleRunFraudScan}
                  disabled={fraudScanning}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  {fraudScanning ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span>AI Security Scan</span>
                </button>

                {/* AI Chat Summarizer */}
                <button
                  onClick={handleSummarizeChat}
                  disabled={summarizing}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  {summarizing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <FileText className="w-3.5 h-3.5" />
                  )}
                  <span>AI Summarize Deal</span>
                </button>
              </div>
            </div>

            {/* AI Fraud Report Banner */}
            {fraudReport && (
              <div className={`p-3.5 border-b text-xs space-y-1 animate-fadeIn ${
                fraudReport.isSafe
                  ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-200'
                  : 'bg-red-950/80 border-red-500/50 text-red-200'
              }`}>
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> AI Anti-Scam Audit: {fraudReport.riskLevel} (Risk Score: {fraudReport.riskScore}/100)
                  </span>
                  <button onClick={() => setFraudReport(null)} className="text-[10px] text-slate-400 hover:text-white">✕</button>
                </div>
                <p className="text-[11px] leading-relaxed">{fraudReport.recommendation}</p>
                {fraudReport.warnings && fraudReport.warnings.length > 0 && (
                  <ul className="list-disc pl-4 text-[10px] space-y-0.5 text-amber-300">
                    {fraudReport.warnings.map((w: string, idx: number) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* AI Summary Banner if active */}
            {activeSummary && (
              <div className="p-3.5 bg-emerald-950/60 border-b border-emerald-500/30 text-xs text-slate-200 space-y-1 animate-fadeIn">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Deal & Summary Points:
                </span>
                <p className="text-slate-300 whitespace-pre-line leading-relaxed text-[11px]">
                  {activeSummary}
                </p>
              </div>
            )}

            {/* Chat History */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {activeConv.messages.map((msg) => {
                const isClient = msg.senderId.startsWith('client');
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] text-slate-400 font-semibold">{msg.senderName}</span>
                      <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-1 ${
                        isClient
                          ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                          : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Translation Controls */}
                      <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-800/40 text-[10px]">
                        <button
                          onClick={() =>
                            handleTranslateMessage(
                              msg,
                              msg.isAiTranslated ? 'Urdu' : 'English'
                            )
                          }
                          disabled={translatingId === msg.id}
                          className="text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
                        >
                          {translatingId === msg.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Languages className="w-3 h-3 text-cyan-400" />
                          )}
                          <span>
                            {msg.isAiTranslated ? 'Show Original' : 'Translate AI (Urdu/Eng)'}
                          </span>
                        </button>

                        {msg.isAiTranslated && (
                          <span className="text-emerald-400 font-bold">AI Translated</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-4 bg-slate-950 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type message in Roman Urdu or English (e.g. Inverter kitne baje check karenge?)..."
                className="flex-1 p-3 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </form>

          </div>
        ) : (
          <div className="lg:col-span-8 flex items-center justify-center p-8 text-slate-500 text-xs">
            Select a conversation to view chat & translate messages.
          </div>
        )}

      </div>
    </div>
  );
};
