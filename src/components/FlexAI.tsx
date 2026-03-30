import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Command, 
  Zap, 
  AlertTriangle, 
  FileText, 
  TrendingUp, 
  ArrowRight, 
  Cpu, 
  Search,
  X,
  Shield,
  BarChart3,
  Database
} from 'lucide-react';
import { cn } from '../lib/utils';

interface CommandResult {
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const FlexAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<CommandResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global "/" listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setResult(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const commands = [
    { icon: AlertTriangle, label: 'Show funding risks', cmd: 'funding_risks' },
    { icon: Zap, label: 'Improve my project score', cmd: 'improve_score' },
    { icon: FileText, label: 'Generate donor report', cmd: 'gen_report' },
    { icon: Database, label: 'Audit protocol treasury', cmd: 'audit_treasury' }
  ];

  const executeCommand = (cmd: string) => {
    setQuery('');
    // Simulated precise system responses
    switch (cmd) {
      case 'funding_risks':
        setResult({
          type: 'warning',
          title: 'Funding Risk Detected',
          message: '3 nodes in the Southern Region show trust variance > 15%. Automated capital allocation paused for 12h.',
          actionLabel: 'Review Nodes'
        });
        break;
      case 'improve_score':
        setResult({
          type: 'info',
          title: 'Optimization Strategy',
          message: 'Verification confidence is 92%. Uploading high-res satellite imagery for EDU_CHAIN_04 will increase score to 98%.',
          actionLabel: 'Upload Evidence'
        });
        break;
      case 'gen_report':
        setResult({
          type: 'success',
          title: 'Report Generated',
          message: 'Q1 Impact Report (POI_ARCHIVE_2026) is ready. 12.4M impact verified across 14 nodes.',
          actionLabel: 'Download PDF'
        });
        break;
      default:
        setResult({
          type: 'info',
          title: 'Command Executed',
          message: `Executing protocol command: ${cmd}. AI Sentinel is processing the request.`,
        });
    }
  };

  return (
    <>
      {/* Floating Command Layer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-brand-ink/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-brand-ink border border-brand-border rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="p-2 flex items-center gap-3 border-b border-brand-border bg-white/[0.02]">
                <div className="w-10 h-10 flex items-center justify-center text-brand-accent">
                  <Command className="w-5 h-5" />
                </div>
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="Type a command or search protocol..." 
                  className="flex-1 bg-transparent border-none focus:outline-none text-lg font-medium placeholder:text-brand-muted/50"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && query) executeCommand(query);
                  }}
                />
                <div className="px-2 py-1 bg-white/5 rounded border border-brand-border text-[10px] font-mono text-brand-muted">
                  ESC
                </div>
              </div>

              <div className="p-4">
                {!result ? (
                  <div className="space-y-1">
                    <span className="mono-label px-3 mb-2 block">Suggested Commands</span>
                    {commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase())).map((c) => (
                      <button 
                        key={c.cmd}
                        onClick={() => executeCommand(c.cmd)}
                        className="w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/5 transition-all group text-left"
                      >
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-brand-accent/10 transition-colors">
                          <c.icon className="w-4 h-4 text-brand-muted group-hover:text-brand-accent" />
                        </div>
                        <span className="text-sm font-medium group-hover:text-brand-paper transition-colors">{c.label}</span>
                        <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all text-brand-accent" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 space-y-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-3 rounded-2xl",
                        result.type === 'warning' ? "bg-yellow-500/10 text-yellow-500" : 
                        result.type === 'success' ? "bg-brand-accent/10 text-brand-accent" : 
                        "bg-blue-500/10 text-blue-500"
                      )}>
                        {result.type === 'warning' ? <AlertTriangle className="w-6 h-6" /> : 
                         result.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : 
                         <Cpu className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2">{result.title}</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">{result.message}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      {result.actionLabel && (
                        <button className="flex-1 py-3 bg-brand-paper text-brand-ink rounded-xl font-bold text-sm hover:scale-[1.02] transition-all">
                          {result.actionLabel}
                        </button>
                      )}
                      <button 
                        onClick={() => setResult(null)}
                        className="flex-1 py-3 border border-brand-border rounded-xl font-bold text-sm hover:bg-white/5 transition-all"
                      >
                        Dismiss
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="p-3 border-t border-brand-border bg-white/[0.01] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-white/5 border border-brand-border rounded text-[9px] font-mono">↑↓</kbd>
                    <span className="text-[9px] text-brand-muted uppercase font-bold tracking-widest">Navigate</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-white/5 border border-brand-border rounded text-[9px] font-mono">↵</kbd>
                    <span className="text-[9px] text-brand-muted uppercase font-bold tracking-widest">Execute</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-3 h-3 text-brand-accent" />
                  <span className="text-[9px] font-mono text-brand-accent">FLEX_AI_V2.4</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contextual Inline Suggestions (Example) */}
      {/* This would be used inside other components to show "AI Hints" */}
    </>
  );
};

export const AIContextualAction = ({ 
  label, 
  icon: Icon, 
  onClick 
}: { 
  label: string; 
  icon: any; 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-brand-accent/20 bg-brand-accent/5 text-[10px] font-bold uppercase tracking-wider text-brand-accent hover:bg-brand-accent/10 transition-all group"
  >
    <Icon className="w-3 h-3 group-hover:scale-110 transition-transform" />
    {label}
  </button>
);

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);
