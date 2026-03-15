import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 py-14 text-white lg:px-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#07190f_0%,#0a2515_50%,#06140c_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_16%,rgba(32,178,87,0.20),transparent_35%),radial-gradient(circle_at_85%_76%,rgba(18,92,40,0.26),transparent_40%)]"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid grid-cols-1 gap-8 rounded-3xl border border-emerald-100/15 bg-white/[0.03] p-6 backdrop-blur md:grid-cols-[1.2fr_0.8fr] md:gap-10 md:p-8 lg:gap-14">
          <div className="md:pr-8 md:border-r md:border-white/10">
            <a href="#inicio" className="mb-4 inline-flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Gestadinamia logo"
                width={48}
                height={48}
                className="h-12 w-auto brightness-0 invert"
              />
              <span className="text-xl font-semibold tracking-wide text-white">
                Gestadinamia
              </span>
            </a>
            <p className="max-w-md text-sm leading-relaxed text-white/75">
              Investigacion colaborativa para fortalecer el cuidado materno y fetal,
              con enfoque cientifico en preeclampsia y embarazo.
            </p>
          </div>

          <div className="md:pl-2 lg:pl-0">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-emerald-100/90">
              Contacto directo
            </h4>
            <div className="max-w-xs space-y-2 text-sm text-white/80">
              <p>Carrera 62 # 52-59</p>
              <a
                href="mailto:luisfer_uda@yahoo.com"
                className="block transition-colors hover:text-emerald-200"
              >
                luisfer_uda@yahoo.com
              </a>
              <a
                href="https://wa.me/573145789702"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-emerald-200"
              >
                +57 314 578 9702
              </a>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-lg border border-white/20 bg-white/5 p-2.5 text-white/80 transition-colors hover:bg-white/12 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-lg border border-white/20 bg-white/5 p-2.5 text-white/80 transition-colors hover:bg-white/12 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg border border-white/20 bg-white/5 p-2.5 text-white/80 transition-colors hover:bg-white/12 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="rounded-lg border border-white/20 bg-white/5 p-2.5 text-white/80 transition-colors hover:bg-white/12 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-4 text-center text-sm text-white/70">
          Liderado por instituciones academicas comprometidas con la salud materna y fetal.
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-sm text-white/55 md:flex-row">
          <p>© 2026 Gestadinamia. Todos los derechos reservados.</p>
          <a href="#inicio" className="transition-colors hover:text-emerald-200">
            Volver al inicio
          </a>
        </div>
      </div>
    </footer>
  );
}
