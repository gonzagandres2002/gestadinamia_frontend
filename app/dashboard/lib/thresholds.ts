export interface FieldRange {
  key: string;
  label: string;
  unit: string;
  step: number;
  min?: number;
  max?: number;
  warnLow?: number;
  warnHigh?: number;
  redLow?: number;
  redHigh?: number;
  helper?: string;
}

export const FIELD_RANGES: Record<string, FieldRange> = {
  peso_kg: { key: "peso_kg", label: "Peso", unit: "kg", step: 0.1, min: 30, max: 200, helper: "Rango habitual 40–130 kg" },
  imc: { key: "imc", label: "IMC", unit: "kg/m²", step: 0.01, min: 12, max: 60, warnHigh: 30, helper: "≥30 = obesidad" },

  pas_mmhg: { key: "pas_mmhg", label: "PAS", unit: "mmHg", step: 1, min: 70, max: 220, warnHigh: 130, redHigh: 140, helper: "Normal <130 · HTA1 130–139 · HTA2 ≥140" },
  pad_mmhg: { key: "pad_mmhg", label: "PAD", unit: "mmHg", step: 1, min: 40, max: 130, warnHigh: 80, redHigh: 90, helper: "Normal <80 · HTA1 80–89 · HTA2 ≥90" },
  pam_mmhg: { key: "pam_mmhg", label: "PAM", unit: "mmHg", step: 0.1, min: 50, max: 150, warnHigh: 90, redHigh: 95, helper: "Calculada (PAS + 2·PAD)/3" },

  cru_mg24h: { key: "cru_mg24h", label: "Creatinina urinaria", unit: "mg/24h", step: 0.1, min: 100, max: 5000, helper: "Rango normal 200–4000" },
  au_cru_mg24h: { key: "au_cru_mg24h", label: "Albuminuria (AU/Cru)", unit: "mg/24h", step: 0.1, min: 0, max: 10000, warnHigh: 150, redHigh: 300, helper: "≥300 = proteinuria significativa" },
  sulf_cru: { key: "sulf_cru", label: "Sulfato (Cru)", unit: "", step: 0.001, min: 0, max: 50 },

  sg_densidad: { key: "sg_densidad", label: "Densidad urinaria (SG)", unit: "", step: 0.1, min: 1000, max: 1040, warnLow: 1005, warnHigh: 1030, helper: "Rango normal 1005–1030" },
  au_sg_mg24h: { key: "au_sg_mg24h", label: "Albúmina (SG)", unit: "mg/24h", step: 0.1, min: 0, max: 100 },
  sulf_sg: { key: "sulf_sg", label: "Sulfato (SG)", unit: "", step: 0.001, min: 0, max: 5 },

  ph_orina: { key: "ph_orina", label: "pH urinario", unit: "", step: 0.1, min: 4, max: 9, warnLow: 4.5, warnHigh: 8.0, helper: "Rango normal 4.5–8.0" },
  fc_bpm: { key: "fc_bpm", label: "Frec. cardíaca", unit: "bpm", step: 1, min: 40, max: 180, warnHigh: 110, helper: "Rango habitual 60–110 bpm" },
};

export function valueZone(field: string, value: number | null | undefined): "ok" | "warn" | "danger" {
  if (value == null) return "ok";
  const r = FIELD_RANGES[field];
  if (!r) return "ok";
  if (r.redHigh !== undefined && value >= r.redHigh) return "danger";
  if (r.redLow !== undefined && value <= r.redLow) return "danger";
  if (r.warnHigh !== undefined && value >= r.warnHigh) return "warn";
  if (r.warnLow !== undefined && value <= r.warnLow) return "warn";
  return "ok";
}

export const EDAD_LABELS: Record<string, string> = {
  "1": "<20 años (joven)",
  "2": "20–35 años (adulta)",
  "3": ">35 años (añosa)",
};

export const ETNIA_LABELS: Record<string, string> = {
  mest: "Mestiza",
  Afro: "Afrocolombiana",
  indg: "Indígena",
  N: "No especificada",
  E: "Extranjera",
  ND: "No determinada",
};

export const IMC_LABELS: Record<string, string> = {
  Bp: "Bajo peso",
  Ad: "Adecuado",
  Sp: "Sobrepeso",
  Ob: "Obesidad",
};

export const PA_INICIAL_LABELS: Record<string, string> = {
  N: "Normal",
  E: "Elevada",
  HTA1: "HTA grado 1",
  HTA2: "HTA grado 2",
};

export const GESTAS_LABELS: Record<string, string> = {
  "1": "Primípara",
  "2": "1 gesta previa",
  "3": "2–3 previas",
  "4": "≥4 previas",
};

export const VARIABLE_META: Record<string, { label: string; unit: string; field: string }> = {
  pas: { label: "PAS", unit: "mmHg", field: "pas_mmhg" },
  pad: { label: "PAD", unit: "mmHg", field: "pad_mmhg" },
  pam: { label: "PAM", unit: "mmHg", field: "pam_mmhg" },
  imc: { label: "IMC", unit: "kg/m²", field: "imc" },
  peso: { label: "Peso", unit: "kg", field: "peso_kg" },
  fc: { label: "Frec. cardíaca", unit: "bpm", field: "fc_bpm" },
  au_cru: { label: "Albuminuria", unit: "mg/24h", field: "au_cru_mg24h" },
  ph: { label: "pH urinario", unit: "", field: "ph_orina" },
  sg: { label: "Densidad urinaria", unit: "", field: "sg_densidad" },
};
