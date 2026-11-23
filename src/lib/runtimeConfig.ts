import fs from "fs";
import path from "path";
import defaultSiteConfig from "@/data/siteConfig.json";

function resolveDataCandidatePaths(filename: string): string[] {
  return [
    path.join(process.cwd(), "src", "data", filename),
    path.join(process.cwd(), "bhuiyangroup-bd", "src", "data", filename),
    path.resolve(process.cwd(), "src/data", filename),
  ];
}

function resolveExistingDataPath(filename: string): string | null {
  const candidates = resolveDataCandidatePaths(filename);
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

function resolveWritePath(filename: string): string {
  const existing = resolveExistingDataPath(filename);
  if (existing) return existing;

  // If bhuiyangroup-bd subdirectory exists (cPanel Passenger cwd scenario)
  const cpanelSubdir = path.join(process.cwd(), "bhuiyangroup-bd", "src", "data");
  if (fs.existsSync(cpanelSubdir)) {
    return path.join(cpanelSubdir, filename);
  }

  return path.join(process.cwd(), "src", "data", filename);
}

// Deep merge helper that combines baseConfig with runtime liveConfig
function deepMerge(target: any, source: any): any {
  if (!source || typeof source !== "object") return target;
  if (!target || typeof target !== "object") return source;

  // For arrays, if source has items, use source array
  if (Array.isArray(source)) {
    return source;
  }

  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

/**
 * Returns the effective site config:
 * Base config (siteConfig.json from Git) + Live runtime overrides (siteConfig.runtime.json)
 * Runtime live file is ignored by Git, so live changes are NEVER erased by git pull!
 */
export function getMergedSiteConfig(): typeof defaultSiteConfig {
  try {
    let base = defaultSiteConfig as any;
    const basePath = resolveExistingDataPath("siteConfig.json");
    if (basePath) {
      try {
        base = JSON.parse(fs.readFileSync(basePath, "utf-8"));
      } catch (err) {
        console.warn("Base config read error, using imported default:", err);
      }
    }

    const runtimePath = resolveExistingDataPath("siteConfig.runtime.json");
    if (runtimePath) {
      try {
        const runtime = JSON.parse(fs.readFileSync(runtimePath, "utf-8"));
        return deepMerge(base, runtime);
      } catch (err) {
        console.warn("Runtime config read error:", err);
      }
    }

    return base;
  } catch (error) {
    console.error("getMergedSiteConfig error:", error);
    return defaultSiteConfig as any;
  }
}

/**
 * Saves live configuration to siteConfig.runtime.json
 * This file is in .gitignore so Git pull will never conflict with or overwrite it!
 */
export function saveRuntimeConfig(updatedConfig: any): boolean {
  try {
    const payload = JSON.stringify(updatedConfig, null, 2);

    // Save to runtime config in all resolved candidate directories
    const writeDirs = [
      path.join(process.cwd(), "src", "data"),
    ];
    const cpanelDir = path.join(process.cwd(), "bhuiyangroup-bd", "src", "data");
    if (fs.existsSync(path.join(process.cwd(), "bhuiyangroup-bd"))) {
      writeDirs.push(cpanelDir);
    }

    for (const d of writeDirs) {
      if (!fs.existsSync(d)) {
        try {
          fs.mkdirSync(d, { recursive: true });
        } catch {}
      }
      try {
        fs.writeFileSync(path.join(d, "siteConfig.runtime.json"), payload, "utf-8");
      } catch (err) {
        console.warn(`Failed writing runtime config to ${d}:`, err);
      }
    }

    return true;
  } catch (error) {
    console.error("saveRuntimeConfig error:", error);
    return false;
  }
}

/**
 * Inquiries storage:
 * Reads from inquiries.runtime.json (fallback to inquiries.json)
 * Saves to inquiries.runtime.json so live leads are never lost across git pulls.
 */
export function getRuntimeInquiries(): any[] {
  try {
    const runtimePath = resolveExistingDataPath("inquiries.runtime.json");
    if (runtimePath) {
      return JSON.parse(fs.readFileSync(runtimePath, "utf-8"));
    }

    const basePath = resolveExistingDataPath("inquiries.json");
    if (basePath) {
      return JSON.parse(fs.readFileSync(basePath, "utf-8"));
    }

    return [];
  } catch (error) {
    console.error("getRuntimeInquiries error:", error);
    return [];
  }
}

export function saveRuntimeInquiries(inquiries: any[]): boolean {
  try {
    const payload = JSON.stringify(inquiries, null, 2);
    const writeDirs = [
      path.join(process.cwd(), "src", "data"),
    ];
    const cpanelDir = path.join(process.cwd(), "bhuiyangroup-bd", "src", "data");
    if (fs.existsSync(path.join(process.cwd(), "bhuiyangroup-bd"))) {
      writeDirs.push(cpanelDir);
    }

    for (const d of writeDirs) {
      if (!fs.existsSync(d)) {
        try {
          fs.mkdirSync(d, { recursive: true });
        } catch {}
      }
      try {
        fs.writeFileSync(path.join(d, "inquiries.runtime.json"), payload, "utf-8");
      } catch (err) {
        console.warn(`Failed writing runtime inquiries to ${d}:`, err);
      }
    }
    return true;
  } catch (error) {
    console.error("saveRuntimeInquiries error:", error);
    return false;
  }
}
