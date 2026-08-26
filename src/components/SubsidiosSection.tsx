import React, { useState } from 'react';
import type { ModalidadSubsidio } from '../types/censo';
import { MODALIDADES_SUBSIDIO } from '../data/subsidiosData';
import { ModalSubsidioDetalle } from './ModalSubsidioDetalle';
import { 
  Building2, Hammer, Home, KeyRound, 
  ArrowRight, ShieldCheck, Sparkles 
} from 'lucide-react';

export const SubsidiosSection: React.FC<{ onStartCenso: () => void }> = ({ onStartCenso }) => {
  const [selectedModalidad, setSelectedModalidad] = useState<ModalidadSubsidio | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case 'subsidio-arrendamiento':
        return <KeyRound className="w-7 h-7 text-amber-400" />;
      case 'vivienda-nueva':
        return <Building2 className="w-7 h-7 text-amber-400" />;
      case 'construccion-sitio-propio':
        return <Hammer className="w-7 h-7 text-amber-400" />;
      case 'mejoramiento-vivienda':
        return <Home className="w-7 h-7 text-amber-400" />;
      default:
        return <Building2 className="w-7 h-7 text-amber-400" />;
    }
  };

  return (
    <section id="lineas-subsidio" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header de Sección */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-[#003B70] bg-blue-100 px-3.5 py-1 rounded-full">
            Portafolio FOVIS Comfamiliar Risaralda
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Líneas del Subsidio Familiar de Vivienda
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Aportes económicos no reembolsables financiados por los aportes parafiscales de las empresas de Risaralda para garantizar vivienda digna.
          </p>
        </div>

        {/* Grid de 4 Modalidades FOVIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODALIDADES_SUBSIDIO.map((modalidad) => {
            const isArrendamiento = modalidad.id === 'subsidio-arrendamiento';
            return (
              <div
                key={modalidad.id}
                className={`group rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  isArrendamiento
                    ? 'bg-gradient-to-b from-[#002447] to-[#003B70] text-white border-2 border-amber-400 shadow-xl scale-[1.02]'
                    : 'bg-white border-2 border-slate-200 hover:border-[#003B70] shadow-sm hover:shadow-lg text-slate-800'
                }`}
              >
                {isArrendamiento && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Convocatoria Prioritaria</span>
                  </div>
                )}

                <div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                    isArrendamiento ? 'bg-white/10' : 'bg-[#003B70]'
                  }`}>
                    {getIcon(modalidad.id)}
                  </div>

                  <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
                    isArrendamiento ? 'text-amber-300' : 'text-[#003B70]'
                  }`}>
                    {modalidad.subtitulo}
                  </span>

                  <h3 className={`text-xl font-black mb-2 ${isArrendamiento ? 'text-white' : 'text-slate-900'}`}>
                    {modalidad.titulo}
                  </h3>

                  <p className={`text-xs leading-relaxed line-clamp-3 mb-6 ${
                    isArrendamiento ? 'text-slate-200' : 'text-slate-600'
                  }`}>
                    {modalidad.descripcion}
                  </p>

                  <div className={`p-3.5 rounded-2xl mb-6 ${
                    isArrendamiento ? 'bg-white/10 border border-white/15' : 'bg-blue-50 border border-blue-100'
                  }`}>
                    <span className={`text-[10px] font-black uppercase tracking-wider block ${
                      isArrendamiento ? 'text-amber-300' : 'text-[#003B70]'
                    }`}>
                      Monto de Aporte
                    </span>
                    <div className={`text-lg font-black mt-0.5 ${isArrendamiento ? 'text-white' : 'text-[#003B70]'}`}>
                      {modalidad.montoMaximo}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setSelectedModalidad(modalidad)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isArrendamiento
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black'
                        : 'bg-slate-100 hover:bg-[#003B70] text-slate-800 hover:text-white'
                    }`}
                  >
                    <span>Ver Requisitos Completos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Banner de Garantía Comfamiliar */}
        <div className="bg-gradient-to-r from-slate-900 via-[#002447] to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-amber-400/30">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="p-3.5 bg-amber-400/20 text-amber-400 rounded-2xl shrink-0 hidden sm:block border border-amber-400/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                Trámite 100% Gratuito y Sin Intermediarios
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                La postulación a los subsidios de Comfamiliar Risaralda no requiere tramitadores ni pagos adicionales.
              </p>
            </div>
          </div>

          <button
            onClick={onStartCenso}
            className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shrink-0 transition-all shadow-md shadow-amber-500/20 uppercase tracking-wider"
          >
            Postular a Subsidio Ahora
          </button>
        </div>

      </div>

      {selectedModalidad && (
        <ModalSubsidioDetalle
          modalidad={selectedModalidad}
          onClose={() => setSelectedModalidad(null)}
          onStartCenso={onStartCenso}
        />
      )}
    </section>
  );
};
