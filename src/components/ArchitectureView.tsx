import React from 'react';
import { motion } from 'motion/react';
import { 
  Server, 
  Cpu, 
  Database, 
  Shield, 
  Zap, 
  Globe, 
  Layers, 
  ArrowRight,
  Activity,
  Box,
  Share2
} from 'lucide-react';
import { cn } from '../lib/utils';

const ServiceNode = ({ title, icon: Icon, description, inputs, outputs }: any) => (
  <div className="p-6 border border-brand-border rounded-2xl bg-white/[0.02] hover:border-brand-accent/30 transition-all group">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-brand-accent/10 rounded-xl group-hover:bg-brand-accent/20 transition-colors">
        <Icon className="w-6 h-6 text-brand-accent" />
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
    <p className="text-xs text-brand-muted leading-relaxed mb-6">{description}</p>
    
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <span className="text-[9px] font-bold uppercase tracking-widest text-brand-paper/40">Inputs</span>
        <div className="flex flex-wrap gap-1.5">
          {inputs.map((i: string) => (
            <span key={i} className="px-2 py-0.5 bg-white/5 rounded text-[9px] font-mono">{i}</span>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <span className="text-[9px] font-bold uppercase tracking-widest text-brand-paper/40">Outputs</span>
        <div className="flex flex-wrap gap-1.5">
          {outputs.map((o: string) => (
            <span key={o} className="px-2 py-0.5 bg-brand-accent/10 text-brand-accent rounded text-[9px] font-mono">{o}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const ArchitectureView = () => {
  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Technical Architecture</h2>
          <p className="text-brand-muted text-sm mt-1">AI-Native Protocol Infrastructure Specification</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-3">
            <Activity className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Orchestrator: ACTIVE</span>
          </div>
        </div>
      </div>

      {/* System Diagram Visualization */}
      <section className="p-10 border border-brand-border rounded-[2.5rem] bg-white/[0.01] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#00FF00 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <div className="relative z-10 flex flex-col items-center gap-12">
          <div className="px-8 py-4 border border-brand-accent/40 bg-brand-accent/10 rounded-2xl backdrop-blur-md">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-brand-accent">Frontend Layer (React/Vite)</span>
          </div>

          <ArrowRight className="w-6 h-6 text-brand-muted rotate-90" />

          <div className="w-full max-w-2xl p-8 border border-brand-border bg-brand-ink/80 rounded-3xl flex flex-col items-center gap-6 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-brand-paper" />
              <span className="text-sm font-bold uppercase tracking-widest">API Gateway & Agent Orchestrator</span>
            </div>
            <div className="w-full h-px bg-brand-border" />
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-brand-border">
                  <Cpu className="w-6 h-6 text-brand-accent" />
                </div>
                <span className="text-[10px] font-mono">Gemini 3 Flash</span>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-muted" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-brand-border">
                  <Box className="w-6 h-6 text-brand-paper" />
                </div>
                <span className="text-[10px] font-mono">Microservices</span>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-muted" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-brand-border">
                  <Database className="w-6 h-6 text-brand-muted" />
                </div>
                <span className="text-[10px] font-mono">Firestore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ServiceNode 
          title="K-ID Identity"
          icon={Shield}
          description="Cryptographic identity management for nodes, donors, and auditors using DID standards."
          inputs={['Public Key', 'Auth Token']}
          outputs={['K-ID JWT', 'DID Doc']}
        />
        <ServiceNode 
          title="PoI Engine"
          icon={Layers}
          description="Transforms raw multi-modal evidence (images, GPS) into structured, hash-verified impact claims."
          inputs={['Raw Evidence', 'GPS']}
          outputs={['Impact Claim', 'Hash']}
        />
        <ServiceNode 
          title="Verification Engine"
          icon={Zap}
          description="Multi-stage AI verification using Gemini to cross-reference evidence with satellite and historical data."
          inputs={['Claim', 'History']}
          outputs={['Trust Score', 'Proof']}
        />
        <ServiceNode 
          title="Funding Engine"
          icon={Server}
          description="Manages capital allocation logic, milestone tracking, and algorithmic release triggers."
          inputs={['Trust Score', 'Allocation']}
          outputs={['Release Trigger']}
        />
        <ServiceNode 
          title="Treasury Engine"
          icon={Database}
          description="Final settlement and protocol-wide ledger management with cryptographic integrity."
          inputs={['Release Trigger', 'Sig']}
          outputs={['Receipt', 'Ledger State']}
        />
        <ServiceNode 
          title="Agent Orchestrator"
          icon={Cpu}
          description="The system brain. Coordinates between engines and manages real-time AI Sentinel insights."
          inputs={['Events', 'Intents']}
          outputs={['Commands', 'UI State']}
        />
      </div>

      {/* Data Flow Sequence */}
      <section className="p-8 border border-brand-border rounded-3xl bg-white/[0.01]">
        <h3 className="text-xl font-bold mb-8">Critical Data Flow: Evidence → Funding</h3>
        <div className="flex flex-col md:flex-row items-center gap-4">
          {[
            { label: 'Capture', desc: 'Raw Data' },
            { label: 'Claim', desc: 'PoI Engine' },
            { label: 'Audit', desc: 'AI Verification' },
            { label: 'Score', desc: 'Trust Vector' },
            { label: 'Release', desc: 'Treasury' }
          ].map((step, i, arr) => (
            <React.Fragment key={step.label}>
              <div className="flex-1 w-full p-4 border border-brand-border rounded-xl bg-white/5 text-center">
                <div className="text-[10px] font-mono text-brand-accent mb-1">0{i+1}</div>
                <div className="text-sm font-bold mb-1">{step.label}</div>
                <div className="text-[10px] text-brand-muted uppercase">{step.desc}</div>
              </div>
              {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-brand-muted hidden md:block" />}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
};
