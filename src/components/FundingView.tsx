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

const ProjectAllocationCard = ({ project, onSelect, onView }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-8 group hover:bg-white/[0.02] transition-all cursor-pointer">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted group-hover:bg-brand-accent/20 group-hover:text-brand-accent transition-colors">
          <Globe className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold">{project.name}</h3>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted">
            <MapPin className="w-3 h-3" />
            <span>{project.location}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Trust Score</span>
        <span className="text-2xl font-mono font-bold text-brand-accent">{project.trustScore}</span>
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
        <span className="text-brand-muted">Funding Progress</span>
        <span className="text-brand-paper">{((project.fundingRaised / project.fundingGoal) * 100).toFixed(1)}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(project.fundingRaised / project.fundingGoal) * 100}%` }}
          className="h-full bg-brand-accent"
        />
      </div>
      <div className="flex items-center justify-between text-[10px] font-mono text-brand-muted">
        <span>{project.fundingRaised.toLocaleString()} VU</span>
        <span>{project.fundingGoal.toLocaleString()} VU</span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {project.impactMetrics.map((metric: any, i: number) => (
        <div key={i} className="p-4 border border-white/5 rounded-2xl bg-white/[0.02] space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">{metric.label}</span>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">{metric.value}</span>
            <div className={cn(
              "flex items-center gap-0.5 text-[10px] font-bold",
              metric.change > 0 ? "text-brand-accent" : "text-rose-400"
            )}>
              {metric.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              <span>{Math.abs(metric.change)}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="flex gap-3">
      <button 
        onClick={() => onSelect(project)}
        className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-[10px] group-hover:bg-brand-paper group-hover:text-brand-ink transition-all"
      >
        Allocate Capital
      </button>
      <button 
        onClick={() => onView?.(project)}
        className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
      >
        View Details
      </button>
    </div>
  </div>
);

export const FundingView = ({ projects = [], onOpenAllocation, onViewProject }: { projects?: any[], onOpenAllocation: (project: any) => void, onViewProject?: (project: any) => void }) => {
  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">Capital Allocation</h2>
          <p className="text-brand-muted text-lg">Direct funding to verified impact tranches.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-4 border border-brand-border rounded-3xl bg-white/[0.01] flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Available Balance</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-mono font-bold">124,500 VU</span>
              <div className="flex items-center gap-1 text-brand-accent text-xs font-bold">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? projects.map((project) => (
          <ProjectAllocationCard 
            key={project.id} 
            project={project} 
            onSelect={onOpenAllocation}
            onView={onViewProject}
          />
        )) : (
          <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-[3rem]">
            <p className="text-brand-muted">No projects found in the protocol ledger.</p>
          </div>
        )}
      </div>

      <div className="p-12 border border-brand-border rounded-[3rem] bg-brand-accent/5 border-brand-accent/20 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Brain className="w-48 h-48 text-brand-accent" />
        </div>
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-brand-accent" />
            <h3 className="text-2xl font-bold">AI Portfolio Strategy</h3>
          </div>
          <p className="text-brand-muted text-lg leading-relaxed">
            "Based on current protocol health and verification velocity, the **Global Reforestation** project shows the highest trust-to-impact ratio. We recommend allocating **25%** of your available capital to this tranche."
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-brand-accent text-brand-ink rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:scale-[1.02] transition-transform">Apply Strategy</button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-colors">Review Analysis</button>
          </div>
        </div>
      </div>
    </div>
  );
};
