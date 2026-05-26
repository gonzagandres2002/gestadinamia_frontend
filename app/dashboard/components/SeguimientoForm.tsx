"use client";

import { useEffect, useMemo, useState } from "react";

import { apiFetch } from "../lib/api";
import { FIELD_RANGES, valueZone } from "../lib/thresholds";
import type { PacienteDetail, Seguimiento, SeguimientoUpsertBody } from "../lib/types";

interface Props {
  pacienteId: number | null;
  onSaved?: () => void;
}

const FIELD_GROUPS: { title: string; keys: (keyof Seguimiento)[] }[] = [
  { title: "Antropometría", keys: ["peso_kg", "imc"] },
  { title: "Hemodinámica", keys: ["pas_mmhg", "pad_mmhg", "pam_mmhg"] },
  {
    title: "Marcadores urinarios",
    keys: [
      "cru_mg24h",
      "au_cru_mg24h",
      "sulf_cru",
      "sg_densidad",
      "au_sg_mg24h",
      "sulf_sg",
      "ph_orina",
    ],
  },
  { title: "Otros", keys: ["fc_bpm"] },
];

const ZONE_BORDER: Record<string, string> = {
  ok: "border-slate-300 focus:border-blue-700 focus:ring-blue-200",
  warn: "border-amber-400 focus:border-amber-500 focus:ring-amber-200",
  danger: "border-rose-500 focus:border-rose-600 focus:ring-rose-200",
};

export default function SeguimientoForm({ pacienteId, onSaved }: Props) {
  const [momento, setMomento] = useState<number>(6);
  const [paciente, setPaciente] = useState<PacienteDetail | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  useEffect(() => {
    if (pacienteId == null) return;
    setLoading(true);
    apiFetch<PacienteDetail>(`/pacientes/${pacienteId}`)
      .then((p) => setPaciente(p))
      .catch((e) => setFeedback({ kind: "err", msg: e.message }))
      .finally(() => setLoading(false));
  }, [pacienteId]);

  // Pre-populate when momento or patient changes
  useEffect(() => {
    if (!paciente) return;
    const seg = paciente.seguimientos.find((s) => s.momento === momento);
    const next: Record<string, string> = {};
    FIELD_GROUPS.flatMap((g) => g.keys).forEach((key) => {
      const v = seg ? (seg as unknown as Record<string, number | null>)[key as string] : null;
      next[key as string] = v == null ? "" : String(v);
    });
    setValues(next);
    setFeedback(null);
  }, [paciente, momento]);

  // Auto-calc PAM when PAS or PAD changes (only when PAM left empty by user)
  useEffect(() => {
    const pas = parseFloat(values.pas_mmhg);
    const pad = parseFloat(values.pad_mmhg);
    if (!isNaN(pas) && !isNaN(pad)) {
      const pam = (pas + 2 * pad) / 3;
      setValues((prev) => ({ ...prev, pam_mmhg: pam.toFixed(1) }));
    }
  }, [values.pas_mmhg, values.pad_mmhg]);

  const existingSeg = useMemo(
    () => paciente?.seguimientos.find((s) => s.momento === momento),
    [paciente, momento],
  );

  function set(key: string, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pacienteId == null) return;

    const pas = parseFloat(values.pas_mmhg);
    const pad = parseFloat(values.pad_mmhg);
    const peso = parseFloat(values.peso_kg);
    if (isNaN(pas) || isNaN(pad) || isNaN(peso)) {
      setFeedback({ kind: "err", msg: "Se requieren al menos PAS, PAD y peso." });
      return;
    }

    const body: SeguimientoUpsertBody = { momento };
    for (const key of Object.keys(values)) {
      const raw = values[key];
      const num = raw === "" ? null : parseFloat(raw);
      (body as unknown as Record<string, number | null>)[key] =
        num == null || isNaN(num) ? null : num;
    }

    setSaving(true);
    setFeedback(null);
    try {
      await apiFetch(`/pacientes/${pacienteId}/seguimientos`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      setFeedback({ kind: "ok", msg: `Momento ${momento} guardado correctamente.` });
      // refresh paciente to reflect new value
      const refreshed = await apiFetch<PacienteDetail>(`/pacientes/${pacienteId}`);
      setPaciente(refreshed);
      onSaved?.();
    } catch (e) {
      setFeedback({ kind: "err", msg: (e as Error).message });
    } finally {
      setSaving(false);
    }
  }

  if (pacienteId == null) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
        Seleccione una paciente para registrar mediciones.
      </section>
    );
  }

  return (
    <section
      aria-labelledby="seg-form-heading"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="seg-form-heading" className="text-lg font-semibold text-slate-900">
            Registrar mediciones por momento
          </h2>
          <p className="text-xs text-slate-500">
            {existingSeg
              ? `Momento ${momento}: editar mediciones existentes`
              : `Momento ${momento}: nuevo registro`}
            {loading && " · cargando…"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="momento" className="text-xs font-medium text-slate-700">
            Momento (1–8)
          </label>
          <select
            id="momento"
            value={momento}
            onChange={(e) => setMomento(Number(e.target.value))}
            className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((m) => (
              <option key={m} value={m}>
                Momento {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {FIELD_GROUPS.map((group) => (
          <fieldset key={group.title}>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
              {group.title}
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.keys.map((k) => {
                const key = k as string;
                const meta = FIELD_RANGES[key];
                if (!meta) return null;
                const raw = values[key] ?? "";
                const num = raw === "" ? null : parseFloat(raw);
                const zone = num == null || isNaN(num) ? "ok" : valueZone(key, num);
                const isPam = key === "pam_mmhg";
                return (
                  <div key={key}>
                    <label htmlFor={key} className="mb-1 block text-xs font-medium text-slate-700">
                      {meta.label}
                      {meta.unit && <span className="ml-1 text-slate-400">({meta.unit})</span>}
                      {isPam && <span className="ml-1 text-blue-700">· auto</span>}
                    </label>
                    <input
                      id={key}
                      type="number"
                      step={meta.step}
                      min={meta.min}
                      max={meta.max}
                      value={raw}
                      readOnly={isPam}
                      onChange={(e) => set(key, e.target.value)}
                      placeholder="—"
                      aria-describedby={`${key}-help`}
                      className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 ${ZONE_BORDER[zone]} ${
                        isPam ? "bg-slate-50 text-slate-700" : ""
                      }`}
                    />
                    {meta.helper && (
                      <p id={`${key}-help`} className="mt-1 text-[11px] text-slate-500">
                        {zone !== "ok" && (
                          <span
                            className={`mr-1 font-medium ${
                              zone === "danger" ? "text-rose-700" : "text-amber-700"
                            }`}
                          >
                            ● {zone === "danger" ? "Fuera de rango crítico" : "Fuera de rango"}
                          </span>
                        )}
                        {meta.helper}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </fieldset>
        ))}

        {feedback && (
          <p
            role="status"
            className={`rounded-lg border px-3 py-2 text-sm ${
              feedback.kind === "ok"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-rose-200 bg-rose-50 text-rose-800"
            }`}
          >
            {feedback.msg}
          </p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="cursor-pointer rounded-xl bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Guardando…" : existingSeg ? "Actualizar momento" : "Guardar momento"}
          </button>
          <span className="text-xs text-slate-500">
            Los campos fuera de rango se marcan en color pero no bloquean el guardado.
          </span>
        </div>
      </form>
    </section>
  );
}
