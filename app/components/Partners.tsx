import Image from "next/image";

const nationalPartners = [
  { name: "Universidad de Antioquia", src: "/images/partners/udea.png" },
  {
    name: "Universidad Cooperativa de Colombia",
    src: "/images/partners/cooperativa.png",
  },
  {
    name: "Corporación Universitaria Remington",
    src: "/images/partners/remington.png",
  },
  { name: "SICOR", src: "/images/partners/sicor.png" },
  { name: "Grupo Reproducción", src: "/images/partners/reproduccion.png" },
];

const internationalPartners = [
  {
    name: "Hospital Universitario de Jena",
    src: "/images/partners/jena.png",
  },
  { name: "Universidad del Bío-Bío", src: "/images/partners/biobio.png" },
];

export default function Partners() {
  return (
    <section
      id="colaboradores"
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
            Colaboradores
          </p>
          <span className="h-px w-12 bg-primary/40" />
        </div>

        <h2 className="mx-auto mb-4 max-w-3xl text-center text-3xl font-semibold leading-[1.1] text-text lg:text-5xl">
          Red nacional e internacional para fortalecer la investigacion
        </h2>
        <p className="mx-auto mb-10 max-w-3xl text-center text-base text-text/75 sm:text-lg">
          Trabajamos con instituciones academicas y clinicas que aportan
          conocimiento, infraestructura y experiencia para avanzar en salud
          materna y fetal.
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-primary/12 bg-white p-6 shadow-[0_14px_34px_rgba(13,20,26,0.08)]">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-primary">Colaboradores Nacionales</h3>
              <span className="rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-xs font-medium text-primary">
                {nationalPartners.length} aliados
              </span>
            </div>

            <p className="mb-6 text-sm text-text/70">
              Grupo Reproduccion de la Universidad de Antioquia, junto a instituciones nacionales aliadas.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {nationalPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="group flex min-h-28 items-center justify-center rounded-xl border border-gray-border bg-white p-3"
                >
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={150}
                    height={72}
                    className="h-16 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-110 sm:h-20 lg:h-24"
                  />
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-primary/12 bg-white p-6 shadow-[0_14px_34px_rgba(13,20,26,0.08)]">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-primary">Colaboradores Internacionales</h3>
              <span className="rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-xs font-medium text-primary">
                {internationalPartners.length} aliados
              </span>
            </div>

            <p className="mb-6 text-sm text-text/70">
              Apoyo internacional de instituciones con trayectoria en investigacion aplicada.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {internationalPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="group flex min-h-28 items-center justify-center rounded-xl border border-gray-border bg-white p-3"
                >
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={160}
                    height={78}
                    className="h-16 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-110 sm:h-20 lg:h-24"
                  />
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
