import React, { useState } from 'react';
import { UserRole, Worker, Job, Conversation, NotificationItem } from './types';
import { 
  INITIAL_WORKERS, 
  INITIAL_JOBS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';

import { Navigation } from './components/Navigation';
import { SplashScreen } from './components/SplashScreen';
import { HomeDashboard } from './components/HomeDashboard';
import { SearchWorkers } from './components/SearchWorkers';
import { WorkerProfileModal } from './components/WorkerProfileModal';
import { AIPostJobModal } from './components/AIPostJobModal';
import { AIProfileGeneratorModal } from './components/AIProfileGeneratorModal';
import { AIMatchingView } from './components/AIMatchingView';
import { AIResumeModal } from './components/AIResumeModal';
import { MessagesView } from './components/MessagesView';
import { NotificationsView } from './components/NotificationsView';
import { AdminDashboard } from './components/AdminDashboard';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { AuthModal } from './components/AuthModal';
import { SettingsView } from './components/SettingsView';
import { VoiceJobModal } from './components/VoiceJobModal';
import { EscrowModal } from './components/EscrowModal';
import { WorkInspectionModal } from './components/WorkInspectionModal';
import { LiveInterviewModal } from './components/LiveInterviewModal';
import { PriceCalculatorModal } from './components/PriceCalculatorModal';
import { ReadmeModal } from './components/ReadmeModal';

export default function App() {
  const [role, setRole] = useState<UserRole>('client');
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Core Data
  const [workers, setWorkers] = useState<Worker[]>(INITIAL_WORKERS);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals state
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [workerProfileModalOpen, setWorkerProfileModalOpen] = useState(false);
  const [postJobModalOpen, setPostJobModalOpen] = useState(false);
  const [profileGeneratorModalOpen, setProfileGeneratorModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeWorker, setResumeWorker] = useState<Worker | null>(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Feature Modals
  const [voiceJobModalOpen, setVoiceJobModalOpen] = useState(false);
  const [escrowModalOpen, setEscrowModalOpen] = useState(false);
  const [workInspectionModalOpen, setWorkInspectionModalOpen] = useState(false);
  const [liveInterviewModalOpen, setLiveInterviewModalOpen] = useState(false);
  const [priceCalculatorModalOpen, setPriceCalculatorModalOpen] = useState(false);
  const [readmeModalOpen, setReadmeModalOpen] = useState(false);

  // Handlers
  const handleAddJob = (newJob: Job) => {
    setJobs((prev) => [newJob, ...prev]);
    // Add notification
    const newNotif: NotificationItem = {
      id: `n-${Date.now()}`,
      title: '💼 Job Posted Successfully',
      message: `Your job "${newJob.title}" in ${newJob.city} is live. AI worker matching triggered.`,
      timestamp: 'Just now',
      type: 'proposal',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setCurrentTab('aimatch');
  };

  const handleProfileCreated = (profilePartial: Partial<Worker>) => {
    const newWorker: Worker = {
      id: `w-${Date.now()}`,
      name: profilePartial.name || 'New Skilled Professional',
      tagline: profilePartial.tagline || 'Certified Skilled Specialist',
      category: profilePartial.category || 'Electrician',
      city: profilePartial.city || 'Lahore',
      area: profilePartial.area || 'Main City',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      hourlyRatePKR: profilePartial.hourlyRatePKR || 1200,
      fixedRatePKR: profilePartial.fixedRatePKR || 5000,
      experienceYears: profilePartial.experienceYears || 4,
      rating: 5.0,
      reviewCount: 1,
      verified: true,
      aiBadge: profilePartial.aiBadge || 'Top AI Recommended',
      bio: profilePartial.bio || 'Professional worker in Pakistan.',
      skills: profilePartial.skills || ['Troubleshooting', 'Wiring'],
      languages: ['Urdu', 'English'],
      completedJobs: 1,
      responseTime: '< 15 mins',
      portfolio: [],
      reviews: [
        {
          id: 'r-new',
          clientName: 'SkillBridge Verification Team',
          rating: 5,
          date: 'Today',
          comment: 'Identity and technical trade background verified.',
          jobTitle: 'Initial Registration',
        },
      ],
    };

    setWorkers((prev) => [newWorker, ...prev]);
    setSelectedWorker(newWorker);
    setWorkerProfileModalOpen(true);
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          const newMsg = {
            id: `m-${Date.now()}`,
            senderId: role === 'client' ? 'client-1' : 'worker-1',
            senderName: role === 'client' ? 'Sana Tariq (Client)' : conv.participantName,
            senderAvatar:
              role === 'client'
                ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
                : conv.participantAvatar,
            text,
            timestamp: 'Just now',
          };
          return {
            ...conv,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...conv.messages, newMsg],
          };
        }
        return conv;
      })
    );
  };

  const handleOpenChatWithWorker = (worker: Worker) => {
    let existingConv = conversations.find((c) => c.workerId === worker.id);
    if (!existingConv) {
      existingConv = {
        id: `c-${Date.now()}`,
        participantName: worker.name,
        participantAvatar: worker.avatar,
        participantRole: worker.category,
        workerId: worker.id,
        jobTitle: `Inquiry regarding ${worker.category}`,
        lastMessage: 'Assalam-o-Alaikum! Looking to discuss project details.',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `m-${Date.now()}`,
            senderId: 'client-1',
            senderName: 'Sana Tariq (Client)',
            senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
            text: `Assalam-o-Alaikum ${worker.name}. I saw your AI verified profile in ${worker.city}. Are you available for a project this week?`,
            timestamp: 'Just now',
          },
        ],
      };
      setConversations((prev) => [existingConv!, ...prev]);
    }
    setCurrentTab('messages');
  };

  const handleOpenAiResumeForWorker = (worker: Worker) => {
    setResumeWorker(worker);
    setResumeModalOpen(true);
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header & Navigation */}
      <Navigation
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        role={role}
        setRole={setRole}
        unreadNotifications={unreadNotifications}
        unreadMessages={unreadMessages}
        onOpenAiTools={() => setProfileGeneratorModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenPostJob={() => setPostJobModalOpen(true)}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
        onOpenReadme={() => setReadmeModalOpen(true)}
      />

      {/* Hero Splash Banner on Home tab */}
      {currentTab === 'home' && (
        <SplashScreen
          onGetStarted={() => setPostJobModalOpen(true)}
          onExploreWorkers={() => setCurrentTab('workers')}
          onExploreJobs={() => setCurrentTab('jobs')}
        />
      )}

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'home' && (
          <HomeDashboard
            role={role}
            workers={workers}
            jobs={jobs}
            onOpenAiProfileModal={() => setProfileGeneratorModalOpen(true)}
            onOpenPostJobModal={() => setPostJobModalOpen(true)}
            onOpenVoiceJobModal={() => setVoiceJobModalOpen(true)}
            onOpenEscrowModal={() => setEscrowModalOpen(true)}
            onOpenWorkInspectionModal={() => setWorkInspectionModalOpen(true)}
            onOpenLiveInterviewModal={() => setLiveInterviewModalOpen(true)}
            onOpenPriceCalculatorModal={() => setPriceCalculatorModalOpen(true)}
            onOpenReadmeModal={() => setReadmeModalOpen(true)}
            onOpenAiResume={(w) => handleOpenAiResumeForWorker(w)}
            onSelectWorker={(w) => {
              setSelectedWorker(w);
              setWorkerProfileModalOpen(true);
            }}
            onNavigateTab={(tab) => setCurrentTab(tab)}
          />
        )}

        {(currentTab === 'workers' || currentTab === 'jobs') && (
          <SearchWorkers
            workers={workers}
            onSelectWorker={(w) => {
              setSelectedWorker(w);
              setWorkerProfileModalOpen(true);
            }}
            onOpenAiResume={(w) => handleOpenAiResumeForWorker(w)}
            onOpenAiProfileModal={() => setProfileGeneratorModalOpen(true)}
          />
        )}

        {currentTab === 'aimatch' && (
          <AIMatchingView
            jobs={jobs}
            workers={workers}
            onSelectWorker={(w) => {
              setSelectedWorker(w);
              setWorkerProfileModalOpen(true);
            }}
          />
        )}

        {currentTab === 'messages' && (
          <MessagesView
            conversations={conversations}
            onSendMessage={handleSendMessage}
          />
        )}

        {currentTab === 'notifications' && (
          <NotificationsView
            notifications={notifications}
            onMarkAllRead={() =>
              setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
            }
          />
        )}

        {currentTab === 'admin' && <AdminDashboard />}

        {currentTab === 'settings' && <SettingsView />}
      </main>

      {/* Floating AI Assistant Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setAiAssistantOpen(true)}
          className="p-3.5 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 text-slate-950 font-bold shadow-2xl shadow-emerald-500/30 hover:scale-110 transition-transform flex items-center gap-2 group"
          title="Open SkillBridge AI Assistant"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <span className="text-xs font-extrabold pr-1 hidden sm:inline">Ask AI Guide</span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <WorkerProfileModal
        isOpen={workerProfileModalOpen}
        onClose={() => setWorkerProfileModalOpen(false)}
        worker={selectedWorker}
        onOpenChatWithWorker={handleOpenChatWithWorker}
        onOpenAiResume={handleOpenAiResumeForWorker}
      />

      <AIPostJobModal
        isOpen={postJobModalOpen}
        onClose={() => setPostJobModalOpen(false)}
        onAddJob={handleAddJob}
      />

      <AIProfileGeneratorModal
        isOpen={profileGeneratorModalOpen}
        onClose={() => setProfileGeneratorModalOpen(false)}
        onProfileCreated={handleProfileCreated}
      />

      <AIResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        worker={resumeWorker}
      />

      <AIAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        role={role}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        role={role}
        setRole={setRole}
      />

      <VoiceJobModal
        isOpen={voiceJobModalOpen}
        onClose={() => setVoiceJobModalOpen(false)}
        onJobCreated={handleAddJob}
      />

      <EscrowModal
        isOpen={escrowModalOpen}
        onClose={() => setEscrowModalOpen(false)}
      />

      <WorkInspectionModal
        isOpen={workInspectionModalOpen}
        onClose={() => setWorkInspectionModalOpen(false)}
      />

      <LiveInterviewModal
        isOpen={liveInterviewModalOpen}
        onClose={() => setLiveInterviewModalOpen(false)}
      />

      <PriceCalculatorModal
        isOpen={priceCalculatorModalOpen}
        onClose={() => setPriceCalculatorModalOpen(false)}
      />

      <ReadmeModal
        isOpen={readmeModalOpen}
        onClose={() => setReadmeModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-400">
            SkillBridge AI — Turn Skills into Opportunities 🇵🇰
          </p>
          <p>
            Powered by Google Gemini 3.6 Flash Server Integration • Built for Pakistani Workers & Clients
          </p>
        </div>
      </footer>

    </div>
  );
}
