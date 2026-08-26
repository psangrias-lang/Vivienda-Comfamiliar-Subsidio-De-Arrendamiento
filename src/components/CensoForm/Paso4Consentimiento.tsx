import React from 'react';
import type { CensoRegistro } from '../../types/censo';
import { ShieldCheck, Edit3, Lock, KeyRound } from 'lucide-react';

interface Paso4Props {
  formData: Omit<CensoRegistro, 'id' | 'fechaRegistro' | 'estadoAtencion'>;
  updateFormData: (fields: Partial<Paso4Props['formData']>) => void;
  goToStep: (step: number) => void;
  errors: Record<string, string>;
}

export const Paso4Consentimiento: React.FC<Paso4Props> = ({
  formData,
  updateFormData,
  goToStep,
  errors,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#003B70]" />
          <span>Paso 4: Resumen de Postulación y Declaración Juramentada</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Verifica los datos ingresados para la asignación del Subsidio de Arrendamiento Temporal y radicación ante Comfamiliar Risaralda.
        </p>
      </div>

      {/* Resumen Card */}
      <div className="bg-slate-50 rounded-3xl p-5 sm:p-6 border-2 border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-600" />
            <h4 className="font-black text-slate-900 text-sm">Resumen de la Solicitud</h4>
          </div>
          <span className="text-[11px] text-amber-950 font-black bg-amber-400 px-2.5 py-0.5 rounded-full">
            Listo para Radicar
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div className="space-y-1.5 p-3.5 rounded-2xl bg-white border border-slate-200">
            <div className="flex items-center justify-between text-slate-400 font-bold uppercase text-[10px]">
              <span>Datos del Titular</span>
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="text-[#003B70] hover:text-[#002447] flex items-center gap-1 font-bold capitalize"
              >
                <Edit3 className="w-3 h-3" /> Editar
              </button>
            </div>
            <p><strong>Nombre:</strong> {formData.nombresApellidos || 'No especificado'}</p>
            <p><strong>Documento:</strong> {formData.tipoDocumento} {formData.numeroDocumento || 'No especificado'}</p>
            <p><strong>Afiliación:</strong> {formData.estadoAfiliacion}</p>
            <p><strong>Categoría:</strong> {formData.categoriaAfiliacion}</p>
          </div>

          <div className="space-y-1.5 p-3.5 rounded-2xl bg-white border border-slate-200">
            <div className="flex items-center justify-between text-slate-400 font-bold uppercase text-[10px]">
              <span>Ubicación y Contacto</span>
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="text-[#003B70] hover:text-[#002447] flex items-center gap-1 font-bold capitalize"
              >
                <Edit3 className="w-3 h-3" /> Editar
              </button>
            </div>
            <p><strong>Municipio:</strong> {formData.municipio}</p>
            <p><strong>Barrio/Vereda:</strong> {formData.barrioVereda || 'No especificado'}</p>
            <p><strong>Dirección:</strong> {formData.direccionExacta || 'No especificado'}</p>
            <p><strong>Celular / WhatsApp:</strong> {formData.telefonoCelular} / {formData.telefonoWhatsapp}</p>
          </div>

          <div className="sm:col-span-2 space-y-1.5 p-3.5 rounded-2xl bg-white border border-slate-200">
            <div className="flex items-center justify-between text-slate-400 font-bold uppercase text-[10px]">
              <span>Diagnóstico & Solicitud de Arrendamiento</span>
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="text-[#003B70] hover:text-[#002447] flex items-center gap-1 font-bold capitalize"
              >
                <Edit3 className="w-3 h-3" /> Editar
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              <p><strong>Tenencia:</strong> {formData.tenenciaInmueble}</p>
              <p><strong>Nivel Daño:</strong> <span className="font-bold text-red-600">{formData.nivelDanio}</span></p>
              <p><strong>Habitantes:</strong> {formData.habitantesAfectados}</p>
              <p><strong>Evidencias:</strong> {formData.evidencias.length} archivo(s)</p>
            </div>
            {formData.requiereEvacuacionInmediata && (
              <p className="text-red-700 font-bold bg-red-50 p-2 rounded-xl">
                ⚠️ Solicita Subsidio de Arrendamiento Temporal de Emergencia por inmueble inhabitable.
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Habeas Data y Consentimiento Legal */}
      <div className="space-y-4 pt-2">
        
        {/* Checkbox 1: Habeas Data */}
        <div className={`p-4.5 rounded-2xl border-2 transition-all ${
          errors.autorizaTratamientoDatos ? 'border-red-500 bg-red-50/30' : 'border-slate-200 bg-white'
        }`}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.autorizaTratamientoDatos}
              onChange={(e) => updateFormData({ autorizaTratamientoDatos: e.target.checked })}
              className="w-4 h-4 text-[#003B70] rounded border-slate-300 focus:ring-[#003B70] shrink-0 mt-0.5"
            />
            <div className="text-xs text-slate-700 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-0.5">
                <Lock className="w-3.5 h-3.5 text-[#003B70]" />
                <span>Autorización de Tratamiento de Datos Personales (Ley 1581 de 2012) *</span>
              </div>
              Autorizo de manera libre, previa, expresa e informada a <strong>Comfamiliar Risaralda</strong> para recolectar, almacenar y tratar mis datos personales y los de mi grupo familiar con el propósito exclusivo de gestionar el Subsidio de Arrendamiento Temporal, la validación domiciliaria y el cruce con los organismos de socorro (DIGER / UNGRD).
            </div>
          </label>
          {errors.autorizaTratamientoDatos && (
            <p className="text-xs text-red-600 font-bold mt-2 ml-7">{errors.autorizaTratamientoDatos}</p>
          )}
        </div>

        {/* Checkbox 2: Declaración Juramentada */}
        <div className={`p-4.5 rounded-2xl border-2 transition-all ${
          errors.declaracionBajoJuramento ? 'border-red-500 bg-red-50/30' : 'border-slate-200 bg-white'
        }`}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.declaracionBajoJuramento}
              onChange={(e) => updateFormData({ declaracionBajoJuramento: e.target.checked })}
              className="w-4 h-4 text-[#003B70] rounded border-slate-300 focus:ring-[#003B70] shrink-0 mt-0.5"
            />
            <div className="text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 block mb-0.5">
                Declaración de Veracidad de la Información Bajo Juramento *
              </span>
              Declaro bajo la gravedad de juramento que cumplo con no poseer vivienda propia, no haber recibido subsidio anterior, tener ingresos familiares menores a 2 SMMLV y que las condiciones del inmueble y los hechos del sismo reportados son verídicos.
            </div>
          </label>
          {errors.declaracionBajoJuramento && (
            <p className="text-xs text-red-600 font-bold mt-2 ml-7">{errors.declaracionBajoJuramento}</p>
          )}
        </div>

      </div>
    </div>
  );
};
