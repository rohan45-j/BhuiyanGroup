"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  CheckCircle2,
  Building2,
  FileText,
  Phone,
  Mail,
  Loader2,
  Sparkles,
  ShieldCheck,
  Briefcase
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { companyData } from "@/data/companyData";

export default function RequestQuoteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { siteConfig } = useSiteConfig();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    concern: "Bhuiyan Electric & Power",
    projectScope: "Turnkey EPC Substation",
    estimatedBudget: "50 Lac - 2 Crore BDT",
    message: ""
  });

  const concernsList = siteConfig?.sisterConcerns && siteConfig.sisterConcerns.length > 0
    ? siteConfig.sisterConcerns
    : companyData.sisterConcerns;

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-quote-modal", handleOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-quote-modal", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
          subject: `RFP Quotation: ${formData.projectScope} (${formData.estimatedBudget})`,
          message: `Scope: ${formData.projectScope}\nBudget Range: ${formData.estimatedBudget}\n\nClient Details:\n${formData.message}`
        })
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F2557] via-[#112D6A] to-[#0A1B40] text-white p-5 sm:p-7 relative shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#F37021] bg-white/10 px-2.5 py-0.5 rounded-full border border-[#F37021]/30">
              Procurement & Engineering RFP
            </span>
            <span className="text-xs text-white/50 hidden sm:inline">• 24h Response SLA</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Request an Engineering Proposal / Quotation
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
            Submit your technical specifications or tender documents directly to Bhuiyan Group subsidiary project teams.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                RFP Quotation Request Logged
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your requirement has been transmitted to the engineering desk at <strong>{formData.concern}</strong>. Our senior engineers will follow up with technical & commercial terms.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-[#0F2557] hover:bg-[#F37021] text-white font-bold text-xs tracking-wide transition-all shadow-md"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Engr. Shafiqul Alam"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0F2557] focus:ring-2 focus:ring-[#0F2557]/10"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Organization / Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Beximco Textiles / BREB"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0F2557] focus:ring-2 focus:ring-[#0F2557]/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="shafiq@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0F2557] focus:ring-2 focus:ring-[#0F2557]/10"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Direct Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0F2557] focus:ring-2 focus:ring-[#0F2557]/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Target Subsidiary *
                  </label>
                  <select
                    value={formData.concern}
                    onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0F2557] bg-white font-medium"
                  >
                    {concernsList.map((sc) => (
                      <option key={sc.id} value={sc.name}>
                        {sc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Estimated Project Budget
                  </label>
                  <select
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0F2557] bg-white font-medium"
                  >
                    <option value="Under 50 Lac BDT">Under 50 Lac BDT</option>
                    <option value="50 Lac - 2 Crore BDT">50 Lac - 2 Crore BDT</option>
                    <option value="2 Crore - 10 Crore BDT">2 Crore - 10 Crore BDT</option>
                    <option value="10 Crore+ BDT (Major Turnkey EPC)">10 Crore+ BDT (Major Turnkey EPC)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Scope & Requirements Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Specify generator KVA, rooftop solar MWp, water flow head, transformer voltage rating, or tender reference..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0F2557] focus:ring-2 focus:ring-[#0F2557]/10"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-[#F37021] hover:bg-[#DE5F12] text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Proposal Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Request for Quotation</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Confidential NDA Protected</span>
                </span>
                <span>•</span>
                <span>Direct Engineering Response</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
