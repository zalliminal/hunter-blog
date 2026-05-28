"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function MatrixWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01";
    const fontSize = 16;
    const charSpacing = 20;

    // Horizontal wave bands
    const waveBands = [
      { y: 0.2, amplitude: 60, frequency: 0.015, speed: 0.02, thickness: 8, hue: 160 },
      { y: 0.4, amplitude: 80, frequency: 0.012, speed: -0.025, thickness: 10, hue: 170 },
      { y: 0.5, amplitude: 50, frequency: 0.018, speed: 0.03, thickness: 6, hue: 180 },
      { y: 0.65, amplitude: 70, frequency: 0.01, speed: -0.02, thickness: 9, hue: 165 },
      { y: 0.8, amplitude: 90, frequency: 0.013, speed: 0.028, thickness: 7, hue: 175 },
    ];

    let time = 0;

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waveBands.forEach((band) => {
        const baseY = canvas.height * band.y;
        
        // Draw characters along the wave
        for (let x = -charSpacing; x < canvas.width + charSpacing; x += charSpacing) {
          // Calculate wave position
          const waveY = Math.sin(x * band.frequency + time * band.speed) * band.amplitude;
          
          // Draw multiple rows for thickness
          for (let row = 0; row < band.thickness; row++) {
            const y = baseY + waveY + row * fontSize;
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            
            // Opacity varies by row for depth
            const opacity = 0.8 - (row / band.thickness) * 0.5;
            
            // Main character
            ctx.fillStyle = `hsla(${band.hue}, 100%, 50%, ${opacity})`;
            ctx.font = `${fontSize}px monospace`;
            ctx.fillText(char, x, y);
            
            // Glow effect
            if (Math.random() > 0.9) {
              ctx.shadowBlur = 15;
              ctx.shadowColor = `hsla(${band.hue}, 100%, 70%, 0.8)`;
              ctx.fillText(char, x, y);
              ctx.shadowBlur = 0;
            }
          }
        }
      });

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-black" />
      
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(0,255,200,0.05) 0%, transparent 60%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Glass overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Glass texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Glass shine */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
        }}
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
    </div>
  );
}
