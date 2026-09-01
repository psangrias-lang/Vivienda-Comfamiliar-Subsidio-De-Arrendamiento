import React from 'react';
import type { ModalidadSubsidio } from '../types/censo';
import { X, CheckCircle2, FileText, Download, ShieldCheck } from 'lucide-react';

interface ModalSubsidioDetalleProps {
  modalidad: ModalidadSubsidio;
  onClose: () => void;
  onStartCenso?: () => void;
}

export const ModalSubsidioDetalle: React.FC<ModalSubsidioDetalleProps> = ({
  modalidad,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200">
        
        {/* Header con gradiente Comfamiliar Blue */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#002447] via-[#003B70] to-[#0A4B8F] text-white p-6 sm:p-8 flex items-start justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              {modalidad.subtitulo}
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-2 text-white">
              {modalidad.titulo}
            </h2>
            <div className="text-xs sm:text-sm text-slate-200 mt-1 font-semibold flex items-center gap-1.5">
              <span>Monto Asignado:</span>
              <strong className="text-amber-300 font-extrabold">{modalidad.montoMaximo}</strong>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-700">
          
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
              Descripción de la Modalidad
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {modalidad.descripcion}
            </p>
          </div>

          {/* Requisitos Generales */}
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
              Requisitos de Postulación
            </h4>
            <ul className="space-y-2.5">
              {modalidad.requisitosPrincipales.map((req: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentos Requeridos */}
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
              Documentos Obligatorios para Radicación
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {modalidad.documentosRequeridos.map((doc: string, idx: number) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-blue-50/50 flex items-start gap-2 text-xs transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#003B70] shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Aviso Institucional */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block">Convocatoria Extraordinaria Sismo 10 de Agosto:</strong>
              Si tu hogar fue afectado por el sismo en Risaralda, esta postulación recibe tratamiento y peritaje prioritario con asignación de Subsidio de Arrendamiento o Mejoramiento.
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-white transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#003B70]" />
            <span>Descargar Ficha Informativa (PDF)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all cursor-pointer"
          >
            <span>Cerrar</span>
          </button>
        </div>

      </div>
    </div>
  );
};
