"use client";

import React, { useEffect, useRef } from "react";

interface CinematicWildlifeStageProps {
  currentStage: number; // 0 = Sky & Savanna, 1 = Primordial Forest & Steppe, 2 = Deep Ocean & Coral Waters
}

export function CinematicWildlifeStage({ currentStage }: CinematicWildlifeStageProps) {
  const birdsVideoRef = useRef<HTMLVideoElement>(null);
  const tigerVideoRef = useRef<HTMLVideoElement>(null);
  const deerVideoRef = useRef<HTMLVideoElement>(null);
  const butterflyVideoRef = useRef<HTMLVideoElement>(null);
  const whalesVideoRef = useRef<HTMLVideoElement>(null);
  const reefVideoRef = useRef<HTMLVideoElement>(null);
  const turtleVideoRef = useRef<HTMLVideoElement>(null);
  const dolphinsVideoRef = useRef<HTMLVideoElement>(null);

  // Keep off-screen scenes as still posters. This prevents mobile browsers from
  // downloading and decoding every large wildlife clip on the initial page load.
  useEffect(() => {
    const videoRefs = [
      birdsVideoRef,
      tigerVideoRef,
      deerVideoRef,
      butterflyVideoRef,
      whalesVideoRef,
      reefVideoRef,
      turtleVideoRef,
      dolphinsVideoRef,
    ];
    const videos = videoRefs.map((ref) => ref.current).filter((video): video is HTMLVideoElement => Boolean(video));
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    videos.forEach((video) => {
      video.pause();
      video.preload = "none";
      video.removeAttribute("src");
      video.querySelectorAll("source").forEach((source) => source.removeAttribute("src"));
      video.load();
    });

    if (saveData || reducedMotion) return;

    const stageVideos: Record<number, HTMLVideoElement[]> = {
      0: [birdsVideoRef.current].filter((video): video is HTMLVideoElement => Boolean(video)),
      1: [tigerVideoRef.current, deerVideoRef.current, butterflyVideoRef.current]
        .filter((video): video is HTMLVideoElement => Boolean(video)),
      2: [whalesVideoRef.current, reefVideoRef.current, turtleVideoRef.current, dolphinsVideoRef.current]
        .filter((video): video is HTMLVideoElement => Boolean(video)),
    };
    const activeVideos = stageVideos[currentStage] ?? [];

    activeVideos.forEach((video) => {
      video.src = video.dataset.src ?? "";
      video.preload = "metadata";
      video.load();
      video.play().catch(() => {});
    });
  }, [currentStage]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 h-[100dvh] w-full pointer-events-none z-0 overflow-hidden bg-[#02070d]"
    >
      {/* =========================================================================
          STAGE 0: OPENING — AFRICAN SAVANNA ELEPHANTS (4K MASTER)
          High-resolution 4K landscape with soft atmospheric blend on entrance
          ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          currentStage === 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Full-bleed African Elephant 4K landscape anchored to the right */}
        <div
          className="absolute inset-0 bg-cover bg-right filter brightness-[1.02] contrast-[1.06] saturate-[1.04]"
          style={{ backgroundImage: "url('/media/images/african_elephant_4k_richer_herd.webp')" }}
        />

        {/* Atmospheric top blend for entrance vibe & seamless navbar integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#02070d]/70 via-[#02070d]/18 to-transparent pointer-events-none" />

        {/* Directional blend on left protecting typography while keeping elephants on right 100% visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#02070d]/82 via-[#02070d]/28 to-transparent pointer-events-none" />

        {/* Bottom ground atmospheric blend for smooth transition into Wilderness */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02070d]/78 via-[#02070d]/15 to-transparent pointer-events-none" />

        {/* Wild flock against open sky only; neutral sky blends softly into the savanna */}
        <div className="absolute inset-x-0 top-0 h-[62%] overflow-hidden mask-sky-fade opacity-90 mix-blend-soft-light pointer-events-none">
          <video
            ref={birdsVideoRef}
            data-src="/media/videos/birds_flight.webm"
            poster="/media/images/african_elephant_4k_richer_herd.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="h-full w-full object-cover object-[center_50%] saturate-0 brightness-105 contrast-[1.2]"
          />
        </div>
      </div>

      {/* =========================================================================
          STAGE 1: FOREST & ANCIENT STEPPE — TIGER, MAMMOTH & THYLACINE
          Full-bleed primordial rainforest canopy with living tiger & extinct fauna
          ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          currentStage === 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Forest plate remains seamless under the masked wildlife footage. */}
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.58] contrast-[1.05] saturate-[1.08]"
          style={{ backgroundImage: "url('/media/images/lush_rainforest_canopy.jpg')" }}
        />

        {/* Full-screen tiger footage fades in beside the copy instead of sitting over it. */}
        <video
          ref={tigerVideoRef}
          data-src="/media/videos/tiger_forest_1080.mp4"
          poster="/media/images/tiger_forest_1080_poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          style={{
            transform: "translateX(2%) scale(1.04)",
            maskImage: "linear-gradient(to right, transparent 0%, transparent 34%, rgba(0,0,0,0.25) 45%, #000 57%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 34%, rgba(0,0,0,0.25) 45%, #000 57%)",
          }}
          className="absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.68] contrast-[1.08] saturate-[0.9]"
        />

        {/* A real spotted-deer herd fills the open right side; radial masking
            lets the woodland footage dissolve into the full-screen tiger scene. */}
        <div className="absolute top-[31%] right-[-3%] w-[52%] aspect-video overflow-hidden mask-feather-ambient opacity-80 mix-blend-screen pointer-events-none">
          <video
            ref={deerVideoRef}
            data-src="/media/videos/deer_herd_1080.mp4"
            poster="/media/images/deer_herd_1080_poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="h-full w-full object-cover object-center brightness-[0.88] saturate-[0.8] contrast-[1.05]"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#02070d]/70 via-[#02070d]/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02070d]/65 via-transparent to-[#02070d]/20 pointer-events-none" />

        {/* Subtle drifting forest haze gives the open left side gentle movement */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute left-[4%] top-[38%] h-[22%] w-[66%] forest-mist-drift ${
              currentStage === 1 ? "forest-mist-active" : "opacity-0"
            }`}
          />
        </div>

        {/* Butterfly moved into the open canopy so it no longer overlaps the tiger */}
        <div className="absolute top-[12%] right-[6%] sm:right-[9%] w-[170px] sm:w-[230px] aspect-video overflow-hidden mask-feather-ambient opacity-75 mix-blend-screen">
          <video
            ref={butterflyVideoRef}
            data-src="/media/videos/butterfly_flutter.webm"
            poster="/media/images/morpho_butterfly.jpg"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter brightness-105 contrast-120"
          />
        </div>

      </div>

      {/* =========================================================================
          STAGE 2: PELAGIC OCEAN & CORAL REEFS — WHALES, TURTLES & REEF FISH
          Full-bleed underwater wildlife world
          ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          currentStage === 2 ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Full-bleed deep ocean gradient with sunlight caustics */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#031d2e] via-[#020e1c] to-[#01040a]">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#38bdf8]/40 via-[#1ec2a4]/15 to-transparent animate-caustics" />
        </div>

        {/* Full-screen dominant underwater whale swimming video (100% Wild, 0 Humans) */}
        <div className="absolute inset-0 overflow-hidden opacity-90">
          <video
            ref={whalesVideoRef}
            data-src="/media/videos/humpback_whale_1080.mp4"
            poster="/media/images/humpback_whale_1080_poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full -translate-x-[8%] scale-[1.3] object-cover object-center filter brightness-[0.96] contrast-[1.12] saturate-[1.1]"
          />
          {/* Soft vignette to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#02070d]/60 via-transparent to-[#02070d]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#01040a]/70 via-transparent to-[#02070d]/50" />
        </div>

        {/* Aerial sea turtle footage softly feathered into the open water */}
        <div className="absolute top-[14%] right-[3%] sm:right-[7%] w-[340px] sm:w-[460px] aspect-video overflow-hidden mask-feather-ambient opacity-85 mix-blend-screen">
          <video
            ref={turtleVideoRef}
            data-src="/media/videos/loggerhead_turtle.webm"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover saturate-110 brightness-105"
          />
        </div>

        {/* Dolphin pod between the turtle and reef layers; feathered into the blue water */}
        <div className="absolute top-[52%] left-[2%] sm:left-[8%] md:left-[10%] w-[260px] sm:w-[380px] md:w-[440px] aspect-video overflow-hidden mask-feather-ambient opacity-95">
          <video
            ref={dolphinsVideoRef}
            data-src="/media/videos/dolphin_pod_1080.mp4"
            poster="/media/images/dolphin_pod_1080_poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="h-full w-full scale-[1.4] object-cover brightness-100 saturate-100 contrast-[1.25]"
          />
        </div>

        {/* Reef fish softly feathered into the whale footage */}
        <div className="absolute bottom-[4%] right-[-4%] sm:right-[1%] w-[420px] sm:w-[560px] md:w-[700px] aspect-video overflow-hidden mask-feather-ambient opacity-50 mix-blend-screen">
          <video
            ref={reefVideoRef}
            data-src="/media/videos/coral_reef_fish.webm"
            poster="/media/images/coral_reef.jpg"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover brightness-110 saturate-110"
          />
        </div>

      </div>

      {/* Global documentary film grain and subtle vignette overlay */}
      <div className="absolute inset-0 pointer-events-none cinema-vignette opacity-35" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#02070d]/40 via-transparent to-black/15" />
    </div>
  );
}

