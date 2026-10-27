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
  const [stageDimensions, setStageDimensions] = useState({ width: 1200, height: 640 });

  // Animation refs - smooth 60/120fps continuous rotation with dynamic speed lerping
  const rotationRef = useRef(0);
  const speedRef = useRef(1);
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(true);
  const selectedToolRef = useRef<ToolItem | null>(null);
  const orbitPlaneRef = useRef<HTMLDivElement | null>(null);
  const nucleusRef = useRef<HTMLDivElement | null>(null);
  const prevZIndexRef = useRef<number[]>([]);
  const prevOpacityRef = useRef<number[]>([]);

  // Drag interaction refs
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartRotRef = useRef(0);
  const dragDistanceRef = useRef(0);

  // Sync selectedTool to ref so RAF loop can read it without restarts
  useEffect(() => {
    selectedToolRef.current = selectedTool;
  }, [selectedTool]);

  // Clean, professional, and concise titles matching the original aesthetic
  const tools: ToolItem[] = useMemo(() => [
    // --- Ring 0: Inner Orbit (6 items) ---
    { id: 'vite', name: 'Vite', categoryKey: 'frontend_core', ring: 0, baseAngle: 0.0, docUrl: 'https://vitejs.dev' },
    { id: 'rest_api', name: 'REST API', categoryKey: 'api_architecture', ring: 0, baseAngle: 1.05, docUrl: '#' },
    { id: 'zod', name: 'Zod', categoryKey: 'ui_library', ring: 0, baseAngle: 2.09, docUrl: 'https://zod.dev' },
    { id: 'git', name: 'Git / GitHub', categoryKey: 'version_control', ring: 0, baseAngle: 3.14, docUrl: 'https://github.com' },
    { id: 'supabase', name: 'Supabase', categoryKey: 'database', ring: 0, baseAngle: 4.19, docUrl: 'https://supabase.com' },
    { id: 'html_css', name: 'HTML5 & CSS3', categoryKey: 'frontend_core', ring: 0, baseAngle: 5.24, docUrl: '#' },

    // --- Ring 1: Middle-Inner Orbit (8 items) ---
    { id: 'typescript', name: 'TypeScript', categoryKey: 'language', ring: 1, baseAngle: 0.35, tinted: true, depth: 'near', docUrl: 'https://typescriptlang.org' },
    { id: 'tanstack_query', name: 'TanStack Query', categoryKey: 'api_architecture', ring: 1, baseAngle: 1.14, tinted: true, depth: 'near', docUrl: 'https://tanstack.com/query' },
    { id: 'redux_toolkit', name: 'Redux Toolkit', categoryKey: 'api_architecture', ring: 1, baseAngle: 1.92, docUrl: 'https://redux-toolkit.js.org' },
    { id: 'websockets', name: 'WebSockets', categoryKey: 'api_architecture', ring: 1, baseAngle: 2.71, tinted: true, depth: 'near', docUrl: '#' },
    { id: 'interceptors', name: 'Axios Interceptors', categoryKey: 'api_architecture', ring: 1, baseAngle: 3.49, docUrl: '#' },
    { id: 'livekit', name: 'LiveKit WebRTC', categoryKey: 'api_architecture', ring: 1, baseAngle: 4.28, tinted: true, depth: 'near', docUrl: 'https://livekit.io' },
    { id: 'react_hook_form', name: 'React Hook Form', categoryKey: 'ui_library', ring: 1, baseAngle: 5.06, docUrl: 'https://react-hook-form.com' },
    { id: 'ant_design', name: 'Ant Design', categoryKey: 'ui_framework', ring: 1, baseAngle: 5.85, docUrl: 'https://ant.design' },

    // --- Ring 2: Middle-Outer Orbit (8 items - Green Accent Orbit) ---
    { id: 'react', name: 'React', categoryKey: 'ui_framework', ring: 2, baseAngle: 0.75, tinted: true, depth: 'near', docUrl: 'https://react.dev' },
    { id: 'nextjs', name: 'Next.js', categoryKey: 'web_framework', ring: 2, baseAngle: 1.54, tinted: true, depth: 'near', docUrl: 'https://nextjs.org' },
    { id: 'tailwind', name: 'Tailwind CSS', categoryKey: 'ui_framework', ring: 2, baseAngle: 2.32, tinted: true, depth: 'near', docUrl: 'https://tailwindcss.com' },
    { id: 'one_id', name: 'OneID SSO', categoryKey: 'api_architecture', ring: 2, baseAngle: 3.11, depth: 'near', docUrl: '#' },
    { id: 'cursor', name: 'Cursor AI', categoryKey: 'ai_engineering', ring: 2, baseAngle: 3.89, tinted: true, depth: 'near', docUrl: 'https://cursor.com' },
    { id: 'claude_code', name: 'Claude Code', categoryKey: 'ai_engineering', ring: 2, baseAngle: 4.68, tinted: true, depth: 'near', docUrl: 'https://anthropic.com' },
    { id: 'eimzo', name: 'E-Imzo Kripto', categoryKey: 'api_architecture', ring: 2, baseAngle: 5.46, tinted: true, depth: 'near', docUrl: '#' },
    { id: 'javascript', name: 'JavaScript', categoryKey: 'language', ring: 2, baseAngle: 6.25, depth: 'mid', docUrl: '#' },

    // --- Ring 3: Outer Orbit (8 items) ---
    { id: 'erp_crm', name: 'ERP & CRM', categoryKey: 'frontend_core', ring: 3, baseAngle: 0.15, tinted: true, depth: 'near', docUrl: '#' },
    { id: 'table_perf', name: 'Virtual Tables', categoryKey: 'ui_library', ring: 3, baseAngle: 0.94, tinted: true, depth: 'near', docUrl: '#' },
    { id: 'ai_streaming', name: 'AI Streaming', categoryKey: 'ai_engineering', ring: 3, baseAngle: 1.72, tinted: true, depth: 'near', docUrl: '#' },
    { id: 'granular_rbac', name: 'Granular RBAC', categoryKey: 'api_architecture', ring: 3, baseAngle: 2.51, docUrl: '#' },
    { id: 'image_compress', name: 'Image Compression', categoryKey: 'ui_library', ring: 3, baseAngle: 3.29, docUrl: '#' },
    { id: 'export_tools', name: 'Excel / PDF Export', categoryKey: 'ui_library', ring: 3, baseAngle: 4.08, docUrl: '#' },
    { id: 'design_system', name: 'Design System', categoryKey: 'ui_framework', ring: 3, baseAngle: 4.86, tinted: true, depth: 'near', docUrl: '#' },
    { id: 'web_performance', name: 'Web Performance', categoryKey: 'frontend_core', ring: 3, baseAngle: 5.65, docUrl: '#' },
  ], []);

  // Spacious, elegant, and delicate planetary orbit dimensions matching the original reference
  const scale = Math.min(1.0, Math.max(0.40, stageDimensions.width / 1200));
  const ringsConfig = useMemo(() => [
    {
      rx: 185 * scale,
      ry: 82 * scale,
      border: '1px dashed rgba(255, 255, 255, 0.13)',
      boxShadow: 'none',
    },
    {
      rx: 290 * scale,
      ry: 128 * scale,
      border: '1px solid rgba(255, 255, 255, 0.10)',
      boxShadow: 'none',
    },
    {
      rx: 400 * scale,
      ry: 176 * scale,
      border: '1px solid rgba(255, 255, 255, 0.10)',
      boxShadow: 'none',
    },
    {
      rx: 510 * scale,
      ry: 224 * scale,
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: 'none',
    },
  ], [scale]);

  // Update DOM transform for each pill directly (Zero React re-render lag)
  const updatePills = useCallback((rot: number) => {
    // Dynamic swaying tilt: orbital plane oscillates naturally between -9.5° and -20.5°
    const currentTiltDeg = -15 + Math.sin(rot * 1.1) * 5.2;
    const currentTiltRad = (currentTiltDeg * Math.PI) / 180;
    const cosTilt = Math.cos(currentTiltRad);
    const sinTilt = Math.sin(currentTiltRad);

    // Synchronize CSS orbital paths plane tilt around (0, 0)
    if (orbitPlaneRef.current) {
      orbitPlaneRef.current.style.transform = `rotate(${currentTiltDeg.toFixed(2)}deg)`;
    }

    // Keep center star / reticle crosshair perfectly upright and straight
    if (nucleusRef.current) {
      nucleusRef.current.style.transform = 'none';
    }

    for (let i = 0; i < tools.length; i++) {
      const el = pillRefs.current[i];
      if (!el) continue;

      const item = tools[i];
      const ring = ringsConfig[item.ring];
      const angle = item.baseAngle + rot;

      // Base unrotated coordinates along the ellipse
      const unrotX = ring.rx * Math.cos(angle);
      // Subtle organic harmonic vertical undulation (tepaga-pastga og'ib kosmik suzish)
      const verticalFloat = Math.sin(angle * 2 + rot * 1.3) * (7 * scale);
      const unrotY = ring.ry * Math.sin(angle) + verticalFloat;

      // Apply 3D tilted rotation matrix
      const x = unrotX * cosTilt - unrotY * sinTilt;
      const y = unrotX * sinTilt + unrotY * cosTilt;

      // 3D perspective depth: closer pills are larger and fully visible, farther pills are smaller and dimmed
      const isFront = unrotY > 0;
      const depthRatio = Math.max(-1, Math.min(1, unrotY / ring.ry));
      const zIndex = isFront ? 20 + Math.round(unrotY / 8) : 4 + Math.round((unrotY + ring.ry) / 14);
      const itemScale = isFront ? 1.0 + depthRatio * 0.05 : 0.95 + depthRatio * 0.07;
      const opacity = isFront ? 1.0 : Math.max(0.72, 0.86 + depthRatio * 0.14);

      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${itemScale.toFixed(3)})`;
      if (prevZIndexRef.current[i] !== zIndex) {
        el.style.zIndex = `${zIndex}`;
        prevZIndexRef.current[i] = zIndex;
      }
      if (prevOpacityRef.current[i] !== opacity) {
        el.style.opacity = `${opacity.toFixed(2)}`;
        prevOpacityRef.current[i] = opacity;
      }
    }
  }, [tools, ringsConfig, scale]);

  // ResizeObserver to dynamically and accurately measure container dimensions
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setStageDimensions({ width, height });
        }
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // IntersectionObserver: Pause RAF loop completely when galaxy is scrolled out of viewport!
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

  // Drag & Pointer handlers - smoothly support "hold to drag · tap for info"
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartRotRef.current = rotationRef.current;
    dragDistanceRef.current = 0;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      const deltaX = e.clientX - dragStartXRef.current;
      dragDistanceRef.current = Math.abs(deltaX);
      rotationRef.current = dragStartRotRef.current + (deltaX * 0.0035);
      updatePills(rotationRef.current);
      return;
    }
    if (e.pointerType === 'touch') return;
    const target = e.target as HTMLElement;
    const isOverTool = target.closest('._tool_mtx51_167') !== null;
    isHoveringRef.current = isOverTool;
  }, [updatePills]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  }, []);

  // Continuous 60fps/120fps animation loop with smooth speed lerping
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(loop);

      if (!isVisibleRef.current) {
        lastTime = currentTime;
        return;
      }

      const delta = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      const isPaused = selectedToolRef.current !== null || isHoveringRef.current || isDraggingRef.current;
      const targetSpeed = isPaused ? 0 : 1;
      const lerpFactor = targetSpeed > speedRef.current ? 2.5 : 7.0;
      speedRef.current += (targetSpeed - speedRef.current) * Math.min(1, delta * lerpFactor);

      if (speedRef.current > 0.001 && !isDraggingRef.current) {
        rotationRef.current += delta * 0.030 * speedRef.current;
        updatePills(rotationRef.current);
      }
    };

    updatePills(rotationRef.current);
    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [updatePills]);

  return (
    <section className="_stackSection_132ah_271" style={{ position: 'relative', overflowX: 'clip' }}>
      <div className="container">
        {/* Head: Title & Drag Hint */}
        <div className="_stackHead_132ah_276" style={{ marginBottom: '0.8rem' }}>
          <span className="monoLabel">
            — // STACK
          </span>
          <span className="_stackHint_132ah_286" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-faint)', letterSpacing: '0.04em' }}>
            {stackData.hint || 'bosib turib suring · bosing — batafsil'}
          </span>
        </div>

        {/* Orbit Galaxy Stage - Perfectly centered, spacious, and safe from edge clipping */}
        <div
          ref={containerRef}
          className="_galaxy_mtx51_6 _stackGalaxy_132ah_293"
          data-ready="true"
          data-live="true"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            position: 'relative',
            height: 'clamp(580px, 54vw, 720px)',
            width: '100%',
            maxWidth: '1360px',
            margin: '0 auto',
            overflow: 'visible',
            cursor: isDraggingRef.current ? 'grabbing' : 'grab',
            touchAction: 'none',
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
              All orbit lines, nucleus star, and pills originate precisely from (0, 0).
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
            {/* 1. Visible Planetary Orbit Lines (Delicate & subtle matching the reference design) */}
            <div
              ref={orbitPlaneRef}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              {ringsConfig.map((ring, rIdx) => (
                <div
                  key={rIdx}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: `${ring.rx * 2}px`,
                    height: `${ring.ry * 2}px`,
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    border: ring.border,
                    boxShadow: ring.boxShadow,
                    pointerEvents: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              ))}
            </div>

            {/* 2. Glowing Central Nucleus Star / Sun */}
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
                      if (dragDistanceRef.current > 6) return;
                      setSelectedTool(isSelected ? null : tool);
                    }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      translate: 'none', // Prevents double offset!
                      margin: 0,
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
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.55em',
                        padding: '0.42em 0.96em',
                        fontSize: 'clamp(12.5px, 1.2vw, 14.5px)',
                        fontWeight: tool.tinted ? 600 : 500,
                        border: isSelected
                          ? '1px solid var(--accent)'
                          : tool.tinted
                          ? '1px solid rgba(190, 242, 100, 0.48)'
                          : '1px solid rgba(255, 255, 255, 0.14)',
                        background: tool.tinted ? '#0f1710f4' : '#0c1016f4',
                        color: tool.tinted ? 'var(--accent)' : 'rgba(255, 255, 255, 0.88)',
                        boxShadow: tool.tinted
                          ? '0 4px 18px rgba(0, 0, 0, 0.55), 0 0 14px rgba(190, 242, 100, 0.18)'
                          : '0 4px 14px rgba(0, 0, 0, 0.48)',
                        borderRadius: '999px',
                        whiteSpace: 'nowrap',
                        lineHeight: 1.25,
                        transition: 'border-color .2s ease, box-shadow .2s ease, transform .2s ease',
                      }}
                    >
                      <span
                        className="_star_mtx51_313"
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
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
                maxWidth: '400px',
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
