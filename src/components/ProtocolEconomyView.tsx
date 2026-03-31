import React from 'react';
import { Coins, Wallet, BarChart3, PieChart, Activity, Zap, Cpu, ShieldCheck } from 'lucide-react';

const EconomyNode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const ProtocolEconomyView = () => (
  <div className="space-y-8 md:space-y-12">
    <div className="space-y-2 md:space-y-3">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Protocol Economy</h2>
      <p className="text-brand-muted text-base md:text-lg">The tokenomics and capital flows of Zentari.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      <EconomyNode icon={Coins} title="VU Token" desc="The unit of impact, minted upon verification and burned upon funding." />
      <EconomyNode icon={Wallet} title="Capital Flow" desc="Direct funding tranches released via smart contracts." />
      <EconomyNode icon={BarChart3} title="Market Depth" desc="Liquidity and trading of impact bonds and VU tokens." />
      <EconomyNode icon={PieChart} title="Allocation" desc="Optimized capital distribution based on trust and risk analysis." />
    </div>
    <div className="p-10 md:p-20 border border-brand-border rounded-3xl md:rounded-[3rem] bg-white/[0.01] flex items-center justify-center min-h-[300px] md:min-h-[400px]">
      <div className="text-center space-y-4 md:space-y-6">
        <Coins className="w-12 h-12 md:w-16 md:h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-4">Protocol Economy Simulation Loading...</p>
      </div>
    </div>
  </div>
);
