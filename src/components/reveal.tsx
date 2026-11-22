"use client";

import { useEffect, useRef } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Keep content visible for crawlers and visitors without JavaScript.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.remove("reveal-pending");
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    if (element.getBoundingClientRect().top >= window.innerHeight) element.classList.add("reveal-pending");
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal is-visible ${className}`}>{children}</div>;
}
