import React, { useRef } from 'react';
import type { TenenciaInmueble, NivelDanio, EstadoVisitaDIGER, EvidenciaArchivo } from '../../types/censo';
import { AlertOctagon, Upload, Trash2, CheckCircle, FileText, KeyRound } from 'lucide-react';

interface Paso3Props {
  formData: {
    tenenciaInmueble: TenenciaInmueble;
    nivelDanio: NivelDanio;
    estadoVisitaDIGER: EstadoVisitaDIGER;
    numeroActaDIGER?: string;
    descripcionDanios: string;
    habitantesAfectados: number;
    hayMenoresOAdultosMayores: boolean;
    requiereEvacuacionInmediata: boolean;
    evidencias: EvidenciaArchivo[];
  };
  updateFormData: (fields: Partial<Paso3Props['formData']>) => void;
  errors: Record<string, string>;
}

export const Paso3Afectacion: React.FC<Paso3Props> = ({
  formData,
  updateFormData,
  errors,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const nuevasEvidencias: EvidenciaArchivo[] = [];

    Array.from(files).forEach((file, idx) => {
      const id = `ev-${Date.now()}-${idx}`;
      const tamanoMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      const previewUrl = URL.createObjectURL(file);

      nuevasEvidencias.push({
        id,
        nombre: file.name,
        tamano: tamanoMB,
        tipo: file.type,
        previewUrl,
      });
    });

    updateFormData({
      evidencias: [...formData.evidencias, ...nuevasEvidencias],
    });
  };

  const handleRemoveEvidencia = (id: string) => {
    updateFormData({
      evidencias: formData.evidencias.filter((ev) => ev.id !== id),
    });
  };

  const handleAddSamplePhotos = () => {
    const samplePhotos: EvidenciaArchivo[] = [
      {
        id: `ev-sample-1-${Date.now()}`,
        nombre: 'grieta_muro_sala.jpg',
        tamano: '2.1 MB',
        tipo: 'image/jpeg',
        previewUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: `ev-sample-2-${Date.now()}`,
        nombre: 'desprendimiento_pañete.jpg',
        tamano: '1.5 MB',
        tipo: 'image/jpeg',
        previewUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861563?auto=format&fit=crop&w=600&q=80',
      }
    ];

    updateFormData({
      evidencias: [...formData.evidencias, ...samplePhotos],
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-amber-600" />
          <span>Paso 3: Diagnóstico de Afectación y Necesidad de Arrendamiento</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Describe la severidad de los daños ocasionados por el sismo del 10 de agosto y si requieres traslado inmediato a vivienda en arriendo.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Tipo de Tenencia del Inmueble Afectado <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.tenenciaInmueble}
            onChange={(e) => updateFormData({ tenenciaInmueble: e.target.value as TenenciaInmueble })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:ring-2 focus:ring-[#003B70] focus:border-[#003B70] outline-none transition-all"
          >
            <option value="Propia (con escritura pública)">Propia (con escritura pública registrada)</option>
            <option value="En proceso de pago / Crédito hipotecario">En proceso de pago / Con crédito hipotecario vigente</option>
            <option value="Arrendada">Arrendada (Inquilino / Requiere Subsidio de Arrendamiento)</option>
            <option value="Familiar / Cesión / Posesión sin título">Familiar / Cesión informal / Posesión</option>
            <option value="Lote o terraza propia">Lote o terraza propia</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
            Nivel de Daño Visible en la Vivienda <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => updateFormData({ nivelDanio: 'Leve' })}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                formData.nivelDanio === 'Leve'
                  ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-400/30'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-blue-100 text-[#003B70]">
                  Nivel Leve
                </span>
                {formData.nivelDanio === 'Leve' && <CheckCircle className="w-4 h-4 text-[#003B70]" />}
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Fisuras Superficiales</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Fisuras leves en pañetes, pintura o desprendimiento de algunas tejas sin daño estructural.
              </p>
            </button>

            <button
              type="button"
              onClick={() => updateFormData({ nivelDanio: 'Moderado' })}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                formData.nivelDanio === 'Moderado'
                  ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400/30'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  Nivel Moderado
                </span>
                {formData.nivelDanio === 'Moderado' && <CheckCircle className="w-4 h-4 text-amber-600 text-[#003B70]" />}
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Grietas en Muros / Cielo Raso</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Grietas visibles en mampostería, desprendimiento de cielo raso, averías en redes hidrosanitarias.
              </p>
            </button>

            <button
              type="button"
              onClick={() => updateFormData({ nivelDanio: 'Severo' })}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                formData.nivelDanio === 'Severo'
                  ? 'border-red-500 bg-red-50/80 ring-2 ring-red-400/30'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-red-100 text-red-800 animate-pulse">
                  Severo / Estructural
                </span>
                {formData.nivelDanio === 'Severo' && <CheckCircle className="w-4 h-4 text-red-600" />}
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Fractura Estructural / Colapso</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Columnas, vigas o muros de carga fracturados, riesgo inminente de desplome o evacuación decretada.
              </p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              ¿Cuenta con visita o acta de DIGER / Bomberos / CMGRD? <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.estadoVisitaDIGER}
              onChange={(e) => updateFormData({ estadoVisitaDIGER: e.target.value as EstadoVisitaDIGER })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:ring-2 focus:ring-[#003B70] focus:border-[#003B70] outline-none transition-all"
            >
              <option value="Sí, cuenta con acta">Sí, cuenta con acta de visita o informe técnico</option>
              <option value="En espera de visita programada">En espera de visita técnica programada</option>
              <option value="No ha sido visitado">No ha sido visitado aún</option>
            </select>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Número de Acta o Radicado DIGER / Bomberos (Si posee)
            </label>
            <input
              type="text"
              placeholder="Ej. ACT-DIGER-2026-0412"
              value={formData.numeroActaDIGER || ''}
              onChange={(e) => updateFormData({ numeroActaDIGER: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:ring-2 focus:ring-[#003B70] focus:border-[#003B70] outline-none transition-all"
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Número de Habitantes
            </label>
            <input
              type="number"
              min={1}
              max={25}
              value={formData.habitantesAfectados}
              onChange={(e) => updateFormData({ habitantesAfectados: Math.max(1, parseInt(e.target.value) || 1) })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-bold focus:ring-2 focus:ring-[#003B70] outline-none"
            />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hayMenoresOAdultosMayores}
                onChange={(e) => updateFormData({ hayMenoresOAdultosMayores: e.target.checked })}
                className="w-4 h-4 text-[#003B70] rounded border-slate-300 focus:ring-[#003B70]"
              />
              <span>Habitan niños, adultos mayores o personas con discapacidad (Prioridad alta).</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-red-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.requiereEvacuacionInmediata}
                onChange={(e) => updateFormData({ requiereEvacuacionInmediata: e.target.checked })}
                className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
              />
              <span className="flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                Vivienda inhabitable: Requiere Subsidio de Arrendamiento Temporal de Emergencia (0.6 SMMLV).
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Descripción Detallada de los Daños Sufridos <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="Describe qué áreas sufrieron afectación (columnas, paredes, techos, redes de acueducto) y el estado de habitabilidad..."
            value={formData.descripcionDanios}
            onChange={(e) => updateFormData({ descripcionDanios: e.target.value })}
            className={`w-full p-3.5 rounded-xl border text-sm font-medium focus:ring-2 outline-none transition-all ${
              errors.descripcionDanios
                ? 'border-red-500 focus:ring-red-300 bg-red-50/20'
                : 'border-slate-300 focus:ring-[#003B70] focus:border-[#003B70] bg-white'
            }`}
          />
          {errors.descripcionDanios && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{errors.descripcionDanios}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              Evidencias Fotográficas del Daño (Opcional pero Recomendado)
            </label>
            <button
              type="button"
              onClick={handleAddSamplePhotos}
              className="text-xs text-[#003B70] hover:text-[#002447] font-bold underline"
            >
              + Cargar fotos de muestra para prueba
            </button>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl p-6 text-center bg-slate-50 hover:bg-amber-50/30 cursor-pointer transition-all group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              accept="image/*,.pdf"
              className="hidden"
            />
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 text-[#003B70] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">
              Haz clic aquí para seleccionar fotos o arrástralas a esta zona
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Formatos admitidos: JPG, PNG, WEBP o PDF (Máximo 10 MB por archivo)
            </p>
          </div>

          {formData.evidencias.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {formData.evidencias.map((ev) => (
                <div
                  key={ev.id}
                  className="group relative rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm"
                >
                  {ev.previewUrl ? (
                    <img
                      src={ev.previewUrl}
                      alt={ev.nombre}
                      className="w-full h-24 object-cover"
                    />
                  ) : (
                    <div className="w-full h-24 bg-slate-100 flex items-center justify-center text-slate-400">
                      <FileText className="w-8 h-8" />
                    </div>
                  )}

                  <div className="p-2 text-[11px] bg-white">
                    <p className="font-semibold text-slate-800 truncate" title={ev.nombre}>
                      {ev.nombre}
                    </p>
                    <p className="text-slate-400 text-[10px]">{ev.tamano}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveEvidencia(ev.id)}
                    className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-red-600/90 hover:bg-red-700 text-white shadow-md transition-colors"
                    title="Eliminar evidencia"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
