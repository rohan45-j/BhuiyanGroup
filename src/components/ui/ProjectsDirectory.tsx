"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  Building2,
  FileText,
  Download,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  X,
  Layers,
  ChevronRight,
  Printer,
  Eye,
} from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  status: "completed" | "ongoing" | "upcoming";
  sector: string;
  concern: string;
  client: string;
  location: string;
  specs: string;
  year: string;
  progress?: number;
  imageUrl: string;
  pdfAttachment?: string;
  pdfTitle?: string;
}

interface ProjectsDirectoryProps {
  initialProjects?: ProjectItem[];
}

export default function ProjectsDirectory({
  initialProjects = [],
}: ProjectsDirectoryProps) {
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "completed" | "ongoing" | "upcoming"
  >("all");
  const [selectedConcern, setSelectedConcern] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [activePdfModal, setActivePdfModal] = useState<{
    url: string;
    title: string;
    projectTitle: string;
  } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePdfModal(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = initialProjects.length;
    const completed = initialProjects.filter((p) => p.status === "completed").length;
    const ongoing = initialProjects.filter((p) => p.status === "ongoing").length;
    const upcoming = initialProjects.filter((p) => p.status === "upcoming").length;
    return { total, completed, ongoing, upcoming };
  }, [initialProjects]);

  // Unique concerns list
  const concernsList = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.concern) set.add(p.concern);
    });
    return Array.from(set);
  }, [initialProjects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      // Status filter
      if (selectedStatus !== "all" && p.status !== selectedStatus) return false;

      // Concern filter
      if (selectedConcern !== "all" && p.concern !== selectedConcern) return false;

      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchClient = p.client.toLowerCase().includes(query);
        const matchLocation = p.location.toLowerCase().includes(query);
        const matchSector = p.sector.toLowerCase().includes(query);
        const matchSpecs = p.specs.toLowerCase().includes(query);
        const matchConcern = p.concern.toLowerCase().includes(query);
        if (!matchTitle && !matchClient && !matchLocation && !matchSector && !matchSpecs && !matchConcern) {
          return false;
        }
      }

      return true;
    });
  }, [initialProjects, selectedStatus, selectedConcern, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Aggregate Stats Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <button
          type="button"
          onClick={() => setSelectedStatus("all")}
          className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedStatus === "all"
              ? "bg-[#0F2557] text-white border-[#0F2557] shadow-lg ring-2 ring-[#0F2557]/20"
              : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">
              Total Projects
            </span>
            <Layers className={`w-4 h-4 ${selectedStatus === "all" ? "text-orange-400" : "text-slate-400"}`} />
          </div>
          <div className="text-2xl sm:text-3xl font-black mt-2">
            {stats.total}
          </div>
          <p className="text-[11px] opacity-70 mt-1">Commissioned & In-Pipeline</p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus("completed")}
          className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedStatus === "completed"
              ? "bg-emerald-800 text-white border-emerald-800 shadow-lg ring-2 ring-emerald-500/20"
              : "bg-white text-slate-800 border-slate-200 hover:border-emerald-200 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Completed Projects
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black mt-2 text-emerald-700 dark:text-white">
            {stats.completed}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Successfully Delivered</p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus("ongoing")}
          className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedStatus === "ongoing"
              ? "bg-amber-700 text-white border-amber-700 shadow-lg ring-2 ring-amber-500/20"
              : "bg-white text-slate-800 border-slate-200 hover:border-amber-200 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              On-Going Projects
            </span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black mt-2 text-amber-700 dark:text-white">
            {stats.ongoing}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Active Site Works</p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus("upcoming")}
          className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedStatus === "upcoming"
              ? "bg-sky-800 text-white border-sky-800 shadow-lg ring-2 ring-sky-500/20"
              : "bg-white text-slate-800 border-slate-200 hover:border-sky-200 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Upcoming Projects
            </span>
            <Clock className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black mt-2 text-sky-700 dark:text-white">
            {stats.upcoming}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Engineering Pipeline</p>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setSelectedStatus("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedStatus === "all"
                ? "bg-[#0F2557] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Deliveries ({stats.total})
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatus("completed")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedStatus === "completed"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed ({stats.completed})</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatus("ongoing")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedStatus === "ongoing"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>On-Going ({stats.ongoing})</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatus("upcoming")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedStatus === "upcoming"
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-sky-50 text-sky-700 hover:bg-sky-100"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Upcoming ({stats.upcoming})</span>
          </button>
        </div>

        {/* Dropdowns & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Subsidiary Filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedConcern}
              onChange={(e) => setSelectedConcern(e.target.value)}
              className="w-full sm:w-48 appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[#0F2557]"
            >
              <option value="all">All Subsidiaries</option>
              {concernsList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-56">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl pl-9 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0F2557]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <Layers className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">No Projects Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No projects matched your selected filter or search query. Try resetting your search or selecting a different status.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedStatus("all");
              setSelectedConcern("all");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl bg-[#0F2557] text-white text-xs font-bold hover:bg-[#1A3978] transition-colors mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((p) => {
            const isCompleted = p.status === "completed";
            const isOngoing = p.status === "ongoing";
            const isUpcoming = p.status === "upcoming";

            return (
              <div
                key={p.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0F2557]/40 transition-all duration-300 flex flex-col"
              >
                {/* Project Image Banner */}
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={p.imageUrl || "/img/radial-power-logo.jpg"}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600/90 text-white backdrop-blur-md shadow-md border border-emerald-400/40">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    )}
                    {isOngoing && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/90 text-white backdrop-blur-md shadow-md border border-amber-300/40">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span>On-Going ({p.progress ?? 65}%)</span>
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-sky-600/90 text-white backdrop-blur-md shadow-md border border-sky-300/40">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Upcoming</span>
                      </span>
                    )}
                  </div>

                  {/* Year / Timeline Badge */}
                  <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 text-white backdrop-blur-md border border-white/20">
                    {p.year}
                  </div>

                  {/* Concern / Sector Overlay at Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-white">
                    <span className="font-bold text-orange-300 truncate pr-2">
                      {p.concern}
                    </span>
                    <span className="text-[10px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-white font-medium shrink-0">
                      {p.sector}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-base sm:text-lg text-[#0F2557] group-hover:text-[#F37021] transition-colors line-clamp-2 leading-snug">
                      {p.title}
                    </h3>

                    <div className="space-y-1 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-[#F37021] shrink-0" />
                        <span className="font-medium truncate">{p.client}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-slate-500 truncate">{p.location}</span>
                      </div>
                    </div>

                    {/* Progress Bar for Ongoing */}
                    {isOngoing && p.progress !== undefined && (
                      <div className="pt-2">
                        <div className="flex justify-between text-[11px] font-bold text-amber-700 mb-1">
                          <span>Construction & Commissioning</span>
                          <span>{p.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Technical Scope Box */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 mt-2">
                      <strong className="text-slate-800 block text-[11px] uppercase tracking-wider mb-0.5">
                        Scope & Key Systems:
                      </strong>
                      <p className="line-clamp-2 leading-relaxed">{p.specs}</p>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    {/* PDF Attachment Preview & Download Button */}
                    {p.pdfAttachment ? (
                      <button
                        type="button"
                        onClick={() =>
                          setActivePdfModal({
                            url: p.pdfAttachment!,
                            title: p.pdfTitle || "Technical Specifications & Engineering Layout",
                            projectTitle: p.title,
                          })
                        }
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 font-bold text-xs transition-colors cursor-pointer"
                        title="Click to Preview, Read & Print PDF Document"
                      >
                        <FileText className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span className="truncate">
                          {p.pdfTitle ? p.pdfTitle : "Preview & Read Project PDF"}
                        </span>
                        <Eye className="w-3.5 h-3.5 text-rose-500 shrink-0 ml-auto" />
                      </button>
                    ) : null}

                    {/* Quick View Modal Trigger */}
                    <button
                      type="button"
                      onClick={() => setActiveProjectModal(p)}
                      className="w-full inline-flex items-center justify-between text-xs font-bold text-[#0F2557] hover:text-[#F37021] py-1 cursor-pointer transition-colors group/btn"
                    >
                      <span>Explore Technical Scope & Credentials</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProjectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProjectModal(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden my-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Status Header */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F37021] bg-[#FFF4EC] px-3 py-0.5 rounded-full">
                  {activeProjectModal.concern}
                </span>
                <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-0.5 rounded-full">
                  {activeProjectModal.sector}
                </span>
                <span
                  className={`text-[11px] font-bold px-3 py-0.5 rounded-full ${
                    activeProjectModal.status === "completed"
                      ? "bg-emerald-100 text-emerald-800"
                      : activeProjectModal.status === "ongoing"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-sky-100 text-sky-800"
                  }`}
                >
                  {activeProjectModal.status.toUpperCase()}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#0F2557]">
                {activeProjectModal.title}
              </h2>

              <div className="grid grid-cols-2 gap-3 py-4 my-4 border-y border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Client Enterprise:</span>
                  <strong className="text-slate-800 text-sm mt-0.5 block">{activeProjectModal.client}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Deployment Location:</span>
                  <strong className="text-slate-800 text-sm mt-0.5 block">{activeProjectModal.location}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Delivery Timeline:</span>
                  <strong className="text-slate-800 text-sm mt-0.5 block">{activeProjectModal.year}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Group Subsidiary:</span>
                  <strong className="text-[#F37021] text-sm mt-0.5 block">{activeProjectModal.concern}</strong>
                </div>
              </div>

              {/* Technical Scope */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Detailed Engineering Scope & Technical Deliverables
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {activeProjectModal.specs}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                {activeProjectModal.pdfAttachment && (
                  <button
                    type="button"
                    onClick={() => {
                      setActivePdfModal({
                        url: activeProjectModal.pdfAttachment!,
                        title: activeProjectModal.pdfTitle || "Project Specifications & Engineering Scope",
                        projectTitle: activeProjectModal.title,
                      });
                    }}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Preview & Read PDF (Print / Download)</span>
                  </button>
                )}
                <Link
                  href="/contact"
                  onClick={() => setActiveProjectModal(null)}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#0F2557] hover:bg-[#1A3978] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Request Similar Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* In-Tab PDF Preview, Read, Print & Download Modal */}
      <AnimatePresence>
        {activePdfModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePdfModal(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-5xl w-full h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200/90"
            >
              {/* PDF Modal Header */}
              <div className="bg-[#0F2557] text-white px-5 sm:px-7 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
                    <FileText className="w-5 h-5 text-rose-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#F37021] bg-white/10 px-2 py-0.5 rounded">
                        PDF Document
                      </span>
                      <span className="text-[11px] text-slate-300 truncate">
                        {activePdfModal.projectTitle}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white truncate">
                      {activePdfModal.title}
                    </h3>
                  </div>
                </div>

                {/* Print, Download, Full Window, Close Buttons */}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => {
                      const iframe = document.getElementById("active-pdf-frame") as HTMLIFrameElement;
                      if (iframe?.contentWindow) {
                        iframe.contentWindow.focus();
                        iframe.contentWindow.print();
                      } else {
                        window.open(activePdfModal.url, "_blank");
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                    title="Print Document"
                  >
                    <Printer className="w-3.5 h-3.5 text-orange-400" />
                    <span className="hidden sm:inline">Print</span>
                  </button>

                  <a
                    href={activePdfModal.url}
                    download
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F37021] hover:bg-[#DE5F12] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                    title="Download PDF to Device"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>

                  <a
                    href={activePdfModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Open in New Tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setActivePdfModal(null)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/80 text-white transition-colors ml-1 cursor-pointer"
                    title="Close Preview"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Embedded Document Viewer (Iframe with Native PDF Reader Controls) */}
              <div className="flex-1 bg-slate-900 relative w-full h-full">
                <iframe
                  id="active-pdf-frame"
                  src={`${activePdfModal.url}#toolbar=1&navpanes=0`}
                  title={activePdfModal.title}
                  className="w-full h-full border-0"
                />
              </div>

              {/* PDF Footer Status Bar */}
              <div className="px-5 py-2.5 bg-slate-100 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between shrink-0">
                <span className="truncate text-[11px] text-slate-500">
                  Document Path: <strong className="text-slate-700 font-mono">{activePdfModal.url}</strong>
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  Press ESC or click Outside to Exit Reader
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
