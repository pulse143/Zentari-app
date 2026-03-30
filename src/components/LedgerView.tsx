import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Activity, ChevronRight, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface LedgerViewProps {
  records: any[];
}

export const LedgerView = ({ records }: LedgerViewProps) => (
  <div className="space-y-12">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-5xl font-bold tracking-tight">Trust Command Center</h1>
        <p className="text-brand-muted text-lg mt-2">Real-time protocol integrity and impact verification.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="p-4 border border-brand-border rounded-3xl bg-white/[0.01] flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Global Trust Index</span>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-mono font-bold">98.4</span>
            <div className="flex items-center gap-1 text-brand-accent text-xs font-bold">
              <ArrowUpRight className="w-3 h-3" />
              <span>0.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-brand-accent" />
              <h2 className="text-2xl font-bold">Live Impact Feed</h2>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-paper transition-colors">View All Records</button>
          </div>
          
          <div className="space-y-4">
            {records.length > 0 ? records.map((record, i) => (
              <motion.div 
                key={record.id} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-6 border border-white/5 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center border bg-brand-accent/10 border-brand-accent/20 text-brand-accent">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">PoI #{record.id?.slice(-6).toUpperCase() || '8291-X'}</h3>
                      {record.verification_data?.risk_assessment === 'low' && (
                        <span className="px-1.5 py-0.5 bg-brand-accent/10 text-brand-accent text-[8px] font-bold uppercase rounded-md border border-brand-accent/20">Verified</span>
                      )}
                    </div>
                    <p className="text-xs text-brand-muted line-clamp-1">
                      {record.metadata || record.verification_data?.reasoning || 'Impact verification event committed to ledger.'}
                    </p>
                    {record.verification_data?.detected_objects && (
                      <div className="flex gap-1 mt-1">
                        {record.verification_data.detected_objects.slice(0, 3).map((obj: string, idx: number) => (
                          <span key={idx} className="text-[8px] text-brand-muted/60 font-mono">#{obj}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-mono font-bold text-brand-accent">+{record.poi_score} VU</span>
                  <span className="text-[10px] text-brand-muted uppercase tracking-widest">
                    {record.timestamp?.toDate ? record.timestamp.toDate().toLocaleTimeString() : 'Just now'}
                  </span>
                </div>
              </motion.div>
            )) : (
              <div className="py-20 text-center space-y-4 border border-dashed border-white/5 rounded-[3rem]">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-brand-muted">
                  <Activity className="w-8 h-8" />
                </div>
                <p className="text-brand-muted font-medium">No impact records found. Be the first to submit evidence.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="p-8 border border-brand-border rounded-[2.5rem] bg-brand-accent/5 border-brand-accent/20 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck className="w-24 h-24 text-brand-accent" />
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-accent" />
            <h2 className="text-xl font-bold">AI Insights</h2>
          </div>
          <p className="text-sm text-brand-paper/80 leading-relaxed">
            "Protocol confidence has increased by **1.4%** following the successful audit of the latest global projects. Consider increasing capital allocation to high-trust sectors."
          </p>
          <button className="w-full py-4 bg-brand-accent text-brand-ink rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:scale-[1.02] transition-transform">
            Optimize Allocation
          </button>
        </div>

        <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-6">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-brand-muted" />
            <h2 className="text-xl font-bold">Trust Factors</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Data Integrity', value: 98 },
              { label: 'Audit Velocity', value: 92 },
              { label: 'Node Reputation', value: 95 }
            ].map((factor, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-brand-muted">{factor.label}</span>
                  <span className="text-brand-paper">{factor.value}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.value}%` }}
                    className="h-full bg-brand-paper"
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
