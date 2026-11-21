"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Printer,
  Download,
  Building2,
  CheckCircle2,
  Award,
  Zap,
  Globe,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  FileText
} from "lucide-react";
import { companyData } from "@/data/companyData";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function CorporateBrochureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { config } = useSiteConfig();

  const concernsList = config?.sisterConcerns && config.sisterConcerns.length > 0
    ? config.sisterConcerns
    : companyData.sisterConcerns;

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-brochure-modal", handleOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-brochure-modal", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="bg-[#0F2557] text-white px-5 sm:px-8 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F37021] flex items-center justify-center font-black text-sm">
              BG
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                Bhuiyan Group Corporate Profile (2026 Edition)
              </h3>
              <p className="text-[11px] text-slate-300">
                Official Engineering & Infrastructure Corporate Brochure
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {config?.branding?.brochurePdf && (
              <a
                href={config.branding.brochurePdf}
                target="_blank"
                rel="noreferrer"
                download
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F37021] hover:bg-[#d95d13] text-xs font-bold text-white transition-colors cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download Uploaded PDF</span>
              </a>
            )}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save as PDF</span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-slate-50/50 print:p-0 print:bg-white text-slate-800">
          {/* Cover Header */}
          <div className="border-b-2 border-[#0F2557] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-black tracking-widest uppercase text-[#F37021] bg-orange-50 px-2.5 py-1 rounded border border-orange-200">
                Corporate Factsheet & Profile
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-[#0F2557] tracking-tight mt-3">
                Bhuiyan Group
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Engineering Bangladesh’s Industrial Power & Infrastructure Future
              </p>
            </div>
            <div className="text-xs text-slate-500 sm:text-right font-mono">
              <p>Established: 1998</p>
              <p>Turnkey EPC & Industrial Supply</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Executive Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#0F2557]">
                Executive Overview
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                {companyData.mission || companyData.overview} With over 25 years of specialized operational history, Bhuiyan Group stands as a premier Tier-1 engineering conglomerate delivering utility-scale turnkey EPC power projects, high-voltage substations, industrial water pumping grids, and rooftop renewable energy installations.
              </p>
            </div>

            {/* Key Stats Callout */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#F37021]">
                Key Metrics
              </h4>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-xl font-black text-[#0F2557] block">1,200+</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">MW Deployed</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-xl font-black text-[#0F2557] block">550+</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">EPC Projects</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-xl font-black text-[#0F2557] block">25+</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Years Legacy</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-xl font-black text-[#0F2557] block">5</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Subsidiaries</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Operating Subsidiaries */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F2557] flex items-center justify-between border-b border-slate-200 pb-2">
              <span>Autonomous Operating Subsidiaries</span>
              <span className="text-xs text-slate-400 font-normal">5 Specialized Strategic Units</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {concernsList.map((sc) => (
                <div
                  key={sc.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#0F2557] uppercase tracking-wide">
                      {sc.name}
                    </span>
                    <span className="text-[10px] font-bold text-[#F37021] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                      {sc.sector}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    &ldquo;{sc.tagline}&rdquo;
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {sc.description}
                  </p>
                  <div className="pt-1 text-[11px] text-slate-500 flex items-center gap-3">
                    <span className="font-mono">{sc.contactInfo?.phone}</span>
                    <span>•</span>
                    <span className="font-mono truncate">{sc.contactInfo?.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Accreditations */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F2557] border-b border-slate-200 pb-2">
              Government Enlistments & Key Clients
            </h3>
            <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-700">
              {[
                "Bangladesh Power Development Board (BPDB)",
                "Rural Electrification Board (BREB)",
                "Power Grid Company of Bangladesh (PGCB)",
                "Dhaka Electric Supply Company (DESCO)",
                "Summit Power International",
                "Apex Footwear & Textiles",
                "Meghna Group of Industries",
                "Square Pharmaceuticals"
              ].map((client, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{client}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Contact Details Footer */}
          <div className="bg-[#0A1B40] text-white p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-4 text-xs">
            <div>
              <strong className="block text-sm font-bold text-white mb-1">
                Corporate Headquarters
              </strong>
              <p className="text-slate-300">
                {companyData.corporateHeadquarters.address},{" "}
                {companyData.corporateHeadquarters.city},{" "}
                {companyData.corporateHeadquarters.country}
              </p>
              <p className="text-slate-400 mt-1 font-mono">
                Working Hours: {companyData.corporateHeadquarters.workingHours}
              </p>
            </div>
            <div className="space-y-1 font-mono md:text-right">
              <p className="text-[#F37021] font-bold">
                Hotline: {companyData.corporateHeadquarters.hotline}
              </p>
              <p className="text-slate-300">
                Email: {companyData.corporateHeadquarters.email}
              </p>
              <p className="text-slate-300">
                Web: www.bhuiyangroup.com.bd
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
