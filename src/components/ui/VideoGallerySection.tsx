"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Film, Clock, ExternalLink, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  category?: string;
  duration?: string;
  sound?: "sound" | "muted";
}

export default function VideoGallerySection() {
  const { config } = useSiteConfig();
  const gallery = config?.videoGallery;
  const videos: VideoItem[] = gallery?.videos || [];

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const modalVideoRef = React.useRef<HTMLVideoElement>(null);

  const handleOpenVideo = (vid: VideoItem) => {
    const globalSound = (gallery as any)?.defaultSound || "sound";
    const itemSound = vid.sound || globalSound;
    setIsMuted(itemSound === "muted");
    setActiveVideo(vid);
  };

  const categories = useMemo(() => {
    const cats = new Set<string>();
    videos.forEach((v) => {
      if (v.category && v.category.trim()) {
        cats.add(v.category.trim());
      }
    });
    return ["All", ...Array.from(cats)];
  }, [videos]);

  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") return videos;
    return videos.filter((v) => v.category === activeCategory);
  }, [videos, activeCategory]);

  if (!videos || videos.length === 0) return null;

  // Helper to determine if URL is a direct video file or embed
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
    <section id="video-gallery" className="py-14 sm:py-20 lg:py-24 bg-[#0A1B40] text-white relative overflow-hidden border-b border-white/10">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F37021]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#0F2557]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F37021] bg-white/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 border border-white/10">
              <Film className="w-3.5 h-3.5 text-[#F37021]" />
              <span>{gallery?.badgeText || "Corporate Media & Field Highlights"}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {gallery?.headline || "Industrial Video Gallery"}
            </h2>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              {gallery?.description ||
                "Watch our turnkey industrial projects, engineering milestones, and commercial renewable installations captured on video."}
            </p>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 2 && (
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#F37021] text-white shadow-md shadow-[#F37021]/30"
                      : "bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-[#F37021]/60 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#F37021]/15 transition-all duration-500 flex flex-col"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => handleOpenVideo(item)}
                className="relative aspect-video w-full bg-slate-900 cursor-pointer overflow-hidden"
              >
                {item.thumbnailUrl ? (
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.88] group-hover:brightness-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0F2557] to-[#0A1B40]">
                    <Film className="w-12 h-12 text-white/30" />
                  </div>
                )}

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F37021] text-white flex items-center justify-center shadow-xl shadow-black/40 group-hover:scale-110 group-hover:bg-[#DE5F12] transition-all duration-300">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-1" />
                  </div>
                </div>

                {/* Category & Duration Badges */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-orange-300 border border-white/10">
                    {item.category || "Field Reel"}
                  </span>
                </div>

                {item.duration && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono font-bold text-slate-200">
                    <Clock className="w-3 h-3 text-orange-400" />
                    <span>{item.duration}</span>
                  </div>
                )}
              </div>

              {/* Video Info Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3
                    onClick={() => handleOpenVideo(item)}
                    className="text-base sm:text-lg font-bold text-white group-hover:text-[#F37021] transition-colors cursor-pointer line-clamp-2"
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleOpenVideo(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F37021] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Play Video</span>
                    <Play className="w-3 h-3 fill-[#F37021] group-hover:fill-white" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-400">1080p HD</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-[#0A1B40]">
                <div className="min-w-0 pr-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F37021] block">
                    {activeVideo.category || "Corporate Media"}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white truncate">
                    {activeVideo.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const nextMuted = !isMuted;
                      setIsMuted(nextMuted);
                      if (modalVideoRef.current) {
                        modalVideoRef.current.muted = nextMuted;
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
                    title={isMuted ? "Click to Unmute Sound" : "Click to Mute Sound"}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-4 h-4 text-slate-300" />
                        <span className="text-[11px] text-slate-300 font-semibold">Muted</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-orange-400" />
                        <span className="text-[11px] text-orange-400 font-semibold">Sound ON</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveVideo(null)}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video w-full bg-black">
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
                    className="w-full h-full border-0"
                  />
                )}
              </div>

              {/* Modal Footer Description */}
              {activeVideo.description && (
                <div className="p-4 sm:p-5 bg-slate-950 text-xs sm:text-sm text-slate-300 border-t border-white/10">
                  <p>{activeVideo.description}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
