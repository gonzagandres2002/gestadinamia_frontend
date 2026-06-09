import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import { Reveal, RevealGroup, RevealItem } from "../../components/Reveal";

export const metadata: Metadata = {
  title: "MAPA | Gestadinamia",
  description:
    "El Monitor Ambulatorio de Presión Arterial registra la presión durante 24 horas mientras la gestante continúa con sus actividades normales. Conoce el proceso paso a paso.",
};

const steps = [
  {
    n: "01",
    title: "Preparación del brazo",
    body: "Se escoge el brazo menos dominante de la paciente para garantizar el menor nivel de interferencia posible durante las actividades del día.",
  },
  {
    n: "02",
    title: "Colocación del brazalete",
    body: "El brazalete se sitúa en la parte superior del brazo y se ajusta de manera firme para asegurar lecturas consistentes a lo largo del día y la noche.",
  },
  {
    n: "03",
    title: "Conexión al monitor",
    body: "El brazalete se conecta al monitor digital portátil, que se sujeta a la cintura o en una bolsa pequeña. Se verifica que la conexión esté segura antes de que la paciente se retire.",
  },
  {
    n: "04",
    title: "Programación del dispositivo",
    body: "El monitor se programa para tomar lecturas automáticas cada 15–30 minutos durante el día y cada 30–60 minutos durante la noche, sin interrumpir el descanso.",
  },
  {
    n: "05",
    title: "Instrucciones a la paciente",
    body: "Durante cada medición, el brazo debe estar relajado y en reposo. La paciente puede continuar con sus actividades normales, evitando mojar el dispositivo.",
  },
  {
    n: "06",
    title: "Retiro y análisis",
    body: "Cumplidas las 24 horas, el equipo se retira. Los datos descargados son interpretados por el equipo médico de Gestadinamia para evaluar el estado cardiovascular.",
  },
];

const stats = [
  { value: "24 h", label: "Registro continuo" },
  { value: "≤30 min", label: "Frecuencia diurna" },
  { value: "≤60 min", label: "Frecuencia nocturna" },
];

export default function MapaPage() {
  return (
    <>
      <PageHeader
        eyebrow="MAPA"
        title="Monitor Ambulatorio de Presión Arterial"
        intro="Un dispositivo portátil que registra la presión arterial a lo largo de 24 horas mientras la gestante continúa con sus actividades normales."
      />

      {/* Photo pair — MAPA installation */}
      <section className="px-6 pb-4 pt-4 lg:px-10 lg:pt-6">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid grid-cols-1 gap-3 overflow-hidden sm:grid-cols-[1.5fr_1fr]">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-auto sm:min-h-[320px]">
                <Image
                  src="/images/que_es_mapa.avif"
                  alt="Instalación del Monitor Ambulatorio de Presión Arterial en el laboratorio de Gestadinamia"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-5 font-mono text-[12px] text-white/85">
                  Colocación del MAPA
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-auto">
                <Image
                  src="/images/chica_mide_presion_arterial.avif"
                  alt="Gestante con monitor de presión arterial instalado durante la jornada"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 38vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-5 font-mono text-[12px] text-white/85">
                  Monitoreo ambulatorio
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What is it — asymmetric 2-col */}
      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:items-start">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-accent">
              ¿Qué es?
            </p>
            <h2 className="mt-5 max-w-lg text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink lg:text-4xl">
              Un diagnóstico más preciso que la medición puntual
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted">
              El MAPA es un examen en el que se coloca un dispositivo digital que registra la
              presión arterial del paciente a lo largo del día y la noche mientras continúa con
              sus actividades normales. Este método permite un diagnóstico más preciso de
              hipertensión arterial, además de ayudar a definir el tratamiento antihipertensivo
              más adecuado según el perfil de cada persona. Para interpretar los resultados, se
              utilizan algoritmos propios y validados.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-gray-border bg-gray-light p-7 lg:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                Parámetros del registro
              </p>
              <div className="mt-6 divide-y divide-line">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between py-4">
                    <span className="text-[15px] text-muted">{s.label}</span>
                    <span className="font-mono text-2xl font-semibold tabular-nums text-ink">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[13px] leading-relaxed text-muted">
                El dispositivo es más pequeño que un teléfono y se porta en la cintura. No limita
                las actividades cotidianas de la gestante.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6-step installation — editorial numbered list */}
      <section className="border-t border-line px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
              Proceso de colocación
            </p>
            <h2 className="mt-6 max-w-xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink lg:text-5xl">
              Seis pasos para 24 horas de datos
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 divide-y divide-line" stagger={0.06}>
            {steps.map((step) => (
              <RevealItem key={step.n}>
                <div className="grid grid-cols-[3rem_1fr] gap-6 py-8 sm:grid-cols-[5rem_1fr] lg:grid-cols-[7rem_1fr] lg:gap-10">
                  <span className="font-mono text-[13px] font-semibold text-accent pt-0.5">
                    {step.n}
                  </span>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_2fr] sm:gap-8 lg:gap-16 lg:items-baseline">
                    <h3 className="text-[17px] font-semibold tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-muted">{step.body}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* After-24h callout */}
      <section className="border-t border-line px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-accent">
                  ¿Qué sucede después?
                </p>
                <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink lg:text-4xl">
                  Los datos cuentan la historia completa
                </h2>
              </div>
              <p className="text-pretty text-lg leading-relaxed text-muted">
                Al completar las 24 horas, el equipo se retira y los datos son interpretados por
                el equipo médico de Gestadinamia. Esta información permite evaluar el estado
                cardiovascular de la gestante y tomar decisiones clínicas a tiempo. Herramientas
                como el MAPA son fundamentales para entender el embarazo de forma dinámica y
                profunda.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-[#0a1f12] px-8 py-12 lg:px-14 lg:py-16">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(65%_110%_at_80%_10%,rgba(28,143,62,0.22),transparent_60%)]"
              />
              <h2 className="max-w-xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.025em] text-white lg:text-4xl">
                El MAPA forma parte del protocolo de Gestadinamia
              </h2>
              <p className="mt-4 max-w-lg text-pretty text-lg leading-relaxed text-white/75">
                Si participas en el estudio, el equipo realizará la instalación durante tu visita
                de seguimiento, sin necesidad de hospitalización.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/participa"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-[#0a1f12] transition-transform duration-300 active:scale-[0.98]"
                  style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                >
                  Participa en el estudio
                </Link>
                <Link
                  href="/investigacion"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/[0.06] px-7 py-3.5 text-[15px] font-medium text-white backdrop-blur transition-colors duration-300 hover:bg-white/[0.14]"
                >
                  Ver la investigación
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
