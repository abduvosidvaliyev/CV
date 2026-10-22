import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { translations } from '../data/translations';
import type { Locale } from '../data/translations';

interface TechGalaxyProps {
  currentLocale: Locale;
}

interface ToolItem {
  id: string;
  name: string;
  categoryKey: string;
  ring: number; // 0 to 3
  baseAngle: number; // initial angle in radians
  tinted?: boolean;
  depth?: 'near' | 'mid' | 'far';
  docUrl?: string;
}

export const TechGalaxy: React.FC<TechGalaxyProps> = ({ currentLocale }) => {
  const stackData = translations[currentLocale]?.home?.stack || translations.uz.home.stack;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [stageWidth, setStageWidth] = useState(1120);

  // Animation refs - smooth 60/120fps continuous rotation with dynamic speed lerping
  const rotationRef = useRef(0);
  const speedRef = useRef(1);
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(true);
  const selectedToolRef = useRef<ToolItem | null>(null);
  const svgGroupRef = useRef<SVGGElement | null>(null);
  const nucleusRef = useRef<HTMLDivElement | null>(null);
  const prevZIndexRef = useRef<number[]>([]);
  const prevOpacityRef = useRef<number[]>([]);

  // Sync selectedTool to ref so RAF loop can read it without restarts
  useEffect(() => {
    selectedToolRef.current = selectedTool;
  }, [selectedTool]);

  // Complete list of technologies arranged on concentric planetary orbits
  const tools: ToolItem[] = useMemo(() => [
    // --- Ring 0: Inner Orbit (8 items) ---
    { id: 'vite', name: 'Vite', categoryKey: 'frontend_core', ring: 0, baseAngle: 0.2, docUrl: 'https://vitejs.dev' },
    { id: 'axios', name: 'Axios / REST', categoryKey: 'state_api', ring: 0, baseAngle: 1.0, docUrl: 'https://axios-http.com' },
    { id: 'zod', name: 'Zod / Yup', categoryKey: 'ui_security', ring: 0, baseAngle: 1.8, docUrl: 'https://zod.dev' },
    { id: 'virtual_scroll', name: 'Virtual Scroll', categoryKey: 'ui_security', ring: 0, baseAngle: 2.6, docUrl: '#' },
    { id: 'sse', name: 'SSE / Stream', categoryKey: 'state_api', ring: 0, baseAngle: 3.4, docUrl: '#' },
    { id: 'git', name: 'Git / GitHub', categoryKey: 'ui_security', ring: 0, baseAngle: 4.2, docUrl: 'https://github.com' },
    { id: 'supabase', name: 'Supabase', categoryKey: 'ui_security', ring: 0, baseAngle: 5.0, docUrl: 'https://supabase.com' },
    { id: 'html_css', name: 'HTML5 & CSS3', categoryKey: 'frontend_core', ring: 0, baseAngle: 5.8, docUrl: '#' },

    // --- Ring 1: Middle-Inner Orbit (10 items) ---
    { id: 'typescript', name: 'TypeScript', categoryKey: 'frontend_core', ring: 1, baseAngle: 0.3, tinted: true, depth: 'near', docUrl: 'https://typescriptlang.org' },
    { id: 'tanstack_query', name: 'TanStack Query', categoryKey: 'state_api', ring: 1, baseAngle: 0.9, tinted: true, depth: 'near', docUrl: 'https://tanstack.com/query' },
    { id: 'redux_toolkit', name: 'Redux Toolkit', categoryKey: 'state_api', ring: 1, baseAngle: 1.5, docUrl: 'https://redux-toolkit.js.org' },
    { id: 'websockets', name: 'WebSockets', categoryKey: 'state_api', ring: 1, baseAngle: 2.1, tinted: true, depth: 'near', docUrl: '#' },
    { id: 'eimzo', name: 'E-Imzo (Kripto API)', categoryKey: 'ui_security', ring: 1, baseAngle: 2.8, tinted: true, depth: 'near', docUrl: '#' },
    { id: 'granular_rbac', name: 'Granular RBAC', categoryKey: 'ui_security', ring: 1, baseAngle: 3.5, tinted: true, depth: 'near', docUrl: '#' },
    { id: 'livekit', name: 'LiveKit (WebRTC)', categoryKey: 'state_api', ring: 1, baseAngle: 4.2, tinted: true, depth: 'near', docUrl: 'https://livekit.io' },
    { id: 'react_hook_form', name: 'React Hook Form', categoryKey: 'ui_security', ring: 1, baseAngle: 4.8, docUrl: 'https://react-hook-form.com' },
    { id: 'ant_design', name: 'Ant Design', categoryKey: 'ui_security', ring: 1, baseAngle: 5.4, docUrl: 'https://ant.design' },
    { id: 'tailwind', name: 'Tailwind CSS', categoryKey: 'ui_security', ring: 1, baseAngle: 6.0, tinted: true, depth: 'near', docUrl: 'https://tailwindcss.com' },

    // --- Ring 2: Middle-Outer Orbit (9 items) ---
    { id: 'react', name: 'React.js', categoryKey: 'frontend_core', ring: 2, baseAngle: 0.35, tinted: true, depth: 'near', docUrl: 'https://react.dev' },
    { id: 'nextjs', name: 'Next.js', categoryKey: 'frontend_core', ring: 2, baseAngle: 1.05, tinted: true, depth: 'near', docUrl: 'https://nextjs.org' },
    { id: 'javascript', name: 'JavaScript (ES6+)', categoryKey: 'frontend_core', ring: 2, baseAngle: 1.75, depth: 'mid', docUrl: '#' },
    { id: 'rest_api', name: 'REST API / Axios', categoryKey: 'state_api', ring: 2, baseAngle: 2.45, docUrl: '#' },
    { id: 'one_id', name: 'OneID Avtorizatsiya', categoryKey: 'ui_security', ring: 2, baseAngle: 3.15, depth: 'near', docUrl: '#' },
    { id: 'cursor', name: 'Cursor AI', categoryKey: 'ai_engineering', ring: 2, baseAngle: 3.85, tinted: true, depth: 'near', docUrl: 'https://cursor.com' },
    { id: 'claude_code', name: 'Claude Code', categoryKey: 'ai_engineering', ring: 2, baseAngle: 4.55, tinted: true, depth: 'near', docUrl: 'https://anthropic.com' },
    { id: 'interceptors', name: 'Axios Interceptors', categoryKey: 'state_api', ring: 2, baseAngle: 5.25, docUrl: '#' },
    { id: 'step_wizard', name: 'Step Wizard Formalar', categoryKey: 'ui_security', ring: 2, baseAngle: 5.95, docUrl: '#' },

    // --- Ring 3: Outer Orbit (8 items) ---
    { id: 'erp_crm', name: 'ERP & CRM Arxitekturasi', categoryKey: 'frontend_core', ring: 3, baseAngle: 0.25, tinted: true, depth: 'near', docUrl: '#' },
    { id: 'table_perf', name: '15+ Ustunli Katta Jadvallar', categoryKey: 'ui_security', ring: 3, baseAngle: 1.05, tinted: true, depth: 'near', docUrl: '#' },
    { id: 'realtime_alerts', name: 'WebSocket Jonli Xabarnomalar', categoryKey: 'state_api', ring: 3, baseAngle: 1.85, docUrl: '#' },
    { id: 'ai_streaming', name: 'AI Streaming (SSE / Fetch)', categoryKey: 'state_api', ring: 3, baseAngle: 2.65, tinted: true, depth: 'near', docUrl: '#' },
    { id: 'image_compress', name: 'Brauzerda Rasm Siqish', categoryKey: 'ui_security', ring: 3, baseAngle: 3.45, docUrl: '#' },
    { id: 'export_tools', name: 'PDF / Excel / CSV Generatsiya', categoryKey: 'ui_security', ring: 3, baseAngle: 4.25, docUrl: '#' },
    { id: 'reusable_components', name: 'Reusable Komponentlar', categoryKey: 'frontend_core', ring: 3, baseAngle: 5.05, tinted: true, depth: 'near', docUrl: '#' },
    { id: 'responsive', name: 'Responsive & Unumdorlik', categoryKey: 'frontend_core', ring: 3, baseAngle: 5.85, docUrl: '#' },
  ], []);

  // Compute ring dimensions scaled proportionately:
  // - Ring 0 (rx: 180, ry: 80): Never touches central nucleus star (clears central core by > 60px)
  // - Ring 3 (rx: 415, ry: 186): Perfectly fits inside container width without getting cut off at screen edges
  const scale = Math.min(1.0, Math.max(0.32, stageWidth / 1120));
  const ringsConfig = useMemo(() => [
    { rx: 180 * scale, ry: 80 * scale, stroke: 'rgba(255, 255, 255, 0.08)', dashed: true },
    { rx: 255 * scale, ry: 114 * scale, stroke: 'rgba(255, 255, 255, 0.08)', dashed: false },
    { rx: 335 * scale, ry: 150 * scale, stroke: 'rgba(190, 242, 100, 0.16)', dashed: false },
    { rx: 415 * scale, ry: 186 * scale, stroke: 'rgba(255, 255, 255, 0.07)', dashed: false },
  ], [scale]);

  // Update DOM transform for each pill directly (Zero React re-render lag)
  // Optimized: Only mutate zIndex and opacity when actually changed to prevent DOM restacking thrash
  const updatePills = useCallback((rot: number) => {
    // Dynamic swaying tilt: orbital plane oscillates between -7° and -17°
    const currentTiltDeg = -12 + Math.sin(rot * 0.85) * 5.2;
    const currentTiltRad = (currentTiltDeg * Math.PI) / 180;
    const cosTilt = Math.cos(currentTiltRad);
    const sinTilt = Math.sin(currentTiltRad);

    // Synchronize SVG orbital paths tilt around (0, 0)
    if (svgGroupRef.current) {
      svgGroupRef.current.setAttribute('transform', `rotate(${currentTiltDeg.toFixed(2)})`);
    }

    // Reticle crosshair breathing rotation in exact dead center (0, 0)
    if (nucleusRef.current) {
      nucleusRef.current.style.transform = `rotate(${(-currentTiltDeg * 0.4).toFixed(2)}deg)`;
    }

    for (let i = 0; i < tools.length; i++) {
      const el = pillRefs.current[i];
      if (!el) continue;

      const item = tools[i];
      const ring = ringsConfig[item.ring];
      const angle = item.baseAngle + rot;

      const unrotX = ring.rx * Math.cos(angle);
      const unrotY = ring.ry * Math.sin(angle);

      const x = unrotX * cosTilt - unrotY * sinTilt;
      const y = unrotX * sinTilt + unrotY * cosTilt;

      const isFront = unrotY > 0;
      const zIndex = isFront ? 20 + Math.round(unrotY / 10) : 6 + Math.round((unrotY + ring.ry) / 15);
      const itemScale = isFront ? 1 : 0.93;
      const opacity = isFront ? 1 : 0.85;

      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${itemScale})`;
      if (prevZIndexRef.current[i] !== zIndex) {
        el.style.zIndex = `${zIndex}`;
        prevZIndexRef.current[i] = zIndex;
      }
      if (prevOpacityRef.current[i] !== opacity) {
        el.style.opacity = `${opacity}`;
        prevOpacityRef.current[i] = opacity;
      }
    }
  }, [tools, ringsConfig]);

  // ResizeObserver to dynamically and accurately measure container width
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          setStageWidth(width);
        }
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // IntersectionObserver: Pause RAF loop completely when galaxy is scrolled out of viewport!
  // Saves 100% CPU/GPU and makes page scrolling completely smooth
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Window scroll listener: Ensures mouse wheel scrolling never causes hover jitter
  useEffect(() => {
    const handleWindowScroll = () => {
      isHoveringRef.current = false;
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    const target = e.target as HTMLElement;
    const isOverTool = target.closest('._tool_mtx51_167') !== null;
    isHoveringRef.current = isOverTool;
  }, []);

  const handlePointerLeave = useCallback(() => {
    isHoveringRef.current = false;
  }, []);

  // Continuous 60fps/120fps animation loop with smooth speed lerping
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(loop);

      // Completely pause execution when section is out of viewport
      if (!isVisibleRef.current) {
        lastTime = currentTime;
        return;
      }

      const delta = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      // Target speed: 0 if popover is open or if user actively hovers a tool, 1 otherwise
      const targetSpeed = (selectedToolRef.current !== null || isHoveringRef.current) ? 0 : 1;
      const lerpFactor = targetSpeed > speedRef.current ? 2.5 : 7.0;
      speedRef.current += (targetSpeed - speedRef.current) * Math.min(1, delta * lerpFactor);

      if (speedRef.current > 0.001) {
        rotationRef.current += delta * 0.055 * speedRef.current;
        updatePills(rotationRef.current);
      }
    };

    // Initial positioning
    updatePills(rotationRef.current);
    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [updatePills]);

  return (
    <section className="_stackSection_132ah_271" style={{ position: 'relative' }}>
      <div className="container">
        {/* Head: Title */}
        <div className="_stackHead_132ah_276" style={{ marginBottom: '0.8rem' }}>
          <span className="monoLabel">
            — // STACK
          </span>
          <span className="_stackHint_132ah_286" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-faint)' }}>
            {stackData.hint || 'tap for info'}
          </span>
        </div>

        {/* Orbit Galaxy Stage - Strictly bounded within container width (No full-width overflow) */}
        <div
          ref={containerRef}
          className="_galaxy_mtx51_6 _stackGalaxy_132ah_293"
          data-ready="true"
          data-live="true"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{
            position: 'relative',
            height: 'clamp(560px, 56vw, 680px)',
            width: '100%',
            maxWidth: '1120px',
            margin: '0 auto',
            overflow: 'hidden',
            cursor: 'default',
          }}
        >
          {/* Ambient Cosmic Center Glow */}
          <div className="_backdrop_mtx51_18">
            <div className="_core_mtx51_34" />
            <div className="_dust_mtx51_94" />
          </div>

          {/* =========================================================================
              UNIFIED CENTERED STAGE:
              Anchor: left: 50%, top: 50%.
              All orbit lines, star, and pills originate from (0, 0).
             ========================================================================= */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 0,
              height: 0,
              zIndex: 2,
            }}
          >
            {/* 1. Concentric SVG Elliptical Orbit Paths */}
            <svg
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                overflow: 'visible',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              <g ref={svgGroupRef}>
                {ringsConfig.map((ring, rIdx) => (
                  <ellipse
                    key={rIdx}
                    cx={0}
                    cy={0}
                    rx={ring.rx}
                    ry={ring.ry}
                    fill="none"
                    stroke={ring.stroke}
                    strokeWidth={1.2}
                    strokeDasharray={ring.dashed ? '4 8' : undefined}
                  />
                ))}
              </g>
            </svg>

            {/* 2. Glowing Central Nucleus Star / Sun - Anchored firmly in Dead Center (0, 0) */}
            <div
              ref={nucleusRef}
              className="_nucleus_mtx51_59"
              style={{
                position: 'absolute',
                left: '-80px',
                top: '-80px',
                width: '160px',
                height: '160px',
                translate: 'none',
                margin: 0,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />

            {/* 3. Orbiting Planetary Pills - All translated from (0, 0) */}
            <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 3 }}>
              {tools.map((tool, idx) => {
                const isSelected = selectedTool?.id === tool.id;

                return (
                  <div
                    key={tool.id}
                    ref={(el) => { pillRefs.current[idx] = el; }}
                    className="_tool_mtx51_167"
                    data-tool={tool.id}
                    data-depth={tool.depth || (tool.tinted ? 'near' : 'mid')}
                    data-tinted={tool.tinted ? 'true' : undefined}
                    aria-expanded={isSelected}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTool(isSelected ? null : tool);
                    }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      willChange: 'transform',
                      cursor: 'pointer',
                      zIndex: isSelected ? 50 : 10,
                    }}
                  >
                    <div
                      className="_pill_mtx51_218"
                      style={{
                        cursor: 'pointer',
                        userSelect: 'none',
                        border: isSelected
                          ? '1px solid var(--accent)'
                          : tool.tinted
                          ? '1px solid #bef2647a'
                          : '1px solid rgba(255, 255, 255, 0.16)',
                        background: tool.tinted ? '#101810f2' : '#0d1118f5',
                        color: tool.tinted ? 'var(--accent)' : 'var(--text)',
                        boxShadow: tool.tinted
                          ? '0 6px 22px rgba(0, 0, 0, 0.55), 0 0 16px rgba(190, 242, 100, 0.2)'
                          : '0 4px 18px rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'none',
                        WebkitBackdropFilter: 'none',
                      }}
                    >
                      <span
                        className="_star_mtx51_313"
                        style={{
                          backgroundColor: tool.tinted ? 'var(--accent)' : '#fff',
                          boxShadow: tool.tinted ? '0 0 8px var(--accent)' : '0 0 6px rgba(255, 255, 255, 0.7)',
                        }}
                      />
                      <span>{tool.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Popover Detail Modal (Tapped Pill Info) */}
          {selectedTool && (
            <div
              className="_popover_mtx51_334"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 70,
                maxWidth: '380px',
                width: '90%',
                background: '#0d1118fa',
                border: '1px solid var(--border-accent)',
                borderRadius: 'var(--radius)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 24px rgba(190, 242, 100, 0.15)',
                padding: '1.4rem',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              <div className="_popHead_mtx51_367">
                <span className="_popCategory_mtx51_375" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                  {stackData.categories[selectedTool.categoryKey] || selectedTool.categoryKey}
                </span>
                <button
                  type="button"
                  className="_popClose_mtx51_395"
                  onClick={() => setSelectedTool(null)}
                  aria-label={stackData.close || 'Yopish'}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-dim)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
              <h4 className="_popTitle_mtx51_417" style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.6rem 0 0.4rem', color: 'var(--text)' }}>
                {selectedTool.name}
              </h4>
              <p className="_popText_mtx51_424" style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                {stackData.tools[selectedTool.id] || `${selectedTool.name} bo'yicha yuqori malakali amaliy muhandislik tajribasi.`}
              </p>
              {selectedTool.docUrl && selectedTool.docUrl !== '#' && (
                <a
                  href={selectedTool.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="_popLink_mtx51_431"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '0.9rem', color: 'var(--accent)', textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}
                >
                  <span>{stackData.docs || 'rasmiy hujjatlar'}</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
