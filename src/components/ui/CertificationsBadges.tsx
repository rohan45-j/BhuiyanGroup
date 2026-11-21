"use client";

import React from "react";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileCheck,
  BadgeCheck,
  Scale
} from "lucide-react";

const certifications = [
  {
    id: "iso-9001",
    title: "ISO 9001:2015",
    subtitle: "Quality Management System",
    issuer: "Bureau Veritas / UKAS Certified",
    tag: "Certified Quality"
  },
  {
    id: "bpdb-grade-a",
    title: "BPDB Enlisted Grade-A",
    subtitle: "Turnkey Power EPC Contractor",
    issuer: "Bangladesh Power Dev Board",
    tag: "National Enlistment"
  },
  {
    id: "breb-hv",
    title: "BREB Approved EPC",
    subtitle: "33/11kV Substation & Line Works",
    issuer: "Rural Electrification Board",
    tag: "Utility Grade"
  },
  {
    id: "iso-45001",
    title: "ISO 45001:2018",
    subtitle: "Occupational Health & Safety",
    issuer: "Zero-Accident Safety Compliance",
    tag: "Safety First"
  },
  {
    id: "sreda-solar",
    title: "SREDA Approved",
    subtitle: "Net-Metered Solar EPC Vendor",
    issuer: "Sustainable Energy Authority",
    tag: "Green Energy"
  },
  {
    id: "berc-license",
    title: "BERC Licensed",
    subtitle: "Electric Utility & Power Solutions",
    issuer: "Bangladesh Energy Reg Commission",
    tag: "Statutory License"
  }
];

export default function CertificationsBadges() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#F37021] bg-[#FFF4EC] px-3 py-1 rounded-full border border-[#F37021]/20 inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#F37021]" />
            <span>Statutory Compliance & Standards</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#0F2557] tracking-tight mt-2">
            Certified Quality & Regulatory Credentials
          </h3>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Verified for Public Tenders & Private Industrial Turnkeys
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-[#F37021]/40 hover:shadow-md transition-all group flex flex-col justify-between text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-[#0F2557] group-hover:text-[#F37021] flex items-center justify-center mx-auto mb-3 shadow-2xs group-hover:scale-110 transition-transform">
              <BadgeCheck className="w-5 h-5" />
            </div>

            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#F37021] bg-orange-50 px-2 py-0.5 rounded-full inline-block mb-1">
                {cert.tag}
              </span>
              <h4 className="text-xs sm:text-sm font-black text-[#0F2557] group-hover:text-[#DE5F12] transition-colors">
                {cert.title}
              </h4>
              <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                {cert.subtitle}
              </p>
            </div>

            <p className="text-[10px] text-slate-400 border-t border-slate-200/60 pt-2 mt-2 truncate">
              {cert.issuer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
