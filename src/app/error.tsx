"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F8FAFC] px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#F37021] flex items-center justify-center mx-auto border border-orange-200 shadow-sm">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#0F2557]">
            Something Went Wrong
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The requested page encountered an unexpected issue. Our engineering team has been notified.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F2557] hover:bg-[#1A3978] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#F37021]" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
