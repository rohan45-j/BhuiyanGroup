import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  Users,
  Target,
  CheckCircle2,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { getMergedSiteConfig } from "@/lib/runtimeConfig";

export async function generateMetadata() {
  const config = getMergedSiteConfig();
  const title = (config as any).about?.title || `About ${config.general?.name || "Bhuiyan Group"}`;
  const desc =
    (config as any).about?.subtitle ||
    config.general?.tagline ||
    "Learn about Bhuiyan Group's vision, heritage, leadership, and multi-disciplinary engineering capabilities.";

  return {
    title: `${title} | Engineering Legacy & Leadership in Bangladesh`,
    description: desc,
  };
}

export default function AboutPage() {
  const config = getMergedSiteConfig();
  const about = (config as any).about || {};
  const general = config.general || ({} as any);

  const badge = about.headerBadge || "Corporate Profile";
  const title = about.title || `About ${general.name || "Bhuiyan Group"}`;
  const subtitle =
    about.subtitle ||
    general.tagline ||
    "Over a decade of leadership in power infrastructure, clean renewable energy, fluid mechanics, and clinical mother-child care in Bangladesh.";

  const storyHeading = about.storyHeading || "Building the Industrial Engine of Bangladesh";
  const storyParagraph1 = about.storyParagraph1 || general.overview || "";
  const storyParagraph2 = about.storyParagraph2 || "";
  const storyImage = about.storyImage || "";

  const highlights =
    about.highlights && about.highlights.length > 0
      ? about.highlights
      : [
          {
            value: "350+ MW",
            label: "Installed Capacity",
            description: "Standby & renewable solar",
          },
          {
            value: "1,200+",
            label: "Industrial Clients",
            description: "Textiles, pharma & commercial",
          },
        ];

  const principlesHeading = about.principlesHeading || "Our Core Principles";
  const principles =
    about.principles && about.principles.length > 0
      ? about.principles
      : [
          {
            title: "Engineering Excellence",
            description:
              "Continuous upgrade of testing equipment, computer modeling, and diagnostic tools.",
          },
          {
            title: "Safety & Compliance First",
            description:
              "Zero-compromise protocols aligned with BNBC, NFPA, and international IEC directives.",
          },
          {
            title: "Long-Term Partnerships",
            description:
              "Proactive 24/7 post-commissioning maintenance and OEM spare parts availability.",
          },
        ];

  const visionHeading = about.visionHeading || "Corporate Vision";
  const visionText = about.visionText || general.vision || "";
  const missionHeading = about.missionHeading || "Corporate Mission";
  const missionText = about.missionText || general.mission || "";

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header Banner */}
      <div className="bg-[#0A1B40] text-white py-12 sm:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F37021]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F37021] bg-white/10 px-3 py-1 rounded-md border border-white/10">
            {badge}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mt-3 font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
        {/* Story & Principles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Story Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2557] tracking-tight">
              {storyHeading}
            </h2>

            {storyParagraph1 && (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                {storyParagraph1}
              </p>
            )}

            {storyParagraph2 && (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                {storyParagraph2}
              </p>
            )}

            {storyImage && (
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-md my-4">
                <Image
                  src={storyImage}
                  alt={storyHeading}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {/* Highlights / Stat Cards */}
            {highlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                {highlights.map((h: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm card-hover-glow transition-all"
                  >
                    <span className="text-2xl sm:text-3xl font-black text-[#F37021] block">
                      {h.value}
                    </span>
                    <p className="text-xs font-bold text-[#0F2557] mt-1">{h.label}</p>
                    {h.description && (
                      <p className="text-[11px] text-slate-500 mt-0.5">{h.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Core Principles Column */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl space-y-5 sm:space-y-6">
            <h3 className="text-xl font-bold text-[#0F2557] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F37021]" />
              <span>{principlesHeading}</span>
            </h3>

            <div className="space-y-4 text-sm text-slate-600">
              {principles.map((pr: any, pIdx: number) => (
                <div key={pIdx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F37021] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold text-sm">
                      {pr.title}
                    </strong>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                      {pr.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 card-hover-glow transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#FFF4EC] text-[#F37021] flex items-center justify-center shadow-xs">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#0F2557]">{visionHeading}</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {visionText}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 card-hover-glow transition-all">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#0F2557]">{missionHeading}</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {missionText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
