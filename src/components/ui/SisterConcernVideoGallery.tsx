"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Play, X, Clock, Sparkles, Volume2, VolumeX } from "lucide-react";

export interface ConcernVideo {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  sound?: "sound" | "muted";
}

interface SisterConcernVideoGalleryProps {
  galleryVideos?: ConcernVideo[];
  concernName: string;
}

export default function SisterConcernVideoGallery({
  galleryVideos = [],
  concernName,
}: SisterConcernVideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<ConcernVideo | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const modalVideoRef = React.useRef<HTMLVideoElement>(null);

  const handleOpenVideo = (vid: ConcernVideo) => {
    setIsMuted(vid.sound === "muted");
    setActiveVideo(vid);
  };

  const hasVideos = galleryVideos && galleryVideos.length > 0;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (activeVideo !== null && e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeVideo]);

  if (!hasVideos) return null;

  const isDirectVideo = (url: string) => {
    return (
      url.endsWith(".mp4") ||
      url.endsWith(".webm") ||
      url.endsWith(".ogg") ||
      url.includes("/uploads/") ||
      url.includes(".mp4")
    );
  };

  const getEmbedUrl = (url: string, muted: boolean) => {
    const muteParam = muted ? "&mute=1" : "&mute=0";
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/") + "?autoplay=1" + muteParam;
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/") + "?autoplay=1" + muteParam;
    }
    if (url.includes("vimeo.com/")) {
      return url.replace("vimeo.com/", "player.vimeo.com/video/") + "?autoplay=1" + (muted ? "&muted=1" : "&muted=0");
    }
    return url;
  };

  return (
    <section className="w-full bg-[#0A1B40] rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F37021]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#F37021] bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <Film className="w-3.5 h-3.5" />
              <span>SUBSIDIARY VIDEO DOCUMENTATION & FIELD REELS</span>
            </span>
            <span className="text-xs font-bold text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full">
              {galleryVideos.length} Video{galleryVideos.length > 1 ? "s" : ""}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {concernName} Video Gallery
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Watch high-definition project reels, facility tours, and engineering commissionings in action.
          </p>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {galleryVideos.map((vid, idx) => (
          <motion.div
            key={vid.id || idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            onClick={() => handleOpenVideo(vid)}
            className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-lg hover:border-[#F37021] hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full bg-slate-800 overflow-hidden">
              {vid.thumbnailUrl ? (
                <Image
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0F2557] to-[#0A1B40]">
                  <Film className="w-12 h-12 text-white/30" />
                </div>
              )}

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:opacity-90 transition-opacity" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#F37021] text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#DE5F12] transition-all duration-300">
                  <Play className="w-6 h-6 ml-1 fill-white" />
                </div>
              </div>

              {/* Duration Tag */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-bold text-white flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#F37021]" />
                <span>HD Video</span>
              </div>
            </div>

            {/* Video Details */}
            <div className="p-5 flex-1 flex flex-col justify-between bg-white/[0.04]">
              <div>
                <h3 className="font-bold text-base text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                  {vid.title}
                </h3>
                {vid.caption && (
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {vid.caption}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="text-orange-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Click to Watch Video</span>
                </span>
                <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                  Full Reel
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full flex flex-col items-center"
            >
              {/* Modal Top Controls: Sound Toggle & Close */}
              <div className="absolute -top-12 right-0 flex items-center gap-2 z-20">
                <button
                  type="button"
                  onClick={() => {
                    const nextMuted = !isMuted;
                    setIsMuted(nextMuted);
                    if (modalVideoRef.current) {
                      modalVideoRef.current.muted = nextMuted;
                    }
                  }}
                  className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center gap-1.5 text-xs font-bold border border-white/20 transition-all cursor-pointer"
                  title={isMuted ? "Click to Unmute Sound" : "Click to Mute Sound"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-slate-300" />
                      <span className="text-[11px] text-slate-300">Muted</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-orange-400" />
                      <span className="text-[11px] text-orange-400">Sound ON</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close video player"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Video Screen */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
                {isDirectVideo(activeVideo.videoUrl) ? (
                  <video
                    ref={modalVideoRef}
                    src={activeVideo.videoUrl}
                    controls
                    autoPlay
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={getEmbedUrl(activeVideo.videoUrl, isMuted)}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                )}
              </div>

              {/* Caption */}
              <div className="mt-4 text-center max-w-2xl text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F37021]">
                  {concernName}
                </span>
                <h3 className="text-lg sm:text-xl font-bold mt-0.5">
                  {activeVideo.title}
                </h3>
                {activeVideo.caption && (
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    {activeVideo.caption}
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
