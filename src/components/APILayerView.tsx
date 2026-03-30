import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Code2, 
  Zap, 
  Shield, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Database,
  Globe,
  Lock,
  Key,
  Webhook,
  Copy,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const CodeBlock = ({ code, label }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={handleCopy}
          className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-brand-paper/60 hover:text-brand-paper transition-colors"
        >
          {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <div className="p-4 bg-brand-ink/80 border border-brand-border rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto">
        <div className="text-brand-muted mb-2 select-none">// {label}</div>
        <pre className="text-brand-paper/80">{code}</pre>
      </div>
    </div>
  );
};

const APIEndpoint = ({ method, path, desc, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full p-4 border rounded-2xl text-left transition-all group",
      active ? "border-brand-accent bg-brand-accent/5" : "border-brand-border hover:border-brand-border/80 bg-white/[0.01]"
    )}
  >
    <div className="flex items-center gap-3 mb-1">
      <span className={cn(
        "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest",
        method === 'GET' ? "bg-blue-500/20 text-blue-500" : "bg-brand-accent/20 text-brand-accent"
      )}>
        {method}
      </span>
      <span className="text-[11px] font-mono text-brand-paper/80">{path}</span>
    </div>
    <p className="text-[10px] text-brand-muted leading-tight">{desc}</p>
  </button>
);

export const APILayerView = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('submit_evidence');

  const endpoints = [
    { id: 'submit_evidence', method: 'POST', path: '/v1/verification/evidence', desc: 'Submit multi-modal evidence for forensic audit.' },
    { id: 'get_poi', method: 'GET', path: '/v1/poi/:id', desc: 'Retrieve a settled Proof of Impact record.' },
    { id: 'allocate_funding', method: 'POST', path: '/v1/funding/allocations', desc: 'Allocate capital to a specific project or node.' },
    { id: 'node_identity', method: 'POST', path: '/v1/identity/nodes', desc: 'Register a new impact node and K-ID.' },
    { id: 'protocol_analytics', method: 'GET', path: '/v1/analytics/protocol', desc: 'Retrieve global protocol-wide metrics.' }
  ];

  const codeExamples: any = {
    submit_evidence: {
      label: 'Submit Evidence',
      code: `curl https://api.kulimaverse.org/v1/verification/evidence \\
  -H "Authorization: Bearer kv_live_..." \\
  -d '{
    "node_id": "node_921",
    "media_url": "https://s3.amazonaws.com/...",
    "metadata": {
      "gps": "1.292, 36.821",
      "timestamp": "2026-03-26T07:00:00Z"
    }
  }'`
    },
    get_poi: {
      label: 'Retrieve PoI',
      code: `curl https://api.kulimaverse.org/v1/poi/poi_882 \\
  -H "Authorization: Bearer kv_live_..."`
    },
    allocate_funding: {
      label: 'Allocate Funding',
      code: `curl https://api.kulimaverse.org/v1/funding/allocations \\
  -H "Authorization: Bearer kv_live_..." \\
  -d '{
    "donor_id": "donor_11",
    "target_id": "node_921",
    "amount": 10000,
    "currency": "USDC"
  }'`
    },
    node_identity: {
      label: 'Register Node',
      code: `curl https://api.kulimaverse.org/v1/identity/nodes \\
  -H "Authorization: Bearer kv_live_..." \\
  -d '{
    "name": "Nairobi Reforestation",
    "location": { "lat": 1.29, "lng": 36.82 },
    "stake": 5000
  }'`
    },
    protocol_analytics: {
      label: 'Protocol Analytics',
      code: `curl https://api.kulimaverse.org/v1/analytics/protocol \\
  -H "Authorization: Bearer kv_live_..."`
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Developer API</h2>
          <p className="text-brand-muted text-sm mt-1">Programmable Trust: Build on the KulimaVerse Protocol</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-3">
            <Key className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest">API Key: kv_live_92...</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* API Explorer */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          <div className="p-6 border border-brand-border rounded-3xl bg-white/[0.01]">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">API Explorer</h3>
            <div className="space-y-3">
              {endpoints.map((ep) => (
                <APIEndpoint 
                  key={ep.id}
                  {...ep}
                  active={activeEndpoint === ep.id}
                  onClick={() => setActiveEndpoint(ep.id)}
                />
              ))}
            </div>
          </div>

          <div className="p-6 border border-brand-border rounded-3xl bg-white/[0.01] space-y-6">
            <div className="flex items-center gap-3">
              <Webhook className="w-5 h-5 text-brand-muted" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Webhooks</h3>
            </div>
            <div className="space-y-4">
              {[
                { event: 'poi.settled', desc: 'Triggered when a PoI reaches finality.' },
                { event: 'evidence.flagged', desc: 'Triggered when AVE detects an anomaly.' },
                { event: 'node.slashed', desc: 'Triggered when a node is slashed for fraud.' }
              ].map(webhook => (
                <div key={webhook.event} className="p-3 border border-brand-border rounded-xl bg-white/5">
                  <div className="text-[10px] font-mono text-brand-accent mb-1">{webhook.event}</div>
                  <p className="text-[10px] text-brand-muted leading-tight">{webhook.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code & Documentation */}
        <div className="col-span-12 xl:col-span-8 space-y-8">
          <section className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-brand-muted" />
                <h3 className="text-xl font-bold">Request Example</h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-brand-muted uppercase">Language: cURL</span>
                <div className="h-4 w-px bg-brand-border" />
                <span className="text-[10px] font-mono text-brand-muted uppercase">Version: v1.0</span>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeEndpoint}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <CodeBlock 
                  label={codeExamples[activeEndpoint].label}
                  code={codeExamples[activeEndpoint].code}
                />
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 p-6 border border-brand-border rounded-2xl bg-brand-ink/50">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Response Structure</h4>
              <div className="p-4 bg-brand-ink/80 border border-brand-border rounded-xl font-mono text-[11px] text-brand-paper/60">
                {activeEndpoint === 'submit_evidence' ? (
                  <pre>{`{
  "id": "evid_442",
  "status": "processing",
  "estimated_completion": "30s",
  "created_at": "2026-03-26T07:28:39Z"
}`}</pre>
                ) : activeEndpoint === 'get_poi' ? (
                  <pre>{`{
  "id": "poi_882",
  "score": 0.96,
  "tier": "platinum",
  "verified_at": "2026-03-26T07:00:00Z",
  "node_id": "node_921"
}`}</pre>
                ) : (
                  <pre>{`{
  "status": "success",
  "id": "res_9210",
  "object": "event"
}`}</pre>
                )}
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-brand-border rounded-3xl bg-white/[0.01] space-y-3">
              <Lock className="w-5 h-5 text-brand-muted" />
              <h4 className="text-xs font-bold uppercase tracking-widest">Rate Limiting</h4>
              <p className="text-[10px] text-brand-muted leading-relaxed">
                Standard: 100 req/sec.<br />Enterprise: 1000 req/sec.
              </p>
            </div>
            <div className="p-6 border border-brand-border rounded-3xl bg-white/[0.01] space-y-3">
              <Shield className="w-5 h-5 text-brand-muted" />
              <h4 className="text-xs font-bold uppercase tracking-widest">Permissions</h4>
              <p className="text-[10px] text-brand-muted leading-relaxed">
                Scoped keys: read_only, write_impact, admin.
              </p>
            </div>
            <div className="p-6 border border-brand-border rounded-3xl bg-white/[0.01] space-y-3">
              <Globe className="w-5 h-5 text-brand-muted" />
              <h4 className="text-xs font-bold uppercase tracking-widest">Global CDN</h4>
              <p className="text-[10px] text-brand-muted leading-relaxed">
                Low-latency edge nodes in 12 regions globally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
