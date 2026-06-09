"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type Slide = { src: string; alt: string };

const slides: Slide[] = [
  {
    src: "/images/lab1.jpeg",
    alt: "Investigadora prepara una muestra en el laboratorio de reproducción",
  },
  {
    src: "/images/lab2.jpeg",
    alt: "Pipeteo de muestras de gestantes durante el procesamiento de laboratorio",
  },
  {
    src: "/images/lab3.jpeg",
    alt: "Equipo de investigación trabajando en el laboratorio de Gestadinamia",
  },
];

const AUTOPLAY_MS = 5000;
// Depth offsets for each card behind the front one (a photo stack, not a slider).
const DEPTH = [
  { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
  { x: 22, y: 18, scale: 0.94, rotate: 2.4, opacity: 0.78 },
  { x: -16, y: 32, scale: 0.88, rotate: -2.2, opacity: 0.55 },
];

export default function LabCarousel() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;

  const advance = useCallback(() => setActive((a) => (a + 1) % n), [n]);

  // Autoplay — paused on hover/focus and when the tab is hidden or reduced motion is on.
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (!pausedRef.current && !document.hidden) advance();
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [advance, reduce]);

  return (
    <div className="mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
      <div
        className="relative aspect-[4/3] w-full select-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {slides.map((slide, i) => {
          const order = (i - active + n) % n;
          const depth = DEPTH[order];
          const isFront = order === 0;
          return (
            <motion.button
              key={slide.src}
              type="button"
              aria-label={isFront ? "Ver la siguiente foto" : slide.alt}
              aria-hidden={!isFront}
              tabIndex={isFront ? 0 : -1}
              onClick={isFront ? advance : undefined}
              initial={false}
              animate={
                reduce
                  ? { opacity: isFront ? 1 : 0 }
                  : {
                      transform: `translate3d(${depth.x}px, ${depth.y}px, 0) scale(${depth.scale}) rotate(${depth.rotate}deg)`,
                      opacity: depth.opacity,
                    }
              }
              transition={
                reduce
                  ? { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                  : { type: "spring", stiffness: 260, damping: 30, mass: 0.9 }
              }
              style={{ zIndex: n - order }}
              className={`absolute inset-0 overflow-hidden rounded-3xl shadow-[0_28px_70px_-24px_rgba(14,23,20,0.4)] ${
                isFront ? "cursor-pointer ring-1 ring-black/[0.04]" : "pointer-events-none"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                priority={i === 0}
                className="object-cover"
              />
              {/* Faint inner edge so stacked cards keep separation on light backgrounds */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"
              />
            </motion.button>
          );
        })}
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2.5 lg:justify-end">
        {slides.map((slide, i) => {
          const isActive = i === active;
          return (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ir a la foto ${i + 1}`}
              aria-current={isActive}
              className="group flex h-6 items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out group-active:scale-95 ${
                  isActive ? "w-7 bg-accent" : "w-1.5 bg-gray-border group-hover:bg-muted/50"
                }`}
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
