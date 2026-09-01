export type TipoDocumento = 'CC' | 'CE' | 'PPT' | 'TI' | 'PAS';

export type EstadoAfiliacion = 
  | 'Afiliado activo trabajador'
  | 'Afiliado independiente/pensionado'
  | 'Beneficiario de afiliado'
  | 'No afiliado / Comunidad general';

export type CategoriaAfiliacion = 
  | 'Igual o menor a 2 SMMLV'
  | 'De 2 a 4 SMMLV'
  | 'Más de 4 SMMLV'
  | 'No sabe / Por verificar';

export type TenenciaInmueble = 
  | 'Propia (con escritura pública)'
  | 'En proceso de pago / Crédito hipotecario'
  | 'Arrendada'
  | 'Familiar / Cesión / Posesión sin título'
  | 'Lote o terraza propia';

export type NivelDanio = 'Leve' | 'Moderado' | 'Severo';

export type EstadoVisitaDIGER = 'Sí, cuenta con acta' | 'No ha sido visitado' | 'En espera de visita programada';

export interface EvidenciaArchivo {
  id: string;
  nombre: string;
  tamano: string;
  tipo: string;
  previewUrl?: string;
}

export interface CensoRegistro {
  id: string; // Radicado e.g. RAD-SISMO-2026-8492
  fechaRegistro: string; // ISO String
  
  // Paso 1: Identificación
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  nombresApellidos: string;
  estadoAfiliacion: EstadoAfiliacion;
  categoriaAfiliacion: CategoriaAfiliacion;
  empresaDondeLabora?: string;
  
  // Paso 2: Localización y Contacto
  municipio: string;
  barrioVereda: string;
  direccionExacta: string;
  telefonoCelular: string;
  telefonoWhatsapp: string;
  correoElectronico: string;
  puntoReferencia?: string;

  // Paso 3: Afectación
  tenenciaInmueble: TenenciaInmueble;
  nivelDanio: NivelDanio;
  estadoVisitaDIGER: EstadoVisitaDIGER;
  numeroActaDIGER?: string;
  descripcionDanios: string;
  habitantesAfectados: number;
  hayMenoresOAdultosMayores: boolean;
  requiereEvacuacionInmediata: boolean;
  evidencias: EvidenciaArchivo[];

  // Paso 4: Consentimiento
  autorizaTratamientoDatos: boolean;
  declaracionBajoJuramento: boolean;

  // Metadata Admin
  estadoAtencion: 'Pendiente Diagnóstico' | 'En Verificación Técnica' | 'Visita Programada' | 'Priorizado para Subsidio' | 'Cerrado/Atendido';
  observacionesTecnicas?: string;
}

export interface ModalidadSubsidio {
  id: string;
  titulo: string;
  subtitulo: string;
  tag: string;
  montoMaximo: string;
  descripcion: string;
  dirigidoA: string;
  requisitosPrincipales: string[];
  documentosRequeridos: string[];
  icono: string;
  colorTheme: string;
}
