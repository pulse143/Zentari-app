import React from 'react';
import { BarChart3, PieChart, Activity, Zap, Cpu, ShieldCheck, Database, Network } from 'lucide-react';

const MarketNode = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-xs text-brand-muted leading-relaxed">{desc}</p>
  </div>
);

export const ImpactMarketsView = () => (
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">Impact Markets</h2>
      <p className="text-brand-muted text-lg">The trading and liquidity of verified impact.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <MarketNode icon={BarChart3} title="Impact Bonds" desc="Tradeable tranches of verified impact and funding tranches." />
      <MarketNode icon={PieChart} title="Liquidity" desc="Automated market makers for VU tokens and impact assets." />
      <MarketNode icon={Activity} title="Volatility" desc="Real-time tracking of impact-asset prices and trust scores." />
      <MarketNode icon={Zap} title="Efficiency" desc="Instant settlement of impact trades via smart contracts." />
    </div>
    <div className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] flex items-center justify-center">
      <div className="text-center space-y-4">
        <BarChart3 className="w-16 h-16 text-brand-muted mx-auto opacity-20" />
        <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Impact Market Terminal Loading...</p>
      </div>
    </div>
  </div>
);
