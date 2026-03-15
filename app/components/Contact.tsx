"use client";

import { useState, type FormEvent } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contacto"
      className="scroll-mt-20 relative overflow-hidden py-20 px-6 lg:px-16"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#ffffff_0%,#f2f8f4_50%,#ffffff_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-8 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-primary/40" />
          <p className="text-sm uppercase tracking-[0.16em] text-primary/80">
            Contacto
          </p>
          <span className="h-px w-12 bg-primary/40" />
        </div>

        <h2 className="mx-auto mb-4 max-w-3xl text-center text-3xl font-semibold leading-[1.1] text-text lg:text-5xl">
          Conectemos para impulsar la salud materna
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-base text-text/75 sm:text-lg">
          Escríbanos para resolver dudas, proponer alianzas o conocer más sobre
          nuestras líneas de investigación en preeclampsia y embarazo.
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          {/* Contact info */}
          <div className="rounded-2xl border border-primary/12 bg-white p-6 shadow-[0_14px_34px_rgba(13,20,26,0.08)]">
            <h3 className="mb-5 text-xl font-semibold text-primary">Canales de contacto</h3>

            <div className="space-y-4">
              <div className="rounded-xl border border-gray-border bg-[#f9fcfa] p-4">
                <p className="mb-1 text-sm text-text/65">Dirección</p>
                <p className="font-medium text-text">Carrera 62 # 52-59</p>
              </div>

              <div className="rounded-xl border border-gray-border bg-[#f9fcfa] p-4">
                <p className="mb-1 text-sm text-text/65">Teléfono</p>
                <a
                  href="https://wa.me/573145789702"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:text-primary-light transition-colors"
                >
                  314 578 9702
                </a>
              </div>

              <div className="rounded-xl border border-gray-border bg-[#f9fcfa] p-4">
                <p className="mb-1 text-sm text-text/65">Correo</p>
                <a
                  href="mailto:luisfer_uda@yahoo.com"
                  className="font-medium text-primary hover:text-primary-light transition-colors break-all"
                >
                  luisfer_uda@yahoo.com
                </a>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href="https://wa.me/573145789702"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.06] px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/[0.12]"
              >
                Escribir por WhatsApp
              </a>
              <a
                href="mailto:luisfer_uda@yahoo.com"
                className="inline-flex items-center justify-center rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/[0.05]"
              >
                Enviar correo directo
              </a>
            </div>
          </div>

          {/* Contact form */}
          {submitted ? (
            <div className="flex items-center justify-center rounded-2xl border border-primary/15 bg-white p-8 shadow-[0_16px_36px_rgba(13,20,26,0.08)]">
              <div className="text-center">
                <p className="mb-2 text-xl font-semibold text-primary">
                  Mensaje enviado
                </p>
                <p className="text-text/70">
                  Gracias por contactarnos. Le responderemos pronto.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-primary/12 bg-white p-6 shadow-[0_16px_36px_rgba(13,20,26,0.08)]"
            >
              <p className="mb-1 text-sm text-text/65">Formulario de contacto</p>

              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-text"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-border bg-[#fbfdfb] px-4 py-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                  placeholder="Su nombre"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-text"
                >
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-border bg-[#fbfdfb] px-4 py-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium text-text"
                >
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full resize-none rounded-lg border border-gray-border bg-[#fbfdfb] px-4 py-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                  placeholder="Escriba su mensaje aquí..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary px-8 py-3.5 font-medium text-white shadow-[0_12px_28px_rgba(18,92,40,0.28)] transition-colors hover:bg-primary-light"
              >
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
