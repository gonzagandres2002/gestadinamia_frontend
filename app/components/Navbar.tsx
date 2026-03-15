"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Colaboradores", href: "#colaboradores" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-emerald-200/20 bg-[#0b2f1a]/82 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5">
        <a href="#inicio" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Gestadinamia logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="hidden text-lg font-semibold text-white sm:inline">
            Gestadinamia
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          <ul className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2 py-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/12 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full border border-emerald-200/40 bg-emerald-300/15 px-4 py-2 text-sm font-medium text-emerald-100 transition-colors hover:bg-emerald-300/25"
          >
            Iniciar sesion
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 rounded-lg border border-white/20 bg-white/10 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/15 bg-[#0b2f1a]/95 md:hidden">
          <ul className="flex flex-col gap-2 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-1">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg border border-emerald-200/35 bg-emerald-300/15 px-3 py-2 font-medium text-emerald-100 transition-colors hover:bg-emerald-300/25"
              >
                Iniciar sesion
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
