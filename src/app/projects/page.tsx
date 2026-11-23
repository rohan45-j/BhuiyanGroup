import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import ProjectsDirectory, { ProjectItem } from "@/components/ui/ProjectsDirectory";

export const metadata = {
  title: "Engineering Projects & Credentials | Bhuiyan Group Bangladesh",
  description:
    "Explore Bhuiyan Group's landmark completed, ongoing, and upcoming engineering projects across industrial power plants, solar rooftops, deep-well water distribution, and 33kV substations.",
};

import { getMergedSiteConfig } from "@/lib/runtimeConfig";

function getProjects(): ProjectItem[] {
  try {
    const data = getMergedSiteConfig();
    if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
      return data.projects as unknown as ProjectItem[];
    }
  } catch (e) {
    console.error("Error reading projects:", e);
  }
  return [];
}

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Executive Hero Banner */}
      <div className="bg-[#0A1B40] text-white py-14 sm:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F37021]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F37021] bg-white/10 px-3.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F37021]" />
              <span>Proven Industrial Track Record</span>
            </span>
            <span className="text-xs text-slate-300 bg-white/5 px-3 py-1 rounded-full">
              1,200+ Commissioned Works
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            Projects & Engineering Credentials
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl font-medium leading-relaxed">
            Delivering high-reliability captive power, commercial rooftop solar PV decarbonization, 33kV digital substations, and life-safety water pumping networks for Bangladesh’s foremost industrial enterprises.
          </p>
        </div>
      </div>

      {/* Main Interactive Projects Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        <ProjectsDirectory initialProjects={projects} />

        {/* Corporate Call to Action */}
        <div className="bg-gradient-to-br from-[#0F2557] to-[#0A1B40] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#F37021]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F37021]">
              Turnkey EPC Consultation
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Planning a New Industrial Plant, Substation, or Solar Rooftop?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Engage our senior electro-mechanical and renewable engineers early in your design phase for optimized Capex, guaranteed Opex reduction, and utility compliance.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl bg-[#F37021] hover:bg-[#DE5F12] text-white font-bold text-sm shrink-0 shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 group relative z-10"
          >
            <span>Consult With Our Engineers</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
