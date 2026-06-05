"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Colaboradores", href: "#colaboradores" },
  { label: "Contacto", href: "#contacto" },
];

// Fired on logout so the navbar updates without a full reload (same-tab
// localStorage writes don't emit a native "storage" event).
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
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = useSyncExternalStore(
    subscribeAuth,
    () => !!localStorage.getItem("gestadinamia_token"),
    () => false,
  );

  function handleLogout() {
    localStorage.removeItem("gestadinamia_token");
    localStorage.removeItem("gestadinamia_role");
    window.dispatchEvent(new Event(AUTH_EVENT));
    setMenuOpen(false);
    router.push("/");
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a1f12]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#inicio" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Gestadinamia" width={36} height={36} className="h-9 w-auto" />
          <span className="text-[15px] font-semibold tracking-tight text-white">Gestadinamia</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-[13.5px] font-medium text-white/70 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          ))}

          <div className="mx-3 h-5 w-px bg-white/15" />

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-[13.5px] font-medium text-[#0a1f12] shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:shadow-md active:scale-[0.97]"
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              >
                Dashboard clínico
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full px-3 py-2 text-[13.5px] font-medium text-white/60 transition-colors duration-200 hover:text-white"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-[13.5px] font-medium text-[#0a1f12] shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:shadow-md active:scale-[0.97]"
              style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
            >
              Iniciar sesión
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white md:hidden"
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
        <div className="border-t border-white/10 bg-[#0a1f12]/95 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-white/10 pt-3">
              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg bg-white px-3 py-2.5 text-center font-medium text-[#0a1f12]"
                  >
                    Dashboard clínico
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-lg px-3 py-2.5 text-left font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg bg-white px-3 py-2.5 text-center font-medium text-[#0a1f12]"
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
