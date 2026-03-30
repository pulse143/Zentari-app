import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Database, 
  Link2, 
  Building2, 
  Coins, 
  History, 
  Network,
  Globe,
  Settings,
  UserCheck,
  UserX,
  GitMerge,
  Search,
  Plus,
  ArrowRight,
  ChevronRight,
  Info,
  MousePointer2,
  FileText,
  Gavel,
  Briefcase,
  MapPin,
  LineChart,
  PieChart,
  Activity,
  Scale,
  Wallet,
  ArrowDownRight,
  ArrowUpRight,
  Lock,
  Unlock,
  RefreshCcw,
  Layout,
  Box,
  Share2,
  Rocket,
  Gift,
  Trophy,
  Users
} from 'lucide-react';
import { cn } from '../lib/utils';

const DevTool = ({ title, desc, icon: Icon, color }: any) => (
  <div className={cn("p-8 border rounded-[2.5rem] bg-white/[0.01] space-y-6 relative overflow-hidden group", color)}>
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-brand-accent">
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

    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-accent group-hover:translate-x-1 transition-transform cursor-pointer">
      View Docs <ArrowRight className="w-3 h-3" />
    </div>
  </div>
);

const MarketplaceItem = ({ title, author, price, category, icon: Icon }: any) => (
  <div className="p-6 border border-brand-border rounded-2xl bg-white/[0.01] space-y-4 hover:border-brand-accent/40 transition-colors cursor-pointer group">
    <div className="flex items-center justify-between">
      <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:bg-brand-accent/10 transition-colors">
        <Icon className="w-5 h-5 text-brand-muted group-hover:text-brand-accent" />
      </div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">{category}</div>
    </div>
    <div>
      <div className="text-sm font-bold">{title}</div>
      <div className="text-[9px] text-brand-muted mt-1">by {author}</div>
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-white/5">
      <div className="text-xs font-bold text-brand-accent">{price}</div>
      <div className="px-2 py-1 bg-white/5 rounded-md text-[8px] font-bold uppercase tracking-widest">Install</div>
    </div>
  </div>
);

export const DeveloperEcosystemView = () => {
  return (
    <div className="space-y-16 pb-32">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Developer Ecosystem</h2>
          <p className="text-brand-muted text-lg mt-2">Building the Global Operating System for Impact</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-3">
            <Code2 className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">SDK: v2.4.0</span>
          </div>
        </div>
      </div>

      {/* 1. Infrastructure */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Terminal className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">Developer Infrastructure</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DevTool 
            title="Kulima-JS SDK" 
            desc="A high-level library for integrating PoI submission, Trust Score retrieval, and VU transactions into any app." 
            icon={Box} 
            color="border-brand-accent/40"
          />
          <DevTool 
            title="Forensic API" 
            desc="A REST/gRPC interface for third-party platforms to verify data integrity using the Forensic Agent." 
            icon={Cpu} 
            color="border-brand-accent/20"
          />
          <DevTool 
            title="Identity API" 
            desc="Decentralized identity service (K-ID) for building reputation-based systems with cross-border Trust Scores." 
            icon={UserCheck} 
            color="border-brand-border"
          />
        </div>
      </section>

      {/* 2. Marketplace */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layout className="w-6 h-6 text-brand-muted" />
            <h3 className="text-2xl font-bold">The Impact Marketplace</h3>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-widest text-brand-accent flex items-center gap-2">
            Browse All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MarketplaceItem title="Coral Health ML" author="BlueForensics" price="50 VU / req" category="ML Model" icon={Activity} />
          <MarketplaceItem title="M-Pesa Bridge" author="Safaricom Dev" price="Free" category="Integration" icon={Link2} />
          <MarketplaceItem title="Carbon Minting UI" author="GreenCode" price="500 VU / seat" category="UI Kit" icon={Zap} />
          <MarketplaceItem title="IoT Soil Sensor" author="AgriTech" price="100 VU / device" category="Adapter" icon={Database} />
        </div>
      </section>

      {/* 3. Revenue Sharing */}
      <section className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Share2 className="w-48 h-48" />
        </div>
        <div className="max-w-3xl space-y-8">
          <h3 className="text-3xl font-bold">The 80/20 Impact Split</h3>
          <p className="text-brand-muted text-lg leading-relaxed">
            We believe developers should keep the majority of the value they create. Our decentralized revenue sharing model is hardcoded into the protocol.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Rocket className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">80% Developer</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Developers keep 80% of all fees generated by their tools, models, or integrations.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">10% Treasury</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                10% goes to the protocol treasury for core maintenance and forensic model training.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Network className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">10% Validators</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                10% is distributed to the validators who verify data processed by the developer's tool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Incentives & Growth */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-10 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-8">
          <div className="flex items-center gap-3">
            <Gift className="w-6 h-6 text-brand-accent" />
            <h3 className="text-2xl font-bold">Developer Incentives</h3>
          </div>
          <div className="space-y-4">
            {[
              { title: "Impact Grants", desc: "VU-denominated grants for building critical protocol infrastructure." },
              { title: "Bounty Program", desc: "Rewards for identifying and patching potential fraud vectors." },
              { title: "Reputation Mining", desc: "Earn 'Dev-Trust' scores to gain governance weight in the DAO." },
              { title: "Early Access", desc: "Beta access to new forensic models and protocol features." }
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
            <Trophy className="w-6 h-6 text-brand-accent" />
            <h3 className="text-2xl font-bold">Why Zentari?</h3>
          </div>
          <div className="space-y-6">
            <p className="text-xs text-brand-muted leading-relaxed">
              Developers choose Zentari because it provides the **Economic Plumbing** and **Forensic Trust** that other protocols lack.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <ShieldCheck className="w-4 h-4 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Forensic Advantage</h4>
                  <p className="text-[10px] text-brand-muted">Access the world's most advanced decentralized fraud detection engine.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <Coins className="w-4 h-4 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Economic Plumbing</h4>
                  <p className="text-[10px] text-brand-muted">Instant access to impact capital markets and local merchant networks.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <Users className="w-4 h-4 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Built-in Trust</h4>
                  <p className="text-[10px] text-brand-muted">Leverage a pre-existing network of verified actors and high-integrity data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Onboarding Flow */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Rocket className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">Developer Onboarding</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border border-brand-border rounded-[2rem] bg-white/[0.01] space-y-4">
            <div className="text-4xl font-bold text-brand-accent opacity-20">01</div>
            <h4 className="text-lg font-bold">The Sandbox</h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Risk-free testnet environment with "Mock Impact" data and test VUs to build and test your apps.
            </p>
          </div>
          <div className="p-8 border border-brand-border rounded-[2rem] bg-white/[0.01] space-y-4">
            <div className="text-4xl font-bold text-brand-accent opacity-20">02</div>
            <h4 className="text-lg font-bold">Impact Blueprints</h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Pre-built templates for common use cases like reforestation trackers and fair trade supply chains.
            </p>
          </div>
          <div className="p-8 border border-brand-border rounded-[2rem] bg-white/[0.01] space-y-4">
            <div className="text-4xl font-bold text-brand-accent opacity-20">03</div>
            <h4 className="text-lg font-bold">Forensic Lab</h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Test your own data against the protocol's fraud detection models before going live on mainnet.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
