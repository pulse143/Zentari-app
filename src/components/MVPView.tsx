import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Target, 
  Zap, 
  ShieldCheck, 
  Database, 
  Camera, 
  MapPin, 
  Coins, 
  ArrowRight, 
  ChevronRight, 
  Activity, 
  BarChart3, 
  Cpu, 
  Network, 
  ShieldAlert, 
  Gavel, 
  Briefcase, 
  LineChart, 
  PieChart, 
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
  Calendar,
  Layers,
  Sparkles,
  Smartphone,
  CheckSquare,
  MinusCircle,
  Flag
} from 'lucide-react';
import { cn } from '../lib/utils';

const MVPFeature = ({ title, desc, icon: Icon, status }: any) => (
  <div className="p-6 border border-brand-border rounded-2xl bg-white/[0.01] flex items-start gap-4 transition-all hover:scale-[1.02]">
    <div className="p-2 rounded-lg bg-brand-accent/10 border border-brand-accent/20 text-brand-accent">
      <Icon className="w-4 h-4" />
    </div>
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <h4 className="text-[10px] font-bold uppercase tracking-widest">{title}</h4>
        {status && (
          <span className="px-1.5 py-0.5 bg-brand-accent/20 text-brand-accent text-[7px] font-bold uppercase tracking-widest rounded">
            {status}
          </span>
        )}
      </div>
      <p className="text-[10px] text-brand-paper/80 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const BuildStep = ({ week, title, items, active }: any) => (
  <div className={cn(
    "p-8 border rounded-[2.5rem] transition-all relative overflow-hidden group",
    active ? "bg-brand-accent/5 border-brand-accent/40" : "bg-white/[0.01] border-brand-border opacity-40 grayscale"
  )}>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-4xl font-bold text-brand-accent opacity-20">W{week}</div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">{title}</div>
      </div>
      <div className="space-y-3">
        {items.map((item: string, i: number) => (
          <div key={i} className="flex items-center gap-3 text-[10px] text-brand-paper/80">
            <CheckCircle2 className="w-3 h-3 text-brand-accent" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const MVPView = () => {
  const [activeWeek, setActiveWeek] = useState(1);

  return (
    <div className="space-y-16 pb-32">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Absolute MVP Plan</h2>
          <p className="text-brand-muted text-lg mt-2">The 30-Day Build to Prove Impact Trust</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-3">
            <Rocket className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">Status: Lean</span>
          </div>
        </div>
      </div>

      {/* 1. Core Features (The "Must-Haves") */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">Core MVP Features</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MVPFeature 
            title="Mobile PoI Submission" 
            desc="Simple interface for farmers to upload a photo and capture GPS coordinates." 
            icon={Smartphone} 
            status="Critical"
          />
          <MVPFeature 
            title="Basic AI Verification" 
            desc="Single Gemini model to check if photo matches GPS location and satellite data." 
            icon={Brain} 
            status="Critical"
          />
          <MVPFeature 
            title="The Impact Ledger" 
            desc="A transparent list of verified PoIs and the funding tranches they triggered." 
            icon={Database} 
            status="Critical"
          />
          <MVPFeature 
            title="Manual Tranche Release" 
            desc="A simple admin interface to release funds once the AI gives a green signal." 
            icon={Unlock} 
            status="MVP Only"
          />
          <MVPFeature 
            title="Binary Trust Score" 
            desc="Simple 'Trusted' or 'Pending' status for nodes based on verification history." 
            icon={ShieldCheck} 
            status="MVP Only"
          />
          <MVPFeature 
            title="Donor Dashboard" 
            desc="Basic view for donors to see their funds being allocated to verified impact." 
            icon={Layout} 
            status="MVP Only"
          />
        </div>
      </section>

      {/* 2. What NOT to Build (The "Post-MVP") */}
      <section className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <MinusCircle className="w-48 h-48" />
        </div>
        <div className="max-w-3xl space-y-8">
          <h3 className="text-3xl font-bold">What NOT to Build</h3>
          <p className="text-brand-muted text-lg leading-relaxed">
            To launch in 30 days, we must defer these complex features.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Gavel className="w-5 h-5 text-brand-muted" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Forensic DAO</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                No complex jury system. Use a single admin for now.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Smile className="w-5 h-5 text-brand-muted" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Behavioral Layer</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                No tiers, streaks, or complex nudges. Focus on raw verification.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-brand-muted" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Global Markets</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                No secondary trading of Impact Bonds. Simple direct funding only.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Repeat className="w-5 h-5 text-brand-muted" />
                <h4 className="text-sm font-bold uppercase tracking-widest">AI Retraining</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                No recursive learning loops yet. Use static pre-trained models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 30-Day Build Sequence */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">30-Day Build Sequence</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <BuildStep 
            week="1" 
            title="The Foundation" 
            items={["Setup Express/Vite Stack", "Simple Wallet/Auth", "Impact Ledger Schema"]} 
            active={activeWeek === 1}
          />
          <BuildStep 
            week="2" 
            title="The Capture" 
            items={["Mobile PoI Form", "GPS & Camera APIs", "Verification Queue"]} 
            active={activeWeek === 2}
          />
          <BuildStep 
            week="3" 
            title="The Brain" 
            items={["Gemini Image Analysis", "Satellite Cross-Ref", "Trust Signal Logic"]} 
            active={activeWeek === 3}
          />
          <BuildStep 
            week="4" 
            title="The Loop" 
            items={["Funding Dashboard", "Manual Tranche Release", "Pilot Launch (1 NGO)"]} 
            active={activeWeek === 4}
          />
        </div>
        <div className="flex justify-center gap-4">
          {[1, 2, 3, 4].map((w) => (
            <button 
              key={w}
              onClick={() => setActiveWeek(w)}
              className={cn(
                "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                activeWeek === w ? "bg-brand-accent text-brand-ink" : "bg-white/5 text-brand-muted border border-white/5"
              )}
            >
              Week {w}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Success Metrics */}
      <section className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Flag className="w-48 h-48" />
        </div>
        <div className="max-w-3xl space-y-8">
          <h3 className="text-3xl font-bold">MVP Success Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-brand-accent/20 rounded-2xl bg-brand-accent/5">
              <div className="text-3xl font-bold text-brand-accent mb-2">&lt; 5m</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Verification Speed</div>
              <p className="text-[10px] text-brand-muted mt-2">From submission to AI trust signal.</p>
            </div>
            <div className="p-6 border border-brand-accent/20 rounded-2xl bg-brand-accent/5">
              <div className="text-3xl font-bold text-brand-accent mb-2">90%</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">AI Accuracy</div>
              <p className="text-[10px] text-brand-muted mt-2">Correlation between AI and manual audit.</p>
            </div>
            <div className="p-6 border border-brand-accent/20 rounded-2xl bg-brand-accent/5">
              <div className="text-3xl font-bold text-brand-accent mb-2">&lt; 3</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">User Clicks</div>
              <p className="text-[10px] text-brand-muted mt-2">To submit a high-quality PoI.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
