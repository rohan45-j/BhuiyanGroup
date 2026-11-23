"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Zap,
  SunMedium,
  Droplets,
  Cpu,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Factory,
  Award,
  Phone,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Activity,
  Layers,
  HelpCircle,
  Play,
  Pause,
  ChevronDown,
  FileText,
  Volume2,
  VolumeX,
} from "lucide-react";
import { companyData } from "@/data/companyData";
import { useSiteConfig } from "@/context/SiteConfigContext";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import InteractiveConcernShowcase from "@/components/ui/InteractiveConcernShowcase";
import HeroInteractivePreview from "@/components/ui/HeroInteractivePreview";
import CertificationsBadges from "@/components/ui/CertificationsBadges";
import SisterConcernsMarquee from "@/components/ui/SisterConcernsMarquee";
import HeroImageSlider from "@/components/ui/HeroImageSlider";
import VideoGallerySection from "@/components/ui/VideoGallerySection";
import ImageGallerySection from "@/components/ui/ImageGallerySection";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-6 h-6 text-[#F37021]" />,
  SunMedium: <SunMedium className="w-6 h-6 text-[#F37021]" />,
  Droplets: <Droplets className="w-6 h-6 text-[#F37021]" />,
  Cpu: <Cpu className="w-6 h-6 text-[#F37021]" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-[#F37021]" />,
};

const timelineMilestones = [
  {
    year: "2012",
    title: "Genesis in Industrial Power Generation",
    desc: "Established Generex Power, deploying heavy-duty diesel generators for Bangladesh's burgeoning RMG export factories.",
  },
  {
    year: "2014",
    title: "Hydraulic Fluid & Pump Engineering",
    desc: "Founded Glory Energy Engineering to provide industrial deep-well pumps, centrifugal systems, and NFPA fire hydrant skids.",
  },
  {
    year: "2015",
    title: "High-Voltage Substation Infrastructure",
    desc: "Launched Radial Power & Engineering for 11kV/33kV substation manufacturing, HT/LT switchgears, and power factor plants.",
  },
  {
    year: "2017",
    title: "National Solar Decarbonization Drive",
    desc: "Incorporated Radial Renewable Technology Bangladesh to lead commercial & industrial (C&I) rooftop solar PV net-metering EPC.",
  },
  {
    year: "2019",
    title: "Healthcare & Mother-Child Wellness",
    desc: "Introduced Infant Zone to bring certified medical-grade baby essentials, clinical feeding gear, and infant hygiene nationwide.",
  },
];

export default function HomePage() {
  const { config } = useSiteConfig();
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [homeInquiry, setHomeInquiry] = useState({
    organization: "",
    name: "",
    email: "",
    phone: "",
    sector: "Generex Power (Industrial Generators)",
  });
  const [homeInquiryLoading, setHomeInquiryLoading] = useState(false);
  const [homeInquiryError, setHomeInquiryError] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleHomeInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHomeInquiryLoading(true);
    setHomeInquiryError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: homeInquiry.name,
          organization: homeInquiry.organization,
          email: homeInquiry.email,
          phone: homeInquiry.phone,
          concern: homeInquiry.sector,
          subject: `${homeInquiry.sector} - Corporate Inquiry`,
          message: `Inquiry submitted via homepage portal.\nOrganization: ${homeInquiry.organization}\nContact Person: ${homeInquiry.name}\nEmail: ${homeInquiry.email}\nPhone: ${homeInquiry.phone}\nSector: ${homeInquiry.sector}`,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to submit inquiry");
      }
      setInquirySubmitted(true);
      setHomeInquiry({
        organization: "",
        name: "",
        email: "",
        phone: "",
        sector: "Generex Power (Industrial Generators)",
      });
    } catch (err) {
      console.error(err);
      setHomeInquiryError("Failed to submit inquiry. Please try again or call directly.");
    } finally {
      setHomeInquiryLoading(false);
    }
  };

  useEffect(() => {
    const isSoundOn = (config?.hero as any)?.videoSound === "sound";
    setIsHeroMuted(!isSoundOn);
    if (videoRef.current) {
      videoRef.current.muted = !isSoundOn;
    }
  }, [config?.hero]);

  const toggleHeroSound = () => {
    if (videoRef.current) {
      const nextMuted = !isHeroMuted;
      videoRef.current.muted = nextMuted;
      setIsHeroMuted(nextMuted);
      if (!nextMuted && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    } else {
      setIsHeroMuted(!isHeroMuted);
    }
  };

  const heroData = config?.hero || {
    badgeText: "WELCOME TO BHUIYAN GROUP • POWERING PROGRESS",
    headline: "Powering National Progress, Engineering Sustainable Futures.",
    subtitle:
      "Bhuiyan Group operates at the core of Bangladesh’s industrial evolution. Turnkey heavy power generation, utility-scale rooftop solar PV, industrial fluid mechanics, electrical substations, and certified mother-infant wellness.",
    primaryCtaText: "Explore Sister Concerns",
    primaryCtaLink: "#sister-concerns",
    secondaryCtaText: "Corporate Consultation",
    secondaryCtaLink: "#corporate-contact",
  };
  const statsList = config?.groupStats || companyData.groupStats;
  const heroBanner = (config?.hero as any)?.imageUrl || config?.branding?.heroBanner || "/img/bhuiyan-group-hero-banner.jpg";
  const heroVideo = config?.hero?.videoUrl || "https://login.bitopibd.com/uploads/sewing_factory_in_klaten_1080p_2025_08_05_00_15_26_utc_170318d437.mp4";
  const backgroundType = config?.hero?.backgroundType || "video";
  const coreSectorsSection = (config as any)?.coreSectorsSection || {
    badgeText: "Business Sectors",
    headline: "Our Core Business Sectors",
    description:
      "Comprehensive engineering solutions across power generation, clean energy, and industrial systems.",
    sectors: companyData.coreSectors,
  };
  const milestonesSection = (config as any)?.milestonesSection || {
    badgeText: "Growth & Heritage",
    headline: "Our Journey & Milestones",
    description:
      "Key milestones and achievements across our journey of industrial excellence and engineering innovation.",
    milestones: timelineMilestones,
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const hasBadge = Boolean(heroData.badgeText && heroData.badgeText.trim().length > 0);
  const hasHeadline = Boolean(heroData.headline && heroData.headline.trim().length > 0);
  const hasSubtitle = Boolean(heroData.subtitle && heroData.subtitle.trim().length > 0);
  const hasPrimaryCta = Boolean(heroData.primaryCtaText && heroData.primaryCtaText.trim().length > 0);
  const hasSecondaryCta = Boolean(heroData.secondaryCtaText && heroData.secondaryCtaText.trim().length > 0);
  const hasCta = hasPrimaryCta || hasSecondaryCta;
  const showRibbon = (heroData as any).showRibbon === true;
  const hasAnyTextContent = hasBadge || hasHeadline || hasSubtitle || hasCta || showRibbon;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Bitopi-Style Cinematic Hero Section with High-Definition Looping Video or Panoramic Banner */}
      <section
        className={`relative w-full overflow-hidden bg-[#0A1B40] text-white flex flex-col justify-center items-center text-center ${
          hasAnyTextContent
            ? "min-h-[70vh] sm:min-h-[78vh] lg:min-h-[84vh] pt-8 sm:pt-12 md:pt-14 pb-12 sm:pb-16"
            : "w-full"
        }`}
      >
        {/* Background Video / Image Slider - 100% Crisp Native Resolution & Full Visibility */}
        <div
          className={`relative w-full ${
            hasAnyTextContent
              ? "absolute inset-0 z-0 overflow-hidden"
              : "w-full aspect-[1600/541] min-h-[200px] xs:min-h-[230px] sm:min-h-[320px] md:min-h-[420px] lg:min-h-[520px]"
          }`}
        >
          {backgroundType === "video" && heroVideo ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isHeroMuted}
              playsInline
              preload="auto"
              poster={heroBanner}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.96] contrast-[1.04]"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          ) : (
            <HeroImageSlider
              images={
                (heroData as any)?.images && (heroData as any)?.images.length > 0
                  ? (heroData as any).images
                  : [heroBanner]
              }
              alt={config?.general?.name || "Bhuiyan Group National Infrastructure"}
              autoSlideInterval={(heroData as any)?.autoSlideInterval || 5}
              hasAnyTextContent={hasAnyTextContent}
            />
          )}

          {/* Dynamic Contrast Overlay: 100% Crisp & Clean if opacity is 0 or no dark overlay requested */}
          {backgroundType === "video" ? (
            <>
              <div
                className="absolute inset-0 bg-[#0A1B40] pointer-events-none transition-opacity duration-300"
                style={{ opacity: heroData.videoOverlayOpacity ?? 0.72 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B40] via-black/30 to-black/40 pointer-events-none" />
            </>
          ) : (
            (heroData.videoOverlayOpacity ?? 0) > 0 && (
              <div
                className="absolute inset-0 bg-black/60 pointer-events-none transition-opacity duration-300"
                style={{ opacity: heroData.videoOverlayOpacity }}
              />
            )
          )}
        </div>

        {hasAnyTextContent && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-4 sm:space-y-6 [&_a]:pointer-events-auto [&_button]:pointer-events-auto"
            >
              {/* Top Pill Badge */}
              {hasBadge && (
                <div className="inline-flex items-center gap-2.5 px-4 sm:px-6 py-2 rounded-full border border-white/25 bg-black/40 backdrop-blur-md text-[10px] sm:text-xs md:text-sm font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-white shadow-2xl max-w-full">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F37021] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F37021] shadow-[0_0_10px_#F37021]" />
                  </span>
                  <span className="truncate">{heroData.badgeText}</span>
                </div>
              )}

              {/* Monumental Headline */}
              {hasHeadline && (() => {
                const headline = heroData.headline!.trim();
                const words = headline.split(" ");
                if (words.length > 2) {
                  const lastPart = words.slice(-2).join(" ");
                  const firstPart = words.slice(0, -2).join(" ");
                  return (
                    <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] font-black uppercase tracking-tight text-white leading-[1.08] sm:leading-[1.02] max-w-6xl mx-auto font-sans break-words px-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                      {firstPart} <br className="hidden sm:inline" />
                      <span className="text-transparent [-webkit-text-stroke:1.8px_white] sm:[-webkit-text-stroke:3px_white] block mt-1.5 sm:mt-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]">
                        {lastPart}
                      </span>
                    </h1>
                  );
                }
                return (
                  <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] font-black uppercase tracking-tight text-white leading-[1.08] sm:leading-[1.02] max-w-6xl mx-auto font-sans break-words px-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                    {headline}
                  </h1>
                );
              })()}

              {/* Subtitle */}
              {hasSubtitle && (
                <p className="text-sm sm:text-lg lg:text-xl text-slate-100 font-normal max-w-3xl mx-auto leading-relaxed px-2 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                  {heroData.subtitle}
                </p>
              )}

              {/* Action Buttons */}
              {hasCta && (
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full sm:w-auto px-2">
                  {hasPrimaryCta && (
                    <a
                      href={heroData.primaryCtaLink || "#sister-concerns"}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 sm:py-3.5 rounded-full text-white text-xs sm:text-sm font-bold shadow-[0_10px_25px_rgba(243,112,33,0.45)] hover:shadow-[0_15px_30px_rgba(243,112,33,0.6)] transition-all duration-300 transform active:scale-98 hover:-translate-y-0.5"
                      style={{ backgroundColor: config?.theme?.buttonColor || config?.theme?.accentColor || "#F37021" }}
                    >
                      <span>{heroData.primaryCtaText}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  )}

                  {hasSecondaryCta && (
                    <button
                      type="button"
                      onClick={() => {
                        if (heroData.secondaryCtaLink && !heroData.secondaryCtaLink.startsWith("#")) {
                          window.location.href = heroData.secondaryCtaLink;
                          return;
                        }
                        if (config?.branding?.brochurePdf) {
                          window.open(config.branding.brochurePdf, "_blank");
                        } else {
                          window.dispatchEvent(new CustomEvent("open-brochure-modal"));
                        }
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-slate-200 hover:text-white text-xs font-semibold backdrop-blur-md transition-all duration-300 active:scale-98 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#F37021]" />
                      <span>{heroData.secondaryCtaText}</span>
                    </button>
                  )}
                </div>
              )}

              {/* Quick Hero Capabilities Ribbon */}
              {showRibbon && (
                <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs text-white/90 px-2">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/15">
                    <Zap className="w-3.5 h-3.5 text-[#F37021]" />
                    <span className="font-semibold">{statsList[0]?.value || "350+ MW"} {statsList[0]?.label || "Power Generation"}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/15">
                    <SunMedium className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-semibold">{statsList[1]?.value || "45+ MWp"} {statsList[1]?.label || "Solar PV EPC"}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/15">
                    <Droplets className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-semibold">{statsList[2]?.value || "1,200+"} {statsList[2]?.label || "Hydraulic Pumps"}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/15">
                    <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
                    <span className="font-semibold">{statsList[3]?.value || "400+"} {statsList[3]?.label || "Healthcare Outlets"}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Live Video Control & Audio Pill (Bottom Left) */}
        {backgroundType === "video" && (
          <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2.5">
            {/* 1080p Play/Pause Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white/90 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-medium tracking-wide">1080p HD Video</span>
              <span className="text-white/30">•</span>
              <button
                onClick={toggleVideo}
                className="p-1 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white cursor-pointer"
                title={isVideoPlaying ? "Pause Video" : "Play Video"}
              >
                {isVideoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
            </div>

            {/* Audio Sound ON / Muted Toggle */}
            <button
              onClick={toggleHeroSound}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full backdrop-blur-md text-xs font-bold transition-all shadow-lg border cursor-pointer ${
                !isHeroMuted
                  ? "bg-emerald-600/90 text-white border-emerald-400/50 shadow-emerald-500/20 hover:bg-emerald-600"
                  : "bg-black/60 text-white/90 border-white/20 hover:bg-black/80"
              }`}
              title={isHeroMuted ? "Unmute Sound (Listen to Audio)" : "Mute Sound (Silent)"}
            >
              {!isHeroMuted ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span>Audio ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-orange-400" />
                  <span>Muted</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Animated Mouse Scroll Indicator (Bottom Center) */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center">
          <a
            href="#sister-concerns"
            className="group flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors"
          >
            <span className="text-[9px] uppercase font-bold tracking-[0.24em] text-white/70 group-hover:text-white transition-colors">
              Scroll To Explore
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1 group-hover:border-white transition-colors">
              <div className="w-1 h-2 rounded-full bg-[#F37021] animate-bounce" />
            </div>
          </a>
        </div>
      </section>

      {/* Sister Concerns Auto-Scrolling Marquee & Floating Logos */}
      <SisterConcernsMarquee />

      {/* Bitopi-Inspired Large Hollow Outline Numbers Stats Ribbon */}
      {(config as any)?.showGroupStats !== false && (
        <section className="bg-white py-10 sm:py-16 lg:py-20 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 text-center">
              {statsList.map((stat, idx) => (
                <div key={idx} className="space-y-1.5 group">
                  <div className="text-3xl xs:text-4xl sm:text-5xl lg:text-7xl font-black font-sans text-transparent [-webkit-text-stroke:1.5px_#0F2557] sm:[-webkit-text-stroke:2.5px_#0F2557] group-hover:[-webkit-text-stroke:2.5px_#F37021] transition-all duration-300">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-xs sm:text-base font-bold text-slate-900 tracking-tight">
                    {stat.label}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 max-w-xs mx-auto leading-relaxed hidden sm:block">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. Interactive Sister Concerns Showcase */}
      <section
        id="sister-concerns"
        className="pt-12 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 bg-[#F8FAFC] relative border-b border-slate-200"
      >
        {/* Animated Background Ambience */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#F37021]/5 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute top-2/3 -right-32 w-96 h-96 bg-[#0F2557]/5 rounded-full blur-3xl animate-float-reverse pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6"
          >
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F37021] bg-[#FFF4EC] px-3.5 py-1.5 rounded-full border border-[#F37021]/20 inline-flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#F37021] animate-ping" />
                <span>Our Strategic Portfolio</span>
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0F2557] tracking-tight">
                Specialized Sister Concerns
              </h2>
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                Scroll through our autonomous industrial divisions delivering
                turnkey power plants, utility rooftop solar EPC, hydraulic water infrastructure, 
                high-voltage substations, and certified pediatric healthcare.
              </p>
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#F37021]" />
                <span>{config?.sisterConcerns?.length || 5} Autonomous Subsidiaries</span>
              </span>
            </div>
          </motion.div>

          {/* Interactive Alternating Scroll-Reveal Component */}
          <InteractiveConcernShowcase />
        </div>
      </section>

      {/* Statutory Certifications & Badges */}
      <section className="py-8 sm:py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CertificationsBadges />
        </div>
      </section>

      {/* 3. Core Sectors Deep Dive */}
      {coreSectorsSection?.enabled !== false && (
        <section id="core-sectors" className="py-14 sm:py-24 bg-[#F8FAFC] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F37021] bg-[#FFF4EC] px-3.5 py-1.5 rounded-md inline-block">
                {coreSectorsSection.badgeText || "Business Sectors"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2557] tracking-tight">
                {coreSectorsSection.headline || "Our Core Business Sectors"}
              </h2>
              <p className="text-slate-600 text-xs sm:text-base">
                {coreSectorsSection.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {(coreSectorsSection.sectors || companyData.coreSectors).map((sector: any) => (
                <motion.div
                  key={sector.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 hover:border-[#0F2557]/40 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-5 group-hover:bg-[#0F2557] group-hover:text-white transition-colors shadow-xs">
                      {iconMap[sector.icon] || (
                        <Zap className="w-6 h-6 text-[#F37021]" />
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#0F2557] mb-2 group-hover:text-[#F37021] transition-colors">
                      {sector.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {sector.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">
                      Lead Concern:
                    </span>
                    <Link
                      href={`/sister-concerns/${sector.concernSlug}`}
                      className="font-bold text-[#0F2557] hover:text-[#F37021] transition-colors flex items-center gap-1"
                    >
                      <span>{sector.concernName}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3.5 Video Gallery Section */}
      <VideoGallerySection />

      {/* 3.6 Image Gallery Section */}
      <ImageGallerySection />

      {/* 4. Journey & Milestones Timeline */}
      {milestonesSection?.enabled !== false && (
        <section className="py-14 sm:py-24 bg-[#0A1B40] text-white relative overflow-hidden border-b border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F37021]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F37021] bg-white/10 px-3.5 py-1.5 rounded-md inline-block">
                {milestonesSection.badgeText || "Growth & Heritage"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {milestonesSection.headline || "Our Journey & Milestones"}
              </h2>
              <p className="text-slate-300 text-xs sm:text-base">
                {milestonesSection.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {(milestonesSection.milestones || timelineMilestones).map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm relative group hover:border-[#F37021]/50 transition-all"
                >
                  <div className="text-2xl font-black text-[#F37021] mb-2 font-mono">
                    {item.year}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-orange-200 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Corporate Contact & Consultation */}
      <section id="corporate-contact" className="py-14 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0F2557] to-[#0A1B40] rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F37021]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center relative z-10">
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#F37021] bg-white/10 px-3 py-1 rounded-md">
                  Corporate Inquiries & Tenders
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  Connect With Bhuiyan Group Corporate Management
                </h2>
                <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                  Whether you require an industrial generator proposal, rooftop solar turnkey EPC,
                  water pump hydraulics, or certified infant product procurement, our management
                  team in Dhaka is ready to assist.
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs text-slate-300">
                  <div className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <Phone className="w-5 h-5 text-[#F37021] shrink-0" />
                    <div>
                      <p className="font-bold text-white">Central Hotline</p>
                      <p>{companyData.corporateHeadquarters.hotline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <Building2 className="w-5 h-5 text-[#F37021] shrink-0" />
                    <div>
                      <p className="font-bold text-white">Corporate Tower</p>
                      <p>Gulshan-1, Dhaka-1212</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-5 sm:p-8 shadow-xl">
                <h3 className="text-lg sm:text-xl font-bold text-[#0F2557] mb-1">
                  Request an Enterprise Proposal
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Fill in your details and our technical director will respond within 24 hours.
                </p>

                {inquirySubmitted ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-emerald-900">
                      Inquiry Received
                    </h4>
                    <p className="text-xs text-emerald-700">
                      Thank you. Bhuiyan Group executive management will get back to you promptly.
                    </p>
                    <button
                      onClick={() => setInquirySubmitted(false)}
                      className="mt-3 text-xs font-semibold text-emerald-700 underline"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleHomeInquirySubmit}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Organization / Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={homeInquiry.organization}
                        onChange={(e) => setHomeInquiry({ ...homeInquiry, organization: e.target.value })}
                        placeholder="e.g. Apex Textiles / Square Hospital"
                        className="w-full px-3.5 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F2557] text-slate-900 bg-white text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          value={homeInquiry.name}
                          onChange={(e) => setHomeInquiry({ ...homeInquiry, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full px-3.5 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F2557] text-slate-900 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Official Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={homeInquiry.email}
                          onChange={(e) => setHomeInquiry({ ...homeInquiry, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full px-3.5 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F2557] text-slate-900 bg-white text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={homeInquiry.phone}
                          onChange={(e) => setHomeInquiry({ ...homeInquiry, phone: e.target.value })}
                          placeholder="+880 1..."
                          className="w-full px-3.5 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F2557] text-slate-900 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Sector of Interest
                        </label>
                        <select
                          className="w-full px-3.5 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F2557] text-slate-900 bg-white text-sm"
                          value={homeInquiry.sector}
                          onChange={(e) => setHomeInquiry({ ...homeInquiry, sector: e.target.value })}
                        >
                        <option value="Generex Power (Industrial Generators)">
                          Generex Power (Industrial Generators)
                        </option>
                        <option value="Radial Renewable Technology (Solar EPC)">
                          Radial Renewable Technology (Solar EPC)
                        </option>
                        <option value="Glory Energy Engineering (Water Pumps)">
                          Glory Energy Engineering (Water Pumps)
                        </option>
                        <option value="Radial Power & Engineering (Substations)">
                          Radial Power & Engineering (Substations)
                        </option>
                        <option value="Infant Zone (Mother & Child Care)">
                          Infant Zone (Mother & Child Care)
                        </option>
                      </select>
                    </div>
                  </div>

                    {homeInquiryError && (
                      <p className="text-xs font-semibold text-rose-600">
                        {homeInquiryError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={homeInquiryLoading}
                      className="w-full py-3.5 rounded-lg bg-[#F37021] hover:bg-[#DE5F12] text-white font-bold text-sm tracking-wide shadow-md transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
                    >
                      {homeInquiryLoading ? "Submitting Inquiry..." : "Submit Corporate Inquiry"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
