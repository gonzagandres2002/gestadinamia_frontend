"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { logout } from "../dashboard/lib/api";

// ── Auth state (SSR-safe read of localStorage) ────────────────────────────────

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

/** Reads a localStorage key reactively. Returns null on the server. */
function useStoredValue(key: string): string | null {
  return useSyncExternalStore(
    subscribeStorage,
    () => localStorage.getItem(key),
    () => null,
  );
}

// ── Navigation model ──────────────────────────────────────────────────────────

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

interface NavGroup {
  label?: string;
  items: NavItem[];
}

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const NAV: NavGroup[] = [
  {
    label: "Análisis descriptivo",
    items: [
      {
        href: "/dashboard",
        label: "Panel clínico de seguimiento prenatal",
        icon: (
          <svg {...iconProps} aria-hidden="true">
            <path d="M4 13h3l2 4 3-10 2 6h6" />
          </svg>
        ),
      },
      {
        href: "/dashboard/cohorte",
        label: "Vista descriptiva de la cohorte",
        icon: (
          <svg {...iconProps} aria-hidden="true">
            <path d="M5 21V10M12 21V4M19 21v-7" />
            <path d="M3 21h18" />
          </svg>
        ),
      },
    ],
  },
  {
    items: [
      {
        href: "/predict",
        label: "Calculadora ML",
        icon: (
          <svg {...iconProps} aria-hidden="true">
            <rect x="5" y="5" width="14" height="14" rx="2" />
            <path d="M9 9h6v6H9zM9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
          </svg>
        ),
      },
    ],
  },
];

// ── Shell ─────────────────────────────────────────────────────────────────────

export default function AppShell({
  children,
  footer,
}: {
  children: ReactNode;
  footer: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useStoredValue("gestadinamia_token");
  const role = useStoredValue("gestadinamia_role");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Redirect unauthenticated visitors. Runs on the client once the store resolves.
  useEffect(() => {
    if (token === null) router.replace("/login");
  }, [token, router]);

  // Close the mobile drawer on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  if (token === null) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          Cargando panel clínico…
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-slate-50 font-sans text-slate-900">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-strong focus:shadow-md focus:ring-2 focus:ring-accent"
      >
        Saltar al contenido
      </a>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-out lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2.5 border-b border-slate-200 px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="Gestadinamia" width={32} height={32} className="h-8 w-auto" />
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-accent-strong">Gestadinamia</span>
              <span className="block text-[11px] uppercase tracking-wider text-slate-500">
                Panel clínico
              </span>
            </span>
          </Link>
        </div>

        <nav aria-label="Navegación principal" className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {NAV.map((group, gi) => (
            <div key={group.label ?? `group-${gi}`} className="space-y-1">
              {group.label && (
                <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {group.label}
                </p>
              )}
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 ${
                      active
                        ? "bg-accent-soft font-medium text-accent-strong"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className={active ? "text-accent" : "text-slate-400 group-hover:text-slate-600"}>
                      {item.icon}
                    </span>
                    <span className="leading-snug">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-200 px-5 py-4 font-mono text-[11px] text-slate-500">
          Cohorte de 218 gestantes
        </div>
      </aside>

      {/* Content column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
            className="-ml-1 rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <div className="ml-auto flex items-center gap-3 text-sm">
            {role && (
              <span className="hidden text-xs text-slate-500 sm:inline">
                Rol: <span className="font-medium text-slate-700">{role}</span>
              </span>
            )}
            <button
              onClick={logout}
              className="cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <main id="contenido" className="mx-auto w-full max-w-7xl flex-1 px-5 py-8 sm:px-8 sm:py-10">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-slate-500 sm:px-6">{footer}</div>
        </footer>
      </div>
    </div>
  );
}
