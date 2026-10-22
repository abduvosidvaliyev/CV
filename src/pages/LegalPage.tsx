import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { SpotlightTiltCard } from '../components/SpotlightTiltCard';
import type { Locale } from '../data/translations';

interface LegalPageProps {
  currentLocale: Locale;
  type: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ currentLocale, type }) => {
  const { slug } = useParams<{ slug: string }>();
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const title = type === 'privacy'
    ? (currentLocale === 'en' ? 'Privacy Policy' : 'Maxfiylik Siyosati')
    : (currentLocale === 'en' ? 'Terms of Service' : 'Foydalanish Shartlari');

  useEffect(() => {
    fetch('/data/policies.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPolicies(data.filter((p) => p.type === type));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [type]);

  if (slug) {
    const policy = policies.find((p) => p.slug === slug || p.appSlug === slug);

    if (loading) {
      return (
        <div className="_page_9tqhr_3">
          <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
            <p className="_empty_9tqhr_30">Yuklanmoqda...</p>
          </div>
        </div>
      );
    }

    if (!policy) {
      return (
        <div className="_page_9tqhr_3">
          <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
            <p className="_empty_9tqhr_30">Hujjat topilmadi.</p>
            <NavLink
              to={`/${currentLocale}/${type === 'privacy' ? 'privacy-policy' : 'terms-of-service'}`}
              className="btn btnGhost"
              style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <ArrowLeft size={15} />
              <span>Barcha hujjatlar</span>
            </NavLink>
          </div>
        </div>
      );
    }

    const content = policy.i18n?.[currentLocale]?.content || policy.content;
    const docTitle = policy.i18n?.[currentLocale]?.title || policy.title;

    return (
      <div className="_page_9tqhr_3">
        <div className="container _detail_9tqhr_26">
          <article className="_article_9tqhr_119">
            <NavLink
              to={`/${currentLocale}/${type === 'privacy' ? 'privacy-policy' : 'terms-of-service'}`}
              className="_backLink_9tqhr_104"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <ArrowLeft size={15} />
              <span>Barcha hujjatlar</span>
            </NavLink>

            <header className="_articleHead_9tqhr_125">
              <div className="_articleMeta_9tqhr_131">
                <span className="chip">{policy.appName}</span>
                <time className="_postDate_9tqhr_66">{policy.date}</time>
              </div>
              <h1 className="_articleTitle_9tqhr_139">{docTitle}</h1>
            </header>

            <div className="_prose_9tqhr_149" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
              {content}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="_page_9tqhr_3">
      {/* Header */}
      <section className="_pageHead_9tqhr_7">
        <div className="container">
          <span className="monoLabel">// LEGAL</span>
          <h1 className="_title_9tqhr_11">{title}</h1>
          <p style={{ color: 'var(--text-dim)', maxWidth: '60ch', marginTop: '0.8rem' }}>
            Ilovalarimiz va xizmatlarimizdan foydalanish bo'yicha rasmiy huquqiy hujjatlar va kafolatlar.
          </p>
        </div>
      </section>

      {/* Policies List */}
      <section className="_section_9tqhr_20">
        <div className="container">
          {loading ? (
            <div className="_empty_9tqhr_30">Hujjatlar yuklanmoqda...</div>
          ) : (
            <div className="_postList_9tqhr_45">
              {policies.map((p, idx) => (
                <SpotlightTiltCard key={p.slug} delay={idx * 60}>
                  <NavLink
                    to={`/${currentLocale}/${type === 'privacy' ? 'privacy-policy' : 'terms-of-service'}/${p.slug}`}
                    className="_postCard_9tqhr_51"
                    style={{ textDecoration: 'none', display: 'flex', height: '100%' }}
                  >
                    <div className="_postMeta_9tqhr_59">
                      <span className="chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                        <FileText size={12} />
                        <span>{p.appName}</span>
                      </span>
                      <time className="_postDate_9tqhr_66">{p.date}</time>
                    </div>

                    <h2 className="_postTitle_9tqhr_78">{p.title}</h2>
                    <div className="_postLink_9tqhr_92">
                      <span>Hujjatni o'qish</span>
                      <ArrowRight size={14} />
                    </div>
                  </NavLink>
                </SpotlightTiltCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
