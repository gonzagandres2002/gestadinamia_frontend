"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";

const channels = [
  { k: "Dirección", v: "Carrera 62 # 52-59", href: null },
  { k: "Teléfono", v: "314 578 9702", href: "https://wa.me/573145789702" },
  { k: "Correo", v: "luisfer_uda@yahoo.com", href: "mailto:luisfer_uda@yahoo.com" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const reduce = useReducedMotion();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: { email?: string; message?: string } = {};
    if (!EMAIL_RE.test(formData.email)) next.email = "Ingrese un correo válido.";
    if (formData.message.trim().length < 10) next.message = "Cuéntenos un poco más (mínimo 10 caracteres).";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  return (
    <section id="contacto" className="scroll-mt-24 border-t border-line px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">Contacto</p>
            <h2 className="mt-6 max-w-md text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl">
              Conectemos para impulsar la salud materna
            </h2>
            <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted">
              Escríbanos para resolver dudas, proponer alianzas o conocer más sobre nuestras
              líneas de investigación.
            </p>

            <dl className="mt-12 space-y-px overflow-hidden rounded-2xl border border-gray-border">
              {channels.map((c) => (
                <div key={c.k} className="flex items-baseline justify-between gap-4 border-b border-line bg-surface px-5 py-4 last:border-b-0">
                  <dt className="text-[13px] text-muted">{c.k}</dt>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[15px] font-medium text-accent transition-colors hover:text-accent-strong"
                    >
                      {c.v}
                    </a>
                  ) : (
                    <dd className="text-[15px] font-medium text-ink">{c.v}</dd>
                  )}
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} y={28}>
            {submitted ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex h-full min-h-72 flex-col items-center justify-center rounded-3xl border border-gray-border bg-surface p-10 text-center"
              >
                <motion.span
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.32, delay: 0.08 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </motion.span>
                <p className="mt-5 text-xl font-semibold tracking-tight text-ink">Mensaje enviado</p>
                <p className="mt-2 max-w-xs text-muted">Gracias por contactarnos. Le responderemos pronto.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-gray-border bg-surface p-7 lg:p-9">
                <div className="space-y-5">
                  <Field id="name" label="Nombre">
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Su nombre"
                      className="w-full rounded-xl border border-gray-border bg-background px-4 py-3 text-[15px] text-ink transition-colors placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/12"
                    />
                  </Field>

                  <Field id="email" label="Correo electrónico" required error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      aria-invalid={!!errors.email}
                      placeholder="ejemplo@correo.com"
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-[15px] text-ink transition-colors placeholder:text-muted/60 focus:outline-none focus:ring-4 ${
                        errors.email
                          ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/12"
                          : "border-gray-border focus:border-accent focus:ring-accent/12"
                      }`}
                    />
                  </Field>

                  <Field id="message" label="Mensaje" required error={errors.message}>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      aria-invalid={!!errors.message}
                      placeholder="Escriba su mensaje"
                      className={`w-full resize-none rounded-xl border bg-background px-4 py-3 text-[15px] text-ink transition-colors placeholder:text-muted/60 focus:outline-none focus:ring-4 ${
                        errors.message
                          ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/12"
                          : "border-gray-border focus:border-accent focus:ring-accent/12"
                      }`}
                    />
                  </Field>

                  <motion.button
                    type="submit"
                    whileHover={reduce ? undefined : { y: -1 }}
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="w-full rounded-xl bg-primary px-8 py-3.5 text-[15px] font-medium text-white shadow-[0_12px_30px_-10px_rgba(20,98,43,0.55)] hover:bg-primary-light"
                  >
                    Enviar mensaje
                  </motion.button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[13px] text-rose-600">{error}</p>}
    </div>
  );
}
