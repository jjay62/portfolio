 "use client";

import { useEffect, useState } from "react";
import { Store, FileCodeCorner } from "lucide-react";

const stats = [
  { value: "100%", label: "OP MAAT GEBOUWD" },
  { value: "10+", label: "TECHNOLOGIEEN, tools en frameworks" },
  { value: "4", label: "Maanden maximaal tot voltooing" },
  { value: "8", label: "echte projecten " },
];

const PersonalAbout = () => {
  const titleText = "Web Developer";
  const introText =
    "Ik ben Jayden, ik ben 17 jaar oud en werk voornamelijk aan ecommerce websites en web applicaties.";
  const [typedTitle, setTypedTitle] = useState("");
  const [typedIntro, setTypedIntro] = useState("");
  const [titleDone, setTitleDone] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const section = document.getElementById("personal-about");
    if (!section || hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setStartTyping(true);
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasTriggered]);

  useEffect(() => {
    if (!startTyping) return;

    let titleIndex = 0;
    let introIndex = 0;
    let introTimer: ReturnType<typeof setInterval> | null = null;

    const titleTimer = setInterval(() => {
      titleIndex += 1;
      setTypedTitle(titleText.slice(0, titleIndex));

      if (titleIndex >= titleText.length) {
        clearInterval(titleTimer);
        setTitleDone(true);
        introTimer = setInterval(() => {
          introIndex += 1;
          setTypedIntro(introText.slice(0, introIndex));

          if (introIndex >= introText.length && introTimer) {
            clearInterval(introTimer);
            setIntroDone(true);
          }
        }, 18);
      }
    }, 55);

    return () => {
      clearInterval(titleTimer);
      if (introTimer) clearInterval(introTimer);
    };
  }, [startTyping]);

  return (
    <section id="personal-about" className="relative mt-0 flex min-h-screen w-full items-center pt-0 pb-16 sm:pb-20">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-blue-300">
            <span className="underline decoration-blue-500 decoration-2 underline-offset-4">Over mij</span>
          </p>

          <h2 className="cursor-default transition-all duration-300 text-4xl font-black leading-none text-white sm:text-6xl">
            <span className="text-slate-100">
              {typedTitle}
              {!titleDone && (
                <span className="ml-1 inline-block animate-pulse text-blue-500">|</span>
              )}
            </span>
          </h2>

          <p className="cursor-default transition-all duration-300 mt-6 text-lg leading-relaxed text-slate-300">
            {typedIntro}
            {!introDone && (
              <span className="ml-1 inline-block animate-pulse text-blue-300">|</span>
            )}
          </p>

          <p className="cursor-default transition-all duration-300 mt-3 text-lg leading-relaxed text-slate-300">
            Ik ben gespecialiseerd in:
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="cursor-default transition-all duration-300 inline-flex items-center gap-2 rounded-md border border-black bg-black px-3 py-1.5 font-bold text-white">
              <Store size={18} />
              ecommerce websites
            </span>
            <span className="cursor-default inline-flex items-center gap-2 rounded-md border border-blue-600 bg-blue-600/80 px-3 py-1.5 font-bold text-white">
            <FileCodeCorner size={18} />
              fullstack integrations
            </span>
          </div>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 border-b-2 border-blue-400 pb-1 text-xl font-bold text-white transition-colors hover:text-blue-300"
          >
            Neem contact op <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="hover:text-blue-400 hover:bg-blue-900/10 transition-all duration-300 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.map((item) => (
            <article 
              key={item.label}
              className="hover:text-blue-400 hover:bg-blue-900/10 transition-all duration-300 hover:scale-110 hover:rotate-2 hover:shadow-2xl rounded-3xl border border-white/10 bg-slate-900/40 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_18px_45px_rgba(2,6,23,0.6)] backdrop-blur-sm"
            >
              <p className="transition-all duration-300 text-5xl font-black leading-none text-blue-800">
                {item.value}
              </p>
              <p className="hover:text-blue-400 transition-all duration-300 mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalAbout;
