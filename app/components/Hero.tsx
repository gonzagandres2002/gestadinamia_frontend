import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="scroll-mt-20 pt-28 pb-16 px-6 lg:px-16"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl lg:text-7xl font-semibold text-primary mb-6">
            Gestadinamia
          </h1>
          <p className="text-lg text-text/80 leading-relaxed mb-8 max-w-lg">
            Nuestro compromiso es avanzar en la salud materna a través de la
            investigación y el conocimiento. Únete a nosotros en esta misión
            para un futuro más saludable.
          </p>
          <a
            href="#sobre-nosotros"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium"
          >
            Conócenos
          </a>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/images/hero.png"
            alt="Investigación en salud materna"
            width={560}
            height={400}
            className="rounded-2xl object-cover w-full max-w-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
