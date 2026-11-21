"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  SunMedium,
  Droplets,
  Cpu,
  HeartHandshake,
  ArrowRight,
  Activity,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { companyData, SisterConcern } from "@/data/companyData";
import { useSiteConfig } from "@/context/SiteConfigContext";
import AnimatedCounter from "./AnimatedCounter";

const previewIcons: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-5 h-5 text-[#F37021]" />,
  SunMedium: <SunMedium className="w-5 h-5 text-[#F37021]" />,
  Droplets: <Droplets className="w-5 h-5 text-[#F37021]" />,
  Cpu: <Cpu className="w-5 h-5 text-[#F37021]" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-[#F37021]" />,
};

export default function HeroInteractivePreview() {
  const { config } = useSiteConfig();
  const sisterConcerns = config?.sisterConcerns || companyData.sisterConcerns;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto rotate preview tabs every 4.5 seconds if user is not manually hovering/interacting
  useEffect(() => {
    if (!isAutoPlaying || sisterConcerns.length === 0) return;
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % sisterConcerns.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, sisterConcerns.length]);

  const currentConcern: SisterConcern = sisterConcerns[selectedIndex] || sisterConcerns[0];

  return (
    <div
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F37021]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header status bar */}
      <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Subsidiary Engineering Console</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-orange-200 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
          <span>Active Division {selectedIndex + 1}/5</span>
        </div>
      </div>

      {/* Navigation 5-Grid Tabs - All 5 Guaranteed 100% Visible */}
      <div className="grid grid-cols-5 gap-1 sm:gap-1.5 mb-6">
        {sisterConcerns.map((concern, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={concern.id}
              onClick={() => setSelectedIndex(idx)}
              title={concern.name}
              className={`w-full py-2 px-1 rounded-xl text-[10px] sm:text-[11px] lg:text-xs font-bold transition-all text-center flex items-center justify-center cursor-pointer ${
                isSelected
                  ? "bg-[#F37021] text-white shadow-lg shadow-[#F37021]/30 border border-orange-300 scale-[1.02]"
                  : "bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10"
              }`}
            >
              <span className="truncate">{concern.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentConcern.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-white/20 flex items-center justify-center shrink-0 shadow-lg p-2 overflow-hidden">
              {currentConcern.logo ? (
                <div className="relative w-full h-full">
                  <Image
                    src={currentConcern.logo}
                    alt={currentConcern.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                previewIcons[currentConcern.iconName] || (
                  <Zap className="w-6 h-6 text-[#F37021]" />
                )
              )}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-300">
                {currentConcern.sector}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {currentConcern.name}
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                {currentConcern.tagline}
              </p>
            </div>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-3 gap-2.5 bg-black/25 rounded-2xl p-4 border border-white/10">
            {currentConcern.stats.map((st, i) => (
              <div key={i} className="text-center">
                <div className="text-base sm:text-lg font-black text-[#F37021]">
                  {st.value}
                </div>
                <div className="text-[10px] font-medium text-slate-300 truncate mt-0.5">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* Capabilities Preview */}
          <div className="space-y-2 bg-white/5 rounded-xl p-3.5 border border-white/10 text-xs text-slate-200">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Key Focus:</span>
              <span className="text-orange-200 truncate">
                {currentConcern.keySpecialties[0]}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-2">
              {currentConcern.description}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">
              Dhaka Engineering Unit
            </span>

            <Link
              href={`/sister-concerns/${currentConcern.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#0F2557] font-bold text-xs hover:bg-[#F37021] hover:text-white transition-all shadow-md group"
            >
              <span>Explore Subsidiary Specs</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
