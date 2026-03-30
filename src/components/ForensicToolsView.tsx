import React from 'react';
import { Search, ShieldAlert, Gavel, Briefcase, MapPin, LineChart, PieChart, Activity } from 'lucide-react';

const ForensicNode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const ForensicToolsView = () => (
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">Forensic Tools</h2>
      <p className="text-brand-muted text-lg">The forensic analysis and audit capabilities of Zentari.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <ForensicNode icon={Search} title="Deep Audit" desc="Forensic analysis of evidence metadata and sensor data." />
      <ForensicNode icon={ShieldAlert} title="Fraud Detection" desc="AI-driven detection of duplicate and spoofed evidence." />
      <ForensicNode icon={Gavel} title="Slashing Engine" desc="Automated slashing of node reputation and staked capital." />
      <ForensicNode icon={Briefcase} title="Compliance" desc="Automated compliance and reporting for impact projects." />
    </div>
    <div className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Search className="w-16 h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Forensic Audit Terminal Loading...</p>
      </div>
    </div>
  </div>
);
