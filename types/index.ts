export type NivelEducativo = 'primaria' | 'secundaria' | 'adultos' | 'educacion-especial';

export interface SchoolRecord {
  nombreEscuela: string;
  numero: string;
  correo: string;
  seccion: string;
  nivel: NivelEducativo;
}

export interface PrimariaMatriculas {
  matricula1: string;
  matricula2: string;
  matricula3: string;
  matricula4: string;
  matricula5: string;
  matricula6: string;
  matricula7: string;
  ausentes1: string;
  ausentes2: string;
  ausentes3: string;
  ausentes4: string;
  ausentes5: string;
  ausentes6: string;
  ausentes7: string;
  familiasAusentes: string;
}

export interface SecundariaMatriculas {
  matricula1: string;
  matricula2: string;
  matricula3: string;
  matricula4: string;
  matricula5: string;
  matricula6: string;
  ausentes1: string;
  ausentes2: string;
  ausentes3: string;
  ausentes4: string;
  ausentes5: string;
  ausentes6: string;
  familiasAusentes: string;
}

export interface AdultosMatriculas {
  matricula1: string;
  matricula2: string;
  matricula3: string;
  ausentes1: string;
  ausentes2: string;
  ausentes3: string;
  familiasAusentes: string;
}

export interface EducacionEspecialMatriculas {
  matricula1: string;
  ausentes1: string;
  familiasAusentes: string;
}

export type MatriculasData = PrimariaMatriculas | SecundariaMatriculas | AdultosMatriculas | EducacionEspecialMatriculas;

export interface FollowUpFormData {
  nombreResponsable: string;
  emailResponsable: string;
  telefonoResponsable: string;
  cantidadFamiliasSeguimiento: string;
  cantidadFirmaronActa: string;
  cantidadNoContactadas: string;
  descripcionAcciones: string;
  tipoGestion: string;
  modalidad: string;
  'sedeSupervisión': string;
  departamento: string;
  escuela: string;
  nombreEstablecimiento: string;
  correoElectronico: string;
  nivel: string;
}

export const DEPARTAMENTOS_MENDOZA = [
  'Capital',
  'General Alvear',
  'Godoy Cruz',
  'Guaymallén',
  'Junín',
  'La Paz',
  'Las Heras',
  'Lavalle',
  'Luján de Cuyo',
  'Maipú',
  'Malargüe',
  'Rivadavia',
  'San Carlos',
  'San Martín',
  'San Rafael',
  'Santa Rosa',
  'Tunuyán',
  'Tupungato',
] as const;

export type SearchState = 'idle' | 'loading' | 'success' | 'error';

export interface SearchResult {
  school: SchoolRecord;
  matriculas: MatriculasData;
}

export interface ApiSearchResponse {
  ok: boolean;
  data?: SearchResult;
  error?: string;
}

export interface ApiSubmitResponse {
  ok: boolean;
  error?: string;
}

export interface FormErrors {
  nombreResponsable?: string;
  emailResponsable?: string;
  telefonoResponsable?: string;
  cantidadFamiliasSeguimiento?: string;
  cantidadFirmaronActa?: string;
  cantidadNoContactadas?: string;
  descripcionAcciones?: string;
}
