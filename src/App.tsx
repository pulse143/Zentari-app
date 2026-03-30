import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  Activity, 
  ShieldCheck, 
  Wallet, 
  AlertCircle, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight, 
  Info, 
  Command, 
  Bell, 
  User, 
  Globe, 
  BarChart3, 
  Zap, 
  ShieldAlert, 
  Code2, 
  Brain,
  Box,
  Database,
  Binary,
  Layout,
  Share2,
  Coins,
  Lock,
  Gavel,
  Flag,
  BookOpen,
  Radar
} from 'lucide-react';
import { cn } from './lib/utils';
import { auth, signInWithGoogle, logout, onAuthStateChanged, db, FirebaseUser, handleFirestoreError, OperationType, doc, getDoc, setDoc, serverTimestamp, collection, query, orderBy, limit, onSnapshot } from './lib/firebase';
import { SubmitEvidenceView } from './components/SubmitEvidenceView';
import { LedgerView } from './components/LedgerView';
import { FundingView } from './components/FundingView';
import { RiskAnalysisView } from './components/RiskAnalysisView';
import { ProjectDetailView } from './components/ProjectDetailView';
import { AllocationModal } from './components/AllocationModal';
import { SystemArchitectureView } from './components/SystemArchitectureView';
import { DataSchemaView } from './components/DataSchemaView';
import { AIAgentLogicView } from './components/AIAgentLogicView';
import { VerificationFlowView } from './components/VerificationFlowView';
import { PoIView } from './components/PoIView';
import { APIDocumentationView } from './components/APIDocumentationView';
import { DesignSystemView } from './components/DesignSystemView';
import { FailureModesView } from './components/FailureModesView';
import { NetworkEffectsView } from './components/NetworkEffectsView';
import { ProtocolEconomyView } from './components/ProtocolEconomyView';
import { StrategicMoatView } from './components/StrategicMoatView';
import { GlobalImpactView } from './components/GlobalImpactView';
import { ImpactMarketsView } from './components/ImpactMarketsView';
import { ForensicToolsView } from './components/ForensicToolsView';
import { ProtocolGovernanceView } from './components/ProtocolGovernanceView';
import { DeveloperPortalView } from './components/DeveloperPortalView';
import { ProtocolSecurityView } from './components/ProtocolSecurityView';
import { ProtocolRoadmapView } from './components/ProtocolRoadmapView';
import { DocumentationView } from './components/DocumentationView';

// --- Types & Constants ---

type TabId = 
  | 'ledger' | 'network' | 'funding' | 'audit' | 'architecture' 
  | 'database' | 'agents' | 'verification' | 'poi' | 'api' 
  | 'design' | 'failures' | 'network-effects' | 'economy' | 'moat' 
  | 'global' | 'markets' | 'forensic' | 'governance' | 'dev-portal' 
  | 'security' | 'roadmap' | 'documentation';

interface ViewConfig {
  id: TabId;
  icon: React.ElementType;
  label: string;
  category: 'protocol' | 'impact' | 'dev' | 'ops';
  component: React.ElementType;
}

const VIEWS: ViewConfig[] = [
  { id: 'ledger', icon: Activity, label: 'Impact Ledger', category: 'ops', component: (props: any) => <LedgerView records={props.poiRecords || []} /> },
  { id: 'network', icon: Globe, label: 'Submit Evidence', category: 'ops', component: SubmitEvidenceView },
  { id: 'funding', icon: Wallet, label: 'Funding', category: 'ops', component: (props: any) => <FundingView onOpenAllocation={props.onOpenAllocation} /> },
  { id: 'audit', icon: ShieldAlert, label: 'Risk Analysis', category: 'ops', component: RiskAnalysisView },
  { id: 'architecture', icon: Box, label: 'Architecture', category: 'protocol', component: SystemArchitectureView },
  { id: 'database', icon: Database, label: 'Data Schema', category: 'protocol', component: DataSchemaView },
  { id: 'agents', icon: Brain, label: 'AI Agents', category: 'protocol', component: AIAgentLogicView },
  { id: 'verification', icon: ShieldCheck, label: 'Verification', category: 'protocol', component: VerificationFlowView },
  { id: 'poi', icon: Binary, label: 'PoI Protocol', category: 'protocol', component: PoIView },
  { id: 'api', icon: Code2, label: 'API Docs', category: 'dev', component: APIDocumentationView },
  { id: 'design', icon: Layout, label: 'Design System', category: 'dev', component: DesignSystemView },
  { id: 'failures', icon: AlertCircle, label: 'Failure Modes', category: 'protocol', component: FailureModesView },
  { id: 'network-effects', icon: Share2, label: 'Network Effects', category: 'impact', component: NetworkEffectsView },
  { id: 'economy', icon: Coins, label: 'Protocol Economy', category: 'impact', component: ProtocolEconomyView },
  { id: 'moat', icon: Lock, label: 'Strategic Moat', category: 'impact', component: StrategicMoatView },
  { id: 'global', icon: Globe, label: 'Global Impact', category: 'impact', component: GlobalImpactView },
  { id: 'markets', icon: BarChart3, label: 'Impact Markets', category: 'impact', component: ImpactMarketsView },
  { id: 'forensic', icon: Search, label: 'Forensic Tools', category: 'ops', component: ForensicToolsView },
  { id: 'governance', icon: Gavel, label: 'Governance', category: 'ops', component: ProtocolGovernanceView },
  { id: 'dev-portal', icon: Code2, label: 'Dev Portal', category: 'dev', component: DeveloperPortalView },
  { id: 'security', icon: ShieldCheck, label: 'Security', category: 'ops', component: ProtocolSecurityView },
  { id: 'roadmap', icon: Flag, label: 'Roadmap', category: 'protocol', component: ProtocolRoadmapView },
  { id: 'documentation', icon: BookOpen, label: 'Documentation', category: 'protocol', component: DocumentationView },
];

// --- Components ---

const Header = ({ onOpenCommandPalette, user }: { onOpenCommandPalette: () => void, user: any }) => (
  <header className="fixed top-0 left-0 right-0 h-16 border-b border-brand-border bg-brand-ink/80 backdrop-blur-xl z-40 flex items-center justify-between px-8">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center">
          <Radar className="w-5 h-5 text-brand-ink" />
        </div>
        <span className="text-xl font-bold tracking-tighter uppercase font-mono">Zentari</span>
      </div>
      
      <button 
        onClick={onOpenCommandPalette}
        className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/5 rounded-full text-brand-muted hover:text-brand-paper transition-colors group"
      >
        <Search className="w-4 h-4" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Search Protocol...</span>
        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded-md text-[8px] font-mono">
          <Command className="w-2.5 h-2.5" />
          <span>Z</span>
        </div>
      </button>
    </div>

    <div className="flex items-center gap-6">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Reality Verified</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-brand-accent">PROTOCOL LIVE</span>
          </div>
        </div>
        <div className="w-px h-8 bg-brand-border" />
      </div>
      
      <button className="relative p-2 text-brand-muted hover:text-brand-paper transition-colors">
        <Bell className="w-5 h-5" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-accent rounded-full border-2 border-brand-ink" />
      </button>
      
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-brand-paper">{user?.displayName || 'Impact Creator'}</span>
          <span className="text-[8px] font-bold text-brand-accent uppercase tracking-widest">Trust: {user?.trust_score || 50}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
          ) : (
            <User className="w-5 h-5 text-brand-muted" />
          )}
        </div>
        <button onClick={() => logout()} className="p-2 text-brand-muted hover:text-rose-400 transition-colors">
          <Lock className="w-4 h-4" />
        </button>
      </div>
    </div>
  </header>
);

const IntentBar = ({ activeTab, onTabChange }: { activeTab: TabId, onTabChange: (tab: TabId) => void }) => {
  const categories = ['ops', 'protocol', 'impact', 'dev'] as const;
  
  return (
    <nav className="intent-bar max-w-[95vw] overflow-x-auto no-scrollbar py-4">
      <div className="flex gap-8 min-w-max px-8 items-center">
        {categories.map((cat) => (
          <div key={cat} className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-muted/40 rotate-180 [writing-mode:vertical-lr]">{cat}</span>
            <div className="flex gap-1.5">
              {VIEWS.filter(v => v.category === cat).map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "intent-button flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full border border-transparent transition-all duration-300",
                    activeTab === tab.id 
                      ? "bg-brand-paper text-brand-ink shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                      : "text-brand-muted hover:bg-white/5 hover:border-white/5"
                  )}
                >
                  <tab.icon className={cn("w-3.5 h-3.5", activeTab === tab.id ? "text-brand-ink" : "text-brand-muted")} />
                  <span className="text-[11px] font-medium tracking-tight">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

const CommandPalette = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-ink/80 backdrop-blur-sm z-50"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-xl bg-brand-border border border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden"
        >
          <div className="p-6 border-b border-white/5 flex items-center gap-4">
            <Search className="w-6 h-6 text-brand-muted" />
            <input 
              autoFocus
              placeholder="Search trust records, projects, or agents..."
              className="flex-1 bg-transparent border-none outline-none text-xl font-medium placeholder:text-brand-muted"
            />
          </div>
          <div className="p-4 max-h-[400px] overflow-y-auto">
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted px-4 py-2">Quick Actions</div>
            <div className="space-y-1">
              {[
                { icon: Plus, label: 'Submit New Evidence', shortcut: 'E' },
                { icon: Wallet, label: 'Allocate Capital', shortcut: 'A' },
                { icon: ShieldCheck, label: 'Verify Pending PoI', shortcut: 'V' },
                { icon: Activity, label: 'View Protocol Health', shortcut: 'H' }
              ].map((action, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-brand-accent/20 group-hover:text-brand-accent transition-colors">
                      <action.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </div>
                  <div className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-brand-muted">
                    {action.shortcut}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[10px] text-brand-muted">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Select</span>
              <span className="flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Navigate</span>
            </div>
            <span>ESC to close</span>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// --- Main Application ---

const AuthOverlay = () => (
  <div className="fixed inset-0 bg-brand-ink z-[100] flex items-center justify-center p-8 overflow-hidden">
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-paper rounded-full blur-[128px] animate-pulse delay-1000" />
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full space-y-12 relative z-10 text-center"
    >
      <div className="space-y-6">
        <div className="w-24 h-24 bg-brand-accent rounded-[2rem] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(96,165,250,0.2)]">
          <Radar className="w-12 h-12 text-brand-ink" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Zentari</h1>
          <p className="text-brand-muted text-lg">Secure your Z-ID to access the global impact ledger.</p>
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={() => signInWithGoogle()}
          className="w-full py-6 bg-brand-paper text-brand-ink rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-4"
        >
          <Globe className="w-5 h-5" />
          Connect with Google
        </button>
        <p className="text-[10px] text-brand-muted uppercase tracking-[0.2em]">
          By connecting, you agree to the Protocol Governance Charter.
        </p>
      </div>
    </motion.div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('ledger');
  const [isAllocationModalOpen, setIsAllocationModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [poiRecords, setPoiRecords] = useState<any[]>([]);

  // Real-time PoI Ledger
  useEffect(() => {
    const path = 'poi_records';
    const q = query(collection(db, path), orderBy('timestamp', 'desc'), limit(50));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPoiRecords(records);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check if user exists in Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          // Create new Z-ID profile
          const newUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: 'node',
            trust_score: 50,
            createdAt: new Date().toISOString()
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const ActiveView = VIEWS.find(v => v.id === activeTab)?.component || (() => null);

  if (loading) return (
    <div className="min-h-screen bg-brand-ink flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin" />
    </div>
  );

  if (!user) return <AuthOverlay />;

  return (
    <div className="min-h-screen bg-brand-ink selection:bg-brand-accent selection:text-brand-ink">
      <Header onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} user={user} />
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
      
      <main className="pt-32 pb-32 px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <ActiveView 
              poiRecords={poiRecords}
              onOpenAllocation={(project: any) => {
                setSelectedProject(project);
                setIsAllocationModalOpen(true);
              }} 
            />
          </motion.div>
        </AnimatePresence>
      </main>

      <AllocationModal 
        isOpen={isAllocationModalOpen} 
        onClose={() => setIsAllocationModalOpen(false)} 
        project={selectedProject} 
      />

      <IntentBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
