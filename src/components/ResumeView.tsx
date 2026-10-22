import React from 'react';
import { resumeData } from '../data/resumeData';
import {
  Download,
  Calendar,
  MapPin,
  Phone,
  Send,
  Info,
  Loader2,
} from 'lucide-react';
import { GithubIcon } from './Icons';

interface ResumeViewProps {
  onDownloadPdf: () => void;
  isDownloadingPdf?: boolean;
}

export const ResumeView: React.FC<ResumeViewProps> = ({ onDownloadPdf, isDownloadingPdf = false }) => {
  const { personalInfo, summary, skillCategories, workExperience, education, languages } = resumeData;

  return (
    <div className="cv-page-container w-full py-6 sm:py-10 flex flex-col items-center bg-stone-100">
      
      {/* Screen Helper Toolbar (Hidden in Print) */}
      <div className="no-print w-full max-w-[210mm] mb-4 px-3 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 bg-white p-3 rounded-xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-stone-500 shrink-0" />
          <span>
            <strong>Harvard / Jake's Resume A4</strong>. Tugmani bosganingizda to'g'ridan-to'g'ri PDF fayl yuklab olinadi.
          </span>
        </div>
        <button
          id="cv-download-direct-btn"
          onClick={onDownloadPdf}
          disabled={isDownloadingPdf}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:bg-stone-500 text-white font-medium text-xs transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          {isDownloadingPdf ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>PDF tayyorlanmoqda...</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>PDF shaklda yuklab olish</span>
            </>
          )}
        </button>
      </div>

      {/* A4 Strict Paper Sheet */}
      <div
        id="cv-print-sheet"
        className="cv-page text-[#111827] bg-white font-sans text-[10.5px] leading-[1.35] select-text box-border"
        style={{ width: '210mm', minHeight: '297mm', padding: '10mm 14mm' }}
      >
        
        {/* HEADER */}
        <header className="text-center pb-2 border-b border-stone-300">
          <h1 className="text-[22px] font-bold tracking-tight text-stone-950 uppercase mb-0.5">
            {personalInfo.name}
          </h1>
          <p className="text-[12px] font-semibold text-stone-700 tracking-wide mb-2">
            {personalInfo.title}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-stone-700">
            <span className="inline-flex items-center gap-1 font-medium text-stone-900">
              <Calendar className="w-3 h-3 text-stone-600 shrink-0" />
              {personalInfo.age}
            </span>
            <span className="text-stone-300 font-normal">|</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-stone-600 shrink-0" />
              {personalInfo.location}
            </span>
            <span className="text-stone-300 font-normal">|</span>
            <a
              href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
              className="hover:underline inline-flex items-center gap-1 text-stone-900 font-medium"
            >
              <Phone className="w-3 h-3 text-stone-600 shrink-0" />
              {personalInfo.phone}
            </a>
            <span className="text-stone-300 font-normal">|</span>
            <a
              href={personalInfo.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:underline inline-flex items-center gap-1 text-stone-900 font-medium"
            >
              <Send className="w-3 h-3 text-stone-600 shrink-0" />
              t.me/Valiyev_0915
            </a>
            <span className="text-stone-300 font-normal">|</span>
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:underline inline-flex items-center gap-1 text-stone-900 font-medium"
            >
              <GithubIcon className="w-3 h-3 text-stone-600 shrink-0" />
              {personalInfo.github}
            </a>
          </div>
        </header>

        {/* SECTION: SUMMARY */}
        <section className="mt-2.5">
          <h2 className="text-[11px] font-bold tracking-wider uppercase text-stone-900 border-b border-stone-900 pb-0.5 mb-1.5">
            QISQACHA MA'LUMOT
          </h2>
          <p className="text-stone-700 text-justify text-[10px] leading-[1.4]">
            {summary}
          </p>
        </section>

        {/* SECTION: TECHNICAL SKILLS */}
        <section className="mt-2.5">
          <h2 className="text-[11px] font-bold tracking-wider uppercase text-stone-900 border-b border-stone-900 pb-0.5 mb-1.5">
            TEXNIK KO'NIKMALAR
          </h2>
          <div className="space-y-0.5 text-[10px]">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="flex leading-[1.38]">
                <span className="font-semibold text-stone-900 w-[185px] shrink-0">
                  {cat.title}:
                </span>
                <span className="text-stone-700">
                  {cat.skills.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: WORK EXPERIENCE */}
        <section className="mt-2.5">
          <h2 className="text-[11px] font-bold tracking-wider uppercase text-stone-900 border-b border-stone-900 pb-0.5 mb-1.5">
            ISH TAJRIBASI
          </h2>

          <div className="space-y-2.5">
            {/* Experience Item 1: Raqamli Nazorat MChJ */}
            <div>
              <div className="flex justify-between items-baseline">
                <span className="text-[10.5px] font-bold text-stone-950">
                  {workExperience[0].company}
                </span>
                <span className="text-[9.5px] font-medium text-stone-600">
                  {workExperience[0].period}
                </span>
              </div>
              <div className="flex justify-between items-baseline italic text-stone-700 text-[10px] mb-1">
                <span>{workExperience[0].role}</span>
                <span className="not-italic text-[9.5px] text-stone-500">{workExperience[0].location}</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-[9.5px] text-stone-700 leading-[1.34]">
                {workExperience[0].achievements.map((item, idx) => {
                  const colonIndex = item.indexOf(':');
                  if (colonIndex !== -1) {
                    const title = item.slice(0, colonIndex);
                    const desc = item.slice(colonIndex + 1);
                    return (
                      <li key={idx}>
                        <span className="font-semibold text-stone-900">{title}:</span>
                        {desc}
                      </li>
                    );
                  }
                  return <li key={idx}>{item}</li>;
                })}
              </ul>
            </div>

            {/* Experience Item 2: Freelance */}
            <div>
              <div className="flex justify-between items-baseline">
                <span className="text-[10.5px] font-bold text-stone-950">
                  {workExperience[1].company}
                </span>
                <span className="text-[9.5px] font-medium text-stone-600">
                  {workExperience[1].period}
                </span>
              </div>
              <div className="flex justify-between items-baseline italic text-stone-700 text-[10px] mb-1">
                <span>{workExperience[1].role}</span>
                <span className="not-italic text-[9.5px] text-stone-500">{workExperience[1].location}</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-[9.5px] text-stone-700 leading-[1.34]">
                {workExperience[1].achievements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION: EDUCATION & LANGUAGES */}
        <section className="mt-2.5">
          <h2 className="text-[11px] font-bold tracking-wider uppercase text-stone-900 border-b border-stone-900 pb-0.5 mb-1.5">
            TA'LIM VA TILLAR
          </h2>

          <div className="grid grid-cols-1 gap-1 text-[10px]">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-semibold text-stone-900">{education[0].institution}</span>
                <span className="text-stone-700"> — {education[0].degree}</span>
              </div>
              <span className="text-[9.5px] text-stone-600">{education[0].period}</span>
            </div>

            <div className="flex items-center gap-x-2 pt-0.5 text-[10px]">
              <span className="font-semibold text-stone-900">Tillar:</span>
              <span className="text-stone-700">
                {languages.map((l, idx) => (
                  <span key={idx}>
                    <strong>{l.language}</strong> ({l.level})
                    {idx < languages.length - 1 ? " | " : ""}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
