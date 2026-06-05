import AppShell from "../components/AppShell";

export default function PredictLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell footer="Herramienta de apoyo clínico — los resultados no reemplazan el juicio médico.">
      {children}
    </AppShell>
  );
}
