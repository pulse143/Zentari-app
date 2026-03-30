import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertCircle, 
  ShieldAlert, 
  RefreshCcw, 
  CheckCircle2, 
  XCircle, 
  Info, 
  ArrowRight,
  Database,
  Lock,
  Zap,
  Activity,
  Search,
  FileWarning,
  Scale,
  History,
  Terminal
} from 'lucide-react';
import { cn } from '../lib/utils';

const FailureCard = ({ title, scenario, microcopy, systemAction, recovery, icon: Icon, color }: any) => (
  <div className={cn("p-8 border rounded-[2.5rem] bg-white/[0.01] space-y-8 relative overflow-hidden", color)}>
    <div className="absolute top-0 right-0 p-8 opacity-5">
      <Icon className="w-32 h-32" />
    </div>
    
    <div className="flex items-center gap-4">
      <div className={cn("p-3 rounded-2xl bg-white/5 border", color)}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        <p className="text-[10px] font-mono uppercase tracking-widest opacity-60">Scenario: {scenario}</p>
      </div>
    </div>

    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">User Interface / Microcopy</span>
        <div className="p-4 border border-white/10 bg-white/5 rounded-2xl font-mono text-xs leading-relaxed italic">
          "{microcopy}"
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">System Response</span>
          <div className="p-4 border border-white/5 bg-brand-ink/50 rounded-2xl space-y-2">
            {systemAction.map((action: string, i: number) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1 h-1 bg-brand-muted rounded-full mt-1.5 shrink-0" />
                <p className="text-[10px] text-brand-muted leading-tight">{action}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Recovery Path</span>
          <div className="p-4 border border-brand-accent/20 bg-brand-accent/5 rounded-2xl space-y-2">
            {recovery.map((step: string, i: number) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-brand-accent mt-0.5 shrink-0" />
                <p className="text-[10px] text-brand-paper/80 leading-tight">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const FailureScenariosView = () => {
  return (
    <div className="space-y-16 pb-32">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Failure Scenarios</h2>
          <p className="text-brand-muted text-lg mt-2">Edge Cases, Forensic Alerts & Recovery Protocols</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-500">Resilience Protocol Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <FailureCard 
          title="Failed Verification"
          scenario="Incomplete Evidence Metadata"
          microcopy="Evidence Audit Incomplete: Metadata mismatch detected in GPS coordinates. Please resubmit high-resolution evidence with active location services."
          systemAction={[
            "PoI Score set to 0.00 for current event.",
            "VU tranche remains locked in escrow.",
            "Node status set to 'Action Required'."
          ]}
          recovery={[
            "User prompted to re-upload evidence.",
            "System provides metadata checklist.",
            "Automatic re-audit upon submission."
          ]}
          icon={FileWarning}
          color="border-yellow-500/20"
        />

        <FailureCard 
          title="Fraudulent Evidence"
          scenario="Malicious Intent / Deepfake Detection"
          microcopy="Forensic Audit Alert: Image fingerprint matches existing record [ID_8821]. Node stake has been frozen pending manual review. Access to Treasury redemptions is suspended."
          systemAction={[
            "Node K-ID added to High Risk cluster.",
            "Staked capital moved to Slashing Escrow.",
            "Broadcast fraud.detected event to network."
          ]}
          recovery={[
            "Submit Forensic Appeal for manual review.",
            "Independent Validator Node audit (3 nodes).",
            "Evidence of physical presence required."
          ]}
          icon={ShieldAlert}
          color="border-red-500/20"
        />

        <FailureCard 
          title="Low Trust Score"
          scenario="Performance Decay / Data Discrepancies"
          microcopy="Trust Score: 0.42 (Below Threshold). Node is currently ineligible for new funding allocations. Improve evidence precision to restore status."
          systemAction={[
            "Node removed from Active Allocation pool.",
            "Current funding tranches paused.",
            "Node visibility restricted in Public Ledger."
          ]}
          recovery={[
            "Complete 3 consecutive Perfect Verifications.",
            "Maintain PoI > 0.95 for 30 days.",
            "Restoration of status after audit."
          ]}
          icon={Activity}
          color="border-brand-border"
        />

        <FailureCard 
          title="Funding Rejection"
          scenario="Treasury Reserve Ratio Constraint"
          microcopy="Allocation Paused: Protocol Reserve Ratio is currently 97.8%. New VU issuance is suspended until treasury rebalancing is complete (Est. 4h)."
          systemAction={[
            "Transaction queued in pending pool.",
            "VU minting engine suspended.",
            "Trigger secondary asset liquidation."
          ]}
          recovery={[
            "Opt-in to Auto-Allocate queue.",
            "Wait for Reserve Ratio to return to 100%.",
            "Manual re-execution after rebalance."
          ]}
          icon={Scale}
          color="border-brand-border"
        />

        <FailureCard 
          title="System Errors"
          scenario="Infrastructure Sync / Network Load"
          microcopy="Infrastructure Sync in Progress: The Forensic Audit engine is currently processing a high volume of records. Your submission is queued and secured. Real-time updates will resume shortly."
          systemAction={[
            "Incoming evidence buffered in secure queue.",
            "System enters Read-Only mode for ledger.",
            "Automatic retry logic for failed API calls."
          ]}
          recovery={[
            "No user action required.",
            "System automatically processes queue.",
            "Notification sent upon sync completion."
          ]}
          icon={RefreshCcw}
          color="border-brand-border"
        />
      </div>

      {/* Trust Maintenance Section */}
      <section className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <History className="w-48 h-48" />
        </div>
        <div className="max-w-3xl space-y-8">
          <h3 className="text-3xl font-bold">Maintaining Trust During Failure</h3>
          <p className="text-brand-muted text-lg leading-relaxed">
            Zentari maintains trust through **Deterministic Resilience**. We do not hide failure; we document it as part of the protocol's history.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Immutable Logging</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Every failure and the reason for it is logged on the ledger. This creates a transparent history of how the protocol handles anomalies.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Escrow Protection</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                In case of doubt, funds are always held in escrow rather than being lost or released. The Treasury prioritizes capital safety over speed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
