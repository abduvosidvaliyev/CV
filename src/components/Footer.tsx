import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { translations } from '../data/translations';
import type { Locale } from '../data/translations';

interface FooterProps {
  currentLocale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ currentLocale }) => {
  const location = useLocation();
  const pathLocale = location.pathname.split('/')[1];
  const activeLocale: Locale = (pathLocale && ['uz', 'en', 'ru'].includes(pathLocale))
    ? (pathLocale as Locale)
    : currentLocale;

  const t = translations[activeLocale]?.footer || translations.uz.footer;
  const navT = translations[activeLocale]?.navbar || translations.uz.navbar;

  const socialLinks = [
    {
      href: 'https://github.com/abduvosidvaliyev',
      label: 'GitHub',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      )
    },
    {
      href: 'https://www.instagram.com/valiyev.o915/',
      label: 'Instagram',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      href: 'https://t.me/Valiyev_0915',
      label: 'Telegram',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      )
    }
  ];

  const serviceItems = t.service_items || [
    'Frontend & Core (React, Next.js, TS)',
    'Real-Time (WebSockets, LiveKit WebRTC, SSE)',
    'ERP, CRM & Data Dashboards',
    'E-Imzo & Granular RBAC Xavfsizlik'
  ];

  return (
    <footer className="_footer_xxvjq_1">
      <div className="container">
        <div className="_grid_xxvjq_9">
          {/* Column 1: Brand & Info */}
          <div className="_column_xxvjq_16">
            <NavLink to={`/${activeLocale}`} className="_brandLogo_xxvjq_22" style={{ textTransform: 'lowercase' }}>
              abduvosid<span>.dev</span>
            </NavLink>
            <p className="_brandDesc_xxvjq_33">
              {t.desc || "Frontend dasturchisi (React / TypeScript / Next.js) • Real vaqt rejimida ishlovchi ERP, CRM va yopiq idoralararo tizimlar"}
            </p>
            <div className="_socialRow_xxvjq_40">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="_socialLink_xxvjq_46"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="_column_xxvjq_16">
            <h3 className="_columnTitle_xxvjq_68">{t.services || 'SERVICES'}</h3>
            <ul className="_linkList_xxvjq_77">
              {serviceItems.map((item: string, i: number) => (
                <li key={i} className="_listItem_xxvjq_84">
                  <span style={{ color: 'var(--accent)', fontSize: '0.62rem', marginRight: '0.35rem', display: 'inline-flex', alignItems: 'center' }}>▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Menu */}
          <div className="_column_xxvjq_16">
            <h3 className="_columnTitle_xxvjq_68">{t.menu || 'MENU'}</h3>
            <ul className="_linkList_xxvjq_77">
              <li>
                <NavLink to={`/${activeLocale}`} className="_navLink_xxvjq_101">
                  {navT.home}
                </NavLink>
              </li>
              <li>
                <NavLink to={`/${activeLocale}/services`} className="_navLink_xxvjq_101">
                  {navT.services || (activeLocale === 'en' ? 'Services' : (activeLocale === 'ru' ? 'Услуги' : 'Xizmatlar'))}
                </NavLink>
              </li>
              <li>
                <NavLink to={`/${activeLocale}/projects`} className="_navLink_xxvjq_101">
                  {navT.projects}
                </NavLink>
              </li>
              <li>
                <NavLink to={`/${activeLocale}/contact`} className="_navLink_xxvjq_101">
                  {navT.contact}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="_column_xxvjq_16">
            <h3 className="_columnTitle_xxvjq_68">{navT.contact || 'CONTACT'}</h3>
            <ul className="_contactList_xxvjq_113">
              <li>
                <span className="_icon_xxvjq_137" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-faint)' }}>
                  <Phone size={15} />
                </span>
                <a href="tel:+998944900915">+998 94 490 09 15</a>
              </li>
              <li>
                <span className="_icon_xxvjq_137" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-faint)' }}>
                  <Mail size={15} />
                </span>
                <a href="https://t.me/Valiyev_0915" target="_blank" rel="noopener noreferrer">@Valiyev_0915 (Telegram)</a>
              </li>
              <li>
                <span className="_icon_xxvjq_137" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-faint)' }}>
                  <MapPin size={15} />
                </span>
                <span>Qo'qon shahri, O'zbekiston</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar with em dash */}
      <div className="_bottomBar_xxvjq_144">
        <div className="container _bottomInner_xxvjq_148">
          <span className="_bottomMono_xxvjq_159">
            © {new Date().getFullYear()} Valiyev Abduvosid — {t.rights || 'All rights reserved.'}
          </span>
          <div className="_legalLinks_xxvjq_164">
            <NavLink to={`/${activeLocale}/privacy-policy`}>
              {t.privacy || 'Privacy Policy'}
            </NavLink>
            <NavLink to={`/${activeLocale}/terms-of-service`}>
              {t.terms || 'Terms of Service'}
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
