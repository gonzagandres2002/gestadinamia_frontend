import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import { Reveal, RevealGroup, RevealItem, Lift } from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Beneficios de participar | Gestadinamia",
  description:
    "Seguimiento de la gestación, valoración renal y cardiovascular, y acompañamiento profesional: conoce los beneficios de participar en la investigación de Gestadinamia.",
};

const benefits = [
  {
    title: "Seguimiento de tu gestación",
    body: "Tomas seriadas de muestra de orina y citoquímicos que permiten valorar la condición del riñón y las vías urinarias a lo largo del embarazo.",
  },
  {
    title: "Valoración cardiovascular",
    body: "Te proporcionamos datos de tu condición cardiovascular, útiles para el estudio y también para detectar a tiempo algún riesgo potencial.",
  },
  {
    title: "Acompañamiento profesional",
    body: "Toda la información y asesoría es entregada por los miembros del proyecto, con quienes podrás estar en contacto durante el proceso.",
  },
  {
    title: "Confidencialidad garantizada",
    body: "Solo los investigadores sabrán que participas. Los datos se publican en artículos nacionales e internacionales protegiendo siempre tu identidad.",
  },
];

export default function BeneficiosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Beneficios"
        title="Lo que recibes al participar"
        intro="Participar aporta a la ciencia y, al mismo tiempo, te ofrece un seguimiento cercano de tu salud durante el embarazo."
      />

      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.08}>
            {benefits.map((b) => (
              <RevealItem key={b.title}>
                <Lift className="h-full rounded-2xl border border-gray-border bg-surface p-7 lg:p-8">
                  <h3 className="text-xl font-semibold tracking-tight text-ink">{b.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{b.body}</p>
                </Lift>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.05}>
            <div className="mt-8 rounded-2xl border border-accent/25 bg-accent-soft p-7 lg:p-8">
              <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-accent-strong">Información importante</p>
              <p className="mt-4 text-pretty text-[15px] leading-relaxed text-ink">
                La toma de la muestra de sangre representa solo un riesgo mínimo de infección o
                hemorragia superficial en el sitio del pinchazo, y no implica ningún riesgo para tu
                embarazo. El equipo investigador supervisa cualquier reacción posterior, dentro de
                los procedimientos de rutina de las unidades de atención adscritas al proyecto. No
                existe un método alternativo más seguro para obtener las muestras de sangre, orina y
                placenta que el que te proponemos.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-accent">Responsabilidades del paciente</p>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
              Aceptar participar en la investigación y donar las muestras descritas en el proceso del
              estudio, manteniendo el seguimiento programado durante la gestación.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-accent">Responsabilidades del investigador</p>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
              Guardar la confidencialidad de tus datos y aclarar la situación de la investigación y
              del investigador frente a las entidades de salud y las instancias legales pertinentes.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          <Reveal>
            <Link
              href="/participa"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_12px_30px_-10px_rgba(20,98,43,0.5)] transition-[transform,background-color] duration-300 hover:bg-primary-light active:scale-[0.98]"
              style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
            >
              Quiero participar
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
