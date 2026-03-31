import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  AlertCircle, 
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
  ShieldAlert, 
  Gavel, 
  Briefcase, 
  MapPin, 
  LineChart, 
  PieChart, 
  Activity as ActivityIcon, 
  Wallet as WalletIcon, 
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

const ProjectAllocationCard = ({ project, onSelect }: any) => (
  <div className="p-8 md:p-10 glass-card rounded-[2.5rem] md:rounded-[3.5rem] space-y-8 md:space-y-10 group hover:bg-white/[0.03] transition-all cursor-pointer premium-border">
    <div className="flex items-start justify-between gap-6">
      <div className="flex items-center gap-4 md:gap-6">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted group-hover:bg-brand-accent/20 group-hover:text-brand-accent transition-all shrink-0 premium-border">
          <Globe className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        <div className="space-y-1 md:space-y-2">
          <h3 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">{project.name}</h3>
          <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-70">
            <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span>{project.location}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-60">Trust Score</span>
        <span className="text-2xl md:text-3xl font-mono font-bold text-brand-accent text-glow">{project.trustScore}</span>
      </div>
    </div>

    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between text-[10px] md:text-[11px] font-bold uppercase tracking-widest">
        <span className="text-brand-muted opacity-70">Funding Progress</span>
        <span className="text-brand-paper">{((project.fundingRaised / project.fundingGoal) * 100).toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${(project.fundingRaised / project.fundingGoal) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-brand-accent shadow-[0_0_15px_rgba(0,209,255,0.4)]"
        />
      </div>
      <div className="flex items-center justify-between text-[10px] md:text-[11px] font-mono text-brand-muted opacity-60">
        <span>{project.fundingRaised.toLocaleString()} VU</span>
        <span>{project.fundingGoal.toLocaleString()} VU</span>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      {project.impactMetrics.map((metric: any, i: number) => (
        <div key={i} className="p-4 md:p-6 border border-white/5 rounded-2xl md:rounded-3xl bg-white/[0.02] space-y-2 premium-border">
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-muted opacity-60">{metric.label}</span>
          <div className="flex items-center justify-between">
            <span className="text-sm md:text-lg font-bold tracking-tight">{metric.value}</span>
            <div className={cn(
              "flex items-center gap-1 text-[10px] md:text-[11px] font-bold",
              metric.change > 0 ? "text-brand-accent" : "text-rose-400"
            )}>
              {metric.change > 0 ? <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5" /> : <ArrowDownRight className="w-3 h-3 md:w-3.5 md:h-3.5" />}
              <span>{Math.abs(metric.change)}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <button 
      onClick={() => onSelect(project)}
      className="w-full py-4 md:py-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] group-hover:bg-brand-paper group-hover:text-brand-ink transition-all active:scale-[0.98] shadow-xl"
    >
      Allocate Capital
    </button>
  </div>
);

export const FundingView = ({ onOpenAllocation }: { onOpenAllocation: (project: any) => void }) => {
  const projects = [
    {
      id: '1',
      name: 'Global Reforestation',
      location: 'Regional Sector 4',
      trustScore: 98.4,
      fundingGoal: 500000,
      fundingRaised: 320000,
      impactMetrics: [
        { label: 'Activities Verified', value: '12,400', change: 12 },
        { label: 'Impact Units', value: '450t', change: 8 }
      ]
    },
    {
      id: '2',
      name: 'Zambia Clean Water',
      location: 'Lusaka District 12',
      trustScore: 92.1,
      fundingGoal: 250000,
      fundingRaised: 180000,
      impactMetrics: [
        { label: 'Wells Built', value: '12', change: 4 },
        { label: 'People Served', value: '5,000', change: 15 }
      ]
    },
    {
      id: '3',
      name: 'Tanzania Solar Grid',
      location: 'Dodoma Sector 2',
      trustScore: 88.5,
      fundingGoal: 750000,
      fundingRaised: 420000,
      impactMetrics: [
        { label: 'KWh Generated', value: '45,000', change: 22 },
        { label: 'Homes Powered', value: '1,200', change: 18 }
      ]
    }
  ];

  return (
    <div className="space-y-12 md:space-y-20 py-6 md:py-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12">
        <div className="space-y-3">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-glow">Capital Allocation</h2>
          <p className="text-brand-muted text-lg md:text-xl font-medium opacity-80">Direct funding to verified impact tranches with algorithmic precision.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-full sm:w-auto p-6 md:p-8 glass-card rounded-[2rem] md:rounded-[2.5rem] flex flex-col gap-2 premium-border">
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-60">Available Balance</span>
            <div className="flex items-center gap-4">
              <span className="text-3xl md:text-4xl font-mono font-bold text-brand-paper">124,500 VU</span>
              <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shadow-[0_0_20px_rgba(0,209,255,0.2)]">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {projects.map((project) => (
          <ProjectAllocationCard 
            key={project.id} 
            project={project} 
            onSelect={onOpenAllocation}
          />
        ))}
      </div>

      <div className="p-8 md:p-16 glass-card rounded-[3rem] md:rounded-[4rem] bg-brand-accent/[0.03] border-brand-accent/20 space-y-8 md:space-y-12 relative overflow-hidden premium-border">
        <div className="absolute top-0 right-0 p-12 md:p-20 opacity-[0.05]">
          <Brain className="w-48 h-48 md:w-80 md:h-80 text-brand-accent" />
        </div>
        <div className="max-w-3xl space-y-6 md:space-y-10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-brand-accent/10">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-brand-accent" />
            </div>
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight">AI Portfolio Strategy</h3>
          </div>
          <p className="text-brand-muted text-lg md:text-2xl leading-relaxed font-medium opacity-90">
            "Based on current protocol health and verification velocity, the <span className="text-brand-paper font-bold underline decoration-brand-accent/40 underline-offset-8">Global Reforestation</span> project shows the highest trust-to-impact ratio. We recommend allocating <span className="text-brand-accent font-bold">25%</span> of your available capital to this tranche."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4">
            <button className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-6 bg-brand-accent text-brand-ink rounded-2xl md:rounded-3xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] hover:scale-[1.05] transition-all active:scale-[0.98] shadow-[0_0_40px_rgba(0,209,255,0.3)]">Apply Strategy</button>
            <button className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] hover:bg-white/10 transition-all active:scale-[0.98]">Review Analysis</button>
          </div>
        </div>
      </div>
    </div>
  );
};
