"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/nav/Navbar";
import { CinematicWildlifeStage } from "@/components/stage/CinematicWildlifeStage";
import { HeroCinematic } from "@/components/hero/HeroCinematic";
import { WildernessStory } from "@/components/foreground/WildernessStory";
import { OceanVisionStory } from "@/components/foreground/OceanVisionStory";
import { MinimalFooter } from "@/components/footer/MinimalFooter";

export default function HomePage() {
  const [currentStage, setCurrentStage] = useState(0);

  // Scroll observer to seamlessly transition the background wildlife stage
  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        // Use the real section boundaries. The wilderness copy grows taller on
        // phones, so viewport-count thresholds switched the tiger scene too soon.
        const transitionPoint = window.scrollY + window.innerHeight * 0.35;
        const wilderness = document.getElementById("wilderness");
        const ocean = document.getElementById("abyss");
        const wildernessTop = wilderness ? wilderness.getBoundingClientRect().top + window.scrollY : window.innerHeight;
        const oceanTop = ocean ? ocean.getBoundingClientRect().top + window.scrollY : wildernessTop + window.innerHeight;

        setCurrentStage(transitionPoint >= oceanTop ? 2 : transitionPoint >= wildernessTop ? 1 : 0);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="relative min-h-screen text-[#eef4f8] selection:bg-[#2563eb] selection:text-white bg-transparent isolate">
      {/* PERSISTENT FULL-VIEWPORT CINEMATIC WILDLIFE STAGE (Zero Black Gaps) */}
      <CinematicWildlifeStage currentStage={currentStage} />

      {/* Minimal Navigation */}
      <Navbar />

      {/* Viewport 1: Full-Screen Opening Hero */}
      <HeroCinematic />

      {/* Viewport 2: Living & Vanished Terrestrial Wilderness */}
      <WildernessStory />

      {/* Viewport 3: Pelagic Ocean Depths & Scientific Vision */}
      <OceanVisionStory />

      {/* Transparent Minimal Footer */}
      <MinimalFooter />
    </main>
  );
}
