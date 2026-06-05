"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";

const ENTRANCE_SPRING = { type: "spring" as const, duration: 0.55, bounce: 0.15 };

const stats = [
  { k: "Lidera", v: "U. de Antioquia" },
  { k: "Colaboran", v: "UCC · Remington" },
  { k: "Apoyo internacional", v: "Hospital de Jena" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: background drifts slower and scales; content lifts and fades.
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
  };
  const item: Variants = {
    hidden: reduce ? {} : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: ENTRANCE_SPRING },
  };

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden px-6 pt-28 pb-24 lg:px-10"
    >
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
        className="absolute -inset-[8%] -z-30 bg-[url('/images/hero.png')] bg-cover bg-center"
      />
      {/* Stronger, layered tint so every line of copy stays legible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(3,11,7,0.9)_0%,rgba(4,13,8,0.74)_42%,rgba(2,9,6,0.94)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(2,9,6,0.88)_0%,rgba(2,9,6,0.45)_46%,transparent_78%)]"
      />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-6xl"
      >
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-4 py-1.5 text-[13px] font-medium text-white/90 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Investigación en salud materna y fetal
          </motion.span>

          <h1 className="mt-8 max-w-4xl text-[15vw] font-semibold leading-[0.92] tracking-[-0.04em] text-white sm:text-7xl lg:text-[7.5rem]">
            <motion.span variants={item} className="block">
              Ciencia aplicada
            </motion.span>
            <motion.span variants={item} className="block text-emerald-200/90">
              al embarazo
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-white/85"
          >
            Un equipo multidisciplinario que mejora el diagnóstico y el manejo de la
            preeclampsia y los trastornos hipertensivos del embarazo.
          </motion.p>

          <motion.div variants={item} className="mt-11 flex flex-col gap-3 sm:flex-row">
            <motion.a
              href="#sobre-nosotros"
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-[15px] font-medium text-[#0a1f12] shadow-[0_12px_36px_rgba(5,18,10,0.4)] sm:w-auto"
            >
              Conócenos
            </motion.a>
            <motion.a
              href="#contacto"
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/[0.07] px-8 py-4 text-[15px] font-medium text-white backdrop-blur sm:w-auto"
            >
              Contacto
            </motion.a>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-16 grid max-w-2xl grid-cols-1 gap-x-10 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-3"
          >
            {stats.map((s) => (
              <div key={s.k}>
                <dt className="text-[12px] uppercase tracking-[0.14em] text-white/55">{s.k}</dt>
                <dd className="mt-1 text-[15px] font-medium text-emerald-100">{s.v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>

      {/* Scroll cue — fades away as soon as you move */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { opacity: cueOpacity }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-white/80"
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
