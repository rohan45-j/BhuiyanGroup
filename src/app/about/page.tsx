import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  Target,
  CheckCircle2,
  Building2,
  ArrowRight,
} from "lucide-react";
import { companyData } from "@/data/companyData";

export const metadata = {
  title: "About Bhuiyan Group | Engineering Legacy & Leadership in Bangladesh",
  description:
    "Learn about Bhuiyan Group's vision, heritage, leadership, and multi-disciplinary engineering capabilities across power, renewables, water dynamics, and substations.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#0A1B40] text-white py-12 sm:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F37021]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F37021] bg-white/10 px-3 py-1 rounded-md">
            Corporate Profile
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
            About Bhuiyan Group
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mt-3 font-medium">
            Over a decade of leadership in power infrastructure, clean renewable energy,
            fluid mechanics, and clinical mother-child care in Bangladesh.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2557] tracking-tight">
              Building the Industrial Engine of Bangladesh
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {companyData.overview}
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              From our beginnings in electro-mechanical power distribution, Bhuiyan Group
              has diversified into five autonomous corporate concerns. We operate with a
              unified ethos: uncompromised technical integrity, strict adherence to global
              safety benchmarks, and responsive customer-first field support.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-2xl font-black text-[#F37021]">350+ MW</span>
                <p className="text-xs font-bold text-[#0F2557] mt-1">Installed Capacity</p>
                <p className="text-[11px] text-slate-500">Standby & renewable solar</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-2xl font-black text-[#0F2557]">1,200+</span>
                <p className="text-xs font-bold text-[#0F2557] mt-1">Industrial Clients</p>
                <p className="text-[11px] text-slate-500">Textiles, pharma & commercial</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl space-y-5 sm:space-y-6">
            <h3 className="text-xl font-bold text-[#0F2557]">Our Core Principles</h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F37021] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Engineering Excellence</strong>
                  Continuous upgrade of testing equipment, computer modeling, and diagnostic tools.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F37021] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Safety & Compliance First</strong>
                  Zero-compromise protocols aligned with BNBC, NFPA, and international IEC directives.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F37021] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Long-Term Partnerships</strong>
                  Proactive 24/7 post-commissioning maintenance and OEM spare parts availability.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFF4EC] text-[#F37021] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#0F2557]">Corporate Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {companyData.vision}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#0F2557]">Corporate Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {companyData.mission}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
