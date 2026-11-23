"use client";

import React, { useState } from "react";
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
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  ExternalLink,
  Layers,
  ChevronDown,
} from "lucide-react";
import { companyData, SisterConcern } from "@/data/companyData";
import { useSiteConfig } from "@/context/SiteConfigContext";
import AnimatedCounter from "./AnimatedCounter";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-5 h-5 text-[#F37021]" />,
  SunMedium: <SunMedium className="w-5 h-5 text-[#F37021]" />,
  Droplets: <Droplets className="w-5 h-5 text-[#F37021]" />,
  Cpu: <Cpu className="w-5 h-5 text-[#F37021]" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-[#F37021]" />,
};

export default function InteractiveConcernShowcase() {
  const { config } = useSiteConfig();
  const [activeTab, setActiveTab] = useState("all");

  const sisterConcerns = config?.sisterConcerns && config.sisterConcerns.length > 0
    ? config.sisterConcerns
    : companyData.sisterConcerns;

  // Fully dynamic filter tabs generated directly from active Sister Concerns
  const filterTabs = [
    { id: "all", label: `All Subsidiaries (${sisterConcerns.length})` },
    ...sisterConcerns.map((c) => ({
      id: c.slug || c.id,
      label: c.shortName || c.name,
    })),
  ];

  const filteredConcerns = sisterConcerns.filter((c) => {
    if (activeTab === "all") return true;
    return (c.slug || c.id) === activeTab;
  });

  return (
    <div className="space-y-10 relative">
      {/* Bitopi-Inspired Floating Pill Navigation Filter */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none z-30 relative w-full max-w-full px-1">
        <div className="flex items-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-full shadow-lg shadow-slate-200/50 max-w-full overflow-x-auto">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-white shadow-md shadow-[#0F2557]/30"
                    : "text-slate-600 hover:text-[#0F2557] hover:bg-slate-100/70"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterTabPill"
                    className="absolute inset-0 bg-gradient-to-r from-[#0F2557] to-[#0A1B40] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subsidiaries Showcase Cards List - Book Stacking Deck */}
      <div className="relative pb-4 sm:pb-6">
        {filteredConcerns.map((concern: SisterConcern, index: number) => {
          const isEven = index % 2 === 0;
          const isLast = index === filteredConcerns.length - 1;
          const serialNumber = `0${index + 1}`;

          return (
            <div
              key={concern.id || concern.slug}
              className={`sticky transition-all duration-300 ${
                !isLast ? "mb-14 sm:mb-20 md:mb-28" : "mb-0"
              }`}
              style={{
                top: `${Math.min(76 + index * 18, 148)}px`,
                zIndex: index + 10,
              }}
            >
              <div
                className="group relative bg-white rounded-2xl sm:rounded-[28px] border-2 border-slate-200/90 shadow-[0_12px_45px_rgba(15,37,87,0.12)] hover:shadow-[0_20px_55px_rgba(243,112,33,0.18)] transition-all duration-500 overflow-hidden"
              >
                {/* Top Deck Tab Banner (Always visible when stacked like indexed book tabs) */}
                <div className="bg-gradient-to-r from-[#0F2557] via-[#112D6A] to-[#0A1B40] text-white px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="font-mono text-[11px] sm:text-xs font-black bg-[#F37021] text-white px-2 sm:px-2.5 py-0.5 rounded-full shadow-2xs shrink-0">
                      {serialNumber} / {filteredConcerns.length < 10 ? `0${filteredConcerns.length}` : filteredConcerns.length}
                    </span>
                    <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-100 flex items-center gap-2 truncate">
                      <span className="truncate">{concern.name}</span>
                      <span className="text-white/30 hidden sm:inline">•</span>
                      <span className="text-xs text-orange-300 font-normal hidden sm:inline truncate">
                        {concern.sector}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-300 shrink-0">
                    <span className="hidden md:flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-[11px]">
                      <Calendar className="w-3 h-3 text-[#F37021]" />
                      <span>Founded {concern.foundedYear}</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-semibold text-emerald-300 hidden sm:inline">
                      Active Subsidiary
                    </span>
                  </div>
                </div>

                {/* Main Card Body (Alternating Left/Right Layout) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 p-3.5 sm:p-5 lg:p-6 items-center bg-white relative">
                  {/* Glowing Accent Radial Orbs inside the card */}
                  <div
                    className={`absolute -bottom-24 ${
                      isEven ? "-right-24" : "-left-24"
                    } w-72 h-72 rounded-full bg-[#F37021]/6 blur-3xl pointer-events-none group-hover:bg-[#F37021]/12 transition-colors duration-500`}
                  />
                  <div
                    className={`absolute -top-24 ${
                      isEven ? "-left-24" : "-right-24"
                    } w-72 h-72 rounded-full bg-[#0F2557]/5 blur-3xl pointer-events-none group-hover:bg-[#0F2557]/10 transition-colors duration-500`}
                  />

                  {/* VISUAL / LOGO COLUMN (Alternating: Even = Left (lg:order-1), Odd = Right (lg:order-2)) */}
                  <div
                    className={`lg:col-span-5 relative z-10 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 via-slate-100/70 to-orange-50/50 p-3 sm:p-4 lg:p-5 border border-slate-200/80 shadow-inner flex flex-col items-center justify-between min-h-[200px] sm:min-h-[250px] lg:min-h-[280px] group-hover:border-[#0F2557]/30 transition-all duration-500">
                      {/* Background Watermark Number */}
                      <span className="absolute -top-3 -right-2 text-6xl sm:text-7xl font-black text-slate-200/50 select-none pointer-events-none font-mono">
                        {serialNumber}
                      </span>

                      {/* Top Indicator */}
                      <div className="w-full flex items-center justify-between z-10 mb-2 sm:mb-3">
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0F2557] bg-white px-2.5 sm:px-3 py-1 rounded-full border border-slate-200 shadow-2xs flex items-center gap-1.5">
                          {iconMap[concern.iconName] || <Zap className="w-3.5 h-3.5 text-[#F37021]" />}
                          <span>Division {serialNumber}</span>
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 bg-white/80 px-2 sm:px-2.5 py-0.5 rounded-full border border-slate-200">
                          Est. {concern.foundedYear}
                        </span>
                      </div>

                      {/* Prominent Large Subsidiary Logo Showcase with Smooth Interactive Bouncing Motion */}
                      <div className="relative z-10 w-full h-36 sm:h-44 md:h-48 lg:h-52 bg-white rounded-2xl p-2.5 sm:p-3 shadow-sm border border-slate-200/90 flex items-center justify-center group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                        {/* Ambient Glow Aura */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,112,33,0.09)_0%,rgba(15,37,87,0.03)_60%,transparent_100%)] rounded-2xl pointer-events-none" />

                            {concern.logo ? (
                              <motion.div
                                animate={{
                                  y: [0, -10, 0],
                                  scale: [1, 1.025, 1],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className="relative w-full h-full flex items-center justify-center p-2"
                              >
                                <Image
                                  src={concern.logo}
                                  alt={concern.name}
                                  fill
                                  className="object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)] group-hover:drop-shadow-[0_18px_32px_rgba(243,112,33,0.3)] transition-all duration-300"
                                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 480px"
                                  unoptimized
                                />
                              </motion.div>
                            ) : (
                              <div className="flex flex-col items-center gap-2 text-center">
                                {iconMap[concern.iconName]}
                                <span className="font-bold text-base sm:text-lg text-[#0F2557]">
                                  {concern.name}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Metric Pill at Bottom */}
                          {concern.stats && concern.stats[0] && (
                            <div className="mt-3 sm:mt-4 z-10 w-full">
                              <div className="bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-3 border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3 group-hover:border-[#F37021]/30 transition-colors">
                                <div className="text-left">
                                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block">
                                    {concern.stats[0].label}
                                  </span>
                                  <span className="text-sm sm:text-lg font-extrabold text-[#0F2557]">
                                    <AnimatedCounter value={concern.stats[0].value} />
                                  </span>
                                </div>
                                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-orange-50 flex items-center justify-center text-[#F37021] text-xs font-bold shadow-2xs">
                                  ★
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                  {/* DETAILS / NARRATIVE COLUMN (Alternating: Even = Right (lg:order-2), Odd = Left (lg:order-1)) */}
                  <div
                    className={`lg:col-span-7 space-y-2.5 sm:space-y-3 relative z-10 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {/* Sector Badge with Glowing Indicator */}
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#F37021] bg-[#FFF4EC] border border-[#F37021]/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F37021] animate-ping" />
                        {concern.sector}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 font-mono hidden sm:inline">
                        BHUIYAN GROUP SUBSIDIARY
                      </span>
                    </div>

                    {/* Headline & Motto */}
                    <div>
                      <h3 className="text-lg sm:text-2xl font-black text-[#0F2557] tracking-tight">
                        {concern.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#F37021] mt-0.5 italic">
                        &ldquo;{concern.tagline}&rdquo;
                      </p>
                    </div>

                    {/* Detailed Overview */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {concern.longDescription || concern.description}
                    </p>

                    {/* 4 Core Specialties Checklist */}
                    <div className="space-y-1 sm:space-y-1.5 pt-0.5">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#F37021]" />
                        <span>Core Operational Capabilities</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {concern.keySpecialties.slice(0, 4).map((spec, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-1.5 p-1.5 sm:p-2 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-white hover:border-[#0F2557]/20 transition-all text-[11px] text-slate-700 font-medium"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F37021] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Full Visible Bottom Action & Contacts Row */}
                    <div className="pt-2 sm:pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-t border-slate-100">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-600">
                        {concern.contactInfo?.phone && (
                          <a
                            href={`tel:${concern.contactInfo.phone}`}
                            className="flex items-center gap-1.5 bg-slate-100/90 hover:bg-slate-200/90 px-2.5 py-1 rounded-lg font-medium text-[11px] transition-colors"
                          >
                            <Phone className="w-3 h-3 text-[#F37021]" />
                            <span>{concern.contactInfo.phone}</span>
                          </a>
                        )}
                        {concern.contactInfo?.email && (
                          <a
                            href={`mailto:${concern.contactInfo.email}`}
                            className="flex items-center gap-1.5 bg-slate-100/90 hover:bg-slate-200/90 px-2.5 py-1 rounded-lg font-medium text-[11px] transition-colors"
                          >
                            <Mail className="w-3 h-3 text-[#F37021]" />
                            <span>{concern.contactInfo.email}</span>
                          </a>
                        )}
                      </div>

                      <Link
                        href={`/sister-concerns/${concern.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-[#0F2557] hover:bg-[#F37021] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 group/btn w-full sm:w-auto"
                      >
                        <span>Explore Full Profile & Projects</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
  );
}
