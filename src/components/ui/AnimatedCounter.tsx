"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export default function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract number and suffix (e.g. "350+ MW" -> number: 350, suffix: "+ MW")
  const match = value.match(/([\d,.]+)/);
  const rawNumber = match ? parseFloat(match[0].replace(/,/g, "")) : 0;
  const isDecimal = value.includes(".");
  const prefix = value.substring(0, value.indexOf(match ? match[0] : ""));
  const suffix = match ? value.substring(value.indexOf(match[0]) + match[0].length) : value;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || rawNumber === 0) return;

    let start = 0;
    const duration = 1800; // ms
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = rawNumber / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= rawNumber) {
        setCount(rawNumber);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, rawNumber]);

  const formattedCount = isDecimal
    ? count.toFixed(1)
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {isInView ? formattedCount : "0"}
      {suffix}
    </span>
  );
}
