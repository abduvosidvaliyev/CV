import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { SpotlightTiltCard } from '../components/SpotlightTiltCard';
import type { Locale } from '../data/translations';

interface AppsPageProps {
  currentLocale: Locale;
}

export const AppsPage: React.FC<AppsPageProps> = ({ currentLocale }) => {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'owner' | 'contributed'>('all');

  useEffect(() => {
    fetch('/data/apps.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setApps(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredApps = filter === 'all'
    ? apps
    : apps.filter((a) => a.ownership === filter);

  return (
    <div className="_page_1u3er_3">
      {/* Header */}
      <section className="_pageHead_1u3er_9">
        <div className="container">
          <span className="monoLabel">— // APPS</span>
          <h1 className="_title_1u3er_13">
            {currentLocale === 'en' ? 'Published Apps' : 'Nashr qilingan Ilovalar'}
          </h1>
          <p className="_subtitle_1u3er_22">
            {currentLocale === 'en'
              ? "Apps I have built and shipped to the App Store — a selection from the 25+ apps I've worked on for employers, clients and my own catalog."
              : "Men ishlab chiqib App Store'ga chiqargan ilovalar — ish beruvchilar, mijozlar va o'z katalogim uchun qilingan 25+ ilovadan tanlov."}
          </p>

          <div className="_filters_1u3er_30">
            <button
              type="button"
              className={`_filterBtn_1u3er_37 ${filter === 'all' ? '_active_1u3er_63' : ''}`}
              onClick={() => setFilter('all')}
            >
              {currentLocale === 'en' ? 'All' : 'Barchasi'} ({apps.length})
            </button>
            <button
              type="button"
              className={`_filterBtn_1u3er_37 ${filter === 'owner' ? '_active_1u3er_63' : ''}`}
              onClick={() => setFilter('owner')}
            >
              {currentLocale === 'en' ? 'Owner' : 'Shaxsiy / Muallif'}
            </button>
            <button
              type="button"
              className={`_filterBtn_1u3er_37 ${filter === 'contributed' ? '_active_1u3er_63' : ''}`}
              onClick={() => setFilter('contributed')}
            >
              {currentLocale === 'en' ? 'Contributed' : 'Kompaniyalar & Hamkorlik'}
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="_section_1u3er_71">
        <div className="container">
          {loading ? (
            <div className="_loading_1u3er_82">Yuklanmoqda...</div>
          ) : (
            <div className="_grid_1u3er_75">
              {filteredApps.map((app, idx) => (
                <SpotlightTiltCard key={app.slug} delay={idx * 60}>
                  <div
                    style={{
                      padding: '1.8rem',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      minHeight: '260px',
                      justifyContent: 'space-between',
                      position: 'relative'
                    }}
                  >
                    {/* Top Row: Icon + Ownership Badge */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                      <img
                        src={app.icon}
                        alt={app.name}
                        style={{
                          width: '58px',
                          height: '58px',
                          borderRadius: '14px',
                          border: '1px solid var(--border-strong)',
                          objectFit: 'cover',
                          background: 'var(--surface-2)'
                        }}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: 'var(--text-faint)',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border)',
                          padding: '0.24rem 0.65rem',
                          borderRadius: '999px',
                          letterSpacing: '0.08em',
                          fontWeight: 600,
                          textTransform: 'uppercase'
                        }}
                      >
                        {app.ownership === 'owner' ? 'OWNER' : 'CONTRIBUTED'}
                      </span>
                    </div>

                    {/* App Title */}
                    <div style={{ margin: '1.2rem 0 auto' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.015em' }}>
                        {app.name}
                      </h3>
                      {app.tagline?.[currentLocale] && (
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.86rem', lineHeight: '1.55', marginTop: '0.4rem' }}>
                          {app.tagline[currentLocale]}
                        </p>
                      )}
                    </div>

                    {/* Bottom: AppStore Link & Policy Links */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '1.8rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                      }}
                    >
                      {app.appstore_url ? (
                        <a
                          href={app.appstore_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.42rem 0.95rem',
                            borderRadius: '8px',
                            background: 'rgba(190, 242, 100, 0.07)',
                            border: '1px solid rgba(190, 242, 100, 0.28)',
                            color: 'var(--accent)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(190, 242, 100, 0.16)';
                            e.currentTarget.style.borderColor = 'var(--accent)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(190, 242, 100, 0.07)';
                            e.currentTarget.style.borderColor = 'rgba(190, 242, 100, 0.28)';
                          }}
                        >
                          <span>AppStore</span>
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span />
                      )}

                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.74rem', fontFamily: 'var(--font-mono)' }}>
                        {app.privacySlug && (
                          <NavLink
                            to={`/${currentLocale}/privacy-policy/${app.privacySlug}`}
                            style={{ color: 'var(--text-faint)', textDecoration: 'none' }}
                          >
                            Privacy
                          </NavLink>
                        )}
                        {app.termsSlug && (
                          <NavLink
                            to={`/${currentLocale}/terms-of-service/${app.termsSlug}`}
                            style={{ color: 'var(--text-faint)', textDecoration: 'none' }}
                          >
                            Terms
                          </NavLink>
                        )}
                      </div>
                    </div>
                  </div>
                </SpotlightTiltCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
