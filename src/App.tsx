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

const Header = ({ onOpenCommandPalette, user, onToggleMobileMenu, isMobileMenuOpen }: { onOpenCommandPalette: () => void, user: any, onToggleMobileMenu: () => void, isMobileMenuOpen: boolean }) => (
  <header className="fixed top-0 left-0 right-0 h-24 border-b border-brand-border bg-brand-ink/40 backdrop-blur-3xl z-40 flex items-center justify-between px-6 md:px-12 premium-border">
    <div className="flex items-center gap-16">
      <div className="flex items-center gap-4 group cursor-pointer">
        <div className="w-12 h-12 bg-brand-accent rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-[0_0_40px_rgba(0,209,255,0.3)] group-hover:scale-110 transition-all duration-500 premium-border">
          <Radar className="w-7 h-7 text-brand-ink" />
        </div>
        <span className="text-2xl font-bold tracking-tighter uppercase font-mono text-glow">Zentari</span>
      </div>
      
      <button 
        onClick={onOpenCommandPalette}
        className="hidden lg:flex items-center gap-4 px-6 py-3 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-brand-muted hover:text-brand-paper hover:bg-white/[0.06] transition-all group premium-border"
      >
        <Search className="w-4 h-4" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Search Protocol</span>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono opacity-50">
          <Command className="w-3.5 h-3.5" />
          <span>Z</span>
        </div>
      </button>
    </div>

    <div className="flex items-center gap-6 md:gap-10">
      <div className="hidden xl:flex items-center gap-8">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-muted opacity-50">Network Status</span>
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse shadow-[0_0_12px_rgba(0,209,255,0.6)]" />
            <span className="text-[11px] font-mono text-brand-accent tracking-widest font-bold">VERIFIED LIVE</span>
          </div>
        </div>
        <div className="w-px h-12 bg-brand-border" />
      </div>
      
      <div className="flex items-center gap-4 md:gap-8">
        <button className="relative p-3 text-brand-muted hover:text-brand-paper transition-all hover:scale-110">
          <Bell className="w-6 h-6" />
          <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-brand-accent rounded-full border-2 border-brand-ink shadow-[0_0_10px_rgba(0,209,255,0.5)]" />
        </button>
        
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-bold text-brand-paper tracking-tight">{user?.displayName || 'Impact Creator'}</span>
            <span className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.2em] opacity-80 text-glow">Trust: {user?.trust_score || 50}</span>
          </div>
          <div className="w-12 h-12 rounded-[1.25rem] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-2xl premium-border">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
            ) : (
              <User className="w-7 h-7 text-brand-muted" />
            )}
          </div>
        </div>
      </div>

      <button 
        onClick={onToggleMobileMenu}
        className="lg:hidden p-3 text-brand-muted hover:text-brand-paper transition-all"
      >
        {isMobileMenuOpen ? <Plus className="w-8 h-8 rotate-45" /> : <Layout className="w-8 h-8" />}
      </button>
    </div>
  </header>
);

const IntentBar = ({ activeTab, onTabChange }: { activeTab: TabId, onTabChange: (tab: TabId) => void }) => {
  const categories = ['ops', 'protocol', 'impact', 'dev'] as const;
  
  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 max-w-[95vw] overflow-x-auto no-scrollbar py-4 px-4 bg-brand-ink/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] z-40 hidden lg:flex shadow-[0_40px_100px_rgba(0,0,0,0.7)] premium-border">
      <div className="flex gap-12 min-w-max px-8 items-center">
        {categories.map((cat) => (
          <div key={cat} className="flex items-center gap-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-muted/30 rotate-180 [writing-mode:vertical-lr]">{cat}</span>
            <div className="flex gap-1.5">
              {VIEWS.filter(v => v.category === cat).map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "flex items-center gap-3 whitespace-nowrap px-6 py-3 rounded-2xl border border-transparent transition-all duration-700 ease-out",
                    activeTab === tab.id 
                      ? "bg-brand-paper text-brand-ink shadow-[0_0_40px_rgba(255,255,255,0.2)] scale-110" 
                      : "text-brand-muted hover:text-brand-paper hover:bg-white/[0.05]"
                  )}
                >
                  <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-brand-ink" : "text-brand-muted")} />
                  <span className="text-xs font-bold uppercase tracking-[0.15em]">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

const MobileMenu = ({ isOpen, activeTab, onTabChange, onClose }: { isOpen: boolean, activeTab: TabId, onTabChange: (tab: TabId) => void, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-0 bg-brand-ink z-[45] pt-20 pb-8 px-6 overflow-y-auto lg:hidden"
      >
        <div className="space-y-8">
          {['ops', 'protocol', 'impact', 'dev'].map((cat) => (
            <div key={cat} className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted border-b border-brand-border pb-2">{cat}</h3>
              <div className="grid grid-cols-2 gap-2">
                {VIEWS.filter(v => v.category === cat).map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      onClose();
                    }}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-2xl border transition-all",
                      activeTab === tab.id 
                        ? "bg-brand-accent/10 border-brand-accent/30 text-brand-accent" 
                        : "bg-white/5 border-white/5 text-brand-muted"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <div className="pt-8 border-t border-brand-border">
            <button 
              onClick={() => logout()}
              className="w-full p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs"
            >
              <Lock className="w-4 h-4" />
              Sign Out Protocol
            </button>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

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
          className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-brand-border border border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden"
        >
          <div className="p-4 md:p-6 border-b border-white/5 flex items-center gap-4">
            <Search className="w-5 h-5 md:w-6 md:h-6 text-brand-muted" />
            <input 
              autoFocus
              placeholder="Search trust records..."
              className="flex-1 bg-transparent border-none outline-none text-lg md:text-xl font-medium placeholder:text-brand-muted"
            />
          </div>
          <div className="p-2 md:p-4 max-h-[60vh] md:max-h-[400px] overflow-y-auto">
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted px-4 py-2">Quick Actions</div>
            <div className="space-y-1">
              {[
                { icon: Plus, label: 'Submit New Evidence', shortcut: 'E' },
                { icon: Wallet, label: 'Allocate Capital', shortcut: 'A' },
                { icon: ShieldCheck, label: 'Verify Pending PoI', shortcut: 'V' },
                { icon: Activity, label: 'View Protocol Health', shortcut: 'H' }
              ].map((action, i) => (
                <button key={i} className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-white/5 rounded-2xl transition-colors group text-left">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-brand-accent/20 group-hover:text-brand-accent transition-colors">
                      <action.icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span className="font-medium text-sm md:text-base">{action.label}</span>
                  </div>
                  <div className="hidden sm:flex px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-brand-muted">
                    {action.shortcut}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[10px] text-brand-muted">
            <div className="hidden sm:flex items-center gap-4">
              <span className="flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Select</span>
              <span className="flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Navigate</span>
            </div>
            <span className="w-full text-center sm:w-auto">ESC to close</span>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// --- Main Application ---

const AuthOverlay = ({ onDemo }: { onDemo: () => void }) => (
  <div className="fixed inset-0 bg-brand-ink z-[100] flex items-center justify-center p-8 overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-accent/10 rounded-full blur-[160px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-paper/5 rounded-full blur-[160px] animate-pulse delay-1000" />
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="max-w-md w-full space-y-16 relative z-10 text-center"
    >
      <div className="space-y-8">
        <div className="w-28 h-28 bg-brand-accent rounded-[2.5rem] flex items-center justify-center mx-auto shadow-[0_0_80px_rgba(0,209,255,0.25)] relative group">
          <div className="absolute inset-0 bg-brand-accent rounded-[2.5rem] animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />
          <Radar className="w-14 h-14 text-brand-ink relative z-10" />
        </div>
        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tighter uppercase font-mono">Zentari</h1>
          <p className="text-brand-muted text-xl font-medium leading-relaxed">Secure your Z-ID to access the global impact ledger.</p>
        </div>
      </div>

      <div className="space-y-6">
        <button 
          onClick={() => signInWithGoogle()}
          className="w-full py-7 bg-brand-paper text-brand-ink rounded-[2rem] font-bold uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-4 group"
        >
          <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Connect with Google
        </button>
        
        <button 
          onClick={onDemo}
          className="w-full py-4 bg-white/5 border border-white/10 text-brand-muted rounded-[1.5rem] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all"
        >
          Explore in Demo Mode
        </button>

        <p className="text-[10px] text-brand-muted uppercase tracking-[0.3em] font-bold opacity-40">
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [poiRecords, setPoiRecords] = useState<any[]>([]);

  // Real-time PoI Ledger
  useEffect(() => {
    // LIVE DATA: Listening to 'poi_records' collection in Firestore
    const path = 'poi_records';
    const q = query(collection(db, path), orderBy('timestamp', 'desc'), limit(50));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // FALLBACK: Mock data if ledger is empty
        setPoiRecords([
          { id: 'poi_1', poi_score: 0.9421, metadata: 'Reforestation verification in Brazil', timestamp: { toDate: () => new Date() }, verification_data: { risk_assessment: 'low' } },
          { id: 'poi_2', poi_score: 0.8854, metadata: 'Solar panel installation in Kenya', timestamp: { toDate: () => new Date(Date.now() - 3600000) }, verification_data: { risk_assessment: 'low' } },
          { id: 'poi_3', poi_score: 0.9122, metadata: 'Water filtration system in India', timestamp: { toDate: () => new Date(Date.now() - 7200000) }, verification_data: { risk_assessment: 'low' } }
        ]);
      } else {
        const records = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPoiRecords(records);
      }
    }, (error) => {
      // SILENT FALLBACK: If Firestore fails (e.g. mock config), use mock data
      console.warn("Firestore ledger fetch failed, using mock data:", error);
      setPoiRecords([
        { id: 'poi_1', poi_score: 0.9421, metadata: 'Reforestation verification in Brazil', timestamp: { toDate: () => new Date() }, verification_data: { risk_assessment: 'low' } },
        { id: 'poi_2', poi_score: 0.8854, metadata: 'Solar panel installation in Kenya', timestamp: { toDate: () => new Date(Date.now() - 3600000) }, verification_data: { risk_assessment: 'low' } },
        { id: 'poi_3', poi_score: 0.9122, metadata: 'Water filtration system in India', timestamp: { toDate: () => new Date(Date.now() - 7200000) }, verification_data: { risk_assessment: 'low' } }
      ]);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // LIVE DATA: Auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // LIVE DATA: Fetching user profile from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            // LIVE DATA: Creating new user profile in Firestore
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
        } catch (error) {
          console.error("User profile fetch failed:", error);
          // Fallback to basic user info from Auth
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: 'node',
            trust_score: 50
          });
        }
      } else {
        // Only clear user if not in demo mode
        setUser(prev => prev?.isDemo ? prev : null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const enterDemoMode = () => {
    setUser({
      uid: 'demo-user',
      email: 'demo@zentari.io',
      displayName: 'Demo Explorer',
      photoURL: null,
      role: 'admin',
      trust_score: 95,
      isDemo: true
    });
    setLoading(false);
  };

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

  if (!user) return <AuthOverlay onDemo={enterDemoMode} />;

  return (
    <div className="min-h-screen bg-brand-ink selection:bg-brand-accent selection:text-brand-ink overflow-x-hidden">
      <Header 
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} 
        user={user} 
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
      
      <main className="pt-32 md:pt-40 pb-32 md:pb-40 px-6 md:px-12 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
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
