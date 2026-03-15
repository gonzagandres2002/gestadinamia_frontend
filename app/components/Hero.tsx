export default function Hero() {
  return (
    <section
      id="inicio"
      className="scroll-mt-20 relative isolate overflow-hidden px-6 pt-28 pb-20 lg:px-16"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[url('/images/hero.png')] bg-cover bg-center bg-fixed"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(3,10,16,0.70)_0%,rgba(7,16,24,0.62)_45%,rgba(8,20,12,0.72)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(28,143,62,0.24),transparent_45%),radial-gradient(circle_at_82%_18%,rgba(18,92,40,0.24),transparent_40%)]"
      />

      <div className="mx-auto flex min-h-[78vh] max-w-4xl flex-col items-center justify-center text-center">
        <span className="mb-6 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white/95 backdrop-blur">
          Investigacion en salud materna y fetal
        </span>

        <h1 className="mb-6 text-4xl font-semibold leading-[1.04] text-white sm:text-5xl lg:text-7xl">
          Gestadinamia
          <span className="block text-emerald-200/95">ciencia aplicada al embarazo</span>
        </h1>

        <p className="mb-9 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          Somos un equipo multidisciplinario comprometido con mejorar el
          diagnostico y manejo de enfermedades durante el embarazo, con foco
          especial en preeclampsia y trastornos hipertensivos asociados.
        </p>

        <div className="mb-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#sobre-nosotros"
            className="inline-flex w-full max-w-xs items-center justify-center rounded-xl border border-emerald-200/35 bg-primary px-8 py-3.5 font-medium text-white shadow-[0_14px_30px_rgba(5,18,10,0.45)] transition-colors hover:bg-primary-light sm:w-auto"
          >
            Conocenos
          </a>
          <a
            href="#contacto"
            className="inline-flex w-full max-w-xs items-center justify-center rounded-xl border border-white/35 bg-white/10 px-8 py-3.5 font-medium text-white backdrop-blur transition-colors hover:bg-white/20 sm:w-auto"
          >
            Contacto
          </a>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">
            <p className="mb-1 text-sm text-white/70">Lidera</p>
            <p className="text-sm font-semibold text-emerald-100">U. de Antioquia</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">
            <p className="mb-1 text-sm text-white/70">Colaboran</p>
            <p className="text-sm font-semibold text-emerald-100">UCC y Remington</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">
            <p className="mb-1 text-sm text-white/70">Apoyo internacional</p>
            <p className="text-sm font-semibold text-emerald-100">Hospital de Jena</p>
          </div>
        </div>
      </div>
    </section>
  );
}
