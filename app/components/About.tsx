import Image from "next/image";

export default function About() {
  return (
    <section
      id="sobre-nosotros"
      className="scroll-mt-20 relative overflow-hidden py-20 px-6 lg:px-16"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#ffffff_0%,#f3f9f5_55%,#ffffff_100%)]"
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-primary/40" />
          <p className="text-sm uppercase tracking-[0.16em] text-primary/80">
            Sobre Nosotros
          </p>
          <span className="h-px w-12 bg-primary/40" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="mb-6 max-w-2xl text-3xl font-semibold leading-[1.1] text-text lg:text-5xl">
              Ciencia colaborativa para decisiones clínicas más seguras
            </h2>

            <p className="mb-8 max-w-2xl text-base leading-relaxed text-text/80 sm:text-lg">
            Somos un equipo{" "}
            <strong className="text-text">multidisciplinario</strong> de
            investigadores comprometidos con la{" "}
            <strong className="text-text">salud materna y fetal</strong>,
            especialmente enfocados en{" "}
            <strong className="text-text">
              mejorar el diagnóstico y manejo de enfermedades
            </strong>{" "}
            durante el <strong className="text-text">embarazo</strong>, como la
            preeclampsia. Este proyecto de investigación es liderado por el Grupo
            Reproducción de la Universidad de Antioquia, en colaboración con
            destacados <strong className="text-text">expertos</strong> de la
            Universidad Cooperativa de Colombia y la Corporación Universitaria
            Remington. Además con el apoyo{" "}
            <strong className="text-text">internacional</strong> del{" "}
            <strong className="text-text">Hospital Universitario de Jena</strong>
            .
          </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 border-primary bg-white p-4 shadow-sm">
                <p className="mb-1 text-sm text-text/65">Línea principal</p>
                <p className="text-sm font-semibold text-primary">Preeclampsia y salud fetal</p>
              </div>
              <div className="rounded-xl border-l-4 border-primary bg-white p-4 shadow-sm">
                <p className="mb-1 text-sm text-text/65">Modelo de trabajo</p>
                <p className="text-sm font-semibold text-primary">Investigación + clínica + academia</p>
              </div>
            </div>
          </div>

          <div className="relative flex items-start justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-3 -z-10 rounded-3xl border border-primary/15 bg-white/60" />

              <Image
                src="/images/about.png"
                alt="Equipo de investigación Gestadinamia"
                width={540}
                height={420}
                className="w-full rounded-3xl border border-white/80 object-cover shadow-[0_20px_46px_rgba(13,20,26,0.14)]"
              />

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-gray-border bg-white p-3 text-center">
                  <p className="text-xl font-semibold text-primary">4+</p>
                  <p className="text-xs text-text/70">Instituciones vinculadas</p>
                </div>
                <div className="rounded-xl border border-gray-border bg-white p-3 text-center">
                  <p className="text-xl font-semibold text-primary">1</p>
                  <p className="text-xs text-text/70">Foco clínico prioritario</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
