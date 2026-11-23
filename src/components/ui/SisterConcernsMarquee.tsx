"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { companyData } from "@/data/companyData";
import {
  Zap,
  SunMedium,
  Droplets,
  Cpu,
  HeartHandshake,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

const concernIcons: Record<string, React.ReactNode> = {
  "infant-zone": <HeartHandshake className="w-4 h-4 text-rose-500" />,
  "generex-power": <Zap className="w-4 h-4 text-[#F37021]" />,
  "glory-energy-engineering": <Droplets className="w-4 h-4 text-sky-500" />,
  "radial-power-engineering": <Cpu className="w-4 h-4 text-amber-500" />,
  "radial-renewable-technology": <SunMedium className="w-4 h-4 text-emerald-500" />,
};

export default function SisterConcernsMarquee() {
  const { config } = useSiteConfig();
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualInteracting, setIsManualInteracting] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if admin has enabled or disabled the marquee (default: true)
  const isEnabled =
    (config as any)?.hero?.showSisterConcernsMarquee !== false &&
    (config as any)?.branding?.showSisterConcernsMarquee !== false;

  const sisterConcerns =
    config?.sisterConcerns && config.sisterConcerns.length > 0
      ? config.sisterConcerns
      : companyData.sisterConcerns;

  const tickerBadge =
    (config as any)?.hero?.marqueeBadgeText || "OUR SISTER CONCERNS & STRATEGIC SUBSIDIARIES";

  // Duplicate items 4 times for smooth continuous auto-scrolling
  const carouselItems = [
    ...sisterConcerns,
    ...sisterConcerns,
    ...sisterConcerns,
    ...sisterConcerns,
  ];

  // Smooth continuous auto-scroll logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isEnabled || carouselItems.length < 2) return;

    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
    }

    if (!isAutoScrollEnabled || isHovered || isManualInteracting) {
      return;
    }

    const scrollSpeed = 1; // 1px smooth continuous glide
    const intervalMs = 28; // ~35fps

    autoScrollTimerRef.current = setInterval(() => {
      if (container) {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollSpeed;
        }
      }
    }, intervalMs);

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isAutoScrollEnabled, isHovered, isManualInteracting, isEnabled, carouselItems.length]);

  // Manual carousel navigation (Left to Right / Right to Left)
  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsManualInteracting(true);
    if (manualTimeoutRef.current) {
      clearTimeout(manualTimeoutRef.current);
    }

    // Scroll by roughly 1 card width + gap
    const scrollStep = 360;

    if (direction === "left") {
      if (container.scrollLeft <= 15) {
        // Wrap to near end if at beginning
        container.scrollTo({
          left: container.scrollWidth / 2,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({ left: -scrollStep, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 20) {
        // Wrap to start if at end
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollStep, behavior: "smooth" });
      }
    }

    // Resume auto-scroll after 3.5 seconds
    manualTimeoutRef.current = setTimeout(() => {
      setIsManualInteracting(false);
    }, 3500);
  }, []);

  if (!isEnabled) return null;

  return (
    <div className="relative w-full bg-slate-50/90 border-y border-slate-200/90 py-4 sm:py-6 overflow-hidden shadow-xs z-20">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100/70 via-white to-slate-100/70 pointer-events-none" />

      {/* Header Badge Row with Carousel Navigation Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F37021] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F37021] shadow-[0_0_8px_#F37021]" />
          </span>
          <span className="text-[10px] xs:text-[11px] sm:text-xs font-black uppercase tracking-[0.16em] sm:tracking-[0.25em] text-[#0F2557] truncate">
            {tickerBadge}
          </span>
        </div>

        {/* Carousel Action Bar: Left/Right Controls + Pause/Auto Toggle + View All Link */}
        <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto">
          {/* Manual Carousel Left / Right Buttons */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-[#0F2557] text-slate-700 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-2xs"
              aria-label="Slide Left (Previous Concern)"
              title="Slide Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsAutoScrollEnabled(!isAutoScrollEnabled);
                setIsManualInteracting(false);
              }}
              className="px-2 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-[11px] font-bold text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
              title={isAutoScrollEnabled ? "Pause Auto-Slide" : "Resume Auto-Slide"}
              aria-label={isAutoScrollEnabled ? "Pause Auto-Slide" : "Resume Auto-Slide"}
            >
              {isAutoScrollEnabled ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <Pause className="w-3 h-3 text-slate-500" />
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#F37021] fill-[#F37021]" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-[#0F2557] text-slate-700 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-2xs"
              aria-label="Slide Right (Next Concern)"
              title="Slide Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <a
            href="#sister-concerns"
            className="text-xs sm:text-sm font-bold text-[#F37021] hover:text-[#DE5F12] inline-flex items-center gap-1 transition-colors group cursor-pointer"
          >
            <span>Explore All</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Carousel Track Container with Left & Right Gradient Shadows and Floating Arrows */}
      <div
        className="relative w-full group/carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating Side Left Arrow Button */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-[#0F2557] text-slate-800 hover:text-white shadow-xl border border-slate-200/90 backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer opacity-90 sm:opacity-0 group-hover/carousel:opacity-100 hover:scale-105"
          aria-label="Slide Left"
          title="Slide Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Floating Side Right Arrow Button */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-[#0F2557] text-slate-800 hover:text-white shadow-xl border border-slate-200/90 backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer opacity-90 sm:opacity-0 group-hover/carousel:opacity-100 hover:scale-105"
          aria-label="Slide Right"
          title="Slide Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Left Gradient Shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
        {/* Right Gradient Shadow */}
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />

        {/* Interactive Scrollable Carousel Track */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto py-2 sm:py-3 px-4 sm:px-6 scroll-smooth select-none cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {carouselItems.map((concern, idx) => {
            const icon = concernIcons[concern.slug] || (
              <Zap className="w-4 h-4 text-[#F37021]" />
            );
            const logoSrc = concern.logo || "/img/bhuiyan-group-logo-horizontal.png";

            return (
              <a
                key={`${concern.id || concern.slug}-${idx}`}
                href={`/sister-concerns/${concern.slug}`}
                className="group/card flex items-center gap-3.5 sm:gap-5 px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-white border-2 border-slate-200/90 hover:border-[#F37021]/70 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 active:scale-98 shrink-0 cursor-pointer min-w-[270px] xs:min-w-[290px] sm:min-w-[360px]"
                title={`Explore ${concern.name}`}
              >
                {/* Big, Clear, Prominent Logo Box */}
                <div className="w-24 h-20 sm:w-32 sm:h-24 rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-2.5 relative shrink-0 shadow-xs group-hover/card:scale-105 group-hover/card:border-orange-200 transition-all duration-300">
                  <Image
                    src={logoSrc}
                    alt={concern.name}
                    width={140}
                    height={90}
                    className="max-h-full max-w-full object-contain filter group-hover/card:brightness-105 transition-all"
                    unoptimized
                  />
                </div>

                {/* Information */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-2">
                    {icon}
                    <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover/card:text-[#0F2557] truncate tracking-tight transition-colors">
                      {concern.shortName || concern.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-1 font-semibold mt-1 group-hover/card:text-[#F37021] transition-colors">
                    {concern.sector || concern.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 mt-2 group-hover/card:text-[#0F2557] transition-colors">
                    <span>View Division</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
