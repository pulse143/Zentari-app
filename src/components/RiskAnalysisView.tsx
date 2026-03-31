import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  AlertCircle, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronRight, 
  Activity, 
  BarChart3, 
  Globe, 
  Database, 
  Network, 
  Rocket, 
  Target, 
  Gavel, 
  Briefcase, 
  MapPin, 
  LineChart, 
  PieChart, 
  Activity as ActivityIcon, 
  Wallet, 
  Lock, 
  Unlock, 
  RefreshCcw, 
  Layout, 
  Box, 
  Share2, 
  Gift, 
  Trophy, 
  UserCheck, 
  UserX, 
  GitMerge, 
  Search, 
  Plus, 
  Info, 
  MousePointer2, 
  FileText, 
  Scale, 
  Eye, 
  Binary, 
  Brain, 
  Smile, 
  Repeat, 
  Microscope,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

const RiskFactorCard = ({ factor }: any) => (
  <div className="p-8 md:p-10 glass-card rounded-[2.5rem] md:rounded-[3.5rem] space-y-8 md:space-y-10 group hover:bg-white/[0.03] transition-all cursor-pointer premium-border">
    <div className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-4 md:gap-6">
        <div className={cn(
          "w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center border premium-border transition-all",
          factor.impact === 'positive' ? "bg-brand-accent/10 border-brand-accent/20 text-brand-accent shadow-[0_0_20px_rgba(0,209,255,0.2)]" :
          factor.impact === 'negative' ? "bg-rose-400/10 border-rose-400/20 text-rose-400 shadow-[0_0_20px_rgba(251,113,133,0.2)]" :
          "bg-white/5 border-white/10 text-brand-muted"
        )}>
          <factor.icon className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        <div className="space-y-1 md:space-y-2">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">{factor.label}</h3>
          <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-70">
            <span>Factor Weight</span>
            <div className="w-1 h-1 bg-brand-border rounded-full" />
            <span className="text-brand-paper">{factor.weight}%</span>
          </div>
        </div>
      </div>
    </div>

    <p className="text-sm md:text-base text-brand-muted leading-relaxed font-medium opacity-80">
      {factor.description}
    </p>

    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between text-[10px] md:text-[11px] font-bold uppercase tracking-widest">
        <span className="text-brand-muted opacity-70">Confidence Level</span>
        <span className="text-brand-paper">{factor.confidence}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${factor.confidence}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={cn(
            "h-full transition-all",
            factor.impact === 'positive' ? "bg-brand-accent shadow-[0_0_15px_rgba(0,209,255,0.4)]" : "bg-rose-400 shadow-[0_0_15px_rgba(251,113,133,0.4)]"
          )}
        />
      </div>
    </div>
  </div>
);

export const RiskAnalysisView = () => {
  const riskFactors = [
    {
      label: 'Satellite Verification',
      icon: Globe,
      weight: 40,
      confidence: 98.4,
      impact: 'positive',
      description: 'AI-driven cross-referencing with Sentinel-2 and Planet Labs imagery confirms 99.2% of reported reforestation events.'
    },
    {
      label: 'Node Reputation',
      icon: Network,
      weight: 25,
      confidence: 92.1,
      impact: 'positive',
      description: 'The current validator set has a historical accuracy of 99.8%. No collusion patterns detected in the last 30 days.'
    },
    {
      label: 'Sensor Integrity',
      icon: Database,
      weight: 20,
      confidence: 84.5,
      impact: 'neutral',
      description: 'IoT flow sensors in Zambia District 12 show minor calibration drift. Data is being adjusted via protocol-level smoothing.'
    },
    {
      label: 'Fraud Attempts',
      icon: ShieldAlert,
      weight: 15,
      confidence: 12.4,
      impact: 'negative',
      description: 'Recent spike in duplicate image submissions from Tanzania Sector 2. Forensic agents have flagged 14 nodes for slashing.'
    }
  ];

  return (
    <div className="space-y-12 md:space-y-20 py-6 md:py-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12">
        <div className="space-y-3">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-glow">Trust & Risk Analysis</h2>
          <p className="text-brand-muted text-lg md:text-xl font-medium opacity-80">In-depth protocol integrity and forensic audit with real-time risk assessment.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-full sm:w-auto p-6 md:p-8 glass-card rounded-[2rem] md:rounded-[2.5rem] flex flex-col gap-2 premium-border">
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-60">System Risk Level</span>
            <div className="flex items-center gap-4">
              <span className="text-3xl md:text-4xl font-mono font-bold text-brand-accent text-glow">LOW</span>
              <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shadow-[0_0_20px_rgba(0,209,255,0.2)]">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="p-8 md:p-12 glass-card rounded-[3rem] md:rounded-[4rem] space-y-10 md:space-y-16 premium-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10">
                <LineChart className="w-6 h-6 md:w-8 md:h-8 text-brand-muted" />
              </div>
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight">Trust Evolution</h3>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted">
              <ActivityIcon className="w-3 h-3" />
              <span>Last 30 Days</span>
            </div>
          </div>

          <div className="h-64 md:h-80 flex items-end gap-2 md:gap-3 px-4">
            {[45, 52, 48, 60, 55, 65, 70, 68, 75, 82, 80, 85, 88, 92, 95].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 1, ease: "easeOut" }}
                className="flex-1 bg-brand-accent/10 border-t-2 border-brand-accent/40 rounded-t-xl hover:bg-brand-accent/30 transition-all cursor-pointer group relative"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all text-[10px] md:text-[11px] font-mono font-bold text-brand-accent bg-brand-ink/80 backdrop-blur-md px-2 py-1 rounded-lg border border-brand-accent/20">
                  {h}%
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 md:gap-10 pt-8 md:pt-12 border-t border-white/5">
            <div className="space-y-2">
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-60">Volatility</span>
              <div className="text-xl md:text-3xl font-bold tracking-tight">1.2%</div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-60">Recovery</span>
              <div className="text-xl md:text-3xl font-bold tracking-tight">99.8%</div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-60">Audit Depth</span>
              <div className="text-xl md:text-3xl font-bold tracking-tight">14L</div>
            </div>
          </div>
        </div>

        <div className="space-y-8 md:space-y-12">
          <div className="p-8 md:p-12 glass-card rounded-[3rem] md:rounded-[4rem] bg-rose-400/[0.03] border-rose-400/20 space-y-8 md:space-y-12 relative overflow-hidden premium-border">
            <div className="absolute top-0 right-0 p-12 md:p-20 opacity-[0.05]">
              <ShieldAlert className="w-48 h-48 md:w-80 md:h-80 text-rose-400" />
            </div>
            <div className="flex items-center gap-4 md:gap-6 relative z-10">
              <div className="p-3 md:p-4 rounded-2xl bg-rose-400/10">
                <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-rose-400" />
              </div>
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight">Forensic Alerts</h3>
            </div>
            <div className="space-y-4 md:space-y-6 relative z-10">
              {[
                { title: 'Duplicate Image Farm', location: 'Tanzania Sector 2', severity: 'high', time: '2h ago' },
                { title: 'Sensor Drift Detected', location: 'Zambia District 12', severity: 'low', time: '5h ago' }
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-6 md:p-8 border border-rose-400/10 rounded-[2rem] md:rounded-[2.5rem] bg-rose-400/[0.02] hover:bg-rose-400/[0.05] transition-all cursor-pointer group premium-border">
                  <div className="space-y-2">
                    <h4 className="text-lg md:text-xl font-bold tracking-tight">{alert.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-70">
                      <MapPin className="w-3 h-3" />
                      <span>{alert.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-widest border",
                      alert.severity === 'high' ? "bg-rose-400/10 border-rose-400/20 text-rose-400" : "bg-amber-400/10 border-amber-400/20 text-amber-400"
                    )}>{alert.severity}</span>
                    <span className="text-[10px] md:text-[11px] text-brand-muted font-mono opacity-60 uppercase tracking-widest">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-5 md:py-7 bg-rose-400 text-brand-ink rounded-2xl md:rounded-3xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] hover:scale-[1.05] transition-all active:scale-[0.98] shadow-[0_0_40px_rgba(251,113,133,0.3)] relative z-10">
              Initiate Slashing Protocol
            </button>
          </div>

          <div className="p-8 md:p-12 glass-card rounded-[3rem] md:rounded-[4rem] space-y-8 md:space-y-10 premium-border">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10">
                <Gavel className="w-6 h-6 md:w-8 md:h-8 text-brand-muted" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Forensic Jury Status</h3>
            </div>
            <div className="grid grid-cols-2 gap-6 md:gap-10 p-8 md:p-10 border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.02] premium-border">
              <div className="space-y-2">
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-60">Active Cases</span>
                <div className="text-3xl md:text-5xl font-bold tracking-tight">14</div>
              </div>
              <div className="space-y-2 text-right">
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-60">Avg. Resolution</span>
                <div className="text-3xl md:text-5xl font-bold tracking-tight">4.2h</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {riskFactors.map((factor, i) => (
          <RiskFactorCard key={i} factor={factor} />
        ))}
      </div>
    </div>
  );
};
