import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth, handleFirestoreError, OperationType, collection, addDoc, serverTimestamp } from '../lib/firebase';
import { 
  Camera, 
  MapPin, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Brain, 
  Zap, 
  Activity, 
  ShieldCheck, 
  AlertCircle, 
  Loader2, 
  ChevronRight, 
  Plus, 
  Image as ImageIcon, 
  Upload, 
  Globe, 
  Database, 
  Network, 
  Share2, 
  Eye, 
  Microscope,
  Search,
  ShieldAlert,
  BookOpen,
  User,
  Gavel
} from 'lucide-react';
import { cn } from '../lib/utils';

const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center gap-3 md:gap-6">
    {[1, 2, 3].map((step) => (
      <div key={step} className="flex items-center gap-2 md:gap-3">
        <div className={cn(
          "w-1.5 h-1.5 rounded-full transition-all duration-500",
          currentStep === step ? "bg-brand-accent scale-150 shadow-[0_0_10px_rgba(0,255,0,0.5)]" : 
          currentStep > step ? "bg-brand-paper" : 
          "bg-white/10"
        )} />
      </div>
    ))}
  </div>
);

const ForensicConfidence = ({ value }: { value: number }) => {
  const getStatus = (v: number) => {
    if (v < 88) return { label: 'Analyzing', color: 'text-amber-400' };
    if (v < 95) return { label: 'Probable', color: 'text-brand-accent' };
    return { label: 'Verified', color: 'text-brand-accent shadow-[0_0_10px_rgba(0,255,0,0.5)]' };
  };

  const status = getStatus(value);

  return (
    <div className="flex flex-col gap-1.5 min-w-[120px]">
      <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-brand-muted">
        <span>Confidence</span>
        <span className={cn("font-mono transition-colors duration-500", status.color)}>{value}%</span>
      </div>
      <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className="h-full bg-brand-accent shadow-[0_0_10px_rgba(0,255,0,0.3)]"
        />
      </div>
      <div className={cn("text-[8px] font-bold uppercase tracking-[0.2em] text-right", status.color)}>
        {status.label}
      </div>
    </div>
  );
};

export const SubmitEvidenceView = () => {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [metadata, setMetadata] = useState('');
  const [confidence, setConfidence] = useState(85);
  const [projectType, setProjectType] = useState('Climate');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [poiResult, setPoiResult] = useState<any>(null);

  const PROJECT_TYPES = [
    { id: 'Agriculture', icon: Globe, color: 'text-emerald-400' },
    { id: 'Education', icon: BookOpen, color: 'text-blue-400' },
    { id: 'Health', icon: Activity, color: 'text-rose-400' },
    { id: 'Infrastructure', icon: Database, color: 'text-amber-400' },
    { id: 'Climate', icon: Zap, color: 'text-cyan-400' },
    { id: 'Social', icon: User, color: 'text-purple-400' },
    { id: 'Government', icon: Gavel, color: 'text-slate-400' }
  ];

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setStep(2);
  };

  const generatePoI = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    try {
      // Mocking the verification and generation process for preview
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockVerification = {
        authenticity_score: 0.992,
        context_match_score: 0.988,
        risk_assessment: 'low',
        reasoning: 'Forensic analysis confirms visual and metadata integrity.'
      };
      
      const mockPoi = {
        poi_id: `poi_${Date.now()}`,
        poi_score: 12.4,
        timestamp: new Date().toISOString(),
        metadata: metadata || 'Impact verification record'
      };

      setVerificationResult(mockVerification);
      setPoiResult(mockPoi);
      setStep(3);
    } catch (error) {
      console.error("PoI Generation failed:", error);
      alert("Verification failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleMetadataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setMetadata(val);
    const newConf = Math.min(99, 85 + (val.length / 10));
    setConfidence(Math.floor(newConf));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 md:space-y-20 py-6 md:py-12">
      <div className="flex items-center justify-between border-b border-white/5 pb-8 md:pb-12">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-glow">Impact Evidence</h2>
          <p className="text-brand-muted text-sm md:text-base font-medium opacity-80">Generate a verifiable Proof of Impact record with forensic-grade AI.</p>
        </div>
        <StepIndicator currentStep={step} />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <StepUpload onFileSelect={handleFileSelect} />
        )}

        {step === 2 && (
          <StepMetadata 
            metadata={metadata}
            confidence={confidence}
            previewUrl={previewUrl}
            projectType={projectType}
            projectTypes={PROJECT_TYPES}
            onProjectTypeChange={setProjectType}
            onMetadataChange={handleMetadataChange}
            onNext={generatePoI}
            isAnalyzing={isAnalyzing}
            verificationResult={verificationResult}
          />
        )}

        {step === 3 && (
          <StepSuccess 
            poiResult={poiResult}
            verificationResult={verificationResult}
            onReset={() => {
              setStep(1);
              setSelectedFile(null);
              setPreviewUrl(null);
              setPoiResult(null);
              setVerificationResult(null);
              setMetadata('');
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Sub-components ---

const StepUpload = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsScanning(true);
      setTimeout(() => {
        onFileSelect(file);
      }, 1500);
    }
  };

  return (
    <motion.div 
      key="step1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative p-12 md:p-24 border border-dashed rounded-[2.5rem] md:rounded-[4rem] transition-all duration-1000 cursor-pointer group overflow-hidden glass-card",
          isHovered ? "border-brand-accent/40 bg-brand-accent/[0.03]" : "border-white/10",
          isScanning && "border-brand-accent bg-brand-accent/[0.05] cursor-default"
        )}
      >
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8 md:space-y-12">
          <div className={cn(
            "w-20 h-20 md:w-32 md:h-32 rounded-3xl md:rounded-[2.5rem] flex items-center justify-center transition-all duration-1000 premium-border",
            isHovered ? "bg-brand-accent/20 text-brand-accent scale-110 shadow-[0_0_60px_rgba(0,209,255,0.2)]" : "bg-white/5 text-brand-muted",
            isScanning && "animate-pulse"
          )}>
            {isScanning ? <Microscope className="w-10 h-10 md:w-16 md:h-16" /> : <Upload className="w-10 h-10 md:w-16 md:h-16" />}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight">
              {isScanning ? "Analyzing Evidence..." : "Drop Impact Evidence"}
            </h3>
            <p className="text-brand-muted text-sm md:text-lg font-medium max-w-[400px] mx-auto leading-relaxed opacity-70">
              {isScanning 
                ? "AI is verifying metadata, GPS integrity, and visual authenticity." 
                : "Drag and drop images, sensor logs, or PDF reports to begin verification."}
            </p>
          </div>

          {!isScanning && (
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-6">
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <Camera className="w-4 h-4" />
                Capture
              </button>
              <div className="hidden sm:block w-px h-6 bg-white/10" />
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <ImageIcon className="w-4 h-4" />
                Browse
              </button>
            </div>
          )}
        </div>

        {/* Scanning Animation Overlay */}
        <AnimatePresence>
          {isScanning && (
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent skew-x-12 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10">
        {[
          { icon: ShieldCheck, label: "Forensic Grade", desc: "Anti-tamper verification" },
          { icon: Globe, label: "Geo-Locked", desc: "GPS & Satellite sync" },
          { icon: Zap, label: "Instant Mint", desc: "Real-time PoI generation" }
        ].map((feature, i) => (
          <div key={i} className="space-y-4 text-center p-6 rounded-3xl bg-white/[0.02] sm:bg-transparent">
            <div className="flex justify-center">
              <div className="p-3 rounded-2xl bg-white/5 premium-border">
                <feature.icon className="w-6 h-6 text-brand-muted/60" />
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-paper">{feature.label}</h4>
              <p className="text-[10px] text-brand-muted font-medium opacity-60">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const StepMetadata = ({ 
  metadata, 
  confidence, 
  previewUrl,
  projectType,
  projectTypes,
  onProjectTypeChange,
  onMetadataChange, 
  onNext, 
  isAnalyzing,
  verificationResult
}: { 
  metadata: string;
  confidence: number;
  previewUrl: string | null;
  projectType: string;
  projectTypes: any[];
  onProjectTypeChange: (type: string) => void;
  onMetadataChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onNext: () => void;
  isAnalyzing: boolean;
  verificationResult: any;
}) => (
  <motion.div 
    key="step2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-8 md:space-y-12"
  >
    <div className="p-8 md:p-12 glass-card rounded-[2.5rem] md:rounded-[3.5rem] space-y-10 md:space-y-16">
      <div className="space-y-6 md:space-y-8">
        <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/60">Select Project Category</div>
        <div className="flex flex-wrap gap-3 md:gap-4">
          {projectTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onProjectTypeChange(type.id)}
              className={cn(
                "px-5 md:px-6 py-2.5 md:py-3 rounded-2xl border transition-all flex items-center gap-3 text-[10px] md:text-[11px] font-bold uppercase tracking-widest",
                projectType === type.id 
                  ? "bg-brand-paper text-brand-ink border-brand-paper shadow-xl scale-105" 
                  : "bg-white/5 border-white/5 text-brand-muted hover:border-white/20 hover:bg-white/10"
              )}
            >
              <type.icon className={cn("w-4 md:w-4.5 h-4 md:h-4.5", projectType === type.id ? "text-brand-ink" : type.color)} />
              {type.id}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">
        <div className="w-full md:w-64 h-64 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden relative group shrink-0 premium-border">
          <img 
            src={previewUrl || "https://picsum.photos/seed/project/400/400"} 
            alt="Evidence Preview" 
            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-[9px] font-bold text-white/50 uppercase tracking-widest">
            <span>RAW_EV_DATA</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(0,209,255,0.5)]" />
              LIVE
            </div>
          </div>
        </div>
        
        <div className="space-y-8 md:space-y-12 flex-1 w-full">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="space-y-3">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Project Site Alpha</h3>
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2.5 text-[10px] md:text-[11px] font-bold text-brand-muted uppercase tracking-widest">
                  <MapPin className="w-4 h-4 opacity-50" />
                  <span>Verified Location</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2.5 text-[10px] md:text-[11px] font-bold text-brand-accent uppercase tracking-widest">
                  <Activity className="w-4 h-4" />
                  <span>{projectType} Impact</span>
                </div>
              </div>
            </div>
            <ForensicConfidence value={confidence} />
          </div>

          <div className="space-y-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/60">Detected Entities</div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Activity', icon: Plus },
                { label: 'Context', icon: Zap },
                { label: 'Impact', icon: Activity }
              ].map((tag, i) => (
                <div key={i} className="px-4 py-2 bg-white/5 border border-white/5 rounded-full flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-paper hover:border-white/20 hover:bg-white/10 transition-all cursor-default">
                  <tag.icon className="w-3.5 h-3.5 opacity-50" />
                  {tag.label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <textarea 
              value={metadata}
              onChange={onMetadataChange}
              placeholder="Add context or metadata..."
              className="w-full h-40 bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 outline-none focus:border-brand-accent/30 transition-all text-base font-medium placeholder:text-brand-muted/30 resize-none"
            />
            {metadata.length === 0 && (
              <div className="absolute left-6 md:left-8 top-6 md:top-8 pointer-events-none text-sm md:text-base text-brand-muted/20 italic">
                AI Suggestion: "Verified 450 saplings..."
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {[
          { icon: Globe, label: 'Satellite', status: 'Active' },
          { icon: Database, label: 'Ledger', status: 'Synced' },
          { icon: Network, label: 'Consensus', status: 'Verified' }
        ].map((item, i) => (
          <div key={i} className="p-6 md:p-8 border border-white/5 rounded-2xl md:rounded-3xl bg-white/[0.02] flex items-center gap-6 group hover:bg-white/[0.05] transition-all premium-border">
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-brand-muted group-hover:text-brand-accent transition-colors">
              <item.icon className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-muted block">{item.label}</span>
              <span className="text-[9px] font-bold text-brand-accent uppercase tracking-[0.2em] flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(0,209,255,0.5)]" />
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={onNext}
        disabled={isAnalyzing}
        className="w-full py-6 md:py-8 bg-brand-paper text-brand-ink rounded-2xl md:rounded-3xl font-bold uppercase tracking-widest text-[11px] md:text-[12px] flex items-center justify-center gap-4 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50 shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-brand-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
        <span className="relative z-10 flex items-center gap-4">
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Evidence...</span>
            </>
          ) : (
            <>
              <Brain className="w-5 h-5" />
              <span>Generate Proof of Impact</span>
            </>
          )}
        </span>
      </button>
    </div>
  </motion.div>
);

const StepSuccess = ({ poiResult, verificationResult, onReset }: { poiResult: any, verificationResult: any, onReset: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
  <motion.div 
    key="step3"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-8 md:space-y-12"
  >
    <div className="p-8 md:p-16 border border-brand-accent/30 rounded-[3rem] md:rounded-[4rem] bg-brand-accent/[0.03] space-y-12 md:space-y-20 relative overflow-hidden group glass-card">
      {/* Abstract Global Propagation Background */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-accent via-transparent to-transparent blur-3xl scale-150" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border border-brand-accent/20 rounded-full border-dashed"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-16 border border-brand-accent/10 rounded-full border-dashed"
          />
        </div>
      </div>

      <div className="absolute top-0 right-0 p-12 md:p-20 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-1000">
        <ShieldCheck className="w-48 h-48 md:w-96 md:h-96 text-brand-accent" />
      </div>
      
      <div className="flex flex-col items-center text-center space-y-8 md:space-y-12 relative z-10">
        <div className="relative">
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 120 }}
            className="w-20 h-20 md:w-32 md:h-32 rounded-3xl md:rounded-[3rem] bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center text-brand-accent shadow-[0_0_80px_rgba(0,209,255,0.3)] premium-border"
          >
            <CheckCircle2 className="w-10 h-10 md:w-16 md:h-16" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -top-3 -right-3 px-3 md:px-4 py-1.5 bg-brand-accent text-brand-ink text-[8px] md:text-[10px] font-bold rounded-full uppercase tracking-widest shadow-xl"
          >
            Immutable
          </motion.div>
        </div>

        <div className="space-y-4">
          <div className="text-[10px] md:text-[12px] font-bold text-brand-accent uppercase tracking-[0.3em] mb-3 text-glow">Impact Confirmed</div>
          <h3 className="text-3xl md:text-6xl font-bold tracking-tight">Proof of Impact Generated</h3>
          <p className="text-brand-muted text-base md:text-xl font-medium max-w-xl mx-auto leading-relaxed px-6 opacity-80">
            PoI <span className="text-brand-paper font-mono bg-white/5 px-2 py-0.5 rounded">#{poiResult?.poi_id?.split('_')[1] || '8291-X'}</span> has been verified by 12 nodes and committed to the global impact ledger.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
        <div className="p-8 md:p-12 glass-card rounded-[2.5rem] md:rounded-[3.5rem] space-y-8 md:space-y-12 hover:bg-white/[0.03] transition-all duration-700 premium-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-accent/10 rounded-2xl text-brand-accent premium-border">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-muted">Forensic Audit</h4>
            </div>
            <div className="flex items-center gap-2 text-[9px] font-bold text-brand-accent uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-brand-accent rounded-full shadow-[0_0_8px_rgba(0,209,255,0.5)]" />
              Passed
            </div>
          </div>
          
          <div className="space-y-6 md:space-y-8">
            {[
              { label: 'Authenticity', confidence: (verificationResult?.authenticity_score * 100).toFixed(1) || 99.2, icon: ShieldCheck },
              { label: 'Context Match', confidence: (verificationResult?.context_match_score * 100).toFixed(1) || 98.8, icon: Search },
              { label: 'Visual Match', confidence: 94.5, icon: Eye }
            ].map((insight, i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-3 text-brand-muted uppercase font-bold tracking-widest opacity-70">
                    <insight.icon className="w-4 h-4 opacity-50" />
                    {insight.label}
                  </div>
                  <span className="text-brand-accent font-mono font-bold">{insight.confidence}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${insight.confidence}%` }}
                    transition={{ delay: 1 + (i * 0.15), duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-brand-accent/50 shadow-[0_0_15px_rgba(0,209,255,0.3)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-12 glass-card rounded-[2.5rem] md:rounded-[3.5rem] space-y-8 md:space-y-12 hover:bg-white/[0.03] transition-all duration-700 premium-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-2xl text-brand-muted premium-border">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-muted">Protocol Delta</h4>
            </div>
            <div className="text-[9px] font-bold text-brand-muted uppercase tracking-widest opacity-50">
              Block #{poiResult?.block_number || '1,292,841'}
            </div>
          </div>

          <div className="space-y-5 md:space-y-8">
            {[
              { label: 'Trust Score', value: `+${(poiResult?.poi_score / 20).toFixed(2)}`, color: 'text-brand-accent', micro: 'Trust Updated' },
              { label: 'VU Minted', value: `+${poiResult?.poi_score || '12.4'}`, color: 'text-brand-paper' },
              { label: 'Global Rank', value: '#42', color: 'text-brand-paper' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-5 md:p-6 border border-white/5 rounded-2xl md:rounded-3xl bg-white/[0.02] relative overflow-hidden group/item hover:bg-white/[0.05] transition-all">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-muted">{item.label}</span>
                  {item.micro && <span className="text-[9px] font-bold text-brand-accent/70 uppercase tracking-widest mt-1.5">{item.micro}</span>}
                </div>
                <span className={cn("text-xl md:text-3xl font-bold tracking-tight", item.color)}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      {verificationResult && (
        <div className="p-8 md:p-12 glass-card rounded-[2.5rem] md:rounded-[3.5rem] space-y-8 relative z-10 premium-border">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-brand-accent/10">
              <Brain className="w-5 h-5 text-brand-accent" />
            </div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-muted">AI Forensic Insights</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/60">Detected Objects</div>
                <div className="flex flex-wrap gap-2.5">
                  {verificationResult.detected_objects?.map((obj: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-white/5 rounded-lg text-[10px] font-mono text-brand-paper border border-white/5">{obj}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/60">Risk Assessment</div>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl w-fit premium-border">
                  <ShieldAlert className={cn("w-4 h-4", verificationResult.risk_assessment === 'low' ? 'text-brand-accent' : 'text-amber-400')} />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-paper">{verificationResult.risk_assessment} risk</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/60">Forensic Reasoning</div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 italic">
                <p className="text-[12px] md:text-[13px] text-brand-muted leading-relaxed">
                  "{verificationResult.reasoning}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 relative z-10">
        <button className="flex-1 py-6 md:py-8 bg-brand-paper text-brand-ink rounded-2xl md:rounded-3xl font-bold uppercase tracking-widest text-[11px] md:text-[12px] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-4 group">
          <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          View on Ledger
        </button>
        <button onClick={onReset} className="px-8 md:px-12 py-6 md:py-8 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl font-bold uppercase tracking-widest text-[11px] md:text-[12px] hover:bg-white/10 transition-all flex items-center justify-center gap-4 active:scale-[0.98]">
          <Plus className="w-5 h-5" />
          Submit New
        </button>
      </div>
    </div>

    {/* Verification Certificate Preview */}
    <div className="p-8 md:p-12 glass-card rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col sm:flex-row items-center justify-between group cursor-pointer hover:bg-white/[0.03] transition-all gap-8 premium-border">
      <div className="flex items-center gap-6 md:gap-8">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white/5 flex items-center justify-center text-brand-muted group-hover:text-brand-accent transition-colors shrink-0 premium-border">
          <FileText className="w-8 h-8 md:w-10 md:h-10" />
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-lg md:text-xl">Impact Certificate</h4>
          <p className="text-[12px] md:text-sm text-brand-muted opacity-70">Download a cryptographically signed PDF of this PoI record.</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ChevronRight className="hidden sm:block w-8 h-8 text-brand-muted group-hover:translate-x-2 transition-transform" />
        <button className="sm:hidden w-full py-4 bg-white/5 rounded-2xl text-[11px] font-bold uppercase tracking-widest">Download PDF</button>
      </div>
    </div>
  </motion.div>
  );
};

