"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { apiFetch } from "../lib/api";
import type {
  ChartVariable,
  CohortPercentiles,
  PacienteDetail,
  PercentileRow,
} from "../lib/types";
import { VARIABLE_META } from "../lib/thresholds";

interface Props {
  pacienteId: number | null;
  refreshKey?: number;
}

const VARIABLES: ChartVariable[] = ["pam", "pas", "pad", "imc", "peso", "au_cru"];

function inIQR(value: number, lo: number | null, hi: number | null) {
  if (lo == null || hi == null) return false;
  return value >= lo && value <= hi;
}

function dotColor(
  value: number | null,
  normRow: PercentileRow | undefined,
  thaeRow: PercentileRow | undefined,
): string {
  if (value == null) return "#94A3B8";
  if (normRow && inIQR(value, normRow.p25, normRow.p75)) return "#10B981";
  if (thaeRow && inIQR(value, thaeRow.p25, thaeRow.p75)) return "#E11D48";
  return "#F59E0B";
}

export default function PatientLongitudinalChart({ pacienteId, refreshKey }: Props) {
  const [variable, setVariable] = useState<ChartVariable>("pam");
  const [paciente, setPaciente] = useState<PacienteDetail | null>(null);
  const [percentiles, setPercentiles] = useState<CohortPercentiles | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Patient detail
  useEffect(() => {
    if (pacienteId == null) return;
    setLoading(true);
    apiFetch<PacienteDetail>(`/pacientes/${pacienteId}`)
      .then(setPaciente)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [pacienteId, refreshKey]);

  // Percentiles for current variable
  useEffect(() => {
    apiFetch<CohortPercentiles>(`/cohort/percentiles?variable=${variable}`)
      .then(setPercentiles)
      .catch((e) => setError(e.message));
  }, [variable, refreshKey]);

  const meta = VARIABLE_META[variable];

  const data = useMemo(() => {
    if (!percentiles) return [];
    const norm = percentiles.by_outcome["Normotensa"] || [];
    const thae = percentiles.by_outcome["THAE"] || [];
    const seg = paciente?.seguimientos || [];

    return Array.from({ length: 8 }, (_, i) => {
      const m = i + 1;
      const n = norm.find((r) => r.momento === m);
      const t = thae.find((r) => r.momento === m);
      const sgRow = seg.find((s) => s.momento === m);
      const patientVal = sgRow ? (sgRow as unknown as Record<string, number | null>)[meta.field] : null;

      return {
        momento: `M${m}`,
        normLow: n?.p25 ?? null,
        normHigh: n?.p75 ?? null,
        normMedian: n?.p50 ?? null,
        thaeLow: t?.p25 ?? null,
        thaeHigh: t?.p75 ?? null,
        thaeMedian: t?.p50 ?? null,
        normRange: n?.p25 != null && n?.p75 != null ? [n.p25, n.p75] : undefined,
        thaeRange: t?.p25 != null && t?.p75 != null ? [t.p25, t.p75] : undefined,
        patient: patientVal,
        patientFill: dotColor(patientVal as number | null, n, t),
      };
    });
  }, [percentiles, paciente, meta.field]);

  if (pacienteId == null) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
        Seleccione una paciente para ver su trayectoria longitudinal.
      </section>
    );
  }

  return (
    <section
      aria-labelledby="long-chart-heading"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="long-chart-heading" className="text-lg font-semibold text-slate-900">
            Trayectoria longitudinal vs cohorte
          </h2>
          <p className="text-xs text-slate-500">
            Bandas P25–P75 por desenlace: <span className="font-medium text-emerald-700">Normotensa</span> ·{" "}
            <span className="font-medium text-rose-700">THAE</span>. Línea sólida = paciente actual.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Variable">
          {VARIABLES.map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={variable === v}
              onClick={() => setVariable(v)}
              className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                variable === v
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              {VARIABLE_META[v].label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="mb-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {error}
        </p>
      )}

      <div className="h-[340px]">
        {loading || !percentiles ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">Cargando…</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 16, right: 24, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="momento" tick={{ fontSize: 12, fill: "#475569" }} />
              <YAxis
                tick={{ fontSize: 12, fill: "#475569" }}
                label={{ value: meta.unit, angle: -90, position: "insideLeft", offset: 18, style: { fontSize: 11, fill: "#64748B" } }}
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #CBD5E1", fontSize: 12 }}
                formatter={(value: unknown, name: unknown) => {
                  if (Array.isArray(value)) return [`${value[0]} – ${value[1]}`, name as string];
                  return [value as number, name as string];
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />

              <Area
                type="monotone"
                dataKey="normRange"
                fill="#10B981"
                stroke="none"
                fillOpacity={0.18}
                name="Normotensa P25–P75"
                connectNulls
              />
              <Area
                type="monotone"
                dataKey="thaeRange"
                fill="#E11D48"
                stroke="none"
                fillOpacity={0.18}
                name="THAE P25–P75"
                connectNulls
              />

              <Line
                type="monotone"
                dataKey="normMedian"
                stroke="#10B981"
                strokeDasharray="5 4"
                strokeWidth={1.5}
                dot={false}
                name="Mediana Normotensa"
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="thaeMedian"
                stroke="#E11D48"
                strokeDasharray="5 4"
                strokeWidth={1.5}
                dot={false}
                name="Mediana THAE"
                connectNulls
              />

              <Line
                type="monotone"
                dataKey="patient"
                stroke="#1E40AF"
                strokeWidth={2.5}
                connectNulls={false}
                name="Paciente"
                dot={(props) => {
                  const { cx, cy, payload, index } = props as {
                    cx?: number; cy?: number; payload?: { patientFill?: string }; index?: number;
                  };
                  if (cx == null || cy == null || payload?.patientFill == null) {
                    return <g key={`dot-${index ?? 0}`} />;
                  }
                  return (
                    <circle
                      key={`dot-${index ?? 0}`}
                      cx={cx}
                      cy={cy}
                      r={5}
                      fill={payload.patientFill}
                      stroke="#1E40AF"
                      strokeWidth={1.5}
                    />
                  );
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      <ul className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-600">
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Dentro IQR Normotensa
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Zona intermedia
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Dentro IQR THAE
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400" /> Sin medición
        </li>
      </ul>
    </section>
  );
}
