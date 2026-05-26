"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PredictionResult {
  probability: number;
  risk_label: string;
  threshold: number;
  risk_percent: string;
}

type Features = Record<string, string>;

// ── Field definitions ─────────────────────────────────────────────────────────

const DEMOGRAPHICS = [
  {
    key: "pa_inicial",
    label: "Presión arterial inicial",
    type: "select" as const,
    options: [
      { value: "N", label: "Normal" },
      { value: "E", label: "Elevada" },
      { value: "HTA1", label: "HTA Grado 1" },
      { value: "HTA2", label: "HTA Grado 2" },
    ],
  },
  {
    key: "etnia",
    label: "Etnia",
    type: "select" as const,
    options: [
      { value: "mest", label: "Mestiza" },
      { value: "Afro", label: "Afrocolombiana" },
      { value: "indg", label: "Indígena" },
      { value: "N", label: "No especificada" },
      { value: "E", label: "Extranjera" },
    ],
  },
  {
    key: "imc_ingreso",
    label: "IMC al ingreso",
    type: "select" as const,
    options: [
      { value: "Bp", label: "Bajo peso" },
      { value: "Ad", label: "Adecuado" },
      { value: "Sp", label: "Sobrepeso" },
      { value: "Ob", label: "Obesidad" },
    ],
  },
  {
    key: "edad_categoria",
    label: "Categoría de edad",
    type: "select" as const,
    options: [
      { value: "1", label: "Joven (< 20 años)" },
      { value: "2", label: "Adulta (20–35 años)" },
      { value: "3", label: "Mayor (> 35 años)" },
    ],
  },
  {
    key: "gestas_previas_categoria",
    label: "Gestas previas",
    type: "select" as const,
    options: [
      { value: "1", label: "Primípara (0 previas)" },
      { value: "2", label: "1 previa" },
      { value: "3", label: "2–3 previas" },
      { value: "4", label: "≥ 4 previas" },
    ],
  },
  {
    key: "peso_categoria",
    label: "Categoría de peso",
    type: "select" as const,
    options: [
      { value: "1", label: "Bajo peso" },
      { value: "2", label: "Adecuado" },
      { value: "3", label: "Sobrepeso" },
      { value: "4", label: "Obesidad" },
    ],
  },
];

interface MeasurementDef {
  base: string;
  label: string;
  unit: string;
  step: string;
  startMomento: number;
}

const MEASUREMENTS: MeasurementDef[] = [
  { base: "peso_momento", label: "Peso", unit: "kg", step: "0.1", startMomento: 1 },
  { base: "imc_momento", label: "IMC", unit: "kg/m²", step: "0.01", startMomento: 1 },
  { base: "pas_momento", label: "PAS", unit: "mmHg", step: "1", startMomento: 1 },
  { base: "pad_momento", label: "PAD", unit: "mmHg", step: "1", startMomento: 1 },
  { base: "pam_momento", label: "PAM", unit: "mmHg", step: "0.1", startMomento: 1 },
  { base: "cru_momento", label: "Creatinina Cru", unit: "mg/24h", step: "0.1", startMomento: 1 },
  { base: "au_cru_momento", label: "Albuminuria Cru", unit: "mg/24h", step: "0.1", startMomento: 1 },
  { base: "sulf_cru_momento", label: "Sulfato Cru", unit: "", step: "0.001", startMomento: 1 },
  { base: "sg_momento_", label: "Densidad urinaria", unit: "", step: "0.1", startMomento: 1 },
  { base: "au_sg_momento", label: "Albuminuria SG", unit: "mg/24h", step: "0.1", startMomento: 2 },
  { base: "sulf_sg_momento", label: "Sulfato SG", unit: "", step: "0.001", startMomento: 1 },
  { base: "ph_momento", label: "pH urinario", unit: "", step: "0.1", startMomento: 1 },
  { base: "fc_momento", label: "Frec. cardíaca", unit: "lpm", step: "1", startMomento: 2 },
];

function fieldKey(base: string, momento: number): string {
  if (base === "sg_momento_") return `sg_momento_${momento}`;
  return `${base}${momento}`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function PredictPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [features, setFeatures] = useState<Features>({});
  const [openMomento, setOpenMomento] = useState<number | null>(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("gestadinamia_token");
    if (!t) {
      router.push("/login");
      return;
    }
    setToken(t);
  }, [router]);

  function set(field: string, value: string) {
    setFeatures((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const numericFeatures: Record<string, string | number | null> = {};
    const catKeys = new Set(DEMOGRAPHICS.filter((d) => d.type === "select").map((d) => d.key));

    for (const [k, v] of Object.entries(features)) {
      if (v === "" || v === null || v === undefined) {
        numericFeatures[k] = null;
      } else if (catKeys.has(k)) {
        numericFeatures[k] = v;
      } else {
        const n = parseFloat(v);
        numericFeatures[k] = isNaN(n) ? null : n;
      }
    }

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ features: numericFeatures }),
      });

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.detail ?? "Error en la predicción");
        return;
      }

      const data: PredictionResult = await res.json();
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("No se pudo conectar al servidor.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) return null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Calculadora de riesgo THAE</h1>
        <p className="mt-1 text-sm text-slate-600">
          Complete los datos disponibles (todos los campos son opcionales — el modelo imputa los valores faltantes).
        </p>
      </div>

      {result && (
          <div
            className={`mb-8 rounded-2xl border p-6 ${
              result.risk_label === "Alto"
                ? "border-red-200 bg-red-50"
                : "border-emerald-200 bg-emerald-50"
            }`}
          >
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div
                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-2xl font-bold ${
                  result.risk_label === "Alto"
                    ? "bg-red-100 text-red-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {result.risk_percent}
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-text/60">
                  Riesgo estimado de THAE
                </p>
                <p
                  className={`text-3xl font-semibold ${
                    result.risk_label === "Alto" ? "text-red-700" : "text-emerald-700"
                  }`}
                >
                  {result.risk_label}
                </p>
                <p className="mt-1 text-sm text-text/60">
                  Umbral de clasificación: {(result.threshold * 100).toFixed(0)}%. Este resultado es
                  orientativo y no reemplaza el juicio clínico.
                </p>
              </div>
            </div>
          </div>
        )}

      <form onSubmit={handleSubmit} className="space-y-6">
          {/* Demographics */}
          <section className="rounded-2xl border border-gray-border bg-white p-6">
            <h2 className="mb-4 text-base font-semibold text-text">Datos basales</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DEMOGRAPHICS.map((field) => (
                <div key={field.key}>
                  <label className="mb-1 block text-xs font-medium text-text/70">
                    {field.label}
                  </label>
                  <select
                    value={features[field.key] ?? ""}
                    onChange={(e) => set(field.key, e.target.value)}
                    className="w-full rounded-lg border border-gray-border bg-white px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">— No especificado —</option>
                    {field.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </section>

          {/* Momentos 1–6 */}
          {[1, 2, 3, 4, 5, 6].map((m) => {
            const isOpen = openMomento === m;
            const filledCount = MEASUREMENTS.filter((meas) => {
              if (meas.startMomento > m) return false;
              const k = fieldKey(meas.base, m);
              return features[k] && features[k] !== "";
            }).length;

            return (
              <section key={m} className="rounded-2xl border border-gray-border bg-white">
                <button
                  type="button"
                  onClick={() => setOpenMomento(isOpen ? null : m)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {m}
                    </span>
                    <span className="font-medium text-text">Momento {m}</span>
                    {filledCount > 0 && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                        {filledCount} campo{filledCount > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  <span className="text-text/40">{isOpen ? "▲" : "▼"}</span>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-border px-6 py-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {MEASUREMENTS.filter((meas) => meas.startMomento <= m).map((meas) => {
                        const k = fieldKey(meas.base, m);
                        return (
                          <div key={k}>
                            <label className="mb-1 block text-xs font-medium text-text/70">
                              {meas.label}
                              {meas.unit && (
                                <span className="ml-1 text-text/40">({meas.unit})</span>
                              )}
                            </label>
                            <input
                              type="number"
                              step={meas.step}
                              value={features[k] ?? ""}
                              onChange={(e) => set(k, e.target.value)}
                              placeholder="—"
                              className="w-full rounded-lg border border-gray-border bg-white px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </section>
            );
          })}

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-6 py-4 text-base font-semibold text-white shadow-[0_8px_24px_rgba(18,92,40,0.28)] transition-colors hover:bg-primary-light disabled:opacity-60"
          >
            {loading ? "Calculando riesgo..." : "Calcular riesgo THAE"}
          </button>
      </form>
    </div>
  );
}
