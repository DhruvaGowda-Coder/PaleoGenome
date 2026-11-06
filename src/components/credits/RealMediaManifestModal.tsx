"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X, ExternalLink, Filter, FileVideo, FileImage, Download } from "lucide-react";

interface MediaAsset {
  target: string;
  title: string;
  label: string;
  species?: string | null;
  license: string;
  artist: string;
  category: string;
  originalUrl?: string;
}

interface RealMediaManifestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RealMediaManifestModal({ isOpen, onClose }: RealMediaManifestModalProps) {
  const [manifest, setManifest] = useState<MediaAsset[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    fetch("/media/manifest.json")
      .then((res) => res.json())
      .then((data) => setManifest(data))
      .catch((err) => console.error("Failed to load manifest:", err));
  }, []);

  const categories = ["All", "videos", "marine", "mammal", "avian", "extinct", "living_relative", "science"];

  const filteredAssets =
    activeCategory === "All"
      ? manifest
      : manifest.filter((item) => {
          if (activeCategory === "videos") return item.target.includes("/videos/");
          return item.category === activeCategory;
        });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-5xl max-h-[88vh] flex flex-col bg-[#030914] border border-[#1ec2a4]/40 rounded-3xl shadow-2xl overflow-hidden text-white"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-white/10 flex items-start justify-between bg-[#040e1f]/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1ec2a4]/10 border border-[#1ec2a4]/30 text-[#1ec2a4] text-xs font-mono uppercase tracking-[0.2em] mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Academic Media Compliance & Licensing</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Real Wildlife Assets &amp; License Manifest
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                Zero AI-generated wildlife. All videos and high-resolution photographs are authentic,
                downloaded locally in <code className="text-[#38bdf8]">public/media/</code>, and fully credited below.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Bar */}
          <div className="px-6 sm:px-8 py-3.5 border-b border-white/10 bg-black/40 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono text-white/40 mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#1ec2a4]" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-[#1ec2a4] text-black font-semibold shadow-[0_0_12px_rgba(30,194,164,0.4)]"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-xs font-mono text-white/40">
              {filteredAssets.length} of {manifest.length} Local Files
            </span>
          </div>

          {/* Asset List Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-3">
            {filteredAssets.map((asset, index) => {
              const isVideo = asset.target.includes("/videos/");
              return (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-xl bg-black/60 border border-white/10 text-[#1ec2a4] flex-shrink-0 mt-0.5">
                      {isVideo ? <FileVideo className="w-4 h-4 text-[#38bdf8]" /> : <FileImage className="w-4 h-4 text-[#1ec2a4]" />}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-sans font-bold text-sm text-white">{asset.label}</h4>
                        {asset.species && (
                          <span className="text-[11px] italic text-[#38bdf8]/80">({asset.species})</span>
                        )}
                      </div>
                      <p className="text-[11px] text-white/50 mt-0.5 truncate max-w-lg">{asset.title}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-white/60">
                        <span className="text-[#1ec2a4]">Path: {asset.target}</span>
                        <span>•</span>
                        <span>Author: {asset.artist}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 flex-shrink-0">
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/10">
                      {asset.license}
                    </span>
                    {asset.originalUrl && (
                      <a
                        href={asset.originalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-[#38bdf8] hover:underline flex items-center gap-1"
                      >
                        Source Link <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#040e1f]/80 flex items-center justify-between text-xs font-mono text-white/50">
            <span>All media downloaded to local disk for 100% offline university presentation</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Close Manifest
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

