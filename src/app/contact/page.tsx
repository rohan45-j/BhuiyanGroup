"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  Building2,
  CheckCircle2,
  Loader2,
  AlertCircle,
  MessageCircle
} from "lucide-react";
import { companyData } from "@/data/companyData";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function ContactPage() {
  const { siteConfig } = useSiteConfig();
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    concern: "Bhuiyan Group Corporate Management",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const concernsList = siteConfig?.sisterConcerns && siteConfig.sisterConcerns.length > 0
    ? siteConfig.sisterConcerns
    : companyData.sisterConcerns;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          organization: formData.organization,
          email: formData.email,
          phone: formData.phone,
          concern: formData.concern,
          subject: `${formData.concern} - Project Inquiry`,
          message: formData.message
        })
      });

      if (!res.ok) {
        throw new Error("Unable to save inquiry right now. Please try calling directly.");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        organization: "",
        email: "",
        phone: "",
        concern: "Bhuiyan Group Corporate Management",
        message: ""
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#0A1B40] text-white py-12 sm:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F37021]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F37021] bg-white/10 px-3 py-1 rounded-md">
            Direct Corporate Access
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
            Contact Bhuiyan Group
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mt-3 font-medium">
            Reach our executive leadership, sales engineers, and subsidiary project teams in Dhaka, Bangladesh.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-sm space-y-5 sm:space-y-6">
              <h2 className="text-xl font-bold text-[#0F2557]">
                Corporate Headquarters
              </h2>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#F37021] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Location</strong>
                    <p>{companyData.corporateHeadquarters.address}</p>
                    <p>
                      {companyData.corporateHeadquarters.city},{" "}
                      {companyData.corporateHeadquarters.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#F37021] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Telephone & Hotline</strong>
                    <p className="text-slate-900 font-semibold">
                      Hotline: {siteConfig?.general?.hotline || companyData.corporateHeadquarters.hotline}
                    </p>
                    <p className="text-xs text-slate-500">
                      PABX: {siteConfig?.general?.phone || companyData.corporateHeadquarters.phone}
                    </p>
                  </div>
                </div>

                {/* WhatsApp Support */}
                <div className="flex items-start gap-3.5">
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">WhatsApp Desk</strong>
                    <a
                      href={`https://wa.me/${(siteConfig?.general?.whatsapp || "+880 1819-214436").replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-semibold hover:underline flex items-center gap-1.5"
                    >
                      <span>{siteConfig?.general?.whatsapp || "+880 1819-214436"}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Chat Now</span>
                    </a>
                    <p className="text-xs text-slate-500">Instant consultation</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#F37021] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Email Inquiries</strong>
                    <p>{siteConfig?.general?.email || companyData.corporateHeadquarters.email}</p>
                    <p className="text-xs text-slate-500">
                      {siteConfig?.general?.supportEmail || companyData.corporateHeadquarters.supportEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#F37021] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Working Hours</strong>
                    <p>{companyData.corporateHeadquarters.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subsidiary Direct Contacts */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#0F2557] flex items-center justify-between">
                <span>Subsidiary Direct Hotlines</span>
                <span className="text-xs font-mono font-bold text-slate-400">5 Divisions</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                {concernsList.map((sc) => (
                  <div
                    key={sc.id}
                    className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 px-2 rounded-lg transition-colors"
                  >
                    <span className="font-semibold text-slate-800 truncate mr-2">
                      {sc.name}
                    </span>
                    <a
                      href={`tel:${sc.contactInfo?.phone}`}
                      className="text-[#F37021] font-mono font-medium shrink-0 hover:underline"
                    >
                      {sc.contactInfo?.phone || "+880 1819-214436"}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-5 sm:p-10 border border-slate-200 shadow-xl space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#0F2557]">
                  Send a Corporate Message
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Connect with our department heads for tenders, quotations, and service partnerships.
                </p>
              </div>

              {errorMessage && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 text-xs">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-center">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-bold text-emerald-900">
                    Corporate Inquiry Transmitted
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
                    Thank you. Bhuiyan Group management and department engineers have received your inquiry. A specialist will review your specifications and contact you promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2.5 text-xs font-bold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-sm transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Engr. Tanvir Ahmed"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F2557] focus:ring-2 focus:ring-[#0F2557]/10"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Company / Organization *
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Meghna Group / BPDB"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F2557] focus:ring-2 focus:ring-[#0F2557]/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="name@company.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F2557] focus:ring-2 focus:ring-[#0F2557]/10"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+880 1..."
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F2557] focus:ring-2 focus:ring-[#0F2557]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Department or Subsidiary Focus
                    </label>
                    <select
                      name="concern"
                      value={formData.concern}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F2557] bg-white font-medium"
                    >
                      <option value="Bhuiyan Group Corporate Management">Bhuiyan Group Corporate Management</option>
                      {concernsList.map((sc) => (
                        <option key={sc.id} value={sc.name}>
                          {sc.name} ({sc.sector})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Inquiry Details / Technical Requirements *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      placeholder="Describe your power rating, substation specs, rooftop area, pump requirements, or project scope..."
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F2557] focus:ring-2 focus:ring-[#0F2557]/10"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-[#F37021] hover:bg-[#DE5F12] text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Transmitting to Management...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Corporate Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
