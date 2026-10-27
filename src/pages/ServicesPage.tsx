import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  Layers,
  Code2,
  Radio,
  ShieldCheck,
  Gauge,
  ArrowRight,
  Workflow
} from 'lucide-react';
import { SpotlightTiltCard } from '../components/SpotlightTiltCard';
import { MagneticButton } from '../components/MagneticButton';
import type { Locale } from '../data/translations';

interface ServicesPageProps {
  currentLocale: Locale;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ currentLocale }) => {
  const navigate = useNavigate();

  const content = {
    uz: {
      badge: '— // XIZMATLAR & EKSPERTIZA',
      title: 'Frontend Dasturlash Xizmatlari',
      subtitle: "Murakkab korporativ ERP tizimlardan tortib, yuqori konversiyali lending sahifalar va real-vaqt veb-ilovalargacha professional darajada ishlab chiqish.",
      workflowTitle: 'Ish jarayoni qanday kechadi?',
      workflowSub: 'Har bir loyihaga individual va tizimli yondashuv',
      ctaTitle: 'Loyihangizni birgalikda boshlaymizmi?',
      ctaSub: "G'oyangiz yoki tayyor texnik topshirig'ingiz bormi? Mutlaqo bepul maslahat oling va eng samarali texnologik yechimni tanlang.",
      ctaBtn: "Loyihani muhokama qilish",
      services: [
        {
          index: '01 // CONVERSION',
          icon: Globe,
          title: 'Lending page va zamonaviy veb-saytlar',
          desc: "Brendingiz yoki mahsulotingiz uchun yuqori konversiyali, estetik va chaqmoqdek tez yuklanuvchi taqdimot sahifalari.",
          features: [
            '95+ Google PageSpeed & Core Web Vitals unumdorlik',
            'Zamonaviy micro-animatsiyalar va interaktiv UI',
            'Barcha qurilmalarga 100% moslashuvchan (Responsive)',
            'Telegram bot va CRM tizimlarga buyurtmalarni ulash',
            'SEO optimallashtirish va qidiruv tizimlarida indeksatsiya'
          ]
        },
        {
          index: '02 // ENTERPRISE',
          icon: Layers,
          title: 'Murakkab ERP, CRM va boshqaruv panellari',
          desc: "Biznes jarayonlarini avtomatlashtiruvchi, katta hajmdagi ma'lumotlar bilan barqaror ishlovchi korporativ tizimlar.",
          features: [
            "15+ ustunli murakkab analitik jadvallar",
            "Virtual Scroll orqali millionlab qatorlarni qotmasdan chiqarish",
            "Dinamik ko'p bosqichli filtrlash va tezkor saralash",
            "Excel, CSV va PDF formatlarga yuqori tezlikda eksport",
            "Xodimlar davomati va HR-monitoring tizimlari"
          ]
        },
        {
          index: '03 // ARCHITECTURE',
          icon: Code2,
          title: 'Frontend va zamonaviy veb-ilovalar (React, Next.js)',
          desc: "Toza arxitektura, qayta ishlatiluvchi komponentlar va eng so'nggi frontend texnologiyalari asosida veb-mahsulotlar.",
          features: [
            'React, Next.js va TypeScript asosida toza kod',
            'TanStack Query (React Query) bilan aqlli keshlash',
            'Redux Toolkit va Zustand global holat boshqaruvi',
            'Murakkab formalar: React Hook Form + Zod validation',
            'Moslashuvchan dizayn tizimi (Design System)'
          ]
        },
        {
          index: '04 // REAL-TIME',
          icon: Radio,
          title: 'Real-vaqt tizimlari (WebSockets, WebRTC, SSE)',
          desc: "Ma'lumotlar soniya ichida yangilanadigan jonli ilovalar, video aloqa va sun'iy intellekt oqimlari.",
          features: [
            'WebSockets orqali jonli bildirishnomalar va indikatorlar',
            'LiveKit WebRTC orqali 0ms kechikishdagi video/audio muloqot',
            'Server-Sent Events (SSE) va AI Streaming oqimli javoblar',
            'Tarmoq uzilganda avtomatik qayta ulanish (reconnection logic)',
            'Xavfsiz va barqaror event-driven arxitektura'
          ]
        },
        {
          index: '05 // SECURITY',
          icon: ShieldCheck,
          title: 'E-Imzo integratsiyasi va Granular RBAC xavfsizlik',
          desc: "Yuridik kuchga ega elektron imzolash, OneID va rollar asosida xavfsiz foydalanish tizimlari.",
          features: [
            "E-Imzo brauzer moduli (E-IMZO API) orqali hujjatlarni imzolash",
            "OneID SSO yagona kirish tizimi integratsiyasi",
            "Granular RBAC: Rollar va individual huquqlar asosida interfeys boshqaruvi",
            "Xavfsiz sessiya va token yangilanishi (Axios Interceptors)",
            "Xavfsizlik talablariga mos yopiq idoralararo tizimlar"
          ]
        },
        {
          index: '06 // PERFORMANCE',
          icon: Gauge,
          title: 'Frontend audit va unumdorlikni oshirish',
          desc: "Mavjud loyihalardagi sekinliklarni, ortiqcha renderlarni bartaraf etish va unumdorlikni maksimal darajaga ko'tarish.",
          features: [
            "Bundle size tahlili va kodni bo'lish (Code Splitting)",
            "Ortiqcha qayta renderlarni qisqartirish (Memoization audit)",
            "Memory Leak va xotira sarfini diagnostika qilish",
            "Katta jadvallardagi DOM yuklamasini yengillashtirish",
            "Zamonaviy TypeScript refaktoringi va arxitekturani tekislash"
          ]
        }
      ],
      steps: [
        { num: '01', title: 'Tahlil va rejalashtirish', text: 'Loyihaning maqsadlari, foydalanuvchilar ehtiyojlari va texnik arxitektura rejasini tuzish.' },
        { num: '02', title: 'Interfeys va komponentlar', text: 'Responsive dizayn tizimi, qayta ishlatiluvchi toza komponentlar va zamonaviy UI yaratish.' },
        { num: '03', title: 'Integratsiya va optimallashtirish', text: 'Backend API, WebSockets, E-Imzo integratsiyasi va tezlikni maksimal darajada oshirish.' },
        { num: '04', title: 'Testlash va topshirish', text: 'Har tomonlama tekshirish, xatolarni tuzatish va serverga muvaffaqiyatli deploy qilish.' }
      ]
    },
    en: {
      badge: '— // SERVICES & EXPERTISE',
      title: 'Frontend Engineering Services',
      subtitle: 'From mission-critical corporate ERPs and real-time dashboards to high-conversion landing pages and interactive web platforms.',
      workflowTitle: 'How We Work Together',
      workflowSub: 'A disciplined, engineering-first approach to web software',
      ctaTitle: 'Ready to build your next web project?',
      ctaSub: 'Have a project or technical specifications in mind? Get in touch for an architecture consultation.',
      ctaBtn: 'Start a Conversation',
      services: [
        {
          index: '01 // CONVERSION',
          icon: Globe,
          title: 'Landing Pages & Conversion Websites',
          desc: 'Ultra-fast, visually stunning presentation websites crafted for maximum engagement and clear conversions.',
          features: [
            '95+ Google PageSpeed & Core Web Vitals optimization',
            'Modern micro-interactions & slick 3D visual touches',
            '100% fluid responsive design for all screen sizes',
            'Telegram bot and CRM webhook integration',
            'Search engine optimization (SEO) & fast indexing'
          ]
        },
        {
          index: '02 // ENTERPRISE',
          icon: Layers,
          title: 'Complex ERP, CRM & Admin Dashboards',
          desc: 'High-density business applications built to process massive datasets seamlessly without UI lag.',
          features: [
            '15+ column analytical tables with Virtual Scroll',
            'Smooth handling of 100k+ rows with zero lag',
            'Multi-stage dynamic filtering and global searching',
            'Instant client-side Excel, CSV, and PDF export',
            'Real-time staff attendance & HR-monitoring dashboards'
          ]
        },
        {
          index: '03 // ARCHITECTURE',
          icon: Code2,
          title: 'Frontend & Modern Web Apps (React, Next.js)',
          desc: 'Maintainable, scalable web applications structured with battle-tested architectural patterns.',
          features: [
            'Clean React, Next.js, and strict TypeScript codebase',
            'TanStack Query (React Query) for smart caching',
            'Redux Toolkit and Zustand state management',
            'Complex forms with React Hook Form + Zod schema validation',
            'Custom, consistent Design Systems'
          ]
        },
        {
          index: '04 // REAL-TIME',
          icon: Radio,
          title: 'Real-Time Systems (WebSockets, WebRTC, SSE)',
          desc: 'Live interactive platforms, sub-second latency video/audio communication, and AI streaming interfaces.',
          features: [
            'Low-latency WebSockets for notifications and live metrics',
            'LiveKit WebRTC integration for 0ms video/audio streaming',
            'Server-Sent Events (SSE) for AI token streaming',
            'Automated reconnection with exponential backoff',
            'Resilient event-driven client architecture'
          ]
        },
        {
          index: '05 // SECURITY',
          icon: ShieldCheck,
          title: 'E-Imzo & Granular RBAC Security',
          desc: 'Legally binding digital signature workflows, Single Sign-On, and strict permission-based interfaces.',
          features: [
            'Browser-based E-Imzo cryptography module integration',
            'OneID SSO enterprise authentication',
            'Granular RBAC role & permission gatekeeping',
            'Secure session lifecycle & Axios JWT refresh interceptors',
            'Compliant internal public-sector security standards'
          ]
        },
        {
          index: '06 // PERFORMANCE',
          icon: Gauge,
          title: 'Frontend Auditing & Speed Optimization',
          desc: 'Deep diagnostic analysis of existing codebases to eliminate performance bottlenecks and excessive re-renders.',
          features: [
            'Bundle size analysis & lazy-loaded Code Splitting',
            'Elimination of redundant component re-renders',
            'Memory leak profiling and heap footprint reduction',
            'DOM lightweight virtualization for heavy tables',
            'TypeScript modernization and technical debt remediation'
          ]
        }
      ],
      steps: [
        { num: '01', title: 'Discovery & Architecture', text: 'Analyzing requirements, identifying core technical constraints, and architecting the tech stack.' },
        { num: '02', title: 'Component Engineering', text: 'Building responsive, atomic UI components with precise design fidelity and typed contracts.' },
        { num: '03', title: 'Integration & Optimization', text: 'Connecting APIs, implementing WebSockets/E-Imzo, and tuning performance metrics.' },
        { num: '04', title: 'QA & Deployment', text: 'Rigorous cross-browser validation, error boundary hardening, and production deployment.' }
      ]
    },
    ru: {
      badge: '— // УСЛУГИ И ЭКСПЕРТИЗА',
      title: 'Услуги Frontend-разработки',
      subtitle: 'От высоконагруженных корпоративных ERP-систем и панелей мониторинга в реальном времени до конверсионных лендингов и веб-сервисов.',
      workflowTitle: 'Как строится рабочий процесс',
      workflowSub: 'Инженерный подход, прозрачность и соблюдение сроков',
      ctaTitle: 'Готовы обсудить ваш проект?',
      ctaSub: 'Есть идея или готовое техническое задание? Получите бесплатную техническую консультацию.',
      ctaBtn: 'Связаться со мной',
      services: [
        {
          index: '01 // CONVERSION',
          icon: Globe,
          title: 'Лендинги и современные веб-сайты',
          desc: 'Эстетичные, молниеносно быстрые промо-страницы с высокой конверсией и современными анимациями.',
          features: [
            '95+ баллов в Google PageSpeed & Core Web Vitals',
            'Современные микро-анимации и интерактивный UI',
            '100% адаптивность под все типы экранов и смартфонов',
            'Интеграция заявок с Telegram-ботом и CRM',
            'Полная SEO-оптимизация и быстрая индексация'
          ]
        },
        {
          index: '02 // ENTERPRISE',
          icon: Layers,
          title: 'Сложные ERP, CRM и панели управления',
          desc: 'Корпоративные системы для автоматизации бизнес-процессов и стабильной работы с большими объемами данных.',
          features: [
            'Аналитические таблицы с 15+ столбцами и Virtual Scroll',
            'Отрисовка сотен тысяч записей без тормозов браузера',
            'Динамическая многоуровневая фильтрация и быстрый поиск',
            'Мгновенный экспорт в Excel, CSV и PDF на стороне клиента',
            'Системы мониторинга персонала и посещаемости'
          ]
        },
        {
          index: '03 // ARCHITECTURE',
          icon: Code2,
          title: 'Frontend и современные веб-приложения (React, Next.js)',
          desc: 'Чистая масштабируемая архитектура на передовом стеке технологий.',
          features: [
            'Чистый код на React, Next.js и строгом TypeScript',
            'Умное кэширование с помощью TanStack Query (React Query)',
            'Управление состоянием через Redux Toolkit и Zustand',
            'Сложные формы: React Hook Form + Zod валидация схем',
            'Создание дизайн-системы и гибких UI-компонентов'
          ]
        },
        {
          index: '04 // REAL-TIME',
          icon: Radio,
          title: 'Системы реального времени (WebSockets, WebRTC, SSE)',
          desc: 'Живые приложения с моментальным обновлением, видеосвязь с нулевой задержкой и AI Streaming.',
          features: [
            'WebSockets для мгновенных уведомлений и живых статусов',
            'LiveKit WebRTC для аудио/видео связи с задержкой 0мс',
            'Server-Sent Events (SSE) для потокового вывода AI',
            'Логика автоматического переподключения при обрыве сети',
            'Отказоустойчивая архитектура на событиях'
          ]
        },
        {
          index: '05 // SECURITY',
          icon: ShieldCheck,
          title: 'Интеграция ЭЦП (E-Imzo) и Granular RBAC',
          desc: 'Юридически значимое электронное подписание, OneID и гибкая система разграничения прав.',
          features: [
            'Интеграция браузерного модуля E-IMZO для подписания документов',
            'Авторизация через государственную систему OneID SSO',
            'Granular RBAC: управление интерфейсом на основе ролей и прав',
            'Безопасное обновление токенов (Axios Interceptors)',
            'Соответствие стандартам безопасности закрытых систем'
          ]
        },
        {
          index: '06 // PERFORMANCE',
          icon: Gauge,
          title: 'Аудит фронтенда и повышение производительности',
          desc: 'Устранение узких мест, ускорение загрузки и повышение отзывчивости существующих проектов.',
          features: [
            'Анализ размера бандла и разделение кода (Code Splitting)',
            'Устранение паразитных ре-рендеров компонентов',
            'Профилирование утечек памяти (Memory Leaks)',
            'Оптимизация DOM при работе с тяжелыми таблицами',
            'Рефакторинг на TypeScript и устранение техдолга'
          ]
        }
      ],
      steps: [
        { num: '01', title: 'Анализ и требования', text: 'Изучение задач бизнеса, проектирование архитектуры и согласование требований.' },
        { num: '02', title: 'Разработка компонентов', text: 'Создание адаптивного интерфейса, дизайн-системы и модульных компонентов.' },
        { num: '03', title: 'Интеграция и оптимизация', text: 'Подключение API, WebSockets, E-Imzo и оптимизация скорости работы.' },
        { num: '04', title: 'Тестирование и релиз', text: 'Комплексное тестирование, устранение багов и деплой на production.' }
      ]
    }
  };

  const t = content[currentLocale] || content.uz;

  return (
    <div className="_page_1lpxc_3">
      {/* 1. Header */}
      <section className="_pageHead_1lpxc_24">
        <div className="container">
          <span className="monoLabel">{t.badge}</span>
          <h1 className="_title_1lpxc_28">{t.title}</h1>
          <p className="_subtitle_1lpxc_37">{t.subtitle}</p>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="_section_1lpxc_47">
        <div className="container">
          <div className="_grid_1lpxc_51">
            {t.services.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <SpotlightTiltCard key={idx} disableTilt={true}>
                  <div className="_cardInner_1lpxc_65">
                    <div className="_cardHead_1lpxc_72">
                      <div className="_iconWrapper_1lpxc_79">
                        <IconComp size={24} />
                      </div>
                      <span className="_index_1lpxc_92">{service.index}</span>
                    </div>

                    <h2 className="_cardTitle_1lpxc_100">{service.title}</h2>
                    <p className="_cardDesc_1lpxc_108">{service.desc}</p>

                    <ul className="_list_1lpxc_115">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="_listItem_1lpxc_125">
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightTiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Workflow Steps */}
      <section className="_section_132ah_299" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="_sectionHead_132ah_319">
            <div>
              <span className="monoLabel">— // WORKFLOW</span>
              <h2 className="_sectionTitle_132ah_328">{t.workflowTitle}</h2>
            </div>
            <p className="_learningNote_132ah_679">{t.workflowSub}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {t.steps.map((step, sIdx) => (
              <SpotlightTiltCard key={sIdx} disableTilt={true}>
                <div style={{ padding: '1.8rem 1.6rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent)' }}>
                      {step.num}
                    </span>
                    <Workflow size={20} style={{ color: 'var(--text-faint)' }} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.6rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                    {step.text}
                  </p>
                </div>
              </SpotlightTiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA Banner */}
      <section className="_ctaSection_132ah_780">
        <div className="container">
          <div className="_ctaPanel_132ah_784">
            <h2 className="_ctaTitle_132ah_807">{t.ctaTitle}</h2>
            <p className="_ctaSubtitle_132ah_814">{t.ctaSub}</p>
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
                  cursor: 'pointer'
                }}
              >
                <span>{t.ctaBtn}</span>
                <ArrowRight size={17} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
