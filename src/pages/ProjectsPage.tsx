import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { SpotlightTiltCard } from '../components/SpotlightTiltCard';
import type { Locale } from '../data/translations';

interface ProjectsPageProps {
  currentLocale: Locale;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ currentLocale }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filters = [
    { id: 'all', label: currentLocale === 'en' ? 'All' : (currentLocale === 'ru' ? 'Все' : 'Barchasi') },
    { id: 'realtime', label: 'Real-Time & WebRTC' },
    { id: 'erp_crm', label: currentLocale === 'en' ? 'ERP & CRM Systems' : (currentLocale === 'ru' ? 'ERP и CRM' : 'ERP & CRM Tizimlar') },
    { id: 'ai', label: currentLocale === 'en' ? 'AI & LLM' : (currentLocale === 'ru' ? 'ИИ и LLM' : "Sun'iy Intellekt (AI)") },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => {
        const cat = (p.category || '').toLowerCase();
        if (activeFilter === 'realtime') return cat === 'realtime' || cat === 'monitoring';
        if (activeFilter === 'erp_crm') return cat === 'crm' || cat === 'erp' || cat === 'forms' || cat === 'security';
        if (activeFilter === 'ai') return cat === 'ai';
        return true;
      });

  return (
    <div className="_page_1u3er_3">
      {/* Header */}
      <section className="_pageHead_1u3er_9">
        <div className="container">
          <span className="monoLabel">— // PROJECTS</span>
          <h1 className="_title_1u3er_13">
            {currentLocale === 'en' ? 'Projects Portfolio' : 'Loyihalar Portfoliyasi'}
          </h1>
          <p className="_subtitle_1u3er_22">
            {currentLocale === 'en'
              ? "Frontend Engineer with 1.5+ years of production experience in real-time ERP, CRM, HR-monitoring, and cryptographic public sector platforms (React, TypeScript, Next.js)."
              : "1.5+ yillik amaliy tajribaga ega Frontend dasturchi. Davlat xizmatlari va korporativ sektor uchun real vaqt rejimida ishlovchi ERP, CRM, HR-monitoring, ma'lumotlar tahlili va yopiq idoralararo tizimlarning Frontend arxitekturasi."}
          </p>

          {/* Filter Pills - Clean 4 Core Filters */}
          <div className="_filters_1u3er_30">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`_filterBtn_1u3er_37 ${activeFilter === f.id ? '_active_1u3er_63' : ''}`}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid - 2 Wide Columns on Desktop for Maximum Text Breathing Room */}
      <section className="_section_1u3er_71">
        <div className="container">
          {loading ? (
            <div className="_loading_1u3er_82">Yuklanmoqda...</div>
          ) : (
            <div
              className="_grid_1u3er_75"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                gap: '1.4rem',
              }}
            >
              {filteredProjects.map((p, idx) => {
                const desc = p.i18n?.[currentLocale]?.desc || p.desc;
                const title = p.i18n?.[currentLocale]?.title || p.title;
                const type = p.i18n?.[currentLocale]?.type || p.type;

                return (
                  <SpotlightTiltCard key={p.id} delay={idx * 60}>
                    <div
                      className="_cardInner_1u3er_94"
                      style={{
                        height: '100%',
                        minHeight: '280px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '1.6rem 1.8rem',
                      }}
                    >
                      {/* Top Meta Line: Category and Status Badge */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.8rem',
                          marginBottom: '0.5rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span className="_type_1u3er_102" style={{ whiteSpace: 'nowrap', fontSize: '0.74rem' }}>
                          {type}
                        </span>
                        {p.status === 'in_progress' ? (
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.66rem',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em',
                              padding: '0.22rem 0.6rem',
                              borderRadius: '999px',
                              background: 'rgba(251, 191, 36, 0.12)',
                              color: 'var(--warn)',
                              border: '1px solid rgba(251, 191, 36, 0.35)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              flexShrink: 0,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--warn)' }} />
                            {currentLocale === 'en' ? 'In Progress' : (currentLocale === 'ru' ? 'В разработке' : 'Jarayonda')}
                          </span>
                        ) : (
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.66rem',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em',
                              padding: '0.22rem 0.6rem',
                              borderRadius: '999px',
                              background: 'rgba(74, 222, 128, 0.1)',
                              color: 'var(--ok)',
                              border: '1px solid rgba(74, 222, 128, 0.3)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              flexShrink: 0,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--ok)' }} />
                            {currentLocale === 'en' ? 'Production' : (currentLocale === 'ru' ? 'Завершен' : 'Ishlab chiqilgan')}
                          </span>
                        )}
                      </div>

                      {/* Project Title */}
                      <h3
                        className="_cardTitle_1u3er_116"
                        style={{
                          fontSize: '1.24rem',
                          lineHeight: 1.35,
                          fontWeight: 700,
                          marginTop: '0.2rem',
                          color: 'var(--text)',
                        }}
                      >
                        {title}
                      </h3>

                      {/* Project Description */}
                      <p
                        className="_cardDesc_1u3er_124"
                        style={{
                          fontSize: '0.92rem',
                          lineHeight: 1.68,
                          color: 'var(--text-dim)',
                          margin: '0.6rem 0 1rem',
                        }}
                      >
                        {desc}
                      </p>

                      {/* Technical Stack Tags */}
                      {p.tags && p.tags.length > 0 && (
                        <div
                          className="_tags_1u3er_131"
                          style={{
                            marginTop: 'auto',
                            paddingTop: '0.6rem',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.4rem',
                          }}
                        >
                          {p.tags.map((tag: string, tIdx: number) => (
                            <span key={tIdx} className="chip">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Card Bottom: Role & Live Web System Link */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '1rem',
                          paddingTop: '0.85rem',
                          borderTop: '1px solid var(--border)',
                          gap: '0.6rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            color: 'var(--text-faint)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Frontend Muhandis
                        </span>
                        <span
                          style={{
                            color: 'var(--accent)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <span>Veb Tizim</span>
                          <ExternalLink size={12} />
                        </span>
                      </div>
                    </div>
                  </SpotlightTiltCard>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
