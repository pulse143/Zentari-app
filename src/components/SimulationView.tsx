import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Building2, 
  Coins, 
  Globe, 
  Users, 
  ArrowRight, 
  ChevronRight, 
  Activity, 
  BarChart3, 
  Cpu, 
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
  Wallet, 
  ArrowDownRight, 
  ArrowUpRight, 
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

const MonthStep = ({ month, title, desc, actors, stats, active }: any) => (
  <div className={cn(
    "p-8 border rounded-[2.5rem] transition-all relative overflow-hidden group h-full flex flex-col justify-between",
    active ? "bg-brand-accent/5 border-brand-accent/40 ring-1 ring-brand-accent/20" : "bg-white/[0.01] border-brand-border opacity-40 grayscale"
  )}>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-4xl font-bold text-brand-accent opacity-20">M{month}</div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">{title}</div>
      </div>
      
      <p className="text-xs text-brand-paper/80 leading-relaxed font-bold uppercase tracking-widest">
        {desc}
      </p>

      <div className="space-y-4">
        <div className="text-[9px] font-bold uppercase tracking-widest text-brand-muted border-b border-white/5 pb-2">Key Actors</div>
        <div className="flex flex-wrap gap-2">
          {actors.map((actor: string, i: number) => (
            <div key={i} className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[8px] font-bold uppercase tracking-widest text-brand-paper/60">
              {actor}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {stats.map((stat: any, i: number) => (
          <div key={i} className="flex items-center justify-between text-[10px]">
            <span className="text-brand-muted">{stat.label}</span>
            <span className="font-mono text-brand-accent">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ScenarioCard = ({ type, title, desc, outcome, icon: Icon }: any) => (
  <div className={cn(
    "p-8 border rounded-[2.5rem] space-y-6 relative overflow-hidden group",
    type === 'best' ? "bg-emerald-400/5 border-emerald-400/20" : "bg-rose-400/5 border-rose-400/20"
  )}>
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon className="w-32 h-32" />
    </div>
    
    <div className="flex items-center gap-4">
      <div className={cn(
        "p-3 rounded-2xl border",
        type === 'best' ? "bg-emerald-400/10 border-emerald-400/20 text-emerald-400" : "bg-rose-400/10 border-rose-400/20 text-rose-400"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
    </div>

    <p className="text-xs text-brand-muted leading-relaxed">
      {desc}
    </p>

    <div className="pt-4 border-t border-white/5">
      <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">Outcome</div>
      <div className={cn(
        "text-sm font-bold",
        type === 'best' ? "text-emerald-400" : "text-rose-400"
      )}>{outcome}</div>
    </div>
  </div>
);

export const SimulationView = () => {
  const [activeMonth, setActiveMonth] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMonth((prev) => (prev % 12) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-16 pb-32">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">12-Month Protocol Simulation</h2>
          <p className="text-brand-muted text-lg mt-2">Modeling Adoption, Growth, and Stress-Testing</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-3">
            <Clock className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">Time: Month {activeMonth}</span>
          </div>
        </div>
      </div>

      {/* 1. Timeline Simulation */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">The Evolution Timeline</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MonthStep 
            month="1-3" 
            title="The Genesis" 
            desc="5 early-adopter NGOs onboard impact creators. Focus on pilot projects." 
            actors={["NGOs", "Impact Funds", "Sector Ministries"]} 
            stats={[
              { label: "Impact Creators", value: "5,000" },
              { label: "TVL (Locked)", value: "$5M" },
              { label: "AI Audit Rate", value: "100%" }
            ]}
            active={activeMonth >= 1 && activeMonth <= 3}
          />
          <MonthStep 
            month="4-8" 
            title="The Scaling" 
            desc="Network effects kick in. 50+ NGOs join. 100k+ creators active." 
            actors={["Retail Donors", "Global Impact Fund", "K-ID"]} 
            stats={[
              { label: "Impact Creators", value: "120,000" },
              { label: "TVL (Locked)", value: "$52M" },
              { label: "AI Audit Rate", value: "40%" }
            ]}
            active={activeMonth >= 4 && activeMonth <= 8}
          />
          <MonthStep 
            month="9-12" 
            title="The Maturity" 
            desc="200+ NGOs globally. Expansion into SE Asia and Latin America." 
            actors={["Institutional Bonds", "National Govs", "Forensic DAO"]} 
            stats={[
              { label: "Impact Creators", value: "450,000" },
              { label: "TVL (Locked)", value: "$248M" },
              { label: "AI Audit Rate", value: "5%" }
            ]}
            active={activeMonth >= 9 && activeMonth <= 12}
          />
        </div>
      </section>

      {/* 2. Scenarios */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ScenarioCard 
          type="best" 
          title="The Green Renaissance" 
          desc="99.9% fraud detection. TVL grows 10x. Trust Scores become the global standard for 'Impact Credit'." 
          outcome="Global Operating System for Impact" 
          icon={TrendingUp} 
        />
        <ScenarioCard 
          type="worst" 
          title="The Forensic Winter" 
          desc="A sophisticated 'Deepfake PoI' farm bypasses early models, leading to $2M in fraudulent funding." 
          outcome="Trust Collapse & Regulatory Reset" 
          icon={TrendingDown} 
        />
      </section>

      {/* 3. Breaking Points & Bottlenecks */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-10 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-8">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-brand-accent" />
            <h3 className="text-2xl font-bold">Breaking Points</h3>
          </div>
          <div className="space-y-4">
            {[
              { title: "Validator Saturation", desc: "If PoIs grow 10x faster than high-trust human validators, the 'Ground Truth' loop breaks." },
              { title: "Oracle Failure", desc: "If satellite data providers go offline or are corrupted, the AI loses its primary cross-verification source." },
              { title: "Governance Gridlock", desc: "If the DAO cannot agree on 'Forensic Slashing' for a major NGO, the protocol's integrity is compromised." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 border border-brand-accent/10 rounded-2xl bg-brand-accent/[0.02]">
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-1.5" />
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-1">{item.title}</h4>
                  <p className="text-[10px] text-brand-paper/80 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-8">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-brand-accent" />
            <h3 className="text-2xl font-bold">System Bottlenecks</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <Clock className="w-4 h-4 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Onboarding Friction</h4>
                  <p className="text-[10px] text-brand-muted">NGO vetting currently takes 14 days. Needs to be 48 hours.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <Coins className="w-4 h-4 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">VU Liquidity</h4>
                  <p className="text-[10px] text-brand-muted">If VU demand exceeds supply, interest rates for creators spike.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <Cpu className="w-4 h-4 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">AI Inference Cost</h4>
                  <p className="text-[10px] text-brand-muted">On-chain forensic compute becomes expensive at millions of PoIs/day.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Insights & Improvements */}
      <section className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Target className="w-48 h-48" />
        </div>
        <div className="max-w-3xl space-y-8">
          <h3 className="text-3xl font-bold">Strategic Insights</h3>
          <p className="text-brand-muted text-lg leading-relaxed">
            "Trust is the Product. The protocol's value isn't the money; it's the **certainty** that the money did what it was supposed to do."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-brand-accent/20 rounded-2xl bg-brand-accent/5">
              <h4 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-2">Key Improvement</h4>
              <p className="text-xs text-brand-muted">Move AI inference to a decentralized network (e.g., Akash) to reduce costs and increase transparency.</p>
            </div>
            <div className="p-6 border border-emerald-400/20 rounded-2xl bg-emerald-400/5">
              <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-2">Scaling Strategy</h4>
              <p className="text-xs text-brand-muted">Implement 'Dynamic VU Minting' to ensure liquidity during rapid NGO onboarding phases.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
