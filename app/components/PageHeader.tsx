import { Reveal } from "./Reveal";

export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line px-6 pt-28 pb-14 lg:px-10 lg:pt-36 lg:pb-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_90%_at_88%_-20%,rgba(28,143,62,0.12),transparent_62%)]"
      />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold leading-[1.0] tracking-[-0.035em] text-ink sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{intro}</p>
          )}
        </Reveal>
      </div>
    </header>
  );
}
