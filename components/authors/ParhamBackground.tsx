"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface MinimalParhamBackgroundProps {
  reduced?: boolean | null;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function MinimalParhamBackground({
  reduced,
  primaryColor = "#FFC857",
  secondaryColor = "#06FFA5",
}: MinimalParhamBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse/touch movement for subtle parallax
  useEffect(() => {
    if (reduced) return;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setMousePosition({
        x: (clientX / window.innerWidth - 0.5) * 20,
        y: (clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
    };
  }, [reduced]);

  if (reduced) return null;

  // Motion values for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    mouseX.set(mousePosition.x);
    mouseY.set(mousePosition.y);
  }, [mousePosition, mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden bg-background z-0">
      
      {/* LAYER 1: Blueprint Grid (Pure CSS) */}
      <div 
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${primaryColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${primaryColor} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* LAYER 2: Soft Gradient Orbs (Optimized) */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[40px] opacity-20 dark:opacity-15"
        style={{ 
          backgroundColor: primaryColor,
          x: useTransform(mouseX, v => v * 0.5),
          y: useTransform(mouseY, v => v * 0.5),
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[10%] right-[0%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply filter blur-[40px] opacity-20 dark:opacity-15"
        style={{ 
          backgroundColor: secondaryColor,
          x: useTransform(mouseX, v => v * -0.3),
          y: useTransform(mouseY, v => v * -0.3),
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* LAYER 3: SVG Builder Elements */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25 dark:opacity-35">
        
        {/* Animated Line 1 - Horizontal Scan */}
        <motion.path
          d="M0,150 L500,150"
          stroke={primaryColor}
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0], 
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0,
          }}
          style={{
            x: useTransform(mouseX, v => v * 0.8),
          }}
        />

        {/* Animated Line 2 - Vertical Build */}
        <motion.path
          d="M350,0 L350,450"
          stroke={secondaryColor}
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0], 
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          style={{
            y: useTransform(mouseY, v => v * 0.8),
          }}
        />

        {/* Animated Line 3 - Diagonal Connection */}
        <motion.path
          d="M100,350 L400,100"
          stroke={primaryColor}
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0], 
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Animated Circle - Building Block */}
        <motion.circle
          cx="200"
          cy="250"
          r="30"
          stroke={secondaryColor}
          strokeWidth="1"
          fill="none"
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{ 
            scale: [0, 1, 1, 0], 
            opacity: [0, 0.5, 0.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{
            x: useTransform(mouseX, v => v * 0.4),
            y: useTransform(mouseY, v => v * 0.4),
          }}
        />

        {/* Animated Circle - Secondary */}
        <motion.circle
          cx="450"
          cy="180"
          r="20"
          stroke={primaryColor}
          strokeWidth="1"
          fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1, 0], 
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Dotted Line - Code Pattern */}
        <motion.path
          d="M50,300 L250,300"
          stroke={primaryColor}
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0], 
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Corner Bracket - Code Symbol */}
        <motion.path
          d="M100,100 L100,130 L130,130"
          stroke={secondaryColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0], 
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{
            x: useTransform(mouseX, v => v * 0.6),
            y: useTransform(mouseY, v => v * 0.6),
          }}
        />

        {/* Corner Bracket - Opposite */}
        <motion.path
          d="M400,350 L370,350 L370,380"
          stroke={primaryColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0], 
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        />

        {/* Small Dots - Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            cx={100 + i * 70}
            cy={200 + (i % 2) * 100}
            r="2"
            fill={i % 2 === 0 ? primaryColor : secondaryColor}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0.8, 0], 
              scale: [0, 1, 1, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </svg>

      {/* LAYER 4: Floating Geometric Shapes (DOM-based, limited count) */}
      <motion.div
        className="absolute top-[30%] left-[15%] w-3 h-3 rounded-sm"
        style={{ 
          backgroundColor: primaryColor,
          opacity: 0.3,
          x: useTransform(mouseX, v => v * 0.3),
          y: useTransform(mouseY, v => v * 0.3),
        }}
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-[25%] right-[20%] w-2 h-2 rounded-full"
        style={{ 
          backgroundColor: secondaryColor,
          opacity: 0.4,
          x: useTransform(mouseX, v => v * -0.4),
          y: useTransform(mouseY, v => v * -0.4),
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-[60%] right-[30%] w-4 h-4 rounded-sm"
        style={{ 
          border: `2px solid ${primaryColor}`,
          opacity: 0.2,
          x: useTransform(mouseX, v => v * 0.5),
          y: useTransform(mouseY, v => v * 0.5),
        }}
        animate={{
          rotate: [0, 45, 90, 135, 180],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* LAYER 5: Subtle Grain Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}