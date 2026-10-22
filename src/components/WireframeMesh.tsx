import React, { useRef, useEffect } from 'react';

interface Traveler {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

export const WireframeMesh: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Standard 12-vertex Icosahedron
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    const radius = Math.min(width, height) * 0.36;
    const vertices = rawVertices.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [(x / len) * radius, (y / len) * radius, (z / len) * radius];
    });

    // 30 clean edges connecting adjacent vertices
    const edges: [number, number][] = [];
    const adjacency: number[][] = Array.from({ length: vertices.length }, () => []);

    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0];
        const dy = vertices[i][1] - vertices[j][1];
        const dz = vertices[i][2] - vertices[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < radius * 1.12) {
          edges.push([i, j]);
          adjacency[i].push(j);
          adjacency[j].push(i);
        }
      }
    }

    // 4 Traveling neon-lime particles circulating across the mesh edges
    const travelers: Traveler[] = [
      { from: 0, to: adjacency[0][0] ?? 1, progress: 0.1, speed: 0.007 },
      { from: 4, to: adjacency[4][1] ?? 5, progress: 0.35, speed: 0.009 },
      { from: 8, to: adjacency[8][0] ?? 9, progress: 0.65, speed: 0.008 },
      { from: 11, to: adjacency[11][1] ?? 2, progress: 0.85, speed: 0.01 }
    ];

    // Ambient floating 3D dust/dots in the background
    const orbitalParticles: { x: number; y: number; z: number; size: number; alpha: number }[] = [];
    for (let p = 0; p < 28; p++) {
      const theta = Math.random() * Math.PI * 2;
      const phiAngle = Math.acos(Math.random() * 2 - 1);
      const r = radius * (1.15 + Math.random() * 0.75);
      orbitalParticles.push({
        x: r * Math.sin(phiAngle) * Math.cos(theta),
        y: r * Math.sin(phiAngle) * Math.sin(theta),
        z: r * Math.cos(phiAngle),
        size: Math.random() > 0.6 ? 2.2 : 1.4,
        alpha: 0.15 + Math.random() * 0.35,
      });
    }

    // Interactive tilt restricted ONLY to its own right-hero region
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let baseAngle = 0;

    // Target the right-hero container or canvas container
    const interactiveContainer = (canvas.closest('._heroRight_132ah_82') as HTMLElement) || canvas.parentElement || canvas;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = interactiveContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      targetRotY = (x / rect.width) * 0.35;
      targetRotX = -(y / rect.height) * 0.35;
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    interactiveContainer.addEventListener('mousemove', handleMouseMove);
    interactiveContainer.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Very slow, calm, majestic rotation
      baseAngle += 0.0008;
      currentRotX += (targetRotX - currentRotX) * 0.04;
      currentRotY += (targetRotY - currentRotY) * 0.04;

      const angleX = currentRotX + 0.12;
      const angleY = baseAngle + currentRotY;
      const angleZ = baseAngle * 0.2;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      // 3D projection function
      const project3D = (x: number, y: number, z: number) => {
        let x1 = x * cosY - z * sinY;
        let z1 = z * cosY + x * sinY;

        let y2 = y * cosX - z1 * sinX;
        let z2 = z1 * cosX + y * sinX;

        let x3 = x1 * cosZ - y2 * sinZ;
        let y3 = y2 * cosZ + x1 * sinZ;

        const fov = 460;
        const scale = fov / (fov + z2 + radius * 0.4);
        const px = width / 2 + x3 * scale;
        const py = height / 2 + y3 * scale;

        return { px, py, z: z2, scale };
      };

      // Project vertices
      const projected = vertices.map(([x, y, z]) => project3D(x, y, z));

      // Draw edges (clean, thin, glowing lime lines)
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        if (!p1 || !p2) return;

        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.12, Math.min(0.65, (avgZ + radius) / (2 * radius) * 0.55 + 0.12));

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = `rgba(190, 242, 100, ${alpha})`;
        ctx.lineWidth = alpha > 0.4 ? 1.2 : 0.85;
        ctx.stroke();
      });

      // Update and draw traveling packets along the edges
      travelers.forEach((traveler) => {
        traveler.progress += traveler.speed;
        if (traveler.progress >= 1) {
          traveler.progress = 0;
          const arrivedAt = traveler.to;
          const prev = traveler.from;
          traveler.from = arrivedAt;

          // Pick next vertex, preferring forward direction
          const neighbors = adjacency[arrivedAt] || [];
          const forwardNeighbors = neighbors.filter((n) => n !== prev);
          const candidates = forwardNeighbors.length > 0 ? forwardNeighbors : neighbors;
          traveler.to = candidates[Math.floor(Math.random() * candidates.length)] ?? 0;
        }

        const v1 = vertices[traveler.from];
        const v2 = vertices[traveler.to];
        if (!v1 || !v2) return;

        const t = traveler.progress;
        const curX = v1[0] + (v2[0] - v1[0]) * t;
        const curY = v1[1] + (v2[1] - v1[1]) * t;
        const curZ = v1[2] + (v2[2] - v1[2]) * t;

        const proj = project3D(curX, curY, curZ);
        const pulseAlpha = Math.max(0.35, Math.min(1, (proj.z + radius) / (2 * radius) * 0.65 + 0.35));
        const dotRadius = Math.max(2.2, 3.4 * proj.scale);

        // Subtle glowing line trail behind particle
        const trailT = Math.max(0, t - 0.12);
        const trX = v1[0] + (v2[0] - v1[0]) * trailT;
        const trY = v1[1] + (v2[1] - v1[1]) * trailT;
        const trZ = v1[2] + (v2[2] - v1[2]) * trailT;
        const trProj = project3D(trX, trY, trZ);

        ctx.beginPath();
        ctx.moveTo(trProj.px, trProj.py);
        ctx.lineTo(proj.px, proj.py);
        ctx.strokeStyle = `rgba(190, 242, 100, ${pulseAlpha * 0.7})`;
        ctx.lineWidth = Math.max(1.2, 2.2 * proj.scale);
        ctx.stroke();

        // 1. Large radiant neon glow
        const glowGrad = ctx.createRadialGradient(proj.px, proj.py, 0, proj.px, proj.py, dotRadius * 4.8);
        glowGrad.addColorStop(0, `rgba(190, 242, 100, ${pulseAlpha * 0.6})`);
        glowGrad.addColorStop(0.35, `rgba(163, 230, 53, ${pulseAlpha * 0.28})`);
        glowGrad.addColorStop(1, 'rgba(163, 230, 53, 0)');

        ctx.beginPath();
        ctx.arc(proj.px, proj.py, dotRadius * 4.8, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // 2. Neon-lime core disk
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, dotRadius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 242, 100, ${pulseAlpha * 0.95})`;
        ctx.fill();

        // 3. Ultra-bright white-hot inner center
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, Math.max(1.4, dotRadius * 0.75), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseAlpha * 0.98})`;
        ctx.fill();
      });

      // Draw vertices (nodes)
      projected.forEach((p, idx) => {
        const alpha = Math.max(0.25, (p.z + radius) / (2 * radius));
        const dotSize = 3 * p.scale;

        // Outer radial halo
        ctx.beginPath();
        ctx.arc(p.px, p.py, dotSize * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 242, 100, ${alpha * 0.22})`;
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(1.8, dotSize), 0, Math.PI * 2);
        ctx.fillStyle = idx % 2 === 0 ? `rgba(255, 255, 255, ${alpha * 0.95})` : `rgba(190, 242, 100, ${alpha * 0.95})`;
        ctx.fill();
      });

      // Draw surrounding ambient space particles
      orbitalParticles.forEach((part) => {
        const proj = project3D(part.x, part.y, part.z);
        const pAlpha = Math.max(0.12, Math.min(0.65, (proj.z + radius) / (2 * radius) * part.alpha));

        ctx.beginPath();
        ctx.arc(proj.px, proj.py, Math.max(1, part.size * proj.scale), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      interactiveContainer.removeEventListener('mousemove', handleMouseMove);
      interactiveContainer.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
};
