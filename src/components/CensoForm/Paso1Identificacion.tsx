import React from 'react';
import type { TipoDocumento, EstadoAfiliacion, CategoriaAfiliacion } from '../../types/censo';
import { User, CreditCard, Building2 } from 'lucide-react';

interface Paso1Props {
  formData: {
    tipoDocumento: TipoDocumento;
    numeroDocumento: string;
    nombresApellidos: string;
    estadoAfiliacion: EstadoAfiliacion;
    categoriaAfiliacion: CategoriaAfiliacion;
    empresaDondeLabora?: string;
  };
  updateFormData: (fields: Partial<Paso1Props['formData']>) => void;
  errors: Record<string, string>;
}

export const Paso1Identificacion: React.FC<Paso1Props> = ({
  formData,
  updateFormData,
  errors,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-[#003B70]" />
          <span>Paso 1: Identificación del Titular y Estado de Afiliación</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Ingresa los datos personales del titular postulante para validación de aportes en el sistema Comfamiliar Risaralda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        
        {/* Tipo de Documento */}
        <div className="sm:col-span-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Tipo de Documento <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.tipoDocumento}
            onChange={(e) => updateFormData({ tipoDocumento: e.target.value as TipoDocumento })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:ring-2 focus:ring-[#003B70] focus:border-[#003B70] outline-none transition-all"
          >
            <option value="CC">Cédula de Ciudadanía (CC)</option>
            <option value="CE">Cédula de Extranjería (CE)</option>
            <option value="PPT">Permiso por Protección Temporal (PPT)</option>
            <option value="TI">Tarjeta de Identidad (TI)</option>
            <option value="PAS">Pasaporte (PAS)</option>
          </select>
        </div>

        {/* Número de Identificación */}
        <div className="sm:col-span-8">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Número de Identificación <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Ej. 1088294712"
              value={formData.numeroDocumento}
              onChange={(e) => updateFormData({ numeroDocumento: e.target.value.replace(/[^0-9a-zA-Z]/g, '') })}
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm font-medium focus:ring-2 outline-none transition-all ${
                errors.numeroDocumento
                  ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                  : 'border-slate-300 focus:ring-[#003B70] focus:border-[#003B70] bg-white'
              }`}
            />
          </div>
          {errors.numeroDocumento && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{errors.numeroDocumento}</p>
          )}
        </div>

        {/* Nombres y Apellidos Completos */}
        <div className="sm:col-span-12">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Nombres y Apellidos Completos <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ej. Carlos Alberto Henao Morales"
            value={formData.nombresApellidos}
            onChange={(e) => updateFormData({ nombresApellidos: e.target.value })}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:ring-2 outline-none transition-all ${
              errors.nombresApellidos
                ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                : 'border-slate-300 focus:ring-[#003B70] focus:border-[#003B70] bg-white'
            }`}
          />
          {errors.nombresApellidos && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{errors.nombresApellidos}</p>
          )}
        </div>

        {/* Estado de Afiliación */}
        <div className="sm:col-span-6">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Estado de Afiliación en Comfamiliar <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.estadoAfiliacion}
            onChange={(e) => updateFormData({ estadoAfiliacion: e.target.value as EstadoAfiliacion })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:ring-2 focus:ring-[#003B70] focus:border-[#003B70] outline-none transition-all"
          >
            <option value="Afiliado activo trabajador">Afiliado activo trabajador dependiente (mínimo 2 meses de aportes)</option>
            <option value="Afiliado independiente/pensionado">Afiliado independiente o pensionado aportante (mínimo 12 meses de aportes)</option>
            <option value="Beneficiario de afiliado">Beneficiario del núcleo familiar de un afiliado</option>
            <option value="No afiliado / Comunidad general">Damnificado comunidad general / No afiliado</option>
          </select>
        </div>

        {/* Categoría de Afiliación */}
        <div className="sm:col-span-6">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Categoría Salarial del Hogar <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.categoriaAfiliacion}
            onChange={(e) => updateFormData({ categoriaAfiliacion: e.target.value as CategoriaAfiliacion })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:ring-2 focus:ring-[#003B70] focus:border-[#003B70] outline-none transition-all"
          >
            <option value="Igual o menor a 2 SMMLV">Igual o menor a 2 SMMLV (Hasta $3.501.810) - Subsidio de Arrendamiento</option>
            <option value="De 2 a 4 SMMLV">De 2 a 4 SMMLV (De $3.501.811 a $7.003.620)</option>
            <option value="Más de 4 SMMLV">Más de 4 SMMLV (Más de $7.003.620)</option>
            <option value="No sabe / Por verificar">No sabe / Por verificar en sistema</option>
          </select>
        </div>

        {/* Empresa donde labora */}
        <div className="sm:col-span-12">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Empresa o Razón Social donde labora (Opcional)
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Ej. Papeles Nacionales S.A. / Ingenio Risaralda"
              value={formData.empresaDondeLabora || ''}
              onChange={(e) => updateFormData({ empresaDondeLabora: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:ring-2 focus:ring-[#003B70] focus:border-[#003B70] outline-none transition-all"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
