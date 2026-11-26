"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  ArrowRight,
  Zap,
  SunMedium,
  Droplets,
  Cpu,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  FileText
} from "lucide-react";
import { companyData } from "@/data/companyData";
import { useSiteConfig } from "@/context/SiteConfigContext";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-5 h-5 text-[#F37021]" />,
  SunMedium: <SunMedium className="w-5 h-5 text-[#F37021]" />,
  Droplets: <Droplets className="w-5 h-5 text-[#F37021]" />,
  Cpu: <Cpu className="w-5 h-5 text-[#F37021]" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-[#F37021]" />,
};

export default function Navbar() {
  const pathname = usePathname();
  const { config } = useSiteConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileConcernsOpen, setMobileConcernsOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const sisterConcerns = config?.sisterConcerns || companyData.sisterConcerns;
  const logoSrc = config?.branding?.logo || "/img/bhuiyan-group-logo-cropped.png";
  const hotline = config?.general?.hotline || companyData.corporateHeadquarters.hotline;
  const email = config?.general?.email || companyData.corporateHeadquarters.email;

  // Handle smart autohide navbar: hide on scroll down, show on scroll up
  useEffect(() => {
    let ticking = false;
    const threshold = 8;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Always show at top of page
          if (currentScrollY < 60) {
            setIsVisible(true);
            setIsScrolled(currentScrollY > 15);
            lastScrollY.current = currentScrollY;
            ticking = false;
            return;
          }

          setIsScrolled(true);

          // If mobile menu is open, don't hide
          if (mobileMenuOpen) {
            setIsVisible(true);
            lastScrollY.current = currentScrollY;
            ticking = false;
            return;
          }

          const delta = currentScrollY - lastScrollY.current;

          if (Math.abs(delta) > threshold) {
            if (delta > 0) {
              // Scrolling DOWN -> smoothly hide
              setIsVisible(false);
              setDropdownOpen(false);
            } else {
              // Scrolling UP -> reveal navbar
              setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      suppressHydrationWarning
      className={`sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Utility Bar */}
      <div
        className="text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-white/10 hidden md:block transition-colors duration-300"
        style={{ backgroundColor: config?.theme?.primaryDark || "#0A1B40" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#F37021]" />
              <span>Hotline: {hotline}</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#F37021]" />
              <span>{email}</span>
            </span>
          </div>
          <div className="flex items-center space-x-4 text-slate-300 text-xs">
            <button
              onClick={() => {
                if (config?.branding?.brochurePdf) {
                  window.open(config.branding.brochurePdf, "_blank");
                } else {
                  window.dispatchEvent(new CustomEvent("open-brochure-modal"));
                }
              }}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-md hover:bg-white/20"
              title="View or download official company brochure"
            >
              <FileText className="w-3.5 h-3.5 text-[#F37021]" />
              <span>Company Brochure</span>
            </button>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ISO 9001:2015 Certified</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        suppressHydrationWarning
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-1.5 sm:py-2 border-b border-slate-200"
            : "bg-white py-2 sm:py-2.5 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between gap-3">
            {/* Mobile Left Balancer / Spacer to keep Center Logo mathematically balanced */}
            <div className="w-[44px] h-[44px] lg:hidden shrink-0 pointer-events-none" aria-hidden="true" />

            {/* Brand Logo - Centered on Mobile View, Left-aligned on Desktop View */}
            <Link
              href="/"
              className="flex items-center justify-center lg:justify-start group py-0.5 shrink-0 mx-auto lg:mx-0"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative h-9 sm:h-11 md:h-12 w-36 sm:w-48 md:w-56 max-w-[55vw] sm:max-w-none flex items-center justify-center lg:justify-start"
              >
                <Image
                  src={logoSrc}
                  alt="Bhuiyan Group"
                  fill
                  className="object-contain object-center lg:object-left"
                  priority
                  sizes="(max-width: 640px) 160px, (max-width: 768px) 210px, 250px"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation Links (Bitopi Glassmorphic Pill Container) */}
            <div className="hidden lg:flex items-center space-x-1 bg-slate-100/80 backdrop-blur-md p-1.5 rounded-full border border-slate-200/90 shadow-xs">
              <Link
                href="/"
                className={`text-xs xl:text-sm font-bold transition-all px-4 py-2 rounded-full relative ${
                  pathname === "/"
                    ? "text-white bg-[#0F2557] shadow-sm"
                    : "text-slate-700 hover:text-[#0F2557] hover:bg-white/60"
                }`}
              >
                Home
              </Link>

              <Link
                href="/about"
                className={`text-xs xl:text-sm font-bold transition-all px-4 py-2 rounded-full relative ${
                  pathname === "/about"
                    ? "text-white bg-[#0F2557] shadow-sm"
                    : "text-slate-700 hover:text-[#0F2557] hover:bg-white/60"
                }`}
              >
                About Us
              </Link>

              {/* Sister Concerns Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onMouseEnter={() => setDropdownOpen(true)}
                  className={`flex items-center gap-1.5 text-xs xl:text-sm font-bold transition-all px-4 py-2 rounded-full cursor-pointer ${
                    dropdownOpen || pathname.includes("sister-concerns")
                      ? "text-white bg-[#0F2557] shadow-sm"
                      : "text-slate-700 hover:text-[#0F2557] hover:bg-white/60"
                  }`}
                  aria-expanded={dropdownOpen}
                >
                  <span>Sister Concerns</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Animated Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      onMouseLeave={() => setDropdownOpen(false)}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-4 z-50"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 mb-2 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Bhuiyan Group Subsidiaries
                        </span>
                        <span className="text-[11px] font-bold text-[#F37021] bg-[#FFF4EC] px-2.5 py-0.5 rounded-full">
                          5 Strategic Concerns
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-1.5">
                        {sisterConcerns.map((concern) => (
                          <Link
                            key={concern.id}
                            href={`/sister-concerns/${concern.slug}`}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50 transition-all duration-200 group/item hover:translate-x-1"
                          >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white flex items-center justify-center transition-colors mt-0.5 shrink-0 shadow-sm overflow-hidden p-1.5 border border-slate-200">
                              {concern.logo ? (
                                <div className="relative w-full h-full">
                                  <Image
                                    src={concern.logo}
                                    alt={concern.name}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                  />
                                </div>
                              ) : (
                                iconMap[concern.iconName] || (
                                  <Zap className="w-5 h-5 text-[#F37021]" />
                                )
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-900 group-hover/item:text-[#0F2557]">
                                  {concern.name}
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  Est. {concern.foundedYear}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                {concern.tagline}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50/70 -mx-4 -mb-4 p-3.5 px-6 rounded-b-3xl flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium">
                          Multi-disciplinary industrial consultation?
                        </span>
                        <Link
                          href="/contact"
                          onClick={() => setDropdownOpen(false)}
                          className="font-bold text-[#F37021] hover:text-[#DE5F12] flex items-center gap-1"
                        >
                          Consult Our Engineers <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/projects"
                className={`text-xs xl:text-sm font-bold transition-all px-4 py-2 rounded-full relative ${
                  pathname === "/projects"
                    ? "text-white bg-[#0F2557] shadow-sm"
                    : "text-slate-700 hover:text-[#0F2557] hover:bg-white/60"
                }`}
              >
                Projects
              </Link>

              <Link
                href="/#video-gallery"
                className="text-xs xl:text-sm font-bold transition-all px-4 py-2 rounded-full text-slate-700 hover:text-[#0F2557] hover:bg-white/60"
              >
                Media Gallery
              </Link>
            </div>

            {/* Right Action: Contact Button */}
            <div className="hidden lg:flex items-center space-x-2.5">

              <Link
                href="/contact"
                className="relative group inline-flex items-center justify-center px-5 py-2.5 rounded-full text-white text-xs sm:text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 overflow-hidden"
                style={{ backgroundColor: config?.theme?.buttonColor || config?.theme?.accentColor || "#F37021" }}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="min-w-[44px] min-h-[44px] p-2 rounded-xl text-slate-800 bg-slate-100 hover:bg-slate-200 focus:outline-none flex items-center justify-center transition-all active:scale-95"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#0F2557]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#0F2557]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-8 mt-2 space-y-4 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              {/* Mobile Drawer Top Centered Logo */}
              <div className="flex items-center justify-center py-2 pb-3 border-b border-slate-100">
                <div className="relative h-9 w-44 flex items-center justify-center">
                  <Image
                    src={logoSrc}
                    alt="Bhuiyan Group"
                    fill
                    className="object-contain object-center"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-base font-bold transition-colors ${
                    pathname === "/"
                      ? "text-[#F37021] bg-orange-50"
                      : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-base font-bold transition-colors ${
                    pathname === "/about"
                      ? "text-[#F37021] bg-orange-50"
                      : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  About Us
                </Link>

                {/* Mobile Sister Concerns Accordion */}
                <div className="rounded-xl border border-slate-150 overflow-hidden bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => setMobileConcernsOpen(!mobileConcernsOpen)}
                    className="w-full min-h-[44px] flex items-center justify-between px-4 py-2.5 text-base font-bold text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span>Sister Concerns</span>
                      <span className="text-[11px] font-bold text-[#F37021] bg-[#FFF4EC] px-2 py-0.5 rounded-full">
                        5
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                        mobileConcernsOpen ? "rotate-180 text-[#F37021]" : ""
                      }`}
                    />
                  </button>

                  {mobileConcernsOpen && (
                    <div className="px-2 pb-2 space-y-1.5 pt-1 bg-white border-t border-slate-100">
                      {sisterConcerns.map((concern) => (
                        <Link
                          key={concern.id}
                          href={`/sister-concerns/${concern.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="min-h-[48px] flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-700 transition-colors border border-slate-100"
                        >
                          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 border border-slate-200 p-1 shadow-2xs">
                            {concern.logo ? (
                              <div className="relative w-full h-full">
                                <Image
                                  src={concern.logo}
                                  alt={concern.name}
                                  fill
                                  className="object-contain"
                                  unoptimized
                                />
                              </div>
                            ) : (
                              iconMap[concern.iconName] || (
                                <Zap className="w-4 h-4 text-[#F37021]" />
                              )
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-bold text-sm block text-slate-900 truncate">
                              {concern.name}
                            </span>
                            <span className="text-xs text-slate-500 block truncate">
                              {concern.sector}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-base font-bold transition-colors ${
                    pathname === "/projects"
                      ? "text-[#F37021] bg-orange-50"
                      : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  Projects
                </Link>

                <Link
                  href="/#video-gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[44px] flex items-center px-4 py-2.5 rounded-xl text-base font-bold transition-colors text-slate-800 hover:bg-slate-100"
                >
                  Media Gallery
                </Link>
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-col space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (config?.branding?.brochurePdf) {
                      window.open(config.branding.brochurePdf, "_blank");
                    } else {
                      window.dispatchEvent(new CustomEvent("open-brochure-modal"));
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-150 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                >
                  <FileText className="w-4 h-4 text-[#F37021]" />
                  <span>Company Brochure</span>
                </button>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full min-h-[46px] flex items-center justify-center rounded-xl bg-[#F37021] hover:bg-[#DE5F12] text-white font-bold text-sm shadow-md transition-all active:scale-98"
                >
                  Contact Corporate Office
                </Link>
                <div className="text-xs text-slate-600 flex flex-col gap-1.5 px-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#F37021]" />
                    <span>Dhaka Corporate Hotline:</span>
                  </span>
                  <a
                    href={`tel:${hotline}`}
                    className="text-sm font-extrabold text-[#0F2557] hover:text-[#F37021] transition-colors"
                  >
                    {hotline}
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="text-xs text-slate-500 hover:text-slate-900 transition-colors truncate"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
