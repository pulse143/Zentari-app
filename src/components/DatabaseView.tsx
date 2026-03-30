import React from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  Table, 
  Layers, 
  Shield, 
  Zap, 
  Activity, 
  ArrowRight,
  Lock,
  Search,
  Key,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';

const SchemaTable = ({ title, type, description, fields }: any) => (
  <div className="p-6 border border-brand-border rounded-2xl bg-white/[0.02] hover:border-brand-accent/30 transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-lg",
          type === 'PostgreSQL' ? "bg-blue-500/10 text-blue-500" : "bg-brand-accent/10 text-brand-accent"
        )}>
          {type === 'PostgreSQL' ? <Database className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
        </div>
        <div>
          <h3 className="text-base font-bold">{title}</h3>
          <span className="text-[9px] font-mono uppercase tracking-widest text-brand-muted">{type}</span>
        </div>
      </div>
      <div className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-mono text-brand-muted">
        {fields.length} Fields
      </div>
    </div>
    
    <p className="text-[11px] text-brand-muted leading-relaxed mb-6">{description}</p>
    
    <div className="space-y-2">
      {fields.map((field: any) => (
        <div key={field.name} className="flex items-center justify-between p-2 rounded bg-white/[0.02] border border-brand-border/50 group-hover:border-brand-border transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-brand-paper">{field.name}</span>
            {field.pk && <Key className="w-2.5 h-2.5 text-yellow-500" />}
            {field.fk && <ArrowRight className="w-2.5 h-2.5 text-brand-muted" />}
          </div>
          <span className="text-[9px] font-mono text-brand-muted uppercase">{field.type}</span>
        </div>
      ))}
    </div>
  </div>
);

export const DatabaseView = () => {
  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Database Architecture</h2>
          <p className="text-brand-muted text-sm mt-1">Hybrid Relational & Real-time Schema Specification</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white/5 border border-brand-border rounded-xl flex items-center gap-3">
            <Lock className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest">RLS: ENABLED</span>
          </div>
        </div>
      </div>

      {/* Hybrid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 border border-blue-500/20 bg-blue-500/5 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold">PostgreSQL Core</h3>
          </div>
          <p className="text-sm text-brand-muted leading-relaxed">
            Relational backbone for financial integrity, identity management, and structured project states. ACID compliant for high-stakes transactions.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Users', 'K-ID Profiles', 'Projects', 'Transactions', 'Allocations'].map(t => (
              <span key={t} className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded text-[9px] font-bold uppercase tracking-widest">{t}</span>
            ))}
          </div>
        </div>

        <div className="p-8 border border-brand-accent/20 bg-brand-accent/5 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-brand-accent" />
            <h3 className="text-xl font-bold">Firestore Real-time</h3>
          </div>
          <p className="text-sm text-brand-muted leading-relaxed">
            Low-latency document store for high-frequency evidence streams, AI agent logs, and live impact feeds. Horizontally scalable.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Evidence', 'PoI Records', 'Agent Logs', 'Vouchers'].map(t => (
              <span key={t} className="px-2 py-1 bg-brand-accent/10 text-brand-accent rounded text-[9px] font-bold uppercase tracking-widest">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Schema Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <SchemaTable 
          title="users"
          type="PostgreSQL"
          description="Core identity and authentication records."
          fields={[
            { name: 'id', type: 'uuid', pk: true },
            { name: 'email', type: 'varchar', unique: true },
            { name: 'role', type: 'enum' },
            { name: 'created_at', type: 'timestamp' }
          ]}
        />
        <SchemaTable 
          title="k_id_profiles"
          type="PostgreSQL"
          description="Cryptographic identity and trust score state."
          fields={[
            { name: 'id', type: 'uuid', pk: true },
            { name: 'user_id', type: 'uuid', fk: true },
            { name: 'public_key', type: 'text' },
            { name: 'trust_score', type: 'decimal' }
          ]}
        />
        <SchemaTable 
          title="evidence"
          type="Firestore"
          description="Raw multi-modal evidence submissions."
          fields={[
            { name: 'projectId', type: 'string', fk: true },
            { name: 'actorId', type: 'string', fk: true },
            { name: 'storageUrl', type: 'string' },
            { name: 'hash', type: 'string' }
          ]}
        />
        <SchemaTable 
          title="poi_records"
          type="Firestore"
          description="Verified Proof of Impact records."
          fields={[
            { name: 'evidenceId', type: 'string', fk: true },
            { name: 'impactValue', type: 'number' },
            { name: 'trustScore', type: 'number' },
            { name: 'status', type: 'enum' }
          ]}
        />
        <SchemaTable 
          title="transactions"
          type="PostgreSQL"
          description="Financial settlement and capital flow."
          fields={[
            { name: 'id', type: 'uuid', pk: true },
            { name: 'from_id', type: 'uuid', fk: true },
            { name: 'to_id', type: 'uuid', fk: true },
            { name: 'amount', type: 'decimal' }
          ]}
        />
        <SchemaTable 
          title="agent_logs"
          type="Firestore"
          description="AI Sentinel and Orchestrator activity logs."
          fields={[
            { name: 'agentId', type: 'string' },
            { name: 'action', type: 'string' },
            { name: 'context', type: 'map' },
            { name: 'timestamp', type: 'timestamp' }
          ]}
        />
      </div>

      {/* Example Record Visualization */}
      <section className="p-8 border border-brand-border rounded-3xl bg-white/[0.01]">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-5 h-5 text-brand-muted" />
          <h3 className="text-xl font-bold">Example PoI Record (Firestore)</h3>
        </div>
        <div className="p-6 bg-brand-ink/80 border border-brand-border rounded-2xl font-mono text-xs leading-relaxed overflow-x-auto">
          <pre className="text-brand-paper/80">
{`{
  "id": "POI_842901",
  "evidenceId": "EVID_9921",
  "projectId": "REFOREST_GLOBAL",
  "impactValue": 1250.50,
  "trustScore": 98.4,
  "aiAnalysis": "Visual confirmation of 1,200 mangrove saplings. Hash verified.",
  "status": "verified",
  "timestamp": "2026-03-26T06:45:12Z"
}`}
          </pre>
        </div>
      </section>
    </div>
  );
};
