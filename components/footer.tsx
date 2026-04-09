"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SOCIAL_LINKS } from "@/lib/social";
import { PortfolioClickableBrand } from "@/components/PortfolioClickableBrand";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "Home", href: "#hero" },
  { label: "Over mij", href: "#personal-about" },
  { label: "Kennis", href: "#kennis" },
  { label: "Projecten", href: "#projecten" },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const brand = footer.querySelector("[data-footer-brand]");
      const items = footer.querySelectorAll("[data-footer-link]");
      const socials = footer.querySelectorAll("[data-footer-social]");
      const rule = footer.querySelector("[data-footer-rule]");
      const copy = footer.querySelector("[data-footer-copy]");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: footer,
          start: "top 88%",
          once: true,
        },
      });

      tl.fromTo(
        rule,
        { scaleX: 0, transformOrigin: "center" },
        { scaleX: 1, duration: 0.65 }
      )
        .fromTo(
          brand,
          { opacity: 0, y: 20, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 },
          "-=0.35"
        )
        .fromTo(
          items,
          { opacity: 0, y: 16, rotationX: -25, transformPerspective: 400 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.5,
            stagger: 0.08,
          },
          "-=0.4"
        )
        .fromTo(
          socials,
          { opacity: 0, y: 14, scale: 0.88, rotationZ: -6 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationZ: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: "back.out(1.4)",
          },
          "-=0.35"
        )
        .fromTo(
          copy,
          { opacity: 0 },
          { opacity: 1, duration: 0.45 },
          "-=0.35"
        );

    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative mt-8 w-full border-t border-white/[0.06] bg-black/20 pb-10 pt-12"
    >
      <div
        data-footer-rule
        className="pointer-events-none absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
      />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <p
          data-footer-brand
          className="text-center text-lg font-bold tracking-tight text-white lg:text-left"
        >
          <PortfolioClickableBrand className="inline-block cursor-pointer select-none rounded-md px-0.5 outline-offset-4 hover:text-blue-200/90">
            Portfolio
          </PortfolioClickableBrand>
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-footer-link
              className="relative text-sm font-semibold uppercase tracking-[0.2em] text-slate-400"
              onMouseEnter={(e) => {
                const u = e.currentTarget.querySelector(
                  "[data-footer-underline]"
                );
                if (u)
                  gsap.to(u, {
                    scaleX: 1,
                    duration: 0.4,
                    ease: "power2.out",
                  });
                gsap.to(e.currentTarget, {
                  y: -2,
                  duration: 0.25,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                const u = e.currentTarget.querySelector(
                  "[data-footer-underline]"
                );
                if (u)
                  gsap.to(u, {
                    scaleX: 0,
                    duration: 0.35,
                    ease: "power2.in",
                  });
                gsap.to(e.currentTarget, {
                  y: 0,
                  duration: 0.25,
                  ease: "power2.out",
                });
              }}
            >
              {link.label}
              <span
                data-footer-underline
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-blue-400"
              />
            </a>
          ))}
        </nav>
      </div>

      <nav
        className="mx-auto mt-6 flex w-full max-w-7xl flex-wrap items-center justify-center gap-3 px-4 sm:px-6 lg:px-8"
        aria-label="Social media"
      >
        {SOCIAL_LINKS.map(({ label, href, Icon, iconClass }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-footer-social
            className={`group flex size-11 items-center justify-center rounded-xl border transition-colors duration-200 ${iconClass}`}
            aria-label={label}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                y: -3,
                duration: 0.3,
                ease: "power2.out",
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                y: 0,
                duration: 0.35,
                ease: "power2.out",
              });
            }}
          >
            <Icon className="size-5" aria-hidden />
          </a>
        ))}
      </nav>

      <p
        data-footer-copy
        className="mx-auto mt-10 max-w-7xl px-4 text-center text-xs text-slate-600 sm:px-6 lg:px-8"
      >
        © {new Date().getFullYear()} — Gebouwd met Next.js &amp; GSAP.
      </p>
    </footer>
  );
};

export default Footer;
