import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Upload, 
  Shield, 
  Zap, 
  CheckCircle2, 
  Loader2, 
  Camera, 
  FileText, 
  Cpu, 
  AlertTriangle, 
  ArrowRight,
  Download,
  Share2,
  ExternalLink,
  Fingerprint
} from 'lucide-react';
import { verifyEvidence } from '../services/gemini';
import { cn } from '../lib/utils';

interface EvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (event: any) => void;
}

export const EvidenceModal = ({ isOpen, onClose, onSuccess }: EvidenceModalProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    actor: 'KULIMAVERSE_NODE_01',
    action: '',
    evidence: '',
    impactValue: '25000'
  });
  const [analysis, setAnalysis] = useState<any>(null);
  const [verification, setVerification] = useState<any>(null);

  // Step 2: AI Pre-analysis (Simulated instant feedback)
  const runPreAnalysis = async (content: string) => {
    setLoading(true);
    setStep(2);
    // Simulate AI "thinking"
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setAnalysis({
      detection: "Water Infrastructure Project",
      location: "Lilongwe, Malawi",
      confidence: {
        type: 0.98,
        location: 0.94,
        impact: 0.89
      },
      summary: "Detected high-resolution imagery of solar-powered borehole installation. Metadata confirms geospatial alignment with reported coordinates."
    });
    setLoading(false);
  };

  // Step 4: Deep Verification
  const runDeepVerification = async () => {
    setLoading(true);
    setStep(4);
    try {
      // Real Gemini call for deep analysis
      const result = await verifyEvidence(formData.evidence || "Satellite imagery of borehole", formData.action || "Water project in Lilongwe");
      
      // Artificial delay for "Protocol Animation" feel
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (result.score < 40) {
        throw new Error("Trust Variance Detected: Evidence does not meet protocol threshold.");
      }
      
      setVerification(result);
      setStep(5);
    } catch (err: any) {
      setError(err.message);
      setStep(6); // Error state
    } finally {
      setLoading(false);
    }
  };

  const handleFinalize = () => {
    onSuccess({
      ...formData,
      trustScore: verification.score,
      status: 'verified',
      timestamp: new Date().toISOString().replace('T', ' ').split('.')[0]
    });
    onClose();
    // Reset for next time
    setTimeout(() => {
      setStep(1);
      setAnalysis(null);
      setVerification(null);
      setError(null);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/95 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-2xl bg-brand-ink border border-brand-border rounded-3xl md:rounded-[2rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-border">
              <motion.div 
                className="h-full bg-brand-accent shadow-[0_0_10px_#00FF00]"
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 5) * 100}%` }}
              />
            </div>

            <div className="p-6 md:p-10">
              <div className="flex items-center justify-between mb-8 md:mb-10">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-accent/10 rounded-xl md:rounded-2xl flex items-center justify-center border border-brand-accent/20">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight">Generate Proof of Impact</h2>
                    <p className="text-[10px] md:mono-label text-brand-accent">Protocol Flow: Step {step > 5 ? '!' : step}</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-5 h-5 md:w-6 md:h-6 text-brand-muted" />
                </button>
              </div>

              {/* STEP 1: CAPTURE EVIDENCE */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                    {[
                      { icon: Camera, label: 'Camera', desc: 'Live Capture' },
                      { icon: Upload, label: 'Upload', desc: 'Files/Media' },
                      { icon: FileText, label: 'Data', desc: 'IoT/Logs' }
                    ].map((opt) => (
                      <button 
                        key={opt.label}
                        onClick={() => runPreAnalysis("Simulated capture data")}
                        className="p-4 md:p-6 rounded-xl md:rounded-2xl border border-brand-border bg-white/[0.02] hover:border-brand-accent/50 hover:bg-brand-accent/5 transition-all group text-center flex sm:flex-col items-center sm:justify-center gap-4 sm:gap-0"
                      >
                        <opt.icon className="w-6 h-6 md:w-8 md:h-8 sm:mx-auto sm:mb-4 text-brand-muted group-hover:text-brand-accent transition-colors shrink-0" />
                        <div className="text-left sm:text-center">
                          <span className="block font-bold text-sm mb-0.5 md:mb-1">{opt.label}</span>
                          <span className="text-[9px] md:text-[10px] text-brand-muted uppercase tracking-wider">{opt.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[10px] md:mono-label uppercase tracking-widest text-brand-muted">Manual Narrative (Optional)</label>
                    <textarea 
                      placeholder="Describe the impact in your own words..."
                      className="w-full bg-white/5 border border-brand-border rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 focus:outline-none focus:border-brand-accent transition-all resize-none h-28 md:h-32 text-sm md:text-base"
                      value={formData.action}
                      onChange={e => setFormData({...formData, action: e.target.value})}
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 2: AI PRE-ANALYSIS */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 md:space-y-8">
                  <div className="flex flex-col items-center justify-center py-6 md:py-10 text-center">
                    {loading ? (
                      <>
                        <div className="relative w-16 h-16 md:w-20 md:h-20 mb-6">
                          <Loader2 className="w-16 h-16 md:w-20 md:h-20 text-brand-accent animate-spin opacity-20" />
                          <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 text-brand-accent animate-pulse" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold mb-2">AI Sentinel Analyzing...</h3>
                        <p className="text-brand-muted text-xs md:text-sm">Scanning metadata, geolocation, and visual markers.</p>
                      </>
                    ) : analysis && (
                      <div className="w-full space-y-6 text-left">
                        <div className="p-5 md:p-6 rounded-xl md:rounded-2xl bg-brand-accent/5 border border-brand-accent/20">
                          <div className="flex items-center gap-3 mb-4">
                            <Zap className="w-4 h-4 md:w-5 md:h-5 text-brand-accent" />
                            <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-brand-accent">Instant Detection</span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold mb-2">"{analysis.detection}"</h3>
                          <p className="text-brand-muted text-xs md:text-sm leading-relaxed mb-6">{analysis.summary}</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-4">
                            {Object.entries(analysis.confidence).map(([key, val]: any) => (
                              <div key={key} className="space-y-1 md:space-y-2">
                                <div className="flex justify-between text-[9px] md:text-[10px] font-mono uppercase">
                                  <span>{key}</span>
                                  <span className="text-brand-accent">{(val * 100).toFixed(0)}%</span>
                                </div>
                                <div className="h-1 bg-brand-border rounded-full overflow-hidden">
                                  <div className="h-full bg-brand-accent" style={{ width: `${val * 100}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => setStep(3)}
                          className="w-full py-4 md:py-5 bg-brand-paper text-brand-ink rounded-2xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                        >
                          Confirm AI Detection <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: USER CONFIRMATION */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 md:space-y-8">
                  <div className="space-y-6">
                    <div className="p-5 md:p-6 rounded-xl md:rounded-2xl border border-brand-border bg-white/[0.02]">
                      <label className="text-[10px] md:mono-label mb-4 block uppercase tracking-widest text-brand-muted">Final Impact Valuation</label>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl md:text-4xl font-mono font-bold text-brand-accent">$</span>
                        <input 
                          type="number" 
                          className="bg-transparent text-4xl md:text-5xl font-mono font-bold focus:outline-none w-full"
                          value={formData.impactValue}
                          onChange={e => setFormData({...formData, impactValue: e.target.value})}
                        />
                      </div>
                      <p className="text-[10px] md:text-xs text-brand-muted mt-4">AI suggests this value based on project scale and regional benchmarks.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                      <button 
                        onClick={() => setStep(2)}
                        className="flex-1 py-4 md:py-5 border border-brand-border rounded-2xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] hover:bg-white/5 transition-all"
                      >
                        Recalibrate
                      </button>
                      <button 
                        onClick={runDeepVerification}
                        className="flex-[2] py-4 md:py-5 bg-brand-accent text-brand-ink rounded-2xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                      >
                        Initiate Protocol Audit <Zap className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: VERIFICATION PROCESSING */}
              {step === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 md:py-12 text-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 md:mb-10">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-brand-accent/20 border-t-brand-accent rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-4 border-2 border-blue-500/20 border-b-blue-500 rounded-full"
                    />
                    <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 text-brand-accent animate-pulse" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">Deep Protocol Audit</h3>
                  <div className="space-y-2 max-w-xs mx-auto">
                    {[
                      "Querying Global Consensus Nodes...",
                      "Validating Cryptographic Signatures...",
                      "Cross-referencing Satellite Oracles...",
                      "Calculating Final Trust Vector..."
                    ].map((text, i) => (
                      <motion.div 
                        key={text}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.8 }}
                        className="flex items-center gap-3 text-[9px] md:text-[10px] font-mono text-brand-muted uppercase tracking-widest"
                      >
                        <div className="w-1 h-1 bg-brand-accent rounded-full" />
                        {text}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 5: PoI GENERATED */}
              {step === 5 && verification && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 md:space-y-8">
                  {/* The "Asset" Card */}
                  <div className="relative p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-brand-accent/20 via-brand-ink to-blue-500/10 border-2 border-brand-accent/30 shadow-[0_0_50px_rgba(0,255,0,0.1)] overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Shield className="w-32 h-32 md:w-48 md:h-48" />
                    </div>
                    
                    <div className="flex justify-between items-start mb-8 md:mb-12">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-accent rounded-full animate-pulse" />
                          <span className="text-[8px] md:text-[10px] font-bold text-brand-accent uppercase tracking-[0.2em] md:tracking-[0.3em]">Official Proof of Impact</span>
                        </div>
                        <h3 className="text-xl md:text-3xl font-bold tracking-tighter">POI_ASSET_{Math.floor(Math.random() * 1000000)}</h3>
                      </div>
                      <Fingerprint className="w-8 h-8 md:w-10 md:h-10 text-brand-accent/40" />
                    </div>

                    <div className="grid grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-12">
                      <div>
                        <span className="text-[9px] md:mono-label block mb-1 md:mb-2 uppercase tracking-widest text-brand-muted">Impact Value</span>
                        <div className="text-xl md:text-3xl font-mono font-bold">${Number(formData.impactValue).toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-[9px] md:mono-label block mb-1 md:mb-2 uppercase tracking-widest text-brand-muted">Trust Score</span>
                        <div className="text-xl md:text-3xl font-mono font-bold text-brand-accent">{verification.score}%</div>
                      </div>
                    </div>

                    <div className="pt-6 md:pt-8 border-t border-brand-border flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-[8px] md:text-[9px] text-brand-muted uppercase font-bold tracking-widest">Verified By AI Sentinel</span>
                        <div className="text-[9px] md:text-[10px] font-mono">{new Date().toISOString().split('T')[0]}</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-white/5 rounded-lg border border-brand-border hover:border-brand-accent transition-colors">
                          <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                        <button className="p-2 bg-white/5 rounded-lg border border-brand-border hover:border-brand-accent transition-colors">
                          <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleFinalize}
                    className="w-full py-4 md:py-5 bg-brand-accent text-brand-ink rounded-2xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(0,255,0,0.2)]"
                  >
                    Mint & Commit to Ledger
                  </button>
                </motion.div>
              )}

              {/* STEP 6: ERROR STATE */}
              {step === 6 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-6 md:py-10 text-center space-y-6 md:space-y-8">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                    <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Trust Variance Detected</h3>
                    <p className="text-brand-muted text-xs md:text-sm max-w-xs md:max-w-sm mx-auto leading-relaxed">
                      {error || "The submitted evidence does not meet the protocol's minimum trust threshold for automated verification."}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => setStep(1)}
                      className="w-full py-4 md:py-5 bg-white/5 border border-brand-border rounded-2xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] hover:bg-white/10 transition-all"
                    >
                      Add More Evidence
                    </button>
                    <button 
                      className="w-full py-4 md:py-5 border border-brand-border rounded-2xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] text-brand-muted hover:text-brand-paper transition-all flex items-center justify-center gap-2"
                    >
                      Appeal to Human Oracle <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
