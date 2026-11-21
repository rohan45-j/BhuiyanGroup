"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface HeroImageSliderProps {
  images: string[];
  alt?: string;
  autoSlideInterval?: number; // in seconds
  hasAnyTextContent?: boolean;
}

export default function HeroImageSlider({
  images = [],
  alt = "Bhuiyan Group National Infrastructure",
  autoSlideInterval = 5,
  hasAnyTextContent = false,
}: HeroImageSliderProps) {
  const validImages = images.filter((img) => Boolean(img && img.trim()));
  const slideList =
    validImages.length > 0
      ? validImages
      : ["/img/bhuiyan-group-logo-horizontal.png"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = slideList.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-slide effect
  useEffect(() => {
    if (total <= 1 || isPaused || autoSlideInterval <= 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, autoSlideInterval * 1000);
    return () => clearInterval(interval);
  }, [total, isPaused, autoSlideInterval, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    if (total <= 1) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total, prevSlide, nextSlide]);

  return (
    <div
      className={`relative w-full overflow-hidden select-none bg-[#0A1B40] ${
        hasAnyTextContent
          ? "absolute inset-0 z-0"
          : "w-full min-h-[200px] xs:min-h-[230px] sm:min-h-[320px] md:min-h-[420px] lg:min-h-[520px] aspect-[1600/541]"
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides with Smooth Crossfade Animation */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#0A1B40]"
        >
          {/* Ambient blurred backdrop on mobile so 100% of any aspect-ratio image fits cleanly without black bars */}
          <div className="absolute inset-0 w-full h-full overflow-hidden sm:hidden pointer-events-none" aria-hidden="true">
            <Image
              src={slideList[currentIndex]}
              alt=""
              fill
              className="w-full h-full object-cover blur-2xl opacity-40 scale-125"
              unoptimized
            />
            <div className="absolute inset-0 bg-[#0A1B40]/30" />
          </div>

          {/* Main Hero Slide Image: object-contain on mobile ensures 100% full visibility of the entire image on ANY mobile device, and object-cover on sm+ desktop/tablet */}
          <Image
            src={slideList[currentIndex]}
            alt={`${alt} - Slide ${currentIndex + 1}`}
            fill
            className="w-full h-full object-contain sm:object-cover object-center filter brightness-[0.98] contrast-[1.02]"
            priority
            sizes="100vw"
            unoptimized
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (Visible if more than 1 image) */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous slide"
            className="absolute left-1.5 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#F37021] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-105 shadow-xl cursor-pointer"
            title="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next slide"
            className="absolute right-1.5 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#F37021] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-105 shadow-xl cursor-pointer"
            title="Next Slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Bottom Dots & Counter Bar */}
          <div className="absolute bottom-2.5 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-xl">
            {slideList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? "w-5 sm:w-8 h-1.5 sm:h-2 bg-[#F37021] shadow-[0_0_8px_#F37021]"
                    : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
            <span className="text-[10px] sm:text-[11px] font-mono text-white/90 ml-1 font-bold tracking-wider">
              {currentIndex + 1}/{total}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsPaused(!isPaused);
              }}
              className="ml-0.5 sm:ml-1 p-0.5 text-white/70 hover:text-white transition-colors cursor-pointer"
              title={isPaused ? "Play Auto-Slide" : "Pause Auto-Slide"}
            >
              {isPaused ? <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" /> : <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-400" />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

