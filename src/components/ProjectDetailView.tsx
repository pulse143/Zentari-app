import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronRight, 
  Activity, 
  BarChart3, 
  Database, 
  Network, 
  Rocket, 
  Target, 
  ShieldAlert, 
  Gavel, 
  Briefcase, 
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
  XCircle,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '../lib/utils';

const EvidenceCard = ({ evidence }: any) => (
  <div className="p-6 border border-brand-border rounded-[2rem] bg-white/[0.01] space-y-6 group hover:bg-white/[0.02] transition-all cursor-pointer">
    <div className="w-full h-48 rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative group">
      <img 
        src={evidence.url} 
        alt="Evidence" 
        className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ImageIcon className="w-8 h-8 text-brand-paper" />
      </div>
      <div className="absolute top-4 right-4 px-2 py-1 bg-brand-ink/80 backdrop-blur-md border border-white/10 rounded-lg text-[8px] font-mono text-brand-paper">
        {evidence.timestamp}
      </div>
    </div>
    
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-widest">{evidence.type}</h4>
        <div className={cn(
          "px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border",
          evidence.status === 'verified' ? "bg-brand-accent/10 border-brand-accent/20 text-brand-accent" :
          evidence.status === 'pending' ? "bg-amber-400/10 border-amber-400/20 text-amber-400" :
          "bg-rose-400/10 border-rose-400/20 text-rose-400"
        )}>
          {evidence.status}
        </div>
      </div>
      <div className="space-y-2">
        {evidence.aiFeedback.map((feedback: any, i: number) => (
          <div key={i} className="flex items-center justify-between text-[9px]">
            <span className="text-brand-muted">{feedback.label}</span>
            <span className="text-brand-accent font-mono">{feedback.confidence}%</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ProjectDetailView = ({ project, onOpenAllocation }: any) => {
  const evidenceRecords = [
    {
      id: '1',
      type: 'Satellite Imagery',
      url: 'https://picsum.photos/seed/sat1/600/400',
      timestamp: '2026-03-24 14:22',
      status: 'verified',
      aiFeedback: [
        { label: 'Vegetation Index', confidence: 99.2 },
        { label: 'Canopy Density', confidence: 98.4 }
      ]
    },
    {
      id: '2',
      type: 'Ground Photo',
      url: 'https://picsum.photos/seed/ground1/600/400',
      timestamp: '2026-03-25 09:15',
      status: 'verified',
      aiFeedback: [
        { label: 'Species Match', confidence: 96.5 },
        { label: 'GPS Integrity', confidence: 99.8 }
      ]
    },
    {
      id: '3',
      type: 'IoT Sensor Log',
      url: 'https://picsum.photos/seed/sensor1/600/400',
      timestamp: '2026-03-26 08:30',
      status: 'pending',
      aiFeedback: [
        { label: 'Data Consistency', confidence: 94.2 },
        { label: 'Node Consensus', confidence: 92.1 }
      ]
    }
  ];

  return (
    <div className="space-y-16">
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
              <Globe className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-5xl font-bold tracking-tight">{project.name}</h2>
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-brand-muted">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
                <div className="w-1 h-1 bg-brand-border rounded-full" />
                <span>Reforestation</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="p-6 border border-brand-border rounded-[2rem] bg-white/[0.01] flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Project Trust</span>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-mono font-bold text-brand-accent">{project.trustScore}</span>
              <div className="flex items-center gap-1 text-brand-accent text-xs font-bold">
                <ArrowUpRight className="w-4 h-4" />
                <span>1.4%</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => onOpenAllocation?.(project)}
            className="px-12 py-6 bg-brand-paper text-brand-ink rounded-[2rem] font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform"
          >
            Allocate Capital
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="w-6 h-6 text-brand-muted" />
                <h3 className="text-2xl font-bold">Impact Evidence Ledger</h3>
              </div>
              <button className="text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-paper transition-colors">Filter by Type</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {evidenceRecords.map((evidence) => (
                <EvidenceCard key={evidence.id} evidence={evidence} />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-brand-muted" />
              <h3 className="text-2xl font-bold">Impact Timeline</h3>
            </div>
            <div className="space-y-0 relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5" />
              {[
                { date: 'Mar 26, 2026', title: 'PoI #8291-X Verified', desc: 'Satellite AI confirmed 450 new saplings in Sector 4.', status: 'completed' },
                { date: 'Mar 24, 2026', title: 'Tranche 2 Released', desc: '12,400 VU allocated following milestone verification.', status: 'completed' },
                { date: 'Mar 20, 2026', title: 'Ground Audit Initiated', desc: 'Local node assigned for physical verification of Sector 4.', status: 'completed' },
                { date: 'Apr 02, 2026', title: 'Next Milestone: Canopy Check', desc: 'Scheduled satellite audit for canopy density growth.', status: 'upcoming' }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 pb-12 last:pb-0 relative group">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center border z-10 transition-all",
                    item.status === 'completed' ? "bg-brand-accent/10 border-brand-accent/20 text-brand-accent" : "bg-white/5 border-white/10 text-brand-muted"
                  )}>
                    {item.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                  </div>
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-bold text-brand-muted uppercase tracking-widest">{item.date}</span>
                      <div className={cn(
                        "px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border",
                        item.status === 'completed' ? "bg-brand-accent/10 border-brand-accent/20 text-brand-accent" : "bg-white/5 border-white/10 text-brand-muted"
                      )}>
                        {item.status}
                      </div>
                    </div>
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-sm text-brand-muted leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="p-10 border border-brand-border rounded-[3rem] bg-white/[0.01] space-y-8">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-brand-muted" />
              <h3 className="text-2xl font-bold">Impact Metrics</h3>
            </div>
            <div className="space-y-8">
              {project.impactMetrics.map((metric: any, i: number) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">{metric.label}</span>
                      <div className="text-2xl font-bold">{metric.value}</div>
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 text-xs font-bold",
                      metric.change > 0 ? "text-brand-accent" : "text-rose-400"
                    )}>
                      {metric.change > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      <span>{Math.abs(metric.change)}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      className="h-full bg-brand-paper"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 border border-brand-border rounded-[3rem] bg-brand-accent/5 border-brand-accent/20 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Zap className="w-32 h-32 text-brand-accent" />
            </div>
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-brand-accent" />
              <h3 className="text-xl font-bold">AI Project Insight</h3>
            </div>
            <p className="text-sm text-brand-paper/80 leading-relaxed">
              "This project is currently outperforming its sector average by **14.2%**. The high frequency of satellite verification suggests a very low risk of impact drift."
            </p>
            <button className="w-full py-4 bg-brand-accent text-brand-ink rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:scale-[1.02] transition-transform">
              Review Full Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
