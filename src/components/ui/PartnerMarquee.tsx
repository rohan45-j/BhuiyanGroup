"use client";

import React from "react";
import { ShieldCheck, Award, CheckCircle, Flame, Sun, Zap, Droplet } from "lucide-react";

const partners = [
  { name: "Perkins Power (UK)", category: "Prime Diesel Movers" },
  { name: "Cummins Heavy Duty", category: "Industrial Generators" },
  { name: "Stamford Alternators", category: "High-Voltage Generation" },
  { name: "Huawei Solar Telemetry", category: "Smart String Inverters" },
  { name: "Longi Tier-1 Solar PV", category: "Monocrystalline Panels" },
  { name: "Schneider Electric", category: "HT/LT Switchgear & Relays" },
  { name: "ABB Power Protection", category: "11kV/33kV Breakers" },
  { name: "Grundfos Hydraulics", category: "Fluid Mechanics & Pumps" },
  { name: "NFPA 20 Certified", category: "Fire Safety Standards" },
  { name: "ISO 9001:2015", category: "Quality System Certified" },
];

export default function PartnerMarquee() {
  return (
    <div className="py-6 bg-[#071330] border-y border-white/10 overflow-hidden relative select-none">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#071330] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#071330] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-8">
        {[...partners, ...partners].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl shrink-0 hover:border-[#F37021]/50 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-2 h-2 rounded-full bg-[#F37021] group-hover:scale-150 transition-transform shadow-sm shadow-[#F37021]" />
            <span className="text-sm font-bold text-white tracking-wide">
              {item.name}
            </span>
            <span className="text-[11px] text-slate-400 font-medium border-l border-white/10 pl-3">
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
