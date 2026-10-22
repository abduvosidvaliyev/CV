import React, { useState, useMemo } from 'react';
import { resumeData } from '../data/resumeData';
import type { ProjectCaseStudy } from '../data/resumeData';
import { Lock, Globe, Search, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

export const PortfolioView: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Barchasi');

  const categories = ['Barchasi', 'Production (.uz)', 'In Progress / MVP', 'Real-Time', 'AI & LLM', 'Monitoring', 'ERP & CRM'];

  const filteredProjects = useMemo(() => {
    return resumeData.projects.filter((project) => {
      // Category filter
      if (activeCategory === 'Production (.uz)' && project.status !== 'Production (.uz)') return false;
      if (activeCategory === 'In Progress / MVP' && project.status !== 'In Progress / MVP') return false;
      if (activeCategory === 'Real-Time' && !project.category.includes('Real-Time') && !project.category.includes('Video')) return false;
      if (activeCategory === 'AI & LLM' && !project.category.includes('AI')) return false;
      if (activeCategory === 'Monitoring' && !project.category.includes('Monitoring')) return false;
      if (activeCategory === 'ERP & CRM' && !project.category.includes('ERP') && !project.category.includes('CRM')) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = project.title.toLowerCase().includes(query);
        const inSubtitle = project.subtitle.toLowerCase().includes(query);
        const inSummary = project.shortSummary.toLowerCase().includes(query);
        const inTech = project.techStack.some((ts) =>
          ts.items.some((item) => item.toLowerCase().includes(query))
        );
        return inTitle || inSubtitle || inSummary || inTech;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Page Header & HR Context */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-100 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Case Studies & Arxitektura Portfoliyasi</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-950 tracking-tight mb-3">
          10 ta Korporativ & Davlat Tizimlari
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          Ushbu bo'limda O'zbekiston davlat idoralari va korxonalari uchun noldan ishlab chiqilgan, 
          yuqori yuklamali ERP, real-vaqt monitoring, LiveKit video va AI-streaming loyihalarining batafsil texnik arxitekturasi jamlangan.
        </p>

        {/* General NDA Disclaimer Card */}
        <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-200/70 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xs leading-relaxed">
              <span className="font-bold text-amber-900 block mb-0.5">
                🔒 Axborot Xavfsizligi va NDA (Non-Disclosure Agreement) Izohi:
              </span>
              Yopiq korporativ tizimlar davlat va kompaniya xavfsizlik protokollari bilan himoyalangan. 
              <strong> Texnik suhbat (Technical Interview) davomida loyihalarning to'liq arxitekturasi va kod bazasini jonli (Live) tushuntirib bera olaman.</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-8">
        
        {/* Categories / Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] sm:min-w-[280px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Texnologiya yoki loyiha izlash..."
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-stone-900 focus:ring-1 focus:ring-stone-900 shadow-2xs"
          />
        </div>

      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group relative bg-white rounded-2xl border border-stone-200/90 hover:border-stone-900 p-5 sm:p-6 transition-all duration-200 hover:shadow-lg flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Card Top: Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-stone-400">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
                      project.status === 'Production (.uz)'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {project.isNDA ? (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium bg-rose-50 text-rose-700 border border-rose-200/80">
                    <Lock className="w-3 h-3" />
                    🔒 NDA / Yopiq tizim (.uz)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium bg-sky-50 text-sky-700 border border-sky-200/80">
                    <Globe className="w-3 h-3" />
                    🌐 Ochiq tizim (Public)
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-stone-950 transition-colors mb-1">
                {project.title}
              </h3>
              <p className="text-xs text-stone-500 font-medium mb-3">
                {project.subtitle}
              </p>

              {/* Short Summary */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4 line-clamp-3">
                {project.shortSummary}
              </p>

              {/* Key Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack
                  .flatMap((ts) => ts.items)
                  .slice(0, 5)
                  .map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[11px] font-mono border border-stone-200/60"
                    >
                      {tech}
                    </span>
                  ))}
                {project.techStack.flatMap((ts) => ts.items).length > 5 && (
                  <span className="px-2 py-0.5 rounded bg-stone-50 text-stone-500 text-[11px] font-mono">
                    +{project.techStack.flatMap((ts) => ts.items).length - 5}
                  </span>
                )}
              </div>
            </div>

            {/* Card Bottom: Notice & Open Button */}
            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2.5">
              <p className="text-[11px] text-stone-500 italic flex items-start gap-1.5 leading-tight">
                <span className={project.isNDA ? "text-amber-600 font-bold shrink-0" : "text-sky-600 font-bold shrink-0"}>
                  ※
                </span>
                <span>
                  {project.isNDA
                    ? "Texnik suhbat davomida arxitektura va kod tuzilmasini jonli (Live) ko'rsatib berish imkoniyati mavjud."
                    : "Ushbu tizim hamma uchun ochiq korporativ boshqaruv platformasi hisoblanadi."}
                </span>
              </p>

              <div className="flex items-center justify-between text-xs font-semibold text-stone-900 group-hover:text-stone-950 pt-1">
                <span className="text-stone-500 text-[11px] font-normal">
                  {project.period}
                </span>
                <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Texnik Case Study ni ko'rish
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
          <p className="text-sm font-semibold text-stone-700">Hech qanday loyiha topilmadi</p>
          <p className="text-xs text-stone-500 mt-1">Qidiruv so'zini yoki filtrlarni o'zgartirib ko'ring</p>
        </div>
      )}

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
};
