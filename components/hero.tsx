"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { SOCIAL_LINKS } from "@/lib/social";


gsap.registerPlugin(SplitText);

/** Drop your photo in `portfolio62/public/profile.jpg` (or change path below). */
const PROFILE_IMAGE_SRC = "/profile.jpg";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const [profileImageFailed, setProfileImageFailed] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current || !rootRef.current) return;
        hasAnimatedRef.current = true;

        const headingEl =
          rootRef.current.querySelector<HTMLElement>("[data-split-heading]");
        const textEl =
          rootRef.current.querySelector<HTMLElement>("[data-split-text]");
        if (!headingEl || !textEl) return;

        const headingSplit = SplitText.create(headingEl, { type: "words" });
        const textSplit = SplitText.create(textEl, { type: "words" });

        gsap.from(headingSplit.words, {
          y: -100,
          opacity: 0,
          rotation: "random(-80, 80)",
          duration: 0.7,
          ease: "back.out(1.4)",
          stagger: 0.12,
        });

        gsap.from(textSplit.words, {
          y: -50,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.05,
          delay: 0.2,
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative mt-0 min-h-screen w-full">
      <div className="relative flex min-h-screen w-full items-center overflow-hidden border-y border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 py-12 text-slate-100 shadow-2xl sm:py-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-900/20 blur-3xl" />
        <div
          ref={rootRef}
          className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8"
        >
          <div className="order-1 flex flex-col justify-center lg:order-1">
            <p className="mb-4 inline-flex w-fit rounded-full border border-blue-300/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
              Fullstack Developer
            </p>

            <h1
              data-split-heading
              className="max-w-2xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
            >
              Ik ben een <span className="text-blue-400 hover:text-blue-700 transition-all duration-900 cursor-default"> software engineer</span> met een passie voor het bouwen van <span className="text-blue-400 hover:text-blue-700 transition-all duration-900 cursor-default"> web
               applicaties.</span> 
            </h1>

            <p
              data-split-text
              className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg"
            >
              Gefocust op het bouwen van snelle, schaalbare fullstack applicaties
              met Next.js en moderne tooling.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-lg bg-white/10 px-3 py-1 text-sm text-blue-100">
                Next.js
              </span>
              <span className="rounded-lg bg-white/10 px-3 py-1 text-sm text-blue-100">
                TypeScript
              </span>
              <span className="rounded-lg bg-white/10 px-3 py-1 text-sm text-blue-100">
                Fullstack
              </span>
            </div>

            <nav
              className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3"
              aria-label="Social media"
            >
              {SOCIAL_LINKS.map(({ label, href, Icon, iconClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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
          </div>

          <div className="order-2 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px]">
              <div
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-cyan-500/20 opacity-70 blur-2xl"
                aria-hidden
              />
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/15 bg-slate-800/50 shadow-2xl ring-1 ring-white/10">
                {profileImageFailed ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-800 p-6 text-center text-sm text-slate-400">
                    <span className="font-semibold text-slate-300">
                      Profielfoto
                    </span>
                    <span>
                      Zet je foto in{" "}
                      <code className="rounded-4xl border border-white/10 bg-black/40 px-1.5 py-0.5 text-xs text-blue-200 shadow-2xl">
                        public/profile.jpg
                      </code>
                    </span>
                  </div>
                ) : (
                  <Image
                    src={PROFILE_IMAGE_SRC}
                    alt=""
                    width={480}
                    height={480}
                    priority
                    className="h-full w-full object-cover object-center"
                    sizes="(max-width: 1024px) 90vw, 380px"
                    onError={() => setProfileImageFailed(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
