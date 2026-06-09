import type { Metadata } from "next";
import PageHeader from "../../components/PageHeader";
import Contact from "../../components/Contact";
import { RevealGroup, RevealItem } from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Participa | Gestadinamia",
  description:
    "Súmate a la investigación de Gestadinamia sobre marcadores para el diagnóstico de la preeclampsia. Escríbenos para conocer cómo participar.",
};

const expectations = [
  { n: "01", text: "Una muestra de sangre entre la semana 12 y 15 de gestación." },
  { n: "02", text: "Colocación del MAPA para 24 horas de monitoreo de presión arterial." },
  { n: "03", text: "Muestras de orina cada 15 días y donación de placenta en la cesárea." },
];

export default function ParticipaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Participa"
        title="Súmate a la investigación"
        intro="Te invitamos a participar en un estudio que busca determinar marcadores para el diagnóstico de enfermedades del embarazo, en particular de la preeclampsia."
      />

      <section className="px-6 pt-20 lg:px-10 lg:pt-24">
        <div className="mx-auto max-w-6xl">
          <RevealGroup className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-gray-border bg-gray-border sm:grid-cols-3" stagger={0.08}>
            {expectations.map((e) => (
              <RevealItem key={e.n} className="bg-surface">
                <div className="h-full p-7">
                  <span className="font-mono text-sm font-semibold text-accent">{e.n}</span>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink">{e.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Contact />
    </>
  );
}
