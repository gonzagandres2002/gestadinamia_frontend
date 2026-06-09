import { Reveal, RevealGroup, RevealItem, Lift } from "./Reveal";
import LabCarousel from "./LabCarousel";

const facts = [
  { k: "Línea principal", v: "Preeclampsia y salud fetal" },
  { k: "Modelo de trabajo", v: "Investigación, clínica y academia" },
];

export default function About() {
  return (
    <section id="sobre-nosotros" className="scroll-mt-24 px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
            Sobre nosotros
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="max-w-2xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl">
                Ciencia colaborativa para decisiones clínicas más seguras
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                Somos un equipo multidisciplinario de investigadores enfocados en la salud
                materna y fetal, especialmente en mejorar el diagnóstico y el manejo de
                enfermedades del embarazo como la preeclampsia. El proyecto es liderado por el
                Grupo Reproducción de la Universidad de Antioquia, junto a la Universidad
                Cooperativa de Colombia y la Corporación Universitaria Remington, con el apoyo
                internacional del Hospital Universitario de Jena.
              </p>
            </Reveal>

            <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.1}>
              {facts.map((fact) => (
                <RevealItem key={fact.k}>
                  <Lift className="h-full rounded-2xl border border-gray-border bg-surface px-5 py-5">
                    <p className="text-[12px] uppercase tracking-[0.12em] text-muted">{fact.k}</p>
                    <p className="mt-1.5 text-[15px] font-medium text-ink">{fact.v}</p>
                  </Lift>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal delay={0.1} y={28}>
            <div className="relative w-full">
              <LabCarousel />

              <div className="mx-auto mt-8 grid w-full max-w-md grid-cols-2 gap-4 lg:ml-auto lg:mr-0">
                <div className="rounded-2xl border border-gray-border bg-surface px-5 py-4">
                  <p className="font-mono text-2xl font-semibold text-accent">4+</p>
                  <p className="mt-0.5 text-[13px] text-muted">Instituciones vinculadas</p>
                </div>
                <div className="rounded-2xl border border-gray-border bg-surface px-5 py-4">
                  <p className="font-mono text-2xl font-semibold text-accent">1</p>
                  <p className="mt-0.5 text-[13px] text-muted">Foco clínico prioritario</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
