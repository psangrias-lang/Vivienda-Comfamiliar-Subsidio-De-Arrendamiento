import React, { useState } from 'react';
import type { CensoRegistro } from '../types/censo';
import { Search, X, CheckCircle, Clock, AlertCircle, KeyRound } from 'lucide-react';
import { ComfamiliarLogo } from './ComfamiliarLogo';

interface ConsultaRadicadoModalProps {
  censos: CensoRegistro[];
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultaRadicadoModal: React.FC<ConsultaRadicadoModalProps> = ({
  censos,
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [resultado, setResultado] = useState<CensoRegistro | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return;

    const found = censos.find(
      (c) =>
        c.numeroDocumento.toLowerCase() === cleanQuery ||
        c.id.toLowerCase() === cleanQuery
    );

    setResultado(found || null);
    setHasSearched(true);
  };

  const getStatusInfo = (status: CensoRegistro['estadoAtencion']) => {
    switch (status) {
      case 'Priorizado para Subsidio':
        return {
          color: 'bg-amber-50 text-amber-900 border-amber-300',
          icon: <KeyRound className="w-5 h-5 text-amber-600" />,
          desc: 'Tu caso ha sido calificado como prioritario para el Subsidio de Arrendamiento Temporal de Emergencia.',
        };
      case 'Visita Programada':
        return {
          color: 'bg-blue-50 text-[#003B70] border-blue-200',
          icon: <Clock className="w-5 h-5 text-[#003B70]" />,
          desc: 'Se ha agendado la visita domiciliaria de validación de condiciones de habitabilidad del inmueble.',
        };
      case 'En Verificación Técnica':
        return {
          color: 'bg-slate-100 text-slate-800 border-slate-200',
          icon: <Clock className="w-5 h-5 text-slate-600" />,
          desc: 'El equipo de Vivienda Comfamiliar está validando los aportes y la documentación del hogar.',
        };
      case 'Cerrado/Atendido':
        return {
          color: 'bg-emerald-50 text-emerald-900 border-emerald-300',
          icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
          desc: 'El trámite ha sido aprobado y el subsidio de arrendamiento se encuentra en proceso de desembolso.',
        };
      default:
        return {
          color: 'bg-slate-100 text-slate-800 border-slate-200',
          icon: <Clock className="w-5 h-5 text-slate-600" />,
          desc: 'Solicitud radicada en espera de revisión documental preliminar.',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-2 border-amber-400/50 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#002447] text-white p-5 sm:p-6 flex items-center justify-between border-b border-amber-400/30">
          <div className="flex items-center gap-3">
            <ComfamiliarLogo variant="light" size="sm" />
            <div className="h-8 w-px bg-white/20 hidden sm:block"></div>
            <div>
              <h2 className="text-sm sm:text-base font-black">Consultar Estado de Radicado</h2>
              <p className="text-[11px] text-amber-200">Ingresa tu cédula o número de radicado</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Ej. 1088294712 o RAD-ARR-2026-8941"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#003B70] outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md"
            >
              <Search className="w-4 h-4" />
              <span>Consultar</span>
            </button>
          </form>

          {/* Search Result */}
          {hasSearched && (
            <div className="mt-6">
              {resultado ? (
                <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 space-y-4 animate-fade-in">
                  
                  {/* Status Banner */}
                  {(() => {
                    const info = getStatusInfo(resultado.estadoAtencion);
                    return (
                      <div className={`p-4 rounded-xl border flex items-start gap-3 ${info.color}`}>
                        {info.icon}
                        <div>
                          <div className="font-black text-sm uppercase tracking-wide">
                            Estado: {resultado.estadoAtencion}
                          </div>
                          <p className="text-xs mt-0.5 leading-relaxed">{info.desc}</p>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Summary Details */}
                  <div className="space-y-2 text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-200">
                    <div className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-400 font-medium">Radicado:</span>
                      <strong className="text-[#003B70] font-bold">{resultado.id}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-400 font-medium">Titular:</span>
                      <strong>{resultado.nombresApellidos}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-400 font-medium">Ubicación:</span>
                      <span>{resultado.municipio} - {resultado.barrioVereda}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-400 font-medium">Fecha Radicación:</span>
                      <span>{new Date(resultado.fechaRegistro).toLocaleDateString('es-CO')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Modalidad:</span>
                      <strong className="text-[#003B70]">Subsidio de Arrendamiento Temporal</strong>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2 text-amber-900 animate-fade-in">
                  <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                  <h3 className="font-bold text-sm">No se encontró ningún registro</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Verifica que el número de cédula o el código de radicado no contenga espacios ni errores.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            Cerrar Consulta
          </button>
        </div>

      </div>
    </div>
  );
};
