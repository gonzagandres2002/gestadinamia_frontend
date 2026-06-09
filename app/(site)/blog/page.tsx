import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import { RevealGroup, RevealItem, Lift } from "../../components/Reveal";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Blog | Gestadinamia",
  description:
    "Actualizaciones sobre Gestadinamia: preeclampsia, hábitos durante el embarazo, el MAPA y los cambios de la gestación.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Actualizaciones sobre Gestadinamia"
        intro="Información clara y basada en evidencia sobre el embarazo, la preeclampsia y el cuidado materno-fetal."
      />

      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <RevealGroup className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2" stagger={0.08}>
          {posts.map((post) => (
            <RevealItem key={post.slug}>
              <Lift className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-border bg-surface transition-colors hover:border-accent/40"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7 lg:p-8">
                    <div className="flex items-center gap-2 font-mono text-[12px] text-muted">
                      <time dateTime={post.dateISO}>{post.dateLabel}</time>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="mt-4 text-balance text-2xl font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-pretty text-[15px] leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
                      Leer artículo
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Lift>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
