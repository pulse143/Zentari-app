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
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center border",
          factor.impact === 'positive' ? "bg-brand-accent/10 border-brand-accent/20 text-brand-accent" :
          factor.impact === 'negative' ? "bg-rose-400/10 border-rose-400/20 text-rose-400" :
          "bg-white/5 border-white/10 text-brand-muted"
        )}>
          <factor.icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold">{factor.label}</h3>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Weight</span>
        <span className="text-sm font-mono font-bold">{factor.weight}%</span>
      </div>
    </div>

    <p className="text-xs text-brand-muted leading-relaxed">
      {factor.description}
    </p>

    <div className="space-y-2">
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
        <span className="text-brand-muted">Confidence</span>
        <span className="text-brand-paper">{factor.confidence}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${factor.confidence}%` }}
          className={cn(
            "h-full",
            factor.impact === 'positive' ? "bg-brand-accent" : "bg-rose-400"
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
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">Trust & Risk Analysis</h2>
          <p className="text-brand-muted text-lg">In-depth protocol integrity and forensic audit.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-4 border border-brand-border rounded-3xl bg-white/[0.01] flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Risk Level</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-mono font-bold text-brand-accent">LOW</span>
              <div className="flex items-center gap-1 text-brand-accent text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-10 border border-brand-border rounded-[3rem] bg-white/[0.01] space-y-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LineChart className="w-6 h-6 text-brand-muted" />
              <h3 className="text-2xl font-bold">Trust Score Evolution</h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-muted">
              <span>Last 30 Days</span>
            </div>
          </div>

          <div className="h-64 flex items-end gap-2 px-4">
            {[45, 52, 48, 60, 55, 65, 70, 68, 75, 82, 80, 85, 88, 92, 95].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05 }}
                className="flex-1 bg-brand-accent/20 border-t border-brand-accent/40 rounded-t-lg hover:bg-brand-accent/40 transition-colors cursor-pointer group relative"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold text-brand-accent">
                  {h}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Volatility</span>
              <div className="text-xl font-bold">1.2%</div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Recovery Rate</span>
              <div className="text-xl font-bold">99.8%</div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Audit Depth</span>
              <div className="text-xl font-bold">14 Layers</div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-10 border border-brand-border rounded-[3rem] bg-rose-400/5 border-rose-400/20 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <ShieldAlert className="w-32 h-32 text-rose-400" />
            </div>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-rose-400" />
              <h3 className="text-2xl font-bold">Forensic Alerts</h3>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Duplicate Image Farm', location: 'Tanzania Sector 2', severity: 'high', time: '2h ago' },
                { title: 'Sensor Drift Detected', location: 'Zambia District 12', severity: 'low', time: '5h ago' }
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-6 border border-rose-400/10 rounded-3xl bg-rose-400/5 hover:bg-rose-400/10 transition-colors cursor-pointer group">
                  <div className="space-y-1">
                    <h4 className="font-bold">{alert.title}</h4>
                    <p className="text-xs text-brand-muted">{alert.location}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest",
                      alert.severity === 'high' ? "text-rose-400" : "text-amber-400"
                    )}>{alert.severity}</span>
                    <span className="text-[10px] text-brand-muted uppercase tracking-widest">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-rose-400 text-brand-ink rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:scale-[1.02] transition-transform">
              Initiate Slashing Protocol
            </button>
          </div>

          <div className="p-10 border border-brand-border rounded-[3rem] bg-white/[0.01] space-y-6">
            <div className="flex items-center gap-3">
              <Gavel className="w-5 h-5 text-brand-muted" />
              <h3 className="text-xl font-bold">Forensic Jury Status</h3>
            </div>
            <div className="flex items-center justify-between p-6 border border-white/5 rounded-3xl bg-white/[0.02]">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Active Cases</span>
                <div className="text-2xl font-bold">14</div>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Avg. Resolution</span>
                <div className="text-2xl font-bold">4.2h</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {riskFactors.map((factor, i) => (
          <RiskFactorCard key={i} factor={factor} />
        ))}
      </div>
    </div>
  );
};
