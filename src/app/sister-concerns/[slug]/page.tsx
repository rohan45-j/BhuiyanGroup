import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Zap,
  SunMedium,
  Droplets,
  Cpu,
  HeartHandshake,
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Calendar,
  Sparkles,
  Shield,
  Globe,
} from "lucide-react";
import fs from "fs";
import path from "path";
import { companyData } from "@/data/companyData";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SisterConcernPhotoGallery from "@/components/ui/SisterConcernPhotoGallery";
import SisterConcernVideoGallery from "@/components/ui/SisterConcernVideoGallery";
import { getMergedSiteConfig } from "@/lib/runtimeConfig";

function getSisterConcerns() {
  try {
    const data = getMergedSiteConfig();
    if (data.sisterConcerns && data.sisterConcerns.length > 0) {
        return data.sisterConcerns.map((sc: any) => {
          const base =
            companyData.sisterConcerns.find(
              (b) => b.slug === sc.slug || b.id === sc.id
            ) || ({} as any);
          return {
            ...base,
            ...sc,
            capabilities:
              sc.capabilities && sc.capabilities.length > 0
                ? sc.capabilities
                : base.capabilities || [],
            keySpecialties:
              sc.keySpecialties && sc.keySpecialties.length > 0
                ? sc.keySpecialties
                : base.keySpecialties || [],
            stats:
              sc.stats && sc.stats.length > 0
                ? sc.stats
                : base.stats || [],
            contactInfo: {
              ...(base.contactInfo || {}),
              ...(sc.contactInfo || {}),
            },
            galleryImages: sc.galleryImages || base.galleryImages || [],
            galleryVideos: sc.galleryVideos || base.galleryVideos || [],
          };
        });
      }
  } catch (e) {
    console.warn("Falling back to static companyData", e);
  }
  return companyData.sisterConcerns;
}

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-8 h-8 text-[#F37021]" />,
  SunMedium: <SunMedium className="w-8 h-8 text-[#F37021]" />,
  Droplets: <Droplets className="w-8 h-8 text-[#F37021]" />,
  Cpu: <Cpu className="w-8 h-8 text-[#F37021]" />,
  HeartHandshake: <HeartHandshake className="w-8 h-8 text-[#F37021]" />,
};

export function generateStaticParams() {
  const concerns = getSisterConcerns();
  return concerns.map((concern: { slug: string }) => ({
    slug: concern.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concerns = getSisterConcerns();
  const concern = concerns.find((c: { slug: string }) => c.slug === slug);

  if (!concern) {
    return {
      title: "Sister Concern | Bhuiyan Group",
    };
  }

  return {
    title: `${concern.name} | Bhuiyan Group Bangladesh`,
    description: concern.description,
  };
}

export default async function SisterConcernPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concerns = getSisterConcerns();
  const concern = concerns.find((c: { slug: string }) => c.slug === slug);

  if (!concern) {
    notFound();
  }

  // Sibling concerns for navigation
  const otherConcerns = concerns.filter(
    (c: { slug: string }) => c.slug !== concern.slug
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Sub-header / Breadcrumb with Ambient Glow */}
      <div className="bg-[#0A1B40] text-white pt-8 sm:pt-12 pb-16 sm:pb-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F37021]/15 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/#sister-concerns"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white mb-6 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#F37021] group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Sister Concerns</span>
          </Link>

          <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F37021] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  {concern.sector}
                </span>
                <span className="text-xs text-slate-300 flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Established {concern.foundedYear}
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full">
                  <Shield className="w-3.5 h-3.5" />
                  Bhuiyan Group Certified
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                {concern.name}
              </h1>

              <p className="text-sm sm:text-lg text-slate-300 font-medium leading-relaxed">
                {concern.tagline}
              </p>
            </div>

            <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl sm:rounded-3xl bg-white p-3 sm:p-4 shadow-2xl border border-white/30 flex items-center justify-center shrink-0 self-start md:self-auto group hover:scale-105 transition-all">
              {concern.logo ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={concern.logo}
                    alt={concern.name}
                    fill
                    className="object-contain p-1"
                    priority
                  />
                </div>
              ) : (
                iconMap[concern.iconName] || <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-[#F37021]" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Ribbon with Animated Counter */}
      {concern.stats && concern.stats.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-slate-200 shadow-xl">
            {concern.stats.map((st: { label: string; value: string }, i: number) => (
              <div
                key={i}
                className="text-center sm:text-left sm:border-r border-slate-100 last:border-r-0 p-2"
              >
                <div className="text-2xl sm:text-4xl font-black text-[#0F2557]">
                  <AnimatedCounter value={st.value} />
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Detailed Overview & Capabilities */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-12">
            {/* Overview */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-sm space-y-3 sm:space-y-4 card-hover-glow">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F2557] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F37021]" />
                <span>Company Overview & Industry Role</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {concern.longDescription || concern.description}
              </p>
            </div>

            {/* Core Capabilities */}
            {concern.capabilities && concern.capabilities.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#0F2557]">
                  Engineering & Operational Capabilities
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {concern.capabilities.map((cap: { title: string; description: string }, idx: number) => (
                    <div
                      key={idx}
                      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#0F2557]/40 card-hover-glow transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#FFF4EC] text-[#F37021] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        0{idx + 1}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          {cap.title}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Specialties List */}
            {concern.keySpecialties && concern.keySpecialties.length > 0 && (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-5">
                <h2 className="text-xl font-bold text-[#0F2557]">
                  Key Technical Specialties & Offerings
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {concern.keySpecialties.map((spec: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 hover:border-[#F37021]/30 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#F37021] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Contact & Sibling Navigation */}
          <div className="lg:col-span-4 space-y-8">
            {/* Direct Contact Card */}
            <div className="bg-[#0F2557] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F37021]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="border-b border-white/10 pb-4 relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F37021]">
                  Direct Subsidiary Contact
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Connect with {concern.shortName}
                </h3>
              </div>

              <div className="space-y-4 text-xs text-slate-300 relative z-10">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#F37021] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Direct Line</p>
                    <p>{concern.contactInfo?.phone || "+880 1711-000000"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#F37021] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Official Email</p>
                    <p>{concern.contactInfo?.email || "info@bhuiyangroup.com.bd"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#F37021] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Division Office</p>
                    <p>{concern.contactInfo?.office || "Bhuiyan Corporate Tower, Gulshan-1, Dhaka"}</p>
                  </div>
                </div>

                {concern.contactInfo?.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-[#F37021] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Website</p>
                      <a
                        href={concern.contactInfo.website.startsWith("http") ? concern.contactInfo.website : `https://${concern.contactInfo.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:underline break-all"
                      >
                        {concern.contactInfo.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className="relative z-10 inline-flex items-center justify-center w-full py-3.5 rounded-xl bg-[#F37021] hover:bg-[#DE5F12] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all group"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Other Concerns Navigation */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Other Sister Concerns
              </h3>

              <div className="space-y-2">
                {otherConcerns.map((item: any) => (
                  <Link
                    key={item.id}
                    href={`/sister-concerns/${item.slug}`}
                    className="flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 transition-colors group text-sm border border-transparent hover:border-slate-200"
                  >
                    <div>
                      <span className="font-bold text-slate-800 group-hover:text-[#0F2557] block">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {item.sector}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#F37021] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Standalone Full-Width Photo Gallery Section */}
      {concern.galleryImages && concern.galleryImages.length > 0 && (
        <div className="w-full bg-slate-50/70 border-t border-slate-200/80 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SisterConcernPhotoGallery
              galleryImages={concern.galleryImages}
              concernName={concern.name}
            />
          </div>
        </div>
      )}

      {/* Standalone Full-Width Video Gallery Section - Only rendered if videos exist and have valid URLs */}
      {(() => {
        const validVideos = (concern.galleryVideos || []).filter(
          (v: any) => v && v.videoUrl && v.videoUrl.trim() !== ""
        );
        if (validVideos.length === 0) return null;
        return (
          <div className="w-full bg-[#081530] border-t border-white/10 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SisterConcernVideoGallery
                galleryVideos={validVideos}
                concernName={concern.name}
              />
            </div>
          </div>
        );
      })()}
    </div>
  );
}
