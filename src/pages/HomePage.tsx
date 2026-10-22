import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Code2,
  Terminal,
  Network,
  ExternalLink,
  ArrowRight,
  Layers,
  Video,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { WireframeMesh } from '../components/WireframeMesh';
import { TypewriterText } from '../components/TypewriterText';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { SpotlightTiltCard } from '../components/SpotlightTiltCard';
import { TechGalaxy } from '../components/TechGalaxy';
import { MagneticButton } from '../components/MagneticButton';
import { translations } from '../data/translations';
import type { Locale } from '../data/translations';

interface HomePageProps {
  currentLocale: Locale;
}

export const HomePage: React.FC<HomePageProps> = ({ currentLocale }) => {
  const navigate = useNavigate();
  const home = translations[currentLocale]?.home || translations.uz.home;

  const roles = [
    'Frontend Dasturchi',
    'React & Next.js Specialist',
    'TypeScript Craftsman',
    'Murakkab ERP & CRM Tizimlar',
    'Real-vaqt (WebSockets & WebRTC)'
  ];

  const jobs = [
    {
      company: '"Raqamli Nazorat" MChJ',
      role: 'Frontend dasturchi',
      period: 'Mart 2026 — Oktabr 2026 (7 oy) · O\'zbekiston',
      hash: 'commit 8f3a1c9',
      desc: `Davlat xizmatlari, yirik korporativ sektor va sanoat korxonalari uchun real vaqt rejimida ishlovchi 8+ murakkab tizimlar (ERP, CRM, HR-monitoring, ma'lumotlar tahlili va ichki videokonferensiya platformalari)ning Frontend qismini noldan ishlab chiqdim:
• Frontend arxitekturasi va unumdorlik: 15+ ustunli murakkab analitik jadvallarni Virtual Scroll, useMemo va TanStack Query (caching, pagination) orqali optimallashtirib, katta hajmdagi ma'lumotlarda sahifa qotishlarini bartaraf etdim;
• Real-vaqt protokollari (WebSockets & WebRTC): Jonli bildirishnomalar va shoshilinch ogohlantirishlar (WebSocket Alerts), LiveKit orqali 0ms kechikishdagi video-majlislar va chat, hamda AI oqimli javoblari (Fetch ReadableStream / SSE) integratsiyasini qildim;
• Kriptografiya va Xavfsizlik: E-Imzo brauzer moduli orqali dalolatnoma va shartnomalarni xesh olish va elektron imzolash, OneID avtorizatsiyasi hamda ko'p darajali dinamik huquqlar (Granular RBAC) tizimini yo'lga qo'ydim;
• Formalar va Hujjat aylanishi: React Hook Form + Zod asosida ko'p bosqichli formalarni (Step Wizard) qurdim; qoralamalarni localStorage'da saqlash, rasmlarni brauzerda siqib yuklash (Image Compression) va hisob-fakturalarni PDF, Excel, CSV formatda avtomatik generatsiya qilishni joriy qildim;
• Tarmoq nazorati: Axios Interceptors yordamida tokenlarni avtomatik yangilash (Refresh Token) va 401/403 xatoliklarni xavfsiz boshqarish tizimini qurdik.`
    },
    {
      company: 'Frilans',
      role: 'Mustaqil Frontend dasturchi',
      period: 'Mart 2025 — Mart 2026 (1 yil)',
      hash: 'commit 4b2e7d1',
      desc: `• Xususiy buyurtmachilar uchun veb-platformalarning MVP va Frontend arxitekturasini (UI/UX, boshqaruv panellari, REST API integratsiyasi) React, TypeScript, Tailwind CSS va Supabase yordamida noldan ishlab chiqish;
• Qayta ishlatiluvchi (reusable) komponentlar kutubxonasini yaratish, asinxron so'rovlarni optimallashtirish va to'liq moslashuvchan (Responsive) interfeyslar tayyorlash.`
    }
  ];

  return (
    <div className="_page_132ah_3">
      {/* 1. HERO SECTION */}
      <section className="_hero_132ah_9">
        <div className="container _heroGrid_132ah_17">
          {/* Hero Left Content */}
          <div className="_heroLeft_132ah_25">
            {/* Status Badge */}
            <div className="statusBadge">
              <span className="dot" />
              <span>{home.open_to_work || 'Open to Work'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="_h1_132ah_32">
              {currentLocale === 'en' ? 'Building scalable interfaces' : (home.h1_line1 || 'Zamonaviy veb-tizimlarni')}
              <span className="_h1Accent_132ah_40">
                {currentLocale === 'en' ? 'with engineering discipline.' : (home.h1_line2 || 'muhandislik intizomi bilan quraman.')}
              </span>
            </h1>

            {/* Typewriter Terminal Role line under headline */}
            <div className="_roleLine_132ah_50">
              <TypewriterText words={roles} />
            </div>

            {/* Subtitle */}
            <p className="_subtitle_132ah_65">
              {home.subtitle ||
                "1.5+ yillik amaliy tajribaga ega Frontend dasturchi. Davlat xizmatlari va korporativ sektor uchun real vaqt rejimida ishlovchi ERP, CRM, HR-monitoring, ma'lumotlar tahlili va yopiq idoralararo tizimlarning Frontend arxitekturasini ishlab chiqishda tajribaga ega."}
            </p>

            {/* CTA Buttons */}
            <div className="_heroButtons_132ah_72">
              <MagneticButton
                type="button"
                className="btn btnAccent"
                onClick={() => navigate(`/${currentLocale}/contact`)}
              >
                <span>{home.buttons?.lets_talk || "Let's Talk"}</span>
                <ArrowRight size={16} />
              </MagneticButton>
              <NavLink to={`/${currentLocale}/projects`} className="btn btnGhost">
                <span>{home.buttons?.view_work || 'View My Work'}</span>
              </NavLink>
            </div>
          </div>

          {/* Hero Right: 3D Wireframe Mesh + Terminal Card */}
          <div className="_heroRight_132ah_82" style={{ position: 'relative' }}>
            {/* 3D Wireframe Canvas */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              <WireframeMesh />
            </div>

            {/* Terminal Card Overlaid on Bottom-Left */}
            <div
              className="terminalCard _heroTerminal_132ah_92"
              style={{
                zIndex: 2,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                background: 'rgba(8, 10, 14, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75), 0 0 30px rgba(190, 242, 100, 0.05)'
              }}
            >
              <div className="terminalHeader">
                <div className="terminalDots">
                  <span />
                  <span />
                  <span />
                </div>
                <span>abduvosid@dev: ~</span>
              </div>
              <div className="terminalBody" style={{ fontSize: '0.82rem', padding: '1.2rem 1.4rem' }}>
                <p className="_termLine_132ah_100">
                  <span className="_termPrompt_132ah_107">$</span>
                  <span style={{ color: 'var(--text)', fontWeight: 600 }}>whoami</span>
                </p>
                <p className="_termLine_132ah_100" style={{ color: 'var(--text-dim)', marginBottom: '0.6rem' }}>
                  abduvosid · frontend engineer
                </p>

                <p className="_termLine_132ah_100">
                  <span className="_termPrompt_132ah_107">$</span>
                  <span style={{ color: 'var(--text)', fontWeight: 600 }}>uptime</span>
                </p>
                <p className="_termLine_132ah_100" style={{ color: 'var(--text-dim)', marginBottom: '0.6rem' }}>
                  ~1.5+ years · 8+ systems · ERP/CRM
                </p>

                <p className="_termLine_132ah_100">
                  <span className="_termPrompt_132ah_107">$</span>
                  <span style={{ color: 'var(--text)', fontWeight: 600 }}>status</span>
                </p>
                <p className="_termLine_132ah_100" style={{ color: 'var(--ok)' }}>
                  ● available_for_work=true
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="_scrollHint_132ah_120">
          <span>{home.scroll_hint || 'SCROLL'}</span>
          <div className="_scrollLine_132ah_136" />
        </div>
      </section>

      {/* 2. STATS SPEC BLOCK (Image 2) */}
      <section className="_stats_132ah_152">
        <div className="container">
          <div className="_specBlock_132ah_159">
            <div className="_specMeta_132ah_188">
              <span className="monoLabel">— // SPEC</span>
              <span className="_specRev_132ah_196">REV 2026.09</span>
            </div>

            <div className="_statsGrid_132ah_203">
              {/* Stat 1: Commercial Frontend */}
              <div className="_statCell_132ah_208">
                <div style={{ display: 'flex', gap: '3px', marginBottom: '0.6rem', color: 'var(--accent)', opacity: 0.7, fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span>
                </div>
                <span className="_statValue_132ah_244">
                  <AnimatedCounter end={1} prefix="~" suffix=".5+" />
                </span>
                <span className="_statLabel_132ah_257">{home.stats?.years_exp || 'Yil amaliy tajriba'}</span>
                <span className="_statSub_132ah_262">{home.stats?.years_sub || '2025-yildan · IT\'da 2023-yildan'}</span>
              </div>

              {/* Stat 2: Complex Systems & ERP */}
              <div className="_statCell_132ah_208">
                <div style={{ display: 'flex', gap: '3px', marginBottom: '0.6rem', color: 'var(--accent)', opacity: 0.7, fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span>
                </div>
                <span className="_statValue_132ah_244">
                  <AnimatedCounter end={8} suffix="+" />
                </span>
                <span className="_statLabel_132ah_257">{home.stats?.apps_built || 'Murakkab tizimlar & ERP'}</span>
                <span className="_statSub_132ah_262">{home.stats?.apps_sub || 'Davlat xizmatlari, CRM va HR-monitoring'}</span>
              </div>

              {/* Stat 3: 15+ ustunli analitik jadvallar */}
              <div className="_statCell_132ah_208">
                <div style={{ display: 'flex', gap: '3px', marginBottom: '0.6rem', color: 'var(--accent)', opacity: 0.7, fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span>
                </div>
                <span className="_statValue_132ah_244">
                  <AnimatedCounter end={15} suffix="+" />
                </span>
                <span className="_statLabel_132ah_257">{home.stats?.active_users || 'Ustunli analitik jadvallar'}</span>
                <span className="_statSub_132ah_262">{home.stats?.users_sub || 'Virtual Scroll · Caching · 0ms WebRTC'}</span>
              </div>

              {/* Stat 4: Stek */}
              <div className="_statCell_132ah_208">
                <div style={{ display: 'flex', gap: '3px', marginBottom: '0.6rem', color: 'var(--accent)', opacity: 0.7, fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span>
                </div>
                <span className="_statValue_132ah_244">
                  <AnimatedCounter end={100} suffix="%" />
                </span>
                <span className="_statLabel_132ah_257">{home.stats?.lessons || 'Zamonaviy Stek'}</span>
                <span className="_statSub_132ah_262">{home.stats?.lessons_sub || 'React · Next.js · TypeScript'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECH STACK GALAXY */}
      <TechGalaxy currentLocale={currentLocale} />

      {/* 4. FEATURED PROJECTS SECTION */}
      <section className="_section_132ah_299">
        <div className="container">
          <div className="_sectionHead_132ah_319">
            <div>
              <span className="monoLabel">// PROJECTS</span>
              <h2 className="_sectionTitle_132ah_328">
                {currentLocale === 'en' ? 'Featured Systems & Projects' : (currentLocale === 'ru' ? 'Разработанные системы и проекты' : 'Ishlab chiqilgan tizimlar va loyihalar')}
              </h2>
            </div>
            <NavLink to={`/${currentLocale}/projects`} className="_viewAll_132ah_335">
              <span>{currentLocale === 'en' ? 'All projects' : (currentLocale === 'ru' ? 'Все проекты' : 'Barcha loyihalar')}</span>
              <ArrowRight size={14} />
            </NavLink>
          </div>

          <div
            className="_appsGrid_132ah_354"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: '1.4rem',
            }}
          >
            {[
              {
                id: 'raqamli-muloqot',
                name: 'Raqamli Muloqot Platformasi',
                category: 'LiveKit WebRTC & RBAC',
                tagline: currentLocale === 'en'
                  ? 'Government inter-agency meeting platform: 0ms LiveKit video & chat, Raqamli Passport auth, and digital signing.'
                  : "Davlat va idoralararo onlayn majlislar tizimi: 0ms LiveKit video va chat, Raqamli Passport (RBAC) va raqamli imzo.",
                role: currentLocale === 'en' ? 'Lead Frontend Developer' : 'Bosh Frontend Dasturchi',
                tags: ['LiveKit WebRTC', 'WebSocket', 'React Hook Form', 'Axios Interceptor', 'RBAC'],
                gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.22) 100%)',
                borderColor: 'rgba(16, 185, 129, 0.45)',
                icon: <Video size={26} style={{ color: '#34d399' }} />
              },
              {
                id: 'unusual-consumption',
                name: 'noodatiy istemol',
                category: 'Monitoring & Interaktiv Xarita',
                tagline: currentLocale === 'en'
                  ? 'Gas anomaly detection: 15+ column analytical tables, Uzbekistan risk zone map, audible/visual WebSocket alerts.'
                  : "Gaz sarfidagi noqonuniy holatlar tahlili: 15+ ustunli jadvallar, O'zbekiston xaritasida qizil zonalar va ovozli WebSocket alert.",
                role: currentLocale === 'en' ? 'Frontend Architect' : 'Frontend Arxitektor',
                tags: ['Interaktiv Xarita', '15+ Ustunli Jadvallar', 'WebSocket Alert', 'PDF Eksport'],
                gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.22) 0%, rgba(185, 28, 28, 0.22) 100%)',
                borderColor: 'rgba(239, 68, 68, 0.45)',
                icon: <Layers size={26} style={{ color: '#f87171' }} />
              },
              {
                id: 'hgt-attendance',
                name: 'HGT davomat',
                category: 'HR Monitoring & WebSocket',
                tagline: currentLocale === 'en'
                  ? 'Real-time turnstile/Face ID attendance tracking without reload, useMemo + Virtual scroll timesheet tables.'
                  : "Face ID va turniket orqali jonli davomat: xodim o'tganda sahifani yangilamasdan yashil bo'lishi (WebSocket), oylik tabel.",
                role: currentLocale === 'en' ? 'Frontend Engineer' : 'Frontend Muhandis',
                tags: ['WebSocket Jonli Ulanish', 'Virtual Scroll', 'useMemo', 'Face ID'],
                gradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.22) 0%, rgba(59, 130, 246, 0.22) 100%)',
                borderColor: 'rgba(59, 130, 246, 0.45)',
                icon: <ShieldCheck size={26} style={{ color: '#38bdf8' }} />
              },
              {
                id: 'dc-management',
                name: 'Raqamli boshqaruv',
                category: 'Task Management & KPI',
                tagline: currentLocale === 'en'
                  ? 'Remote workforce & task management: KPI bonuses/penalties, payroll calculation, secure in-app meetings, and React Query polling.'
                  : "Onlayn xodimlarni boshqarish va vazifalar tizimi: KPI rag'batlantirish va jarimalar, oylik maoshni avtomatik hisoblash va jonli yangilanishlar.",
                role: currentLocale === 'en' ? 'Frontend Engineer' : 'Frontend Muhandis',
                tags: ['React Query Polling', 'WebSocket', 'KPI Hisob-kitob', 'Debounce Search'],
                gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.22) 0%, rgba(126, 34, 206, 0.22) 100%)',
                borderColor: 'rgba(168, 85, 247, 0.45)',
                icon: <FileSpreadsheet size={26} style={{ color: '#c084fc' }} />
              }
            ].map((p, idx) => (
              <SpotlightTiltCard key={p.id} delay={idx * 80}>
                <div
                  className="_appCard_132ah_360"
                  style={{
                    textDecoration: 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'default',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: '1.6rem 1.8rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.8rem' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        background: p.gradient,
                        border: `1px solid ${p.borderColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35)',
                        flexShrink: 0,
                      }}
                    >
                      {p.icon}
                    </div>
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--accent)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          display: 'block',
                          marginBottom: '0.2rem',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        // {p.category}
                      </span>
                      <h3
                        className="_appName_132ah_394"
                        style={{
                          fontSize: '1.2rem',
                          lineHeight: 1.35,
                          fontWeight: 700,
                          color: 'var(--text)',
                        }}
                      >
                        {p.name}
                      </h3>
                    </div>
                  </div>

                  <p
                    className="_appTagline_132ah_401"
                    style={{
                      fontSize: '0.88rem',
                      lineHeight: 1.62,
                      color: 'var(--text-dim)',
                      margin: '0.4rem 0 1rem',
                      display: 'block',
                    }}
                  >
                    {p.tagline}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', margin: 'auto 0 0', paddingTop: '0.6rem' }}>
                    {p.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="chip"
                        style={{ fontSize: '0.72rem' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    className="_appMeta_132ah_411"
                    style={{
                      marginTop: '1.1rem',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--border)',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.6rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ color: 'var(--text-dim)', fontWeight: 500, whiteSpace: 'nowrap', fontSize: '0.82rem' }}>
                      {p.role}
                    </span>
                    <NavLink
                      to={`/${currentLocale}/projects`}
                      style={{
                        color: 'var(--accent)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        fontSize: '0.82rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      <span>Veb Tizim</span>
                      <ExternalLink size={12} />
                    </NavLink>
                  </div>
                </div>
              </SpotlightTiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCE TIMELINE */}
      <section className="_section_132ah_299">
        <div className="container">
          <div className="_sectionHead_132ah_319">
            <div>
              <span className="monoLabel">// CAREER</span>
              <h2 className="_sectionTitle_132ah_328">
                {home.experience?.title || 'Ish Tajribasi'}
              </h2>
            </div>
          </div>

          <div className="_timeline_132ah_423">
            {jobs.map((job, idx) => (
              <SpotlightTiltCard key={idx} disableTilt={true} delay={idx * 100} style={{ marginBottom: '1rem' }}>
                <div style={{ padding: '1.4rem 1.6rem' }}>
                  <div className="_commitTop_132ah_460">
                    <span className="_commitHash_132ah_469">
                      git commit <b>{job.hash}</b>
                    </span>
                    <span className="_commitPeriod_132ah_480">{job.period}</span>
                  </div>
                  <h3 className="_commitRole_132ah_486">{job.role}</h3>
                  <div className="_commitCompany_132ah_493">@{job.company}</div>
                  <p className="_commitDesc_132ah_500">{job.desc}</p>
                </div>
              </SpotlightTiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ABOUT ME SECTION */}
      <section className="_section_132ah_299">
        <div className="container">
          <div className="_sectionHead_132ah_319">
            <div>
              <span className="monoLabel">// BIO</span>
              <h2 className="_sectionTitle_132ah_328">
                {home.about?.title || 'Men haqimda'}
              </h2>
            </div>
          </div>

          <div className="_aboutGrid_132ah_518">
            <div className="_aboutText_132ah_525">
              <p>{home.about?.p1}</p>
              <p>{home.about?.p2}</p>
              <p>{home.about?.p3}</p>

              <div className="_aboutHighlights_132ah_534">
                {home.about?.highlights?.map((h: any, i: number) => (
                  <SpotlightTiltCard key={i} disableTilt={true} delay={i * 90} className="_aboutHighlightCard_132ah_541">
                    <h4 className="_aboutHighlightTitle_132ah_553">
                      <span className="_highlightDot_132ah_563" />
                      <span>{h.title}</span>
                    </h4>
                    <p className="_aboutHighlightDesc_132ah_573">{h.desc}</p>
                  </SpotlightTiltCard>
                ))}
              </div>
            </div>

            {/* Portrait Card */}
            <SpotlightTiltCard className="_portraitCard_132ah_580">
              <div style={{
                width: '100%',
                aspectRatio: '4 / 4.6',
                background: 'linear-gradient(135deg, #101622 0%, #0a0c10 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1.2rem',
                borderBottom: '1px solid var(--border)'
              }}>
                <div style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: 'var(--accent-dim)',
                  border: '2px solid var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 24px var(--accent-glow)'
                }}>
                  <Code2 size={44} style={{ color: 'var(--accent)' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text)' }}>VALIYEV ABDUVOSID</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)' }}>@Valiyev_0915</div>
                </div>
              </div>
              <div className="_portraitCaption_132ah_594">
                <span>[Abduvosid // Frontend Engineer]</span>
                <span>LOC: QO'QON, UZBEKISTAN</span>
              </div>
            </SpotlightTiltCard>
          </div>
        </div>
      </section>

      {/* 6.5. EDUCATION & LANGUAGES SECTION (Matching Resume) */}
      <section className="_section_132ah_299">
        <div className="container">
          <div className="_sectionHead_132ah_319">
            <div>
              <span className="monoLabel">// EDUCATION & LANGUAGES</span>
              <h2 className="_sectionTitle_132ah_328">
                {currentLocale === 'en' ? 'Education & Languages' : 'Ta\'lim va Tillar'}
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.4rem' }}>
            {/* Education Card */}
            <SpotlightTiltCard disableTilt={true}>
              <div style={{ padding: '1.5rem 1.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent)', marginBottom: '0.8rem' }}>
                  <Terminal size={18} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    TA'LIM
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.35rem' }}>
                  "Pro Teach" IT o'quv markazi (Qo'qon sh.)
                </h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Frontend Development yo'nalishi · 2023 – 2024
                </p>
              </div>
            </SpotlightTiltCard>

            {/* Languages Card */}
            <SpotlightTiltCard disableTilt={true}>
              <div style={{ padding: '1.5rem 1.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent)', marginBottom: '0.8rem' }}>
                  <Network size={18} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    TILLAR
                  </span>
                </div>
                <div style={{ marginBottom: '0.6rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text)' }}>O'zbek tili: </span>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Ona tili (Erkin)</span>
                </div>
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text)' }}>Ingliz tili: </span>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Pre-Intermediate (Texnik hujjatlar va dasturlash dokumentatsiyasini bemalol o'qish va tushunish)</span>
                </div>
              </div>
            </SpotlightTiltCard>
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="_ctaSection_132ah_780">
        <div className="container">
          <div className="_ctaPanel_132ah_784">
            <h2 className="_ctaTitle_132ah_807">
              {currentLocale === 'ru'
                ? 'Готовы создать масштабируемый веб-продукт?'
                : (currentLocale === 'en' ? 'Ready to Build High-Performance Web Systems?' : 'Yuqori unumdorlikdagi veb-tizimlar yaratamizmi?')}
            </h2>
            <p className="_ctaSubtitle_132ah_814">
              {currentLocale === 'ru'
                ? 'Вам нужен современный интерфейс на React/Next.js, сложная ERP/CRM система с Virtual Scroll или интеграция с WebSockets и E-Imzo — я применю свой практический опыт.'
                : (currentLocale === 'en'
                  ? 'Whether you need scalable React/Next.js architectures, complex ERP/CRM dashboards with Virtual Scroll, or real-time WebSockets & WebRTC — I bring battle-tested engineering.'
                  : 'Sizga zamonaviy React/Next.js frontend arxitekturasi, Virtual Scroll va keshlash bilan optimallashtirilgan murakkab ERP/CRM tizimlari yoki WebSockets va E-Imzo integratsiyasi kerakmi — sifatli muhandislik yechimlarini taklif qilaman.')}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <MagneticButton
                type="button"
                className="btn btnAccent"
                onClick={() => navigate(`/${currentLocale}/contact`)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.9rem 2.2rem',
                  fontSize: '0.96rem',
                  cursor: 'pointer',
                }}
              >
                <span>
                  {currentLocale === 'ru' ? 'Связаться' : (currentLocale === 'en' ? 'Start a Conversation' : 'Bog\'lanish')}
                </span>
                <ArrowRight size={17} />
              </MagneticButton>
            </div>
            <a href="https://t.me/Valiyev_0915" target="_blank" rel="noopener noreferrer" className="_ctaMail_132ah_821">
              @Valiyev_0915 · +998 94 490 09 15
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
