"use client";

import { useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** Reads a sessionStorage flag SSR-safely (false on the server). */
function useSessionFlag(key: string): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => sessionStorage.getItem(key) === "1",
    () => false,
  );
}

/** Reads a localStorage value SSR-safely (null on the server). */
function useStoredValue(key: string): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => localStorage.getItem(key),
    () => null,
  );
}

export default function WelcomeBanner() {
  const justLoggedIn = useSessionFlag("gestadinamia_welcome");
  const role = useStoredValue("gestadinamia_role");
  const [dismissed, setDismissed] = useState(false);

  if (!justLoggedIn || dismissed) return null;

  function close() {
    sessionStorage.removeItem("gestadinamia_welcome");
    setDismissed(true);
  }

  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-accent/30 bg-accent-soft px-5 py-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-semibold text-accent-strong">Bienvenido/a de nuevo</p>
          <p className="mt-0.5 text-sm text-accent-strong">
            Sesión iniciada correctamente. Este es el panel clínico de seguimiento de la cohorte de
            218 gestantes.
            {role && (
              <span className="ml-2 inline-flex items-center rounded-full border border-accent/30 bg-white px-2 py-0.5 text-xs font-medium text-accent-strong">
                Rol: {role}
              </span>
            )}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={close}
        aria-label="Descartar mensaje de bienvenida"
        className="-mr-1 -mt-1 rounded-lg p-2 text-accent transition-colors hover:bg-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
