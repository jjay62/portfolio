"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const animateFieldFocus = (field: HTMLElement, focused: boolean) => {
  gsap.to(field, {
    borderColor: focused
      ? "rgba(96, 165, 250, 0.45)"
      : "rgba(255, 255, 255, 0.1)",
    boxShadow: focused
      ? "0 0 0 1px rgba(96, 165, 250, 0.2)"
      : "none",
    duration: 0.35,
    ease: "power2.out",
  });
  const input = field.querySelector("input, textarea");
  if (input) {
    gsap.to(input, {
      y: focused ? -1 : 0,
      duration: 0.25,
      ease: "power2.out",
    });
  }
};

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  const [sent, setSent] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const line = section.querySelector("[data-contact-line]");
      const eyebrow = section.querySelector("[data-contact-eyebrow]");
      const title = section.querySelector("[data-contact-title]");
      const copy = section.querySelector("[data-contact-copy]");
      const fields = section.querySelectorAll("[data-contact-field]");
      const submit = section.querySelector("[data-contact-submit]");
      const deco = section.querySelector("[data-contact-deco]");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      tl.fromTo(
        line,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.5 }
      )
        .fromTo(
          eyebrow,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.2"
        )
        .fromTo(
          title,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.25"
        )
        .fromTo(
          copy,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          deco,
          { opacity: 0, scale: 0.85, rotation: -6 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.75,
            ease: "back.out(1.2)",
          },
          "-=0.5"
        )
        .fromTo(
          fields,
          { opacity: 0, y: 28, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
            stagger: 0.1,
          },
          "-=0.45"
        )
        .fromTo(
          submit,
          { opacity: 0, scale: 0.9, y: 12 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.5)",
          },
          "-=0.35"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!sent || !successRef.current) return;
    gsap.fromTo(
      successRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
    );
  }, [sent]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const btn = formRef.current?.querySelector<HTMLButtonElement>(
      "[data-contact-submit]"
    );
    if (!btn || sent) return;

    gsap
      .timeline()
      .to(btn, {
        scale: 0.96,
        duration: 0.12,
        ease: "power2.in",
      })
      .to(btn, {
        scale: 1,
        duration: 0.35,
        ease: "elastic.out(1, 0.5)",
      });

    setSent(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full py-20 sm:py-28"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span
              data-contact-line
              className="block h-px w-12 bg-blue-400/70"
            />
            <p
              data-contact-eyebrow
              className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-300"
            >
              Contact
            </p>
          </div>
          <h2
            data-contact-title
            className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl"
          >
            Laten we iets bouwen
          </h2>
          <p data-contact-copy className="mt-4 text-lg text-slate-400">
            Vertel kort wat je zoekt 
          </p>

          <div
            data-contact-deco
            className="relative mt-10 hidden h-48 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-violet-600/10 lg:block"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.25),transparent_50%)]" />
            <p className="relative z-10 p-6 text-sm font-medium text-slate-300">
              GSAP-gedreven secties · scroll reveals · micro-interacties
            </p>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:p-8"
        >
          <label
            data-contact-field
            className="block rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Naam
            </span>
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              className="mt-2 w-full border-0 bg-transparent text-base text-white outline-none placeholder:text-slate-600"
              placeholder="Je naam"
              onFocus={(e) => {
                const field = e.currentTarget.closest(
                  "[data-contact-field]"
                ) as HTMLElement | null;
                if (field) animateFieldFocus(field, true);
              }}
              onBlur={(e) => {
                const field = e.currentTarget.closest(
                  "[data-contact-field]"
                ) as HTMLElement | null;
                if (field) animateFieldFocus(field, false);
              }}
            />
          </label>
          <label
            data-contact-field
            className="block rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              E-mail
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full border-0 bg-transparent text-base text-white outline-none placeholder:text-slate-600"
              placeholder="jij@voorbeeld.nl"
              onFocus={(e) => {
                const field = e.currentTarget.closest(
                  "[data-contact-field]"
                ) as HTMLElement | null;
                if (field) animateFieldFocus(field, true);
              }}
              onBlur={(e) => {
                const field = e.currentTarget.closest(
                  "[data-contact-field]"
                ) as HTMLElement | null;
                if (field) animateFieldFocus(field, false);
              }}
            />
          </label>
          <label
            data-contact-field
            className="block rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Bericht
            </span>
            <textarea
              name="message"
              required
              rows={5}
              className="mt-2 w-full resize-none border-0 bg-transparent text-base text-white outline-none placeholder:text-slate-600"
              placeholder="Waar kan ik mee helpen?"
              onFocus={(e) => {
                const field = e.currentTarget.closest(
                  "[data-contact-field]"
                ) as HTMLElement | null;
                if (field) animateFieldFocus(field, true);
              }}
              onBlur={(e) => {
                const field = e.currentTarget.closest(
                  "[data-contact-field]"
                ) as HTMLElement | null;
                if (field) animateFieldFocus(field, false);
              }}
            />
          </label>

          <button
            data-contact-submit
            type="submit"
            disabled={sent}
            className="mt-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-blue-500/25 transition-[filter] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sent ? "Verzonden" : "Verstuur"}
          </button>

          {sent && (
            <p
              ref={successRef}
              className="text-sm text-emerald-400"
              aria-live="polite"
            >
              Bedankt — bericht ontvangen (demo). Koppel hier je echte API.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
