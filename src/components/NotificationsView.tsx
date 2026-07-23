import React from 'react';
import { NotificationItem } from '../types';
import { Bell, Sparkles, Briefcase, Star, CheckCircle2 } from 'lucide-react';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAllRead,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Smart SkillBridge Alerts</h1>
            <p className="text-xs text-slate-400">Real-time AI matches, proposal updates, and reviews</p>
          </div>
        </div>

        <button
          onClick={onMarkAllRead}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold transition-all"
        >
          Mark All Read
        </button>
      </div>

      {/* Notifications Stream */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
              n.read
                ? 'bg-slate-900/60 border-slate-800/80 text-slate-300'
                : 'bg-slate-900 border-emerald-500/40 text-white shadow-lg shadow-emerald-500/5'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
              {n.type === 'match' && <Sparkles className="w-4 h-4 text-emerald-400" />}
              {n.type === 'proposal' && <Briefcase className="w-4 h-4 text-cyan-400" />}
              {n.type === 'review' && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
              {n.type === 'system' && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{n.title}</h3>
                <span className="text-[10px] text-slate-500">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
