import React, { useState } from 'react';
import { 
  KeyRound, Building2, Clock, ShieldCheck, CheckCircle2, 
  FileText, DollarSign, Calendar
} from 'lucide-react';

interface SubsidioArrendamientoSectionProps {
  onStartPostulacion?: () => void;
  onOpenCronograma?: () => void;
}

export const SubsidioArrendamientoSection: React.FC<SubsidioArrendamientoSectionProps> = ({
  onOpenCronograma,
}) => {
  const [activeTabDoc, setActiveTabDoc] = useState<'hogar' | 'vivienda'>('hogar');

  return (
    <section id="arrendamiento-manual" className="py-20 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner Portada del Manual Gerencial */}
        <div className="bg-gradient-to-r from-[#002447] via-[#003B70] to-[#0A4B8F] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border-2 border-amber-400/40">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none"></div>
          
          <div className="relative max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
              <KeyRound className="w-4 h-4 text-slate-950" />
              <span>Manual de Operación Gerencial</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Subsidio de Arrendamiento Temporal
            </h2>

            <p className="text-base sm:text-lg text-amber-100/90 font-medium">
              Guía oficial de postulación, asignación y desembolso del aporte económico para canon de arrendamiento en el departamento de Risaralda.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold text-slate-200">
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                Ingresos iguales o menores a 2 SMMLV
              </span>
              <span className="bg-amber-400/20 text-amber-300 px-3 py-1.5 rounded-xl border border-amber-400/30">
                Valor: Hasta 0.6 SMMLV Mensual
              </span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                Duración: 6 Meses Continuos
              </span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                Vigilado Supersubsidio
              </span>
            </div>

            {onOpenCronograma && (
              <div className="pt-2">
                <button
                  onClick={onOpenCronograma}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>Consultar Cronograma Oficial y Fechas 2026</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 1. REQUISITOS, VALOR Y DURACIÓN (Slide 2 del Manual) */}
        <div>
          {/* Banner destacado de Convocatorias y Fechas 2026 */}
          <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-[#003B70] to-[#002447] text-white border-2 border-amber-400/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-left">
              <div className="p-3.5 rounded-2xl bg-amber-400 text-slate-950 font-black shrink-0 shadow-md">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 block">
                  Convocatorias y Calendario de Postulación
                </span>
                <h4 className="text-base sm:text-lg font-black text-white">
                  Cronograma Oficial de Subsidios 2026
                </h4>
                <p className="text-xs text-slate-200 mt-0.5">
                  Revisa las 3 rondas del Subsidio de Arrendamiento y la postulación al Componente Rural.
                </p>
              </div>
            </div>

            {onOpenCronograma && (
              <button
                onClick={onOpenCronograma}
                className="w-full md:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Ver Fechas y Cronograma 2026</span>
              </button>
            )}
          </div>

          <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Requisitos, Valor y Duración
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Tarjeta 1: Requisitos del Hogar */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="p-2.5 rounded-2xl bg-[#003B70] text-amber-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-[#003B70]">Requisitos del Hogar</h4>
                </div>

                <div className="mt-5 space-y-3.5 text-xs sm:text-sm text-slate-700">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <strong className="text-slate-900 block font-bold mb-1">
                      1. Afiliado Comfamiliar Risaralda al día:
                    </strong>
                    <ul className="space-y-1 text-slate-600 pl-2">
                      <li>• <strong>Dependientes:</strong> Mínimo 2 meses de aportes continuos.</li>
                      <li>• <strong>Pensionados 2%:</strong> Mínimo 12 meses continuos.</li>
                      <li>• <strong>Independientes 2%:</strong> Mínimo 12 meses de aportes.</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <strong className="text-slate-900 block font-bold">2. Ingresos del grupo familiar:</strong>
                    <span className="text-slate-600">Menores o iguales a 2 Salarios Mínimos</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <strong className="text-slate-900 block font-bold">3. No ser propietarios ni poseedores:</strong>
                    <span className="text-slate-600">Ningún miembro del hogar puede tener vivienda propia.</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <strong className="text-slate-900 block font-bold">4. Sin subsidio de vivienda previo:</strong>
                    <span className="text-slate-600">No haber sido beneficiario anteriormente de subsidios de vivienda</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <strong className="text-slate-900 block font-bold">5. Conformación de hogar:</strong>
                    <span className="text-slate-600">Persona sola (soltero) o núcleo familiar consolidado (casado o unión libre).</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta 2: Valor del Subsidio */}
            <div className="lg:col-span-4 bg-gradient-to-br from-amber-50 via-white to-amber-100/50 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-amber-200">
                  <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-black">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-[#003B70]">Valor del Subsidio</h4>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="p-4 rounded-2xl bg-amber-400/20 border border-amber-300 text-center">
                    <span className="text-xs font-black uppercase text-amber-900 tracking-wider">Monto Asignado</span>
                    <div className="text-3xl font-black text-[#003B70] mt-1">
                      Hasta 0.6 SMMLV
                    </div>
                    <span className="text-xs font-bold text-amber-800 block mt-1">
                      ($1.050.543 COP por mes)
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>El valor asignado corresponde al máximo de <strong>0.6 salarios mínimos legales mensuales vigentes</strong> en el año de asignación.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Regla de tope:</strong> En ningún caso el subsidio podrá superar el <strong>90% del valor total del canon</strong> de arrendamiento pactado con el propietario en el contrato.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200/80 text-[11px] text-amber-950 font-medium">
                💡 Ejemplo: Para un canon de $700.000, el subsidio cubrirá hasta el 90% ($630.000).
              </div>
            </div>

            {/* Tarjeta 3: Duración del Subsidio */}
            <div className="lg:col-span-3 bg-gradient-to-br from-[#003B70] to-[#002447] text-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-white/20">
                  <div className="p-2.5 rounded-2xl bg-amber-400 text-slate-950">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-amber-300">Duración</h4>
                </div>

                <div className="mt-6 text-center py-4 bg-white/10 rounded-2xl border border-white/10">
                  <span className="text-xs font-bold uppercase text-amber-200">Término Máximo</span>
                  <div className="text-4xl font-black text-white mt-1">
                    6 Meses
                  </div>
                  <span className="text-xs text-slate-300">Continuos y Transitorios</span>
                </div>

                <div className="mt-5 space-y-3 text-xs text-slate-200 leading-relaxed">
                  <p>
                    • El subsidio de arrendamiento temporal es de <strong>carácter transitorio</strong> y se otorgará por un término máximo de seis (6) meses continuos.
                  </p>
                  <p className="p-2.5 rounded-xl bg-amber-400/20 border border-amber-300/30 text-amber-200">
                    <strong>Nota:</strong> Comfamiliar Risaralda podrá realizar <strong>visitas domiciliarias</strong> para la validación de cumplimiento de requisitos del hogar.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 2. CONDICIONES DE LA VIVIENDA (Slide 3 del Manual) */}
        <div id="condiciones-vivienda" className="scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Condiciones de la Vivienda
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              La vivienda a postular en Pereira, Dosquebradas o municipios de Risaralda debe cumplir unos requisitos para ser aprobada.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Condición 1 */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-[#003B70] shadow-sm transition-all group">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#003B70] flex items-center justify-center font-black text-sm mb-4 group-hover:bg-[#003B70] group-hover:text-amber-400 transition-colors">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900">1. Vivienda Urbana</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Aplica <strong>exclusivamente para inmuebles ubicados en el perímetro urbano</strong> de los municipios del departamento de Risaralda.
              </p>
            </div>

            {/* Condición 2 */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-[#003B70] shadow-sm transition-all group">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#003B70] flex items-center justify-center font-black text-sm mb-4 group-hover:bg-[#003B70] group-hover:text-amber-400 transition-colors">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900">2. Estado del Inmueble</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Las viviendas objeto de arrendamiento pueden ser <strong>nuevas o usadas</strong>, en buen estado de conservación.
              </p>
            </div>

            {/* Condición 3 */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-[#003B70] shadow-sm transition-all group">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#003B70] flex items-center justify-center font-black text-sm mb-4 group-hover:bg-[#003B70] group-hover:text-amber-400 transition-colors">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900">3. Título de Propiedad</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Certificado de tradición y libertad <strong>libre de embargos o limitaciones</strong> al dominio. Solo se permite hipoteca de compra.
              </p>
            </div>

            {/* Condición 4 */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-[#003B70] shadow-sm transition-all group">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#003B70] flex items-center justify-center font-black text-sm mb-4 group-hover:bg-[#003B70] group-hover:text-amber-400 transition-colors">
                4
              </div>
              <h4 className="text-base font-bold text-slate-900">4. Unidad Independiente</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Debe ser una <strong>vivienda independiente y apta para habitar de forma inmediata</strong> con acceso propio y privacidad.
              </p>
            </div>

            {/* Condición 5 */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-[#003B70] shadow-sm transition-all group">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#003B70] flex items-center justify-center font-black text-sm mb-4 group-hover:bg-[#003B70] group-hover:text-amber-400 transition-colors">
                5
              </div>
              <h4 className="text-base font-bold text-slate-900">5. Servicios Básicos</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Debe contar obligatoriamente con <strong>servicios públicos de acueducto, alcantarillado y energía</strong> en pleno funcionamiento.
              </p>
            </div>

            {/* Condición 6 */}
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/20 p-6 rounded-3xl border-2 border-amber-400 shadow-sm group">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm mb-4">
                6
              </div>
              <h4 className="text-base font-black text-[#003B70]">6. Canon Máximo Permitido</h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                El canon de arrendamiento mensual <strong>no debe superar el 1% del tope máximo de la VIS (135 SMMLV)</strong>. Para el año en curso: canon hasta $2.363.722 COP.
              </p>
            </div>

          </div>
        </div>

        {/* 3. DOCUMENTOS DE POSTULACIÓN (Slide 4 del Manual) */}
        <div id="documentos-postulacion" className="scroll-mt-24">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-lg space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#003B70] bg-blue-100 px-3 py-1 rounded-full">
                  Documentación Obligatoria
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  Documentos de Postulación del Hogar y de la Vivienda
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Requisitos de acreditación de identidad, estado civil, ingresos y legalidad del inmueble.
                </p>
              </div>

              {/* Selector de Pestañas */}
              <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl shrink-0">
                <button
                  onClick={() => setActiveTabDoc('hogar')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTabDoc === 'hogar'
                      ? 'bg-[#003B70] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Documentos del Hogar</span>
                </button>

                <button
                  onClick={() => setActiveTabDoc('vivienda')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTabDoc === 'vivienda'
                      ? 'bg-[#003B70] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Documentos Inmueble & Arrendador</span>
                </button>
              </div>
            </div>

            {/* Tabla Documentos Hogar */}
            {activeTabDoc === 'hogar' && (
              <div className="overflow-x-auto animate-fade-in">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-black text-[11px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-4 w-1/4">Categoría Familiar</th>
                      <th className="px-5 py-4">Documentos Obligatorios Requeridos</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    <tr>
                      <td className="px-5 py-4 font-bold text-[#003B70]">General Hogar</td>
                      <td className="px-5 py-4">
                        Formulario de postulación diligenciado. Fotocopia legible y ampliada de las cédulas de los mayores de 18 años.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-bold text-[#003B70]">Menores de Edad</td>
                      <td className="px-5 py-4">
                        Registro civil de nacimiento de cada menor integrante del grupo familiar.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-bold text-[#003B70]">Ingresos por Tipo</td>
                      <td className="px-5 py-4 space-y-1">
                        <div>• <strong>Dependientes:</strong> Certificado laboral no mayor a 30 días de quienes laboren.</div>
                        <div>• <strong>Independientes:</strong> Certificación de contador público + tarjeta profesional + antecedentes disciplinarios JCC (expedición no mayor a 30 días).</div>
                        <div>• <strong>Pensionados:</strong> Fotocopia del último desprendible de pago de pensión.</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-bold text-[#003B70]">Estado Civil</td>
                      <td className="px-5 py-4 space-y-1">
                        <div>• <strong>Solteros:</strong> Ningún documento.</div>
                        <div>• <strong>Casados:</strong> Registro civil de matrimonio.</div>
                        <div>• <strong>Unión de hecho:</strong> Escritura pública, Sentencia judicial o Acta de conciliación.</div>
                        <div>• <strong>Divorciados:</strong> Registro civil con nota de liquidación sociedad conyugal.</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-bold text-[#003B70]">Caso Discapacidad</td>
                      <td className="px-5 py-4">
                        Certificación médica oficial expedida exclusivamente por la EPS del integrante (no se acepta declaración extra proceso).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Tabla Documentos Vivienda / Arrendador */}
            {activeTabDoc === 'vivienda' && (
              <div className="overflow-x-auto animate-fade-in">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-black text-[11px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-4 w-1/4">Documento Vivienda</th>
                      <th className="px-5 py-4">Especificaciones y Requisitos de Validación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    <tr>
                      <td className="px-5 py-4 font-bold text-[#003B70]">Certificado Tradición</td>
                      <td className="px-5 py-4">
                        Certificado de Tradición y Libertad vigente con expedición no mayor a treinta (30) días.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-bold text-[#003B70]">Impuesto Predial</td>
                      <td className="px-5 py-4">
                        Copia legible del Impuesto Predial unificado correspondiente al año actual.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-bold text-[#003B70]">Identificación Propietario</td>
                      <td className="px-5 py-4 space-y-1">
                        <div>Copia legible de identificación del propietario/arrendador:</div>
                        <div>• <strong>Persona natural:</strong> Copia de la cédula de ciudadanía.</div>
                        <div>• <strong>Persona jurídica:</strong> Certificado de Cámara de Comercio y copia de cédula del Representante Legal.</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-bold text-[#003B70]">Formato de Solicitud</td>
                      <td className="px-5 py-4">
                        Formato de solicitud de Subsidio de Arrendamiento diligenciado donde se pacta el canon de arrendamiento para el cálculo del subsidio.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
