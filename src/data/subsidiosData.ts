import type { ModalidadSubsidio } from '../types/censo';

export const MODALIDADES_SUBSIDIO: ModalidadSubsidio[] = [
  {
    id: 'subsidio-arrendamiento',
    titulo: 'Subsidio de Arrendamiento Temporal',
    subtitulo: 'Aporte económico para canon de arrendamiento mensual por 6 meses',
    tag: 'Prioridad Gerencial',
    montoMaximo: 'Hasta 0.6 SMMLV mensual ($1.050.543 COP aprox.)',
    descripcion: 'Aporte transitorio otorgado por Comfamiliar Risaralda para hogares afiliados con ingresos menores o iguales a 2 SMMLV (Categoría A, hasta $3.501.810 COP), cubriendo hasta el 90% del canon de arrendamiento en el perímetro urbano de Risaralda.',
    dirigidoA: 'Hogares afiliados (persona sola o núcleo familiar) que no tengan vivienda propia y requieran apoyo temporal de arrendamiento por un término máximo de 6 meses continuos.',
    requisitosPrincipales: [
      'Afiliado al día: Dependientes (≥ 2 meses de aportes continuos), Pensionados 2% (≥ 12 meses continuos), Independientes 2% (≥ 12 meses de aportes).',
      'Ingresos del grupo familiar menores o iguales a 2 SMMLV (Categoría A: hasta $3.501.810 COP).',
      'No ser propietarios ni poseedores de vivienda en el territorio nacional.',
      'No haber sido beneficiario de subsidio familiar de vivienda antes.',
      'Conformación de hogar: Persona sola (soltero) o núcleo familiar consolidado (casado o unión libre).',
      'Valor del subsidio: Hasta 0.6 SMMLV ($1.050.543 COP/mes) y en ningún caso superar el 90% del canon pactado.',
      'Vivienda urbana independiente, con servicios públicos de acueducto y energía, y canon ≤ 1% del tope VIS (135 SMMLV, máx. $2.363.722 COP).'
    ],
    documentosRequeridos: [
      'Formulario de postulación diligenciado + fotocopia legible y ampliada de cédulas de mayores de 18 años.',
      'Registro civil de nacimiento de cada menor integrante del grupo familiar.',
      'Certificados de ingresos: Laboral < 30 días (dependientes), Certificación contador + TP + antecedentes JCC < 30 días (independientes), o último desprendible de pensión (pensionados).',
      'Estado civil: Solteros (ninguno), Casados (registro civil de matrimonio), Unión de hecho (escritura, sentencia o acta conciliación), Divorciados (registro civil con nota de liquidación sociedad conyugal).',
      'Certificación médica EPS en caso de miembros con discapacidad.',
      'Vivienda: Certificado de Tradición y Libertad (< 30 días), Impuesto Predial del año actual cancelado, Identificación del propietario y Formato de Solicitud de Arrendamiento.'
    ],
    icono: 'KeyRound',
    colorTheme: 'amber'
  },
  {
    id: 'vivienda-nueva',
    titulo: 'Vivienda Nueva (VIS / VIP)',
    subtitulo: 'Adquisición de vivienda de interés social o prioritario',
    tag: 'Fondo FOVIS',
    montoMaximo: 'Hasta 30 SMMLV ($52.527.150 COP aprox.)',
    descripcion: 'Aporte en dinero otorgado por una sola vez al hogar beneficiario, para facilitar la adquisición de una vivienda nueva de Interés Social (VIS) o de Interés Prioritario (VIP) en el departamento de Risaralda.',
    dirigidoA: 'Hogares afiliados con ingresos totales menores a 4 SMMLV ($7.003.620 COP) que no tengan vivienda propia en el territorio nacional.',
    requisitosPrincipales: [
      'Estar afiliado a Comfamiliar Risaralda (trabajador activo, independiente o pensionado aportante).',
      'Ingresos del hogar no superiores a 4 Salarios Mínimos Mensuales Legales Vigentes (hasta $7.003.620 COP).',
      'Ninguno de los integrantes del hogar postulante puede ser propietario de vivienda.',
      'No haber sido beneficiario de subsidio familiar de vivienda anteriormente.',
      'Contar con una cuenta de ahorro programado o cesantías inmovilizadas.',
      'Carta de preaprobación de crédito hipotecario o leasing habitacional.'
    ],
    documentosRequeridos: [
      'Formulario de postulación debidamente diligenciado y firmado.',
      'Fotocopia legible de los documentos de identidad de todos los miembros del hogar.',
      'Certificados laborales actualizados (no mayor a 30 días) o certificado de ingresos suscrito por contador público.',
      'Certificado de cuenta de ahorro programado o inmovilización de cesantías.',
      'Carta de preaprobación de crédito con fecha no mayor a 60 días.'
    ],
    icono: 'Home',
    colorTheme: 'blue'
  },
  {
    id: 'mejoramiento-vivienda',
    titulo: 'Mejoramiento de Vivienda',
    subtitulo: 'Reparación estructural, cubiertas, pisos, baños y redes',
    tag: 'Fondo FOVIS',
    montoMaximo: 'Hasta 11.5 SMMLV ($20.135.408 COP aprox.)',
    descripcion: 'Subsidio destinado a subsanar una o varias carencias básicas de la vivienda: saneamiento básico, pisos, cubiertas, reforzamiento estructural o adecuación de redes hidrosanitarias y eléctricas.',
    dirigidoA: 'Hogares afiliados propietarios de vivienda cuyas condiciones habitacionales o estructurales requieran intervención y mejoramiento prioritario.',
    requisitosPrincipales: [
      'Ser propietario de la vivienda a intervenir con título debidamente registrado.',
      'La vivienda no debe estar localizada en zonas de riesgo o servidumbre no mitigable.',
      'Estar al día con el impuesto predial unificado.',
      'Diagnóstico técnico o peritaje que justifique las obras de mejoramiento y seguridad.',
      'Ingresos familiares menores a 4 SMMLV ($7.003.620 COP).'
    ],
    documentosRequeridos: [
      'Certificado de Tradición y Libertad del inmueble objeto de mejora (< 30 días).',
      'Fotocopia del impuesto predial cancelado del año en curso.',
      'Diagnóstico de vulnerabilidad o afectación (acta de visita técnica de DIGER/CMGRD si aplica).',
      'Presupuesto detallado de las mejoras firmado por maestro/ingeniero.',
      'Documentos de identidad de los integrantes del hogar.'
    ],
    icono: 'Wrench',
    colorTheme: 'amber'
  },
  {
    id: 'construccion-sitio-propio',
    titulo: 'Construcción en Sitio Propio',
    subtitulo: 'Edificación en lote o terraza propia',
    tag: 'Fondo FOVIS',
    montoMaximo: 'Hasta 18 SMMLV ($31.516.290 COP aprox.)',
    descripcion: 'Modalidad orientada a la edificación de una solución habitacional sobre un lote, terraza o predio sin construir que pertenezca al postulante o a un miembro de su hogar.',
    dirigidoA: 'Familias propietarias de un terreno o terraza que requieran construir una vivienda digna y segura bajo norma sismorresistente NSR-10.',
    requisitosPrincipales: [
      'Escritura pública y Certificado de Tradición y Libertad del lote o terraza (no mayor a 30 días).',
      'El predio debe estar libre de gravámenes, hipotecas, embargos o zonas de alto riesgo no mitigable.',
      'Contar con licencia de construcción vigente aprobada por curaduría o secretaría de planeación.',
      'Planos arquitectónicos y estructurales avalados por un ingeniero titulado.',
      'Presupuesto de obra detallado firmado por el profesional responsable.'
    ],
    documentosRequeridos: [
      'Certificado de Tradición y Libertad del predio (máximo 30 días de expedición).',
      'Copia de la escritura pública del inmueble.',
      'Licencia de construcción expedida por autoridad competente.',
      'Presupuesto y cronograma de obra suscrito por ingeniero/arquitecto.',
      'Documentos de identidad de los integrantes del hogar.'
    ],
    icono: 'Hammer',
    colorTheme: 'blue'
  }
];

export const TOPES_INGRESOS_2026 = {
  smmlv: 1750905,
  catA: {
    nombre: 'Categoría A',
    descripcion: 'Hogares con ingresos de 0 a 2 SMMLV (Hasta $3.501.810 COP)',
    subsidioArrendamiento: 'Hasta 0.6 SMMLV mensual por 6 meses ($1.050.543/mes)',
    subsidioMaximoVIS: 'Hasta 30 SMMLV ($52.527.150 COP)',
    prioridad: 'Aplica a Subsidio de Arrendamiento Temporal y máxima prioridad FOVIS'
  },
  catB: {
    nombre: 'Categoría B',
    descripcion: 'Hogares con ingresos de 2 a 4 SMMLV (De $3.501.811 a $7.003.620 COP)',
    subsidioArrendamiento: 'No aplica a Subsidio de Arrendamiento (exclusivo ≤ 2 SMMLV)',
    subsidioMaximoVIS: 'Hasta 20 SMMLV ($35.018.100 COP)',
    prioridad: 'Aplica a Vivienda Nueva, Mejoramiento y Construcción en Sitio Propio'
  },
  catC: {
    nombre: 'Categoría C',
    descripcion: 'Hogares con ingresos superiores a 4 SMMLV (Más de $7.003.620 COP)',
    subsidioArrendamiento: 'No aplica para subsidios monetarios directos',
    subsidioMaximoVIS: 'No aplica para subsidio monetario directo FOVIS ordinario',
    prioridad: 'Acceso a líneas de Crédito de Vivienda y convenios de ahorro'
  }
};

export const PREGUNTAS_FRECUENTES_SUBSIDIO = [
  {
    pregunta: '¿Cuáles son los requisitos clave para acceder al Subsidio de Arrendamiento Temporal?',
    respuesta: 'Según el Manual de Operación Gerencial de Comfamiliar Risaralda: 1) Estar afiliado al día (dependientes mínimo 2 meses continuos, pensionados 2% mínimo 12 meses, independientes 2% mínimo 12 meses); 2) Ingresos familiares menores o iguales a 2 SMMLV (Categoría A: hasta $3.501.810 COP); 3) No ser propietarios ni poseedores de vivienda; 4) No haber recibido subsidio de vivienda previo; 5) Vivienda urbana independiente con canon ≤ 1% del tope VIS (máx. $2.363.722 COP) y servicios de acueducto y energía.'
  },
  {
    pregunta: '¿Cuál es el monto máximo del subsidio de arrendamiento y por cuánto tiempo se otorga?',
    respuesta: 'El subsidio otorga hasta 0.6 SMMLV mensual ($1.050.543 COP) por un término máximo de seis (6) meses continuos transitorios (hasta $6.303.258 COP en total). En ningún caso el subsidio podrá superar el 90% del valor total del canon de arrendamiento pactado con el propietario en el contrato.'
  },
  {
    pregunta: '¿Cómo participan las empresas aportantes en el censo y caracterización de sus colaboradores?',
    respuesta: 'Las empresas registradas en Comfamiliar ingresan al Portal de Empresas con su NIT, Razón Social, Teléfono y Correo. Reciben un código de 6 dígitos (válido 15 min) y generan un enlace personalizado único (con token oficial en Google Apps Script) para compartirlo por WhatsApp, correo o código QR en carteleras. Pueden consultar en tiempo real el resumen de colaboradores afectados respetando el marco de Habeas Data.'
  },
  {
    pregunta: '¿Qué condiciones debe cumplir el inmueble que voy a arrendar en Risaralda?',
    respuesta: 'El inmueble debe: 1) Estar ubicado exclusivamente en el perímetro urbano de municipios de Risaralda; 2) Ser nuevo o usado en buen estado; 3) Certificado de Tradición y Libertad libre de embargos o limitaciones (solo se permite hipoteca de compra); 4) Ser una unidad independiente y habitable de inmediato; 5) Contar con servicios básicos de acueducto y energía en funcionamiento; 6) Canon mensual ≤ 1% del tope máximo VIS de 135 SMMLV ($2.363.722 COP).'
  },
  {
    pregunta: '¿Qué documentos se deben presentar para legalizar el subsidio de arrendamiento?',
    respuesta: 'Por el Hogar: Formulario de postulación diligenciado, fotocopia de cédulas de mayores de 18 años, registro civil de menores, certificado de ingresos (laboral < 30 días, contador para independientes o desprendible de pensión), documentos de estado civil (matrimonio, unión de hecho o divorcio si aplica) y certificado médico EPS por discapacidad. Por la Vivienda: Certificado de Tradición (< 30 días), Impuesto Predial del año actual cancelado, copia de cédula del arrendador (o Cámara de Comercio) y Formato de Solicitud de Arrendamiento.'
  },
  {
    pregunta: '¿Tiene algún costo la postulación al subsidio o el censo en Comfamiliar Risaralda?',
    respuesta: 'El trámite es 100% GRATUITO. Comfamiliar Risaralda no utiliza intermediarios ni cobra por formularios, radicaciones ni visitas domiciliarias de validación.'
  }
];
