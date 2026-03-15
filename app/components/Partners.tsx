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
    <section id="colaboradores" className="scroll-mt-20 py-16 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* National */}
        <h2 className="text-3xl lg:text-4xl font-semibold text-primary mb-4 text-center">
          Colaboradores Nacionales
        </h2>
        <p className="text-center text-text/70 mb-10 max-w-2xl mx-auto">
          Grupo Reproducción de la Universidad de Antioquia, en colaboración con
          destacadas instituciones nacionales.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center mb-16">
          {nationalPartners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center p-4"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={160}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* International */}
        <h2 className="text-3xl lg:text-4xl font-semibold text-primary mb-4 text-center">
          Colaboradores Internacionales
        </h2>
        <p className="text-center text-text/70 mb-10 max-w-2xl mx-auto">
          Apoyo internacional de instituciones de excelencia en investigación.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-lg mx-auto">
          {internationalPartners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center p-4"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={160}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
