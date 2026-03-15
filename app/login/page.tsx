"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-10 lg:px-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[url('/images/hero.png')] bg-cover bg-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(3,10,16,0.78)_0%,rgba(7,16,24,0.72)_45%,rgba(8,20,12,0.82)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(28,143,62,0.24),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(18,92,40,0.26),transparent_38%)]"
      />

      <div className="mx-auto flex min-h-[88vh] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full grid-cols-1 gap-8 rounded-3xl border border-white/20 bg-white/8 p-5 backdrop-blur-xl lg:grid-cols-2 lg:p-8">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-8">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-3 text-white/85 transition-colors hover:text-white"
            >
              <Image
                src="/images/logo.png"
                alt="Gestadinamia logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-lg font-semibold">Gestadinamia</span>
            </Link>

            <p className="mb-3 text-sm uppercase tracking-[0.14em] text-emerald-200/85">
              Acceso de investigadores
            </p>
            <h1 className="mb-4 text-3xl font-semibold leading-tight text-white lg:text-4xl">
              Bienvenido de nuevo
            </h1>
            <p className="max-w-md text-white/75">
              Inicie sesion para continuar con el panel del proyecto,
              consultar avances y gestionar informacion de colaboracion.
            </p>

            <div className="mt-8 rounded-xl border border-white/15 bg-white/[0.04] p-4 text-sm text-white/75">
              Si aun no tiene acceso, escribanos a
              <a
                href="mailto:luisfer_uda@yahoo.com"
                className="ml-1 font-medium text-emerald-200 hover:text-emerald-100"
              >
                luisfer_uda@yahoo.com
              </a>
              .
            </div>
          </section>

          <section className="rounded-2xl border border-white/15 bg-white/95 p-6 shadow-[0_20px_40px_rgba(7,16,24,0.36)] lg:p-8">
            {submitted ? (
              <div className="flex min-h-[360px] items-center justify-center">
                <div className="text-center">
                  <p className="mb-2 text-2xl font-semibold text-primary">
                    Sesion iniciada
                  </p>
                  <p className="text-text/70">
                    Esta demo no esta conectada a backend aun.
                  </p>
                  <Link
                    href="/"
                    className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 font-medium text-white transition-colors hover:bg-primary-light"
                  >
                    Volver al inicio
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-text">
                    Correo institucional
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="usuario@institucion.edu"
                    className="w-full rounded-lg border border-gray-border bg-white px-4 py-3 text-text transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-1 block text-sm font-medium text-text">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="********"
                    className="w-full rounded-lg border border-gray-border bg-white px-4 py-3 text-text transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="flex items-center justify-between pt-1 text-sm">
                  <label className="inline-flex items-center gap-2 text-text/75">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-border" />
                    Recordarme
                  </label>
                  <a href="#" className="text-primary hover:text-primary-light">
                    Olvide mi contraseña
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary px-6 py-3.5 font-medium text-white shadow-[0_12px_30px_rgba(18,92,40,0.3)] transition-colors hover:bg-primary-light"
                >
                  Iniciar sesion
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
