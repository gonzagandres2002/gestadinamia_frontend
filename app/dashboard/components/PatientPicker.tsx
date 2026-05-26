"use client";

import { useEffect, useMemo, useState } from "react";

import { apiFetch } from "../lib/api";
import type { PacienteSummary } from "../lib/types";
import { IMC_LABELS, PA_INICIAL_LABELS } from "../lib/thresholds";

interface Props {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const OUTCOME_BADGE: Record<string, string> = {
  Normotensa: "bg-emerald-100 text-emerald-800 ring-emerald-300",
  THAE: "bg-rose-100 text-rose-800 ring-rose-300",
  ND: "bg-slate-100 text-slate-700 ring-slate-300",
};

export default function PatientPicker({ selectedId, onSelect }: Props) {
  const [pacientes, setPacientes] = useState<PacienteSummary[]>([]);
  const [search, setSearch] = useState("");
  const [filterOutcome, setFilterOutcome] = useState<"all" | "Normotensa" | "THAE" | "ND">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    apiFetch<PacienteSummary[]>("/pacientes")
      .then((data) => {
        if (!alive) return;
        setPacientes(data);
        if (!selectedId && data.length > 0) onSelect(data[0].paciente_id);
      })
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [onSelect, selectedId]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return pacientes.filter((p) => {
      if (filterOutcome !== "all" && p.desenlace !== filterOutcome) return false;
      if (!term) return true;
      return (
        String(p.paciente_id).includes(term) ||
        (p.etnia || "").toLowerCase().includes(term) ||
        (p.imc_categoria || "").toLowerCase().includes(term)
      );
    });
  }, [pacientes, search, filterOutcome]);

  const selected = pacientes.find((p) => p.paciente_id === selectedId);

  return (
    <section
      aria-label="Selección de paciente"
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Paciente activa</h2>
          <p className="text-xs text-slate-500">
            {selected
              ? `ID #${selected.paciente_id} · Desenlace: ${selected.desenlace} · ${selected.n_seguimientos} seguimiento${selected.n_seguimientos === 1 ? "" : "s"}`
              : "Seleccione una paciente para ver su evolución"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="patient-search">
            Buscar paciente
          </label>
          <input
            id="patient-search"
            type="search"
            value={search}
            placeholder="Buscar por ID, etnia, IMC…"
            onChange={(e) => setSearch(e.target.value)}
            className="w-56 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <select
            value={filterOutcome}
            onChange={(e) => setFilterOutcome(e.target.value as typeof filterOutcome)}
            aria-label="Filtrar por desenlace"
            className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">Todos los desenlaces</option>
            <option value="Normotensa">Normotensa</option>
            <option value="THAE">THAE</option>
            <option value="ND">ND</option>
          </select>
        </div>
      </div>

      {error && (
        <p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          No se pudieron cargar las pacientes: {error}
        </p>
      )}

      <div className="mt-4 max-h-56 overflow-y-auto rounded-lg border border-slate-200">
        {loading ? (
          <div className="px-4 py-8 text-center text-sm text-slate-500">Cargando…</div>
        ) : filtered.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-slate-500">
            Sin resultados para los filtros aplicados.
          </div>
        ) : (
          <ul role="listbox" aria-label="Lista de pacientes">
            {filtered.slice(0, 200).map((p) => {
              const isSel = p.paciente_id === selectedId;
              return (
                <li key={p.paciente_id}>
                  <button
                    role="option"
                    aria-selected={isSel}
                    onClick={() => onSelect(p.paciente_id)}
                    className={`flex w-full cursor-pointer items-center justify-between gap-2 border-b border-slate-100 px-4 py-2.5 text-left text-sm transition-colors last:border-b-0 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none ${
                      isSel ? "bg-blue-50" : ""
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-slate-500">#{String(p.paciente_id).padStart(3, "0")}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ring-1 ring-inset ${
                          OUTCOME_BADGE[p.desenlace] || OUTCOME_BADGE.ND
                        }`}
                      >
                        {p.desenlace}
                      </span>
                      <span className="text-slate-700">
                        {IMC_LABELS[p.imc_categoria || ""] || "IMC ND"} ·{" "}
                        {PA_INICIAL_LABELS[p.pa_inicial || ""] || "PA ND"}
                      </span>
                    </span>
                    <span className="text-xs text-slate-500">
                      {p.n_seguimientos} seg.
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {filtered.length > 200 && (
        <p className="mt-2 text-[11px] text-slate-500">
          Mostrando los primeros 200 resultados. Refine la búsqueda para acotar.
        </p>
      )}
    </section>
  );
}
