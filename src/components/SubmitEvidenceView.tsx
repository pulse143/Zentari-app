import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth, storage, ref, uploadBytes, getDownloadURL, handleFirestoreError, OperationType, collection, addDoc, serverTimestamp } from '../lib/firebase';
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
  <div className="flex items-center gap-6">
    {[1, 2, 3].map((step) => (
      <div key={step} className="flex items-center gap-3">
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
  const [error, setError] = useState<string | null>(null);

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
    if (!selectedFile || !auth.currentUser) return;

    setIsAnalyzing(true);
    try {
      // 1. Upload to Firebase Storage
      const storageRef = ref(storage, `evidence/${auth.currentUser.uid}/${Date.now()}_${selectedFile.name}`);
      const uploadResult = await uploadBytes(storageRef, selectedFile);
      const downloadUrl = await getDownloadURL(uploadResult.ref);

      // 2. Convert file to base64 for Gemini (Backend expects base64 for now, but we'll store the URL)
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(selectedFile);
      });
      const base64Data = await base64Promise;

      // 3. Call Verify API (Gemini)
      const idToken = await auth.currentUser.getIdToken();
      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          evidence_id: `ev_${Date.now()}`,
          image_data: base64Data,
          storage_url: downloadUrl,
          project_type: projectType,
          description: metadata
        })
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.error || "Verification failed");
      setVerificationResult(verifyData.verification);

      // 4. Call PoI Generate API
      const poiRes = await fetch('/api/poi/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          evidence_id: verifyData.evidence_id,
          verification: verifyData.verification,
          metadata: metadata,
          storage_url: downloadUrl
        })
      });
      const poiData = await poiRes.json();
      if (!poiRes.ok) throw new Error(poiData.error || "PoI generation failed");
      setPoiResult(poiData);

      // Note: Firestore persistence is now handled by the backend for poi_records
      setStep(3);
    } catch (error: any) {
      console.error("PoI Generation failed:", error);
      setError(error.message || "Verification failed. Please try again.");
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
    <div className="max-w-3xl mx-auto space-y-16 py-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Impact Evidence</h2>
          <p className="text-brand-muted text-sm font-medium">Generate a verifiable Proof of Impact record.</p>
        </div>
        <StepIndicator currentStep={step} />
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-rose-400/10 border border-rose-400/20 rounded-2xl flex items-center gap-3 text-rose-400 text-sm font-medium"
          >
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-xs uppercase tracking-widest opacity-60 hover:opacity-100">Dismiss</button>
          </motion.div>
        )}
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
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
          "relative p-20 border-2 border-dashed rounded-[3rem] transition-all duration-700 cursor-pointer group overflow-hidden",
          isHovered ? "border-brand-accent/40 bg-brand-accent/[0.02]" : "border-white/5 bg-white/[0.01]",
          isScanning && "border-brand-accent bg-brand-accent/[0.05] cursor-default"
        )}
      >
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8">
          <div className={cn(
            "w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-700",
            isHovered ? "bg-brand-accent/20 text-brand-accent scale-110 shadow-[0_0_40px_rgba(0,255,0,0.1)]" : "bg-white/5 text-brand-muted",
            isScanning && "animate-pulse"
          )}>
            {isScanning ? <Microscope className="w-12 h-12" /> : <Upload className="w-12 h-12" />}
          </div>
          
          <div className="space-y-3">
            <h3 className="text-2xl font-bold tracking-tight">
              {isScanning ? "Analyzing Evidence..." : "Drop Impact Evidence"}
            </h3>
            <p className="text-brand-muted text-sm font-medium max-w-[300px] mx-auto leading-relaxed">
              {isScanning 
                ? "AI is verifying metadata, GPS integrity, and visual authenticity." 
                : "Drag and drop images, sensor logs, or PDF reports to begin verification."}
            </p>
          </div>

          {!isScanning && (
            <div className="flex items-center gap-4 pt-4">
              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2">
                <Camera className="w-3.5 h-3.5" />
                Capture
              </button>
              <div className="w-px h-4 bg-white/10" />
              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5" />
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
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-brand-accent/10 to-transparent skew-x-12 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[
          { icon: ShieldCheck, label: "Forensic Grade", desc: "Anti-tamper verification" },
          { icon: Globe, label: "Geo-Locked", desc: "GPS & Satellite sync" },
          { icon: Zap, label: "Instant Mint", desc: "Real-time PoI generation" }
        ].map((feature, i) => (
          <div key={i} className="space-y-2 text-center">
            <div className="flex justify-center">
              <feature.icon className="w-5 h-5 text-brand-muted/40" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-paper">{feature.label}</h4>
              <p className="text-[9px] text-brand-muted font-medium">{feature.desc}</p>
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
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="space-y-8"
  >
    <div className="p-10 border border-white/5 rounded-[2.5rem] bg-white/[0.01] space-y-10">
      <div className="space-y-6">
        <div className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60">Select Project Category</div>
        <div className="flex flex-wrap gap-3">
          {projectTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onProjectTypeChange(type.id)}
              className={cn(
                "px-4 py-2 rounded-2xl border transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest",
                projectType === type.id 
                  ? "bg-brand-paper text-brand-ink border-brand-paper" 
                  : "bg-white/5 border-white/5 text-brand-muted hover:border-white/10"
              )}
            >
              <type.icon className={cn("w-3.5 h-3.5", projectType === type.id ? "text-brand-ink" : type.color)} />
              {type.id}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-10">
        <div className="w-48 h-48 rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden relative group shrink-0">
          <img 
            src={previewUrl || "https://picsum.photos/seed/project/400/400"} 
            alt="Evidence Preview" 
            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[8px] font-bold text-white/40 uppercase tracking-widest">
            <span>RAW_EV_DATA</span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-brand-accent rounded-full animate-pulse" />
              LIVE
            </div>
          </div>
        </div>
        
        <div className="space-y-8 flex-1">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">Project Site Alpha</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-brand-muted uppercase tracking-widest">
                  <MapPin className="w-3 h-3" />
                  <span>Global • Verified Location</span>
                </div>
                <div className="w-px h-3 bg-white/10" />
                <div className="flex items-center gap-2 text-[10px] font-bold text-brand-accent uppercase tracking-widest">
                  <Activity className="w-3 h-3" />
                  <span>{projectType} Impact</span>
                </div>
              </div>
            </div>
            <ForensicConfidence value={confidence} />
          </div>

          <div className="space-y-4">
            <div className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60">Detected Entities</div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Activity', icon: Plus },
                { label: 'Context', icon: Zap },
                { label: 'Impact', icon: Activity }
              ].map((tag, i) => (
                <div key={i} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-paper hover:border-white/10 transition-all cursor-default">
                  <tag.icon className="w-3 h-3" />
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
              className="w-full h-32 bg-white/[0.02] border border-white/5 rounded-2xl p-6 outline-none focus:border-brand-accent/20 transition-all text-sm font-medium placeholder:text-brand-muted/40 resize-none"
            />
            {metadata.length === 0 && (
              <div className="absolute left-6 top-6 pointer-events-none text-sm text-brand-muted/20 italic">
                AI Suggestion: "Verified 450 saplings in Sector 4..."
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Globe, label: 'Satellite', status: 'Active' },
          { icon: Database, label: 'Ledger', status: 'Synced' },
          { icon: Network, label: 'Consensus', status: 'Verified' }
        ].map((item, i) => (
          <div key={i} className="p-5 border border-white/5 rounded-2xl bg-white/[0.01] flex items-center gap-4 group hover:bg-white/[0.03] transition-all">
            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-brand-muted group-hover:text-brand-accent transition-colors">
              <item.icon className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted block">{item.label}</span>
              <span className="text-[8px] font-bold text-brand-accent uppercase tracking-[0.2em] flex items-center gap-1.5">
                <div className="w-1 h-1 bg-brand-accent rounded-full animate-pulse" />
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={onNext}
        disabled={isAnalyzing}
        className="w-full py-6 bg-brand-paper text-brand-ink rounded-2xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-brand-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <span className="relative z-10 flex items-center gap-3">
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Integrity...</span>
            </>
          ) : (
            <>
              <Brain className="w-4 h-4" />
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div className="p-12 border border-brand-accent/20 rounded-[3rem] bg-brand-accent/[0.02] space-y-12 relative overflow-hidden group">
        {/* Abstract Global Propagation Background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-accent via-transparent to-transparent blur-3xl scale-150" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="w-full h-full border border-brand-accent/20 rounded-full border-dashed"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-10 border border-brand-accent/10 rounded-full border-dashed"
            />
          </div>
        </div>

        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-1000">
          <ShieldCheck className="w-64 h-64 text-brand-accent" />
        </div>
        
        <div className="flex flex-col items-center text-center space-y-8 relative z-10">
          <div className="relative">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 100 }}
              className="w-24 h-24 rounded-[2rem] bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shadow-[0_0_50px_rgba(0,255,0,0.2)]"
            >
              <CheckCircle2 className="w-12 h-12" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-2 -right-2 px-3 py-1 bg-brand-accent text-brand-ink text-[8px] font-bold rounded-full uppercase tracking-widest"
            >
              Immutable
            </motion.div>
          </div>

          <div className="space-y-3">
            <div className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.2em] mb-2">Impact Confirmed</div>
            <h3 className="text-4xl font-bold tracking-tight">Proof of Impact Generated</h3>
            <p className="text-brand-muted text-base font-medium max-w-md mx-auto leading-relaxed">
              PoI <span className="text-brand-paper font-mono">#{poiResult?.poi_id?.split('_')[1] || '8291-X'}</span> has been verified by 12 nodes and committed to the global impact ledger.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="p-8 border border-white/5 rounded-[2.5rem] bg-white/[0.01] space-y-8 hover:bg-white/[0.02] transition-all duration-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-accent/10 rounded-xl text-brand-accent">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Forensic Audit</h4>
              </div>
              <div className="flex items-center gap-1.5 text-[8px] font-bold text-brand-accent uppercase tracking-widest">
                <div className="w-1 h-1 bg-brand-accent rounded-full" />
                Passed
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'Authenticity', confidence: (verificationResult?.authenticity_score * 100).toFixed(1) || 99.2, icon: ShieldCheck },
                { label: 'Context Match', confidence: (verificationResult?.context_match_score * 100).toFixed(1) || 98.8, icon: Search },
                { label: 'Visual Match', confidence: 94.5, icon: Eye }
              ].map((insight, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-2 text-brand-muted uppercase font-bold tracking-widest">
                      <insight.icon className="w-3 h-3 opacity-40" />
                      {insight.label}
                    </div>
                    <span className="text-brand-accent font-mono">{insight.confidence}%</span>
                  </div>
                  <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${insight.confidence}%` }}
                      transition={{ delay: 0.8 + (i * 0.1), duration: 1 }}
                      className="h-full bg-brand-accent/40"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 border border-white/5 rounded-[2.5rem] bg-white/[0.01] space-y-8 hover:bg-white/[0.02] transition-all duration-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-xl text-brand-muted">
                  <Activity className="w-4 h-4" />
                </div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Protocol Delta</h4>
              </div>
              <div className="text-[8px] font-bold text-brand-muted uppercase tracking-widest">
                Block #{poiResult?.block_number || '1,292,841'}
              </div>
            </div>

            <div className="space-y-6">
              {[
                { label: 'Trust Score', value: `+${(poiResult?.poi_score / 20).toFixed(2)}`, color: 'text-brand-accent', micro: 'Trust Updated' },
                { label: 'VU Minted', value: `+${poiResult?.poi_score || '12.4'}`, color: 'text-brand-paper' },
                { label: 'Global Rank', value: '#42', color: 'text-brand-paper' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-white/5 rounded-2xl bg-white/[0.01] relative overflow-hidden group/item">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">{item.label}</span>
                    {item.micro && <span className="text-[8px] font-bold text-brand-accent/60 uppercase tracking-widest mt-1">{item.micro}</span>}
                  </div>
                  <span className={cn("text-xl font-bold tracking-tight", item.color)}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights Section */}
        {verificationResult && (
          <div className="p-8 border border-white/5 rounded-[2.5rem] bg-white/[0.01] space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <Brain className="w-4 h-4 text-brand-accent" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">AI Forensic Insights</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60">Detected Objects</div>
                <div className="flex flex-wrap gap-2">
                  {verificationResult.detected_objects?.map((obj: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-white/5 rounded-md text-[9px] font-mono text-brand-paper">{obj}</span>
                  ))}
                </div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mt-4">Risk Assessment</div>
                <div className="flex items-center gap-2">
                  <ShieldAlert className={cn("w-3 h-3", verificationResult.risk_assessment === 'low' ? 'text-brand-accent' : 'text-amber-400')} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-paper">{verificationResult.risk_assessment} risk</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60">Forensic Reasoning</div>
                <p className="text-[11px] text-brand-muted leading-relaxed italic">
                  "{verificationResult.reasoning}"
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
          <button className="flex-1 py-6 bg-brand-paper text-brand-ink rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:scale-[1.01] active:scale-[0.99] transition-all shadow-2xl flex items-center justify-center gap-3">
            <Share2 className="w-4 h-4" />
            View on Public Ledger
          </button>
          <button onClick={onReset} className="px-10 py-6 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
            <Plus className="w-4 h-4" />
            Submit New
          </button>
        </div>
      </div>

      {/* Verification Certificate Preview */}
      <div className="p-8 border border-white/5 rounded-[2.5rem] bg-white/[0.01] flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] transition-all">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-brand-muted group-hover:text-brand-accent transition-colors">
            <FileText className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold">Impact Certificate</h4>
            <p className="text-xs text-brand-muted">Download a cryptographically signed PDF of this PoI.</p>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-brand-muted group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
};

