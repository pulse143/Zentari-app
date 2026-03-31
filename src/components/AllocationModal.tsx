import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  ChevronRight, 
  Activity, 
  BarChart3, 
  Globe, 
  Database, 
  Network, 
  Rocket, 
  Target, 
  ShieldAlert, 
  Gavel, 
  Briefcase, 
  MapPin, 
  LineChart, 
  PieChart, 
  Activity as ActivityIcon, 
  Wallet as WalletIcon, 
  Lock, 
  Unlock, 
  RefreshCcw, 
  Layout, 
  Box, 
  Share2, 
  Gift, 
  Trophy, 
  UserCheck, 
  UserX, 
  GitMerge, 
  Search, 
  Plus, 
  Info, 
  MousePointer2, 
  FileText, 
  Scale, 
  Eye, 
  Binary, 
  Brain, 
  Smile, 
  Repeat, 
  Microscope,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

export const AllocationModal = ({ isOpen, onClose, project }: any) => {
  const [amount, setAmount] = useState(10000);
  const [isAllocating, setIsAllocating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleAllocate = () => {
    setIsAllocating(true);
    setTimeout(() => {
      setIsAllocating(false);
      setIsComplete(true);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-ink/80 backdrop-blur-xl"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl glass-card border border-white/10 rounded-[3rem] md:rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden max-h-[90vh] overflow-y-auto premium-border"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 md:top-12 right-8 md:right-12 p-3 text-brand-muted hover:text-brand-paper transition-all z-10 hover:rotate-90"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div className="p-8 md:p-16 space-y-12 md:space-y-20">
            {!isComplete ? (
              <>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.5rem] md:rounded-[2rem] bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shadow-[0_0_30px_rgba(0,209,255,0.2)] premium-border">
                      <Wallet className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-glow">Allocate Capital</h2>
                  </div>
                  <p className="text-brand-muted text-lg md:text-2xl font-medium opacity-80 leading-relaxed">Directing funds to <span className="text-brand-paper font-bold underline decoration-brand-accent/40 underline-offset-8">{project?.name}</span>.</p>
                </div>

                <div className="space-y-10 md:space-y-16">
                  <div className="p-8 md:p-12 border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.02] space-y-10 md:space-y-12 premium-border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-brand-muted opacity-60">Allocation Amount</span>
                      <span className="text-3xl md:text-5xl font-mono font-bold text-brand-accent text-glow">{amount.toLocaleString()} VU</span>
                    </div>
                    <div className="relative h-2 md:h-3 bg-white/5 rounded-full">
                      <input 
                        type="range"
                        min="1000"
                        max="100000"
                        step="1000"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full bg-transparent appearance-none cursor-pointer accent-brand-accent z-10"
                      />
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-brand-accent rounded-full shadow-[0_0_20px_rgba(0,209,255,0.5)]"
                        style={{ width: `${(amount / 100000) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[9px] md:text-[11px] font-mono text-brand-muted uppercase tracking-[0.2em] opacity-50">
                      <span>1,000 VU</span>
                      <span>100,000 VU</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                    <div className="p-6 md:p-10 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.02] space-y-2 premium-border">
                      <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-60">Project Trust</span>
                      <div className="text-2xl md:text-4xl font-mono font-bold text-brand-accent text-glow">{project?.trustScore}</div>
                    </div>
                    <div className="p-6 md:p-10 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.02] space-y-2 premium-border">
                      <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-brand-muted opacity-60">Risk Level</span>
                      <div className="text-2xl md:text-4xl font-bold text-emerald-400">LOW</div>
                    </div>
                  </div>

                  <div className="p-8 md:p-12 border border-brand-accent/20 rounded-[2.5rem] md:rounded-[3.5rem] bg-brand-accent/[0.03] space-y-6 md:space-y-8 premium-border">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-brand-accent/10">
                        <Brain className="w-5 h-5 md:w-6 md:h-6 text-brand-accent" />
                      </div>
                      <h4 className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-brand-accent">AI Simulation</h4>
                    </div>
                    <p className="text-base md:text-xl text-brand-paper/80 leading-relaxed font-medium italic">
                      "This allocation is expected to trigger <span className="text-brand-accent font-bold">Tranche 3</span> within 14 days, resulting in an estimated <span className="text-brand-accent font-bold">+0.12%</span> increase in your global trust rank."
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleAllocate}
                  disabled={isAllocating}
                  className="w-full py-6 md:py-8 bg-brand-paper text-brand-ink rounded-[2rem] md:rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-[11px] md:text-xs flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-2xl group"
                >
                  {isAllocating ? (
                    <>
                      <RefreshCcw className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                      <span>Processing Allocation...</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                      <span>Confirm Allocation</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center text-center space-y-12 md:space-y-20 py-12 md:py-20">
                <div className="relative">
                  <motion.div 
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 120 }}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] md:rounded-[3rem] bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center text-brand-accent shadow-[0_0_80px_rgba(0,209,255,0.3)] premium-border"
                  >
                    <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16" />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="absolute -top-4 -right-4 px-4 md:px-6 py-2 bg-brand-accent text-brand-ink text-[10px] md:text-[11px] font-bold rounded-full uppercase tracking-widest shadow-xl"
                  >
                    Immutable
                  </motion.div>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-glow">Allocation Successful</h3>
                  <p className="text-brand-muted text-lg md:text-2xl font-medium opacity-80 leading-relaxed max-w-xl mx-auto">
                    <span className="text-brand-paper font-bold">{amount.toLocaleString()} VU</span> has been committed to the protocol ledger.
                  </p>
                </div>
                <div className="w-full p-8 md:p-12 border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.02] space-y-4 md:space-y-6 premium-border">
                  <div className="flex items-center justify-between text-[11px] md:text-sm">
                    <span className="text-brand-muted font-bold uppercase tracking-widest opacity-60">Transaction ID</span>
                    <span className="font-mono text-brand-paper font-bold">0x8291...X42</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] md:text-sm">
                    <span className="text-brand-muted font-bold uppercase tracking-widest opacity-60">Protocol Fee</span>
                    <span className="font-mono text-brand-accent font-bold">0.12 VU</span>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-full py-6 md:py-8 bg-brand-paper text-brand-ink rounded-[2rem] md:rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-[11px] md:text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl"
                >
                  Return to Command Center
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
