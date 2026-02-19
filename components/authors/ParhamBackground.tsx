"use client";

import React, { useEffect, useState } from "react";
import FaultyTerminal from "../animated/FaultyTerminal";

interface ParhamBackgroundProps {
  reduced?: boolean | null;
  primaryColor?: string;
  primaryColorHex?: string;
}

export default function ParhamBackground({ reduced, primaryColor, primaryColorHex }: ParhamBackgroundProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (reduced) return null;

  // FaultyTerminal needs hex colors for tint prop
  const lightModeTint = primaryColorHex || "#FFC857";
  const darkModeTint = primaryColorHex || "#FBBF24";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.35] dark:opacity-[0.30]">
      <FaultyTerminal
        scale={1.8}
        gridMul={[2.5, 1.2]}
        digitSize={1.4}
        timeScale={0.4}
        pause={false}
        scanlineIntensity={0.4}
        glitchAmount={1}
        flickerAmount={0.7}
        noiseAmp={0.8}
        chromaticAberration={0}
        dither={0}
        curvature={0.05}
        tint={isDark ? darkModeTint : lightModeTint}
        mouseReact={true}
        mouseStrength={0.3}
        pageLoadAnimation={true}
        brightness={0.7}
        className="w-full h-full"
      />
    </div>
  );
}