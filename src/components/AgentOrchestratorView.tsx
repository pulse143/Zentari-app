import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Users, 
  Shield, 
  Zap, 
  Database, 
  Activity, 
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Terminal,
  Layers,
  Globe,
  Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

const AgentCard = ({ agent, isActive }: any) => (
  <div className={cn(
    "p-6 border rounded-3xl bg-white/[0.02] transition-all group relative overflow-hidden",
    isActive ? "border-brand-accent/40 bg-brand-accent/5" : "border-brand-border hover:border-brand-border/80"
  )}>
    {isActive && (
      <div className="absolute top-0 right-0 p-4">
        <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse shadow-[0_0_10px_#00FF00]" />
      </div>
    )}
    
    <div className="flex items-center gap-4 mb-6">
      <div className={cn(
        "p-3 rounded-xl transition-colors",
        isActive ? "bg-brand-accent/20 text-brand-accent" : "bg-white/5 text-brand-muted"
      )}>
        <agent.icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-lg font-bold tracking-tight">{agent.name}</h3>
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-muted">
          {isActive ? 'Processing...' : 'Idle'}
        </span>
      </div>
    </div>

    <div className="space-y-4">
      <div className="space-y-1.5">
        <span className="text-[9px] font-bold uppercase tracking-widest text-brand-paper/40">Objective</span>
        <p className="text-xs text-brand-muted leading-relaxed">{agent.objective}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-paper/40">Inputs</span>
          <div className="flex flex-wrap gap-1">
            {agent.inputs.map((i: string) => (
              <span key={i} className="px-1.5 py-0.5 bg-white/5 rounded text-[8px] font-mono">{i}</span>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-paper/40">Tools</span>
          <div className="flex flex-wrap gap-1">
            {agent.tools.map((t: string) => (
              <span key={t} className="px-1.5 py-0.5 bg-brand-accent/10 text-brand-accent rounded text-[8px] font-mono">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>

    {isActive && (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 p-3 bg-brand-ink/50 border border-brand-accent/20 rounded-xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="w-3 h-3 text-brand-accent" />
          <span className="text-[9px] font-mono text-brand-accent uppercase">Action Log</span>
        </div>
        <p className="text-[10px] font-mono text-brand-paper/80 leading-tight">
          {agent.currentAction}
        </p>
      </motion.div>
    )}
  </div>
);

export const AgentOrchestratorView = () => {
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [logs, setLogs] = useState<any[]>([]);

  const agents = [
    {
      id: 'donor',
      name: 'Donor Agent',
      icon: Users,
      objective: 'Maximize impact per dollar based on donor preferences.',
      inputs: ['Preferences', 'Trust Scores'],
      tools: ['allocateCapital()', 'getProjectStats()'],
      currentAction: '> Analyzing REFOREST_GLOBAL for capital release...'
    },
    {
      id: 'ngo',
      name: 'NGO Agent',
      icon: Globe,
      objective: 'Maintain high trust scores and secure funding.',
      inputs: ['Milestones', 'Raw Evidence'],
      tools: ['submitEvidence()', 'requestAudit()'],
      currentAction: '> Packaging evidence for POI_842901...'
    },
    {
      id: 'auditor',
      name: 'Auditor Agent',
      icon: Shield,
      objective: 'Detect fraud and ensure evidence matches reality.',
      inputs: ['Images', 'GPS', 'Satellite'],
      tools: ['callGeminiVisualAudit()', 'flagAnomaly()'],
      currentAction: '> Running visual forensic scan on POI_842901...'
    },
    {
      id: 'treasury',
      name: 'Treasury Agent',
      icon: Database,
      objective: 'Ensure protocol solvency and execute settlements.',
      inputs: ['Verified Claims', 'K-ID Sigs'],
      tools: ['executeSettlement()', 'updateLedger()'],
      currentAction: '> Verifying K-ID signature for node_04...'
    },
    {
      id: 'policy',
      name: 'Policy Agent',
      icon: Settings,
      objective: 'Enforce protocol-wide rules and manage risk.',
      inputs: ['Risk Signals', 'Votes'],
      tools: ['updateRiskThresholds()', 'pauseNode()'],
      currentAction: '> Monitoring global anomaly rate (Current: 1.2%)...'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      setActiveAgentId(randomAgent.id);
      
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        agent: randomAgent.name,
        action: randomAgent.currentAction.replace('> ', ''),
        timestamp: new Date().toLocaleTimeString()
      };
      
      setLogs(prev => [newLog, ...prev].slice(0, 10));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agent Orchestrator</h2>
          <p className="text-brand-muted text-sm mt-1">Autonomous Multi-Agent Decision Layer</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-3">
            <Activity className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest">System Load: 12%</span>
          </div>
        </div>
      </div>

      {/* Orchestration Diagram */}
      <section className="p-10 border border-brand-border rounded-[2.5rem] bg-white/[0.01] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#00FF00 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="px-8 py-4 border border-brand-accent/40 bg-brand-accent/10 rounded-2xl backdrop-blur-md flex items-center gap-3">
            <Layers className="w-5 h-5 text-brand-accent" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent">Event Blackboard (Pub/Sub)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
            {agents.map((agent) => (
              <div key={agent.id} className="flex flex-col items-center gap-4">
                <ArrowRight className="w-4 h-4 text-brand-muted rotate-90" />
                <div className={cn(
                  "w-full p-4 border rounded-2xl text-center transition-all",
                  activeAgentId === agent.id ? "border-brand-accent bg-brand-accent/10" : "border-brand-border bg-white/5"
                )}>
                  <agent.icon className={cn("w-5 h-5 mx-auto mb-2", activeAgentId === agent.id ? "text-brand-accent" : "text-brand-muted")} />
                  <div className="text-[10px] font-bold uppercase tracking-widest">{agent.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-8">
        {/* Agent Grid */}
        <div className="col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} isActive={activeAgentId === agent.id} />
          ))}
        </div>

        {/* Live Activity Feed */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          <div className="p-6 border border-brand-border rounded-3xl bg-white/[0.01] h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest">Live Agent Activity</h3>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-brand-accent">Real-time</span>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {logs.map((log) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-3 border border-brand-border rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-bold text-brand-accent uppercase">{log.agent}</span>
                      <span className="text-[8px] font-mono text-brand-muted">{log.timestamp}</span>
                    </div>
                    <p className="text-[10px] font-mono text-brand-paper/80 leading-tight">
                      {log.action}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
