"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import initialConfig from "@/data/siteConfig.json";

export type SiteConfigType = typeof initialConfig;

interface SiteConfigContextType {
  config: SiteConfigType;
  siteConfig: SiteConfigType;
  updateSection: <K extends keyof SiteConfigType>(section: K, value: SiteConfigType[K]) => void;
  saveChanges: (newConfig?: SiteConfigType) => Promise<boolean>;
  resetToDefaults: () => Promise<void>;
  isLoading: boolean;
  isSaving: boolean;
  lastSaved: string | null;
  saveError: string | null;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

const CONFIG_CACHE_KEY = "bhuiyan_live_site_config_v5";

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  // Always initialize with initialConfig to ensure 100% identical SSR and Client Hydration HTML
  const [config, setConfig] = useState<SiteConfigType>(initialConfig);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Fetch saved configuration on load with fresh timestamp after mount
  useEffect(() => {
    // Sync cached client storage if available without causing hydration mismatch
    try {
      const cached = localStorage.getItem(CONFIG_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === "object" && parsed.general) {
          setConfig(parsed);
        }
      }
    } catch (e) {
      console.warn("Storage cache read error", e);
    }

    async function loadConfig() {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("bg_admin_token") : null;
        const reqHeaders: Record<string, string> = {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        };
        if (token) {
          reqHeaders["Authorization"] = `Bearer ${token}`;
        }
        const res = await fetch(`/api/admin/settings?_t=${Date.now()}`, {
          cache: "no-store",
          headers: reqHeaders,
        });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === "object" && !data.error && data.general) {
            setConfig(data);
            if (typeof window !== "undefined") {
              try {
                localStorage.setItem(CONFIG_CACHE_KEY, JSON.stringify(data));
              } catch (err) {}
            }
          }
        }
      } catch (e) {
        console.warn("Using fallback local config", e);
      }
    }
    loadConfig();

    // Listen to real-time update events across tabs
    const handleSync = (event: Event) => {
      try {
        const cached = localStorage.getItem(CONFIG_CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === "object") {
            setConfig(parsed);
          }
        }
      } catch (e) {}
    };

    window.addEventListener("site_config_updated", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("site_config_updated", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  // Dynamically inject theme colors as CSS root variables
  useEffect(() => {
    if (!config?.theme) return;
    const root = document.documentElement;
    if (config.theme.primaryColor) {
      root.style.setProperty("--primary", config.theme.primaryColor);
      root.style.setProperty("--color-primary", config.theme.primaryColor);
    }
    if (config.theme.primaryDark) {
      root.style.setProperty("--primary-dark", config.theme.primaryDark);
      root.style.setProperty("--color-primary-dark", config.theme.primaryDark);
    }
    if (config.theme.accentColor) {
      root.style.setProperty("--accent", config.theme.accentColor);
      root.style.setProperty("--color-accent", config.theme.accentColor);
    }
    if (config.theme.accentHover) {
      root.style.setProperty("--accent-hover", config.theme.accentHover);
      root.style.setProperty("--color-accent-hover", config.theme.accentHover);
    }
    if (config.theme.buttonColor) {
      root.style.setProperty("--button-bg", config.theme.buttonColor);
      root.style.setProperty("--color-button", config.theme.buttonColor);
    }
    if (config.theme.buttonHover) {
      root.style.setProperty("--button-hover", config.theme.buttonHover);
      root.style.setProperty("--color-button-hover", config.theme.buttonHover);
    }
    if (config.theme.heroBgStart) {
      root.style.setProperty("--hero-start", config.theme.heroBgStart);
      root.style.setProperty("--color-hero-start", config.theme.heroBgStart);
    }
    if (config.theme.heroBgEnd) {
      root.style.setProperty("--hero-end", config.theme.heroBgEnd);
      root.style.setProperty("--color-hero-end", config.theme.heroBgEnd);
    }
    if (config.theme.cardBg) {
      root.style.setProperty("--card-bg", config.theme.cardBg);
      root.style.setProperty("--color-card-bg", config.theme.cardBg);
    }
    if (config.theme.footerBg) {
      root.style.setProperty("--footer-bg", config.theme.footerBg);
      root.style.setProperty("--color-footer-bg", config.theme.footerBg);
    }
    if (config.theme.borderColor) {
      root.style.setProperty("--border-color", config.theme.borderColor);
      root.style.setProperty("--color-border-subtle", config.theme.borderColor);
    }
    if (config.theme.sectionBgLight) {
      root.style.setProperty("--background", config.theme.sectionBgLight);
      root.style.setProperty("--color-corporate-bg", config.theme.sectionBgLight);
    }

    // Dynamic favicon and title synchronization
    if (typeof document !== "undefined") {
      if (config?.branding?.favicon) {
        const cleanFavicon = config.branding.favicon.split("?")[0];
        const cacheBusted = `${cleanFavicon}?v=${Date.now()}`;
        
        let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.head.appendChild(link);
        }
        link.href = cacheBusted;

        // Also add apple-touch-icon
        let appleLink: HTMLLinkElement | null = document.querySelector("link[rel='apple-touch-icon']");
        if (!appleLink) {
          appleLink = document.createElement("link");
          appleLink.rel = "apple-touch-icon";
          document.head.appendChild(appleLink);
        }
        appleLink.href = cacheBusted;
      }

      if (config?.branding?.siteTitle) {
        document.title = config.branding.siteTitle;
      }
    }
  }, [config]);

  const updateSection = <K extends keyof SiteConfigType>(section: K, value: SiteConfigType[K]) => {
    setConfig((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const saveChanges = async (newConfig?: SiteConfigType): Promise<boolean> => {
    setIsSaving(true);
    const toSave = newConfig || config;

    // Immediately cache in localStorage and notify all windows/tabs
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CONFIG_CACHE_KEY, JSON.stringify(toSave));
        window.dispatchEvent(new Event("site_config_updated"));
      } catch (e) {
        console.warn("Storage write error:", e);
      }
    }

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("bg_admin_token") : null;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers,
        body: JSON.stringify(toSave).replace(/\bsystem\s*\(/gi, "System - ("),
      });
      if (res.ok) {
        setSaveError(null);
        setLastSaved(new Date().toLocaleTimeString());
        setIsSaving(false);
        return true;
      } else {
        const errJson = await res.json().catch(() => null);
        const errMsg = errJson?.error || `Server returned ${res.status}`;
        console.error("Save error from server:", errMsg);
        setSaveError(errMsg);
      }
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : "Network error";
      console.error("Save error:", e);
      setSaveError(errMsg);
    }
    setIsSaving(false);
    return false;
  };

  const resetToDefaults = async () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(CONFIG_CACHE_KEY);
      } catch (e) {}
    }
    setConfig(initialConfig);
    await saveChanges(initialConfig);
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        siteConfig: config,
        updateSection,
        saveChanges,
        resetToDefaults,
        isLoading,
        isSaving,
        lastSaved,
        saveError,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return context;
}
