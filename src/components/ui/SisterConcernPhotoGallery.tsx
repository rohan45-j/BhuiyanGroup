"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Pause, Play } from "lucide-react";

export interface ConcernImage {
  id: string;
  title: string;
  imageUrl: string;
  caption?: string;
  tag?: string;
  category?: string;
}

interface SisterConcernPhotoGalleryProps {
  galleryImages?: ConcernImage[];
  concernName: string;
}

export default function SisterConcernPhotoGallery({
  galleryImages = [],
  concernName,
}: SisterConcernPhotoGalleryProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hasPhotos = galleryImages && galleryImages.length > 0;

  const handleNextImage = useCallback(() => {
    if (selectedImageIdx === null) return;
    setSelectedImageIdx((prev) => ((prev ?? 0) + 1) % galleryImages.length);
  }, [selectedImageIdx, galleryImages.length]);

  const handlePrevImage = useCallback(() => {
    if (selectedImageIdx === null) return;
    setSelectedImageIdx((prev) => ((prev ?? 0) - 1 + galleryImages.length) % galleryImages.length);
  }, [selectedImageIdx, galleryImages.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIdx !== null) {
        if (e.key === "Escape") setSelectedImageIdx(null);
        if (e.key === "ArrowRight") handleNextImage();
        if (e.key === "ArrowLeft") handlePrevImage();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImageIdx, handleNextImage, handlePrevImage]);

  // Smooth continuous auto-scroll logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !hasPhotos || galleryImages.length < 2) return;

    // Clear previous timer
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
    }

    if (!isAutoScrollEnabled || isHovered || isManualScrolling) {
      return;
    }

    const scrollSpeed = 1; // 1px smooth scroll
    const intervalMs = 28; // ~35fps silky smooth auto-scroll

    autoScrollTimerRef.current = setInterval(() => {
      if (container) {
        // If scrolled near the end, wrap smoothly to start
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 8) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollSpeed;
        }
      }
    }, intervalMs);

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isAutoScrollEnabled, isHovered, isManualScrolling, hasPhotos, galleryImages.length]);

  const manualScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Temporarily halt auto-scroll so user can view requested position
    setIsManualScrolling(true);
    if (manualTimeoutRef.current) {
      clearTimeout(manualTimeoutRef.current);
    }

    const cardWidth = 360;
    if (direction === "left") {
      if (container.scrollLeft <= 10) {
        // Wrap to end if at beginning
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        // Wrap to start if at end
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }

    // Resume auto-scroll after 3.5 seconds
    manualTimeoutRef.current = setTimeout(() => {
      setIsManualScrolling(false);
    }, 3500);
  };

  if (!hasPhotos) return null;

  return (
    <section className="w-full bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#F37021] bg-[#FFF4EC] px-3 py-1 rounded-full border border-orange-200/50">
              <Camera className="w-3.5 h-3.5" />
              <span>SUBSIDIARY PHOTO ARCHIVE & SITE WORKS</span>
            </span>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {galleryImages.length} Photographs
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F2557] tracking-tight">
            {concernName} Image Gallery
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            High-resolution photographic documentation of field deployments, precision equipment, and engineering infrastructure.
          </p>
        </div>

        {/* Controls: Auto-scroll Toggle & Left/Right Navigation Arrows */}
        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0 bg-slate-50 p-1.5 rounded-2xl border border-slate-200/80 shadow-2xs">
          {/* Auto-scroll Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setIsAutoScrollEnabled(!isAutoScrollEnabled);
              setIsManualScrolling(false);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isAutoScrollEnabled
                ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs"
                : "bg-white hover:bg-slate-200/80 text-slate-700 border border-slate-300 shadow-2xs"
            }`}
            title={isAutoScrollEnabled ? "Click to Pause Auto-scroll" : "Click to Resume Auto-scroll"}
          >
            {isAutoScrollEnabled ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Auto-scrolling ON</span>
                <Pause className="w-3 h-3 text-emerald-600 ml-0.5" />
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#F37021] fill-[#F37021]" />
                <span>Auto-scroll PAUSED</span>
              </>
            )}
          </button>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => manualScroll("left")}
            className="w-10 h-10 rounded-xl bg-[#0F2557] hover:bg-[#F37021] text-white flex items-center justify-center transition-all duration-200 shadow-xs active:scale-90 cursor-pointer"
            aria-label="Scroll left"
            title="Slide Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => manualScroll("right")}
            className="w-10 h-10 rounded-xl bg-[#0F2557] hover:bg-[#F37021] text-white flex items-center justify-center transition-all duration-200 shadow-xs active:scale-90 cursor-pointer"
            aria-label="Scroll right"
            title="Slide Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Auto-scrolling Gallery Row (Full Width - Native Scrollbar Hidden) */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-5 sm:gap-6 overflow-x-auto pb-2 scroll-smooth cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {galleryImages.map((img, idx) => (
          <div
            key={img.id || idx}
            onClick={() => setSelectedImageIdx(idx)}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 aspect-[16/10] w-[340px] sm:w-[440px] md:w-[500px] lg:w-[560px] shrink-0 bg-slate-100 shadow-md hover:shadow-2xl hover:border-[#F37021]/60 transition-all duration-300 cursor-pointer"
          >
            <Image
              src={img.imageUrl}
              alt={img.title || "Gallery photo"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 340px, (max-width: 1024px) 500px, 560px"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Hover Expand Icon */}
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-md">
              <Maximize2 className="w-4 h-4" />
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
              {img.tag !== "" && (
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-300 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F37021]" />
                  <span>{img.tag || img.category || "Field Documentation"}</span>
                </div>
              )}
              {img.title && (
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-orange-200 line-clamp-1 transition-colors">
                  {img.title}
                </h3>
              )}
              {img.caption && (
                <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 mt-1 leading-relaxed">
                  {img.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIdx !== null && galleryImages[selectedImageIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIdx(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedImageIdx(null)}
                className="absolute -top-12 right-0 sm:right-2 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-20 cursor-pointer"
                aria-label="Close image lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev / Next Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all z-20 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all z-20 cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Large Image Frame */}
              <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden shadow-2xl bg-black/50">
                <Image
                  src={galleryImages[selectedImageIdx].imageUrl}
                  alt={galleryImages[selectedImageIdx].title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                  unoptimized
                />
              </div>

              {/* Lightbox Caption */}
              <div className="mt-4 text-center max-w-2xl text-white">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-orange-400 mb-1">
                  <span>
                    Photo {selectedImageIdx + 1} of {galleryImages.length}
                  </span>
                  <span>•</span>
                  <span>{concernName}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">
                  {galleryImages[selectedImageIdx].title}
                </h3>
                {galleryImages[selectedImageIdx].caption && (
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {galleryImages[selectedImageIdx].caption}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
