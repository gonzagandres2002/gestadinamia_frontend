"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { logout } from "./lib/api";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("gestadinamia_token");
    if (!t) {
      router.replace("/login");
      return;
    }
    setRole(localStorage.getItem("gestadinamia_role"));
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-blue-700" />
          Cargando panel clínico…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="Gestadinamia" width={32} height={32} className="h-8 w-auto" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-blue-900">Gestadinamia</p>
              <p className="text-[11px] uppercase tracking-wider text-slate-500">Panel clínico descriptivo</p>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <span className="hidden text-xs text-slate-500 sm:inline">
              {role ? `Rol: ${role}` : ""}
            </span>
            <button
              onClick={logout}
              className="cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Cerrar sesión
            </button>
          </nav>
        </div>
      </header>

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-6 text-sm">
          <Link
            href="/dashboard"
            className={`border-b-2 px-0 py-3 font-medium transition-colors ${
              pathname === "/dashboard"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Análisis descriptivo
          </Link>
          <Link
            href="/predict"
            className={`ml-6 border-b-2 px-0 py-3 font-medium transition-colors ${
              pathname === "/predict"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Calculadora ML
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>

      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 text-xs text-slate-500">
          Análisis descriptivo basado en cohorte de 218 gestantes — sin inferencia algorítmica en este panel.
        </div>
      </footer>
    </div>
  );
}
