import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Map, 
  Layers, 
  Activity, 
  TrendingUp, 
  ShieldCheck, 
  Database, 
  Link2, 
  Building2, 
  Terminal, 
  Cpu, 
  Scale, 
  Settings, 
  UserCheck, 
  UserX, 
  GitMerge, 
  PieChart, 
  BarChart3, 
  Zap, 
  ShieldAlert, 
  Coins, 
  History, 
  Network,
  Languages,
  Flag,
  ArrowRight,
  ChevronRight,
  Info,
  MousePointer2,
  FileText,
  Gavel,
  Briefcase,
  MapPin,
  RefreshCcw
} from 'lucide-react';
import { cn } from '../lib/utils';

const ArchitectureLayer = ({ title, desc, items, icon: Icon, color }: any) => (
  <div className={cn("p-8 border rounded-[2.5rem] bg-white/[0.01] space-y-6 relative overflow-hidden group", color)}>
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

    <div className="grid grid-cols-2 gap-3">
      {items.map((item: string, i: number) => (
        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
          <div className={cn("w-1 h-1 rounded-full", color.replace('border-', 'bg-'))} />
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-paper/80">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const RolloutStep = ({ phase, region, focus, status, active }: any) => (
  <div className={cn(
    "p-6 border rounded-2xl transition-all relative flex flex-col justify-between h-full",
    active ? "bg-brand-accent/5 border-brand-accent/40" : "bg-white/5 border-brand-border opacity-50"
  )}>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">{phase}</div>
        {active && (
          <div className="px-2 py-1 bg-brand-accent text-brand-ink text-[8px] font-bold uppercase tracking-widest rounded-md">
            Current
          </div>
        )}
      </div>
      <div>
        <div className="text-lg font-bold">{region}</div>
        <div className="text-xs text-brand-muted mt-1">{focus}</div>
      </div>
    </div>
    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
      <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Status</span>
      <span className="text-[10px] font-mono font-bold text-brand-accent">{status}</span>
    </div>
  </div>
);

export const GlobalScalingView = () => {
  return (
    <div className="space-y-16 pb-32">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Global Scaling</h2>
          <p className="text-brand-muted text-lg mt-2">Federated Protocol Architecture for Worldwide Impact</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-3">
            <Globe className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">Scale: Federated</span>
          </div>
        </div>
      </div>

      {/* 1. Layered Architecture */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">The Three-Layer Architecture</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ArchitectureLayer 
            title="Protocol Core" 
            desc="The universal cryptographic truths that remain consistent across all borders." 
            items={["PoI Math", "K-ID Identity", "Trust Score", "Forensic Agent"]} 
            icon={Cpu} 
            color="border-brand-accent/40"
          />
          <ArchitectureLayer 
            title="Policy Layer" 
            desc="Regional adaptation for regulatory compliance and local impact definitions." 
            items={["GDPR/POPIA", "Fiat Gateways", "Local Metrics", "Policy Engines"]} 
            icon={Gavel} 
            color="border-brand-accent/20"
          />
          <ArchitectureLayer 
            title="Localization" 
            desc="Tailoring the user experience to local languages and cultural trade habits." 
            items={["Multi-lingual", "Local VUs", "Merchant Loops", "Cultural UX"]} 
            icon={Languages} 
            color="border-brand-border"
          />
        </div>
      </section>

      {/* 2. Cross-Border Trust */}
      <section className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <ShieldCheck className="w-48 h-48" />
        </div>
        <div className="max-w-3xl space-y-8">
          <h3 className="text-3xl font-bold">Cross-Border Trust Portability</h3>
          <p className="text-brand-muted text-lg leading-relaxed">
            Trust earned in one country is a global asset, but it faces **Regional Calibration** when crossing borders.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Global Baseline</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                A TS of 0.90 in Zambia is recognized globally as high integrity. Your reputation is your passport.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <RefreshCcw className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Calibration</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Scores are adjusted based on the new region's data density and historical fraud rates.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Global Ban</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Fraud in one country results in a global flag. You cannot outrun your forensic history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Governance Model */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-10 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-brand-accent" />
            <h3 className="text-2xl font-bold">Federated Governance</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-widest text-brand-accent">Global Council</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Responsible for the core protocol, forensic model updates, and cross-border standards.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-widest text-brand-accent">Regional Chapters</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Localized DAOs that manage country-specific policy layers and government relations.
              </p>
            </div>
          </div>
        </div>

        <div className="p-10 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-6">
          <div className="flex items-center gap-3">
            <Flag className="w-6 h-6 text-brand-accent" />
            <h3 className="text-2xl font-bold">Regulatory Adaptation</h3>
          </div>
          <div className="space-y-4">
            {[
              "GDPR/POPIA Compliance: Automated data residency modules.",
              "Fiat Bridge: Integration with local mobile money networks.",
              "Impact Definitions: Custom metrics for regional crop cycles.",
              "Gov Reporting: Automated audit trails for local regulators."
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 p-4 border border-brand-accent/10 rounded-2xl bg-brand-accent/[0.02]">
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-1.5" />
                <p className="text-xs text-brand-paper/80">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Rollout Strategy */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">Rollout Strategy: Africa → Global</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <RolloutStep 
            phase="Phase 1" 
            region="Zambia" 
            focus="Hub: Initial protocol hardening." 
            status="ACTIVE" 
            active={true}
          />
          <RolloutStep 
            phase="Phase 2" 
            region="East Africa" 
            focus="Corridor: Multi-currency testing." 
            status="PLANNED" 
            active={false}
          />
          <RolloutStep 
            phase="Phase 3" 
            region="Pan-Africa" 
            focus="Continent: Regulatory harmonization." 
            status="PLANNED" 
            active={false}
          />
          <RolloutStep 
            phase="Phase 4" 
            region="Global South" 
            focus="Expansion: SE Asia & Latin America." 
            status="PLANNED" 
            active={false}
          />
          <RolloutStep 
            phase="Phase 5" 
            region="Worldwide" 
            focus="Standard: ESG & Carbon markets." 
            status="PLANNED" 
            active={false}
          />
        </div>
      </section>
    </div>
  );
};
