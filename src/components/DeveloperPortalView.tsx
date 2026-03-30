import React from 'react';
import { Code, Terminal, Database, Cpu, Zap, Globe, Network, Activity } from 'lucide-react';

const DevNode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const DeveloperPortalView = () => (
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">Developer Portal</h2>
      <p className="text-brand-muted text-lg">Build on the Zentari Trust & Impact Protocol.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <DevNode icon={Code} title="SDKs" desc="TypeScript, Python, and Rust SDKs for building impact apps." />
      <DevNode icon={Terminal} title="CLI" desc="A powerful CLI for managing nodes and evidence submission." />
      <DevNode icon={Database} title="API" desc="Comprehensive REST and GraphQL APIs for impact data." />
      <DevNode icon={Cpu} title="Smart Contracts" desc="Deploy custom impact logic on the Zentari protocol." />
    </div>
    <div className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Code className="w-16 h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Developer Documentation Loading...</p>
      </div>
    </div>
  </div>
);
