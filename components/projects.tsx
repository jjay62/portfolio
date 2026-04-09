"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  role: string;
  excerpt: string;
  tags: string[];
  accent: string;
  /** File in `public/` — URL starts at `/` (e.g. `public/x.png` → `/x.png`, never `/public/x.png`) */
  imageSrc?: string;
  imageAlt?: string;
  liveUrl?: string;
  liveLabel?: string;
};

const projectList: Project[] = [
  {
    title: "E-commerce Six2go",
    role: "Fullstack · Next.js",
    excerpt:
      "Eigen e-commerce platform met Next.js, TypeScript, Stripe en PostgreSQL gemaakt voor school project.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    accent: "from-violet-500/30 to-blue-600/20",
    imageSrc: "/six2go.png",
    imageAlt: "",
    liveUrl: "https://sixtwogo.vercel.app/nl",
    liveLabel: "Bekijk site",
  },
  {
    title: "dartshopper / lightexpert",
    role: "Front-end · design",
    excerpt:
      "Landingspagina met sterke visuele hiërarchie, scroll-gedreven en strakke performance-scores. Content is via CMS aanpasbaar zodat het team zelf kan itereren.",
    tags: ["React", "Design", "CMS"],
    accent: "from-cyan-500/25 to-emerald-500/15",
    imageSrc: "/dartshopper.png",
    imageAlt: "",
    liveUrl: "https://dartshopper.nl",
    liveLabel: "Bekijk site",
  },
];

function ProjectCardMedia({
  accent,
  imageSrc,
  imageAlt,
  title,
}: {
  accent: string;
  imageSrc?: string;
  imageAlt?: string;
  title: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(imageSrc) && !imgFailed;

  return (
    <div className="relative mb-6 h-60 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 sm:h-60">
      {showImage && imageSrc ? (
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accent}`}
          aria-hidden
        />
      )}
      {showImage ? (
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
          aria-hidden
        />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)] bg-[length:200%_100%] opacity-60" />
      )}
      <span className="absolute bottom-3 left-4 z-10 text-xs font-semibold uppercase tracking-widest text-white/90">
        Case study
      </span>
    </div>
  );
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tiltCleanupsRef = useRef<Array<() => void>>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    tiltCleanupsRef.current = [];

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector("[data-projects-eyebrow]");
      const line = section.querySelector("[data-projects-line]");
      const title = section.querySelector("[data-projects-title]");
      const lead = section.querySelector("[data-projects-lead]");
      const aurora = section.querySelector("[data-projects-aurora]");
      const articles = section.querySelectorAll("[data-project-article]");
      const parallaxLayers = section.querySelectorAll("[data-project-parallax]");
      const inners = section.querySelectorAll("[data-project-inner]");
      const shimmers = section.querySelectorAll("[data-project-shimmer]");
      const tagGroups = section.querySelectorAll("[data-project-tags]");

      gsap.set(aurora, { opacity: 0, scale: 0.6, rotate: -90 });
      gsap.set(articles, {
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
        clipPath: "inset(46% 46% 46% 46% round 28px)",
      });
      gsap.set(inners, { transformStyle: "preserve-3d" });
      gsap.set(shimmers, { xPercent: -120, opacity: 0.9 });

      const enterTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 68%",
          once: true,
        },
      });

      enterTl
        .to(aurora, {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.1,
          ease: "expo.out",
        })
        .fromTo(
          line,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.55 },
          "-=0.75"
        )
        .fromTo(
          eyebrow,
          { opacity: 0, letterSpacing: "0.5em", filter: "blur(8px)" },
          {
            opacity: 1,
            letterSpacing: "0.28em",
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power4.out",
          },
          "-=0.55"
        )
        .fromTo(
          title,
          { opacity: 0, y: 48, skewX: -6, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            skewX: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.55"
        )
        .fromTo(
          lead,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.55 },
          "-=0.55"
        )
        .fromTo(
          articles,
          {
            opacity: 0,
            scale: 0.22,
            rotateY: (i) => (i === 0 ? 78 : -78),
            rotateX: 52,
            z: -720,
            y: 100,
            filter: "blur(22px) brightness(1.8)",
          },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            z: 0,
            y: 0,
            filter: "blur(0px) brightness(1)",
            duration: 1.45,
            stagger: {
              each: 0.22,
              from: "center",
              ease: "expo.out",
            },
            ease: "expo.out",
          },
          "-=0.35"
        )
        .to(
          articles,
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            duration: 1.05,
            stagger: { each: 0.12, from: "center" },
            ease: "expo.inOut",
          },
          "-=1.15"
        )
        .to(
          shimmers,
          {
            xPercent: 120,
            duration: 0.85,
            stagger: 0.18,
            ease: "power2.inOut",
          },
          "-=0.55"
        )
        .to(shimmers, { opacity: 0, duration: 0.35, stagger: 0.05 }, "-=0.25");

      tagGroups.forEach((group) => {
        const tags = group.querySelectorAll("[data-project-tag]");
        enterTl.fromTo(
          tags,
          { opacity: 0, y: 22, rotateZ: -6, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "-=0.65"
        );
      });

      gsap.to(aurora, {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.25,
        onUpdate: (self) => {
          const p = self.progress;
          parallaxLayers.forEach((layer, i) => {
            gsap.set(layer, {
              y: i === 0 ? p * -22 : p * -12,
            });
          });
        },
      });

      articles.forEach((article) => {
        const el = article as HTMLElement;
        gsap.set(el, {
          transformPerspective: 1600,
          transformStyle: "preserve-3d",
        });

        const rotateXTo = gsap.quickTo(el, "rotationX", {
          duration: 0.6,
          ease: "power3.out",
        });
        const rotateYTo = gsap.quickTo(el, "rotationY", {
          duration: 0.6,
          ease: "power3.out",
        });

        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const nx = (e.clientX - cx) / Math.max(r.width / 2, 1);
          const ny = (e.clientY - cy) / Math.max(r.height / 2, 1);
          rotateXTo(-ny * 9);
          rotateYTo(nx * 11);
        };

        const onLeave = () => {
          rotateXTo(0);
          rotateYTo(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        tiltCleanupsRef.current.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
      });
    }, section);

    return () => {
      tiltCleanupsRef.current.forEach((fn) => fn());
      tiltCleanupsRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projecten"
      className="relative min-h-screen w-full overflow-hidden py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div
        data-projects-aurora
        className="pointer-events-none absolute left-1/2 top-[42%] z-0 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 [background:conic-gradient(from_0deg,transparent_0%,rgba(59,130,246,0.35)_18%,transparent_35%,rgba(139,92,246,0.3)_52%,transparent_68%,rgba(34,211,238,0.28)_82%,transparent_100%)] blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="relative z-10 mb-14 max-w-3xl sm:mb-16">
          <div className="flex items-center gap-3">
            <span
              data-projects-line
              className="block h-px w-12 bg-blue-400/70"
            />
            <p
              data-projects-eyebrow
              className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-300"
            >
              Geselecteerde projecten
            </p>
          </div>
          <h2
            data-projects-title
            className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Twee projecten waar ik trots op ben
          </h2>
          <p data-projects-lead className="mt-4 text-lg text-slate-400">
            Side-by-side overzicht: van commerce tot campagne — altijd met oog
            voor performance, UX en onderhoudbare code.
          </p>
        </header>

        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {projectList.map((project) => (
            <article
              key={project.title}
              data-project-article
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-colors duration-300 hover:border-blue-400/20 will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
              onPointerEnter={(e) => {
                const glow = e.currentTarget.querySelector(
                  "[data-project-glow]"
                );
                if (!glow) return;
                gsap.to(glow, {
                  opacity: 0.55,
                  scale: 1.08,
                  duration: 0.55,
                  ease: "power2.out",
                });
              }}
              onPointerLeave={(e) => {
                const glow = e.currentTarget.querySelector(
                  "[data-project-glow]"
                );
                if (!glow) return;
                gsap.to(glow, {
                  opacity: 0.25,
                  scale: 1,
                  duration: 0.65,
                  ease: "power3.out",
                });
              }}
            >
              <div
                data-project-parallax
                className="relative flex flex-1 flex-col will-change-transform"
              >
              <div
                data-project-inner
                className="relative flex flex-1 flex-col"
              >
                <div
                  data-project-shimmer
                  className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.35)_50%,transparent_60%)]"
                  aria-hidden
                />
                <div
                  data-project-glow
                  className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${project.accent} opacity-25 blur-3xl`}
                  aria-hidden
                />
                <ProjectCardMedia
                  accent={project.accent}
                  imageSrc={project.imageSrc}
                  imageAlt={project.imageAlt}
                  title={project.title}
                />

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/90">
                  {project.role}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-slate-400">
                  {project.excerpt}
                </p>

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl border border-blue-400/40 bg-blue-500/10 px-4 py-2.5 text-sm font-semibold text-blue-200 transition-colors hover:border-blue-400/70 hover:bg-blue-500/20 hover:text-white"
                  >
                    {project.liveLabel ?? "Bekijk site"}
                    <span aria-hidden className="text-lg leading-none">
                      ↗
                    </span>
                  </a>
                ) : null}

                <div
                  data-project-tags
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      data-project-tag
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
