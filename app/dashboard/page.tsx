"use client";

import { useCallback, useState } from "react";

import AlertsBanner from "./components/AlertsBanner";
import PatientLongitudinalChart from "./components/PatientLongitudinalChart";
import PatientPicker from "./components/PatientPicker";
import RiskSummaryCard from "./components/RiskSummaryCard";
import SeguimientoForm from "./components/SeguimientoForm";
import WelcomeBanner from "./components/WelcomeBanner";

export default function DashboardPage() {
  const [pacienteId, setPacienteId] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSelect = useCallback((id: number) => setPacienteId(id), []);
  const handleSaved = useCallback(() => setRefreshKey((k) => k + 1), []);

  return (
    <div className="space-y-6">
      <WelcomeBanner />

      <header>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
          Análisis descriptivo
        </p>
        <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.02em] text-slate-900">
          Panel clínico de seguimiento prenatal
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-600">
          Estadística descriptiva, trayectorias longitudinales por paciente y alertas basadas en
          umbrales clínicos. Esta vista no ejecuta cálculos algorítmicos sobre la paciente.
        </p>
      </header>

      <PatientPicker selectedId={pacienteId} onSelect={handleSelect} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <RiskSummaryCard pacienteId={pacienteId} refreshKey={refreshKey} />
        <AlertsBanner pacienteId={pacienteId} refreshKey={refreshKey} />
      </div>

      <PatientLongitudinalChart pacienteId={pacienteId} refreshKey={refreshKey} />

      <SeguimientoForm pacienteId={pacienteId} onSaved={handleSaved} />
    </div>
  );
}
