import React, { useState } from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  FileText, 
  BookOpen, 
  Terminal, 
  Download, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { PRD_CONTENT, USER_GUIDE_CONTENT, TECHNICAL_GUIDE_CONTENT } from '../constants/documentation';
import { cn } from '../lib/utils';

type DocType = 'prd' | 'user' | 'tech';

export function DocumentationView() {
  const [activeDoc, setActiveDoc] = useState<DocType>('prd');

  const docs = {
    prd: {
      title: 'Product Requirements',
      icon: FileText,
      content: PRD_CONTENT,
      filename: 'Zentari_PRD.md'
    },
    user: {
      title: 'User Guide',
      icon: BookOpen,
      content: USER_GUIDE_CONTENT,
      filename: 'Zentari_User_Guide.md'
    },
    tech: {
      title: 'Technical Guide',
      icon: Terminal,
      content: TECHNICAL_GUIDE_CONTENT,
      filename: 'Zentari_Technical_Guide.md'
    }
  };

  const handleDownload = () => {
    const doc = docs[activeDoc];
    const blob = new Blob([doc.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    const combinedContent = `
# Zentari Documentation Bundle
Generated on: ${new Date().toLocaleDateString()}

---

${PRD_CONTENT}

---

${USER_GUIDE_CONTENT}

---

${TECHNICAL_GUIDE_CONTENT}
    `;
    const blob = new Blob([combinedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Zentari_Documentation_Bundle.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">Documentation</h1>
          <p className="text-zinc-400 text-sm md:text-base">Comprehensive guides for the Zentari protocol.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors border border-zinc-700 text-xs md:text-sm active:scale-95"
          >
            <Download size={14} className="md:w-4 md:h-4" />
            <span>Current</span>
          </button>
          <button
            onClick={handleDownloadAll}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-brand-ink rounded-lg transition-colors font-bold text-xs md:text-sm active:scale-95"
          >
            <Download size={14} className="md:w-4 md:h-4" />
            <span>Download All</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
            {(Object.keys(docs) as DocType[]).map((key) => {
              const Icon = docs[key].icon;
              const isActive = activeDoc === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveDoc(key)}
                  className={cn(
                    "flex-1 flex items-center justify-between p-3 md:p-4 rounded-xl transition-all border text-left",
                    isActive 
                      ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" 
                      : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="md:w-5 md:h-5" />
                    <span className="font-medium text-xs md:text-sm">{docs[key].title}</span>
                  </div>
                  <ChevronRight size={14} className={cn("transition-transform md:w-4 md:h-4", isActive && "rotate-90")} />
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4">
            <h3 className="text-[10px] md:text-xs font-semibold text-zinc-300 uppercase tracking-wider">Resources</h3>
            <div className="space-y-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between text-xs md:text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <span>GitHub Repository</span>
                <ExternalLink size={12} className="md:w-3.5 md:h-3.5" />
              </a>
              <a 
                href="https://firebase.google.com/docs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between text-xs md:text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <span>Firebase Docs</span>
                <ExternalLink size={12} className="md:w-3.5 md:h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeDoc}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 md:p-8 prose prose-invert prose-emerald max-w-none shadow-2xl overflow-x-auto"
          >
            <div className="markdown-body text-sm md:text-base">
              <ReactMarkdown>{docs[activeDoc].content}</ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
