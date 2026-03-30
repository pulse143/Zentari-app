import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Database, 
  Link2, 
  Building2, 
  Terminal, 
  TrendingUp, 
  Lock, 
  Unlock, 
  ArrowRight, 
  RefreshCcw, 
  Layers, 
  Activity, 
  ChevronRight,
  Info,
  MousePointer2,
  Cpu,
  Scale,
  Settings,
  UserCheck,
  UserX,
  GitMerge,
  PieChart,
  BarChart3,
  Globe,
  Zap,
  ShieldAlert,
  Coins,
  History,
  Network
} from 'lucide-react';
import { cn } from '../lib/utils';

const MoatCard = ({ title, desc, icon: Icon, color, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={cn("p-8 border rounded-[2.5rem] bg-white/[0.01] space-y-6 relative overflow-hidden group", color)}
  >
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon className="w-32 h-32" />
    </div>
    
    <div className="flex items-center gap-4">
      <div className={cn("p-3 rounded-2xl bg-white/5 border", color)}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
    </div>

    <p className="text-xs text-brand-muted leading-relaxed">
      {desc}
    </p>

    <div className="pt-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-brand-accent">
      <TrendingUp className="w-3 h-3" />
      <span>Moat Strengthening</span>
    </div>
  </motion.div>
);

const TimelinePhase = ({ phase, primary, secondary, status, active }: any) => (
  <div className={cn(
    "p-6 border rounded-2xl transition-all relative",
    active ? "bg-brand-accent/5 border-brand-accent/40" : "bg-white/5 border-brand-border opacity-50"
  )}>
    {active && (
      <div className="absolute -top-2 -right-2 px-2 py-1 bg-brand-accent text-brand-ink text-[8px] font-bold uppercase tracking-widest rounded-md">
        Active
      </div>
    )}
    <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">{phase}</div>
    <div className="space-y-4">
      <div>
        <div className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Primary Moat</div>
        <div className="text-sm font-bold">{primary}</div>
      </div>
      <div>
        <div className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Secondary Moat</div>
        <div className="text-xs font-medium text-brand-paper">{secondary}</div>
      </div>
      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Status</span>
        <span className="text-[10px] font-mono font-bold text-brand-accent">{status}</span>
      </div>
    </div>
  </div>
);

export const MoatStrategyView = () => {
  return (
    <div className="space-y-16 pb-32">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Defensibility & Moats</h2>
          <p className="text-brand-muted text-lg mt-2">The Multi-Layered Architecture of Protocol Longevity</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">Defensibility: High</span>
          </div>
        </div>
      </div>

      {/* 1. The Five Moats */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">The Five Core Moats</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <MoatCard 
            title="Forensic Data" 
            desc="Millions of verified PoI submissions. A competitor starting today has zero historical data to train models against spoofing." 
            icon={Database} 
            color="border-brand-accent/20"
            delay={0.1}
          />
          <MoatCard 
            title="Trust Equity" 
            desc="Accumulated Soulbound Trust Scores. You cannot 'blitzscale' a 5-year history of integrity." 
            icon={History} 
            color="border-brand-accent/20"
            delay={0.2}
          />
          <MoatCard 
            title="Integration" 
            desc="Economic plumbing with local merchants and donor systems. Replacing this requires years of relationship building." 
            icon={Link2} 
            color="border-brand-accent/20"
            delay={0.3}
          />
          <MoatCard 
            title="Gov Adoption" 
            desc="Official recognition as the verified ledger of record. Switching costs for governments are prohibitive." 
            icon={Building2} 
            color="border-brand-accent/20"
            delay={0.4}
          />
          <MoatCard 
            title="Developer" 
            desc="A library of 3rd-party modules. Competitors cannot match the feature velocity of a decentralized community." 
            icon={Terminal} 
            color="border-brand-accent/20"
            delay={0.5}
          />
        </div>
      </section>

      {/* 2. Big Tech Response */}
      <section className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Globe className="w-48 h-48" />
        </div>
        <div className="max-w-3xl space-y-8">
          <h3 className="text-3xl font-bold">The "Big Tech" Response</h3>
          <p className="text-brand-muted text-lg leading-relaxed">
            What happens if a global tech giant tries to replicate Zentari?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Scale className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Trust Paradox</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Corporate products struggle with neutrality. Donors trust the decentralized math of Zentari over a CEO's promises.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Network className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Last Mile</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Big Tech is poor at physical verification in rural areas. Our network of local Citizen Validators is a physical moat.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Data Headstart</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Our Forensic Agent will have blocked every fraud vector they haven't even imagined yet by the time they launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Moat Strengthening Timeline */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">Moat Strengthening Timeline</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <TimelinePhase 
            phase="Year 1" 
            primary="Code & Vision" 
            secondary="Initial Partnerships" 
            status="ESTABLISHED" 
            active={false}
          />
          <TimelinePhase 
            phase="Year 2-3" 
            primary="Trust Scores" 
            secondary="Forensic Data" 
            status="STRENGTHENING" 
            active={true}
          />
          <TimelinePhase 
            phase="Year 4-5" 
            primary="Integration" 
            secondary="Gov Adoption" 
            status="IMPENETRABLE" 
            active={false}
          />
          <TimelinePhase 
            phase="Year 6+" 
            primary="Ecosystem" 
            secondary="Network Effects" 
            status="GLOBAL STANDARD" 
            active={false}
          />
        </div>
      </section>

      {/* 4. Ethical Lock-in */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-10 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-6">
          <div className="flex items-center gap-3">
            <Unlock className="w-6 h-6 text-brand-accent" />
            <h3 className="text-2xl font-bold">Ethical Lock-in</h3>
          </div>
          <p className="text-xs text-brand-muted leading-relaxed">
            Participants stay because the system provides the highest ROI (lowest fraud, highest trust). We don't trap data; we provide the most valuable environment for it.
          </p>
          <div className="pt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Open Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Portability</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Transparency</span>
            </div>
          </div>
        </div>

        <div className="p-10 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-6">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-brand-accent" />
            <h3 className="text-2xl font-bold">Switching Costs</h3>
          </div>
          <p className="text-xs text-brand-muted leading-relaxed">
            An NGO leaving Zentari loses their **Trust Equity**. They would have to start at a 0.00 Trust Score on a new platform, losing instant funding access and donor visibility.
          </p>
          <div className="pt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Trust Reset</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Audit Delay</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Funding Gap</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
