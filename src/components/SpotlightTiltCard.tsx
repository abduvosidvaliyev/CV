import React, { useRef, useState, useEffect } from 'react';

interface SpotlightTiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
  delay?: number;
  disableTilt?: boolean;
  onClick?: () => void;
}

export const SpotlightTiltCard: React.FC<SpotlightTiltCardProps> = ({
  children,
  className = '',
  style = {},
  maxTilt = 3.5,
  delay = 0,
  disableTilt = false,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Scroll reveal animation with rootMargin triggering 120px in advance
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Check if element is already within or near viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        rootMargin: '120px 0px 0px 0px', // Trigger 120px before entering screen so fast scroll never catches blank cards
        threshold: 0.02,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    if (!disableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      setTilt({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Card transform logic: completely disabled if disableTilt is true
  const cardTransform = disableTilt
    ? 'none'
    : isHovered
    ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg)';

  return (
    <div
      ref={wrapperRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        height: '100%',
        width: '100%',
      }}
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`spotlight-tilt-card ${className}`}
        style={{
          position: 'relative',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          overflow: 'hidden',
          cursor: onClick ? 'pointer' : 'default',
          transform: cardTransform,
          transition: isHovered
            ? 'transform 0.08s ease-out, border-color 0.2s ease, box-shadow 0.2s ease'
            : 'transform 0.35s ease-out, border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: isHovered
            ? '0 14px 32px rgba(0, 0, 0, 0.55), 0 0 20px rgba(255, 255, 255, 0.03)'
            : '0 4px 18px rgba(0, 0, 0, 0.35)',
          borderColor: isHovered ? 'rgba(190, 242, 100, 0.45)' : 'var(--border)',
          transformStyle: disableTilt ? undefined : 'preserve-3d',
          height: '100%',
          ...style,
        }}
      >
        {/* Moving Spotlight Highlight Follower - Soft Translucent White */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s ease',
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 70%)`,
            zIndex: 1,
          }}
        />

        {/* Card Content */}
        <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
