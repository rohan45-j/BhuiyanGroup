import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  SunMedium,
  Droplets,
  Cpu,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  Phone,
  Mail,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { companyData } from "@/data/companyData";
import { getMergedSiteConfig } from "@/lib/runtimeConfig";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export const metadata = {
  title: "Sister Concerns & Strategic Subsidiaries | Bhuiyan Group",
  description:
    "Explore the diversified corporate portfolio of Bhuiyan Group spanning heavy power generation, renewable solar technology, fluid engineering, electro-mechanical systems, and pediatric care in Bangladesh.",
};

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-5 h-5 text-[#F37021]" />,
  SunMedium: <SunMedium className="w-5 h-5 text-[#F37021]" />,
  Droplets: <Droplets className="w-5 h-5 text-[#F37021]" />,
  Cpu: <Cpu className="w-5 h-5 text-[#F37021]" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-[#F37021]" />,
};

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
          name: sc.name || base.name || "Sister Concern",
          shortName: sc.shortName || base.shortName || sc.name || "Subsidiary",
          tagline: sc.tagline || base.tagline || "Engineering & Industrial Solutions",
          sector: sc.sector || base.sector || "Industrial Infrastructure",
          foundedYear: sc.foundedYear || base.foundedYear || new Date().getFullYear().toString(),
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
            phone: "+880 1711-000000",
            email: "info@bhuiyangroup.com.bd",
            office: "Bhuiyan Corporate Tower, Dhaka",
            ...(base.contactInfo || {}),
            ...(sc.contactInfo || {}),
          },
        };
      });
    }
  } catch (e) {
    console.warn("Falling back to static companyData", e);
  }
  return companyData.sisterConcerns;
}

export default function SisterConcernsIndexPage() {
  const sisterConcerns = getSisterConcerns();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Top Banner / Hero */}
      <section className="bg-[#0A1B40] text-white pt-10 sm:pt-16 pb-16 sm:pb-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F37021]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white mb-6 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#F37021] group-hover:-translate-x-1 transition-transform" />
            <span>Return to Home</span>
          </Link>

          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#F37021] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-[#F37021]" />
              <span>Corporate Portfolio</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Strategic Sister Concerns & Autonomous Subsidiaries
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 font-medium leading-relaxed">
              Explore the five autonomous corporate divisions of Bhuiyan Group delivering turnkey heavy power, solar EPC, fluid hydraulics, certified electro-mechanical engineering, and specialized clinical infant care across Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Subsidiaries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sisterConcerns.map((concern: any, idx: number) => {
            const logoSrc = concern.logo || "/img/bhuiyan-group-logo-horizontal.png";
            const serial = `0${idx + 1}`;

            return (
              <div
                key={concern.id || concern.slug || idx}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#F37021]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Card Header Banner */}
                  <div className="bg-gradient-to-r from-[#0F2557] to-[#0A1B40] text-white p-4 px-5 flex items-center justify-between">
                    <span className="font-mono text-xs font-black bg-[#F37021] text-white px-2.5 py-0.5 rounded-full">
                      {serial}
                    </span>
                    <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#F37021]" />
                      <span>Est. {concern.foundedYear}</span>
                    </span>
                  </div>

                  {/* Logo Frame */}
                  <div className="p-6 bg-slate-50/70 border-b border-slate-100 flex items-center justify-center h-40 relative group-hover:bg-white transition-colors">
                    {concern.logo ? (
                      <div className="relative w-44 h-24 flex items-center justify-center">
                        <Image
                          src={logoSrc}
                          alt={concern.name}
                          fill
                          className="object-contain p-1 filter drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                    ) : (
                      iconMap[concern.iconName] || <Zap className="w-10 h-10 text-[#F37021]" />
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#F37021] bg-[#FFF4EC] px-2.5 py-0.5 rounded-full border border-[#F37021]/20">
                        {concern.sector}
                      </span>
                      <h2 className="text-xl font-black text-[#0F2557] tracking-tight mt-2 group-hover:text-[#F37021] transition-colors">
                        {concern.name}
                      </h2>
                      <p className="text-xs font-medium text-slate-500 italic mt-0.5">
                        &ldquo;{concern.tagline}&rdquo;
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {concern.description || concern.longDescription}
                    </p>

                    {/* Stats Ribbon */}
                    {concern.stats && concern.stats.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                        {concern.stats.slice(0, 2).map((st: any, sIdx: number) => (
                          <div key={sIdx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                            <span className="text-sm font-black text-[#0F2557] block">
                              <AnimatedCounter value={st?.value || ""} />
                            </span>
                            <span className="text-[10px] text-slate-500 font-semibold block truncate">
                              {st?.label || ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/sister-concerns/${concern.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#0F2557] hover:bg-[#F37021] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all group/btn"
                  >
                    <span>View Subsidiary Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
