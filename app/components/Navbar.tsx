"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
  { label: "Investigación", href: "/investigacion" },
  { label: "Blog", href: "/blog" },
  { label: "Participa", href: "/participa" },
];

const AUTH_EVENT = "gestadinamia-auth-change";

function subscribeAuth(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = useSyncExternalStore(
    subscribeAuth,
    () => !!localStorage.getItem("gestadinamia_token"),
    () => false,
  );

  // The home hero is dark, so the bar floats transparent there; every other
  // page is light, so the bar turns solid for legibility.
  const onHero = pathname === "/";

  function handleLogout() {
    localStorage.removeItem("gestadinamia_token");
    localStorage.removeItem("gestadinamia_role");
    window.dispatchEvent(new Event(AUTH_EVENT));
    setMenuOpen(false);
    router.push("/");
  }

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl ${
        onHero ? "border-white/10 bg-[#0a1f12]/70" : "border-gray-border bg-surface/85"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Gestadinamia" width={36} height={36} className="h-9 w-auto" />
          <span className={`text-[15px] font-semibold tracking-tight ${onHero ? "text-white" : "text-ink"}`}>
            Gestadinamia
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-200 ${
                  onHero
                    ? active
                      ? "text-white"
                      : "text-white/65 hover:text-white"
                    : active
                      ? "text-ink"
                      : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className={`mx-3 h-5 w-px ${onHero ? "bg-white/15" : "bg-gray-border"}`} />

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <CtaLink href="/dashboard" onHero={onHero}>
                Dashboard clínico
              </CtaLink>
              <button
                onClick={handleLogout}
                className={`rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors duration-200 ${
                  onHero ? "text-white/60 hover:text-white" : "text-muted hover:text-ink"
                }`}
              >
                Salir
              </button>
            </div>
          ) : (
            <CtaLink href="/login" onHero={onHero}>
              Iniciar sesión
            </CtaLink>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border md:hidden ${
            onHero ? "border-white/15 bg-white/5 text-white" : "border-gray-border bg-surface text-ink"
          }`}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
            {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={`border-t backdrop-blur-xl md:hidden ${
            onHero ? "border-white/10 bg-[#0a1f12]/95" : "border-gray-border bg-surface/95"
          }`}
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 font-medium transition-colors ${
                    onHero
                      ? "text-white/80 hover:bg-white/5 hover:text-white"
                      : "text-muted hover:bg-gray-light hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className={`mt-2 border-t pt-3 ${onHero ? "border-white/10" : "border-gray-border"}`}>
              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg bg-primary px-3 py-2.5 text-center font-medium text-white"
                  >
                    Dashboard clínico
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`block w-full rounded-lg px-3 py-2.5 text-left font-medium transition-colors ${
                      onHero ? "text-white/60 hover:bg-white/5 hover:text-white" : "text-muted hover:bg-gray-light hover:text-ink"
                    }`}
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg bg-primary px-3 py-2.5 text-center font-medium text-white"
                >
                  Iniciar sesión
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

function CtaLink({ href, onHero, children }: { href: string; onHero: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-[13.5px] font-medium shadow-sm transition-[transform,box-shadow,background-color] duration-300 ease-out hover:shadow-md active:scale-[0.97] ${
        onHero ? "bg-white text-[#0a1f12]" : "bg-primary text-white hover:bg-primary-light"
      }`}
      style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
    >
      {children}
    </Link>
  );
}
