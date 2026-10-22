import React, { useState } from 'react';
import { Phone, Send, Mail } from 'lucide-react';
import { CustomSelect } from '../components/CustomSelect';
import type { SelectOption } from '../components/CustomSelect';
import { MagneticButton } from '../components/MagneticButton';
import { SpotlightTiltCard } from '../components/SpotlightTiltCard';
import { translations } from '../data/translations';
import type { Locale } from '../data/translations';

interface ContactPageProps {
  currentLocale: Locale;
}

export const ContactPage: React.FC<ContactPageProps> = ({ currentLocale }) => {
  const t = translations[currentLocale]?.contact_page || translations.uz.contact_page;
  const form = t.form || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    service: 'ios_apple',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        telegram: '',
        service: 'ios_apple',
        message: '',
      });
    }, 1000);
  };

  const serviceOptions: SelectOption[] = [
    { value: 'frontend_web', label: form.services?.frontend_web || 'Frontend va zamonaviy veb-ilovalar (React, Next.js, TS)' },
    { value: 'erp_crm', label: 'Murakkab ERP, CRM va boshqaruv panellari' },
    { value: 'realtime_systems', label: 'Real-vaqt tizimlari (WebSockets, WebRTC, SSE)' },
    { value: 'eimzo_security', label: 'E-Imzo integratsiyasi va Granular RBAC xavfsizlik' },
    { value: 'fullstack_platforms', label: form.services?.fullstack_platforms || 'Katta veb-platformalar va SaaS tizimlar' },
    { value: 'other', label: form.services?.other || 'Boshqa murakkab muhandislik loyihalari' },
  ];

  const contactMethods = [
    {
      title: 'CALL ME',
      value: '+998 94 490 09 15',
      href: 'tel:+998944900915',
      icon: <Phone size={20} />,
    },
    {
      title: 'TELEGRAM',
      value: '@Valiyev_0915',
      href: 'https://t.me/Valiyev_0915',
      icon: <Send size={20} />,
    },
    {
      title: 'INSTAGRAM',
      value: 'valiyev.o915',
      href: 'https://www.instagram.com/valiyev.o915/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      title: 'EMAIL',
      value: 'valiyevabduvosid6761@gmail.com',
      href: 'mailto:valiyevabduvosid6761@gmail.com',
      icon: <Mail size={20} />,
    },
  ];

  return (
    <div className="_page_kh7bg_3">
      {/* Header */}
      <section className="_pageHead_kh7bg_7">
        <div className="container">
          <h1 className="_title_kh7bg_11">
            {currentLocale === 'en' ? "Let's Build Your Frontend Application" : (t.title || 'Frontend Loyihangizni Yaratamiz')}
          </h1>
        </div>
      </section>

      {/* Main Grid */}
      <section className="_section_kh7bg_21">
        <div className="container _grid_kh7bg_27">
          {/* Left: Terminal Contact Form Card (Static, no hover effects) */}
          <div
            className="terminalCard _formCard_kh7bg_36"
            style={{
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              overflow: 'hidden',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div className="terminalHeader" style={{ padding: '0.8rem 1.4rem' }}>
              <div className="terminalDots">
                <span />
                <span />
                <span />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>contact.sh</span>
            </div>

            <form className="_form_kh7bg_36" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="_group_kh7bg_47">
                <label className="_label_kh7bg_53">
                  {currentLocale === 'en' ? 'Name' : (form.name || 'Ism')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={currentLocale === 'en' ? 'John Doe' : (form.name_placeholder || 'Ism Familiya')}
                  className="_input_kh7bg_66"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Email */}
              <div className="_group_kh7bg_47">
                <label className="_label_kh7bg_53">
                  {currentLocale === 'en' ? 'Email' : (form.email || 'Email')}
                </label>
                <input
                  type="email"
                  required
                  placeholder={currentLocale === 'en' ? 'john@example.com' : (form.email_placeholder || 'email@example.com')}
                  className="_input_kh7bg_66"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Telegram */}
              <div className="_group_kh7bg_47">
                <label className="_label_kh7bg_53">
                  {currentLocale === 'en' ? 'Telegram (optional)' : (form.telegram || 'Telegram (ixtiyoriy)')}
                </label>
                <input
                  type="text"
                  placeholder={form.telegram_placeholder || '@username'}
                  className="_input_kh7bg_66"
                  value={formData.telegram}
                  onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                />
                <p className="_hint_kh7bg_99">
                  {currentLocale === 'en' ? "I'll reply on Telegram faster" : (form.telegram_hint || 'Telegram orqali tezroq javob beraman')}
                </p>
              </div>

              {/* Service Type with Custom Styled Options */}
              <div className="_group_kh7bg_47">
                <label className="_label_kh7bg_53">
                  {currentLocale === 'en' ? 'Service Type' : (form.service || 'Xizmat turi')}
                </label>
                <CustomSelect
                  options={serviceOptions}
                  value={formData.service}
                  onChange={(val) => setFormData({ ...formData, service: val })}
                  placeholder={currentLocale === 'en' ? 'Select a service' : 'Xizmat turini tanlang'}
                />
              </div>

              {/* Message */}
              <div className="_group_kh7bg_47">
                <label className="_label_kh7bg_53">
                  {currentLocale === 'en' ? 'Message' : (form.message || 'Xabar')}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={currentLocale === 'en' ? 'Tell me about your iOS project...' : (form.message_placeholder || 'iOS loyihangiz haqida yozing...')}
                  className="_textarea_kh7bg_67"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Status Alerts */}
              {status === 'success' && (
                <div className="_status_kh7bg_110 _statusOk_kh7bg_119">
                  ✓ {form.success || 'Muvaffaqiyatli! Xabar yuborildi.'}
                </div>
              )}
              {status === 'error' && (
                <div className="_status_kh7bg_110 _statusError_kh7bg_125">
                  ✕ {form.error || "Xatolik yuz berdi. Qayta urinib ko'ring."}
                </div>
              )}

              {/* Magnetic Submit Button */}
              <div className="_submitWrap_kh7bg_106">
                <MagneticButton
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btnAccent"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.85rem 1.8rem',
                  }}
                >
                  <span>
                    {status === 'sending'
                      ? (form.sending || 'Sending...')
                      : (currentLocale === 'en' ? 'Send Message' : (form.submit || 'Yuborish'))}
                  </span>
                  <Send size={15} />
                </MagneticButton>
              </div>
            </form>
          </div>

          {/* Right: Direct Contact Cards (Interactive 3D Tilt on hover) */}
          <div className="_infoList_kh7bg_137">
            {contactMethods.map((m, idx) => (
              <SpotlightTiltCard key={m.title} maxTilt={5} delay={idx * 80}>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="_infoCard_kh7bg_143"
                  style={{ textDecoration: 'none', display: 'flex', width: '100%', height: '100%' }}
                >
                  <div className="_iconBox_kh7bg_151">
                    {m.icon}
                  </div>
                  <div className="_infoMeta_kh7bg_164">
                    <span className="_infoLabel_kh7bg_171">{m.title}</span>
                    <span className="_infoValue_kh7bg_179">{m.value}</span>
                  </div>
                </a>
              </SpotlightTiltCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
