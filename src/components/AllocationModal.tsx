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
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-8">
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
          className="relative w-full max-w-2xl bg-brand-border border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-2 text-brand-muted hover:text-brand-paper transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-12 space-y-12">
            {!isComplete ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <h2 className="text-3xl font-bold">Allocate Capital</h2>
                  </div>
                  <p className="text-brand-muted text-lg">Directing funds to **{project?.name}**.</p>
                </div>

                <div className="space-y-8">
                  <div className="p-10 border border-white/5 rounded-[2.5rem] bg-white/[0.02] space-y-8">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Allocation Amount</span>
                      <span className="text-2xl font-mono font-bold text-brand-accent">{amount.toLocaleString()} VU</span>
                    </div>
                    <input 
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-brand-accent"
                    />
                    <div className="flex items-center justify-between text-[10px] font-mono text-brand-muted uppercase tracking-widest">
                      <span>1,000 VU</span>
                      <span>100,000 VU</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 border border-white/5 rounded-3xl bg-white/[0.02] space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Project Trust</span>
                      <div className="text-xl font-bold text-brand-accent">{project?.trustScore}</div>
                    </div>
                    <div className="p-6 border border-white/5 rounded-3xl bg-white/[0.02] space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Risk Level</span>
                      <div className="text-xl font-bold text-emerald-400">LOW</div>
                    </div>
                  </div>

                  <div className="p-6 border border-brand-accent/20 rounded-3xl bg-brand-accent/5 space-y-4">
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-brand-accent" />
                      <h4 className="text-sm font-bold uppercase tracking-widest">AI Simulation</h4>
                    </div>
                    <p className="text-xs text-brand-paper/80 leading-relaxed">
                      "This allocation is expected to trigger **Tranche 3** within 14 days, resulting in an estimated **+0.12%** increase in your global trust rank."
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleAllocate}
                  disabled={isAllocating}
                  className="w-full py-6 bg-brand-paper text-brand-ink rounded-3xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.01] transition-transform disabled:opacity-50"
                >
                  {isAllocating ? (
                    <>
                      <RefreshCcw className="w-5 h-5 animate-spin" />
                      <span>Processing Allocation...</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5" />
                      <span>Confirm Allocation</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center text-center space-y-12 py-12">
                <div className="w-24 h-24 rounded-[2.5rem] bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold">Allocation Successful</h3>
                  <p className="text-brand-muted text-lg">**{amount.toLocaleString()} VU** has been committed to the protocol ledger.</p>
                </div>
                <div className="w-full p-8 border border-white/5 rounded-[2rem] bg-white/[0.02] space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-brand-muted">Transaction ID</span>
                    <span className="font-mono">0x8291...X42</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-brand-muted">Protocol Fee</span>
                    <span className="font-mono">0.12 VU</span>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-full py-6 bg-brand-paper text-brand-ink rounded-3xl font-bold uppercase tracking-widest text-xs hover:scale-[1.01] transition-transform"
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
