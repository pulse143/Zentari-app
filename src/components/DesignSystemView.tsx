import React from 'react';
import { Layout, Box, ShieldCheck, Zap, Cpu, Globe, Database, Network } from 'lucide-react';

const DesignNode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const DesignSystemView = () => (
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">Design System</h2>
      <p className="text-brand-muted text-lg">The visual language of the Zentari protocol.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <DesignNode icon={Layout} title="Layout" desc="Minimal, generous, and uncluttered spacing for radical clarity." />
      <DesignNode icon={Box} title="Components" desc="Modular, component-driven architecture for seamless scalability." />
      <DesignNode icon={ShieldCheck} title="Typography" desc="Clean, modern sans-serif fonts for professional trust." />
      <DesignNode icon={Zap} title="Interactions" desc="Smooth transitions and subtle micro-interactions for a powerful feel." />
    </div>
    <div className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Layout className="w-16 h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Interactive Design System Explorer Loading...</p>
      </div>
    </div>
  </div>
);
