"use client";

import { useEffect, useRef } from "react";

interface ZalBackgroundProps {
  reduced?: boolean | null;
  primaryColor?: string;
}

export default function ZalBackground({
  reduced,
  primaryColor = "#00FF94",
}: ZalBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const fontSize = 14; // Optimized for mobile
    let cols: number;
    let drops: number[];

    // Matrix characters (reduced set for performance)
    const MATRIX_CHARS = "0123456789ABCDEF@#$%&";

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      const isDark = document.documentElement.classList.contains("dark");
      
      // Fade effect (lighter for performance)
      ctx.fillStyle = isDark 
        ? `rgba(0, 6, 3, 0.04)` 
        : `rgba(255, 255, 255, 0.08)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const y = drops[i] * fontSize;

        // Draw character
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = 0.8;
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, i * fontSize, y);
        ctx.globalAlpha = 1;

        // Reset drop randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.3; // Optimized speed
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [reduced, primaryColor]);

  if (reduced) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.20] dark:opacity-[0.15]"
    />
  );
}