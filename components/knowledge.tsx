"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiCss,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

type Skill = {
  name: string;
  category: string;
  percent: number;
  icon: ReactNode;
  accent: string;
  span?: "wide" | "tall";
};

const skills: Skill[] = [
  {
    name: "Next.js",
    category: "Framework",
    percent: 92,
    icon: <SiNextdotjs className="size-7 text-white" aria-hidden />,
    accent: "from-slate-100 to-slate-400",
    span: "wide",
  },
  {
    name: "TypeScript",
    category: "Taal",
    percent: 76,
    icon: <SiTypescript className="size-7 text-[#3178C6]" aria-hidden />,
    accent: "from-blue-400 to-indigo-500",
  },
  {
    name: "React",
    category: "Library",
    percent: 86,
    icon: <SiReact className="size-7 text-[#61DAFB]" aria-hidden />,
    accent: "from-cyan-400 to-blue-500",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    percent: 90,
    icon: <SiTailwindcss className="size-7 text-[#06B6D4]" aria-hidden />,
    accent: "from-sky-400 to-teal-400",
  },
  {
    name: "JavaScript",
    category: "Taal",
    percent: 84,
    icon: <SiJavascript className="size-7 text-[#F7DF1E]" aria-hidden />,
    accent: "from-amber-400 to-orange-500",
  },
  {
    name: "HTML",
    category: "Basis",
    percent: 95,
    icon: <SiHtml5 className="size-7 text-[#E34F26]" aria-hidden />,
    accent: "from-orange-400 to-red-500",
  },
  {
    name: "CSS",
    category: "Styling",
    percent: 88,
    icon: <SiCss className="size-7 text-[#1572B6]" aria-hidden />,
    accent: "from-fuchsia-400 to-purple-500",
  },
  {
    name: "Design",
    category: "UI / UX / animations",
    percent: 78,
    icon: <SiFigma className="size-7 text-[#F24E1E]" aria-hidden />,
    accent: "from-lime-400 to-emerald-500",
  },
  {
    name: "Database",
    category: "PostgreSQL",
    percent: 88,
    icon: <SiPostgresql className="size-7 text-[#4169E1]" aria-hidden />,
    accent: "from-violet-400 to-blue-600",
  },
];

const Knowledge = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const iconWrappers = section.querySelectorAll<HTMLElement>(
      "[data-knowledge-icon]"
    );
    const cleanups: Array<() => void> = [];

    iconWrappers.forEach((el) => {
      gsap.set(el, { transformOrigin: "50% 50%" });

      const rotateTo = gsap.quickTo(el, "rotation", {
        duration: 0.55,
        ease: "power3.out",
      });
      const scaleTo = gsap.quickTo(el, "scale", {
        duration: 0.45,
        ease: "back.out(1.75)",
      });
      const yTo = gsap.quickTo(el, "y", {
        duration: 0.4,
        ease: "power2.out",
      });

      const onEnter = () => {
        rotateTo(gsap.utils.random(-10, 10));
        scaleTo(1.14);
        yTo(-3);
      };
      const onLeave = () => {
        rotateTo(0);
        scaleTo(1);
        yTo(0);
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        gsap.killTweensOf(el);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headerEyebrow = section.querySelector("[data-knowledge-eyebrow]");
      const headerTitle = section.querySelector("[data-knowledge-title]");
      const headerLine = section.querySelector("[data-knowledge-line]");
      const cards = section.querySelectorAll("[data-knowledge-card]");
      const bars = section.querySelectorAll("[data-knowledge-bar-fill]");
      const pctEls = section.querySelectorAll("[data-knowledge-pct]");

      gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      tl.fromTo(
        headerLine,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.55 }
      )
        .fromTo(
          headerEyebrow,
          { opacity: 0, x: -18, filter: "blur(6px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.65 },
          "-=0.35"
        )
        .fromTo(
          headerTitle,
          { opacity: 0, y: 36, rotateX: -12, transformPerspective: 800 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.85 },
          "-=0.45"
        )
        .fromTo(
          cards,
          {
            opacity: 0,
            y: 48,
            scale: 0.94,
            rotateX: 8,
            transformPerspective: 900,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.75,
            stagger: { each: 0.07, from: "start" },
          },
          "-=0.45"
        )
        .to(
          bars,
          {
            scaleX: (i) =>
              Number(
                (bars[i] as HTMLElement).getAttribute("data-target") ?? 0
              ) / 100,
            duration: 1.2,
            ease: "power2.inOut",
            stagger: { each: 0.06, from: "start" },
          },
          "-=0.35"
        );

      tl.addLabel("bars", "<");

      pctEls.forEach((el, i) => {
        const target = Number(
          (bars[i] as HTMLElement)?.getAttribute("data-target") ?? 0
        );
        const counter = { v: 0 };
        tl.to(
          counter,
          {
            v: target,
            duration: 1,
            ease: "power2.out",
            onUpdate: () => {
              (el as HTMLElement).textContent = `${Math.round(counter.v)}%`;
            },
          },
          `bars+=${i * 0.06}`
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="kennis"
      className="relative flex min-h-screen w-full items-center overflow-hidden py-16 sm:py-20 border-gray-500/20 border-2 shadow-2xl"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148,163,184,0.14) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 max-w-3xl [perspective:1000px] sm:mb-14">
          <div className="flex items-center gap-3">
            <span
              data-knowledge-line
              className="block h-px w-12 bg-blue-400/70"
            />
            <p
              data-knowledge-eyebrow
              className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-300"
            >
              Kennis
            </p>
          </div>
          <h2
            data-knowledge-title
            className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Stack &amp; expertise
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
            Een overzicht van waar ik het meest in werk — met focus op moderne
            front-end, typesafety en animatie.
          </p>
        </header>

        <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill, index) => (
            <article
              key={skill.name}
              data-knowledge-card
              className={`group relative flex flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-blue-400/25 hover:shadow-[0_0_0_1px_rgba(96,165,250,0.12),0_24px_60px_rgba(2,6,23,0.45)] ${
                skill.span === "wide"
                  ? "md:col-span-2 xl:col-span-2 xl:flex-row xl:items-center xl:gap-8"
                  : ""
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className={`absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b ${skill.accent} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                aria-hidden
              />

              <div
                className={`flex flex-1 flex-col pl-4 ${skill.span === "wide" ? "xl:flex-row xl:items-center xl:gap-6" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      data-knowledge-icon
                      className="flex size-11 shrink-0 cursor-default items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-inner will-change-transform group-hover:border-white/25"
                    >
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {skill.name}
                      </h3>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {skill.category}
                      </p>
                    </div>
                  </div>
                  <span
                    data-knowledge-pct
                    className="shrink-0 text-2xl font-black tabular-nums text-blue-300 sm:text-3xl"
                  >
                    0%
                  </span>
                </div>

                <div
                  className={`mt-5 ${skill.span === "wide" ? "xl:mt-0 xl:flex-1" : ""}`}
                >
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Niveau
                  </p>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      data-knowledge-bar-fill
                      data-target={skill.percent}
                      className={`h-full w-full rounded-full bg-gradient-to-r ${skill.accent}`}
                    />
                  </div>
                </div>
              </div>

              <span
                className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] text-slate-600 opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Knowledge;
