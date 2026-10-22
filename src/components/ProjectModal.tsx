import React, { useEffect } from 'react';
import { X, Lock, Globe, CheckCircle2, Layers, Cpu, ShieldCheck, Activity, Terminal, Sparkles } from 'lucide-react';
import type { ProjectCaseStudy } from '../data/resumeData';

interface ProjectModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 text-stone-900 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-start justify-between gap-4 z-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                  project.status === 'Production (.uz)'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {project.status}
              </span>

              {project.isNDA ? (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium bg-rose-50 text-rose-700 border border-rose-200">
                  <Lock className="w-3 h-3" />
                  NDA / Yopiq tizim (.uz)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium bg-sky-50 text-sky-700 border border-sky-200">
                  <Globe className="w-3 h-3" />
                  Ochiq tizim (Public)
                </span>
              )}

              <span className="text-xs text-stone-500 font-medium px-2 py-0.5 bg-stone-100 rounded-md">
                {project.category}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-stone-950 tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors shrink-0"
            title="Yopish (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-stone-800">

          {/* Banner Notice */}
          {project.isNDA ? (
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-950 mb-0.5">
                  Davlat & Korporativ Xavfsizlik Siyosati (NDA):
                </p>
                <p>{project.ndaNotice}</p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200 text-sky-900 flex items-start gap-3 text-xs leading-relaxed">
              <Globe className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sky-950 mb-0.5">
                  Ochiq Platforma:
                </p>
                <p>{project.ndaNotice}</p>
              </div>
            </div>
          )}

          {/* Business Objective */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-stone-700" />
              Loyiha Maqsadi & Biznes Qiymati
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200/80">
              {project.businessObjective}
            </p>
          </div>

          {/* Architecture Solutions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-stone-700" />
              Asosiy Arxitekturaviy & Texnik Yechimlar
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {project.architectureSolutions.map((arch, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="font-semibold text-stone-900 text-sm">
                      {arch.title}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {arch.tags.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {arch.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Asosiy Funksionalliklar & Modullar
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              {project.keyFeatures.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-900 shrink-0 mt-1.5"></span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Categorized */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-stone-700" />
              Texnologik Stek
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.techStack.map((stack, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs"
                >
                  <span className="font-semibold text-stone-800 block mb-1.5">
                    {stack.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.items.map((it, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-white text-stone-700 font-mono text-[11px] rounded border border-stone-200 shadow-2xs"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Challenges & Solutions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-stone-700" />
              Muhandislik Qiyinchiliklari va Yechimi (Bottlenecks)
            </h3>
            <div className="p-3.5 rounded-xl bg-stone-900 text-stone-100 font-sans text-xs leading-relaxed border border-stone-800">
              <p className="text-stone-300">{project.challengesAndSolutions}</p>
            </div>
          </div>

          {/* Live Code / Interview Ready Box */}
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-indigo-950">
                  Jonli Suhbat (Live Interview) Namoyishi:
                </p>
                <p className="text-xs text-indigo-800">
                  {project.liveDemoNote}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-stone-50 px-6 py-3.5 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            {project.clientOrOrg} • {project.period}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-xl transition-colors shadow-xs"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
