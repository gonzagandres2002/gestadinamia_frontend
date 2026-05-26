"use client";

import { useEffect, useMemo, useState } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

import { apiFetch } from "../lib/api";
import {
  EDAD_LABELS,
  ETNIA_LABELS,
  GESTAS_LABELS,
  IMC_LABELS,
  PA_INICIAL_LABELS,
} from "../lib/thresholds";
import type {
  AlertsResponse,
  CohortPercentiles,
  PacienteDetail,
  PercentileRow,
  Seguimiento,
} from "../lib/types";

interface Props {
  pacienteId: number | null;
  refreshKey?: number;
}

const ZONE_BG = {
  ok: "bg-emerald-50 text-emerald-800",
  warn: "bg-amber-50 text-amber-800",
  danger: "bg-rose-50 text-rose-800",
  na: "bg-slate-50 text-slate-500",
};

function classifyVsCohort(
  value: number | null | undefined,
  norm: PercentileRow | undefined,
  thae: PercentileRow | undefined,
): "ok" | "warn" | "danger" | "na" {
  if (value == null) return "na";
  if (norm?.p25 != null && norm?.p75 != null && value >= norm.p25 && value <= norm.p75) return "ok";
  if (thae?.p25 != null && thae?.p75 != null && value >= thae.p25 && value <= thae.p75) return "danger";
  return "warn";
}

function arrow(curr: number | null | undefined, prev: number | null | undefined) {
  if (curr == null || prev == null) return "→";
  const diff = curr - prev;
  if (Math.abs(diff) < 0.5) return "→";
  return diff > 0 ? "↑" : "↓";
}

function percentileRank(value: number, sorted: number[]): number | null {
  if (sorted.length === 0) return null;
  let count = 0;
  for (const v of sorted) if (v <= value) count++;
  return Math.round((count / sorted.length) * 100);
}

function approxRankFromPercentiles(value: number, row: PercentileRow | undefined): number | null {
  if (!row || row.p10 == null || row.p25 == null || row.p50 == null || row.p75 == null || row.p90 == null) {
    return null;
  }
  const points = [
    [row.p10, 10],
    [row.p25, 25],
    [row.p50, 50],
    [row.p75, 75],
    [row.p90, 90],
  ];
  if (value <= row.p10) return 10;
  if (value >= row.p90) return 90;
  for (let i = 0; i < points.length - 1; i++) {
    const [v1, p1] = points[i];
    const [v2, p2] = points[i + 1];
    if (value >= v1 && value <= v2) {
      if (v2 === v1) return p1;
      const frac = (value - v1) / (v2 - v1);
      return Math.round(p1 + frac * (p2 - p1));
    }
  }
  return percentileRank(value, points.map((p) => p[0]));
}

export default function RiskSummaryCard({ pacienteId, refreshKey }: Props) {
  const [paciente, setPaciente] = useState<PacienteDetail | null>(null);
  const [alerts, setAlerts] = useState<AlertsResponse | null>(null);
  const [pamPct, setPamPct] = useState<CohortPercentiles | null>(null);
  const [pasPct, setPasPct] = useState<CohortPercentiles | null>(null);
  const [auPct, setAuPct] = useState<CohortPercentiles | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pacienteId == null) return;
    setError(null);
    Promise.all([
      apiFetch<PacienteDetail>(`/pacientes/${pacienteId}`),
      apiFetch<AlertsResponse>(`/pacientes/${pacienteId}/alerts`),
      apiFetch<CohortPercentiles>(`/cohort/percentiles?variable=pam`),
      apiFetch<CohortPercentiles>(`/cohort/percentiles?variable=pas`),
      apiFetch<CohortPercentiles>(`/cohort/percentiles?variable=au_cru`),
    ])
      .then(([p, a, pam, pas, au]) => {
        setPaciente(p);
        setAlerts(a);
        setPamPct(pam);
        setPasPct(pas);
        setAuPct(au);
      })
      .catch((e) => setError(e.message));
  }, [pacienteId, refreshKey]);

  const lastSeg = useMemo<Seguimiento | undefined>(() => {
    if (!paciente) return undefined;
    return [...paciente.seguimientos]
      .filter((s) => s.pas_mmhg != null || s.peso_kg != null || s.pam_mmhg != null)
      .sort((a, b) => b.momento - a.momento)[0];
  }, [paciente]);

  const prevSeg = useMemo<Seguimiento | undefined>(() => {
    if (!paciente || !lastSeg) return undefined;
    return [...paciente.seguimientos]
      .filter((s) => s.momento < lastSeg.momento)
      .sort((a, b) => b.momento - a.momento)[0];
  }, [paciente, lastSeg]);

  if (pacienteId == null) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
        Sin paciente seleccionada.
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{error}</section>
    );
  }

  if (!paciente || !alerts) {
    return <section className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white" />;
  }

  const normPam = pamPct?.by_outcome["Normotensa"]?.find((r) => r.momento === lastSeg?.momento);
  const thaePam = pamPct?.by_outcome["THAE"]?.find((r) => r.momento === lastSeg?.momento);
  const normPas = pasPct?.by_outcome["Normotensa"]?.find((r) => r.momento === lastSeg?.momento);
  const thaePas = pasPct?.by_outcome["THAE"]?.find((r) => r.momento === lastSeg?.momento);
  const normAu = auPct?.by_outcome["Normotensa"]?.find((r) => r.momento === lastSeg?.momento);
  const thaeAu = auPct?.by_outcome["THAE"]?.find((r) => r.momento === lastSeg?.momento);

  const pamRankNorm =
    lastSeg?.pam_mmhg != null && normPam ? approxRankFromPercentiles(Number(lastSeg.pam_mmhg), normPam) : null;
  const pamRankThae =
    lastSeg?.pam_mmhg != null && thaePam ? approxRankFromPercentiles(Number(lastSeg.pam_mmhg), thaePam) : null;

  const pamSeries = paciente.seguimientos.map((s) => ({ m: s.momento, v: s.pam_mmhg }));
  const pesoSeries = paciente.seguimientos.map((s) => ({ m: s.momento, v: s.peso_kg }));

  return (
    <section
      aria-labelledby="risk-card-heading"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 id="risk-card-heading" className="text-lg font-semibold text-slate-900">
            Resumen clínico de la paciente
          </h2>
          <p className="text-xs text-slate-500">
            Lectura rápida en 5 segundos · solo estadísticas descriptivas.
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
            paciente.desenlace === "THAE"
              ? "bg-rose-100 text-rose-800 ring-rose-300"
              : paciente.desenlace === "Normotensa"
              ? "bg-emerald-100 text-emerald-800 ring-emerald-300"
              : "bg-slate-100 text-slate-700 ring-slate-300"
          }`}
        >
          Desenlace registrado: {paciente.desenlace}
        </span>
      </div>

      <dl className="mb-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        <Field label="ID" value={`#${String(paciente.paciente_id).padStart(3, "0")}`} mono />
        <Field label="Edad" value={EDAD_LABELS[String(paciente.edad_categoria)] || "ND"} />
        <Field label="Etnia" value={ETNIA_LABELS[paciente.etnia || ""] || "ND"} />
        <Field label="IMC inicial" value={IMC_LABELS[paciente.imc_categoria || ""] || "ND"} />
        <Field label="PA inicial" value={PA_INICIAL_LABELS[paciente.pa_inicial || ""] || "ND"} />
        <Field label="Gestas previas" value={GESTAS_LABELS[String(paciente.gestas_previas_categoria)] || "ND"} />
        <Field label="N° seguimientos" value={`${paciente.seguimientos.length} / 8`} />
        <Field label="Último momento" value={lastSeg ? `M${lastSeg.momento}` : "—"} />
      </dl>

      <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
          Última medición {lastSeg ? `(M${lastSeg.momento})` : ""}
        </p>
        {lastSeg ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Vital
              label="PAS"
              unit="mmHg"
              curr={lastSeg.pas_mmhg}
              prev={prevSeg?.pas_mmhg}
              zone={classifyVsCohort(Number(lastSeg.pas_mmhg), normPas, thaePas)}
            />
            <Vital
              label="PAD"
              unit="mmHg"
              curr={lastSeg.pad_mmhg}
              prev={prevSeg?.pad_mmhg}
              zone={lastSeg.pad_mmhg && lastSeg.pad_mmhg >= 90 ? "danger" : lastSeg.pad_mmhg && lastSeg.pad_mmhg >= 80 ? "warn" : "ok"}
            />
            <Vital
              label="PAM"
              unit="mmHg"
              curr={lastSeg.pam_mmhg}
              prev={prevSeg?.pam_mmhg}
              zone={classifyVsCohort(Number(lastSeg.pam_mmhg), normPam, thaePam)}
            />
            <Vital
              label="Peso"
              unit="kg"
              curr={lastSeg.peso_kg}
              prev={prevSeg?.peso_kg}
              zone="ok"
            />
            <Vital
              label="IMC"
              unit="kg/m²"
              curr={lastSeg.imc}
              prev={prevSeg?.imc}
              zone={lastSeg.imc && lastSeg.imc >= 30 ? "warn" : "ok"}
            />
            <Vital
              label="AU/Cru"
              unit="mg/24h"
              curr={lastSeg.au_cru_mg24h}
              prev={prevSeg?.au_cru_mg24h}
              zone={classifyVsCohort(Number(lastSeg.au_cru_mg24h), normAu, thaeAu)}
            />
          </div>
        ) : (
          <p className="text-sm text-slate-500">Aún sin mediciones registradas.</p>
        )}
      </div>

      {lastSeg?.pam_mmhg != null && (pamRankNorm != null || pamRankThae != null) && (
        <p className="mb-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-900">
          <strong>Posicionamiento (PAM, M{lastSeg.momento}):</strong>{" "}
          percentil ≈ <span className="font-semibold">{pamRankNorm ?? "—"}</span> del subgrupo Normotensa ·
          percentil ≈ <span className="font-semibold">{pamRankThae ?? "—"}</span> del subgrupo THAE.
        </p>
      )}

      <div className="mb-3 flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 font-medium text-rose-800 ring-1 ring-inset ring-rose-300">
          <span aria-hidden="true">●</span> {alerts.summary.red} alerta{alerts.summary.red === 1 ? "" : "s"} crítica{alerts.summary.red === 1 ? "" : "s"}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-800 ring-1 ring-inset ring-amber-300">
          <span aria-hidden="true">●</span> {alerts.summary.amber} advertencia{alerts.summary.amber === 1 ? "" : "s"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Spark title="PAM" data={pamSeries} color="#1E40AF" unit="mmHg" />
        <Spark title="Peso" data={pesoSeries} color="#0EA5E9" unit="kg" />
      </div>
    </section>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5">
      <dt className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{label}</dt>
      <dd className={`text-sm text-slate-900 ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  );
}

function Vital({
  label,
  unit,
  curr,
  prev,
  zone,
}: {
  label: string;
  unit: string;
  curr: number | null;
  prev: number | null | undefined;
  zone: "ok" | "warn" | "danger" | "na";
}) {
  const zoneClass = curr == null ? ZONE_BG.na : ZONE_BG[zone];
  return (
    <div className={`rounded-lg px-2.5 py-2 ${zoneClass}`}>
      <p className="text-[10px] font-medium uppercase tracking-wider opacity-80">{label}</p>
      <p className="text-base font-semibold">
        {curr != null ? Number(curr).toFixed(label === "Peso" ? 1 : 0) : "—"}
        <span className="ml-1 text-[10px] opacity-70">{unit}</span>
        <span className="ml-1 text-xs">{arrow(curr ?? null, prev ?? null)}</span>
      </p>
    </div>
  );
}

function Spark({
  title,
  data,
  color,
  unit,
}: {
  title: string;
  data: { m: number; v: number | null }[];
  color: string;
  unit: string;
}) {
  const points = data.filter((d) => d.v != null);
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-2">
      <p className="text-[11px] font-medium text-slate-600">
        {title}{" "}
        <span className="text-slate-400">
          ({points.length} pt{points.length === 1 ? "" : "s"} · {unit})
        </span>
      </p>
      <div className="h-12">
        {points.length === 0 ? (
          <div className="flex h-full items-center justify-center text-[11px] text-slate-400">Sin datos</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={color}
                strokeWidth={2}
                dot={{ r: 2.5, fill: color }}
                connectNulls={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
