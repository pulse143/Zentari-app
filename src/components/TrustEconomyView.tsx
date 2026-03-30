import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coins, 
  TrendingUp, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  ArrowRight, 
  RefreshCcw, 
  Database, 
  Layers, 
  Activity, 
  ChevronRight,
  Info,
  MousePointer2,
  Terminal,
  Cpu,
  Scale,
  Settings,
  UserCheck,
  UserX,
  Link2,
  GitMerge,
  PieChart,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';

const TierCard = ({ tier, score, access, influence, color, icon: Icon }: any) => (
  <div className={cn("p-6 border rounded-[2rem] bg-white/[0.01] space-y-6 relative overflow-hidden group", color)}>
    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon className="w-24 h-24" />
    </div>
    
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h3 className="text-xl font-bold tracking-tight">{tier}</h3>
        <div className={cn("text-[10px] font-mono font-bold uppercase tracking-widest", color.replace('border-', 'text-'))}>
          Score: {score}
        </div>
      </div>
      <div className={cn("p-2 rounded-xl bg-white/5 border", color)}>
        <Icon className="w-5 h-5" />
      </div>
    </div>

    <div className="space-y-4">
      <div className="space-y-1">
        <div className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Funding Access</div>
        <div className="text-xs font-medium text-brand-paper">{access}</div>
      </div>
      <div className="space-y-1">
        <div className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Protocol Influence</div>
        <div className="text-xs font-medium text-brand-paper">{influence}</div>
      </div>
    </div>

    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
      <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Status</span>
      <div className="flex items-center gap-1.5">
        <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", color.replace('border-', 'bg-'))} />
        <span className="text-[9px] font-bold uppercase tracking-widest">Active</span>
      </div>
    </div>
  </div>
);

const TrustMetric = ({ label, value, desc, icon: Icon, color }: any) => (
  <div className="p-6 border border-brand-border rounded-2xl bg-white/5 hover:bg-white/[0.08] transition-all group">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-2 rounded-lg bg-brand-ink border border-brand-border group-hover:border-brand-accent/40 transition-colors">
        <Icon className="w-5 h-5 text-brand-muted group-hover:text-brand-accent" />
      </div>
      <span className="text-sm font-bold">{label}</span>
    </div>
    <div className="space-y-2">
      <div className={cn("text-2xl font-bold font-mono", color)}>{value}</div>
      <p className="text-[10px] text-brand-muted leading-relaxed">{desc}</p>
    </div>
  </div>
);

export const TrustEconomyView = () => {
  return (
    <div className="space-y-16 pb-32">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Trust Economy</h2>
          <p className="text-brand-muted text-lg mt-2">Where Integrity is the Ultimate Asset</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-3">
            <Coins className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">Economy: Stable</span>
          </div>
        </div>
      </div>

      {/* 1. Trust Metrics */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">The Trust Score (TS)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TrustMetric 
            label="Verified PoI" 
            value="+0.02 TS" 
            desc="Every successful Proof of Impact adds a deterministic increment to your Trust Score." 
            icon={CheckCircle2} 
            color="text-brand-accent"
          />
          <TrustMetric 
            label="Staking Longevity" 
            value="1.2x Multiplier" 
            desc="Maintaining a stake without flags increases your loyalty multiplier over time." 
            icon={TrendingUp} 
            color="text-brand-accent"
          />
          <TrustMetric 
            label="Fraud Detection" 
            value="RESET TO 0.00" 
            desc="Immediate reset and slashing of staked capital upon forensic fraud detection." 
            icon={ShieldAlert} 
            color="text-red-500"
          />
        </div>
      </section>

      {/* 2. Trust Tiers */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">Trust Tiers & Privileges</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <TierCard 
            tier="Institutional" 
            score="0.90 - 1.00" 
            access="Unlimited; Instant Release" 
            influence="Governance; Validator Status" 
            icon={ShieldCheck} 
            color="border-brand-accent/40"
          />
          <TierCard 
            tier="Verified" 
            score="0.75 - 0.89" 
            access="High; 24h Audit Delay" 
            influence="Proposal Submission" 
            icon={UserCheck} 
            color="border-brand-accent/20"
          />
          <TierCard 
            tier="Emerging" 
            score="0.50 - 0.74" 
            access="Capped; 72h Audit Delay" 
            influence="Community Discussion" 
            icon={Activity} 
            color="border-brand-border"
          />
          <TierCard 
            tier="Restricted" 
            score="0.00 - 0.49" 
            access="None; Funding Paused" 
            influence="Read-Only Access" 
            icon={Lock} 
            color="border-red-500/20"
          />
        </div>
      </section>

      {/* 3. Trust Sharing / Borrowing */}
      <section className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <GitMerge className="w-48 h-48" />
        </div>
        <div className="max-w-3xl space-y-8">
          <h3 className="text-3xl font-bold">Trust Lines & Mentorship</h3>
          <p className="text-brand-muted text-lg leading-relaxed">
            Trust cannot be transferred, but it can be **shared** through cryptographic vouching.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Link2 className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">The Anchor Node</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                High-trust nodes can extend a "Trust Line" to new nodes, staking their own TS to vouch for the newcomer's integrity.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Scale className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Shared Risk</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                If the new node performs well, the Anchor earns a Mentorship Bonus. If they commit fraud, the Anchor's TS is penalized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Penalties & Recovery */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-red-500" />
            <h3 className="text-2xl font-bold">Penalties</h3>
          </div>
          <div className="space-y-4">
            {[
              "Slashing: Fraudulent nodes lose 100% of staked capital.",
              "Quarantine: Nodes with TS < 0.50 face manual audit for all evidence.",
              "Blacklisting: Permanent K-ID ban for repeated fraud attempts.",
              "Reputational Burn: Public ledger record of all forensic flags."
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 p-4 border border-red-500/10 rounded-2xl bg-red-500/[0.02]">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5" />
                <p className="text-xs text-brand-paper/80">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <RefreshCcw className="w-6 h-6 text-brand-accent" />
            <h3 className="text-2xl font-bold">Recovery</h3>
          </div>
          <div className="space-y-4">
            {[
              "The Redemption Path: Complete 5 'Perfect Verifications' (PoI > 0.98).",
              "Collateralized Trust: Post 2x standard stake for a 6-month probation.",
              "Community Appeal: Manual review by the High-Trust Council.",
              "Technical Audit: Verification that previous errors were non-malicious."
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 p-4 border border-brand-accent/10 rounded-2xl bg-brand-accent/[0.02]">
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-1.5" />
                <p className="text-xs text-brand-paper/80">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Example Scenarios */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Terminal className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">Economic Scenarios</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-brand-border rounded-3xl bg-white/5 space-y-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Scenario: High-Performer</div>
            <p className="text-xs text-brand-muted leading-relaxed">
              NGO maintains 0.96 TS for 12 months. Unlocks "Instant Liquidity." Capital is released the moment evidence is uploaded.
            </p>
          </div>
          <div className="p-6 border border-brand-border rounded-3xl bg-white/5 space-y-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-yellow-500">Scenario: Technical Error</div>
            <p className="text-xs text-brand-muted leading-relaxed">
              Node has GPS drift due to low battery. TS drops from 0.85 to 0.82. Next 3 submissions face 48h audit delay.
            </p>
          </div>
          <div className="p-6 border border-brand-border rounded-3xl bg-white/5 space-y-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-red-500">Scenario: Fraud Attempt</div>
            <p className="text-xs text-brand-muted leading-relaxed">
              Node uses Photoshop filter on crop photo. Forensic Agent detects manipulation. TS reset to 0.00. $5k stake slashed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
