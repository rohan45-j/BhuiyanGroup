"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Pause, Play } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export interface GalleryImageItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
}

export default function ImageGallerySection() {
  const { config } = useSiteConfig();
  const gallery = config?.imageGallery;
  const images: GalleryImageItem[] = gallery?.images || [];

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImageItem | null>(null);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    images.forEach((img) => {
      if (img.category && img.category.trim()) {
        cats.add(img.category.trim());
      }
    });
    return ["All", ...Array.from(cats)];
  }, [images]);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  // Split images into two dynamic rows for dual-directional auto-scrolling
  const { row1, row2 } = useMemo(() => {
    if (filteredImages.length === 0) return { row1: [], row2: [] };
    if (filteredImages.length <= 3) {
      return { row1: filteredImages, row2: filteredImages };
    }
    const mid = Math.ceil(filteredImages.length / 2);
    const firstHalf = filteredImages.slice(0, mid);
    const secondHalf = filteredImages.slice(mid);
    return { row1: firstHalf, row2: secondHalf.length > 0 ? secondHalf : firstHalf };
  }, [filteredImages]);

  // Ensure minimum elements for seamless infinite marquee loop (repeat at least 4 times)
  const row1Repeated = useMemo(() => {
    if (row1.length === 0) return [];
    let list: GalleryImageItem[] = [];
    while (list.length < 12) {
      list = [...list, ...row1];
    }
    return list;
  }, [row1]);

  const row2Repeated = useMemo(() => {
    if (row2.length === 0) return [];
    let list: GalleryImageItem[] = [];
    while (list.length < 12) {
      list = [...list, ...row2];
    }
    return list;
  }, [row2]);

  const handleNext = useCallback(() => {
    if (!selectedImage) return;
    const currentIdx = filteredImages.findIndex((img) => img.id === selectedImage.id);
    if (currentIdx === -1) return;
    const nextIdx = (currentIdx + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIdx]);
  }, [selectedImage, filteredImages]);

  const handlePrev = useCallback(() => {
    if (!selectedImage) return;
    const currentIdx = filteredImages.findIndex((img) => img.id === selectedImage.id);
    if (currentIdx === -1) return;
    const prevIdx = (currentIdx - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIdx]);
  }, [selectedImage, filteredImages]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImage, handleNext, handlePrev]);

  if (!gallery || (gallery as any).enabled === false || !images || images.length === 0) return null;

  return (
    <section id="image-gallery" className="py-14 sm:py-20 lg:py-24 bg-[#F8FAFC] relative border-b border-slate-200 overflow-hidden">
      <style jsx>{`
        @keyframes marquee-row-1 {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-row-2 {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-row-1 {
          display: flex;
          width: max-content;
          animation: marquee-row-1 45s linear infinite;
        }
        .animate-marquee-row-2 {
          display: flex;
          width: max-content;
          animation: marquee-row-2 45s linear infinite;
        }
        .animate-marquee-row-1:hover,
        .animate-marquee-row-2:hover,
        .marquee-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F37021] bg-[#FFF4EC] px-3.5 py-1.5 rounded-full border border-[#F37021]/20 inline-flex items-center gap-2 shadow-xs">
              <Camera className="w-3.5 h-3.5 text-[#F37021]" />
              <span>{gallery?.badgeText || "Operational Excellence & Infrastructure"}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0F2557] tracking-tight">
              {gallery?.headline || "Corporate & Project Photo Gallery"}
            </h2>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              {gallery?.description ||
                "A visual journey through our industrial power plants, solar installations, electrical substations, and manufacturing hubs across the nation."}
            </p>
          </div>

          {/* Controls: Category Filter Pills & Pause Toggle */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {categories.length > 2 && (
              <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setSelectedImage(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#0F2557] text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsMarqueePaused(!isMarqueePaused)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
              title={isMarqueePaused ? "Resume Auto-scroll" : "Pause Auto-scroll"}
            >
              {isMarqueePaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#F37021] fill-[#F37021]" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Auto-scroll</span>
                  <Pause className="w-3 h-3 text-slate-500" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Dual Row Continuous Auto-Scrolling Tracks */}
      <div className="space-y-5 sm:space-y-6 w-full overflow-hidden select-none">
        {/* ROW 1: Auto-scrolling from Left to Right (or forward continuous loop) */}
        <div className="w-full overflow-hidden flex">
          <div
            className={`animate-marquee-row-1 gap-5 sm:gap-6 ${
              isMarqueePaused ? "marquee-paused" : ""
            }`}
          >
            {row1Repeated.map((img, idx) => (
              <div
                key={`r1-${img.id || idx}-${idx}`}
                onClick={() => setSelectedImage(img)}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-md hover:shadow-2xl hover:border-[#F37021]/60 transition-all duration-300 cursor-pointer w-[280px] xs:w-[320px] sm:w-[440px] md:w-[500px] lg:w-[560px] aspect-[16/10] shrink-0"
              >
                <Image
                  src={img.imageUrl}
                  alt={img.title || "Gallery photo"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 500px, 560px"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                  <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-orange-300 border border-white/15 shadow-sm">
                    {img.category || "Project"}
                  </span>
                </div>

                {/* Hover Expand Icon */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-10">
                  {img.title && (
                    <h3 className="text-sm sm:text-lg font-bold text-white group-hover:text-orange-200 transition-colors line-clamp-1">
                      {img.title}
                    </h3>
                  )}
                  {img.description && (
                    <p className="text-[11px] sm:text-sm text-slate-200 mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed">
                      {img.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Auto-scrolling in the Reverse Direction (Right to Left) */}
        <div className="w-full overflow-hidden flex">
          <div
            className={`animate-marquee-row-2 gap-4 sm:gap-6 ${
              isMarqueePaused ? "marquee-paused" : ""
            }`}
          >
            {row2Repeated.map((img, idx) => (
              <div
                key={`r2-${img.id || idx}-${idx}`}
                onClick={() => setSelectedImage(img)}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-md hover:shadow-2xl hover:border-[#F37021]/60 transition-all duration-300 cursor-pointer w-[280px] xs:w-[320px] sm:w-[440px] md:w-[500px] lg:w-[560px] aspect-[16/10] shrink-0"
              >
                <Image
                  src={img.imageUrl}
                  alt={img.title || "Gallery photo"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 500px, 560px"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                  <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-orange-300 border border-white/15 shadow-sm">
                    {img.category || "Project"}
                  </span>
                </div>

                {/* Hover Expand Icon */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-10">
                  {img.title && (
                    <h3 className="text-sm sm:text-lg font-bold text-white group-hover:text-orange-200 transition-colors line-clamp-1">
                      {img.title}
                    </h3>
                  )}
                  {img.description && (
                    <p className="text-[11px] sm:text-sm text-slate-200 mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed">
                      {img.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white/80 hover:text-white p-2 sm:p-2.5 rounded-full hover:bg-white/10 transition-colors z-20 cursor-pointer"
              aria-label="Close image lightbox"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Prev / Next Navigation Arrows */}
            {filteredImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all z-20 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all z-20 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            {/* Modal Image Box */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            >
              <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden shadow-2xl bg-black/40">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                  unoptimized
                />
              </div>

              {/* Caption Under Image */}
              <div className="mt-4 text-center max-w-2xl text-white">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-orange-400 mb-1">
                  <span>{selectedImage.category || "Project Field Photo"}</span>
                  <span>•</span>
                  <span>Bhuiyan Group Engineering</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">
                  {selectedImage.title}
                </h3>
                {selectedImage.description && (
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {selectedImage.description}
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
