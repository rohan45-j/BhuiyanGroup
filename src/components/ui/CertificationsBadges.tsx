"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Award,
  BadgeCheck,
  X,
  ExternalLink,
  ZoomIn,
  FileText
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export interface CertificationItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  issuer: string;
  imageUrl?: string;
}

const defaultCertifications: CertificationItem[] = [
  {
    id: "iso-9001",
    title: "ISO 9001:2015",
    subtitle: "Quality Management System",
    issuer: "Bureau Veritas / UKAS Certified",
    tag: "Certified Quality",
    imageUrl: ""
  },
  {
    id: "bpdb-grade-a",
    title: "BPDB Enlisted Grade-A",
    subtitle: "Turnkey Power EPC Contractor",
    issuer: "Bangladesh Power Dev Board",
    tag: "National Enlistment",
    imageUrl: ""
  },
  {
    id: "breb-hv",
    title: "BREB Approved EPC",
    subtitle: "33/11kV Substation & Line Works",
    issuer: "Rural Electrification Board",
    tag: "Utility Grade",
    imageUrl: ""
  },
  {
    id: "iso-45001",
    title: "ISO 45001:2018",
    subtitle: "Occupational Health & Safety",
    issuer: "Zero-Accident Safety Compliance",
    tag: "Safety First",
    imageUrl: ""
  },
  {
    id: "sreda-solar",
    title: "SREDA Approved",
    subtitle: "Net-Metered Solar EPC Vendor",
    issuer: "Sustainable Energy Authority",
    tag: "Green Energy",
    imageUrl: ""
  },
  {
    id: "berc-license",
    title: "BERC Licensed",
    subtitle: "Electric Utility & Power Solutions",
    issuer: "Bangladesh Energy Reg Commission",
    tag: "Statutory License",
    imageUrl: ""
  }
];

export default function CertificationsBadges() {
  const { config } = useSiteConfig();
  const certSec = (config as any)?.certificationsSection;

  const [activeModalItem, setActiveModalItem] = useState<CertificationItem | null>(null);

  // If section is turned off by admin, hide completely
  if (certSec?.enabled === false) {
    return null;
  }

  const badgeText = certSec?.badgeText || "Statutory Compliance & Standards";
  const headline = certSec?.headline || "Certified Quality & Regulatory Credentials";
  const subtext = certSec?.subtext || "Verified for Public Tenders & Private Industrial Turnkeys";
  const items: CertificationItem[] =
    certSec?.items && certSec.items.length > 0 ? certSec.items : defaultCertifications;

  return (
    <>
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#F37021] bg-[#FFF4EC] px-3 py-1 rounded-full border border-[#F37021]/20 inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#F37021]" />
              <span>{badgeText}</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#0F2557] tracking-tight mt-2">
              {headline}
            </h3>
          </div>
          {subtext && (
            <div className="text-xs text-slate-500 font-medium">
              {subtext}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {items.map((cert) => {
            const hasImage = Boolean(cert.imageUrl && cert.imageUrl.trim().length > 0);
            const isPdf = hasImage && cert.imageUrl!.toLowerCase().endsWith(".pdf");

            return (
              <div
                key={cert.id}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-[#F37021]/40 hover:shadow-md transition-all group flex flex-col justify-between text-center relative"
              >
                {/* Icon or Certificate Thumbnail */}
                <div className="mx-auto mb-3">
                  {hasImage ? (
                    <button
                      type="button"
                      onClick={() => setActiveModalItem(cert)}
                      className="relative w-16 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:border-[#F37021] hover:scale-105 transition-all cursor-pointer flex items-center justify-center p-1 group/img"
                      title="Click to view certificate"
                    >
                      {isPdf ? (
                        <div className="flex flex-col items-center justify-center text-rose-500 gap-1">
                          <FileText className="w-7 h-7" />
                          <span className="text-[9px] font-bold">PDF</span>
                        </div>
                      ) : (
                        <Image
                          src={cert.imageUrl!}
                          alt={cert.title}
                          fill
                          unoptimized
                          className="object-contain p-1"
                          sizes="80px"
                        />
                      )}
                      <div className="absolute inset-0 bg-[#0F2557]/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </button>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-[#0F2557] group-hover:text-[#F37021] flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                      <BadgeCheck className="w-5 h-5" />
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#F37021] bg-orange-50 px-2 py-0.5 rounded-full inline-block mb-1">
                    {cert.tag}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-[#0F2557] group-hover:text-[#DE5F12] transition-colors leading-tight">
                    {cert.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5 leading-snug">
                    {cert.subtitle}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-200/60 flex flex-col items-center gap-1">
                  <p className="text-[10px] text-slate-400 truncate w-full">
                    {cert.issuer}
                  </p>
                  {hasImage && (
                    <button
                      type="button"
                      onClick={() => setActiveModalItem(cert)}
                      className="text-[10px] font-bold text-[#F37021] hover:text-[#DE5F12] inline-flex items-center gap-0.5 mt-0.5 cursor-pointer"
                    >
                      <span>View Credential</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-view Certificate Lightbox Modal */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#F37021] bg-orange-50 px-2.5 py-0.5 rounded-full inline-block">
                  {activeModalItem.tag}
                </span>
                <h3 className="text-xl font-black text-[#0F2557] mt-1">
                  {activeModalItem.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  {activeModalItem.subtitle} — {activeModalItem.issuer}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display or PDF link */}
            {activeModalItem.imageUrl && (
              <div className="w-full flex justify-center py-2">
                {activeModalItem.imageUrl.toLowerCase().endsWith(".pdf") ? (
                  <div className="text-center py-8 space-y-3">
                    <FileText className="w-16 h-16 text-rose-500 mx-auto" />
                    <p className="text-sm font-bold text-slate-800">
                      Official Certificate Document (PDF)
                    </p>
                    <a
                      href={activeModalItem.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F2557] text-white text-xs font-bold hover:bg-[#1A3978] transition-colors"
                    >
                      <span>Open PDF in New Tab</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ) : (
                  <div className="relative w-full aspect-[4/3] max-h-[60vh] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                    <Image
                      src={activeModalItem.imageUrl}
                      alt={activeModalItem.title}
                      fill
                      unoptimized
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
