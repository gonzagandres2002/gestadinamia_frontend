"use client";

import { useEffect, useState } from "react";

import { apiFetch } from "../lib/api";
import type { AlertsResponse } from "../lib/types";

interface Props {
  pacienteId: number | null;
  refreshKey?: number;
}

const LEVEL_STYLES = {
  red: "border-rose-300 bg-rose-50 text-rose-900",
  amber: "border-amber-300 bg-amber-50 text-amber-900",
};

const LEVEL_LABEL = { red: "Crítico", amber: "Advertencia" };

function LevelIcon({ level }: { level: "red" | "amber" }) {
  if (level === "red") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-rose-600">
        <path d="M12 2 1 21h22L12 2Zm0 6 8.5 14H3.5L12 8Zm-1 5h2v4h-2v-4Zm0 5h2v2h-2v-2Z" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-amber-600">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 5a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-3 0v-5A1.5 1.5 0 0 1 12 7Zm0 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
    </svg>
  );
}

export default function AlertsBanner({ pacienteId, refreshKey }: Props) {
  const [data, setData] = useState<AlertsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pacienteId == null) return;
    setLoading(true);
    setError(null);
    apiFetch<AlertsResponse>(`/pacientes/${pacienteId}/alerts`)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [pacienteId, refreshKey]);

  if (pacienteId == null) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
        Sin paciente seleccionada.
      </section>
    );
  }

  return (
    <section
      aria-labelledby="alerts-heading"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 id="alerts-heading" className="text-lg font-semibold text-slate-900">
            Alertas clínicas
          </h2>
          <p className="text-xs text-slate-500">
            Reglas basadas en umbrales clínicos. Sin inferencia algorítmica.
          </p>
        </div>
        {data && (
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-1 font-medium text-rose-800 ring-1 ring-inset ring-rose-300">
              <LevelIcon level="red" /> {data.summary.red} crítica{data.summary.red === 1 ? "" : "s"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 font-medium text-amber-800 ring-1 ring-inset ring-amber-300">
              <LevelIcon level="amber" /> {data.summary.amber} advertencia{data.summary.amber === 1 ? "" : "s"}
            </span>
          </div>
        )}
      </div>

      {error && (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p>
      )}

      {loading && !data && (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-slate-100" />
          ))}
        </div>
      )}

      {data && data.alerts.length === 0 && (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-6 text-center text-sm text-emerald-800">
          <span aria-hidden="true" className="mr-1">✓</span>
          Sin alertas — todas las mediciones registradas están dentro de rango.
        </p>
      )}

      {data && data.alerts.length > 0 && (
        <ul className="w-full space-y-2 overflow-y-auto pr-1">
          {data.alerts.map((a, idx) => (
            <li
              key={`${a.code}-${a.momento}-${idx}`}
              className={`flex items-start gap-3 rounded-lg border px-3 py-2 ${LEVEL_STYLES[a.level]}`}
            >
              <span className="mt-0.5 shrink-0">
                <LevelIcon level={a.level} />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider">
                    {LEVEL_LABEL[a.level]}
                  </span>
                  {a.momento != null && (
                    <span className="rounded bg-white/70 px-1.5 py-0.5 text-[10px] font-medium text-slate-700">
                      Momento {a.momento}
                    </span>
                  )}
                  <span className="font-mono text-[10px] text-slate-500">{a.code}</span>
                </div>
                <p className="mt-1 text-sm leading-snug">{a.message}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
