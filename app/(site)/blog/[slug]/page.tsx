import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "../../../components/Reveal";
import { posts, getPost } from "../posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Artículo no encontrado | Gestadinamia" };
  return {
    title: `${post.title} | Gestadinamia`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line px-6 pt-28 pb-12 lg:px-10 lg:pt-36 lg:pb-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_90%_at_88%_-20%,rgba(28,143,62,0.12),transparent_62%)]"
        />
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-ink">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              Blog
            </Link>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-5 flex items-center gap-2 font-mono text-[13px] text-muted">
              <time dateTime={post.dateISO}>{post.dateLabel}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl">
          {post.videoId && (
            <Reveal>
              <div className="mb-14">
                <p className="mb-5 text-[12px] font-medium uppercase tracking-[0.16em] text-accent">
                  Ver en video
                </p>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-light shadow-[0_4px_32px_rgba(0,0,0,0.07)]">
                  <iframe
                    src={`https://www.youtube.com/embed/${post.videoId}`}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="space-y-10">
              {post.sections.map((section, i) => (
                <section key={i}>
                  {section.heading && (
                    <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">{section.heading}</h2>
                  )}
                  {section.paragraphs?.map((p, j) => (
                    <p key={j} className={`text-pretty text-[17px] leading-[1.75] text-muted ${section.heading || j > 0 ? "mt-5" : ""}`}>
                      {p}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mt-5 space-y-2.5">
                      {section.list.map((item, k) => (
                        <li key={k} className="flex gap-3 text-[17px] leading-[1.6] text-muted">
                          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-14 border-t border-line pt-10">
              <p className="text-[15px] text-muted">
                En Gestadinamia acompañamos cada etapa del embarazo con evidencia científica.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/participa"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-[14.5px] font-medium text-white transition-[transform,background-color] duration-300 hover:bg-primary-light active:scale-[0.98]"
                  style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                >
                  Participa en el estudio
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-full border border-gray-border bg-surface px-6 py-3 text-[14.5px] font-medium text-ink transition-colors hover:bg-gray-light"
                >
                  Ver más artículos
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
