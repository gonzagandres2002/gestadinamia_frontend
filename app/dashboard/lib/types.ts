export type Outcome = "Normotensa" | "THAE" | "ND";

export interface Seguimiento {
  seguimiento_id: number;
  paciente_id: number;
  momento: number;
  peso_kg: number | null;
  imc: number | null;
  pas_mmhg: number | null;
  pad_mmhg: number | null;
  pam_mmhg: number | null;
  cru_mg24h: number | null;
  au_cru_mg24h: number | null;
  sulf_cru: number | null;
  sg_densidad: number | null;
  au_sg_mg24h: number | null;
  sulf_sg: number | null;
  ph_orina: number | null;
  fc_bpm: number | null;
}

export interface PacienteSummary {
  paciente_id: number;
  desenlace: Outcome;
  pa_inicial: string | null;
  etnia: string | null;
  edad_categoria: number | null;
  gestas_previas_categoria: number | null;
  imc_categoria: string | null;
  peso_categoria: number | null;
  n_seguimientos: number;
}

export interface PacienteDetail extends Omit<PacienteSummary, "n_seguimientos"> {
  seguimientos: Seguimiento[];
}

export interface CohortOverview {
  n_total: number;
  outcome_counts: Record<string, number>;
  outcome_percent: Record<string, number>;
  etnia_counts: Record<string, number>;
  edad_counts: Record<string, number>;
  imc_counts: Record<string, number>;
  pa_inicial_counts: Record<string, number>;
  n_seguimientos_per_momento: number[];
  median_seguimientos_per_paciente: number;
}

export interface PercentileRow {
  momento: number;
  p10: number | null;
  p25: number | null;
  p50: number | null;
  p75: number | null;
  p90: number | null;
  n: number;
}

export interface CohortPercentiles {
  variable: string;
  by_outcome: Record<string, PercentileRow[]>;
}

export interface Alert {
  level: "red" | "amber";
  code: string;
  momento: number | null;
  message: string;
  variables: string[];
}

export interface AlertsResponse {
  alerts: Alert[];
  summary: { red: number; amber: number; green: number };
}

export interface SeguimientoUpsertBody {
  momento: number;
  peso_kg?: number | null;
  imc?: number | null;
  pas_mmhg?: number | null;
  pad_mmhg?: number | null;
  pam_mmhg?: number | null;
  cru_mg24h?: number | null;
  au_cru_mg24h?: number | null;
  sulf_cru?: number | null;
  sg_densidad?: number | null;
  au_sg_mg24h?: number | null;
  sulf_sg?: number | null;
  ph_orina?: number | null;
  fc_bpm?: number | null;
}

export type ChartVariable = "pas" | "pad" | "pam" | "imc" | "peso" | "fc" | "au_cru" | "ph" | "sg";
