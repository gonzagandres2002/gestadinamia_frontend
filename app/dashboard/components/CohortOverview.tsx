"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { apiFetch } from "../lib/api";
import type { CohortOverview as CohortOverviewT } from "../lib/types";
import {
  EDAD_LABELS,
  ETNIA_LABELS,
  IMC_LABELS,
  PA_INICIAL_LABELS,
} from "../lib/thresholds";

const COLORS = {
  Normotensa: "#10B981",
  THAE: "#E11D48",
  ND: "#94A3B8",
};

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

export default function CohortOverview() {
  const [data, setData] = useState<CohortOverviewT | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<CohortOverviewT>("/cohort/overview")
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
        Error cargando cohorte: {error}
      </section>
    );
  }
  if (!data) {
    return (
      <section className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white" aria-label="Cargando cohorte" />
    );
  }

  const outcomePie = Object.entries(data.outcome_counts).map(([name, value]) => ({ name, value }));
  const imcRows = ["Bp", "Ad", "Sp", "Ob"].map((k) => ({
    cat: IMC_LABELS[k] || k,
    count: data.imc_counts[k] || 0,
  }));
  const paRows = ["N", "E", "HTA1", "HTA2"].map((k) => ({
    cat: PA_INICIAL_LABELS[k] || k,
    count: data.pa_inicial_counts[k] || 0,
  }));
  const etniaRows = Object.entries(data.etnia_counts).map(([k, v]) => ({
    cat: ETNIA_LABELS[k] || k,
    count: v,
  }));
  const edadRows = Object.entries(data.edad_counts)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([k, v]) => ({ cat: EDAD_LABELS[k] || k, count: v }));
  const seguimientosLine = data.n_seguimientos_per_momento.map((c, i) => ({
    momento: `M${i + 1}`,
    count: c,
  }));

  return (
    <section
      aria-labelledby="cohort-heading"
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-baseline justify-between">
        <div>
          <h2 id="cohort-heading" className="text-lg font-semibold text-slate-900">
            Vista descriptiva de la cohorte
          </h2>
          <p className="text-xs text-slate-500">
            Estadísticas agregadas — referencia poblacional para situar a cada paciente.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="N total de gestantes" value={String(data.n_total)} />
        <Kpi
          label="% THAE"
          value={`${data.outcome_percent.THAE?.toFixed(1) ?? "0.0"}%`}
          sub={`${data.outcome_counts.THAE ?? 0} casos`}
        />
        <Kpi
          label="% Normotensa"
          value={`${data.outcome_percent.Normotensa?.toFixed(1) ?? "0.0"}%`}
          sub={`${data.outcome_counts.Normotensa ?? 0} casos`}
        />
        <Kpi
          label="Mediana de seguimientos"
          value={data.median_seguimientos_per_paciente.toFixed(1)}
          sub="Por paciente (de 8 posibles)"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Distribución de desenlaces">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={outcomePie} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {outcomePie.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS] || COLORS.ND} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={24} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Seguimientos por momento (1–8)">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={seguimientosLine}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="momento" tick={{ fontSize: 12, fill: "#475569" }} />
              <YAxis tick={{ fontSize: 12, fill: "#475569" }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#1E40AF" strokeWidth={2.5} dot={{ r: 4, fill: "#F59E0B" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="IMC categoría al ingreso">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={imcRows} margin={{ top: 8, right: 8, bottom: 8, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="cat" tick={{ fontSize: 11, fill: "#475569" }} />
              <YAxis tick={{ fontSize: 11, fill: "#475569" }} />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Presión arterial inicial">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={paRows} margin={{ top: 8, right: 8, bottom: 8, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="cat" tick={{ fontSize: 11, fill: "#475569" }} />
              <YAxis tick={{ fontSize: 11, fill: "#475569" }} />
              <Tooltip />
              <Bar dataKey="count" fill="#1E40AF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Etnia">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={etniaRows} layout="vertical" margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#475569" }} />
              <YAxis type="category" dataKey="cat" tick={{ fontSize: 11, fill: "#475569" }} width={110} />
              <Tooltip />
              <Bar dataKey="count" fill="#F59E0B" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Categoría de edad">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={edadRows} layout="vertical" margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#475569" }} />
              <YAxis type="category" dataKey="cat" tick={{ fontSize: 11, fill: "#475569" }} width={140} />
              <Tooltip />
              <Bar dataKey="count" fill="#0EA5E9" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </section>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">{title}</p>
      {children}
    </div>
  );
}
