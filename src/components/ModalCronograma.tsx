import React, { useState } from 'react';
import { X, Calendar, Download, Eye, FileText, CheckCircle2 } from 'lucide-react';

interface ModalCronogramaProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalCronograma: React.FC<ModalCronogramaProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'tabla' | 'imagen'>('tabla');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div 
        className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 w-full max-w-4xl overflow-hidden my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-[#002447] via-[#003B70] to-[#002447] text-white p-5 sm:p-6 flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400 text-slate-950 rounded-2xl">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Cronograma Oficial de Postulaciones 2026
              </h3>
              <p className="text-xs text-amber-200">
                Vivienda Comfamiliar Risaralda • Subsidio de Arrendamiento y Componente Rural
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('tabla')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'tabla'
                ? 'border-[#003B70] text-[#003B70]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Fechas y Tablas Organizadas</span>
          </button>
          <button
            onClick={() => setActiveTab('imagen')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'imagen'
                ? 'border-[#003B70] text-[#003B70]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Afiche Oficial (Imagen)</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-8 flex-1">
          {activeTab === 'tabla' ? (
            <div className="space-y-8">
              
              {/* Cronograma 1: Arrendamiento Temporal */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-[#003B70] text-white p-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                    FOVIS RISARALDA
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    CRONOGRAMA • Subsidio Temporal de Arrendamiento 2026
                  </h4>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-800 uppercase font-black text-[11px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3">Convocatoria</th>
                        <th className="px-4 py-3">Apertura</th>
                        <th className="px-4 py-3">Cierre</th>
                        <th className="px-4 py-3">Asignación</th>
                        <th className="px-4 py-3">Publicación Web</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                      <tr className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-4 py-3.5 font-bold text-[#003B70]">
                          1ª Postulación Arrendamiento
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-slate-900">14/09/2026</td>
                        <td className="px-4 py-3.5 font-semibold text-red-600">25/09/2026</td>
                        <td className="px-4 py-3.5">09/10/2026</td>
                        <td className="px-4 py-3.5 font-bold text-[#003B70]">13/10/2026</td>
                      </tr>
                      <tr className="hover:bg-blue-50/50 transition-colors bg-slate-50/50">
                        <td className="px-4 py-3.5 font-bold text-[#003B70]">
                          2ª Postulación Arrendamiento
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-slate-900">13/10/2026</td>
                        <td className="px-4 py-3.5 font-semibold text-red-600">23/10/2026</td>
                        <td className="px-4 py-3.5">09/11/2026</td>
                        <td className="px-4 py-3.5 font-bold text-[#003B70]">10/11/2026</td>
                      </tr>
                      <tr className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-4 py-3.5 font-bold text-[#003B70]">
                          3ª Postulación Arrendamiento
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-slate-900">13/11/2026</td>
                        <td className="px-4 py-3.5 font-semibold text-red-600">27/11/2026</td>
                        <td className="px-4 py-3.5">14/12/2026</td>
                        <td className="px-4 py-3.5 font-bold text-[#003B70]">15/12/2026</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cronograma 2: Componente Rural */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-emerald-800 text-white p-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200 block">
                    SECTOR RURAL RISARALDA
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    CRONOGRAMA • Postulación Componente Rural 2026
                  </h4>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-800 uppercase font-black text-[11px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3">Tipo</th>
                        <th className="px-4 py-3">Apertura</th>
                        <th className="px-4 py-3">Cierre</th>
                        <th className="px-4 py-3">Asignación</th>
                        <th className="px-4 py-3">Publicación Web</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                      <tr className="hover:bg-emerald-50/50 transition-colors">
                        <td className="px-4 py-3.5 font-bold text-emerald-900">
                          Recepción Postulaciones Rural
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-slate-900">05/10/2026</td>
                        <td className="px-4 py-3.5 font-semibold text-red-600">30/10/2026</td>
                        <td className="px-4 py-3.5">14/12/2026</td>
                        <td className="px-4 py-3.5 font-bold text-emerald-800">15/12/2026</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Informative Note */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Importante sobre la radicación de documentos:</span>
                </div>
                <p>
                  Las solicitudes y soportes se recibirán en las fechas estipuladas de apertura y cierre. Los resultados serán publicados en el portal oficial en las fechas señaladas.
                </p>
              </div>

            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex justify-end">
                <a
                  href="/cronograma-subsidio-2026.jpg"
                  download="Cronograma-Subsidios-Comfamiliar-2026.jpg"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#003B70] hover:bg-[#002447] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Imagen Oficial</span>
                </a>
              </div>
              <div className="flex justify-center bg-slate-100 p-2 rounded-2xl border border-slate-200">
                <img
                  src="/cronograma-subsidio-2026.jpg"
                  alt="Cronograma Subsidio Temporal de Arrendamiento 2026 Comfamiliar"
                  className="max-h-[600px] w-auto object-contain rounded-xl shadow"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#003B70] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#002447] transition-all cursor-pointer"
          >
            Entendido / Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
