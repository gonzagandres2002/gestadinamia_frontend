import CohortOverview from "../components/CohortOverview";

export default function CohortePage() {
  return (
    <div className="space-y-5">
      <header>
        <p className="text-[11px] font-medium uppercase tracking-wider text-blue-700">
          Análisis descriptivo
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">
          Vista descriptiva de la cohorte
        </h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">
          Estadísticas agregadas de la cohorte de 218 gestantes: distribución de desenlaces,
          características basales y completitud del seguimiento. Sirve como referencia poblacional
          para situar a cada paciente.
        </p>
      </header>

      <CohortOverview />
    </div>
  );
}
