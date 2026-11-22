"use client";

import React from "react";
import Image from "next/image";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { companyData } from "@/data/companyData";
import { Zap, SunMedium, Droplets, Cpu, HeartHandshake, ArrowUpRight } from "lucide-react";

const concernIcons: Record<string, React.ReactNode> = {
  "infant-zone": <HeartHandshake className="w-4 h-4 text-rose-500" />,
  "generex-power": <Zap className="w-4 h-4 text-[#F37021]" />,
  "glory-energy-engineering": <Droplets className="w-4 h-4 text-sky-500" />,
  "radial-power-engineering": <Cpu className="w-4 h-4 text-amber-500" />,
  "radial-renewable-technology": <SunMedium className="w-4 h-4 text-emerald-500" />,
};

export default function SisterConcernsMarquee() {
  const { config } = useSiteConfig();

  // Check if admin has enabled or disabled the marquee (default: true)
  const isEnabled = (config as any)?.hero?.showSisterConcernsMarquee !== false &&
    (config as any)?.branding?.showSisterConcernsMarquee !== false;

  if (!isEnabled) return null;

  const sisterConcerns = config?.sisterConcerns && config.sisterConcerns.length > 0
    ? config.sisterConcerns
    : companyData.sisterConcerns;

  const tickerBadge = (config as any)?.hero?.marqueeBadgeText || "OUR SISTER CONCERNS & STRATEGIC SUBSIDIARIES";

  // Duplicate items 4 times for smooth continuous auto-scrolling
  const marqueeItems = [...sisterConcerns, ...sisterConcerns, ...sisterConcerns, ...sisterConcerns];

  return (
    <div className="relative w-full bg-slate-50/80 border-y border-slate-200/90 py-5 sm:py-7 overflow-hidden shadow-xs z-20">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100/70 via-white to-slate-100/70 pointer-events-none" />

      {/* Header Badge Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F37021] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F37021] shadow-[0_0_8px_#F37021]" />
          </span>
          <span className="text-[10px] xs:text-[11px] sm:text-xs font-black uppercase tracking-[0.16em] sm:tracking-[0.25em] text-[#0F2557] truncate">
            {tickerBadge}
          </span>
        </div>
        <a
          href="#sister-concerns"
          className="text-xs sm:text-sm font-bold text-[#F37021] hover:text-[#DE5F12] inline-flex items-center gap-1.5 transition-colors group cursor-pointer self-start sm:self-auto"
        >
          <span>Explore All 5 Subsidiaries</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Marquee Track with Left & Right Gradient Shadows */}
      <div className="relative w-full overflow-hidden group">
        {/* Left Gradient Shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-36 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent z-10 pointer-events-none" />
        {/* Right Gradient Shadow */}
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-36 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent z-10 pointer-events-none" />

        {/* Infinite Scrolling Track */}
        <div className="flex items-center gap-4 sm:gap-7 animate-marquee w-max py-3 select-none">
          {marqueeItems.map((concern, idx) => {
            const icon = concernIcons[concern.slug] || <Zap className="w-4 h-4 text-[#F37021]" />;
            const logoSrc = concern.logo || "/img/bhuiyan-group-logo-horizontal.png";

            return (
              <a
                key={`${concern.id || concern.slug}-${idx}`}
                href="#sister-concerns"
                className="group/card flex items-center gap-3.5 sm:gap-5 px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-white border-2 border-slate-200/90 hover:border-[#F37021]/70 shadow-xs hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 active:scale-98 shrink-0 cursor-pointer min-w-[270px] xs:min-w-[290px] sm:min-w-[360px]"
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
