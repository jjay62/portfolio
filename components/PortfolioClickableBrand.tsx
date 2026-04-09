"use client";

import type { ReactNode } from "react";
import gsap from "gsap";
import { registerPortfolioClick } from "@/lib/portfolioConfetti";

type Props = {
  children: ReactNode;
  className?: string;
};

export function PortfolioClickableBrand({ children, className = "" }: Props) {
  const pulse = (el: HTMLElement) => {
    gsap.fromTo(
      el,
      { scale: 1 },
      {
        scale: 1.06,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      }
    );
  };

  return (
    <span
      role="button"
      tabIndex={0}
      className={className}
      onClick={(e) => {
        pulse(e.currentTarget);
        registerPortfolioClick(e.clientX, e.clientY);
      }}
      onKeyDown={(e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        const el = e.currentTarget;
        pulse(el);
        const rect = el.getBoundingClientRect();
        registerPortfolioClick(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        );
      }}
    >
      {children}
    </span>
  );
}
