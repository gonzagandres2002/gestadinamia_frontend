import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "../../components/PageHeader";
import { Reveal, RevealGroup, RevealItem, Lift } from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Sobre nosotros | Gestadinamia",
  description:
    "Conoce la misión, la visión y el equipo de Gestadinamia: investigadores y clínicos enfocados en la preeclampsia y la salud materno-fetal.",
};

const team = [
  {
    name: "Julio Bueno",
    role: "Director general e investigador principal. Médico, Magíster en Inmunología, Doctor en Ciencias Básicas Biomédicas con énfasis en fisiología de la gestación.",
    tag: "Dirección general",
    photo: "/team/julio_bueno.avif",
  },
  {
    name: "Jesús Velásquez",
    role: "Director clínico. Médico especialista en obstetricia y ginecología, candidato a doctor en medicina clínica.",
    tag: "Dirección clínica",
    photo: "/team/jesus_velasquez.avif",
  },
  {
    name: "Bibiana Saldarriaga",
    role: "Microbióloga y bioanalista de la Universidad de Antioquia.",
    tag: "Laboratorio",
    photo: "/team/bibiana_saldarriaga.avif",
  },
  {
    name: "María Alejandra Pérez",
    role: "Médica general, residente de Ginecología y Obstetricia de la Universidad de Antioquia.",
    tag: "Investigación clínica",
    photo: "/team/Maria_alejandra_perez.avif",
  },
  {
    name: "Sara Ramírez",
    role: "Médica general, residente de Ginecología y Obstetricia de la Corporación Universitaria Remington.",
    tag: "Investigación clínica",
    photo: "/team/sara_ramirez.avif",
  },
  {
    name: "Estefany Hurtado",
    role: "Médica general, residente de Ginecología y Obstetricia de la Corporación Universitaria Remington.",
    tag: "Investigación clínica",
    photo: "/team/estefany_hurtado.avif",
  },
];


export default function SobreNosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre nosotros"
        title="Investigación con propósito clínico"
        intro="Un grupo multidisciplinario que une ciencia básica, práctica clínica y academia para mejorar el diagnóstico y el manejo de la preeclampsia."
      />

      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="rounded-3xl border border-gray-border bg-surface p-8 lg:p-10">
              <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-accent">Nuestra misión</p>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-ink">
                Avanzar en el conocimiento sobre la preeclampsia y su impacto en la salud
                materno-fetal. Identificamos y caracterizamos glicanos terminales y vesículas
                extracelulares trofoblásticas, junto con su relación con la disfunción endotelial,
                para desarrollar herramientas diagnósticas que mejoren la atención de esta condición.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-gray-border bg-surface p-8 lg:p-10">
              <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-accent">Nuestra visión</p>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-ink">
                Ser un referente en la investigación sobre la preeclampsia, transformando el
                conocimiento científico en prácticas clínicas que mejoren la calidad de vida de las
                mujeres embarazadas y sus bebés. Creemos en la colaboración interdisciplinaria y en
                el uso ético de la investigación para generar un impacto positivo en la comunidad.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">Nuestro equipo</p>
            <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink lg:text-5xl">
              Las personas detrás de Gestadinamia
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {team.map((member) => (
              <RevealItem key={member.name}>
                <Lift className="flex h-full flex-col rounded-2xl border border-gray-border bg-surface p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-accent-soft">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold tracking-tight text-ink">{member.name}</p>
                      <p className="text-[12px] uppercase tracking-[0.1em] text-accent">{member.tag}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-[14px] leading-relaxed text-muted">{member.role}</p>
                </Lift>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
