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
  <div className="p-8 glass-card rounded-[2.5rem] md:rounded-[3.5rem] space-y-8 md:space-y-10 group hover:bg-white/[0.03] transition-all cursor-pointer premium-border">
    <div className="w-full h-56 md:h-72 rounded-[2rem] md:rounded-[3rem] bg-white/5 border border-white/10 overflow-hidden relative group premium-border">
      <img 
        src={evidence.url} 
        alt="Evidence" 
        className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-all duration-700 scale-110 group-hover:scale-100"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="w-16 h-16 rounded-full bg-brand-accent/20 backdrop-blur-xl border border-brand-accent/40 flex items-center justify-center text-brand-accent shadow-[0_0_30px_rgba(0,209,255,0.3)]">
          <ImageIcon className="w-8 h-8" />
        </div>
      </div>
      <div className="absolute top-6 right-6 px-3 py-1.5 bg-brand-ink/80 backdrop-blur-xl border border-white/10 rounded-xl text-[10px] md:text-[11px] font-mono font-bold text-brand-paper tracking-wider">
        {evidence.timestamp}
      </div>
    </div>
    
    <div className="space-y-6 md:space-y-8">
      <div className="flex items-center justify-between">
        <h4 className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-brand-muted opacity-80">{evidence.type}</h4>
        <div className={cn(
          "px-3 py-1 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-widest border",
          evidence.status === 'verified' ? "bg-brand-accent/10 border-brand-accent/20 text-brand-accent" :
          evidence.status === 'pending' ? "bg-amber-400/10 border-amber-400/20 text-amber-400" :
          "bg-rose-400/10 border-rose-400/20 text-rose-400"
        )}>
          {evidence.status}
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {evidence.aiFeedback.map((feedback: any, i: number) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between text-[10px] md:text-[11px] font-bold uppercase tracking-widest">
              <span className="text-brand-muted opacity-60">{feedback.label}</span>
              <span className="text-brand-accent font-mono text-glow">{feedback.confidence}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${feedback.confidence}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-brand-accent/40"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ProjectDetailView = ({ project }: any) => {
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
    <div className="space-y-12 md:space-y-24 py-6 md:py-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 md:gap-16">
        <div className="space-y-6 md:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-10">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] md:rounded-[2.5rem] bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0 shadow-[0_0_30px_rgba(0,209,255,0.2)] premium-border">
              <Globe className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <div className="space-y-2 md:space-y-4">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[0.9] text-glow">{project.name}</h2>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[11px] md:text-sm font-bold uppercase tracking-[0.2em] text-brand-muted">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-accent" />
                  <span>{project.location}</span>
                </div>
                <div className="hidden sm:block w-1.5 h-1.5 bg-brand-border rounded-full" />
                <span className="text-brand-paper opacity-80">Reforestation Protocol</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 md:gap-10">
          <div className="p-8 md:p-10 glass-card rounded-[2.5rem] md:rounded-[3.5rem] flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center gap-8 sm:gap-2 premium-border">
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-60">Project Trust</span>
            <div className="flex items-center gap-4 md:gap-6">
              <span className="text-3xl md:text-5xl font-mono font-bold text-brand-accent text-glow">{project.trustScore}</span>
              <div className="flex items-center gap-1.5 text-brand-accent text-xs md:text-sm font-bold">
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                <span>1.4%</span>
              </div>
            </div>
          </div>
          <button className="w-full sm:w-auto px-12 md:px-16 py-5 md:py-7 bg-brand-paper text-brand-ink rounded-[2rem] md:rounded-[2.5rem] font-bold uppercase tracking-widest text-[11px] md:text-xs hover:scale-[1.05] transition-all active:scale-[0.98] shadow-2xl">
            Allocate Capital
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20">
        <div className="lg:col-span-2 space-y-12 md:space-y-24">
          <div className="space-y-10 md:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <Database className="w-6 h-6 md:w-8 md:h-8 text-brand-muted" />
                </div>
                <h3 className="text-2xl md:text-4xl font-bold tracking-tight">Impact Ledger</h3>
              </div>
              <button className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-accent transition-all text-left sm:text-right border-b border-white/10 pb-1">Filter Evidence</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
              {evidenceRecords.map((evidence) => (
                <EvidenceCard key={evidence.id} evidence={evidence} />
              ))}
            </div>
          </div>

          <div className="space-y-10 md:space-y-16">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-brand-muted" />
              </div>
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight">Impact Timeline</h3>
            </div>
            <div className="space-y-0 relative">
              <div className="absolute left-7 md:left-10 top-0 bottom-0 w-px bg-white/5" />
              {[
                { date: 'Mar 26, 2026', title: 'PoI #8291-X Verified', desc: 'Satellite AI confirmed 450 new saplings in Sector 4 with 99.2% confidence.', status: 'completed' },
                { date: 'Mar 24, 2026', title: 'Tranche 2 Released', desc: '12,400 VU allocated following milestone verification and node consensus.', status: 'completed' },
                { date: 'Mar 20, 2026', title: 'Ground Audit Initiated', desc: 'Local node assigned for physical verification of Sector 4 soil samples.', status: 'completed' },
                { date: 'Apr 02, 2026', title: 'Next Milestone: Canopy Check', desc: 'Scheduled satellite audit for canopy density growth and health metrics.', status: 'upcoming' }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 md:gap-12 pb-12 md:pb-20 last:pb-0 relative group">
                  <div className={cn(
                    "w-14 h-14 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center border z-10 transition-all shrink-0 premium-border",
                    item.status === 'completed' ? "bg-brand-accent/10 border-brand-accent/20 text-brand-accent shadow-[0_0_20px_rgba(0,209,255,0.2)]" : "bg-white/5 border-white/10 text-brand-muted"
                  )}>
                    {item.status === 'completed' ? <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8" /> : <Clock className="w-6 h-6 md:w-8 md:h-8" />}
                  </div>
                  <div className="space-y-3 md:space-y-4 pt-2 md:pt-4">
                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                      <span className="text-[10px] md:text-[11px] font-mono font-bold text-brand-muted uppercase tracking-[0.2em] opacity-60">{item.date}</span>
                      <div className={cn(
                        "px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest border",
                        item.status === 'completed' ? "bg-brand-accent/10 border-brand-accent/20 text-brand-accent" : "bg-white/5 border-white/10 text-brand-muted"
                      )}>
                        {item.status}
                      </div>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">{item.title}</h4>
                    <p className="text-sm md:text-lg text-brand-muted leading-relaxed max-w-2xl opacity-80 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-12 md:space-y-20">
          <div className="p-8 md:p-12 glass-card rounded-[3rem] md:rounded-[4rem] space-y-10 md:space-y-16 premium-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-brand-muted" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Impact Metrics</h3>
            </div>
            <div className="space-y-10 md:space-y-12">
              {project.impactMetrics.map((metric: any, i: number) => (
                <div key={i} className="space-y-4 md:space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 md:space-y-2">
                      <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-60">{metric.label}</span>
                      <div className="text-2xl md:text-4xl font-bold tracking-tight">{metric.value}</div>
                    </div>
                    <div className={cn(
                      "flex items-center gap-1.5 text-[11px] md:text-sm font-bold",
                      metric.change > 0 ? "text-brand-accent" : "text-rose-400"
                    )}>
                      {metric.change > 0 ? <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" /> : <ArrowDownRight className="w-4 h-4 md:w-5 md:h-5" />}
                      <span>{Math.abs(metric.change)}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '75%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-brand-paper/40"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12 glass-card rounded-[3rem] md:rounded-[4rem] bg-brand-accent/[0.03] border-brand-accent/20 space-y-8 md:space-y-12 relative overflow-hidden premium-border">
            <div className="absolute top-0 right-0 p-12 md:p-16 opacity-[0.05]">
              <Zap className="w-32 h-32 md:w-48 md:h-48 text-brand-accent" />
            </div>
            <div className="flex items-center gap-4 md:gap-6 relative z-10">
              <div className="p-3 rounded-2xl bg-brand-accent/10">
                <Brain className="w-6 h-6 md:w-8 md:h-8 text-brand-accent" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">AI Project Insight</h3>
            </div>
            <p className="text-base md:text-xl text-brand-paper/80 leading-relaxed relative z-10 font-medium italic">
              "This project is currently outperforming its sector average by <span className="text-brand-accent font-bold">14.2%</span>. The high frequency of satellite verification suggests a very low risk of impact drift."
            </p>
            <button className="w-full py-5 md:py-7 bg-brand-accent text-brand-ink rounded-2xl md:rounded-3xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] hover:scale-[1.05] transition-all active:scale-[0.98] shadow-[0_0_40px_rgba(0,209,255,0.3)] relative z-10">
              Review Full Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
