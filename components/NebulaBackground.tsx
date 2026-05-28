"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function NebulaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Generate stars with varying sizes and brightness
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }> = [];

    // Create star field
    for (let i = 0; i < 800; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.002 + 0.001,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Animation loop for twinkling stars
    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();

        // Add glow to brighter stars
        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 220, 255, ${star.opacity * 0.1 * twinkle})`;
          ctx.fill();
        }
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#000000] -z-10">
      {/* Deep space base gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0a0a1a] via-[#050510] to-[#000000]" />

      {/* Star field canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-90" />

      {/* Distant galaxy core - warm center */}
      <motion.div
        className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(255,200,150,0.15) 0%, rgba(180,120,200,0.08) 30%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.35, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple nebula cloud - upper left */}
      <motion.div
        className="absolute top-[-5%] left-[-5%] w-[45vw] h-[45vh] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(120,80,200,0.25) 0%, rgba(80,50,150,0.15) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: ["0%", "8%", "-5%", "0%"],
          y: ["0%", "-10%", "5%", "0%"],
          scale: [1, 1.15, 0.95, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blue nebula cloud - right side */}
      <motion.div
        className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vh] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(50,100,200,0.2) 0%, rgba(30,70,150,0.12) 45%, transparent 75%)",
          filter: "blur(90px)",
        }}
        animate={{
          x: ["0%", "-12%", "8%", "0%"],
          y: ["0%", "15%", "-8%", "0%"],
          scale: [1, 1.1, 0.9, 1],
          rotate: [0, -8, 8, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Magenta/Pink nebula - bottom */}
      <motion.div
        className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vh] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(200,80,150,0.18) 0%, rgba(150,50,120,0.1) 50%, transparent 75%)",
          filter: "blur(85px)",
        }}
        animate={{
          x: ["0%", "15%", "-10%", "0%"],
          y: ["0%", "-8%", "12%", "0%"],
          scale: [1, 1.2, 0.85, 1],
          rotate: [0, 10, -5, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan accent nebula - center right */}
      <motion.div
        className="absolute top-[50%] right-[15%] w-[30vw] h-[35vh] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(80,180,220,0.15) 0%, rgba(50,120,180,0.08) 50%, transparent 75%)",
          filter: "blur(75px)",
        }}
        animate={{
          x: ["0%", "-10%", "15%", "0%"],
          y: ["0%", "12%", "-10%", "0%"],
          scale: [1, 1.25, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Amber dust cloud - adds warmth like real nebulae */}
      <motion.div
        className="absolute bottom-[20%] right-[30%] w-[35vw] h-[30vh] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(220,150,80,0.12) 0%, rgba(180,100,60,0.06) 50%, transparent 75%)",
          filter: "blur(70px)",
        }}
        animate={{
          x: ["0%", "10%", "-15%", "0%"],
          y: ["0%", "-15%", "10%", "0%"],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle violet haze - depth layer */}
      <motion.div
        className="absolute top-[60%] left-[10%] w-[38vw] h-[38vh] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(140,100,200,0.1) 0%, rgba(100,70,150,0.05) 60%, transparent 80%)",
          filter: "blur(95px)",
        }}
        animate={{
          x: ["0%", "-8%", "12%", "0%"],
          y: ["0%", "10%", "-12%", "0%"],
          scale: [1, 1.1, 0.92, 1],
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Film grain / noise texture for realism */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
    </div>
  );
}
