"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Shield,
  ExternalLink,
} from "lucide-react";
import { companyData } from "@/data/companyData";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Footer() {
  const pathname = usePathname();
  const { config } = useSiteConfig();
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const sisterConcerns = config?.sisterConcerns || companyData.sisterConcerns;
  const corporateInfo = config?.general || companyData.corporateHeadquarters;
  const logoSrc = config?.branding?.logo || "/img/bhuiyan-group-logo-cropped.png";

  return (
    <footer
      className="text-slate-300 relative border-t-4 overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: config?.theme?.footerBg || "#0A1B40",
        borderTopColor: config?.theme?.accentColor || "#F37021",
      }}
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#0F2557]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#F37021]/10 blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-12">
          {/* Brand & Overview Column */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link href="/" className="inline-block group mx-auto sm:mx-0">
              <div className="relative h-14 sm:h-18 md:h-20 w-56 sm:w-72 max-w-[85vw] bg-white rounded-2xl p-2.5 sm:p-3 shadow-md group-hover:scale-105 transition-transform overflow-hidden mx-auto sm:mx-0 flex items-center justify-center sm:justify-start">
                <Image
                  src={logoSrc}
                  alt="Bhuiyan Group"
                  fill
                  className="object-contain object-center sm:object-left p-1"
                  sizes="(max-width: 640px) 220px, 280px"
                />
              </div>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed pr-2">
              {corporateInfo.overview}
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 rounded-lg p-2.5 w-fit">
                <Shield className="w-4 h-4 text-[#F37021]" />
                <span>ISO 9001:2015 Compliant Quality & Safety Frameworks</span>
              </div>
            </div>
          </div>

          {/* Sister Concerns Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide uppercase border-b border-white/15 pb-2.5 flex items-center justify-between">
              <span>Sister Concerns</span>
              <span className="text-[#F37021] text-xs font-normal">5 Entities</span>
            </h3>
            <ul className="space-y-2.5">
              {sisterConcerns.map((concern) => (
                <li key={concern.id}>
                  <Link
                    href={`/sister-concerns/${concern.slug}`}
                    className="group flex items-center justify-between text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="group-hover:text-[#F37021] transition-colors flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F37021] opacity-75 group-hover:scale-125 transition-transform" />
                      {concern.name}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#F37021]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Sectors Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide uppercase border-b border-white/15 pb-2.5">
              Core Sectors
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="hover:text-white transition-colors cursor-default">
                Power Generation
              </li>
              <li className="hover:text-white transition-colors cursor-default">
                Renewable Solar EPC
              </li>
              <li className="hover:text-white transition-colors cursor-default">
                Industrial Water Pumps
              </li>
              <li className="hover:text-white transition-colors cursor-default">
                Electrical Substations
              </li>
              <li className="hover:text-white transition-colors cursor-default">
                Mother & Infant Care
              </li>
            </ul>
          </div>

          {/* Corporate Contact Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide uppercase border-b border-white/15 pb-2.5">
              Dhaka Headquarters
            </h3>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F37021] shrink-0 mt-0.5" />
                <span>
                  {corporateInfo.address},{" "}
                  {corporateInfo.city},{" "}
                  {corporateInfo.country}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#F37021] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-white">
                    {corporateInfo.hotline} (Hotline)
                  </p>
                  <p className="text-slate-400">
                    {corporateInfo.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F37021] shrink-0" />
                <a
                  href={`mailto:${corporateInfo.email}`}
                  className="hover:text-[#F37021] transition-colors underline-offset-2 hover:underline"
                >
                  {corporateInfo.email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#F37021] shrink-0 mt-0.5" />
                <span>{corporateInfo.workingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-[#F37021] hover:bg-[#DE5F12] text-white font-semibold text-xs tracking-wide transition-colors shadow-md"
              >
                <span>Request Corporate Proposal</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-left">
          <p>
            © <span suppressHydrationWarning>{currentYear}</span> {companyData.name}. All Rights Reserved. Built with
            engineering excellence in Bangladesh.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/contact"
              className="hover:text-slate-200 transition-colors"
            >
              Contact Support
            </Link>
            <span className="text-white/20 hidden sm:inline">•</span>
            <Link
              href="/about"
              className="hover:text-slate-200 transition-colors"
            >
              About the Group
            </Link>
            <span className="text-white/20 hidden sm:inline">•</span>
            <Link
              href="/projects"
              className="hover:text-slate-200 transition-colors"
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
