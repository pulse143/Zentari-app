import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Zap, 
  Cpu, 
  Search, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Fingerprint,
  MapPin,
  Clock,
  Database,
  Layers,
  Terminal,
  Eye,
  Lock
} from 'lucide-react';
import { cn } from '../lib/utils';

const PipelineStage = ({ stage, index, isActive, isCompleted }: any) => (
  <div className={cn(
    "relative flex flex-col items-center gap-4 p-6 border rounded-3xl transition-all duration-500",
    isActive ? "border-brand-accent bg-brand-accent/5 shadow-[0_0_30px_rgba(0,255,0,0.1)]" : 
    isCompleted ? "border-brand-accent/40 bg-brand-accent/5" : "border-brand-border bg-white/[0.02]"
  )}>
    <div className={cn(
      "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500",
      isActive ? "bg-brand-accent text-brand-ink border-brand-accent" : 
      isCompleted ? "bg-brand-accent/20 text-brand-accent border-brand-accent/30" : "bg-white/5 text-brand-muted border-brand-border"
    )}>
      <stage.icon className="w-5 h-5" />
    </div>
    
    <div className="text-center">
      <h3 className="text-sm font-bold tracking-tight mb-1">{stage.title}</h3>
      <span className="text-[9px] font-mono uppercase tracking-widest text-brand-muted">Stage 0{index + 1}</span>
    </div>

    <div className="space-y-2 w-full">
      {stage.checks.map((check: string) => (
        <div key={check} className="flex items-center gap-2">
          <div className={cn(
            "w-1 h-1 rounded-full",
            isCompleted ? "bg-brand-accent" : "bg-brand-border"
          )} />
          <span className="text-[10px] text-brand-muted">{check}</span>
        </div>
      ))}
    </div>

    {isActive && (
      <motion.div 
        layoutId="activeIndicator"
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-accent text-brand-ink text-[8px] font-bold uppercase tracking-widest rounded-full"
      >
        Processing...
      </motion.div>
    )}
  </div>
);

export const VerificationEngineView = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const stages = [
    {
      title: 'Ingestion',
      icon: Fingerprint,
      checks: ['Hash Verification', 'Device Fingerprinting', 'Metadata Extraction']
    },
    {
      title: 'Contextual',
      icon: MapPin,
      checks: ['Geo-Fencing', 'Temporal Check', 'Velocity Check']
    },
    {
      title: 'AI Forensic',
      icon: Cpu,
      checks: ['Authenticity Check', 'Content Verification', 'Env Consistency']
    },
    {
      title: 'Consensus',
      icon: Shield,
      checks: ['Cross-Node Verification', 'Final Scoring', 'PoI Generation']
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage(prev => (prev + 1) % stages.length);
      const stage = stages[activeStage];
      setLogs(prev => [
        `> [${new Date().toLocaleTimeString()}] Executing ${stage.title} checks...`,
        `> [${new Date().toLocaleTimeString()}] ${stage.checks[Math.floor(Math.random() * stage.checks.length)]} passed.`,
        ...prev
      ].slice(0, 8));
    }, 4000);

    return () => clearInterval(interval);
  }, [activeStage]);

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Verification Engine</h2>
          <p className="text-brand-muted text-sm mt-1">AI-Powered Trust Backbone & Forensic Audit Pipeline</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-3">
            <Activity className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Trust Index: 0.942</span>
          </div>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {stages.map((stage, i) => (
          <React.Fragment key={stage.title}>
            <PipelineStage 
              stage={stage} 
              index={i} 
              isActive={activeStage === i}
              isCompleted={i < activeStage}
            />
            {i < stages.length - 1 && (
              <div className="hidden md:flex absolute top-1/2 -translate-y-1/2" style={{ left: `${(i + 1) * 25 - 2}%` }}>
                <ArrowRight className="w-4 h-4 text-brand-border" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Scoring Logic & Risk Section */}
        <div className="col-span-12 xl:col-span-8 space-y-8">
          <section className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Shield className="w-32 h-32" />
            </div>
            
            <h3 className="text-xl font-bold mb-8">Scoring Logic & Weights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  { label: 'AI Visual Audit', weight: 50, icon: Eye, color: 'text-brand-accent' },
                  { label: 'Geo-Consistency', weight: 20, icon: MapPin, color: 'text-blue-500' },
                  { label: 'Crypto Hash', weight: 20, icon: Lock, color: 'text-purple-500' },
                  { label: 'Temporal Match', weight: 10, icon: Clock, color: 'text-yellow-500' }
                ].map(item => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <item.icon className={cn("w-3.5 h-3.5", item.color)} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold">{item.weight}%</span>
                    </div>
                    <div className="h-1.5 bg-brand-border rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.weight}%` }}
                        className={cn("h-full", item.color.replace('text-', 'bg-'))} 
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border border-brand-border rounded-2xl bg-brand-ink/50 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-muted">Risk Flag Definitions</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-bold text-red-500 uppercase">RED_FLAG_DUPLICATE</div>
                      <p className="text-[10px] text-brand-muted">Immediate rejection. Evidence hash matches existing record.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-bold text-yellow-500 uppercase">YELLOW_FLAG_GEO_MISMATCH</div>
                      <p className="text-[10px] text-brand-muted">Requires manual review. GPS coordinates outside project boundary.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-brand-accent mt-0.5" />
                    <div>
                      <div className="text-[10px] font-bold text-brand-accent uppercase">AMBER_FLAG_AI_UNCERTAIN</div>
                      <p className="text-[10px] text-brand-muted">Gemini confidence below 0.8. Triggering fallback audit.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Example Output */}
          <section className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-brand-muted" />
                <h3 className="text-xl font-bold">Example Verification Output</h3>
              </div>
              <div className="px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-lg text-[10px] font-bold text-brand-accent uppercase">
                Production Grade JSON
              </div>
            </div>
            <div className="p-6 bg-brand-ink/80 border border-brand-border rounded-2xl font-mono text-xs leading-relaxed overflow-x-auto">
              <pre className="text-brand-paper/80">
{`{
  "verificationId": "V_99281",
  "score": 0.94,
  "status": "verified",
  "flags": [],
  "explanation": "High visual confidence in mangrove sapling identification. GPS and Timestamp are perfectly aligned with project boundaries. No signs of digital manipulation detected.",
  "confidence": 0.98,
  "forensic_audit": {
    "ai_detection": "negative",
    "metadata_integrity": "valid",
    "consensus_status": "reached"
  }
}`}
              </pre>
            </div>
          </section>
        </div>

        {/* Live Engine Logs */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          <div className="p-6 border border-brand-border rounded-3xl bg-white/[0.01] h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest">Live Engine Logs</h3>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-brand-accent">Real-time</span>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {logs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-3 border border-brand-border rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <p className="text-[10px] font-mono text-brand-paper/80 leading-tight">
                      {log}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-8 p-6 border border-brand-accent/20 bg-brand-accent/5 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-brand-accent" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Adversarial Defense</span>
              </div>
              <p className="text-[10px] text-brand-muted leading-relaxed">
                The engine uses **Gemini 3 Flash** to detect adversarial noise patterns and re-photography attempts. Suspicious nodes are automatically flagged for **Staking Slashing**.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
