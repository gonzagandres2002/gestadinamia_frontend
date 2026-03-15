import Image from "next/image";

export default function About() {
  return (
    <section
      id="sobre-nosotros"
      className="scroll-mt-20 py-16 px-6 lg:px-16 bg-gray-light"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center lg:justify-start">
          <Image
            src="/images/about.png"
            alt="Equipo de investigación Gestadinamia"
            width={480}
            height={360}
            className="rounded-2xl object-cover w-full max-w-md"
          />
        </div>
        <div>
          <h2 className="text-3xl lg:text-4xl font-semibold text-primary mb-6">
            Sobre Nosotros
          </h2>
          <p className="text-text/80 leading-relaxed text-lg">
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
        </div>
      </div>
    </section>
  );
}
