import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Database, 
  Link2, 
  Building2, 
  Coins, 
  History, 
  Network,
  Globe,
  Settings,
  UserCheck,
  UserX,
  GitMerge,
  Search,
  Plus,
  ArrowRight,
  ChevronRight,
  Info,
  MousePointer2,
  FileText,
  Gavel,
  Briefcase,
  MapPin,
  LineChart,
  PieChart,
  Activity,
  Scale,
  Wallet,
  ArrowDownRight,
  ArrowUpRight,
  Lock,
  Unlock,
  RefreshCcw,
  Layout,
  Box,
  Share2,
  Rocket,
  Gift,
  Trophy,
  Users,
  Repeat,
  Target,
  Eye,
  ShieldAlert,
  Microscope,
  Binary
} from 'lucide-react';
import { cn } from '../lib/utils';

const LearningMetric = ({ label, value, improvement, icon: Icon }: any) => (
  <div className="p-6 border border-brand-border rounded-2xl bg-white/[0.01] space-y-2">
    <div className="flex items-center justify-between">
      <div className="p-2 rounded-lg bg-white/5 border border-white/5">
        <Icon className="w-4 h-4 text-brand-muted" />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
        <ArrowUpRight className="w-3 h-3" />
        +{improvement}%
      </div>
    </div>
    <div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">{label}</div>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
    </div>
  </div>
);

const LoopStep = ({ step, title, desc, icon: Icon, active }: any) => (
  <div className={cn(
    "p-6 border rounded-2xl transition-all relative flex flex-col justify-between h-full",
    active ? "bg-brand-accent/5 border-brand-accent/40" : "bg-white/5 border-brand-border opacity-50"
  )}>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
          <Icon className="w-4 h-4 text-brand-accent" />
        </div>
        <div className="text-[10px] font-mono font-bold text-brand-muted">STEP {step}</div>
      </div>
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest">{title}</h4>
        <p className="text-[10px] text-brand-muted leading-relaxed mt-2">
          {desc}
        </p>
      </div>
    </div>
  </div>
);

export const SelfImprovingAIView = () => {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 4) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-16 pb-32">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Recursive Trust Engine</h2>
          <p className="text-brand-muted text-lg mt-2">Self-Improving AI for Global Impact Verification</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-3">
            <Brain className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">Status: Learning</span>
          </div>
        </div>
      </div>

      {/* 1. Learning Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <LearningMetric label="Verification Accuracy" value="99.92%" improvement={0.4} icon={Target} />
        <LearningMetric label="Fraud Detection Rate" value="99.98%" improvement={0.1} icon={ShieldCheck} />
        <LearningMetric label="Funding Efficiency" value="94.2%" improvement={2.8} icon={Zap} />
        <LearningMetric label="Bias Variance" value="<0.01%" improvement={15.2} icon={Scale} />
      </div>

      {/* 2. The Learning Loop */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Repeat className="w-6 h-6 text-brand-muted" />
          <h3 className="text-2xl font-bold">The Closed-Loop Learning Cycle</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <LoopStep 
            step="1" 
            title="Prediction" 
            desc="AI predicts impact success and fraud risk based on historical PoI data." 
            icon={Binary} 
            active={activeStep === 1}
          />
          <LoopStep 
            step="2" 
            title="Execution" 
            desc="Project is funded and PoI is submitted via the decentralized network." 
            icon={Rocket} 
            active={activeStep === 2}
          />
          <LoopStep 
            step="3" 
            title="Outcome" 
            desc="Ground-truth impact is verified by high-trust human validators." 
            icon={UserCheck} 
            active={activeStep === 3}
          />
          <LoopStep 
            step="4" 
            title="Retraining" 
            desc="Delta between prediction and outcome is fed back into the model." 
            icon={RefreshCcw} 
            active={activeStep === 4}
          />
          
          {/* Connecting Lines (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[23%] w-[4%] border-t border-dashed border-brand-accent/30" />
          <div className="hidden md:block absolute top-1/2 left-[48%] w-[4%] border-t border-dashed border-brand-accent/30" />
          <div className="hidden md:block absolute top-1/2 left-[73%] w-[4%] border-t border-dashed border-brand-accent/30" />
        </div>
      </section>

      {/* 3. AI Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-6">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-brand-accent" />
            <h3 className="text-xl font-bold">Verification</h3>
          </div>
          <p className="text-xs text-brand-muted leading-relaxed">
            Vision models are continuously retrained on edge cases identified by human validators (e.g., specific crop diseases or soil types).
          </p>
          <div className="pt-4 border-t border-white/5 space-y-3">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-brand-muted">
              <span>Confidence Threshold</span>
              <span>92%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-brand-accent w-[92%]" />
            </div>
          </div>
        </div>

        <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-6">
          <div className="flex items-center gap-3">
            <Coins className="w-6 h-6 text-brand-accent" />
            <h3 className="text-xl font-bold">Funding</h3>
          </div>
          <p className="text-xs text-brand-muted leading-relaxed">
            IRS (Impact Risk Score) models adjust their weighting of "Trust Score" vs. "Regional Volatility" based on actual project outcomes.
          </p>
          <div className="pt-4 border-t border-white/5 space-y-3">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-brand-muted">
              <span>Outcome Correlation</span>
              <span>0.88</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-brand-accent w-[88%]" />
            </div>
          </div>
        </div>

        <div className="p-8 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-brand-accent" />
            <h3 className="text-xl font-bold">Forensics</h3>
          </div>
          <p className="text-xs text-brand-muted leading-relaxed">
            Anomaly detection thresholds are dynamically updated as new fraud vectors (e.g., Deepfake PoI) are discovered by the network.
          </p>
          <div className="pt-4 border-t border-white/5 space-y-3">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-brand-muted">
              <span>Detection Precision</span>
              <span>99.9%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-brand-accent w-[99.9%]" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Safeguards & Bias */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-10 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-8">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-brand-accent" />
            <h3 className="text-2xl font-bold">Human-in-the-Loop</h3>
          </div>
          <div className="space-y-4">
            {[
              { title: "The Forensic Jury", desc: "High-trust nodes act as a 'Supreme Court' for disputed AI decisions." },
              { title: "Threshold Gates", desc: "Funding > $50k or Global Bans require a 3-person human sign-off." },
              { title: "Active Learning", desc: "AI routes low-confidence cases to human experts for manual labeling." },
              { title: "Retraining Veto", desc: "Governance can veto model updates that show statistical bias." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 border border-brand-accent/10 rounded-2xl bg-brand-accent/[0.02]">
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-1.5" />
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-1">{item.title}</h4>
                  <p className="text-[10px] text-brand-paper/80 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 border border-brand-border rounded-[2.5rem] bg-white/[0.01] space-y-8">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-brand-accent" />
            <h3 className="text-2xl font-bold">Bias Mitigation</h3>
          </div>
          <div className="space-y-6">
            <p className="text-xs text-brand-muted leading-relaxed">
              How does Zentari ensure its AI doesn't inherit human or regional biases?
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <Lock className="w-4 h-4 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Blind Verification</h4>
                  <p className="text-[10px] text-brand-muted">AI scores PoI without seeing the identity or nationality of the submitter.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <Globe className="w-4 h-4 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Regional Weighting</h4>
                  <p className="text-[10px] text-brand-muted">Data from Zambia, Indonesia, and Brazil is weighted equally to prevent overfitting.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <Microscope className="w-4 h-4 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Bias Audit Agent</h4>
                  <p className="text-[10px] text-brand-muted">A secondary AI specifically hunts for correlations between protected attributes and denials.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Goal */}
      <section className="p-12 border border-brand-border rounded-[3rem] bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Brain className="w-48 h-48" />
        </div>
        <div className="max-w-3xl space-y-8">
          <h3 className="text-3xl font-bold">The Recursive Trust Goal</h3>
          <p className="text-brand-muted text-lg leading-relaxed">
            As the AI gets smarter, the **Cost of Verification** decreases while the **Certainty of Impact** increases.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-brand-accent/20 rounded-2xl bg-brand-accent/5">
              <h4 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-2">Today</h4>
              <p className="text-xs text-brand-muted">High human involvement for every PoI. High cost, high trust.</p>
            </div>
            <div className="p-6 border border-emerald-400/20 rounded-2xl bg-emerald-400/5">
              <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-2">Tomorrow</h4>
              <p className="text-xs text-brand-muted">AI handles 99% of routine verification. Human experts focus only on complex edge cases. Low cost, absolute trust.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
