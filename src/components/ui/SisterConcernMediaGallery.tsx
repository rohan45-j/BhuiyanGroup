"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Film, Play, X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from "lucide-react";

export interface ConcernImage {
  id: string;
  title: string;
  imageUrl: string;
  caption?: string;
}

export interface ConcernVideo {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  caption?: string;
}

interface SisterConcernMediaGalleryProps {
  galleryImages?: ConcernImage[];
  galleryVideos?: ConcernVideo[];
  concernName: string;
}

export default function SisterConcernMediaGallery({
  galleryImages = [],
  galleryVideos = [],
  concernName,
}: SisterConcernMediaGalleryProps) {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<ConcernVideo | null>(null);

  const hasPhotos = galleryImages && galleryImages.length > 0;
  const hasVideos = galleryVideos && galleryVideos.length > 0;

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
      if (activeVideo !== null && e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImageIdx, activeVideo, handleNextImage, handlePrevImage]);

  if (!hasPhotos && !hasVideos) return null;

  const isDirectVideo = (url: string) => {
    return (
      url.endsWith(".mp4") ||
      url.endsWith(".webm") ||
      url.endsWith(".ogg") ||
      url.includes("/uploads/") ||
      url.includes(".mp4")
    );
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/") + "?autoplay=1";
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/") + "?autoplay=1";
    }
    if (url.includes("vimeo.com/")) {
      return url.replace("vimeo.com/", "player.vimeo.com/video/") + "?autoplay=1";
    }
    return url;
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm space-y-6">
      {/* Gallery Header with Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#F37021] block">
            Media & Field Documentation
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F2557] mt-0.5">
            {concernName} Media Gallery
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl self-start sm:self-auto">
          {hasPhotos && (
            <button
              type="button"
              onClick={() => setActiveTab("photos")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "photos"
                  ? "bg-[#0F2557] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photos ({galleryImages.length})</span>
            </button>
          )}

          {hasVideos && (
            <button
              type="button"
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "videos"
                  ? "bg-[#0F2557] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Videos ({galleryVideos.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Photos View */}
      {activeTab === "photos" && hasPhotos && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={img.id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => setSelectedImageIdx(idx)}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100 shadow-xs hover:shadow-xl hover:border-[#F37021]/50 transition-all duration-300 cursor-pointer"
            >
              <Image
                src={img.imageUrl}
                alt={img.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
                <h4 className="text-xs sm:text-sm font-bold truncate group-hover:text-orange-300 transition-colors">
                  {img.title}
                </h4>
                {img.caption && (
                  <p className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                    {img.caption}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Videos View */}
      {activeTab === "videos" && hasVideos && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {galleryVideos.map((vid, idx) => (
            <motion.div
              key={vid.id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => setActiveVideo(vid)}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                {vid.thumbnailUrl ? (
                  <Image
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0F2557] to-[#0A1B40]">
                    <Film className="w-10 h-10 text-white/30" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#F37021] text-white flex items-center justify-center shadow-lg shadow-black/40 group-hover:scale-110 group-hover:bg-[#DE5F12] transition-all">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white flex-1 flex flex-col justify-between border-t border-slate-100">
                <div>
                  <h4 className="text-sm font-bold text-[#0F2557] group-hover:text-[#F37021] transition-colors line-clamp-1">
                    {vid.title}
                  </h4>
                  {vid.caption && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {vid.caption}
                    </p>
                  )}
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-bold text-[#F37021] flex items-center gap-1">
                    <Play className="w-3 h-3 fill-[#F37021]" /> Watch Reel
                  </span>
                  <span>Full HD</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox for Photos */}
      <AnimatePresence>
        {selectedImageIdx !== null && galleryImages[selectedImageIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelectedImageIdx(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedImageIdx(null)}
              className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F37021] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 hover:bg-[#F37021] text-white backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer shadow-xl"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 hover:bg-[#F37021] text-white backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer shadow-xl"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <motion.div
              key={selectedImageIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden bg-black/40">
                <Image
                  src={galleryImages[selectedImageIdx].imageUrl}
                  alt={galleryImages[selectedImageIdx].title}
                  fill
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
              <div className="mt-4 text-center max-w-2xl px-4 text-white">
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  {selectedImageIdx + 1} / {galleryImages.length}
                </span>
                <h4 className="text-base font-bold">
                  {galleryImages[selectedImageIdx].title}
                </h4>
                {galleryImages[selectedImageIdx].caption && (
                  <p className="text-xs text-slate-300 mt-1">
                    {galleryImages[selectedImageIdx].caption}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for Videos */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-[#0A1B40]">
                <h4 className="text-sm sm:text-base font-bold text-white truncate pr-4">
                  {activeVideo.title}
                </h4>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black">
                {isDirectVideo(activeVideo.videoUrl) ? (
                  <video
                    src={activeVideo.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={getEmbedUrl(activeVideo.videoUrl)}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                )}
              </div>

              {activeVideo.caption && (
                <div className="p-4 bg-slate-950 text-xs sm:text-sm text-slate-300 border-t border-white/10">
                  <p>{activeVideo.caption}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
