import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  section: number;
}

interface Triangle {
  p1: Point;
  p2: Point;
  p3: Point;
  opacity: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface AbstractLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  speed: number;
  angle: number;
}

// Simple Delaunay triangulation implementation
function delaunayTriangulation(points: Point[]): Triangle[] {
  if (points.length < 3) return [];

  const triangles: Triangle[] = [];

  // Create a simple triangulation by connecting nearby points
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      for (let k = j + 1; k < points.length; k++) {
        const p1 = points[i];
        const p2 = points[j];
        const p3 = points[k];

        // Only create triangles within the same section and reasonable distance
        if (p1.section === p2.section && p2.section === p3.section) {
          const dist1 = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          const dist2 = Math.sqrt((p2.x - p3.x) ** 2 + (p2.y - p3.y) ** 2);
          const dist3 = Math.sqrt((p3.x - p1.x) ** 2 + (p3.y - p1.y) ** 2);

          // Only create triangles with reasonable side lengths
          if (dist1 < 200 && dist2 < 200 && dist3 < 200 &&
            dist1 > 50 && dist2 > 50 && dist3 > 50) {
            triangles.push({
              p1, p2, p3,
              opacity: Math.random() * 0.1 + 0.05
            });
          }
        }
      }
    }
  }

  return triangles;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const trianglesRef = useRef<Triangle[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<Star[]>([]);
  const abstractLinesRef = useRef<AbstractLine[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      initializePoints();
      initializeParticles();
      initializeStars();
      initializeAbstractLines();
    };

    const initializeParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 20000);

      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    };

    const initializeStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 25000);

      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 2 + 1,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const initializeAbstractLines = () => {
      const lineCount = 15;

      abstractLinesRef.current = [];
      for (let i = 0; i < lineCount; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        const angle = Math.random() * Math.PI * 2;
        const length = Math.random() * 200 + 100;

        abstractLinesRef.current.push({
          x1: startX,
          y1: startY,
          x2: startX + Math.cos(angle) * length,
          y2: startY + Math.sin(angle) * length,
          opacity: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 0.5 + 0.2,
          angle: angle,
        });
      }
    };

    const initializePoints = () => {
      const sections = 5;
      const pointsPerSection = 12; // Fewer points for better triangulation

      pointsRef.current = [];

      for (let section = 0; section < sections; section++) {
        const sectionHeight = canvas.height / sections;
        const sectionY = section * sectionHeight;

        // Create points for this section
        for (let i = 0; i < pointsPerSection; i++) {
          pointsRef.current.push({
            x: Math.random() * canvas.width,
            y: sectionY + Math.random() * sectionHeight,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            section,
          });
        }
      }

      // Create initial triangulation
      trianglesRef.current = delaunayTriangulation(pointsRef.current);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains('dark');
      const time = Date.now() * 0.001;

      // Update point positions
      pointsRef.current.forEach((point) => {
        const sectionHeight = canvas.height / 5;
        const sectionY = point.section * sectionHeight;
        const sectionBottom = sectionY + sectionHeight;

        // Update position
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off section boundaries
        if (point.x <= 0 || point.x >= canvas.width) point.vx *= -1;
        if (point.y <= sectionY || point.y >= sectionBottom) point.vy *= -1;

        // Keep points in bounds
        point.x = Math.max(0, Math.min(canvas.width, point.x));
        point.y = Math.max(sectionY, Math.min(sectionBottom, point.y));
      });

      // Recalculate triangulation every few frames for smooth movement
      if (Math.floor(time * 2) % 3 === 0) {
        trianglesRef.current = delaunayTriangulation(pointsRef.current);
      }

      // Draw triangles
      trianglesRef.current.forEach((triangle, index) => {
        // Animate triangle opacity
        triangle.opacity = Math.sin(time * 0.5 + index * 0.1) * 0.05 + 0.08;

        // Emerald color with variation
        const hue = 160 + (Math.sin(time * 0.3 + index) * 10); // Slight hue variation
        const saturation = isDark ? 60 : 40;
        const lightness = isDark ? 50 : 30;
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        // Draw triangle
        ctx.beginPath();
        ctx.moveTo(triangle.p1.x, triangle.p1.y);
        ctx.lineTo(triangle.p2.x, triangle.p2.y);
        ctx.lineTo(triangle.p3.x, triangle.p3.y);
        ctx.closePath();

        // Fill with emerald color
        ctx.fillStyle = color;
        ctx.globalAlpha = triangle.opacity;
        ctx.fill();

        // Optional: stroke for better visibility
        ctx.strokeStyle = color;
        ctx.globalAlpha = triangle.opacity * 0.5;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.globalAlpha = 1;
      });

      // Draw points as small emerald dots
      pointsRef.current.forEach((point, index) => {
        const hue = 160;
        const saturation = isDark ? 70 : 50;
        const lightness = isDark ? 60 : 40;
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.sin(time + index * 0.1) * 0.3 + 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Update and draw particles network
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Animate opacity
        particle.opacity = Math.sin(time * 0.8 + i * 0.1) * 0.3 + 0.4;

        // Draw particle
        const hue = 160;
        const saturation = isDark ? 60 : 45;
        const lightness = isDark ? 55 : 35;
        const color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${particle.opacity})`;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Draw lines to nearby particles
        particlesRef.current.forEach((otherParticle, j) => {
          if (i < j) { // Only draw each line once
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              const lineOpacity = (1 - distance / 120) * 0.2;
              const lineColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${lineOpacity})`;

              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        });
      });

      // Draw distant stars
      starsRef.current.forEach((star, index) => {
        // Twinkle effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const currentOpacity = star.opacity * (0.7 + twinkle * 0.3);

        // Create star glow effect
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(135, 206, 250, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(135, 206, 250, 0)`);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        // Star cross effect for brighter stars
        if (star.radius > 1) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.6})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 2, star.y);
          ctx.lineTo(star.x + star.radius * 2, star.y);
          ctx.moveTo(star.x, star.y - star.radius * 2);
          ctx.lineTo(star.x, star.y + star.radius * 2);
          ctx.stroke();
        }
      });

      // Draw abstract cosmic lines
      abstractLinesRef.current.forEach((line, index) => {
        // Update line position for movement
        line.x1 += Math.cos(line.angle) * line.speed;
        line.y1 += Math.sin(line.angle) * line.speed;
        line.x2 += Math.cos(line.angle) * line.speed;
        line.y2 += Math.sin(line.angle) * line.speed;

        // Wrap around screen
        if (line.x1 > canvas.width + 100) {
          line.x1 = -100;
          line.x2 = line.x1 + Math.cos(line.angle) * (Math.random() * 200 + 100);
        }
        if (line.x1 < -100) {
          line.x1 = canvas.width + 100;
          line.x2 = line.x1 + Math.cos(line.angle) * (Math.random() * 200 + 100);
        }
        if (line.y1 > canvas.height + 100) {
          line.y1 = -100;
          line.y2 = line.y1 + Math.sin(line.angle) * (Math.random() * 200 + 100);
        }
        if (line.y1 < -100) {
          line.y1 = canvas.height + 100;
          line.y2 = line.y1 + Math.sin(line.angle) * (Math.random() * 200 + 100);
        }

        // Animate opacity
        const baseOpacity = Math.sin(time * 0.3 + index * 0.5) * 0.1 + line.opacity;

        // Create gradient line effect
        const gradient = ctx.createLinearGradient(line.x1, line.y1, line.x2, line.y2);
        const hue = isDark ? 160 : 150;
        gradient.addColorStop(0, `hsla(${hue}, 60%, 60%, 0)`);
        gradient.addColorStop(0.5, `hsla(${hue}, 70%, 50%, ${baseOpacity})`);
        gradient.addColorStop(1, `hsla(${hue}, 60%, 60%, 0)`);

        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Add glow effect
        ctx.shadowColor = isDark ? '#10b981' : '#059669';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    animate();

    // Handle resize and scroll
    const handleResize = () => {
      resizeCanvas();
    };

    const handleScroll = () => {
      const newHeight = document.documentElement.scrollHeight;
      if (Math.abs(canvas.height - newHeight) > 100) {
        resizeCanvas();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        opacity: 0.4,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    />
  );
}
