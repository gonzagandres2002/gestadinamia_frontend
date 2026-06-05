import CohortOverview from "../components/CohortOverview";

export default function CohortePage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
          Análisis descriptivo
        </p>
        <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.02em] text-slate-900">
          Vista descriptiva de la cohorte
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-600">
          Estadísticas agregadas de la cohorte de 218 gestantes: distribución de desenlaces,
          características basales y completitud del seguimiento. Sirve como referencia poblacional
          para situar a cada paciente.
        </p>
      </header>

      <CohortOverview />
    </div>
  );
}
