import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Activity, ChevronRight, ArrowUpRight, Radar } from 'lucide-react';
import { cn } from '../lib/utils';

interface LedgerViewProps {
  records: any[];
}

export const LedgerView = ({ records }: LedgerViewProps) => (
  <div className="space-y-12 md:space-y-20">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-brand-accent">
          <Radar className="w-5 h-5 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Protocol Live</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none">Trust Command</h1>
        <p className="text-brand-muted text-lg md:text-xl max-w-xl leading-relaxed">Real-time protocol integrity and impact verification across the global ledger.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="p-6 glass-card rounded-[2rem] flex flex-col gap-2 min-w-[200px]">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">Global Trust Index</span>
          <div className="flex items-center gap-4">
            <span className="text-3xl md:text-4xl font-mono font-bold text-glow">98.4</span>
            <div className="flex items-center gap-1 text-brand-accent text-xs font-bold bg-brand-accent/10 px-2 py-1 rounded-full border border-brand-accent/20">
              <ArrowUpRight className="w-3 h-3" />
              <span>0.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
      <div className="lg:col-span-2 space-y-8 md:space-y-12">
        <div className="p-8 md:p-12 glass-card rounded-[3rem] space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                <Activity className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Live Impact Feed</h2>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-paper transition-all hover:tracking-[0.3em]">View Archive</button>
          </div>
          
          <div className="space-y-4">
            {records.length > 0 ? records.map((record, i) => (
              <motion.div 
                key={record.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-6 md:p-8 border border-white/[0.03] rounded-[2rem] bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer group gap-6"
              >
                <div className="flex items-center gap-6 md:gap-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 bg-white/[0.02] text-brand-muted group-hover:text-brand-accent group-hover:border-brand-accent/30 transition-all">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg md:text-xl truncate tracking-tight">PoI #{record.id?.slice(-6).toUpperCase() || '8291-X'}</h3>
                      {record.verification_data?.risk_assessment === 'low' && (
                        <span className="px-2 py-0.5 bg-brand-accent/10 text-brand-accent text-[9px] font-bold uppercase tracking-widest rounded-full border border-brand-accent/20">Verified</span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-brand-muted line-clamp-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      {record.metadata || record.verification_data?.reasoning || 'Impact verification event committed to ledger.'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                  <span className="text-sm md:text-base font-mono font-bold text-brand-accent tracking-tighter">+{record.poi_score} VU</span>
                  <span className="text-[10px] text-brand-muted uppercase tracking-[0.2em] font-bold opacity-40">
                    {record.timestamp?.toDate ? record.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                  </span>
                </div>
              </motion.div>
            )) : (
              <div className="py-20 md:py-32 text-center space-y-6 border border-dashed border-white/10 rounded-[3rem]">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-brand-muted opacity-20">
                  <Activity className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <p className="text-brand-muted font-medium text-lg px-8 opacity-60">No impact records found. Be the first to submit evidence.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8 md:space-y-12">
        <div className="p-8 md:p-12 glass-card rounded-[3rem] space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck className="w-24 h-24 md:w-32 md:h-32 text-brand-accent" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">AI Insights</h2>
          </div>
          <p className="text-sm md:text-base text-brand-paper/70 leading-relaxed font-medium">
            "Protocol confidence has increased by <span className="text-brand-accent">1.4%</span> following the successful audit of the latest global projects. Consider increasing capital allocation to high-trust sectors."
          </p>
          <button className="w-full py-4 md:py-5 bg-brand-accent text-brand-ink rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(0,209,255,0.2)]">
            Optimize Allocation
          </button>
        </div>

        <div className="p-8 md:p-12 glass-card rounded-[3rem] space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-muted">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Trust Factors</h2>
          </div>
          <div className="space-y-8">
            {[
              { label: 'Data Integrity', value: 98 },
              { label: 'Audit Velocity', value: 92 },
              { label: 'Node Reputation', value: 95 }
            ].map((factor, i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
                  <span className="text-brand-muted">{factor.label}</span>
                  <span className="text-brand-paper font-mono">{factor.value}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.value}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                    className="h-full bg-brand-accent shadow-[0_0_10px_rgba(0,209,255,0.5)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
