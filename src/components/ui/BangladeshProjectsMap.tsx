"use client";

import React, { useState } from "react";
import {
  MapPin,
  Zap,
  Sun,
  Droplets,
  Building2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers
} from "lucide-react";

interface ProjectHub {
  id: string;
  name: string;
  division: string;
  sector: string;
  type: "power" | "substation" | "solar" | "water" | "hq";
  capacity: string;
  client: string;
  year: string;
  description: string;
  topPercent: number;
  leftPercent: number;
}

const projectHubs: ProjectHub[] = [
  {
    id: "hub-ashuganj",
    name: "Ashuganj Combined Cycle Power Station",
    division: "Brahmanbaria / Chittagong Div",
    sector: "Power Generation",
    type: "power",
    capacity: "450 MW Grid Injection",
    client: "BPDB / Ashuganj Power Station Co.",
    year: "2019 - Present",
    description: "Auxiliary power systems, generator maintenance, and high-voltage balance of plant supply.",
    topPercent: 47,
    leftPercent: 58
  },
  {
    id: "hub-dhaka",
    name: "Dhaka Corporate HQ & Engineering Centre",
    division: "Dhaka Central",
    sector: "Central Operations",
    type: "hq",
    capacity: "National Command & Dispatch",
    client: "Bhuiyan Group Holdings",
    year: "1998 - Present",
    description: "Executive engineering suites, Central procurement, tender dispatch, and project management.",
    topPercent: 52,
    leftPercent: 50
  },
  {
    id: "hub-gazipur",
    name: "Gazipur Industrial Rooftop Solar Park",
    division: "Gazipur / Dhaka Div",
    sector: "Renewable Energy",
    type: "solar",
    capacity: "5.4 MWp Net-Metered",
    client: "Apex Footwear & Textile Park",
    year: "2023 - 2024",
    description: "Tier-1 monocrystalline PERC rooftop installation cutting 4,800 tons of CO2 annually.",
    topPercent: 42,
    leftPercent: 49
  },
  {
    id: "hub-narayanganj",
    name: "Narayanganj 132/33kV Grid Substation",
    division: "Narayanganj",
    sector: "Power Grid Substation",
    type: "substation",
    capacity: "2x 50/75 MVA Transformers",
    client: "Power Grid Company of Bangladesh (PGCB)",
    year: "2021 - 2023",
    description: "Complete civil construction, GIS switchgear commissioning, SCADA telemetry, and lightning protection.",
    topPercent: 56,
    leftPercent: 53
  },
  {
    id: "hub-chittagong",
    name: "Chittagong Maritime Hydraulic Intake",
    division: "Chittagong Port",
    sector: "Industrial Hydraulics",
    type: "water",
    capacity: "45,000 L/min Flow Head",
    client: "Chittagong Industrial & Port Authority",
    year: "2020 - 2022",
    description: "High-capacity submersible pumps, seawater corrosion-proof stainless impellers, and pump stations.",
    topPercent: 74,
    leftPercent: 78
  },
  {
    id: "hub-sirajganj",
    name: "Sirajganj 225MW Dual Fuel Station",
    division: "Sirajganj / Rajshahi Div",
    sector: "Turbine Auxiliaries",
    type: "power",
    capacity: "225 MW Auxiliary EPC",
    client: "North-West Power Generation Co.",
    year: "2018 - 2021",
    description: "Heavy fuel oil forwarding skids, auxiliary transformer supply, and emergency black-start diesel gensets.",
    topPercent: 43,
    leftPercent: 37
  }
];

export default function BangladeshProjectsMap() {
  const [selectedHub, setSelectedHub] = useState<ProjectHub>(projectHubs[0]);

  return (
    <div className="bg-[#0A1B40] text-white rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F37021]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative z-10 border-b border-white/10 pb-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-black uppercase tracking-widest text-[#F37021] bg-white/10 px-3.5 py-1 rounded-full border border-[#F37021]/30 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F37021] animate-ping" />
            <span>National Infrastructure Footprint</span>
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Strategic Deployments Across Bangladesh
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Click on active project nodes across major national power corridors to view EPC capacities, commissioning partners, and technical specifications.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>6 Active Strategic Hubs</span>
        </div>
      </div>

      {/* Interactive Map Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
        {/* Visual Map Canvas */}
        <div className="lg:col-span-7 bg-[#061129]/80 rounded-2xl p-4 sm:p-6 border border-white/10 relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden">
          {/* Bangladesh Stylized Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px] opacity-60" />

          {/* Stylized Bangladesh Map Background Silhouette */}
          <div className="absolute inset-8 border border-white/10 rounded-2xl pointer-events-none flex items-center justify-center">
            <span className="text-[100px] sm:text-[140px] font-black tracking-widest text-white/[0.03] select-none uppercase">
              BANGLADESH
            </span>
          </div>

          {/* Interactive Hub Pins */}
          {projectHubs.map((hub) => {
            const isSelected = selectedHub.id === hub.id;
            return (
              <button
                key={hub.id}
                onClick={() => setSelectedHub(hub)}
                style={{
                  top: `${hub.topPercent}%`,
                  left: `${hub.leftPercent}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20 focus:outline-none"
                aria-label={`View ${hub.name}`}
              >
                <div className="relative flex items-center justify-center">
                  <span
                    className={`absolute inline-flex h-9 w-9 rounded-full opacity-60 transition-all ${
                      isSelected
                        ? "bg-[#F37021] animate-ping"
                        : "bg-sky-400/30 group-hover:bg-[#F37021]/50 group-hover:scale-125"
                    }`}
                  />
                  <div
                    className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-all duration-300 ${
                      isSelected
                        ? "bg-[#F37021] text-white scale-125 ring-4 ring-[#F37021]/30"
                        : "bg-white text-[#0F2557] group-hover:bg-[#F37021] group-hover:text-white"
                    }`}
                  >
                    {hub.type === "power" ? (
                      <Zap className="w-3.5 h-3.5" />
                    ) : hub.type === "solar" ? (
                      <Sun className="w-3.5 h-3.5" />
                    ) : hub.type === "substation" ? (
                      <Layers className="w-3.5 h-3.5" />
                    ) : hub.type === "water" ? (
                      <Droplets className="w-3.5 h-3.5" />
                    ) : (
                      <Building2 className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>

                <span
                  className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap shadow-md pointer-events-none transition-all ${
                    isSelected
                      ? "bg-[#F37021] text-white"
                      : "bg-[#0F2557]/90 text-slate-300 group-hover:text-white group-hover:bg-[#0F2557]"
                  }`}
                >
                  {hub.name.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Hub Detail Card */}
        <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/10 space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#F37021] bg-[#F37021]/15 px-3 py-1 rounded-full border border-[#F37021]/30">
              {selectedHub.sector}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {selectedHub.year}
            </span>
          </div>

          <div>
            <h4 className="text-xl font-black text-white tracking-tight">
              {selectedHub.name}
            </h4>
            <p className="text-xs text-sky-300 font-semibold mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{selectedHub.division}</span>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedHub.description}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Capacity / Scale</span>
              <strong className="text-white text-sm font-bold block mt-0.5">{selectedHub.capacity}</strong>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Commissioning Entity</span>
              <strong className="text-white text-sm font-bold block mt-0.5 line-clamp-1">{selectedHub.client}</strong>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
              className="w-full py-3 rounded-xl bg-[#F37021] hover:bg-[#DE5F12] text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Inquire About Similar EPC Scope</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
