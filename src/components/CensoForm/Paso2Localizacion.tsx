import React from 'react';
import { MUNICIPIOS_RISARALDA, BARRIOS_FRECUENTES_RISARALDA } from '../../data/risaraldaMunicipios';
import { MapPin, Phone, MessageSquare, Mail, Navigation } from 'lucide-react';

interface Paso2Props {
  formData: {
    municipio: string;
    barrioVereda: string;
    direccionExacta: string;
    telefonoCelular: string;
    telefonoWhatsapp: string;
    correoElectronico: string;
    puntoReferencia?: string;
  };
  updateFormData: (fields: Partial<Paso2Props['formData']>) => void;
  errors: Record<string, string>;
}

export const Paso2Localizacion: React.FC<Paso2Props> = ({
  formData,
  updateFormData,
  errors,
}) => {
  const barriosSugeridos = BARRIOS_FRECUENTES_RISARALDA[formData.municipio] || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#003B70]" />
          <span>Paso 2: Localización del Inmueble y Canales de Contacto</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Indica la ubicación de la vivienda en Risaralda y tus datos de contacto para agendar la visita domiciliaria de validación.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        
        {/* Municipio */}
        <div className="sm:col-span-6">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Municipio de Risaralda <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              value={formData.municipio}
              onChange={(e) => updateFormData({ municipio: e.target.value, barrioVereda: '' })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:ring-2 focus:ring-[#003B70] focus:border-[#003B70] outline-none transition-all"
            >
              {MUNICIPIOS_RISARALDA.map((mun) => (
                <option key={mun.id} value={mun.nombre}>
                  {mun.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Barrio / Vereda */}
        <div className="sm:col-span-6">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Barrio, Sector o Vereda <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ej. Boston, Cuba, Frailes, Santa Isabel..."
            value={formData.barrioVereda}
            onChange={(e) => updateFormData({ barrioVereda: e.target.value })}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:ring-2 outline-none transition-all ${
              errors.barrioVereda
                ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                : 'border-slate-300 focus:ring-[#003B70] focus:border-[#003B70] bg-white'
            }`}
          />
          {errors.barrioVereda && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{errors.barrioVereda}</p>
          )}

          {barriosSugeridos.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1 items-center">
              <span className="text-[10px] text-slate-400 font-semibold">Sugeridos:</span>
              {barriosSugeridos.slice(0, 4).map((b: string) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => updateFormData({ barrioVereda: b })}
                  className="text-[10px] bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#003B70] font-medium px-2 py-0.5 rounded-md transition-colors"
                >
                  {b}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dirección Exacta */}
        <div className="sm:col-span-12">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Dirección Exacta del Inmueble Afectado / A Arrendar <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Navigation className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Ej. Carrera 8 # 34-21 Manzana 4 Casa 12"
              value={formData.direccionExacta}
              onChange={(e) => updateFormData({ direccionExacta: e.target.value })}
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm font-medium focus:ring-2 outline-none transition-all ${
                errors.direccionExacta
                  ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                  : 'border-slate-300 focus:ring-[#003B70] focus:border-[#003B70] bg-white'
              }`}
            />
          </div>
          {errors.direccionExacta && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{errors.direccionExacta}</p>
          )}
        </div>

        {/* Teléfono Celular */}
        <div className="sm:col-span-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Teléfono Celular <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="tel"
              placeholder="Ej. 3128495021"
              value={formData.telefonoCelular}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                updateFormData({
                  telefonoCelular: val,
                  telefonoWhatsapp: formData.telefonoWhatsapp ? formData.telefonoWhatsapp : val,
                });
              }}
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm font-medium focus:ring-2 outline-none transition-all ${
                errors.telefonoCelular
                  ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                  : 'border-slate-300 focus:ring-[#003B70] focus:border-[#003B70] bg-white'
              }`}
            />
          </div>
          {errors.telefonoCelular && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{errors.telefonoCelular}</p>
          )}
        </div>

        {/* WhatsApp */}
        <div className="sm:col-span-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Número de WhatsApp <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3.5" />
            <input
              type="tel"
              placeholder="Ej. 3128495021"
              value={formData.telefonoWhatsapp}
              onChange={(e) => updateFormData({ telefonoWhatsapp: e.target.value.replace(/\D/g, '') })}
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm font-medium focus:ring-2 outline-none transition-all ${
                errors.telefonoWhatsapp
                  ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                  : 'border-slate-300 focus:ring-[#003B70] focus:border-[#003B70] bg-white'
              }`}
            />
          </div>
          {errors.telefonoWhatsapp && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{errors.telefonoWhatsapp}</p>
          )}
        </div>

        {/* Correo Electrónico */}
        <div className="sm:col-span-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Correo Electrónico <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              placeholder="Ej. familia.henao@gmail.com"
              value={formData.correoElectronico}
              onChange={(e) => updateFormData({ correoElectronico: e.target.value })}
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm font-medium focus:ring-2 outline-none transition-all ${
                errors.correoElectronico
                  ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                  : 'border-slate-300 focus:ring-[#003B70] focus:border-[#003B70] bg-white'
              }`}
            />
          </div>
          {errors.correoElectronico && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{errors.correoElectronico}</p>
          )}
        </div>

        {/* Punto de Referencia */}
        <div className="sm:col-span-12">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Punto de Referencia o Indicaciones de Acceso
          </label>
          <input
            type="text"
            placeholder="Ej. Frente a la cancha de fútbol, diagonal a la panadería La Espiga..."
            value={formData.puntoReferencia || ''}
            onChange={(e) => updateFormData({ puntoReferencia: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:ring-2 focus:ring-[#003B70] focus:border-[#003B70] outline-none transition-all"
          />
        </div>

      </div>
    </div>
  );
};
