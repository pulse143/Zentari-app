import React from 'react';
import { Code2, Binary, Database, ShieldCheck, Zap, Cpu, Globe, Share2 } from 'lucide-react';

const APINode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const APIDocumentationView = () => (
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">API Documentation</h2>
      <p className="text-brand-muted text-lg">Integrate with the KulimaVerse protocol.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <APINode icon={Code2} title="REST API" desc="Standard HTTP endpoints for data retrieval and submission." />
      <APINode icon={Binary} title="GraphQL" desc="Flexible queries for complex impact and trust metrics." />
      <APINode icon={Database} title="Webhooks" desc="Real-time notifications for impact events and funding tranches." />
      <APINode icon={Share2} title="SDKs" desc="Native libraries for seamless protocol integration." />
    </div>
    <div className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Code2 className="w-16 h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Interactive API Documentation Loading...</p>
      </div>
    </div>
  </div>
);
