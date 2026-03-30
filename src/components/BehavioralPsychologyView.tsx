import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smile, 
  Frown, 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  TrendingUp, 
  Award, 
  Trophy, 
  Star, 
  Target, 
  Activity, 
  Lock, 
  Unlock, 
  Coins, 
  Users, 
  Heart, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight, 
  MousePointer2, 
  Info, 
  Gavel, 
  Scale, 
  Eye, 
  Search, 
  Plus, 
  RefreshCcw, 
  Layers, 
  Binary, 
  Brain, 
  Cpu, 
  Rocket, 
  Gift, 
  Briefcase, 
  MapPin, 
  LineChart, 
  PieChart, 
  Activity as ActivityIcon, 
  Wallet, 
  ArrowDownRight, 
  ArrowUpRight, 
  Layout, 
  Box, 
  Share2, 
  Network, 
  Globe, 
  Settings, 
  UserCheck, 
  UserX, 
  GitMerge, 
  Repeat, 
  Microscope
} from 'lucide-react';
import { cn } from '../lib/utils';

const TrustTier = ({ tier, score, label, benefits, active }: any) => (
  <div className={cn(
    "p-8 border rounded-[2.5rem] transition-all relative overflow-hidden group",
    active ? "bg-brand-accent/5 border-brand-accent/40" : "bg-white/[0.01] border-brand-border opacity-40 grayscale"
  )}>
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
      <Trophy className="w-32 h-32" />
    </div>
    
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
            <Star className="w-6 h-6 text-brand-accent" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">{tier}</h3>
            <div className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Score: {score}</div>
          </div>
        </div>
        {active && (
          <div className="px-3 py-1 bg-brand-accent text-brand-ink text-[8px] font-bold uppercase tracking-widest rounded-full">
            Current Tier
          </div>
        )}
      </div>

      <p className="text-xs text-brand-paper/80 leading-relaxed font-bold uppercase tracking-widest">
        {label}
      </p>

      <div className="space-y-3">
        {benefits.map((benefit: string, i: number) => (
          <div key={i} className="flex items-center gap-3 text-[10px] text-brand-muted">
            <CheckCircle2 className="w-3 h-3 text-brand-accent" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Nudge = ({ title, desc, icon: Icon, type }: any) => (
  <div className={cn(
    "p-6 border rounded-2xl flex items-start gap-4 transition-all hover:scale-[1.02]",
    type === 'positive' ? "bg-emerald-400/5 border-emerald-400/20" : "bg-brand-accent/5 border-brand-accent/20"
  )}>
    <div className={cn(
      "p-2 rounded-lg border",
      type === 'positive' ? "bg-emerald-400/10 border-emerald-400/20 text-emerald-400" : "bg-brand-accent/10 border-brand-accent/20 text-brand-accent"
    )}>
      <Icon className="w-4 h-4" />
    </div>
    <div className="space-y-1">
      <h4 className="text-[10px] font-bold uppercase tracking-widest">{title}</h4>
      <p className="text-[10px] text-brand-paper/80 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export const BehavioralPsychologyView = () => {
  const [trustScore, setTrustScore] = useState(0.68);
  const [activeTier, setActiveTier] = useState('Harvest');

  return (
    <div className="space-y-16 pb-32">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Behavioral Psychology Layer</h2>
          <p className="text-brand-muted text-lg mt-2">Designing Trust Through Incentives and Nudges</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-3">
            <Smile className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">Status: Aligned</span>
          </div>
        </div>
      </div>

      {/* 1. Trust Score Dashboard (The Motivator) */}
      <section className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <TrendingUp className="w-48 h-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold">Your Trust Identity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                <span>Trust Score</span>
                <span>{trustScore} / 1.00</span>
              </div>
              <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${trustScore * 100}%` }}
                  className="h-full bg-brand-accent rounded-full shadow-[0_0_20px_rgba(242,125,38,0.4)]"
                />
              </div>
              <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-brand-accent">
                <span>Harvest Tier</span>
                <span>0.22 more to Guardian</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-white/5 rounded-2xl bg-white/5">
                <div className="text-[9px] font-bold uppercase tracking-widest text-brand-muted mb-1">Impact Streak</div>
                <div className="text-lg font-bold flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  12 Days
                </div>
              </div>
              <div className="p-4 border border-white/5 rounded-2xl bg-white/5">
                <div className="text-[9px] font-bold uppercase tracking-widest text-brand-muted mb-1">Global Rank</div>
                <div className="text-lg font-bold flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-brand-accent" />
                  #420
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 border border-brand-accent/20 rounded-[2rem] bg-brand-accent/5 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-accent">Next Unlock: Guardian</h4>
            <div className="space-y-4">
              {[
                "Instant Tranche Release (0s delay)",
                "Zero Collateral Participation",
                "Governance Voting Multiplier (2x)",
                "Impact Alpha Featured Status"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-brand-paper/80">
                  <Lock className="w-3 h-3 text-brand-muted" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Tiers */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">Trust Progression Tiers</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <TrustTier 
            tier="Seed" 
            score="0.0 - 0.3" 
            label="New Entrant" 
            benefits={["100% Audit Rate", "High Collateral", "Standard Funding"]} 
            active={false} 
          />
          <TrustTier 
            tier="Sprout" 
            score="0.3 - 0.6" 
            label="Verified History" 
            benefits={["50% Audit Rate", "Moderate Collateral", "Standard Funding"]} 
            active={false} 
          />
          <TrustTier 
            tier="Harvest" 
            score="0.6 - 0.9" 
            label="Proven Reliability" 
            benefits={["10% Audit Rate", "Low Collateral", "Priority Funding"]} 
            active={true} 
          />
          <TrustTier 
            tier="Guardian" 
            score="0.9 - 1.0" 
            label="Protocol Pillar" 
            benefits={["0% Audit Rate", "Zero Collateral", "Instant Funding"]} 
            active={false} 
          />
        </div>
      </section>

      {/* 3. Subtle Nudges & Feedback */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <MousePointer2 className="w-6 h-6 text-brand-muted" />
            <h3 className="text-2xl font-bold">Subtle Nudges</h3>
          </div>
          <div className="space-y-4">
            <Nudge 
              title="Data Density Boost" 
              desc="High-trust nodes in Zambia usually include 3+ photos. Adding one more could boost your Trust Score by 0.05." 
              icon={Sparkles} 
              type="positive" 
            />
            <Nudge 
              title="Audit Warning" 
              desc="Your last PoI had a 15% variance from satellite data. High variance can lead to a reputation decay of 0.10." 
              icon={ShieldAlert} 
              type="negative" 
            />
            <Nudge 
              title="Social Proof" 
              desc="1,200 investors are currently watching your project. High-quality data increases your 'Impact Alpha' by 2%." 
              icon={Users} 
              type="positive" 
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <RefreshCcw className="w-6 h-6 text-brand-muted" />
            <h3 className="text-2xl font-bold">Feedback Loops</h3>
          </div>
          <div className="space-y-4">
            <div className="p-6 border border-brand-border rounded-2xl bg-white/[0.01] space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Last PoI Verification</div>
                <div className="text-[10px] font-bold text-emerald-400">+5 VU Reward</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-400/10 border border-emerald-400/20">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-bold">99.8% Confidence Match</div>
                  <p className="text-[10px] text-brand-muted">Forensic Agent validated your data against 3 independent sources.</p>
                </div>
              </div>
            </div>
            <div className="p-6 border border-brand-border rounded-2xl bg-white/[0.01] space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Reputation Update</div>
                <div className="text-[10px] font-bold text-brand-accent">+0.02 Trust</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-brand-accent/10 border border-brand-accent/20">
                  <TrendingUp className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <div className="text-sm font-bold">Tier Progress: 78%</div>
                  <p className="text-[10px] text-brand-muted">You are 2 high-quality submissions away from 'Guardian' status.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The "Stick": Fraud Discouragement */}
      <section className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Gavel className="w-48 h-48" />
        </div>
        <div className="max-w-3xl space-y-8">
          <h3 className="text-3xl font-bold">Discouraging Fraud</h3>
          <p className="text-brand-muted text-lg leading-relaxed">
            The protocol makes fraud economically and socially irrational.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Forensic Slashing</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Confirmed fraud results in immediate loss of staked VUs and a permanent Trust Score reset.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <UserX className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Shadow Audit</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Low-trust nodes are subjected to 5x more forensic scrutiny without their knowledge.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Public Red-Flag</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Repeated failures trigger a "Forensic Warning" on the node's public profile, blocking funding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. UI Reinforcement Patterns */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Layout className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">UI Reinforcement Patterns</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border border-brand-border rounded-[2rem] bg-white/[0.01] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center shadow-[0_0_15px_rgba(242,125,38,0.3)]">
                <UserCheck className="w-5 h-5 text-brand-accent" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest">The Trust Halo</h4>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              Guardian-tier nodes receive a subtle visual glow, signaling their elite status to the entire network.
            </p>
          </div>
          <div className="p-8 border border-brand-border rounded-[2rem] bg-white/[0.01] space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <Heart className="w-5 h-5 text-rose-400" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest">Impact Gratitude</h4>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              "Your data is helping 1,200 investors trust this project. Keep it up!" - Emotional reinforcement.
            </p>
          </div>
          <div className="p-8 border border-brand-border rounded-[2rem] bg-white/[0.01] space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <Unlock className="w-5 h-5 text-brand-accent" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest">Unlock Preview</h4>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              Always showing the next benefit the user is working toward to maintain motivation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
