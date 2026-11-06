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
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate stage based on scroll depth
      if (scrollY < windowHeight * 0.7) {
        setCurrentStage(0); // Stage 0: Sky, soaring birds, savanna elephants, tree frog
      } else if (scrollY < windowHeight * 1.7) {
        setCurrentStage(1); // Stage 1: Primordial rainforest, Bengal tiger in grass, Woolly Mammoth, Thylacine, butterfly
      } else {
        setCurrentStage(2); // Stage 2: Deep ocean, continuous swimming whales, coral reef fish, Dodo, Sea Cow
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
