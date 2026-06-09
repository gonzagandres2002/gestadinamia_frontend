import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import { Reveal, RevealGroup, RevealItem } from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Investigación | Gestadinamia",
  description:
    "Participa en nuestro estudio sobre el diagnóstico de enfermedades del embarazo, centrado en marcadores para la preeclampsia y su impacto en la salud materno-fetal.",
};

const steps = [
  {
    n: "01",
    title: "Muestra de sangre",
    body: "Entre la semana 12 y 15 de gestación se toma una muestra de 30 mL con una única punción (tres tubos de tapa morada y dos tubos secos).",
  },
  {
    n: "02",
    title: "Colocación del MAPA",
    body: "Se instala el Monitor Ambulatorio de Presión Arterial para registrar el comportamiento cardiovascular a lo largo de 24 horas.",
  },
  {
    n: "03",
    title: "Orina y placenta",
    body: "La muestra de orina se toma cada 15 días. La placenta, donada por usted, se obtiene de forma rutinaria durante la cesárea.",
  },
  {
    n: "04",
    title: "Análisis de laboratorio",
    body: "Estudiamos glicanos y microvesículas, proteínas en orina, productos de inflamación en suero, y la expresión génica de la placenta en cultivo.",
  },
];

export default function InvestigacionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Investigación"
        title="Marcadores para diagnosticar la preeclampsia"
        intro="Buscamos determinar la presencia de marcadores para el diagnóstico de enfermedades del embarazo, en particular de la preeclampsia, y su relación con la salud del feto."
      />

      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-accent">Sobre la preeclampsia</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink lg:text-4xl">
              Una condición que se relaciona con la placenta
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted">
              La preeclampsia afecta a las gestantes con un aumento de la presión arterial y se
              relaciona con la placenta, órgano clave para el mantenimiento del feto. Detectarla a
              tiempo es determinante para la salud de la madre y del bebé.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-accent">Tu contribución</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink lg:text-4xl">
              Lo que estudiamos en tus muestras
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted">
              En las muestras que donas determinamos unas moléculas llamadas glicanos, asociadas con
              la placenta, y evaluamos si hay diferencias en sus cantidades en sangre, orina y
              placenta entre una gestación sana y una con preeclampsia.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Photo pair — lab + placenta */}
      <section className="px-6 pb-4 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid grid-cols-1 gap-3 overflow-hidden sm:grid-cols-[1.6fr_1fr]">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-auto sm:min-h-[320px]">
                <Image
                  src="/images/laboratiorio.jpeg"
                  alt="Equipo de Gestadinamia en el laboratorio de reproducción"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-5 font-mono text-[12px] text-white/85">
                  Laboratorio de reproducción
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-auto">
                <Image
                  src="/images/placenta.avif"
                  alt="Muestra de placenta para análisis de glicanos y microvesículas"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 38vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-5 font-mono text-[12px] text-white/85">
                  Análisis de placenta
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">Cómo funciona</p>
            <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink lg:text-5xl">
              El proceso, paso a paso
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-gray-border bg-gray-border sm:grid-cols-2" stagger={0.08}>
            {steps.map((step) => (
              <RevealItem key={step.n} className="bg-surface">
                <div className="h-full p-7 lg:p-8">
                  <span className="font-mono text-sm font-semibold text-accent">{step.n}</span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="border-t border-line px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 overflow-hidden rounded-3xl border border-gray-border bg-gray-light lg:grid-cols-[1fr_1fr] lg:gap-0">
              {/* Text side */}
              <div className="p-8 lg:p-12">
                <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-accent">¿Qué es el MAPA?</p>
                <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink lg:text-4xl">
                  24 horas de presión arterial, en detalle
                </h2>
                <p className="mt-5 text-pretty text-[17px] leading-relaxed text-muted">
                  El Monitor Ambulatorio de Presión Arterial es un dispositivo portátil, más pequeño
                  que un teléfono, que mide la presión de forma automática durante 24 horas, incluso
                  mientras duermes. Esto nos da una visión completa del comportamiento cardiovascular
                  durante la gestación y permite tomar decisiones clínicas a tiempo.
                </p>
                <Link
                  href="/mapa"
                  className="mt-7 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent transition-colors hover:text-accent-strong"
                >
                  Ver el proceso completo
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>

              {/* Photo pair — asymmetric offset grid */}
              <div className="grid grid-cols-2 gap-3 p-4 lg:p-6 lg:items-start">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src="/images/que_es_mapa.avif"
                    alt="Instalación del Monitor Ambulatorio de Presión Arterial"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-[3/4] mt-8 overflow-hidden rounded-xl lg:mt-12">
                  <Image
                    src="/images/chica_mide_presion_arterial.avif"
                    alt="Gestante con monitor de presión arterial instalado"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function CtaBand() {
  return (
    <section className="px-6 pb-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[#0a1f12] px-8 py-12 lg:px-14 lg:py-16">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(70%_120%_at_85%_10%,rgba(28,143,62,0.22),transparent_60%)]"
            />
            <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.025em] text-white lg:text-4xl">
              ¿Quieres formar parte del estudio?
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-white/75">
              Conoce los beneficios de participar y escríbenos para resolver cualquier duda.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/participa"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-[#0a1f12] transition-transform duration-300 active:scale-[0.98]"
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              >
                Participa
              </Link>
              <Link
                href="/beneficios"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/[0.06] px-7 py-3.5 text-[15px] font-medium text-white backdrop-blur transition-colors duration-300 hover:bg-white/[0.14]"
              >
                Ver beneficios
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
