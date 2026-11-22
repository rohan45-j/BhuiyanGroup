"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Palette,
  Image as ImageIcon,
  Building,
  Sparkles,
  Zap,
  Briefcase,
  Layers,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Sliders,
  ShieldCheck,
  ChevronRight,
  Award,
  Sun,
  Droplet,
  Cpu,
  HeartHandshake,
  LayoutDashboard,
  Upload,
  LogOut,
  Lock,
  Key,
  Video,
  Play,
  Mail,
  Inbox,
  Download,
  RefreshCw,
  PhoneCall,
  CheckCheck,
  FileText,
  Server,
  Send,
  MessageCircle,
  Check,
  Film,
  Camera,
  FolderKanban,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useSiteConfig, SiteConfigType } from "@/context/SiteConfigContext";
import HeroImageSlider from "@/components/ui/HeroImageSlider";

type AdminTab =
  | "dashboard"
  | "inquiries"
  | "theme"
  | "branding"
  | "general"
  | "hero"
  | "concerns"
  | "projects"
  | "gallery"
  | "sectors"
  | "milestones"
  | "stats"
  | "smtp"
  | "security";

function FileUploader({
  label,
  value,
  onChange,
  category = "general",
  description,
  accept = "image/*,.ico,.pdf,application/pdf,video/mp4,video/webm,video/*",
  recommendedRatio,
  recommendedSize,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  category?: string;
  description?: string;
  accept?: string;
  recommendedRatio?: string;
  recommendedSize?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErrorMsg(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        setErrorMsg(data.error || "Upload failed");
      }
    } catch {
      setErrorMsg("Network error during file upload");
    } finally {
      setUploading(false);
    }
  };

  const isPdf =
    value &&
    (value.toLowerCase().endsWith(".pdf") || value.toLowerCase().includes(".pdf"));

  const isVideo =
    value &&
    (value.endsWith(".mp4") ||
      value.endsWith(".webm") ||
      value.includes("video") ||
      value.includes("sewing_factory"));

  return (
    <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <label className="font-bold text-slate-800 text-xs sm:text-sm block">{label}</label>
            {recommendedRatio && (
              <span className="text-[10px] bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded-full border border-blue-200/80">
                Ratio: {recommendedRatio}
              </span>
            )}
            {recommendedSize && (
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200/80">
                Size: {recommendedSize}
              </span>
            )}
          </div>
          {description && <p className="text-[11px] text-slate-500">{description}</p>}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg bg-[#0F2557] hover:bg-[#1A3978] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-orange-400" />
          <span>{uploading ? "Uploading..." : "Upload from Device"}</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="space-y-1.5">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/img/your-file.png, /uploads/video.mp4, or https://..."
          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 font-mono text-xs text-slate-900 bg-white shadow-xs focus:ring-2 focus:ring-[#0F2557]/20 focus:outline-none"
        />
        {errorMsg && <p className="text-red-500 text-[11px] font-medium">{errorMsg}</p>}
      </div>

      {value && (
        <div className="flex items-center gap-4 pt-1">
          <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
            Live Preview:
          </span>
          <div className="h-20 max-w-[280px] bg-slate-900 rounded-xl border border-slate-200 p-1 relative shadow-xs flex items-center justify-center overflow-hidden">
            {isPdf ? (
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-red-950/90 hover:bg-red-900 border border-red-500/40 rounded-lg text-white transition-all text-xs font-semibold cursor-pointer"
              >
                <FileText className="w-4 h-4 text-red-400 shrink-0" />
                <span className="truncate max-w-[140px]">View Uploaded PDF</span>
                <ExternalLink className="w-3 h-3 text-slate-300 shrink-0" />
              </a>
            ) : isVideo ? (
              <video
                src={value}
                controls
                className="max-h-full max-w-full rounded object-contain"
              />
            ) : (
              <img src={value} alt="Preview" className="max-h-full max-w-full object-contain" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { config, updateSection, saveChanges, resetToDefaults, isSaving, lastSaved } =
    useSiteConfig();

  // Authentication State with instant pre-auth check
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("bg_admin_authenticated") === "true";
      } catch (e) {
        return false;
      }
    }
    return false;
  });
  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [selectedConcernIndex, setSelectedConcernIndex] = useState(0);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [newSlideUrl, setNewSlideUrl] = useState<string>("");

  // Projects State
  const [projectStatusFilter, setProjectStatusFilter] = useState<"all" | "completed" | "ongoing" | "upcoming">("all");
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Inquiries & RFP Leads State
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [inquiryFilter, setInquiryFilter] = useState<"all" | "unread" | "read">("all");

  // SMTP Test State
  const [smtpTesting, setSmtpTesting] = useState(false);
  const [smtpTestResult, setSmtpTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showSmtpPass, setShowSmtpPass] = useState(false);

  // Admin Security Password Management State
  const [showAdminPassword, setShowAdminPassword] = useState<boolean>(false);
  const [newAdminPassword, setNewAdminPassword] = useState<string>("");
  const [confirmAdminPassword, setConfirmAdminPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);
  const [passwordUpdateMsg, setPasswordUpdateMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState<boolean>(false);

  const handleUpdatePassword = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPasswordUpdateMsg(null);

    const cleanPass = newAdminPassword.trim();
    if (!cleanPass) {
      setPasswordUpdateMsg({ type: "error", text: "Please enter a new password." });
      return;
    }

    if (cleanPass.length < 6) {
      setPasswordUpdateMsg({ type: "error", text: "Password must be at least 6 characters long." });
      return;
    }

    if (cleanPass !== confirmAdminPassword.trim()) {
      setPasswordUpdateMsg({ type: "error", text: "New password and Confirm password do not match." });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const updatedConfig = {
        ...config,
        adminAuth: {
          ...((config as any).adminAuth || {}),
          password: cleanPass,
        },
      };

      updateSection("adminAuth" as any, updatedConfig.adminAuth);
      const success = await saveChanges(updatedConfig);

      if (success) {
        setPasswordUpdateMsg({ type: "success", text: "Admin password successfully updated and permanently saved!" });
        setNewAdminPassword("");
        setConfirmAdminPassword("");
        setTimeout(() => setPasswordUpdateMsg(null), 5000);
      } else {
        setPasswordUpdateMsg({ type: "error", text: "Failed to persist new password to server. Please try again." });
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Error updating password";
      setPasswordUpdateMsg({ type: "error", text: errMsg });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleGenerateRandomPassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
    let pass = "";
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewAdminPassword(pass);
    setConfirmAdminPassword(pass);
    setShowNewPassword(true);
    setShowConfirmNewPassword(true);
  };

  const handleTestSmtp = async () => {
    setSmtpTesting(true);
    setSmtpTestResult(null);
    try {
      const smtpData = (config as any).smtp || {};
      const res = await fetch("/api/admin/test-smtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(smtpData),
      });
      const data = await res.json();
      if (data.success) {
        setSmtpTestResult({ success: true, message: data.message });
      } else {
        setSmtpTestResult({ success: false, message: data.error || "Connection test failed." });
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Network error while testing SMTP.";
      setSmtpTestResult({ success: false, message: errMsg });
    } finally {
      setSmtpTesting(false);
    }
  };

  const fetchInquiries = async () => {
    try {
      setInquiriesLoading(true);
      const res = await fetch("/api/inquiries", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (e) {
      console.error("Failed to load inquiries", e);
    } finally {
      setInquiriesLoading(false);
    }
  };

  const handleToggleInquiryStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "unread" ? "read" : "unread";
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
      }
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this corporate inquiry?")) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      }
    } catch (e) {
      console.error("Failed to delete inquiry", e);
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ["ID", "Name", "Organization", "Email", "Phone", "Subject", "Subsidiary", "Message", "Status", "Date"];
    const rows = inquiries.map((i) => [
      i.id,
      `"${(i.name || "").replace(/"/g, '""')}"`,
      `"${(i.organization || "").replace(/"/g, '""')}"`,
      `"${(i.email || "").replace(/"/g, '""')}"`,
      `"${(i.phone || "").replace(/"/g, '""')}"`,
      `"${(i.subject || "").replace(/"/g, '""')}"`,
      `"${(i.concern || "").replace(/"/g, '""')}"`,
      `"${(i.message || "").replace(/"/g, '""')}"`,
      i.status,
      i.createdAt,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `bhuiyan_group_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("bg_admin_authenticated");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
        fetchInquiries();
      }
    } catch (e) {
      console.warn("Storage check", e);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const expectedUser = (config as any)?.adminAuth?.username || "admin";
    const expectedPass = (config as any)?.adminAuth?.password || "password123";

    if (loginUsername.trim() === expectedUser && loginPassword === expectedPass) {
      try {
        localStorage.setItem("bg_admin_authenticated", "true");
      } catch {}
      setIsAuthenticated(true);
    } else {
      setLoginError("Invalid Administrator Username or Password. Please check credentials.");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("bg_admin_authenticated");
    } catch {}
    setIsAuthenticated(false);
    setLoginUsername("");
    setLoginPassword("");
  };

  const handleSave = async () => {
    const success = await saveChanges(config);
    if (success) {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } else {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  // Keyboard shortcut: Ctrl+S / Cmd+S to save immediately from anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [config]);

  const handleReset = async () => {
    if (confirm("Are you sure you want to reset all site configuration to defaults?")) {
      await resetToDefaults();
      alert("Configuration reset to defaults.");
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0A1B40] flex flex-col justify-center items-center text-white">
        <div className="w-10 h-10 border-4 border-[#F37021] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-300 font-semibold tracking-wide">Authenticating Admin Console...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A1B40] flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
        {/* Ambient Blur */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#F37021]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 border border-slate-200/90 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[#0F2557] mx-auto flex items-center justify-center shadow-lg shadow-[#0F2557]/20 border border-white/20">
              <Lock className="w-8 h-8 text-[#F37021]" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#0F2557] tracking-tight">
                Bhuiyan Group Portal
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-[#F37021] mt-0.5">
                Administrative Authentication
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
              Direct URL access only. Authentication is strictly required to modify enterprise modules.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 block">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#0F2557]/20 focus:outline-none transition-all text-sm font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 block">
                Security Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#0F2557]/20 focus:outline-none transition-all text-sm pr-11 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0F2557] hover:bg-[#1A3978] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#0F2557]/30 hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>Authorize & Enter Console</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 flex flex-col items-center gap-3 text-center">
            {((config as any)?.adminAuth?.password === "password123" || !(config as any)?.adminAuth?.password) ? (
              <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80 text-[11px] text-slate-600">
                Default Credentials: <strong className="text-slate-800 font-mono">admin</strong> / <strong className="text-slate-800 font-mono">password123</strong>
              </div>
            ) : (
              <div className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Custom Administrator Credentials Protected</span>
              </div>
            )}

            <Link
              href="/"
              className="text-xs font-semibold text-slate-500 hover:text-[#0F2557] transition-colors"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans">
      {/* Admin Top Sticky Bar */}
      <header className="sticky top-0 z-40 bg-[#0A1B40] text-white border-b border-white/10 px-4 sm:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F37021] flex items-center justify-center font-black text-white text-base shadow-sm">
              BG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base tracking-tight text-white">
                  Bhuiyan Group Enterprise CMS
                </h1>
                <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded text-orange-300">
                  Admin Console
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Live Module & Theme Control Center
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
            {lastSaved && (
              <span className="text-xs text-slate-400 hidden lg:block">
                Last saved: <strong className="text-slate-200">{lastSaved}</strong>
              </span>
            )}

            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
              title="Reset all settings to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
            >
              <Eye className="w-3.5 h-3.5 text-[#F37021]" />
              <span>View Site</span>
            </Link>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 rounded-lg bg-[#F37021] hover:bg-[#DE5F12] text-white text-xs font-bold tracking-wide flex items-center gap-2 shadow-md shadow-[#F37021]/30 hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-red-500/30 cursor-pointer"
              title="Log out of Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Save Notification Banner */}
      {saveStatus === "success" && (
        <div className="bg-emerald-600 text-white text-xs font-semibold py-2 px-4 text-center animate-in fade-in">
          ✓ All site modules, color codes, and content updated and saved successfully!
        </div>
      )}
      {saveStatus === "error" && (
        <div className="bg-rose-600 text-white text-xs font-semibold py-2 px-4 text-center animate-in fade-in">
          ✕ An error occurred while saving. Please check server logs.
        </div>
      )}

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
              Admin Navigation
            </span>

            {[
              { id: "dashboard", label: "Overview & Status", icon: LayoutDashboard },
              { id: "inquiries", label: "Inquiries & RFP Leads", icon: Mail, badge: inquiries.filter((i) => i.status === "unread").length },
              { id: "theme", label: "Theme & Color Codes", icon: Palette },
              { id: "branding", label: "Logos, Brochure & Media", icon: ImageIcon },
              { id: "general", label: "Company Information", icon: Building },
              { id: "hero", label: "Hero Video & Headlines", icon: Sparkles },
              { id: "concerns", label: `Sister Concerns (${config.sisterConcerns?.length || 0})`, icon: Zap },
              { id: "projects", label: `Projects & Credentials (${((config as any).projects || []).length})`, icon: FolderKanban },
              { id: "gallery", label: "Media & Galleries (Photo/Video)", icon: Film },
              { id: "sectors", label: "Industry Domains", icon: Briefcase },
              { id: "milestones", label: "Evolution & Heritage", icon: Award },
              { id: "stats", label: "Key Stats & Metrics", icon: Sliders },
              { id: "smtp", label: "SMTP & Email Alerts", icon: Server },
              { id: "security", label: "Security & Credentials", icon: Lock },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? "bg-[#0F2557] text-white shadow-md shadow-[#0F2557]/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-[#F37021]" : "text-slate-400"
                      }`}
                    />
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {Boolean(tab.badge && tab.badge > 0) && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#F37021] text-white animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Info Box */}
          <div className="bg-gradient-to-br from-[#0F2557] to-[#0A1B40] text-white rounded-2xl p-5 shadow-sm space-y-2 text-xs">
            <div className="flex items-center gap-2 text-orange-300 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Real-Time Reactivity</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Theme color codes, logos, button colors, and module copy update the entire
              Next.js application instantaneously upon saving.
            </p>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
                <h2 className="text-2xl font-black text-[#0F2557]">
                  Bhuiyan Group Website Overview
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Welcome to the centralized management console. You can update colors,
                  typography tokens, logos, subsidiary information, contact numbers, and
                  hero section content across the entire website.
                </p>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-semibold text-slate-500">
                    Active Sister Concerns
                  </span>
                  <div className="text-3xl font-black text-[#0F2557]">
                    {config.sisterConcerns.length} Entities
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Generex, Glory, Radial, Infant Zone
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-semibold text-slate-500">
                    Active Primary Brand Color
                  </span>
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg border border-slate-300 shadow-sm"
                      style={{ backgroundColor: config.theme.primaryColor }}
                    />
                    <span className="text-xl font-bold font-mono text-slate-800">
                      {config.theme.primaryColor}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Deep Navy Enterprise</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-semibold text-slate-500">
                    Active Secondary Accent Color
                  </span>
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg border border-slate-300 shadow-sm"
                      style={{ backgroundColor: config.theme.accentColor }}
                    />
                    <span className="text-xl font-bold font-mono text-slate-800">
                      {config.theme.accentColor}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Vibrant Corporate Orange</p>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Quick Action Modules
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <button
                    onClick={() => setActiveTab("theme")}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0F2557] text-left space-y-1 transition-all"
                  >
                    <Palette className="w-5 h-5 text-[#F37021]" />
                    <strong className="block text-slate-900">Change Colors</strong>
                    <span className="text-slate-500 text-[11px]">Primary, CTA & Backgrounds</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("branding")}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0F2557] text-left space-y-1 transition-all"
                  >
                    <ImageIcon className="w-5 h-5 text-[#F37021]" />
                    <strong className="block text-slate-900">Update Logos</strong>
                    <span className="text-slate-500 text-[11px]">Logo & Favicon URLs</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("concerns")}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0F2557] text-left space-y-1 transition-all"
                  >
                    <Zap className="w-5 h-5 text-[#F37021]" />
                    <strong className="block text-slate-900">Sister Concerns</strong>
                    <span className="text-slate-500 text-[11px]">Edit all 5 subsidiaries</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("sectors")}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0F2557] text-left space-y-1 transition-all"
                  >
                    <Briefcase className="w-5 h-5 text-[#F37021]" />
                    <strong className="block text-slate-900">Industry Domains</strong>
                    <span className="text-slate-500 text-[11px]">Capabilities & Domains</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("milestones")}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0F2557] text-left space-y-1 transition-all"
                  >
                    <Award className="w-5 h-5 text-[#F37021]" />
                    <strong className="block text-slate-900">Evolution & Heritage</strong>
                    <span className="text-slate-500 text-[11px]">Decade Milestones Timeline</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("general")}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0F2557] text-left space-y-1 transition-all"
                  >
                    <Building className="w-5 h-5 text-[#F37021]" />
                    <strong className="block text-slate-900">Corporate Details</strong>
                    <span className="text-slate-500 text-[11px]">Hotlines & Address</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 hover:border-[#F37021] text-left space-y-1 transition-all"
                  >
                    <Mail className="w-5 h-5 text-[#F37021]" />
                    <div className="flex items-center justify-between">
                      <strong className="block text-slate-900">Inquiries & Leads</strong>
                      {inquiries.filter((i) => i.status === "unread").length > 0 && (
                        <span className="text-[10px] bg-[#F37021] text-white px-2 py-0.5 rounded-full font-bold">
                          {inquiries.filter((i) => i.status === "unread").length} new
                        </span>
                      )}
                    </div>
                    <span className="text-slate-500 text-[11px]">Quotations & Tender RFP</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: INQUIRIES & RFP LEADS INBOX */}
          {activeTab === "inquiries" && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F37021]">
                    Lead Generation & CRM
                  </span>
                  <h2 className="text-2xl font-black text-[#0F2557] mt-1">
                    Corporate Inquiries & RFP Leads
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live stream of quotations, tender RFPs, and messages submitted via the website.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={fetchInquiries}
                    disabled={inquiriesLoading}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${inquiriesLoading ? "animate-spin" : ""}`} />
                    <span>Refresh</span>
                  </button>

                  <button
                    onClick={handleExportCSV}
                    disabled={inquiries.length === 0}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F2557] hover:bg-[#153478] text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5 text-[#F37021]" />
                    <span>Export CSV ({inquiries.length})</span>
                  </button>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4 text-xs font-bold">
                <button
                  onClick={() => setInquiryFilter("all")}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    inquiryFilter === "all"
                      ? "bg-[#0F2557] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  All Inquiries ({inquiries.length})
                </button>
                <button
                  onClick={() => setInquiryFilter("unread")}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    inquiryFilter === "unread"
                      ? "bg-[#F37021] text-white shadow-xs"
                      : "bg-orange-50 text-[#F37021] hover:bg-orange-100"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                  <span>Unread Only ({inquiries.filter((i) => i.status === "unread").length})</span>
                </button>
                <button
                  onClick={() => setInquiryFilter("read")}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    inquiryFilter === "read"
                      ? "bg-slate-800 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Responded / Read ({inquiries.filter((i) => i.status === "read").length})
                </button>
              </div>

              {/* Inquiry Cards List */}
              <div className="space-y-4">
                {inquiries
                  .filter((inq) => {
                    if (inquiryFilter === "unread") return inq.status === "unread";
                    if (inquiryFilter === "read") return inq.status === "read";
                    return true;
                  })
                  .map((inq) => {
                    const isUnread = inq.status === "unread";
                    const formattedDate = inq.createdAt
                      ? new Date(inq.createdAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "Recent";

                    return (
                      <div
                        key={inq.id}
                        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                          isUnread
                            ? "bg-white border-[#F37021]/50 shadow-md ring-2 ring-[#F37021]/10"
                            : "bg-slate-50/70 border-slate-200"
                        }`}
                      >
                        {/* Header Details */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-200/60">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-base text-slate-900">
                                {inq.name}
                              </h3>
                              {inq.organization && (
                                <span className="text-xs font-semibold text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded-md">
                                  {inq.organization}
                                </span>
                              )}
                              <span
                                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                  isUnread
                                    ? "bg-[#FFF4EC] text-[#F37021] border border-[#F37021]/30"
                                    : "bg-slate-200 text-slate-600"
                                }`}
                              >
                                {isUnread ? "New Inquiry" : "Responded"}
                              </span>
                            </div>
                            <p className="text-xs text-[#0F2557] font-bold">
                              Subsidiary Focus: {inq.concern || "General Bhuiyan Group"}
                            </p>
                          </div>

                          <div className="text-xs text-slate-400 font-mono sm:text-right shrink-0">
                            {formattedDate}
                          </div>
                        </div>

                        {/* Subject & Message */}
                        <div className="py-3.5 space-y-1.5">
                          <h4 className="font-bold text-sm text-slate-900">
                            {inq.subject}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed bg-white/70 p-3.5 rounded-xl border border-slate-200/50">
                            {inq.message}
                          </p>
                        </div>

                        {/* Action Toolbar */}
                        <div className="pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div className="flex flex-wrap items-center gap-3">
                            {inq.phone && (
                              <a
                                href={`tel:${inq.phone}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-200/80 transition-colors"
                              >
                                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{inq.phone}</span>
                              </a>
                            )}
                            {inq.email && (
                              <a
                                href={`mailto:${inq.email}?subject=RE: ${encodeURIComponent(inq.subject || "Bhuiyan Group Inquiry")}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold border border-blue-200/80 transition-colors"
                              >
                                <Mail className="w-3.5 h-3.5 text-blue-600" />
                                <span>{inq.email}</span>
                              </a>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleInquiryStatus(inq.id, inq.status)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200/70 hover:bg-slate-300 text-slate-700 font-bold transition-colors cursor-pointer"
                            >
                              <CheckCheck className="w-3.5 h-3.5 text-slate-600" />
                              <span>{isUnread ? "Mark as Read" : "Mark as Unread"}</span>
                            </button>

                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {inquiries.length === 0 && (
                  <div className="py-16 text-center text-slate-400 space-y-2">
                    <Inbox className="w-12 h-12 mx-auto text-slate-300" />
                    <h4 className="font-bold text-slate-700 text-base">No Inquiries Found</h4>
                    <p className="text-xs">
                      When prospective clients submit inquiries or quote requests, they will appear here in real-time.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: THEME & COLOR CODES (COMPREHENSIVE COLOR PICKER) */}
          {activeTab === "theme" && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F37021]">
                  Design System Control
                </span>
                <h2 className="text-2xl font-black text-[#0F2557] mt-1">
                  Global Color Codes & Palette
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Modify the HEX color codes for each part of the website. Changes update
                  in real-time and persist across all pages.
                </p>
              </div>

              {/* Color Controls Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Primary Color */}
                <div className="p-4 rounded-xl border border-slate-200 space-y-2 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">
                      Primary Brand Color (Navy)
                    </label>
                    <input
                      type="color"
                      value={config.theme.primaryColor}
                      onChange={(e) =>
                        updateSection("theme", {
                          ...config.theme,
                          primaryColor: e.target.value,
                        })
                      }
                      className="w-8 h-8 rounded border-none cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={config.theme.primaryColor}
                    onChange={(e) =>
                      updateSection("theme", {
                        ...config.theme,
                        primaryColor: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    Controls primary headings, dark cards, and brand authority badges.
                  </p>
                </div>

                {/* Accent Color */}
                <div className="p-4 rounded-xl border border-slate-200 space-y-2 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">
                      Accent / Secondary Color (Orange)
                    </label>
                    <input
                      type="color"
                      value={config.theme.accentColor}
                      onChange={(e) =>
                        updateSection("theme", {
                          ...config.theme,
                          accentColor: e.target.value,
                        })
                      }
                      className="w-8 h-8 rounded border-none cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={config.theme.accentColor}
                    onChange={(e) =>
                      updateSection("theme", {
                        ...config.theme,
                        accentColor: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    Controls vibrant accents, icons, active tab pills, and badges.
                  </p>
                </div>

                {/* Button Background Color */}
                <div className="p-4 rounded-xl border border-slate-200 space-y-2 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">
                      Primary Button Color (CTA)
                    </label>
                    <input
                      type="color"
                      value={config.theme.buttonColor}
                      onChange={(e) =>
                        updateSection("theme", {
                          ...config.theme,
                          buttonColor: e.target.value,
                        })
                      }
                      className="w-8 h-8 rounded border-none cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={config.theme.buttonColor}
                    onChange={(e) =>
                      updateSection("theme", {
                        ...config.theme,
                        buttonColor: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    Directly controls &quot;Contact Us&quot; buttons and call-to-actions.
                  </p>
                </div>

                {/* Button Hover Color */}
                <div className="p-4 rounded-xl border border-slate-200 space-y-2 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">
                      Button Hover Color
                    </label>
                    <input
                      type="color"
                      value={config.theme.buttonHover}
                      onChange={(e) =>
                        updateSection("theme", {
                          ...config.theme,
                          buttonHover: e.target.value,
                        })
                      }
                      className="w-8 h-8 rounded border-none cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={config.theme.buttonHover}
                    onChange={(e) =>
                      updateSection("theme", {
                        ...config.theme,
                        buttonHover: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    State shown when user hovers over action buttons.
                  </p>
                </div>

                {/* Hero Gradient Start */}
                <div className="p-4 rounded-xl border border-slate-200 space-y-2 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">
                      Hero Section Gradient Top
                    </label>
                    <input
                      type="color"
                      value={config.theme.heroBgStart}
                      onChange={(e) =>
                        updateSection("theme", {
                          ...config.theme,
                          heroBgStart: e.target.value,
                        })
                      }
                      className="w-8 h-8 rounded border-none cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={config.theme.heroBgStart}
                    onChange={(e) =>
                      updateSection("theme", {
                        ...config.theme,
                        heroBgStart: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                </div>

                {/* Hero Gradient End */}
                <div className="p-4 rounded-xl border border-slate-200 space-y-2 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">
                      Hero Section Gradient Bottom
                    </label>
                    <input
                      type="color"
                      value={config.theme.heroBgEnd}
                      onChange={(e) =>
                        updateSection("theme", {
                          ...config.theme,
                          heroBgEnd: e.target.value,
                        })
                      }
                      className="w-8 h-8 rounded border-none cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={config.theme.heroBgEnd}
                    onChange={(e) =>
                      updateSection("theme", {
                        ...config.theme,
                        heroBgEnd: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                </div>

                {/* Footer Background Color */}
                <div className="p-4 rounded-xl border border-slate-200 space-y-2 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">
                      Footer Background Color
                    </label>
                    <input
                      type="color"
                      value={config.theme.footerBg}
                      onChange={(e) =>
                        updateSection("theme", {
                          ...config.theme,
                          footerBg: e.target.value,
                        })
                      }
                      className="w-8 h-8 rounded border-none cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={config.theme.footerBg}
                    onChange={(e) =>
                      updateSection("theme", {
                        ...config.theme,
                        footerBg: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                </div>

                {/* Section Background Neutral */}
                <div className="p-4 rounded-xl border border-slate-200 space-y-2 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">
                      Neutral Section Background
                    </label>
                    <input
                      type="color"
                      value={config.theme.sectionBgLight}
                      onChange={(e) =>
                        updateSection("theme", {
                          ...config.theme,
                          sectionBgLight: e.target.value,
                        })
                      }
                      className="w-8 h-8 rounded border-none cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={config.theme.sectionBgLight}
                    onChange={(e) =>
                      updateSection("theme", {
                        ...config.theme,
                        sectionBgLight: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    Background tone for page body and section containers.
                  </p>
                </div>

                {/* Card Surface Background */}
                <div className="p-4 rounded-xl border border-slate-200 space-y-2 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">
                      Card / Surface Background
                    </label>
                    <input
                      type="color"
                      value={config.theme.cardBg}
                      onChange={(e) =>
                        updateSection("theme", {
                          ...config.theme,
                          cardBg: e.target.value,
                        })
                      }
                      className="w-8 h-8 rounded border-none cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={config.theme.cardBg}
                    onChange={(e) =>
                      updateSection("theme", {
                        ...config.theme,
                        cardBg: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    Surface fill for cards, modals, and content boxes.
                  </p>
                </div>

                {/* Border Color */}
                <div className="p-4 rounded-xl border border-slate-200 space-y-2 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">
                      Subtle Border Color
                    </label>
                    <input
                      type="color"
                      value={config.theme.borderColor}
                      onChange={(e) =>
                        updateSection("theme", {
                          ...config.theme,
                          borderColor: e.target.value,
                        })
                      }
                      className="w-8 h-8 rounded border-none cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={config.theme.borderColor}
                    onChange={(e) =>
                      updateSection("theme", {
                        ...config.theme,
                        borderColor: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    Subtle outline for card dividers and input borders.
                  </p>
                </div>
              </div>

              {/* Live Preview Swatch */}
              <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Live Color Simulation
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <div
                    className="px-6 py-3 rounded-xl text-white font-bold text-xs shadow-md"
                    style={{ backgroundColor: config.theme.buttonColor }}
                  >
                    Primary Button Preview
                  </div>
                  <div
                    className="px-6 py-3 rounded-xl text-white font-bold text-xs shadow-md"
                    style={{ backgroundColor: config.theme.primaryColor }}
                  >
                    Navy Header Preview
                  </div>
                  <div
                    className="px-4 py-2 rounded-full font-bold text-xs"
                    style={{
                      backgroundColor: `${config.theme.accentColor}20`,
                      color: config.theme.accentColor,
                    }}
                  >
                    Accent Badge Preview
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BRANDING & LOGOS & FAVICON */}
          {activeTab === "branding" && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F37021]">
                  Media Assets
                </span>
                <h2 className="text-2xl font-black text-[#0F2557] mt-1">
                  Logos, Corporate Brochure (PDF) & Media
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Upload and manage the corporate logo, official PDF company profile/brochure, favicon, and panoramic banner.
                </p>
              </div>

              <div className="space-y-6 text-xs">
                {/* Main Logo */}
                <FileUploader
                  label="Main Corporate Logo"
                  description="Displayed in the top navigation bar, footer, and official documents. Transparent background recommended."
                  recommendedRatio="4:1 to 5:1 (Horizontal)"
                  recommendedSize="400 × 100 px to 600 × 150 px (PNG, WebP, SVG)"
                  value={config.branding.logo}
                  onChange={(url) =>
                    updateSection("branding", {
                      ...config.branding,
                      logo: url,
                    })
                  }
                  category="logo"
                />

                {/* Favicon */}
                <FileUploader
                  label="Browser Tab Favicon"
                  description="Website icon shown in browser tabs, bookmarks, and mobile home screens (.ico, .png, .svg)."
                  recommendedRatio="1:1 (Square)"
                  recommendedSize="64 × 64 px or 128 × 128 px (.ico or .png)"
                  value={config.branding.favicon}
                  onChange={(url) =>
                    updateSection("branding", {
                      ...config.branding,
                      favicon: url,
                    })
                  }
                  category="favicon"
                />

                {/* Panoramic Banner */}
                <FileUploader
                  label="Ecosystem Mega Panoramic Banner"
                  description="Ultra-wide high-resolution industrial composite illustration displayed on the homepage."
                  recommendedRatio="16:9 or 21:9 (Panoramic)"
                  recommendedSize="1600 × 541 px to 1920 × 650 px (Max 5MB)"
                  value={config.branding.heroBanner}
                  onChange={(url) =>
                    updateSection("branding", {
                      ...config.branding,
                      heroBanner: url,
                    })
                  }
                  category="banner"
                />

                {/* Company Brochure PDF */}
                <FileUploader
                  label="Official Company Brochure (PDF Document)"
                  description="Upload the official corporate company profile or brochure PDF. When uploaded, visitors clicking 'Company Brochure' across the website will directly view or download this document."
                  recommendedRatio="A4 / Letter Document"
                  recommendedSize="PDF format (Max 25MB)"
                  value={config.branding.brochurePdf || ""}
                  onChange={(url) =>
                    updateSection("branding", {
                      ...config.branding,
                      brochurePdf: url,
                    })
                  }
                  category="brochure"
                  accept="application/pdf,.pdf"
                />

                {/* Site Title */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                  <label className="font-bold text-slate-800 block text-xs sm:text-sm">
                    Browser Title & SEO Heading
                  </label>
                  <input
                    type="text"
                    value={config.branding.siteTitle || ""}
                    onChange={(e) =>
                      updateSection("branding", {
                        ...config.branding,
                        siteTitle: e.target.value,
                      })
                    }
                    placeholder="Bhuiyan Group | Industrial Power, Renewables & Engineering Excellence"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-sans text-xs text-slate-900 bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GENERAL CORPORATE INFO */}
          {activeTab === "general" && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F37021]">
                  Corporate Metadata
                </span>
                <h2 className="text-2xl font-black text-[#0F2557] mt-1">
                  General Company Profile & Contacts
                </h2>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Company Full Name
                    </label>
                    <input
                      type="text"
                      value={config.general.name}
                      onChange={(e) =>
                        updateSection("general", {
                          ...config.general,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Short Name / Acronym
                    </label>
                    <input
                      type="text"
                      value={config.general.shortName}
                      onChange={(e) =>
                        updateSection("general", {
                          ...config.general,
                          shortName: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Corporate Tagline
                  </label>
                  <input
                    type="text"
                    value={config.general.tagline}
                    onChange={(e) =>
                      updateSection("general", {
                        ...config.general,
                        tagline: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Company Overview (Executive Summary)
                  </label>
                  <textarea
                    rows={3}
                    value={config.general.overview}
                    onChange={(e) =>
                      updateSection("general", {
                        ...config.general,
                        overview: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Corporate Hotline
                    </label>
                    <input
                      type="text"
                      value={config.general.hotline}
                      onChange={(e) =>
                        updateSection("general", {
                          ...config.general,
                          hotline: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5 text-emerald-800">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp Hotline</span>
                    </label>
                    <input
                      type="text"
                      value={(config.general as any).whatsapp || ""}
                      onChange={(e) =>
                        updateSection("general", {
                          ...config.general,
                          whatsapp: e.target.value,
                        } as any)
                      }
                      placeholder="+880 1819-214436"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-emerald-300 bg-emerald-50/20 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Direct chat in Floating Widget</p>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      PABX / Phone Line
                    </label>
                    <input
                      type="text"
                      value={config.general.phone}
                      onChange={(e) =>
                        updateSection("general", {
                          ...config.general,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Corporate Email
                    </label>
                    <input
                      type="email"
                      value={config.general.email}
                      onChange={(e) =>
                        updateSection("general", {
                          ...config.general,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Office Address
                    </label>
                    <input
                      type="text"
                      value={config.general.address}
                      onChange={(e) =>
                        updateSection("general", {
                          ...config.general,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HERO SECTION, VIDEO & CONTENT */}
          {activeTab === "hero" && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F37021]">
                  Hero Experience
                </span>
                <h2 className="text-2xl font-black text-[#0F2557] mt-1">
                  Hero Background Video, Media & Headlines
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Configure the Bitopi-style looping background video, upload local video files, customize the dark contrast overlay, and adjust main headlines.
                </p>
              </div>

              {/* Background Media Configuration */}
              <div className="bg-gradient-to-br from-slate-50 to-orange-50/20 rounded-2xl p-6 border border-slate-200/90 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-[#F37021]" />
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Hero Background Media Mode
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    Live Reactive
                  </span>
                </div>

                {/* Media Switcher */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      updateSection("hero", {
                        ...config.hero,
                        backgroundType: "video",
                      })
                    }
                    className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                      config.hero.backgroundType === "video" || !config.hero.backgroundType
                        ? "bg-[#0F2557] text-white border-[#0F2557] shadow-md"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Video
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        config.hero.backgroundType === "video" || !config.hero.backgroundType
                          ? "text-[#F37021]"
                          : "text-slate-400"
                      }`}
                    />
                    <div>
                      <span className="font-bold text-xs sm:text-sm block">
                        Cinematic Looping Video
                      </span>
                      <span className="text-[11px] opacity-80 block mt-0.5">
                        High-definition industrial / manufacturing looping video (bitopibd.com style).
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateSection("hero", {
                        ...config.hero,
                        backgroundType: "image",
                      })
                    }
                    className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                      config.hero.backgroundType === "image"
                        ? "bg-[#0F2557] text-white border-[#0F2557] shadow-md ring-2 ring-[#F37021]/30"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <ImageIcon
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        config.hero.backgroundType === "image"
                          ? "text-[#F37021]"
                          : "text-slate-400"
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm block">
                          Interactive Image Slider (Multi-Photo Carousel)
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F37021] text-white">
                          {((config.hero as any).images || []).length} Slides Active
                        </span>
                      </div>
                      <span className="text-[11px] opacity-80 block mt-0.5">
                        Multiple rotating banner photos with smooth auto-slide rotation, arrows & dot indicators.
                      </span>
                    </div>
                  </button>
                </div>

                {/* Video Controls (Visible when Video is selected) */}
                {(config.hero.backgroundType === "video" || !config.hero.backgroundType) && (
                  <div className="space-y-5 pt-2">
                    {/* Video File Uploader */}
                    <FileUploader
                      label="Upload Hero Background Video File (.mp4 / .webm)"
                      description="Upload a video file directly from your device into the server."
                      value={config.hero.videoUrl || ""}
                      onChange={(url) =>
                        updateSection("hero", {
                          ...config.hero,
                          videoUrl: url,
                        })
                      }
                      accept="video/mp4,video/webm,video/*"
                      category="hero-video"
                    />

                    {/* Direct Video URL Input */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                      <label className="font-bold text-slate-800 block text-xs sm:text-sm">
                        Or Paste Video Direct URL (.mp4 / CDN Link)
                      </label>
                      <input
                        type="text"
                        value={config.hero.videoUrl || ""}
                        onChange={(e) =>
                          updateSection("hero", {
                            ...config.hero,
                            videoUrl: e.target.value,
                          })
                        }
                        placeholder="https://login.bitopibd.com/uploads/...mp4"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-900 bg-slate-50 focus:bg-white"
                      />
                      <p className="text-[11px] text-slate-500">
                        Default Bitopi Video: <code className="text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[10px]">https://login.bitopibd.com/uploads/sewing_factory_in_klaten_1080p_2025_08_05_00_15_26_utc_170318d437.mp4</code>
                      </p>
                    </div>

                    {/* Video Dark Overlay Opacity Slider */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-bold text-slate-800 text-xs sm:text-sm block">
                            Hero Dark Vignette Overlay Darkness
                          </label>
                          <p className="text-[11px] text-slate-500">
                            Ensures white typography and headlines remain 100% crisp and readable over video motion.
                          </p>
                        </div>
                        <span className="font-mono text-sm font-bold bg-[#0F2557] text-white px-2.5 py-1 rounded-lg">
                          {Math.round((config.hero.videoOverlayOpacity ?? 0.72) * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="0.95"
                        step="0.02"
                        value={config.hero.videoOverlayOpacity ?? 0.72}
                        onChange={(e) =>
                          updateSection("hero", {
                            ...config.hero,
                            videoOverlayOpacity: parseFloat(e.target.value),
                          })
                        }
                        className="w-full accent-[#F37021] cursor-pointer"
                      />
                    </div>

                    {/* Hero Video Audio Sound Toggle */}
                    <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <label className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                            <Volume2 className="w-4 h-4 text-[#F37021]" />
                            <span>Hero Video Audio Sound (Homepage Background Video)</span>
                          </label>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Set whether the homepage background video plays with audio sound enabled or muted by default.
                          </p>
                        </div>
                        <span className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold font-mono ${
                          (config.hero as any).videoSound === "sound"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}>
                          {(config.hero as any).videoSound === "sound" ? "🔊 Sound Enabled (Audio ON)" : "🔇 Muted Default (Silent)"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateSection("hero", {
                              ...config.hero,
                              videoSound: "sound",
                            } as any)
                          }
                          className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            (config.hero as any).videoSound === "sound"
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>Sound Enabled (Audio Plays by Default)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateSection("hero", {
                              ...config.hero,
                              videoSound: "muted",
                            } as any)
                          }
                          className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            (config.hero as any).videoSound !== "sound"
                              ? "bg-[#0F2557] text-white border-[#0F2557] shadow-md shadow-[#0F2557]/20"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <VolumeX className="w-4 h-4" />
                          <span>Muted (Silent Ambience)</span>
                        </button>
                      </div>
                    </div>

                    {/* Live Video Preview in Admin */}
                    {config.hero.videoUrl && (
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-950 text-white space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                            <Play className="w-3.5 h-3.5" />
                            Live Hero Video Preview Player
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Auto-looping preview
                          </span>
                        </div>
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-inner">
                          <video
                            src={config.hero.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                          <div
                            className="absolute inset-0 bg-gradient-to-b from-[#0A1B40]/90 via-[#0A1B40]/70 to-[#0A1B40] pointer-events-none"
                            style={{
                              opacity: config.hero.videoOverlayOpacity ?? 0.72,
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none">
                            <div>
                              <p className="text-[10px] font-bold text-[#F37021] uppercase tracking-widest">
                                Live Overlay Contrast Simulation
                              </p>
                              <h4 className="text-lg sm:text-2xl font-black text-white uppercase mt-1">
                                {config.hero.headline}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Image Controls (Visible when Image / Slider is selected) */}
                {config.hero.backgroundType === "image" && (
                  <div className="space-y-6 pt-2">
                    {/* Multiple Hero Slides Manager */}
                    <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#F37021] flex items-center gap-1.5">
                              <ImageIcon className="w-4 h-4" />
                              <span>Multi-Image Carousel</span>
                            </span>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#0F2557] text-white">
                              {(((config.hero as any).images || []).length || 1)} Slides Active
                            </span>
                          </div>
                          <h3 className="font-black text-slate-900 text-base sm:text-lg mt-0.5">
                            Hero Background Photo Slider & Rotator
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Add multiple high-resolution photographs. The hero displays an interactive, full-bleed auto-sliding carousel with navigation arrows, dots, and smooth crossfade transitions.
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <label className="text-xs font-bold text-slate-700">Auto-Slide Interval:</label>
                          <select
                            value={(config.hero as any).autoSlideInterval ?? 5}
                            onChange={(e) =>
                              updateSection("hero", {
                                ...config.hero,
                                autoSlideInterval: parseInt(e.target.value) || 5,
                              } as any)
                            }
                            className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-300 bg-white text-slate-900 shadow-2xs focus:ring-2 focus:ring-[#F37021]/30 cursor-pointer"
                          >
                            <option value={3}>Every 3 Seconds (Fast)</option>
                            <option value={5}>Every 5 Seconds (Recommended)</option>
                            <option value={7}>Every 7 Seconds (Relaxed)</option>
                            <option value={10}>Every 10 Seconds (Slow)</option>
                            <option value={0}>Manual Only (No Auto-Slide)</option>
                          </select>
                        </div>
                      </div>

                      {/* Standard Image Specifications Guide for Hero Section */}
                      <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/90 text-blue-950 flex items-start gap-3">
                        <Camera className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div className="text-xs space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-bold text-blue-950 text-xs sm:text-sm">
                              Hero Banner Standard Image Specifications
                            </span>
                            <span className="text-[10px] bg-blue-200/80 text-blue-900 font-mono font-bold px-2.5 py-0.5 rounded-full">
                              Recommended Ratio & Size
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11px]">
                            <div className="bg-white/95 p-2.5 rounded-lg border border-blue-100 shadow-2xs">
                              <span className="font-bold block text-slate-800">Aspect Ratio</span>
                              <span className="font-mono text-blue-700 font-bold text-xs">16:9 or 21:9 (Panoramic)</span>
                              <span className="block text-[10px] text-slate-500 mt-0.5">Wide landscape format</span>
                            </div>
                            <div className="bg-white/95 p-2.5 rounded-lg border border-blue-100 shadow-2xs">
                              <span className="font-bold block text-slate-800">Standard Resolution</span>
                              <span className="font-mono text-blue-700 font-bold text-xs">1600 × 541 px to 1920 × 650 px</span>
                              <span className="block text-[10px] text-slate-500 mt-0.5">Ultra-sharp on all screens</span>
                            </div>
                            <div className="bg-white/95 p-2.5 rounded-lg border border-blue-100 shadow-2xs">
                              <span className="font-bold block text-slate-800">Supported Formats</span>
                              <span className="font-mono text-blue-700 font-bold text-xs">JPG, PNG, WebP</span>
                              <span className="block text-[10px] text-slate-500 mt-0.5">Up to 5MB per slide</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-blue-800 leading-relaxed pt-0.5">
                            💡 <strong>Mobile & Desktop Clarity:</strong> Horizontal panoramic images ensure 100% full visibility without cutting off sides on any mobile phone or desktop monitor.
                          </p>
                        </div>
                      </div>

                      {/* Add New Slide Controls: Upload File OR Direct URL OR Load Presets */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 1. Upload File */}
                        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                          <strong className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5 text-[#F37021]" />
                            <span>Upload Image from Device</span>
                          </strong>
                          <FileUploader
                            label="Select Hero Photo"
                            description="Uploads photo directly and appends it to the hero slider rotation."
                            recommendedRatio="16:9 or 21:9 (Panoramic)"
                            recommendedSize="1600 × 541 px to 1920 × 650 px (Max 5MB)"
                            value=""
                            onChange={(url) => {
                              if (!url) return;
                              const currentList = (
                                (config.hero as any).images && (config.hero as any).images.length > 0
                                  ? (config.hero as any).images
                                  : [(config.hero as any).imageUrl || config.branding.heroBanner]
                              ).filter(Boolean);
                              const updated = [...currentList, url];
                              updateSection("hero", {
                                ...config.hero,
                                imageUrl: updated[0],
                                images: updated,
                              } as any);
                              updateSection("branding", {
                                ...config.branding,
                                heroBanner: updated[0],
                              });
                            }}
                            accept="image/*"
                            category="hero-image"
                          />
                        </div>

                        {/* 2. Direct URL or Load Presets */}
                        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3">
                          <div className="space-y-2">
                            <strong className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                              <Plus className="w-3.5 h-3.5 text-[#0F2557]" />
                              <span>Or Paste Direct Image URL</span>
                            </strong>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={newSlideUrl}
                                onChange={(e) => setNewSlideUrl(e.target.value)}
                                placeholder="https://... or /uploads/..."
                                className="flex-1 px-3 py-2 text-xs font-mono text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (!newSlideUrl.trim()) return;
                                  const currentList = (
                                    (config.hero as any).images && (config.hero as any).images.length > 0
                                      ? (config.hero as any).images
                                      : [(config.hero as any).imageUrl || config.branding.heroBanner]
                                  ).filter(Boolean);
                                  const updated = [...currentList, newSlideUrl.trim()];
                                  updateSection("hero", {
                                    ...config.hero,
                                    imageUrl: updated[0],
                                    images: updated,
                                  } as any);
                                  setNewSlideUrl("");
                                }}
                                className="px-3.5 py-2 bg-[#0F2557] hover:bg-[#1A3978] text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer shrink-0"
                              >
                                + Add URL
                              </button>
                            </div>
                          </div>

                          {/* Preset button */}
                          <button
                            type="button"
                            onClick={() => {
                              const industrialPresets = [
                                "/uploads/hero-image-whatsapp-image-2026-11-19-at-10-49-56-pm-1795193648639.jpeg",
                                "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?q=80&w=1600&auto=format&fit=crop",
                                "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1600&auto=format&fit=crop",
                                "/img/radial-power-substation-spec.png"
                              ];
                              updateSection("hero", {
                                ...config.hero,
                                imageUrl: industrialPresets[0],
                                images: industrialPresets,
                              } as any);
                            }}
                            className="w-full py-2 px-3 rounded-lg border border-dashed border-[#F37021]/50 text-[#F37021] hover:bg-orange-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Load 4 High-Resolution Industrial Slides (Preset)</span>
                          </button>
                        </div>
                      </div>

                      {/* List of Hero Slide Images */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                            Current Hero Slides ({(((config.hero as any).images || []).length || 1)})
                          </h4>
                          <span className="text-[11px] text-slate-400">
                            Drag or use arrows to reorder slide sequence
                          </span>
                        </div>

                        {(((config.hero as any).images && (config.hero as any).images.length > 0)
                          ? (config.hero as any).images
                          : [(config.hero as any).imageUrl || config.branding.heroBanner]
                        ).filter(Boolean).map((imgUrl: string, idx: number, arr: string[]) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5 group hover:border-[#0F2557]/40 transition-all"
                          >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0 flex-1 w-full">
                                <span className="w-6 h-6 rounded-full bg-[#0F2557] text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
                                  <img
                                    src={imgUrl}
                                    alt={`Slide ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <input
                                    type="text"
                                    value={imgUrl}
                                    onChange={(e) => {
                                      const next = [...arr];
                                      next[idx] = e.target.value;
                                      updateSection("hero", {
                                        ...config.hero,
                                        imageUrl: next[0],
                                        images: next,
                                      } as any);
                                    }}
                                    placeholder="Image URL or /uploads/..."
                                    className="w-full px-2.5 py-1 text-xs font-mono text-slate-800 border border-slate-200 rounded bg-slate-50 focus:bg-white"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                                {/* Move Up */}
                                {idx > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const next = [...arr];
                                      const temp = next[idx - 1];
                                      next[idx - 1] = next[idx];
                                      next[idx] = temp;
                                      updateSection("hero", {
                                        ...config.hero,
                                        imageUrl: next[0],
                                        images: next,
                                      } as any);
                                    }}
                                    className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                                    title="Move slide earlier"
                                  >
                                    ▲ Up
                                  </button>
                                )}
                                {/* Move Down */}
                                {idx < arr.length - 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const next = [...arr];
                                      const temp = next[idx + 1];
                                      next[idx + 1] = next[idx];
                                      next[idx] = temp;
                                      updateSection("hero", {
                                        ...config.hero,
                                        imageUrl: next[0],
                                        images: next,
                                      } as any);
                                    }}
                                    className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                                    title="Move slide later"
                                  >
                                    ▼ Down
                                  </button>
                                )}
                                {/* Delete Slide */}
                                {arr.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const next = arr.filter((_, i) => i !== idx);
                                      updateSection("hero", {
                                        ...config.hero,
                                        imageUrl: next[0] || "",
                                        images: next,
                                      } as any);
                                    }}
                                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                                    title="Delete this slide"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Live Hero Slider Real-Time Simulation in Admin */}
                      <div className="p-4 rounded-2xl border border-slate-200 bg-slate-900 text-white space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                            <Play className="w-3.5 h-3.5" />
                            <span>Live Hero Image Slider Simulation</span>
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                            ● Auto-rotating every {(config.hero as any).autoSlideInterval || 5}s
                          </span>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg relative bg-black aspect-[16/7] max-h-[300px]">
                          <HeroImageSlider
                            images={
                              ((config.hero as any).images && (config.hero as any).images.length > 0)
                                ? (config.hero as any).images
                                : [(config.hero as any).imageUrl || config.branding.heroBanner]
                            }
                            alt="Admin Live Preview"
                            autoSlideInterval={(config.hero as any).autoSlideInterval || 5}
                            hasAnyTextContent={false}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Image Contrast Overlay Slider */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-bold text-slate-800 text-xs sm:text-sm block">
                            Hero Image Contrast Overlay Darkness
                          </label>
                          <p className="text-[11px] text-slate-500">
                            Set to <strong>0%</strong> for 100% pure, natural, crisp image clarity with zero dark filters. Increase only if you want dark contrast behind white text.
                          </p>
                        </div>
                        <span className="font-mono text-sm font-bold bg-[#0F2557] text-white px-2.5 py-1 rounded-lg">
                          {Math.round((config.hero.videoOverlayOpacity ?? 0) * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="0.9"
                        step="0.02"
                        value={config.hero.videoOverlayOpacity ?? 0}
                        onChange={(e) =>
                          updateSection("hero", {
                            ...config.hero,
                            videoOverlayOpacity: parseFloat(e.target.value),
                          })
                        }
                        className="w-full accent-[#F37021] cursor-pointer"
                      />
                    </div>

                    {/* Live Image Preview in Admin */}
                    {((config.hero as any).imageUrl || config.branding.heroBanner) && (
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-950 text-white space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5" />
                            Live Hero Image Preview Simulation
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            High-res static preview
                          </span>
                        </div>
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-inner">
                          <img
                            src={(config.hero as any).imageUrl || config.branding.heroBanner}
                            alt="Hero Image Preview"
                            className="w-full h-full object-cover"
                          />
                          {(config.hero.videoOverlayOpacity ?? 0) > 0 && (
                            <div
                              className="absolute inset-0 bg-black/60 pointer-events-none"
                              style={{
                                opacity: config.hero.videoOverlayOpacity,
                              }}
                            />
                          )}
                          {Boolean(config.hero.headline?.trim()) && (
                            <div className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none">
                              <div>
                                <p className="text-[10px] font-bold text-[#F37021] uppercase tracking-widest">
                                  Live Overlay Simulation
                                </p>
                                <h4 className="text-lg sm:text-2xl font-black text-white uppercase mt-1">
                                  {config.hero.headline}
                                </h4>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Text Headlines & CTAs */}
              <div className="space-y-4 text-xs pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Headlines, CTAs & Overlay Copy
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Leave any field blank to completely hide it on the website.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateSection("hero", {
                          ...config.hero,
                          badgeText: "",
                          headline: "",
                          subtitle: "",
                          primaryCtaText: "",
                          secondaryCtaText: "",
                          videoOverlayOpacity: 0,
                          showRibbon: false,
                        } as any)
                      }
                      className="px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#F37021] border border-orange-200 font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      Clear All Text (Clean Banner Only)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateSection("hero", {
                          ...config.hero,
                          badgeText: "WELCOME TO BHUIYAN GROUP • POWERING PROGRESS",
                          headline: "WHERE EXCELLENCE MEETS EVERY INDUSTRIAL HORIZON",
                          subtitle: "Pioneering Tier-1 Turnkey Power Generation, Utility-Scale Solar Parks, Electro-Mechanical Grid Solutions, and Critical Infrastructure EPC.",
                          primaryCtaText: "Explore Sister Concerns",
                          secondaryCtaText: "Company Brochure",
                          videoOverlayOpacity: 0.35,
                          showRibbon: true,
                        } as any)
                      }
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      Restore Standard Text
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Top Animated Badge Text <span className="font-normal text-slate-400">(leave blank to hide)</span>
                  </label>
                  <input
                    type="text"
                    value={config.hero.badgeText}
                    onChange={(e) =>
                      updateSection("hero", {
                        ...config.hero,
                        badgeText: e.target.value,
                      })
                    }
                    placeholder="Leave blank or enter: DIVERSIFIED INDUSTRIAL CONGLOMERATE • BANGLADESH"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Main Hero Headline <span className="font-normal text-slate-400">(leave blank to hide)</span>
                  </label>
                  <input
                    type="text"
                    value={config.hero.headline}
                    onChange={(e) =>
                      updateSection("hero", {
                        ...config.hero,
                        headline: e.target.value,
                      })
                    }
                    placeholder="Leave blank or enter: POWERING NATIONAL PROGRESS, ENGINEERING SUSTAINABLE FUTURES"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-base font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Hero Subtitle / Description <span className="font-normal text-slate-400">(leave blank to hide)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={config.hero.subtitle}
                    onChange={(e) =>
                      updateSection("hero", {
                        ...config.hero,
                        subtitle: e.target.value,
                      })
                    }
                    placeholder="Leave blank or enter descriptive paragraph..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>

                {/* Primary CTA Management */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Primary CTA Button Text <span className="font-normal text-slate-400">(leave blank to hide)</span>
                    </label>
                    <input
                      type="text"
                      value={config.hero.primaryCtaText}
                      onChange={(e) =>
                        updateSection("hero", {
                          ...config.hero,
                          primaryCtaText: e.target.value,
                        })
                      }
                      placeholder="Leave blank or enter: Explore Sister Concerns"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Primary CTA Target Link
                    </label>
                    <input
                      type="text"
                      value={config.hero.primaryCtaLink || "#sister-concerns"}
                      onChange={(e) =>
                        updateSection("hero", {
                          ...config.hero,
                          primaryCtaLink: e.target.value,
                        })
                      }
                      placeholder="#sister-concerns or /projects"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-900 bg-white"
                    />
                  </div>
                </div>

                {/* Secondary CTA Management */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Secondary CTA Button Text <span className="font-normal text-slate-400">(leave blank to hide)</span>
                    </label>
                    <input
                      type="text"
                      value={config.hero.secondaryCtaText}
                      onChange={(e) =>
                        updateSection("hero", {
                          ...config.hero,
                          secondaryCtaText: e.target.value,
                        })
                      }
                      placeholder="Leave blank or enter: Company Brochure"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Secondary CTA Target Link / Action
                    </label>
                    <input
                      type="text"
                      value={config.hero.secondaryCtaLink || "#corporate-contact"}
                      onChange={(e) =>
                        updateSection("hero", {
                          ...config.hero,
                          secondaryCtaLink: e.target.value,
                        })
                      }
                      placeholder="#corporate-contact or /contact"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-900 bg-white"
                    />
                  </div>
                </div>

                {/* Capabilities Ribbon Toggle */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4">
                  <div>
                    <label className="font-bold text-slate-800 text-xs sm:text-sm block">
                      Show Bottom Capabilities & Key Stats Ribbon in Hero
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Shows the pills at the bottom (350+ MW Power Generation, 45+ MWp Solar, etc.). Turn off to keep the hero banner completely clean.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={Boolean((config.hero as any).showRibbon)}
                    onChange={(e) =>
                      updateSection("hero", {
                        ...config.hero,
                        showRibbon: e.target.checked,
                      } as any)
                    }
                    className="w-5 h-5 accent-[#F37021] cursor-pointer rounded shrink-0"
                  />
                </div>

                {/* Sister Concerns Auto-Scrolling Marquee Toggle & Title */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <label className="font-bold text-slate-800 text-xs sm:text-sm block">
                        Sister Concerns Auto-Scrolling Logo Ticker (Directly Below Hero)
                      </label>
                      <p className="text-[11px] text-slate-500">
                        Shows the continuous infinite scrolling ribbon of Sister Concern logos with hover bounce effects directly underneath the hero section.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={(config.hero as any).showSisterConcernsMarquee !== false}
                      onChange={(e) =>
                        updateSection("hero", {
                          ...config.hero,
                          showSisterConcernsMarquee: e.target.checked,
                        } as any)
                      }
                      className="w-5 h-5 accent-[#F37021] cursor-pointer rounded shrink-0"
                    />
                  </div>

                  {(config.hero as any).showSisterConcernsMarquee !== false && (
                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-center">
                      <div className="w-full sm:w-2/3">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Ticker Header Badge Text
                        </label>
                        <input
                          type="text"
                          value={(config.hero as any).marqueeBadgeText || "OUR SISTER CONCERNS & STRATEGIC SUBSIDIARIES"}
                          onChange={(e) =>
                            updateSection("hero", {
                              ...config.hero,
                              marqueeBadgeText: e.target.value,
                            } as any)
                          }
                          placeholder="OUR SISTER CONCERNS & STRATEGIC SUBSIDIARIES"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
                        />
                      </div>
                      <div className="w-full sm:w-1/3 flex items-center justify-end text-xs text-slate-500 pt-4 sm:pt-0">
                        <span>✨ Live Infinite Scrolling with Hover Pause</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SISTER CONCERNS MODULE - FULL CRUD ENGINE */}
          {activeTab === "concerns" && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
              {/* Header with Title and Add Button */}
              <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F37021]">
                      Autonomous Subsidiaries
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#0F2557] text-white">
                      {config.sisterConcerns.length} Concerns Active
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-[#0F2557] mt-1">
                    Manage Sister Concerns (CRUD)
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Create new subsidiaries, edit branding, logos, contact info, key metrics, or delete concerns anytime.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const count = config.sisterConcerns.length + 1;
                      const slug = `subsidiary-${Date.now().toString().slice(-4)}`;
                      const newConcern = {
                        id: slug,
                        name: `New Sister Concern ${count}`,
                        slug: slug,
                        shortName: `Concern ${count}`,
                        tagline: "Engineering Excellence & Dedicated Industrial Services",
                        sector: "Industrial Systems & Engineering",
                        description: "Leading provider of turnkey industrial solutions, sustainable power systems, and engineering infrastructure across Bangladesh.",
                        longDescription: "This subsidiary delivers world-class engineering operations, specialized maintenance contracting, and resilient systems engineered to meet international safety and operational codes.",
                        foundedYear: new Date().getFullYear().toString(),
                        iconName: "Zap",
                        logo: "/img/bhuiyan-group-logo-horizontal.png",
                        keySpecialties: [
                          "Turnkey EPC Engineering & Project Execution",
                          "Certified Industrial Grade Quality Assurance",
                          "Nationwide 24/7 Rapid Emergency Response"
                        ],
                        stats: [
                          { label: "Completed Projects", value: "25+" },
                          { label: "Client Satisfaction", value: "99.8%" },
                          { label: "Service Outlets", value: "10+" }
                        ],
                        contactInfo: {
                          phone: config.general?.hotline || "+880 1711-000000",
                          email: config.general?.email || "info@bhuiyangroup.com.bd",
                          office: "Bhuiyan Corporate Tower, Level 8, Gulshan-1, Dhaka"
                        },
                        capabilities: [
                          {
                            title: "Specialized Turnkey Engineering",
                            description: "Certified design, precision fabrication, and commissioning conforming to international standards."
                          }
                        ],
                        galleryImages: [],
                        galleryVideos: []
                      };
                      const updated = [...config.sisterConcerns, newConcern];
                      updateSection("sisterConcerns", updated);
                      setSelectedConcernIndex(updated.length - 1);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#DE5F12] text-white font-bold text-xs shadow-md shadow-[#F37021]/30 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Sister Concern</span>
                  </button>
                </div>
              </div>

              {/* Sister Concern Selector Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
                {config.sisterConcerns.map((sc, i) => (
                  <button
                    key={sc.id || `concern-${i}`}
                    onClick={() => setSelectedConcernIndex(i)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                      selectedConcernIndex === i
                        ? "bg-[#0F2557] text-white border-[#0F2557] shadow-sm ring-2 ring-[#0F2557]/20"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#F37021]" />
                    <span>{sc.shortName || sc.name}</span>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const count = config.sisterConcerns.length + 1;
                    const slug = `subsidiary-${Date.now().toString().slice(-4)}`;
                    const newConcern = {
                      id: slug,
                      name: `New Sister Concern ${count}`,
                      slug: slug,
                      shortName: `Concern ${count}`,
                      tagline: "Engineering Excellence & Dedicated Industrial Services",
                      sector: "Industrial Systems & Engineering",
                      description: "Leading provider of turnkey industrial solutions and infrastructure services across Bangladesh.",
                      longDescription: "Delivering world-class engineering operations, specialized maintenance contracting, and resilient systems.",
                      foundedYear: new Date().getFullYear().toString(),
                      iconName: "Zap",
                      logo: "/img/bhuiyan-group-logo-horizontal.png",
                      keySpecialties: [
                        "Turnkey EPC Engineering & Project Execution",
                        "Certified Industrial Grade Quality Assurance",
                        "Nationwide 24/7 Rapid Emergency Response"
                      ],
                      stats: [
                        { label: "Completed Projects", value: "25+" },
                        { label: "Client Satisfaction", value: "99.8%" },
                        { label: "Service Outlets", value: "10+" }
                      ],
                      contactInfo: {
                        phone: config.general?.hotline || "+880 1711-000000",
                        email: config.general?.email || "info@bhuiyangroup.com.bd",
                        office: "Bhuiyan Corporate Tower, Level 8, Gulshan-1, Dhaka"
                      },
                      capabilities: [
                        {
                          title: "Specialized Turnkey Engineering",
                          description: "Certified design, precision fabrication, and commissioning conforming to international standards."
                        }
                      ],
                      galleryImages: [],
                      galleryVideos: []
                    };
                    const updated = [...config.sisterConcerns, newConcern];
                    updateSection("sisterConcerns", updated);
                    setSelectedConcernIndex(updated.length - 1);
                  }}
                  className="px-3 py-2 rounded-xl border border-dashed border-slate-300 text-slate-500 hover:text-[#F37021] hover:border-[#F37021] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ New</span>
                </button>
              </div>

              {/* Edit Current Sister Concern */}
              {config.sisterConcerns[selectedConcernIndex] && (
                <div className="space-y-6 text-xs">
                  {(() => {
                    const sc = config.sisterConcerns[selectedConcernIndex];
                    const updateConcern = (fields: Partial<typeof sc>) => {
                      const updated = [...config.sisterConcerns];
                      updated[selectedConcernIndex] = { ...sc, ...fields };
                      updateSection("sisterConcerns", updated);
                    };

                    return (
                      <>
                        {/* Selected Concern Action Bar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 overflow-hidden shrink-0">
                              <img
                                src={sc.logo || "/img/bhuiyan-group-logo-horizontal.png"}
                                alt={sc.name}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-sm text-slate-900">
                                  {sc.name}
                                </h3>
                                <span className="text-[10px] font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                                  slug: {sc.slug}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500">
                                Sector: {sc.sector || "General"} • Founded: {sc.foundedYear}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Duplicate Concern */}
                            <button
                              type="button"
                              onClick={() => {
                                const clone = {
                                  ...sc,
                                  id: `concern-${Date.now().toString().slice(-4)}`,
                                  slug: `${sc.slug}-copy`,
                                  name: `${sc.name} (Copy)`,
                                  shortName: `${sc.shortName} Copy`,
                                };
                                const updated = [...config.sisterConcerns, clone];
                                updateSection("sisterConcerns", updated);
                                setSelectedConcernIndex(updated.length - 1);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
                            >
                              Duplicate
                            </button>

                            {/* Delete Concern */}
                            <button
                              type="button"
                              onClick={() => {
                                if (config.sisterConcerns.length <= 1) {
                                  alert("You must keep at least one sister concern.");
                                  return;
                                }
                                const ok = window.confirm(`Are you sure you want to delete "${sc.name}"? This will permanently remove it from the website, navbar, ticker, and footer.`);
                                if (ok) {
                                  const updated = config.sisterConcerns.filter((_, idx) => idx !== selectedConcernIndex);
                                  updateSection("sisterConcerns", updated);
                                  setSelectedConcernIndex(Math.max(0, selectedConcernIndex - 1));
                                }
                              }}
                              className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>

                        {/* Sister Concern Media Hub & Quick Action Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-gradient-to-r from-orange-50/80 via-blue-50/60 to-slate-50 border border-orange-200/70 shadow-2xs">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#F37021]" />
                              <span>{sc.name} Media Hub:</span>
                            </span>
                            <a
                              href="#subsidiary-photos"
                              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-700 hover:text-[#F37021] hover:border-[#F37021] flex items-center gap-1.5 transition-colors shadow-2xs"
                            >
                              <Camera className="w-3.5 h-3.5 text-[#F37021]" />
                              <span>Photo Gallery ({((sc as any).galleryImages || []).length})</span>
                            </a>
                            <a
                              href="#subsidiary-videos"
                              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-700 hover:text-[#0F2557] hover:border-[#0F2557] flex items-center gap-1.5 transition-colors shadow-2xs"
                            >
                              <Film className="w-3.5 h-3.5 text-[#0F2557]" />
                              <span>Video Reels ({((sc as any).galleryVideos || []).length})</span>
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const current = (sc as any).galleryImages || [];
                                const newItem = {
                                  id: `${sc.id}-img-${Date.now()}`,
                                  title: `${sc.name} Field Operation & Infrastructure`,
                                  imageUrl: "/img/radial-power-substation-spec.png",
                                  caption: "On-site engineering installation and project deployment."
                                };
                                updateConcern({ galleryImages: [newItem, ...current] } as any);
                                const el = document.getElementById("subsidiary-photos");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F37021] hover:bg-[#DE5F12] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>+ Add Photo</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                const current = (sc as any).galleryVideos || [];
                                const newItem = {
                                  id: `${sc.id}-vid-${Date.now()}`,
                                  title: `${sc.name} Project Operation Reel`,
                                  videoUrl: "https://login.bitopibd.com/uploads/sewing_factory_in_klaten_1080p_2025_08_05_00_15_26_utc_170318d437.mp4",
                                  thumbnailUrl: sc.logo || "/img/bhuiyan-group-hero-banner.jpg",
                                  caption: "Live engineering commissioning, field footage, and operational overview.",
                                  sound: "sound"
                                };
                                updateConcern({ galleryVideos: [newItem, ...current] } as any);
                                const el = document.getElementById("subsidiary-videos");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F2557] hover:bg-[#1A3978] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5 text-orange-400" />
                              <span>+ Add Video Reel</span>
                            </button>
                          </div>
                        </div>

                        {/* General Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                          <div className="sm:col-span-2">
                            <label className="block font-bold text-slate-700 mb-1">
                              Company Full Name
                            </label>
                            <input
                              type="text"
                              value={sc.name}
                              onChange={(e) => updateConcern({ name: e.target.value })}
                              placeholder="e.g. Generex Power"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 font-bold"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">
                              Short Display Name
                            </label>
                            <input
                              type="text"
                              value={sc.shortName}
                              onChange={(e) => updateConcern({ shortName: e.target.value })}
                              placeholder="e.g. Generex"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">
                              Founded Year
                            </label>
                            <input
                              type="text"
                              value={sc.foundedYear}
                              onChange={(e) => updateConcern({ foundedYear: e.target.value })}
                              placeholder="e.g. 2012"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900"
                            />
                          </div>
                        </div>

                        {/* Sector, Slug & Icon */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2">
                            <label className="block font-bold text-slate-700 mb-1">
                              Industry Sector / Domain
                            </label>
                            <input
                              type="text"
                              value={sc.sector}
                              onChange={(e) => updateConcern({ sector: e.target.value })}
                              placeholder="e.g. Power Generation & Energy Systems"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">
                              URL Slug Identifier
                            </label>
                            <input
                              type="text"
                              value={sc.slug}
                              onChange={(e) => updateConcern({ slug: e.target.value, id: e.target.value })}
                              placeholder="e.g. generex-power"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-slate-900"
                            />
                          </div>
                        </div>

                        {/* Logo Upload Box */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                          <FileUploader
                            label={`${sc.name} Official Logo`}
                            description="Upload high-resolution PNG, JPG, or SVG logo for this sister concern. Displayed on the ticker marquee, cards, and details page."
                            recommendedRatio="1:1 Square or 4:3 (Horizontal auto-fits)"
                            recommendedSize="400 × 400 px or 500 × 500 px (Transparent PNG/SVG)"
                            value={sc.logo || ""}
                            onChange={(url) => updateConcern({ logo: url })}
                            category={`concern-${sc.slug}`}
                            accept="image/*"
                          />

                          <div className="flex items-center gap-3">
                            <label className="text-slate-600 font-bold shrink-0">
                              Or Paste Logo Image Path:
                            </label>
                            <input
                              type="text"
                              value={sc.logo || ""}
                              onChange={(e) => updateConcern({ logo: e.target.value })}
                              placeholder="/img/generex-power-logo.png"
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-900 bg-white"
                            />
                          </div>
                        </div>

                        {/* Tagline & Short Summary */}
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Tagline / Motto
                          </label>
                          <input
                            type="text"
                            value={sc.tagline}
                            onChange={(e) => updateConcern({ tagline: e.target.value })}
                            placeholder="e.g. Uncompromised Industrial Power & Energy Reliability"
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Short Summary (Card Preview)
                          </label>
                          <textarea
                            rows={2}
                            value={sc.description}
                            onChange={(e) => updateConcern({ description: e.target.value })}
                            placeholder="Brief summary displayed on cards..."
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Detailed Long Description (Modal & Full Profile)
                          </label>
                          <textarea
                            rows={3}
                            value={sc.longDescription}
                            onChange={(e) => updateConcern({ longDescription: e.target.value })}
                            placeholder="Detailed background, capabilities, and market position..."
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900"
                          />
                        </div>

                        {/* Direct Contacts */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                          <strong className="block text-slate-800">
                            Subsidiary Contact Information
                          </strong>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] text-slate-600 mb-1">
                                Phone
                              </label>
                              <input
                                type="text"
                                value={sc.contactInfo?.phone || ""}
                                onChange={(e) =>
                                  updateConcern({
                                    contactInfo: { ...(sc.contactInfo || {}), phone: e.target.value } as any,
                                  })
                                }
                                placeholder="+880 1711-000001"
                                className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-slate-900 bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-slate-600 mb-1">
                                Email
                              </label>
                              <input
                                type="text"
                                value={sc.contactInfo?.email || ""}
                                onChange={(e) =>
                                  updateConcern({
                                    contactInfo: { ...(sc.contactInfo || {}), email: e.target.value } as any,
                                  })
                                }
                                placeholder="concern@bhuiyangroup.com.bd"
                                className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-slate-900 bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-slate-600 mb-1">
                                Office Location
                              </label>
                              <input
                                type="text"
                                value={sc.contactInfo?.office || ""}
                                onChange={(e) =>
                                  updateConcern({
                                    contactInfo: { ...(sc.contactInfo || {}), office: e.target.value } as any,
                                  })
                                }
                                placeholder="Bhuiyan Corporate Tower, Dhaka"
                                className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-slate-900 bg-white"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Key Specialties Manager */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <strong className="block text-slate-800">
                              Key Specialties / Core Solutions ({sc.keySpecialties?.length || 0})
                            </strong>
                            <button
                              type="button"
                              onClick={() => {
                                const specialties = [...(sc.keySpecialties || []), "New Engineering Specialty"];
                                updateConcern({ keySpecialties: specialties });
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:text-[#F37021] text-xs font-bold cursor-pointer"
                            >
                              + Add Specialty
                            </button>
                          </div>

                          <div className="space-y-2">
                            {(sc.keySpecialties || []).map((spec, sIdx) => (
                              <div key={sIdx} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={spec}
                                  onChange={(e) => {
                                    const updatedSpecs = [...sc.keySpecialties];
                                    updatedSpecs[sIdx] = e.target.value;
                                    updateConcern({ keySpecialties: updatedSpecs });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 bg-white text-xs"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedSpecs = sc.keySpecialties.filter((_, idx) => idx !== sIdx);
                                    updateConcern({ keySpecialties: updatedSpecs });
                                  }}
                                  className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                  title="Remove Specialty"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Subsidiary Photo Gallery Manager */}
                        <div id="subsidiary-photos" className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 scroll-mt-6">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                            <div>
                              <strong className="block text-slate-900 text-sm sm:text-base flex items-center gap-2">
                                <Camera className="w-4 h-4 text-[#F37021]" />
                                <span>{sc.name} Photo Gallery ({((sc as any).galleryImages || []).length})</span>
                              </strong>
                              <p className="text-xs text-slate-500 mt-0.5">
                                High-resolution photos displayed on this subsidiary&apos;s details page with zoom lightbox and auto-scrolling gallery.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const current = (sc as any).galleryImages || [];
                                const newItem = {
                                  id: `${sc.id}-img-${Date.now()}`,
                                  title: `${sc.name} Facility Documentation`,
                                  imageUrl: sc.logo || "/img/radial-power-substation-spec.png",
                                  caption: "Field deployment and engineering infrastructure."
                                };
                                updateConcern({ galleryImages: [newItem, ...current] } as any);
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F37021] hover:bg-[#DE5F12] text-white font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0"
                            >
                              <Plus className="w-4 h-4" />
                              <span>+ Add New Photo</span>
                            </button>
                          </div>

                          {/* Quick Add Photo Card with Direct Inputs & Uploader */}
                          <div className="p-4 rounded-xl bg-white border border-orange-200/80 shadow-2xs space-y-3">
                            <span className="text-xs font-bold text-[#F37021] flex items-center gap-1.5">
                              <Plus className="w-3.5 h-3.5" />
                              <span>Upload & Add Direct Photo File</span>
                            </span>
                            <FileUploader
                              label="Upload Facility & Project Photo"
                              description="Supports JPG, PNG, WEBP, SVG. High-resolution factory, machinery, or project photo."
                              recommendedRatio="16:9 or 4:3 (Landscape)"
                              recommendedSize="1200 × 800 px to 1920 × 1080 px (Max 5MB)"
                              value=""
                              onChange={(url) => {
                                if (!url) return;
                                const current = (sc as any).galleryImages || [];
                                const newItem = {
                                  id: `${sc.id}-img-${Date.now()}`,
                                  title: `${sc.name} Project Facility`,
                                  imageUrl: url,
                                  caption: "Operational project installation and facility testing."
                                };
                                updateConcern({ galleryImages: [...current, newItem] } as any);
                              }}
                              accept="image/*"
                              category="concern-gallery"
                            />
                          </div>

                          {/* List of images */}
                          <div className="space-y-4">
                            {((sc as any).galleryImages || []).length === 0 ? (
                              <div className="p-6 text-center text-xs text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
                                No photos added yet. Click &quot;+ Add New Photo&quot; or upload from device above to add photos.
                              </div>
                            ) : (
                              ((sc as any).galleryImages || []).map((img: any, gIdx: number) => (
                                <div
                                  key={img.id || gIdx}
                                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3"
                                >
                                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                      <Camera className="w-3.5 h-3.5 text-[#F37021]" />
                                      <span>Photo #{gIdx + 1}: {img.title || "Untitled Photo"}</span>
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = ((sc as any).galleryImages || []).filter((_: any, idx: number) => idx !== gIdx);
                                        updateConcern({ galleryImages: updated } as any);
                                      }}
                                      className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                      title="Delete photo"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span>Remove</span>
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-start">
                                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                      <img
                                        src={img.imageUrl}
                                        alt={img.title || "Gallery photo"}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="sm:col-span-3 space-y-2">
                                      <div>
                                        <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Photo Title</label>
                                        <input
                                          type="text"
                                          value={img.title || ""}
                                          onChange={(e) => {
                                            const updated = [...((sc as any).galleryImages || [])];
                                            updated[gIdx] = { ...updated[gIdx], title: e.target.value };
                                            updateConcern({ galleryImages: updated } as any);
                                          }}
                                          placeholder="e.g. Automated High-Voltage Distribution Line"
                                          className="w-full px-3 py-1.5 text-xs font-bold text-slate-900 border border-slate-300 rounded-lg bg-white"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Badge / Tag (Card Top Label, e.g. Field Documentation)</label>
                                        <input
                                          type="text"
                                          value={img.tag !== undefined ? img.tag : (img.category || "Field Documentation")}
                                          onChange={(e) => {
                                            const updated = [...((sc as any).galleryImages || [])];
                                            updated[gIdx] = { ...updated[gIdx], tag: e.target.value };
                                            updateConcern({ galleryImages: updated } as any);
                                          }}
                                          placeholder="e.g. Field Documentation or Site Works"
                                          className="w-full px-3 py-1.5 text-xs text-slate-700 border border-slate-300 rounded-lg bg-white"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Caption & Description</label>
                                        <input
                                          type="text"
                                          value={img.caption || ""}
                                          onChange={(e) => {
                                            const updated = [...((sc as any).galleryImages || [])];
                                            updated[gIdx] = { ...updated[gIdx], caption: e.target.value };
                                            updateConcern({ galleryImages: updated } as any);
                                          }}
                                          placeholder="Field deployment and technical documentation..."
                                          className="w-full px-3 py-1.5 text-xs text-slate-700 border border-slate-300 rounded-lg bg-white"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Image Direct URL or Path</label>
                                        <input
                                          type="text"
                                          value={img.imageUrl || ""}
                                          onChange={(e) => {
                                            const updated = [...((sc as any).galleryImages || [])];
                                            updated[gIdx] = { ...updated[gIdx], imageUrl: e.target.value };
                                            updateConcern({ galleryImages: updated } as any);
                                          }}
                                          placeholder="/uploads/... or https://..."
                                          className="w-full px-3 py-1.5 text-[11px] font-mono text-slate-600 border border-slate-300 rounded-lg bg-white"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <FileUploader
                                    label="Replace Image File"
                                    description="Upload a new file to replace this specific photograph."
                                    recommendedRatio="16:9 or 4:3 (Landscape)"
                                    recommendedSize="1200 × 800 px to 1920 × 1080 px"
                                    value={img.imageUrl || ""}
                                    onChange={(url) => {
                                      if (!url) return;
                                      const updated = [...((sc as any).galleryImages || [])];
                                      updated[gIdx] = { ...updated[gIdx], imageUrl: url };
                                      updateConcern({ galleryImages: updated } as any);
                                    }}
                                    accept="image/*"
                                    category="concern-gallery"
                                  />
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Subsidiary Video Gallery Manager */}
                        <div id="subsidiary-videos" className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 scroll-mt-6">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                            <div>
                              <strong className="block text-slate-900 text-sm sm:text-base flex items-center gap-2">
                                <Film className="w-4 h-4 text-[#F37021]" />
                                <span>{sc.name} Video Gallery ({((sc as any).galleryVideos || []).length})</span>
                              </strong>
                              <p className="text-xs text-slate-500 mt-0.5">
                                Video reels and field footage displayed on this subsidiary&apos;s details page with video player and audio controls.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const current = (sc as any).galleryVideos || [];
                                const newItem = {
                                  id: `${sc.id}-vid-${Date.now()}`,
                                  title: `${sc.name} Field Engineering Reel`,
                                  videoUrl: "https://login.bitopibd.com/uploads/sewing_factory_in_klaten_1080p_2025_08_05_00_15_26_utc_170318d437.mp4",
                                  thumbnailUrl: sc.logo || "",
                                  caption: "Field engineering, commissioning, and live operations.",
                                  sound: "sound"
                                };
                                updateConcern({ galleryVideos: [newItem, ...current] } as any);
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F2557] hover:bg-[#1A3978] text-white font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0"
                            >
                              <Plus className="w-4 h-4 text-orange-400" />
                              <span>+ Add New Video Reel</span>
                            </button>
                          </div>

                          {/* Quick Add Video File Card */}
                          <div className="p-4 rounded-xl bg-white border border-blue-200/80 shadow-2xs space-y-3">
                            <span className="text-xs font-bold text-[#0F2557] flex items-center gap-1.5">
                              <Plus className="w-3.5 h-3.5 text-[#F37021]" />
                              <span>Upload & Add Direct Video File (.mp4)</span>
                            </span>
                            <FileUploader
                              label="Upload Video Reel From Device (.mp4 / .webm)"
                              description="Directly uploads video to the server and creates a new reel for this subsidiary."
                              recommendedRatio="16:9 (Widescreen)"
                              recommendedSize="1920 × 1080 px (1080p Full HD) or 720p"
                              value=""
                              onChange={(url) => {
                                if (!url) return;
                                const current = (sc as any).galleryVideos || [];
                                const newItem = {
                                  id: `${sc.id}-vid-${Date.now()}`,
                                  title: `${sc.name} Field Engineering Reel`,
                                  videoUrl: url,
                                  thumbnailUrl: sc.logo || "",
                                  caption: "Field engineering, commissioning, and live operations.",
                                  sound: "sound"
                                };
                                updateConcern({ galleryVideos: [...current, newItem] } as any);
                              }}
                              accept="video/mp4,video/webm,video/*"
                              category="concern-video"
                            />
                          </div>

                          {/* List of videos */}
                          <div className="space-y-4">
                            {((sc as any).galleryVideos || []).length === 0 ? (
                              <div className="p-6 text-center text-xs text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
                                No video reels added yet. Click &quot;+ Add New Video Reel&quot; or upload from device above to add video clips.
                              </div>
                            ) : (
                              ((sc as any).galleryVideos || []).map((vid: any, vIdx: number) => (
                                <div
                                  key={vid.id || vIdx}
                                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3"
                                >
                                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                      <Film className="w-3.5 h-3.5 text-[#0F2557]" />
                                      <span>Video #{vIdx + 1}: {vid.title || "Untitled Video"}</span>
                                    </span>
                                    <div className="flex items-center gap-2">
                                      {/* Audio Sound Toggle */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = [...((sc as any).galleryVideos || [])];
                                          const newSound = vid.sound === "sound" ? "muted" : "sound";
                                          updated[vIdx] = { ...updated[vIdx], sound: newSound };
                                          updateConcern({ galleryVideos: updated } as any);
                                        }}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                          vid.sound === "sound"
                                            ? "bg-emerald-600 text-white shadow-sm"
                                            : "bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200"
                                        }`}
                                        title="Toggle Audio Sound Default (Sound ON or Muted)"
                                      >
                                        {vid.sound === "sound" ? (
                                          <>
                                            <Volume2 className="w-3.5 h-3.5" />
                                            <span>Audio: Sound ON</span>
                                          </>
                                        ) : (
                                          <>
                                            <VolumeX className="w-3.5 h-3.5" />
                                            <span>Audio: Muted</span>
                                          </>
                                        )}
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = ((sc as any).galleryVideos || []).filter((_: any, idx: number) => idx !== vIdx);
                                          updateConcern({ galleryVideos: updated } as any);
                                        }}
                                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                        title="Delete video"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Remove</span>
                                      </button>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Video Title</label>
                                      <input
                                        type="text"
                                        value={vid.title || ""}
                                        onChange={(e) => {
                                          const updated = [...((sc as any).galleryVideos || [])];
                                          updated[vIdx] = { ...updated[vIdx], title: e.target.value };
                                          updateConcern({ galleryVideos: updated } as any);
                                        }}
                                        placeholder="e.g. Substation Switchgear Commissioning Reel"
                                        className="w-full px-3 py-1.5 text-xs font-bold text-slate-900 border border-slate-300 rounded-lg bg-white"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Caption</label>
                                      <input
                                        type="text"
                                        value={vid.caption || ""}
                                        onChange={(e) => {
                                          const updated = [...((sc as any).galleryVideos || [])];
                                          updated[vIdx] = { ...updated[vIdx], caption: e.target.value };
                                          updateConcern({ galleryVideos: updated } as any);
                                        }}
                                        placeholder="Brief description of field deployment..."
                                        className="w-full px-3 py-1.5 text-xs text-slate-700 border border-slate-300 rounded-lg bg-white"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Video URL (.mp4 / youtube)</label>
                                      <input
                                        type="text"
                                        value={vid.videoUrl || ""}
                                        onChange={(e) => {
                                          const updated = [...((sc as any).galleryVideos || [])];
                                          updated[vIdx] = { ...updated[vIdx], videoUrl: e.target.value };
                                          updateConcern({ galleryVideos: updated } as any);
                                        }}
                                        placeholder="https://...mp4 or /uploads/..."
                                        className="w-full px-3 py-1.5 text-[11px] font-mono text-slate-700 border border-slate-300 rounded-lg bg-white"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Poster / Thumbnail URL</label>
                                      <input
                                        type="text"
                                        value={vid.thumbnailUrl || ""}
                                        onChange={(e) => {
                                          const updated = [...((sc as any).galleryVideos || [])];
                                          updated[vIdx] = { ...updated[vIdx], thumbnailUrl: e.target.value };
                                          updateConcern({ galleryVideos: updated } as any);
                                        }}
                                        placeholder="/img/... or /uploads/..."
                                        className="w-full px-3 py-1.5 text-[11px] font-mono text-slate-700 border border-slate-300 rounded-lg bg-white"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                    <FileUploader
                                      label="Upload / Replace Video File (.mp4)"
                                      description="Select video file from device."
                                      value={vid.videoUrl || ""}
                                      onChange={(url) => {
                                        const updated = [...((sc as any).galleryVideos || [])];
                                        updated[vIdx] = { ...updated[vIdx], videoUrl: url };
                                        updateConcern({ galleryVideos: updated } as any);
                                      }}
                                      accept="video/mp4,video/webm,video/*"
                                      category="concern-video"
                                    />
                                    <FileUploader
                                      label="Upload / Replace Thumbnail Image"
                                      description="Select thumbnail image from device."
                                      value={vid.thumbnailUrl || ""}
                                      onChange={(url) => {
                                        const updated = [...((sc as any).galleryVideos || [])];
                                        updated[vIdx] = { ...updated[vIdx], thumbnailUrl: url };
                                        updateConcern({ galleryVideos: updated } as any);
                                      }}
                                      accept="image/*"
                                      category="concern-thumbnail"
                                    />
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* TAB: PROJECTS & ENGINEERING CREDENTIALS MANAGER */}
          {activeTab === "projects" && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
              {/* Header */}
              <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F37021] flex items-center gap-1.5">
                    <FolderKanban className="w-4 h-4" />
                    <span>Projects & Deliveries Manager</span>
                  </span>
                  <h2 className="text-2xl font-black text-[#0F2557] mt-1">
                    Projects & Technical Credentials
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage completed, ongoing, and upcoming industrial installations across all sister concerns. Upload project images and attach downloadable technical PDF specifications.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingProject({
                      id: `proj-${Date.now().toString().slice(-4)}`,
                      title: "",
                      status: "completed",
                      sector: "Substation Engineering",
                      concern: config.sisterConcerns?.[0]?.name || "Radial Power & Engineering",
                      client: "",
                      location: "Dhaka, Bangladesh",
                      specs: "",
                      year: new Date().getFullYear().toString(),
                      progress: 100,
                      imageUrl: "/uploads/hero-image-whatsapp-image-2026-11-19-at-10-49-56-pm-1795193648639.jpeg",
                      pdfAttachment: "",
                      pdfTitle: "",
                    });
                    setIsProjectModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#DE5F12] text-white font-bold text-xs shadow-md shadow-[#F37021]/30 flex items-center gap-2 transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Project</span>
                </button>
              </div>

              {/* Status Counters Ribbon */}
              {(() => {
                const projectsList: any[] = (config as any).projects || [];
                const cCount = projectsList.filter((p) => p.status === "completed").length;
                const oCount = projectsList.filter((p) => p.status === "ongoing").length;
                const uCount = projectsList.filter((p) => p.status === "upcoming").length;

                return (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                      type="button"
                      onClick={() => setProjectStatusFilter("all")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        projectStatusFilter === "all"
                          ? "bg-[#0F2557] text-white border-[#0F2557] shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-[11px] font-bold block uppercase tracking-wider opacity-80">All Projects</span>
                      <strong className="text-xl font-black mt-1 block">{projectsList.length}</strong>
                    </button>

                    <button
                      type="button"
                      onClick={() => setProjectStatusFilter("completed")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        projectStatusFilter === "completed"
                          ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                          : "bg-emerald-50/60 text-emerald-800 border-emerald-200 hover:bg-emerald-100/60"
                      }`}
                    >
                      <span className="text-[11px] font-bold block uppercase tracking-wider text-emerald-600 dark:text-white">Completed</span>
                      <strong className="text-xl font-black mt-1 block">{cCount}</strong>
                    </button>

                    <button
                      type="button"
                      onClick={() => setProjectStatusFilter("ongoing")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        projectStatusFilter === "ongoing"
                          ? "bg-amber-700 text-white border-amber-700 shadow-sm"
                          : "bg-amber-50/60 text-amber-800 border-amber-200 hover:bg-amber-100/60"
                      }`}
                    >
                      <span className="text-[11px] font-bold block uppercase tracking-wider text-amber-600 dark:text-white">On-Going</span>
                      <strong className="text-xl font-black mt-1 block">{oCount}</strong>
                    </button>

                    <button
                      type="button"
                      onClick={() => setProjectStatusFilter("upcoming")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        projectStatusFilter === "upcoming"
                          ? "bg-sky-700 text-white border-sky-700 shadow-sm"
                          : "bg-sky-50/60 text-sky-800 border-sky-200 hover:bg-sky-100/60"
                      }`}
                    >
                      <span className="text-[11px] font-bold block uppercase tracking-wider text-sky-600 dark:text-white">Upcoming</span>
                      <strong className="text-xl font-black mt-1 block">{uCount}</strong>
                    </button>
                  </div>
                );
              })()}

              {/* Projects List View */}
              {(() => {
                const projectsList: any[] = (config as any).projects || [];
                const filtered = projectsList.filter((p) => {
                  if (projectStatusFilter === "all") return true;
                  return p.status === projectStatusFilter;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 space-y-2">
                      <FolderKanban className="w-10 h-10 mx-auto text-slate-400" />
                      <p className="font-bold text-sm">No projects found under this filter.</p>
                      <button
                        type="button"
                        onClick={() => setProjectStatusFilter("all")}
                        className="text-xs text-[#F37021] font-bold hover:underline"
                      >
                        Reset Filter to View All
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {filtered.map((proj: any, pIdx: number) => {
                      const realIndex = projectsList.findIndex((x) => x.id === proj.id);

                      return (
                        <div
                          key={proj.id || pIdx}
                          className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-all space-y-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                            <div className="flex items-center gap-3">
                              <span
                                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                  proj.status === "completed"
                                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                    : proj.status === "ongoing"
                                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                                    : "bg-sky-100 text-sky-800 border border-sky-300"
                                }`}
                              >
                                {proj.status}
                              </span>
                              <span className="text-xs font-bold text-slate-400">•</span>
                              <span className="text-xs font-bold text-[#F37021] bg-orange-50 px-2 py-0.5 rounded">
                                {proj.concern}
                              </span>
                              <span className="text-xs text-slate-500 font-medium">
                                ({proj.year})
                              </span>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingProject({ ...proj });
                                  setIsProjectModalOpen(true);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-[#0F2557] hover:bg-[#1A3978] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                              >
                                <span>Edit Project</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Delete project "${proj.title}"?`)) {
                                    const updated = projectsList.filter((_, idx) => idx !== realIndex);
                                    updateSection("projects" as any, updated);
                                  }
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                            {/* Thumbnail Preview */}
                            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                              <img
                                src={proj.imageUrl || "/img/radial-power-logo.jpg"}
                                alt={proj.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Details */}
                            <div className="md:col-span-3 space-y-2 text-xs">
                              <h3 className="font-bold text-base text-slate-900 leading-snug">
                                {proj.title}
                              </h3>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                                <div>
                                  <span className="font-bold text-slate-800">Client: </span>
                                  <span>{proj.client || "N/A"}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-800">Location: </span>
                                  <span>{proj.location || "N/A"}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-800">Sector / Domain: </span>
                                  <span>{proj.sector || "N/A"}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-800">Progress: </span>
                                  <span>{proj.progress ?? 100}%</span>
                                </div>
                              </div>

                              <p className="text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200 line-clamp-2">
                                <strong className="text-slate-700">Scope: </strong>
                                {proj.specs}
                              </p>

                              {/* PDF Attachment Indicator */}
                              <div className="pt-2 flex flex-wrap items-center gap-3">
                                {proj.pdfAttachment ? (
                                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                                    <FileText className="w-4 h-4 text-rose-600 shrink-0" />
                                    <span className="truncate max-w-xs">{proj.pdfTitle || proj.pdfAttachment}</span>
                                    <a
                                      href={proj.pdfAttachment}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-rose-600 underline hover:text-rose-800 ml-1"
                                    >
                                      Preview
                                    </a>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = [...projectsList];
                                        updated[realIndex] = {
                                          ...updated[realIndex],
                                          pdfAttachment: "",
                                          pdfTitle: "",
                                        };
                                        updateSection("projects" as any, updated);
                                      }}
                                      className="text-rose-500 hover:text-rose-800 ml-2"
                                      title="Remove PDF"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-[11px] text-slate-400 italic">
                                    No PDF specification attached. You can attach one in the Edit dialog.
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* Add / Edit Project Modal */}
              {isProjectModalOpen && editingProject && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#F37021]">
                          Project Editor
                        </span>
                        <h3 className="text-xl font-black text-[#0F2557]">
                          {editingProject.id ? "Edit Project Details" : "Create New Project"}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsProjectModalOpen(false);
                          setEditingProject(null);
                        }}
                        className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4 text-xs">
                      {/* Title */}
                      <div>
                        <label className="block font-bold text-slate-800 mb-1">
                          Project Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={editingProject.title || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          placeholder="e.g. 12.5 MVA Industrial 33kV Substation & Synchronization System"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white font-medium"
                        />
                      </div>

                      {/* Status & Subsidiary */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-800 mb-1">
                            Project Status <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={editingProject.status || "completed"}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                status: e.target.value as "completed" | "ongoing" | "upcoming",
                                progress: e.target.value === "completed" ? 100 : editingProject.progress ?? 50,
                              })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white font-bold"
                          >
                            <option value="completed">Completed Project (Delivered)</option>
                            <option value="ongoing">On-Going Project (Active Site Works)</option>
                            <option value="upcoming">Upcoming Project (Pipeline / Planned)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1">
                            Subsidiary / Sister Concern <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={editingProject.concern || ""}
                            onChange={(e) => setEditingProject({ ...editingProject, concern: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white font-medium"
                          >
                            {(config.sisterConcerns || []).map((sc) => (
                              <option key={sc.id} value={sc.name}>
                                {sc.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Sector & Client */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-800 mb-1">Sector / Domain</label>
                          <input
                            type="text"
                            value={editingProject.sector || ""}
                            onChange={(e) => setEditingProject({ ...editingProject, sector: e.target.value })}
                            placeholder="e.g. Substation Engineering, Solar Clean Energy"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1">Client Name / Complex</label>
                          <input
                            type="text"
                            value={editingProject.client || ""}
                            onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                            placeholder="e.g. Leading Export Knitwear Complex"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white"
                          />
                        </div>
                      </div>

                      {/* Location & Year */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-800 mb-1">Location</label>
                          <input
                            type="text"
                            value={editingProject.location || ""}
                            onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                            placeholder="e.g. Gazipur Industrial Zone, Dhaka"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1">Timeline / Year</label>
                          <input
                            type="text"
                            value={editingProject.year || ""}
                            onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                            placeholder="e.g. 2024 or Target: Q3 2025"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white"
                          />
                        </div>
                      </div>

                      {/* Progress (if ongoing) */}
                      {editingProject.status === "ongoing" && (
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="font-bold text-amber-700">Construction / Commissioning Progress (%)</label>
                            <span className="font-bold text-amber-800">{editingProject.progress ?? 50}%</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="99"
                            value={editingProject.progress ?? 50}
                            onChange={(e) => setEditingProject({ ...editingProject, progress: parseInt(e.target.value) })}
                            className="w-full accent-amber-600"
                          />
                        </div>
                      )}

                      {/* Technical Specs Scope */}
                      <div>
                        <label className="block font-bold text-slate-800 mb-1">
                          Technical Scope & Key Equipment Specifications
                        </label>
                        <textarea
                          rows={3}
                          value={editingProject.specs || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, specs: e.target.value })}
                          placeholder="e.g. 33kV/11kV Substation, 4 x 2000 kVA Generators Synchronization, 4000A LT Panels, Intelligent PFI System."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white"
                        />
                      </div>

                      {/* Project Image */}
                      <FileUploader
                        label="Project Cover / Banner Image"
                        description="Upload project photo or site works banner."
                        recommendedRatio="16:9 or 4:3 (Landscape)"
                        recommendedSize="800 × 600 px to 1200 × 800 px (Max 5MB)"
                        value={editingProject.imageUrl || ""}
                        onChange={(url) => setEditingProject({ ...editingProject, imageUrl: url })}
                        accept="image/*"
                        category="projects"
                      />

                      {/* PDF ATTACHMENT SECTION (User requested feature!) */}
                      <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-rose-600" />
                          <h4 className="font-bold text-rose-900 text-xs sm:text-sm">
                            PDF Document Attachment (Brochure, SLD, Spec Sheet)
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Attach a project PDF document that users can download and view from the frontend.
                        </p>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                            PDF Document Title / Label
                          </label>
                          <input
                            type="text"
                            value={editingProject.pdfTitle || ""}
                            onChange={(e) => setEditingProject({ ...editingProject, pdfTitle: e.target.value })}
                            placeholder="e.g. Substation Technical Specifications & SLD (PDF)"
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
                          />
                        </div>

                        <FileUploader
                          label="Upload PDF Document File (.pdf)"
                          description="Select PDF document from your device."
                          recommendedRatio="Standard Document"
                          recommendedSize="PDF up to 25MB"
                          value={editingProject.pdfAttachment || ""}
                          onChange={(url) => {
                            setEditingProject({
                              ...editingProject,
                              pdfAttachment: url,
                              pdfTitle: editingProject.pdfTitle || "Project Specifications & Engineering Scope (PDF)",
                            });
                          }}
                          accept=".pdf,application/pdf"
                          category="project-docs"
                        />

                        {editingProject.pdfAttachment && (
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-rose-200 text-xs text-rose-700">
                            <div className="flex items-center gap-2 truncate">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="truncate font-semibold">{editingProject.pdfAttachment}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setEditingProject({ ...editingProject, pdfAttachment: "", pdfTitle: "" })}
                              className="text-xs text-red-600 hover:text-red-800 font-bold ml-2 shrink-0 cursor-pointer"
                            >
                              Remove Attachment
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setIsProjectModalOpen(false);
                          setEditingProject(null);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!editingProject.title || !editingProject.title.trim()) {
                            alert("Please enter a project title.");
                            return;
                          }

                          const currentProjects: any[] = (config as any).projects || [];
                          const existingIndex = currentProjects.findIndex((x) => x.id === editingProject.id);

                          let updated: any[];
                          if (existingIndex >= 0) {
                            updated = [...currentProjects];
                            updated[existingIndex] = editingProject;
                          } else {
                            updated = [editingProject, ...currentProjects];
                          }

                          updateSection("projects" as any, updated);
                          setIsProjectModalOpen(false);
                          setEditingProject(null);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#DE5F12] text-white text-xs font-bold shadow-md shadow-[#F37021]/30 transition-all cursor-pointer"
                      >
                        Save Project Details
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: HOMEPAGE MEDIA & GALLERIES (VIDEO GALLERY & IMAGE GALLERY) */}
          {activeTab === "gallery" && (
            <div className="space-y-8 animate-in fade-in">
              {/* Part 1: Homepage Video Gallery */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F37021] flex items-center gap-1.5">
                      <Film className="w-4 h-4" />
                      <span>Homepage Video Showcase</span>
                    </span>
                    <h2 className="text-2xl font-black text-[#0F2557] mt-1">
                      Industrial Video Gallery
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Manage high-definition project reels, commissioning videos, and field footage shown on the homepage with interactive popup player.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const current = (config as any).videoGallery || {};
                      const videos = current.videos || [];
                      const newVideo = {
                        id: `vid-${Date.now().toString().slice(-4)}`,
                        title: "New Industrial Project Video",
                        description: "Field footage and engineering operational overview.",
                        videoUrl: "https://login.bitopibd.com/uploads/sewing_factory_in_klaten_1080p_2025_08_05_00_15_26_utc_170318d437.mp4",
                        thumbnailUrl: "/uploads/hero-image-whatsapp-image-2026-11-19-at-10-49-56-pm-1795193648639.jpeg",
                        category: "Power Generation",
                        duration: "02:30"
                      };
                      updateSection("videoGallery" as any, {
                        ...current,
                        videos: [...videos, newVideo],
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0F2557] hover:bg-[#1A3978] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-orange-400" />
                    <span>Add New Video</span>
                  </button>
                </div>

                {/* Homepage Video Gallery Visibility & Sound Setting */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <div>
                      <strong className="text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                        <Film className="w-4 h-4 text-[#F37021]" />
                        <span>Homepage Video Section Visibility</span>
                      </strong>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Controls whether the Video Gallery is displayed on the homepage. If OFF or if all videos are removed, it will be completely hidden.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updateSection("videoGallery" as any, {
                          ...((config as any).videoGallery || {}),
                          enabled: (config as any).videoGallery?.enabled === false ? true : false,
                        })
                      }
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        (config as any).videoGallery?.enabled !== false
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {(config as any).videoGallery?.enabled !== false ? "✓ Section Visible" : "✕ Section Hidden"}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <strong className="text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                        <Volume2 className="w-4 h-4 text-[#F37021]" />
                        <span>Homepage Video Gallery Audio Default Setting</span>
                      </strong>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Set whether the interactive video gallery player plays videos with sound enabled or muted by default.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateSection("videoGallery" as any, {
                            ...((config as any).videoGallery || {}),
                            defaultSound: "sound",
                          })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          (config as any).videoGallery?.defaultSound === "sound"
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Sound ON</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateSection("videoGallery" as any, {
                            ...((config as any).videoGallery || {}),
                            defaultSound: "muted",
                          })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          (config as any).videoGallery?.defaultSound === "muted"
                            ? "bg-[#0F2557] text-white shadow-sm"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Muted Default</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Video Gallery Section Headlines */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Section Badge</label>
                    <input
                      type="text"
                      value={(config as any).videoGallery?.badgeText || ""}
                      onChange={(e) =>
                        updateSection("videoGallery" as any, {
                          ...((config as any).videoGallery || {}),
                          badgeText: e.target.value,
                        })
                      }
                      placeholder="CORPORATE MEDIA & HIGHLIGHTS"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Section Headline</label>
                    <input
                      type="text"
                      value={(config as any).videoGallery?.headline || ""}
                      onChange={(e) =>
                        updateSection("videoGallery" as any, {
                          ...((config as any).videoGallery || {}),
                          headline: e.target.value,
                        })
                      }
                      placeholder="Industrial Video Gallery"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-xs">Section Description</label>
                  <textarea
                    rows={2}
                    value={(config as any).videoGallery?.description || ""}
                    onChange={(e) =>
                      updateSection("videoGallery" as any, {
                        ...((config as any).videoGallery || {}),
                        description: e.target.value,
                      })
                    }
                    placeholder="Section description text..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs bg-slate-50 focus:bg-white"
                  />
                </div>

                {/* Videos List */}
                <div className="space-y-4 pt-2">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                    Videos List ({((config as any).videoGallery?.videos || []).length})
                  </h4>

                  {((config as any).videoGallery?.videos || []).map((vid: any, vIdx: number) => (
                    <div
                      key={vid.id || vIdx}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#0F2557] text-white text-xs font-bold flex items-center justify-center font-mono">
                            {vIdx + 1}
                          </span>
                          <span className="font-bold text-slate-800 text-xs sm:text-sm">
                            {vid.title || `Video #${vIdx + 1}`}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = ((config as any).videoGallery?.videos || []).filter(
                              (_: any, idx: number) => idx !== vIdx
                            );
                            updateSection("videoGallery" as any, {
                              ...((config as any).videoGallery || {}),
                              videos: updated,
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Video Title</label>
                          <input
                            type="text"
                            value={vid.title || ""}
                            onChange={(e) => {
                              const updated = [...((config as any).videoGallery?.videos || [])];
                              updated[vIdx] = { ...updated[vIdx], title: e.target.value };
                              updateSection("videoGallery" as any, {
                                ...((config as any).videoGallery || {}),
                                videos: updated,
                              });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Category / Tag</label>
                          <input
                            type="text"
                            value={vid.category || ""}
                            onChange={(e) => {
                              const updated = [...((config as any).videoGallery?.videos || [])];
                              updated[vIdx] = { ...updated[vIdx], category: e.target.value };
                              updateSection("videoGallery" as any, {
                                ...((config as any).videoGallery || {}),
                                videos: updated,
                              });
                            }}
                            placeholder="Power Generation, Solar EPC..."
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Video Description</label>
                          <input
                            type="text"
                            value={vid.description || ""}
                            onChange={(e) => {
                              const updated = [...((config as any).videoGallery?.videos || [])];
                              updated[vIdx] = { ...updated[vIdx], description: e.target.value };
                              updateSection("videoGallery" as any, {
                                ...((config as any).videoGallery || {}),
                                videos: updated,
                              });
                            }}
                            placeholder="Brief description of the video..."
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Duration & Sound</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={vid.duration || ""}
                              onChange={(e) => {
                                const updated = [...((config as any).videoGallery?.videos || [])];
                                updated[vIdx] = { ...updated[vIdx], duration: e.target.value };
                                updateSection("videoGallery" as any, {
                                  ...((config as any).videoGallery || {}),
                                  videos: updated,
                                });
                              }}
                              placeholder="e.g. 02:45"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...((config as any).videoGallery?.videos || [])];
                                const currentSound = vid.sound || "sound";
                                updated[vIdx] = {
                                  ...updated[vIdx],
                                  sound: currentSound === "sound" ? "muted" : "sound"
                                };
                                updateSection("videoGallery" as any, {
                                  ...((config as any).videoGallery || {}),
                                  videos: updated,
                                });
                              }}
                              className={`px-2.5 py-2 rounded-lg text-[11px] font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                                (vid.sound || "sound") === "sound"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                  : "bg-slate-200 text-slate-700 border border-slate-300"
                              }`}
                              title="Click to toggle Sound ON / Muted"
                            >
                              {(vid.sound || "sound") === "sound" ? (
                                <>
                                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Audio ON</span>
                                </>
                              ) : (
                                <>
                                  <VolumeX className="w-3.5 h-3.5 text-slate-600" />
                                  <span>Muted</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Video File Uploader */}
                        <FileUploader
                          label="Upload Video File (.mp4)"
                          description="Directly upload video from your computer."
                          recommendedRatio="16:9 (Widescreen)"
                          recommendedSize="1920 × 1080 px (1080p) or 720p (.mp4 / .webm)"
                          value={vid.videoUrl || ""}
                          onChange={(url) => {
                            const updated = [...((config as any).videoGallery?.videos || [])];
                            updated[vIdx] = { ...updated[vIdx], videoUrl: url };
                            updateSection("videoGallery" as any, {
                              ...((config as any).videoGallery || {}),
                              videos: updated,
                            });
                          }}
                          accept="video/mp4,video/webm,video/*"
                          category="gallery-video"
                        />

                        {/* Thumbnail File Uploader */}
                        <FileUploader
                          label="Upload Video Poster / Thumbnail Image"
                          description="Thumbnail displayed before clicking play."
                          recommendedRatio="16:9 (Landscape)"
                          recommendedSize="1280 × 720 px or 1920 × 1080 px (JPG/PNG)"
                          value={vid.thumbnailUrl || ""}
                          onChange={(url) => {
                            const updated = [...((config as any).videoGallery?.videos || [])];
                            updated[vIdx] = { ...updated[vIdx], thumbnailUrl: url };
                            updateSection("videoGallery" as any, {
                              ...((config as any).videoGallery || {}),
                              videos: updated,
                            });
                          }}
                          accept="image/*"
                          category="gallery-thumbnail"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 2: Homepage Image Gallery */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F37021] flex items-center gap-1.5">
                      <Camera className="w-4 h-4" />
                      <span>Homepage Photo Showcase</span>
                    </span>
                    <h2 className="text-2xl font-black text-[#0F2557] mt-1">
                      Corporate & Project Photo Gallery
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Manage high-resolution facility and project photos shown on the homepage with full-screen zoom lightbox.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const current = (config as any).imageGallery || {};
                      const images = current.images || [];
                      const newImg = {
                        id: `img-${Date.now().toString().slice(-4)}`,
                        title: "New Project Facility Photo",
                        description: "Engineering installation and operational overview.",
                        imageUrl: "/uploads/hero-image-whatsapp-image-2026-11-19-at-10-49-56-pm-1795193648639.jpeg",
                        category: "Power Generation"
                      };
                      updateSection("imageGallery" as any, {
                        ...current,
                        images: [...images, newImg],
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#DE5F12] text-white font-bold text-xs shadow-md shadow-[#F37021]/30 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Photo</span>
                  </button>
                </div>

                {/* Image Gallery Section Headlines */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Section Badge</label>
                    <input
                      type="text"
                      value={(config as any).imageGallery?.badgeText || ""}
                      onChange={(e) =>
                        updateSection("imageGallery" as any, {
                          ...((config as any).imageGallery || {}),
                          badgeText: e.target.value,
                        })
                      }
                      placeholder="OPERATIONAL EXCELLENCE & INFRASTRUCTURE"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Section Headline</label>
                    <input
                      type="text"
                      value={(config as any).imageGallery?.headline || ""}
                      onChange={(e) =>
                        updateSection("imageGallery" as any, {
                          ...((config as any).imageGallery || {}),
                          headline: e.target.value,
                        })
                      }
                      placeholder="Corporate & Project Photo Gallery"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-xs">Section Description</label>
                  <textarea
                    rows={2}
                    value={(config as any).imageGallery?.description || ""}
                    onChange={(e) =>
                      updateSection("imageGallery" as any, {
                        ...((config as any).imageGallery || {}),
                        description: e.target.value,
                      })
                    }
                    placeholder="Section description text..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs bg-slate-50 focus:bg-white"
                  />
                </div>

                {/* Images List */}
                <div className="space-y-4 pt-2">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                    Photos List ({((config as any).imageGallery?.images || []).length})
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {((config as any).imageGallery?.images || []).map((img: any, iIdx: number) => (
                      <div
                        key={img.id || iIdx}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="font-bold text-slate-800 text-xs">Photo #{iIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = ((config as any).imageGallery?.images || []).filter(
                                (_: any, idx: number) => idx !== iIdx
                              );
                              updateSection("imageGallery" as any, {
                                ...((config as any).imageGallery || {}),
                                images: updated,
                              });
                            }}
                            className="p-1 rounded text-red-500 hover:text-red-700 text-xs cursor-pointer"
                            title="Delete photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                            <img
                              src={img.imageUrl}
                              alt={img.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="space-y-2 flex-1 min-w-0 text-xs">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-700 mb-0.5">Photo Title</label>
                              <input
                                type="text"
                                value={img.title || ""}
                                onChange={(e) => {
                                  const updated = [...((config as any).imageGallery?.images || [])];
                                  updated[iIdx] = { ...updated[iIdx], title: e.target.value };
                                  updateSection("imageGallery" as any, {
                                    ...((config as any).imageGallery || {}),
                                    images: updated,
                                  });
                                }}
                                placeholder="Photo Title (optional)..."
                                className="w-full px-2.5 py-1 text-xs font-bold text-slate-900 border border-slate-300 rounded bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-700 mb-0.5">Category / Sector Tag</label>
                              <input
                                type="text"
                                value={img.category || ""}
                                onChange={(e) => {
                                  const updated = [...((config as any).imageGallery?.images || [])];
                                  updated[iIdx] = { ...updated[iIdx], category: e.target.value };
                                  updateSection("imageGallery" as any, {
                                    ...((config as any).imageGallery || {}),
                                    images: updated,
                                  });
                                }}
                                placeholder="e.g. Power Generation, Solar EPC..."
                                className="w-full px-2.5 py-1 text-[11px] text-slate-700 border border-slate-300 rounded bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-700 mb-0.5">Caption & Description (Shown on Card)</label>
                              <textarea
                                rows={2}
                                value={img.description || ""}
                                onChange={(e) => {
                                  const updated = [...((config as any).imageGallery?.images || [])];
                                  updated[iIdx] = { ...updated[iIdx], description: e.target.value };
                                  updateSection("imageGallery" as any, {
                                    ...((config as any).imageGallery || {}),
                                    images: updated,
                                  });
                                }}
                                placeholder="e.g. Heavy duty continuous diesel generator synchronized plant..."
                                className="w-full px-2.5 py-1 text-[11px] text-slate-700 border border-slate-300 rounded bg-white"
                              />
                            </div>
                          </div>
                        </div>

                        <FileUploader
                          label="Replace / Upload Image"
                          description="Select high-resolution photo from device."
                          recommendedRatio="16:9 or 4:3 (Landscape)"
                          recommendedSize="1200 × 800 px to 1600 × 1060 px (Max 5MB)"
                          value={img.imageUrl || ""}
                          onChange={(url) => {
                            const updated = [...((config as any).imageGallery?.images || [])];
                            updated[iIdx] = { ...updated[iIdx], imageUrl: url };
                            updateSection("imageGallery" as any, {
                              ...((config as any).imageGallery || {}),
                              images: updated,
                            });
                          }}
                          accept="image/*"
                          category="gallery-photo"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Part 3: Sister Concerns Photo & Video Media Manager Hub */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F37021] flex items-center gap-1.5">
                      <Zap className="w-4 h-4" />
                      <span>Sister Concerns Media Archive</span>
                    </span>
                    <h2 className="text-2xl font-black text-[#0F2557] mt-1">
                      Sister Concerns Photo & Video Hub
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Quickly manage photographs and video reels for every individual sister concern right from this central media tab.
                    </p>
                  </div>

                  {/* Concern Selector Dropdown */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-600">Select Subsidiary:</label>
                    <select
                      value={selectedConcernIndex}
                      onChange={(e) => setSelectedConcernIndex(parseInt(e.target.value, 10))}
                      className="px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-xs text-slate-900 bg-white shadow-2xs focus:ring-2 focus:ring-[#F37021]/30 cursor-pointer"
                    >
                      {config.sisterConcerns.map((sc, scIdx) => (
                        <option key={sc.id || scIdx} value={scIdx}>
                          {sc.name} ({((sc as any).galleryImages || []).length} photos, {((sc as any).galleryVideos || []).length} vids)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {config.sisterConcerns[selectedConcernIndex] && (() => {
                  const sc = config.sisterConcerns[selectedConcernIndex];
                  const updateConcern = (fields: Partial<typeof sc>) => {
                    const updated = [...config.sisterConcerns];
                    updated[selectedConcernIndex] = { ...sc, ...fields };
                    updateSection("sisterConcerns", updated);
                  };

                  return (
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 overflow-hidden shrink-0">
                            <img
                              src={sc.logo || "/img/bhuiyan-group-logo-horizontal.png"}
                              alt={sc.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-sm text-slate-900">{sc.name}</h3>
                            <p className="text-xs text-slate-500">
                              {((sc as any).galleryImages || []).length} Photographs • {((sc as any).galleryVideos || []).length} Video Reels
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const current = (sc as any).galleryImages || [];
                              const newItem = {
                                id: `${sc.id}-img-${Date.now()}`,
                                title: `${sc.name} Infrastructure Photo`,
                                imageUrl: "/img/radial-power-substation-spec.png",
                                caption: "Operational facility and engineering infrastructure."
                              };
                              updateConcern({ galleryImages: [newItem, ...current] } as any);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F37021] hover:bg-[#DE5F12] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Add Photo</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const current = (sc as any).galleryVideos || [];
                              const newItem = {
                                id: `${sc.id}-vid-${Date.now()}`,
                                title: `${sc.name} Field Operation Reel`,
                                videoUrl: "https://login.bitopibd.com/uploads/sewing_factory_in_klaten_1080p_2025_08_05_00_15_26_utc_170318d437.mp4",
                                thumbnailUrl: sc.logo || "",
                                caption: "Live engineering field operation.",
                                sound: "sound"
                              };
                              updateConcern({ galleryVideos: [newItem, ...current] } as any);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F2557] hover:bg-[#1A3978] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5 text-orange-400" />
                            <span>+ Add Video</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveTab("concerns")}
                            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#0F2557] font-bold text-xs transition-colors cursor-pointer"
                          >
                            Open Full Concern Editor →
                          </button>
                        </div>
                      </div>

                      {/* Photo Upload for this concern */}
                      <FileUploader
                        label={`Upload & Add Photo to ${sc.name}`}
                        description="Upload a high-resolution image directly into this subsidiary's gallery."
                        value=""
                        onChange={(url) => {
                          if (!url) return;
                          const current = (sc as any).galleryImages || [];
                          const newItem = {
                            id: `${sc.id}-img-${Date.now()}`,
                            title: `${sc.name} Facility Documentation`,
                            imageUrl: url,
                            caption: "On-site engineering and project installation."
                          };
                          updateConcern({ galleryImages: [...current, newItem] } as any);
                        }}
                        accept="image/*"
                        category="concern-gallery"
                      />

                      {/* Video Upload for this concern */}
                      <FileUploader
                        label={`Upload & Add Video Reel to ${sc.name} (.mp4)`}
                        description="Directly upload a high-definition video reel to this subsidiary."
                        value=""
                        onChange={(url) => {
                          if (!url) return;
                          const current = (sc as any).galleryVideos || [];
                          const newItem = {
                            id: `${sc.id}-vid-${Date.now()}`,
                            title: `${sc.name} Field Operation Reel`,
                            videoUrl: url,
                            thumbnailUrl: sc.logo || "",
                            caption: "Live engineering field operation.",
                            sound: "sound"
                          };
                          updateConcern({ galleryVideos: [...current, newItem] } as any);
                        }}
                        accept="video/mp4,video/webm,video/*"
                        category="concern-video"
                      />
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* TAB: INDUSTRY DOMAINS & INTEGRATED ENGINEERING CAPABILITIES */}
          {activeTab === "sectors" && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F37021]">
                    Homepage Section Manager
                  </span>
                  <h2 className="text-2xl font-black text-[#0F2557] mt-1">
                    Industry Domains & Capabilities
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Update section badges, main headline, and the core capability domain cards displayed on the homepage.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const current = (config as any).coreSectorsSection || {
                      badgeText: "Industry Domains",
                      headline: "Integrated Engineering Capabilities",
                      description: "From heavy industry and energy infrastructure to consumer health, our divisions operate with uncompromising precision and international safety codes.",
                      sectors: [],
                    };
                    const newSector = {
                      id: `sector-${Date.now()}`,
                      title: "New Engineering Domain",
                      description: "Detailed description of the industrial operations, technologies, and technical capacities.",
                      concernName: "Generex Power",
                      concernSlug: "generex-power",
                      icon: "Zap",
                    };
                    updateSection("coreSectorsSection" as any, {
                      ...current,
                      sectors: [...(current.sectors || []), newSector],
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#F37021] hover:bg-[#DE5F12] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Industry Domain</span>
                </button>
              </div>

              {/* Section Header Inputs */}
              {(() => {
                const sec = (config as any).coreSectorsSection || {
                  badgeText: "Industry Domains",
                  headline: "Integrated Engineering Capabilities",
                  description: "From heavy industry and energy infrastructure to consumer health, our divisions operate with uncompromising precision and international safety codes.",
                  sectors: [],
                };
                const updateSec = (fields: any) => {
                  updateSection("coreSectorsSection" as any, { ...sec, ...fields });
                };

                return (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Section Pill Badge (e.g. Industry Domains)
                        </label>
                        <input
                          type="text"
                          value={sec.badgeText || ""}
                          onChange={(e) => updateSec({ badgeText: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Main Headline (e.g. Integrated Engineering Capabilities)
                        </label>
                        <input
                          type="text"
                          value={sec.headline || ""}
                          onChange={(e) => updateSec({ headline: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Section Subtitle / Description
                      </label>
                      <textarea
                        rows={2}
                        value={sec.description || ""}
                        onChange={(e) => updateSec({ description: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                      />
                    </div>

                    {/* Sectors List */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <h3 className="font-bold text-slate-800 text-sm">
                        Domain Capability Cards ({(sec.sectors || []).length})
                      </h3>

                      <div className="space-y-4">
                        {(sec.sectors || []).map((sector: any, idx: number) => (
                          <div
                            key={sector.id || idx}
                            className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3 relative group"
                          >
                            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                              <span className="font-bold text-[#0F2557] text-xs">
                                Domain #{idx + 1}: {sector.title || "Untitled Domain"}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Delete domain "${sector.title}"?`)) {
                                    const filtered = sec.sectors.filter((_: any, i: number) => i !== idx);
                                    updateSec({ sectors: filtered });
                                  }
                                }}
                                className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                                title="Delete this domain"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="sm:col-span-2">
                                <label className="block font-bold text-slate-700 mb-1">
                                  Domain Card Title
                                </label>
                                <input
                                  type="text"
                                  value={sector.title || ""}
                                  onChange={(e) => {
                                    const updated = [...sec.sectors];
                                    updated[idx] = { ...sector, title: e.target.value };
                                    updateSec({ sectors: updated });
                                  }}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white font-medium"
                                />
                              </div>

                              <div>
                                <label className="block font-bold text-slate-700 mb-1">
                                  Icon
                                </label>
                                <select
                                  value={sector.icon || "Zap"}
                                  onChange={(e) => {
                                    const updated = [...sec.sectors];
                                    updated[idx] = { ...sector, icon: e.target.value };
                                    updateSec({ sectors: updated });
                                  }}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
                                >
                                  <option value="Zap">⚡ Zap (Power Generation)</option>
                                  <option value="SunMedium">☀️ SunMedium (Solar PV)</option>
                                  <option value="Droplets">💧 Droplets (Water / Hydraulics)</option>
                                  <option value="Cpu">💻 Cpu (Substations / Electrical)</option>
                                  <option value="HeartHandshake">🤝 HeartHandshake (Infant Care)</option>
                                  <option value="Factory">🏭 Factory (Manufacturing)</option>
                                  <option value="Building2">🏢 Building2 (Corporate)</option>
                                  <option value="Award">🏆 Award (Certifications)</option>
                                  <option value="ShieldCheck">🛡️ ShieldCheck (Security)</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block font-bold text-slate-700 mb-1">
                                Scope Description
                              </label>
                              <textarea
                                rows={2}
                                value={sector.description || ""}
                                onChange={(e) => {
                                  const updated = [...sec.sectors];
                                  updated[idx] = { ...sector, description: e.target.value };
                                  updateSec({ sectors: updated });
                                }}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block font-bold text-slate-700 mb-1">
                                  Lead Sister Concern Name
                                </label>
                                <input
                                  type="text"
                                  value={sector.concernName || ""}
                                  onChange={(e) => {
                                    const updated = [...sec.sectors];
                                    updated[idx] = { ...sector, concernName: e.target.value };
                                    updateSec({ sectors: updated });
                                  }}
                                  placeholder="e.g. Generex Power"
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
                                />
                              </div>

                              <div>
                                <label className="block font-bold text-slate-700 mb-1">
                                  Lead Concern Slug (Link)
                                </label>
                                <select
                                  value={sector.concernSlug || "generex-power"}
                                  onChange={(e) => {
                                    const updated = [...sec.sectors];
                                    updated[idx] = { ...sector, concernSlug: e.target.value };
                                    updateSec({ sectors: updated });
                                  }}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
                                >
                                  {config.sisterConcerns.map((sc) => (
                                    <option key={sc.id} value={sc.slug}>
                                      {sc.name} ({sc.slug})
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB: EVOLUTION & HERITAGE (A DECADE OF ENGINEERING MILESTONES) */}
          {activeTab === "milestones" && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F37021]">
                    Corporate Heritage Manager
                  </span>
                  <h2 className="text-2xl font-black text-[#0F2557] mt-1">
                    Evolution & Milestones Timeline
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Update the historical journey, milestone events, and trajectory of Bhuiyan Group.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const current = (config as any).milestonesSection || {
                      badgeText: "Evolution & Heritage",
                      headline: "A Decade of Engineering Milestones",
                      description: "Tracing the strategic trajectory of Bhuiyan Group from industrial generation to comprehensive conglomerateship.",
                      milestones: [],
                    };
                    const newMilestone = {
                      year: new Date().getFullYear().toString(),
                      title: "New Corporate Milestone",
                      desc: "Strategic expansion or nationwide infrastructure commissioning achieved during this year.",
                    };
                    updateSection("milestonesSection" as any, {
                      ...current,
                      milestones: [...(current.milestones || []), newMilestone],
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#F37021] hover:bg-[#DE5F12] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Milestone Event</span>
                </button>
              </div>

              {/* Section Header Inputs */}
              {(() => {
                const sec = (config as any).milestonesSection || {
                  badgeText: "Evolution & Heritage",
                  headline: "A Decade of Engineering Milestones",
                  description: "Tracing the strategic trajectory of Bhuiyan Group from industrial generation to comprehensive conglomerateship.",
                  milestones: [],
                };
                const updateSec = (fields: any) => {
                  updateSection("milestonesSection" as any, { ...sec, ...fields });
                };

                return (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Section Pill Badge (e.g. Evolution & Heritage)
                        </label>
                        <input
                          type="text"
                          value={sec.badgeText || ""}
                          onChange={(e) => updateSec({ badgeText: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Main Headline (e.g. A Decade of Engineering Milestones)
                        </label>
                        <input
                          type="text"
                          value={sec.headline || ""}
                          onChange={(e) => updateSec({ headline: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Section Subtitle / Description
                      </label>
                      <textarea
                        rows={2}
                        value={sec.description || ""}
                        onChange={(e) => updateSec({ description: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900"
                      />
                    </div>

                    {/* Milestones Cards List */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <h3 className="font-bold text-slate-800 text-sm">
                        Timeline Milestones ({(sec.milestones || []).length})
                      </h3>

                      <div className="space-y-3">
                        {(sec.milestones || []).map((m: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3"
                          >
                            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                              <span className="font-bold text-[#F37021] text-xs font-mono">
                                Milestone #{idx + 1} — Year: {m.year || "Year"}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Delete milestone for year ${m.year}?`)) {
                                    const filtered = sec.milestones.filter((_: any, i: number) => i !== idx);
                                    updateSec({ milestones: filtered });
                                  }
                                }}
                                className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                                title="Delete this milestone"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                              <div className="sm:col-span-1">
                                <label className="block font-bold text-slate-700 mb-1">
                                  Year (e.g. 2012)
                                </label>
                                <input
                                  type="text"
                                  value={m.year || ""}
                                  onChange={(e) => {
                                    const updated = [...sec.milestones];
                                    updated[idx] = { ...m, year: e.target.value };
                                    updateSec({ milestones: updated });
                                  }}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white font-mono font-bold"
                                />
                              </div>

                              <div className="sm:col-span-3">
                                <label className="block font-bold text-slate-700 mb-1">
                                  Milestone Title
                                </label>
                                <input
                                  type="text"
                                  value={m.title || ""}
                                  onChange={(e) => {
                                    const updated = [...sec.milestones];
                                    updated[idx] = { ...m, title: e.target.value };
                                    updateSec({ milestones: updated });
                                  }}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white font-bold"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block font-bold text-slate-700 mb-1">
                                Scope & Achievements Description
                              </label>
                              <textarea
                                rows={2}
                                value={m.desc || ""}
                                onChange={(e) => {
                                  const updated = [...sec.milestones];
                                  updated[idx] = { ...m, desc: e.target.value };
                                  updateSec({ milestones: updated });
                                }}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 7: STATS & METRICS */}
          {activeTab === "stats" && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F37021]">
                  Corporate Proof Points
                </span>
                <h2 className="text-2xl font-black text-[#0F2557] mt-1">
                  Homepage Metric Counters
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Adjust the 4 live count-up stats displayed on the hero banner.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {config.groupStats.map((st, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <span className="text-[11px] font-bold text-orange-600 uppercase">
                      Metric #{i + 1}
                    </span>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Stat Value (e.g. 350+ MW, 1,200+)
                      </label>
                      <input
                        type="text"
                        value={st.value}
                        onChange={(e) => {
                          const updated = [...config.groupStats];
                          updated[i] = { ...st, value: e.target.value };
                          updateSection("groupStats", updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Label Title
                      </label>
                      <input
                        type="text"
                        value={st.label}
                        onChange={(e) => {
                          const updated = [...config.groupStats];
                          updated[i] = { ...st, label: e.target.value };
                          updateSection("groupStats", updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Short Description
                      </label>
                      <input
                        type="text"
                        value={st.description}
                        onChange={(e) => {
                          const updated = [...config.groupStats];
                          updated[i] = { ...st, description: e.target.value };
                          updateSection("groupStats", updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: SMTP MAIL SERVER CONFIGURATION */}
          {activeTab === "smtp" && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F37021]">
                    Mailing Architecture & Notifications
                  </span>
                  <h2 className="text-2xl font-black text-[#0F2557] mt-1 flex items-center gap-2.5">
                    <Server className="w-6 h-6 text-[#F37021]" />
                    <span>SMTP Mail Server Configuration</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Connect your corporate mail server so all contact inquiries are automatically forwarded to management inboxes.
                  </p>
                </div>

                {/* Master Switch Badge */}
                <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl">
                  <span className="text-xs font-bold text-slate-700">Status:</span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                      (config as any).smtp?.enabled
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        (config as any).smtp?.enabled ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                      }`}
                    />
                    {(config as any).smtp?.enabled ? "ACTIVE & ROUTING" : "DISABLED"}
                  </span>
                </div>
              </div>

              {/* Master Enable Checkbox */}
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between gap-4">
                <div>
                  <label className="font-bold text-slate-800 block text-xs sm:text-sm">
                    Enable Automated Email Forwarding
                  </label>
                  <p className="text-xs text-slate-500 mt-0.5">
                    When enabled, new inquiries submitted by website visitors will immediately be sent via this SMTP server.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={Boolean((config as any).smtp?.enabled)}
                    onChange={(e) =>
                      updateSection("smtp" as any, {
                        ...((config as any).smtp || {}),
                        enabled: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F2557]"></div>
                </label>
              </div>

              {/* Quick Fill Presets */}
              <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 block">
                  Quick Provider Presets:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateSection("smtp" as any, {
                        ...((config as any).smtp || {}),
                        host: "smtp.gmail.com",
                        port: "587",
                        secure: false,
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-blue-900 hover:bg-blue-100/70 font-semibold text-xs transition-colors shadow-2xs"
                  >
                    Google Workspace / Gmail (Port 587)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateSection("smtp" as any, {
                        ...((config as any).smtp || {}),
                        host: "mail.bhuiyangroup.com.bd",
                        port: "465",
                        secure: true,
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-blue-900 hover:bg-blue-100/70 font-semibold text-xs transition-colors shadow-2xs"
                  >
                    cPanel Webmail (Port 465 SSL)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateSection("smtp" as any, {
                        ...((config as any).smtp || {}),
                        host: "smtp.office365.com",
                        port: "587",
                        secure: false,
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-blue-900 hover:bg-blue-100/70 font-semibold text-xs transition-colors shadow-2xs"
                  >
                    Microsoft 365 / Outlook (Port 587)
                  </button>
                </div>
              </div>

              {/* Credentials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs">
                {/* SMTP Host */}
                <div className="sm:col-span-6 space-y-1">
                  <label className="font-bold text-slate-800 block">
                    SMTP Host / Server Address *
                  </label>
                  <input
                    type="text"
                    value={(config as any).smtp?.host || ""}
                    onChange={(e) =>
                      updateSection("smtp" as any, {
                        ...((config as any).smtp || {}),
                        host: e.target.value,
                      })
                    }
                    placeholder="smtp.gmail.com or mail.yourdomain.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">Your outgoing mail server domain</p>
                </div>

                {/* Port */}
                <div className="sm:col-span-3 space-y-1">
                  <label className="font-bold text-slate-800 block">
                    SMTP Port *
                  </label>
                  <input
                    type="text"
                    value={(config as any).smtp?.port || "587"}
                    onChange={(e) =>
                      updateSection("smtp" as any, {
                        ...((config as any).smtp || {}),
                        port: e.target.value,
                      })
                    }
                    placeholder="587, 465, or 25"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">Usually 587 (TLS) or 465 (SSL)</p>
                </div>

                {/* Encryption SSL */}
                <div className="sm:col-span-3 space-y-1">
                  <label className="font-bold text-slate-800 block">
                    Encryption Type
                  </label>
                  <select
                    value={(config as any).smtp?.secure ? "ssl" : "tls"}
                    onChange={(e) =>
                      updateSection("smtp" as any, {
                        ...((config as any).smtp || {}),
                        secure: e.target.value === "ssl",
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-medium text-slate-900 bg-white"
                  >
                    <option value="tls">STARTTLS (Port 587)</option>
                    <option value="ssl">SSL / TLS (Port 465)</option>
                  </select>
                  <p className="text-[11px] text-slate-500">Handshake protocol</p>
                </div>

                {/* SMTP Username */}
                <div className="sm:col-span-6 space-y-1">
                  <label className="font-bold text-slate-800 block">
                    SMTP Username / Email *
                  </label>
                  <input
                    type="text"
                    value={(config as any).smtp?.user || ""}
                    onChange={(e) =>
                      updateSection("smtp" as any, {
                        ...((config as any).smtp || {}),
                        user: e.target.value,
                      })
                    }
                    placeholder="info@bhuiyangroup.com.bd"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">Login email for SMTP auth</p>
                </div>

                {/* SMTP Password */}
                <div className="sm:col-span-6 space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800 block">
                      SMTP Password / App Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowSmtpPass(!showSmtpPass)}
                      className="text-[11px] text-slate-500 hover:text-slate-800 font-semibold"
                    >
                      {showSmtpPass ? "Hide" : "Show"}
                    </button>
                  </div>
                  <input
                    type={showSmtpPass ? "text" : "password"}
                    value={(config as any).smtp?.pass || ""}
                    onChange={(e) =>
                      updateSection("smtp" as any, {
                        ...((config as any).smtp || {}),
                        pass: e.target.value,
                      })
                    }
                    placeholder="••••••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    For Gmail, create a 16-character App Password at myaccount.google.com/apppasswords
                  </p>
                </div>

                {/* Sender Display Name */}
                <div className="sm:col-span-4 space-y-1">
                  <label className="font-bold text-slate-800 block">
                    Sender Display Name
                  </label>
                  <input
                    type="text"
                    value={(config as any).smtp?.fromName || ""}
                    onChange={(e) =>
                      updateSection("smtp" as any, {
                        ...((config as any).smtp || {}),
                        fromName: e.target.value,
                      })
                    }
                    placeholder="Bhuiyan Group Inquiries Desk"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">Name shown on outgoing alert emails</p>
                </div>

                {/* Sender From Email */}
                <div className="sm:col-span-4 space-y-1">
                  <label className="font-bold text-slate-800 block">
                    From Email Address
                  </label>
                  <input
                    type="email"
                    value={(config as any).smtp?.fromEmail || ""}
                    onChange={(e) =>
                      updateSection("smtp" as any, {
                        ...((config as any).smtp || {}),
                        fromEmail: e.target.value,
                      })
                    }
                    placeholder="noreply@bhuiyangroup.com.bd"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">Must match or be authorized by your server</p>
                </div>

                {/* Admin Recipient Inbox */}
                <div className="sm:col-span-4 space-y-1">
                  <label className="font-bold text-slate-800 block text-emerald-900">
                    Admin Notification Recipient Email *
                  </label>
                  <input
                    type="email"
                    value={(config as any).smtp?.receiverEmail || ""}
                    onChange={(e) =>
                      updateSection("smtp" as any, {
                        ...((config as any).smtp || {}),
                        receiverEmail: e.target.value,
                      })
                    }
                    placeholder="info@bhuiyangroup.com.bd"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-emerald-300 bg-emerald-50/20 font-mono text-slate-900"
                  />
                  <p className="text-[11px] text-slate-500">Where website inquiry emails will arrive</p>
                </div>
              </div>

              {/* Test Connection Card */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#F37021]" />
                      <span>SMTP Connection Diagnostic & Test</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Send a verification test email to your recipient address to confirm credentials and network connectivity.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleTestSmtp}
                    disabled={smtpTesting}
                    className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#0F2557] hover:bg-[#1A3978] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {smtpTesting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-400" />
                        <span>Connecting & Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-orange-400" />
                        <span>Send Test Email</span>
                      </>
                    )}
                  </button>
                </div>

                {smtpTestResult && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs font-semibold flex items-start gap-2.5 animate-in fade-in ${
                      smtpTestResult.success
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : "bg-rose-50 border-rose-200 text-rose-900"
                    }`}
                  >
                    {smtpTestResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <span className="leading-relaxed">{smtpTestResult.message}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 9: ADMIN SECURITY & CREDENTIALS */}
          {activeTab === "security" && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F37021]">
                  Access Control
                </span>
                <h2 className="text-2xl font-black text-[#0F2557] mt-1">
                  Administrator Credentials & Security
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Change the login username and password required to access this admin console. Direct URL access only.
                </p>
              </div>

              <div className="space-y-6 max-w-xl text-xs">
                {/* Admin Username Card */}
                <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <label className="font-bold text-slate-800 block text-xs sm:text-sm">
                    Admin Username
                  </label>
                  <input
                    type="text"
                    value={(config as any).adminAuth?.username || "admin"}
                    onChange={(e) =>
                      updateSection("adminAuth" as any, {
                        ...((config as any).adminAuth || {}),
                        username: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    Username used when signing in at <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded">/admin</code>.
                  </p>
                </div>

                {/* Admin Current Security Password (Masked by Default with Eye Toggle) */}
                <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800 block text-xs sm:text-sm">
                      Admin Security Password (Active)
                    </label>
                    <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      {showAdminPassword ? (
                        <span className="text-amber-600 font-semibold">Visible</span>
                      ) : (
                        <span className="text-slate-400">Hidden (Encrypted / Masked)</span>
                      )}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showAdminPassword ? "text" : "password"}
                      value={(config as any).adminAuth?.password || "password123"}
                      onChange={(e) =>
                        updateSection("adminAuth" as any, {
                          ...((config as any).adminAuth || {}),
                          password: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 pr-11 rounded-lg border border-slate-300 font-mono text-slate-900 bg-white tracking-wider"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                      title={showAdminPassword ? "Hide password" : "Show password"}
                      aria-label={showAdminPassword ? "Hide password" : "Show password"}
                    >
                      {showAdminPassword ? (
                        <EyeOff className="w-4 h-4 text-slate-700" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Password is masked by default for security. Click the Eye icon to view or verify.
                  </p>
                </div>

                {/* Dedicated Update / Change Password Box */}
                <div className="p-5 sm:p-6 rounded-2xl border-2 border-[#0F2557]/15 bg-white shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#0F2557] flex items-center justify-center text-white shrink-0">
                        <Key className="w-4 h-4 text-[#F37021]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Update Admin Password</h4>
                        <p className="text-[11px] text-slate-500">Set and apply a new administrator password immediately</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleGenerateRandomPassword}
                      className="self-start sm:self-auto px-2.5 py-1 text-[11px] font-semibold text-[#0F2557] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      title="Generate a secure strong password"
                    >
                      <Sparkles className="w-3 h-3 text-[#F37021]" />
                      <span>Suggest Strong Password</span>
                    </button>
                  </div>

                  {passwordUpdateMsg && (
                    <div
                      className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in ${
                        passwordUpdateMsg.type === "success"
                          ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                          : "bg-rose-50 border border-rose-200 text-rose-800"
                      }`}
                    >
                      {passwordUpdateMsg.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>{passwordUpdateMsg.text}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 text-xs flex items-center justify-between">
                        <span>New Password</span>
                        <span className="text-[10px] text-slate-400 font-normal">Min 6 characters</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newAdminPassword}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="w-full px-3.5 py-2.5 pr-11 rounded-lg border border-slate-300 font-mono text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#0F2557]/20 focus:outline-none transition-all text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                          title={showNewPassword ? "Hide password" : "Show password"}
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4 text-slate-700" />
                          ) : (
                            <Eye className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 text-xs flex items-center justify-between">
                        <span>Confirm New Password</span>
                        {confirmAdminPassword && (
                          <span className={`text-[10px] font-semibold ${newAdminPassword === confirmAdminPassword ? "text-emerald-600" : "text-rose-500"}`}>
                            {newAdminPassword === confirmAdminPassword ? "✓ Passwords Match" : "✕ Passwords do not match"}
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmNewPassword ? "text" : "password"}
                          value={confirmAdminPassword}
                          onChange={(e) => setConfirmAdminPassword(e.target.value)}
                          placeholder="Re-enter new password"
                          className="w-full px-3.5 py-2.5 pr-11 rounded-lg border border-slate-300 font-mono text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#0F2557]/20 focus:outline-none transition-all text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                          title={showConfirmNewPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmNewPassword ? (
                            <EyeOff className="w-4 h-4 text-slate-700" />
                          ) : (
                            <Eye className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleUpdatePassword()}
                      disabled={isUpdatingPassword || !newAdminPassword || !confirmAdminPassword}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0F2557] hover:bg-[#1A3978] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md shadow-[#0F2557]/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {isUpdatingPassword ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#F37021]" />
                          <span>Updating & Saving Password...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-[#F37021]" />
                          <span>Update & Save Password</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Credential Notice */}
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 flex items-start gap-3">
                  <Key className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] space-y-1">
                    <p className="font-bold">Credential Security Notice</p>
                    <p className="text-amber-800 leading-relaxed">
                      The admin panel button has been completely removed from the frontend navigation bar. You and authorized staff can access this page by directly typing <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">/admin</code> in the browser URL.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
