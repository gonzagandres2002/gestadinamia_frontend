import Image from "next/image";
import { Reveal, RevealGroup, RevealItem, Lift } from "./Reveal";

const nationalPartners = [
  { name: "Universidad de Antioquia", src: "/images/partners/udea.png" },
  { name: "Universidad Cooperativa de Colombia", src: "/images/partners/cooperativa.png" },
  { name: "Corporación Universitaria Remington", src: "/images/partners/remington.png" },
  { name: "SICOR", src: "/images/partners/sicor.png" },
  { name: "Grupo Reproducción", src: "/images/partners/reproduccion.png" },
];

const internationalPartners = [
  { name: "Hospital Universitario de Jena", src: "/images/partners/jena.png" },
  { name: "Universidad del Bío-Bío", src: "/images/partners/biobio.png" },
];

function LogoCell({ name, src }: { name: string; src: string }) {
  return (
    <RevealItem>
      <Lift amount={-4} className="flex min-h-28 items-center justify-center rounded-2xl border border-gray-border bg-surface p-5">
        <Image
          src={src}
          alt={name}
          width={160}
          height={78}
          className="h-14 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-16"
          style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
        />
      </Lift>
    </RevealItem>
  );
}

export default function Partners() {
  return (
    <section id="colaboradores" className="scroll-mt-24 border-t border-line px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">Colaboradores</p>
          <h2 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl">
            Una red nacional e internacional que sostiene la investigación
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            Trabajamos con instituciones académicas y clínicas que aportan conocimiento,
            infraestructura y experiencia en salud materna y fetal.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="text-[15px] font-semibold tracking-tight text-ink">Nacionales</h3>
                <span className="font-mono text-[13px] text-muted">{nationalPartners.length} aliados</span>
              </div>
            </Reveal>
            <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3" stagger={0.06}>
              {nationalPartners.map((p) => (
                <LogoCell key={p.name} {...p} />
              ))}
            </RevealGroup>
          </div>

          <div>
            <Reveal>
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="text-[15px] font-semibold tracking-tight text-ink">Internacionales</h3>
                <span className="font-mono text-[13px] text-muted">{internationalPartners.length} aliados</span>
              </div>
            </Reveal>
            <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.06}>
              {internationalPartners.map((p) => (
                <LogoCell key={p.name} {...p} />
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
