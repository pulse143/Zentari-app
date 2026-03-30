import React from 'react';
import { Globe, MapPin, Activity, Zap, Cpu, ShieldCheck, Database, Network } from 'lucide-react';

const ImpactNode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const GlobalImpactView = () => (
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">Global Impact</h2>
      <p className="text-brand-muted text-lg">The real-world outcomes of the Zentari protocol.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <ImpactNode icon={Globe} title="Geographies" desc="Impact projects active across 50+ countries and 5 continents." />
      <ImpactNode icon={MapPin} title="Sectors" desc="Agriculture, reforestation, water, and education initiatives." />
      <ImpactNode icon={Activity} title="Outcomes" desc="Quantifiable real-world impact verified via forensic AI." />
      <ImpactNode icon={Zap} title="Efficiency" desc="98% reduction in impact-verification costs and overhead." />
    </div>
    <div className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Globe className="w-16 h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Interactive Global Impact Map Loading...</p>
      </div>
    </div>
  </div>
);
