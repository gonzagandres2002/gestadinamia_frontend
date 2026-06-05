import AppShell from "../components/AppShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell footer="Análisis descriptivo basado en cohorte de 218 gestantes — sin inferencia algorítmica en este panel.">
      {children}
    </AppShell>
  );
}
