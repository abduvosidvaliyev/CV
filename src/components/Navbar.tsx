import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { translations } from '../data/translations';
import type { Locale } from '../data/translations';

interface NavbarProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLocale, onLocaleChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Derive activeLocale synchronously from current URL pathname
  const pathLocale = location.pathname.split('/')[1];
  const activeLocale: Locale = (pathLocale && ['uz', 'en', 'ru'].includes(pathLocale))
    ? (pathLocale as Locale)
    : currentLocale;

  const t = translations[activeLocale]?.navbar || translations.uz.navbar;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: `/${activeLocale}`, label: t.home, end: true },
    { to: `/${activeLocale}/projects`, label: t.projects },
    { to: `/${activeLocale}/contact`, label: t.contact },
  ];

  const handleLanguageSelect = (lang: Locale) => {
    setLangMenuOpen(false);
    onLocaleChange(lang);
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0 && ['uz', 'en', 'ru'].includes(pathSegments[0])) {
      pathSegments[0] = lang;
      navigate(`/${pathSegments.join('/')}`);
    } else {
      navigate(`/${lang}`);
    }
  };

  const languages = [
    { code: 'uz', label: "O'zbek", short: 'UZ' },
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'ru', label: 'Русский', short: 'RU' },
  ];

  return (
    <header className={`_navbar_1welw_1 ${scrolled ? '_scrolled_1welw_16' : ''}`}>
      <div className="container _inner_1welw_23">
        {/* Brand Logo */}
        <NavLink to={`/${activeLocale}`} className="_logo_1welw_32">
          Abduvosid<span className="_logoAccent_1welw_42">Dev</span>
          <span className="_logoCursor_1welw_46" />
        </NavLink>

        {/* Desktop Links (Excluding iOS Darsliklar and FAQ) */}
        <nav className="_links_1welw_63">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `_link_1welw_63 ${isActive ? '_active_1welw_84' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Area: Language Switcher + Mobile Button */}
        <div className="_right_1welw_101">
          {/* Language Switcher */}
          <div className="_root_1uma1_1" ref={langRef}>
            <button
              type="button"
              className="_trigger_1uma1_5"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-label="Change Language"
            >
              <span className="_globe_1uma1_27" />
              <span>{activeLocale.toUpperCase()}</span>
            </button>

            {langMenuOpen && (
              <div className="_menu_1uma1_34">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    className={`_item_1uma1_64 ${activeLocale === l.code ? '_current_1uma1_84' : ''}`}
                    onClick={() => handleLanguageSelect(l.code as Locale)}
                  >
                    <span className="_itemCode_1uma1_89">{l.short}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="_mobileButton_1welw_107"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t.mobile_menu_close : t.mobile_menu_open}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Menu */}
      <div className={`_mobileMenu_1welw_126 ${mobileOpen ? '_open_1welw_143' : ''}`}>
        {navLinks.map((link, idx) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `_mobileLink_1welw_148 ${isActive ? '_active_1welw_84' : ''}`
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className="_mobileIndex_1welw_176">0{idx + 1}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </header>
  );
};
