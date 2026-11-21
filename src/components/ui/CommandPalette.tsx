"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Building2,
  Briefcase,
  Layers,
  ArrowRight,
  FileSpreadsheet,
} from "lucide-react";
import { companyData } from "@/data/companyData";
import { useSiteConfig } from "@/context/SiteConfigContext";

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Sister Concern" | "Sector" | "Page" | "Action";
  href: string;
  action?: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { siteConfig } = useSiteConfig();

  const concernsList = Array.isArray(siteConfig?.sisterConcerns) && siteConfig.sisterConcerns.length > 0
    ? siteConfig.sisterConcerns
    : companyData.sisterConcerns;

  const rawSectors = (siteConfig as any)?.coreSectors?.sectors || (siteConfig as any)?.sectors || companyData.coreSectors;
  const sectorsList = Array.isArray(rawSectors) ? rawSectors : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-search", handleOpen);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-search", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const searchIndex: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [
      {
        id: "act-quote",
        title: "Request a Proposal / Quotation (RFP)",
        subtitle: "Submit project specifications for 24h engineering turnaround",
        category: "Action",
        href: "#quote",
        action: () => {
          setIsOpen(false);
          window.dispatchEvent(new CustomEvent("open-quote-modal"));
        }
      },
      {
        id: "act-contact",
        title: "Contact Corporate Headquarters",
        subtitle: "Direct telephone, hotline, and Dhaka office location",
        category: "Action",
        href: "/contact"
      },
      {
        id: "page-about",
        title: "About Bhuiyan Group & Leadership",
        subtitle: "25+ years of engineering heritage and chairman message",
        category: "Page",
        href: "/about"
      },
      {
        id: "page-projects",
        title: "National Infrastructure Projects Portfolio",
        subtitle: "Power plants, substations, solar parks & hydraulic installations",
        category: "Page",
        href: "/projects"
      },
      {
        id: "page-concerns",
        title: "Sister Concerns Strategic Portfolio",
        subtitle: "Browse all 5 specialized autonomous operating divisions",
        category: "Page",
        href: "/sister-concerns"
      }
    ];

    if (Array.isArray(concernsList)) {
      concernsList.forEach((c: any) => {
        items.push({
          id: `concern-${c.id}`,
          title: c.name,
          subtitle: `${c.sector || ""} • ${c.tagline || ""}`,
          category: "Sister Concern",
          href: `/sister-concerns/${c.slug}`
        });
      });
    }

    if (Array.isArray(sectorsList)) {
      sectorsList.forEach((s: any) => {
        items.push({
          id: `sector-${s.id}`,
          title: `${s.title} Engineering`,
          subtitle: (s.description || "").slice(0, 80) + "...",
          category: "Sector",
          href: "/#core-sectors"
        });
      });
    }

    return items;
  }, [concernsList, sectorsList]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return searchIndex.slice(0, 8);
    const q = query.toLowerCase();
    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, searchIndex]);

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false);
    setQuery("");
    if (item.action) {
      item.action();
    } else {
      router.push(item.href);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 bg-slate-50/70">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sister concerns, sectors, power projects, or actions..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded-md shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
              <p>No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Try searching for &ldquo;Solar&rdquo;, &ldquo;Substation&rdquo;, &ldquo;Generator&rdquo;, or &ldquo;Quote&rdquo;.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100/90 text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0 pr-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0F2557]/5 group-hover:bg-[#F37021]/10 text-[#0F2557] group-hover:text-[#F37021] flex items-center justify-center shrink-0 transition-colors">
                    {item.category === "Sister Concern" ? (
                      <Building2 className="w-4 h-4" />
                    ) : item.category === "Sector" ? (
                      <Layers className="w-4 h-4" />
                    ) : item.category === "Action" ? (
                      <FileSpreadsheet className="w-4 h-4" />
                    ) : (
                      <Briefcase className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0F2557] truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-200/70 text-slate-600 font-semibold shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#F37021] group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Press <strong className="text-slate-700">Enter</strong> to select</span>
            <span>•</span>
            <span><strong className="text-slate-700">ESC</strong> to close</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">BHUIYAN GROUP ENTERPRISE SEARCH</span>
        </div>
      </div>
    </div>
  );
}
