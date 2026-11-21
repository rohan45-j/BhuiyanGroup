"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  X,
  ChevronUp,
  Sparkles,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { companyData } from "@/data/companyData";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { config } = useSiteConfig();
  
  const rawWhatsapp = config?.general?.whatsapp || "+880 1819-214436";
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, "");
  const phoneHotline = config?.general?.hotline || companyData.corporateHeadquarters.hotline || "+880 1819-214436";

  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    "Hello Bhuiyan Group Engineering Desk, I would like to discuss a project inquiry."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expandable Menu Popover */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_16px_50px_rgba(15,37,87,0.25)] border border-slate-200/90 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0F2557] to-[#0A1B40] text-white p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
                  Engineering Desk
                </h4>
                <p className="text-[11px] text-emerald-400 font-semibold">
                  Available Online Now
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Options */}
          <div className="p-3 space-y-2 text-xs">
            {/* WhatsApp Direct */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/80 text-emerald-950 font-bold border border-emerald-200/60 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold">Chat on WhatsApp</span>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    {rawWhatsapp}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Send Direct Inquiry */}
            <a
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#FFF4EC] hover:bg-[#FFE8D6] text-[#DE5F12] font-bold border border-[#F37021]/30 transition-all group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F37021] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold">Send Direct Inquiry</span>
                  <span className="text-[11px] text-orange-700 font-normal">
                    Submit a message to our office
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#F37021] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${phoneHotline}`}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold border border-slate-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0F2557] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold">Call HQ Hotline</span>
                  <span className="text-[11px] text-slate-500 font-normal">
                    {phoneHotline}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-[#0F2557] via-[#153478] to-[#0F2557] hover:from-[#F37021] hover:to-[#DE5F12] text-white font-bold text-xs tracking-wide shadow-[0_8px_30px_rgba(15,37,87,0.35)] hover:shadow-[0_10px_35px_rgba(243,112,33,0.45)] transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20"
        aria-label="Contact Bhuiyan Group Desk"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>

        <span className="hidden sm:inline">Connect with Engineers</span>
        <span className="sm:hidden font-mono text-[11px]">Contact Desk</span>

        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center ml-0.5 group-hover:rotate-12 transition-transform">
          {isOpen ? <X className="w-3.5 h-3.5" /> : <MessageCircle className="w-3.5 h-3.5" />}
        </div>
      </button>
    </div>
  );
}
