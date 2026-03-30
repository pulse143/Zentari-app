import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Shield, 
  Zap, 
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
  ChevronRight,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCcw,
  Scale,
  History,
  TrendingUp,
  Coins
} from 'lucide-react';
import { cn } from '../lib/utils';

const TreasuryMetric = ({ label, value, subValue, icon: Icon, color }: any) => (
  <div className="p-6 border border-brand-border rounded-3xl bg-white/[0.01] space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={cn("p-2 rounded-xl bg-white/5", color)}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">{label}</span>
      </div>
      <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
    </div>
    <div className="space-y-1">
      <div className="text-3xl font-bold font-mono tracking-tight">{value}</div>
      <div className="text-[10px] font-mono text-brand-muted">{subValue}</div>
    </div>
  </div>
);

const FundingStep = ({ step, index, active, completed }: any) => (
  <div className={cn(
    "relative flex flex-col items-center gap-4 p-6 border rounded-3xl transition-all duration-500 flex-1",
    active ? "border-brand-accent bg-brand-accent/5 shadow-[0_0_30px_rgba(0,255,0,0.1)]" : 
    completed ? "border-brand-accent/40 bg-brand-accent/5" : "border-brand-border bg-white/[0.02]"
  )}>
    <div className={cn(
      "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500",
      active ? "bg-brand-accent text-brand-ink border-brand-accent" : 
      completed ? "bg-brand-accent/20 text-brand-accent border-brand-accent/30" : "bg-white/5 text-brand-muted border-brand-border"
    )}>
      <step.icon className="w-5 h-5" />
    </div>
    <div className="text-center">
      <h3 className="text-xs font-bold tracking-tight mb-1">{step.title}</h3>
      <span className="text-[9px] font-mono uppercase tracking-widest text-brand-muted">Step 0{index + 1}</span>
    </div>
    {active && (
      <motion.div 
        layoutId="fundingActive"
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-accent text-brand-ink text-[8px] font-bold uppercase tracking-widest rounded-full"
      >
        Processing
      </motion.div>
    )}
  </div>
);

export const TreasuryEngineView = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<any[]>([]);

  const fundingSteps = [
    { title: 'Donor Allocation', icon: ArrowDownToLine },
    { title: 'Treasury Escrow', icon: Lock },
    { title: 'VU Minting', icon: Coins },
    { title: 'Tranche Release', icon: Zap },
    { title: 'Merchant Payout', icon: ArrowUpFromLine }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % fundingSteps.length);
      const step = fundingSteps[activeStep];
      setLogs(prev => [
        { time: new Date().toLocaleTimeString(), msg: `Executing ${step.title}...`, status: 'info' },
        { time: new Date().toLocaleTimeString(), msg: `${step.title} validated on ledger.`, status: 'success' },
        ...prev
      ].slice(0, 6));
    }, 4000);

    return () => clearInterval(interval);
  }, [activeStep]);

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Treasury Engine</h2>
          <p className="text-brand-muted text-sm mt-1">Impact Capital Flow & Monetary Policy Control</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-3">
            <Scale className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Reserve Ratio: 100.00%</span>
          </div>
        </div>
      </div>

      {/* Treasury Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <TreasuryMetric 
          label="Total Value Locked" 
          value="$12.42M" 
          subValue="12,420,000 USDC" 
          icon={Wallet} 
          color="text-brand-accent" 
        />
        <TreasuryMetric 
          label="VU in Circulation" 
          value="8.21M VU" 
          subValue="8,210,000 VU Minted" 
          icon={Coins} 
          color="text-blue-500" 
        />
        <TreasuryMetric 
          label="Liquidity Buffer" 
          value="$621.0K" 
          subValue="5.0% of TVL" 
          icon={RefreshCcw} 
          color="text-purple-500" 
        />
        <TreasuryMetric 
          label="Total Settlements" 
          value="$4.12M" 
          subValue="4,120,000 VU Burned" 
          icon={TrendingUp} 
          color="text-yellow-500" 
        />
      </div>

      {/* Funding Pipeline */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Funding & Redemption Pipeline</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest">Live Flow</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 relative">
          {fundingSteps.map((step, i) => (
            <React.Fragment key={step.title}>
              <FundingStep 
                step={step} 
                index={i} 
                active={activeStep === i}
                completed={i < activeStep}
              />
              {i < fundingSteps.length - 1 && (
                <div className="hidden md:flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-brand-border" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-12 gap-8">
        {/* Monetary Policy & Rules */}
        <div className="col-span-12 xl:col-span-8 space-y-8">
          <section className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Scale className="w-32 h-32" />
            </div>
            <h3 className="text-xl font-bold mb-8">Monetary Policy & Tranche Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  { label: 'Tranche 1: Setup', weight: 20, desc: 'Released on K-ID verification.' },
                  { label: 'Tranche 2: Mid-point', weight: 40, desc: 'Released on PoI Score ≥ 0.75.' },
                  { label: 'Tranche 3: Final', weight: 40, desc: 'Released on PoI Score ≥ 0.90 & Audit.' }
                ].map(item => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                      <span className="text-[10px] font-mono font-bold">{item.weight}%</span>
                    </div>
                    <div className="h-1.5 bg-brand-border rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.weight}%` }}
                        className="h-full bg-brand-accent" 
                      />
                    </div>
                    <p className="text-[10px] text-brand-muted">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 border border-brand-border rounded-2xl bg-brand-ink/50 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-muted">Treasury Backing Rules</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent mt-0.5" />
                    <div>
                      <div className="text-[10px] font-bold text-brand-paper uppercase">1:1 Backing Guarantee</div>
                      <p className="text-[10px] text-brand-muted">Every VU is backed by 1 USD in stablecoin escrow.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent mt-0.5" />
                    <div>
                      <div className="text-[10px] font-bold text-brand-paper uppercase">Double-Spend Prevention</div>
                      <p className="text-[10px] text-brand-muted">Unique cryptographic IDs for every minted VU.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-bold text-yellow-500 uppercase">Liquidity Threshold</div>
                      <p className="text-[10px] text-brand-muted">Issuance halts if reserve ratio drops below 98%.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Settlement Ledger */}
          <section className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-brand-muted" />
                <h3 className="text-xl font-bold">Recent Settlement Ledger</h3>
              </div>
              <div className="px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-lg text-[10px] font-bold text-brand-accent uppercase">
                Immutable Audit Trail
              </div>
            </div>
            <div className="space-y-3">
              {[
                { id: 'SET_9210', type: 'REDEMPTION', amount: '4,200 VU', status: 'SETTLED', node: 'Nairobi_01' },
                { id: 'SET_9211', type: 'MINT', amount: '10,000 VU', status: 'LOCKED', node: 'Lagos_04' },
                { id: 'SET_9212', type: 'TRANCHE_RELEASE', amount: '2,000 VU', status: 'RELEASED', node: 'Kigali_02' }
              ].map(item => (
                <div key={item.id} className="p-4 border border-brand-border rounded-2xl bg-white/[0.02] flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/5 rounded-lg">
                      <Database className="w-4 h-4 text-brand-muted" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-brand-muted">{item.id}</div>
                      <div className="text-xs font-bold uppercase tracking-tight">{item.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold font-mono text-brand-paper">{item.amount}</div>
                    <div className="text-[9px] font-bold text-brand-accent uppercase tracking-widest">{item.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Real-time Audit Logs */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          <div className="p-6 border border-brand-border rounded-3xl bg-white/[0.01] h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest">Real-time Audit Logs</h3>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-brand-accent">Live Feed</span>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {logs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-3 border border-brand-border rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-mono text-brand-muted">{log.time}</span>
                      {log.status === 'success' && <CheckCircle2 className="w-2.5 h-2.5 text-brand-accent" />}
                    </div>
                    <p className="text-[10px] font-mono text-brand-paper/80 leading-tight">
                      {log.msg}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-8 p-6 border border-brand-accent/20 bg-brand-accent/5 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-brand-accent" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Fraud Prevention</span>
              </div>
              <p className="text-[10px] text-brand-muted leading-relaxed">
                The Treasury Agent automatically freezes redemptions from nodes with a **PoI Score &lt; 0.30**. All redemptions over **$10,000** require manual forensic audit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
