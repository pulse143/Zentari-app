import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Fingerprint, 
  MapPin, 
  Copy, 
  Zap,
  ArrowRight,
  Search,
  Activity,
  Cpu
} from 'lucide-react';
import { cn } from '../lib/utils';

interface RiskSignal {
  id: string;
  type: 'fraud' | 'anomaly' | 'verification';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  timestamp: string;
}

const MOCK_SIGNALS: RiskSignal[] = [
  {
    id: 'SIG_001',
    type: 'fraud',
    severity: 'high',
    title: 'Duplicate Evidence Detected',
    description: 'Image hash matches existing record POI_842901 (Indonesia Node). Possible re-submission of historical data.',
    timestamp: '2026-03-26 06:45:12'
  },
  {
    id: 'SIG_002',
    type: 'anomaly',
    severity: 'medium',
    title: 'Suspicious Geo-Data',
    description: 'Metadata coordinates place the device 400km from the reported project site. Variance exceeds protocol tolerance.',
    timestamp: '2026-03-26 06:30:05'
  },
  {
    id: 'SIG_003',
    type: 'verification',
    severity: 'low',
    title: 'Low Resolution Imagery',
    description: 'Satellite capture resolution is below 0.5m/pixel. Confidence score reduced by 8%.',
    timestamp: '2026-03-26 06:15:44'
  }
];

export const RiskAuditView = () => {
  const [selectedSignal, setSelectedSignal] = useState<RiskSignal | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Risk & Audit Layer</h2>
          <p className="text-brand-muted text-sm mt-1">Real-time anomaly detection and fraud prevention</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white/5 border border-brand-border rounded-xl flex items-center gap-3">
            <Activity className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Network Health: 99.8%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left: Global Risk Metrics */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="p-8 border border-brand-border rounded-3xl bg-white/[0.01] space-y-8">
            <div className="space-y-2">
              <span className="mono-label">Global Trust Index</span>
              <div className="text-5xl font-mono font-bold text-brand-accent">94.2</div>
              <div className="h-2 bg-brand-border rounded-full overflow-hidden">
                <div className="h-full bg-brand-accent w-[94.2%]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-brand-border bg-brand-ink/50">
                <span className="text-[9px] text-brand-muted uppercase font-bold tracking-widest block mb-1">Active Alerts</span>
                <div className="text-2xl font-mono font-bold text-yellow-500">14</div>
              </div>
              <div className="p-4 rounded-2xl border border-brand-border bg-brand-ink/50">
                <span className="text-[9px] text-brand-muted uppercase font-bold tracking-widest block mb-1">Fraud Blocked</span>
                <div className="text-2xl font-mono font-bold text-brand-paper">128</div>
              </div>
            </div>

            <div className="pt-6 border-t border-brand-border space-y-4">
              <span className="mono-label">Verification Strength</span>
              <div className="space-y-3">
                {[
                  { label: 'Geospatial', val: 98 },
                  { label: 'Cryptographic', val: 100 },
                  { label: 'AI Visual', val: 86 },
                  { label: 'Consensus', val: 92 }
                ].map(s => (
                  <div key={s.label} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono uppercase">
                      <span>{s.label}</span>
                      <span className="text-brand-muted">{s.val}%</span>
                    </div>
                    <div className="h-1 bg-brand-border rounded-full overflow-hidden">
                      <div className="h-full bg-brand-paper/40" style={{ width: `${s.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border border-brand-accent/20 bg-brand-accent/5 rounded-2xl flex gap-4 items-start">
            <Cpu className="w-5 h-5 text-brand-accent mt-1" />
            <div>
              <h4 className="text-sm font-bold mb-1">AI Sentinel Status</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Scanning 842 nodes. Pattern recognition active for "Sybil Attacks" and "Evidence Recycling".
              </p>
            </div>
          </div>
        </div>

        {/* Right: Signal Feed */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="border border-brand-border rounded-3xl overflow-hidden bg-white/[0.01]">
            <div className="p-6 border-b border-brand-border bg-white/[0.02] flex items-center justify-between">
              <h3 className="text-lg font-bold">Anomaly Feed</h3>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-brand-muted" />
                <input 
                  type="text" 
                  placeholder="Filter signals..." 
                  className="bg-transparent border-none focus:outline-none text-xs font-mono w-32"
                />
              </div>
            </div>
            
            <div className="divide-y divide-brand-border">
              {MOCK_SIGNALS.map(signal => (
                <div 
                  key={signal.id}
                  onClick={() => setSelectedSignal(signal)}
                  className={cn(
                    "p-6 flex items-start gap-6 hover:bg-white/[0.02] transition-all cursor-pointer group",
                    selectedSignal?.id === signal.id && "bg-white/[0.03]"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-xl border",
                    signal.severity === 'high' ? "bg-red-500/10 border-red-500/20 text-red-500" :
                    signal.severity === 'medium' ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-500" :
                    "bg-blue-500/10 border-blue-500/20 text-blue-500"
                  )}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-mono text-brand-muted">{signal.timestamp}</span>
                      <span className="h-1 w-1 bg-brand-border rounded-full" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{signal.id}</span>
                    </div>
                    <h4 className="text-base font-bold mb-2 group-hover:text-brand-accent transition-colors">{signal.title}</h4>
                    <p className="text-sm text-brand-muted leading-relaxed line-clamp-1">{signal.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-muted opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Explainable AI Drill-down */}
          <AnimatePresence mode="wait">
            {selectedSignal ? (
              <motion.div 
                key={selectedSignal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 border border-brand-border rounded-3xl bg-brand-ink/50 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-brand-accent" />
                    <h3 className="text-xl font-bold">Deep Audit Analysis</h3>
                  </div>
                  <button onClick={() => setSelectedSignal(null)} className="text-xs text-brand-muted hover:text-brand-paper uppercase font-bold tracking-widest">Close Analysis</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <span className="mono-label">AI Reasoning</span>
                    <p className="text-sm text-brand-muted leading-relaxed bg-white/5 p-4 rounded-xl border border-brand-border">
                      "The system identified a 98.4% visual similarity between the submitted evidence and a 2024 record from the Indonesian Mangrove Project. Metadata analysis reveals the 'Creation Date' was manually altered in the EXIF data. Trust score for this node has been automatically downgraded by 45 points."
                    </p>
                  </div>
                  <div className="space-y-4">
                    <span className="mono-label">Evidence Forensics</span>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-brand-border">
                        <div className="flex items-center gap-3">
                          <Copy className="w-4 h-4 text-red-500" />
                          <span className="text-xs">Duplicate Hash Detected</span>
                        </div>
                        <span className="text-[10px] font-mono text-red-500">CRITICAL</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-brand-border">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-yellow-500" />
                          <span className="text-xs">Geo-Metadata Mismatch</span>
                        </div>
                        <span className="text-[10px] font-mono text-yellow-500">WARNING</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-brand-border">
                        <div className="flex items-center gap-3">
                          <Fingerprint className="w-4 h-4 text-brand-accent" />
                          <span className="text-xs">Device ID Verified</span>
                        </div>
                        <span className="text-[10px] font-mono text-brand-accent">VALID</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-bold text-sm hover:bg-red-600 transition-all">
                    Blacklist Node
                  </button>
                  <button className="flex-1 py-4 border border-brand-border rounded-2xl font-bold text-sm hover:bg-white/5 transition-all">
                    Request Manual Re-Audit
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-48 border-2 border-dashed border-brand-border rounded-3xl flex flex-col items-center justify-center text-brand-muted space-y-2">
                <Info className="w-8 h-8 opacity-20" />
                <p className="text-sm">Select a signal to initiate deep audit analysis</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
