import React from 'react';
import { KeyRound, ArrowRight, ShieldAlert, CheckCircle2, Building, Clock, DollarSign, Calendar } from 'lucide-react';

interface HeroSectionProps {
  onExploreArrendamiento: () => void;
  onOpenSimulador: () => void;
  onOpenPortalEmpresas?: () => void;
  onOpenCronograma?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreArrendamiento,
  onOpenSimulador,
  onOpenPortalEmpresas,
  onOpenCronograma,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#002447] via-[#003B70] to-[#0A3161] text-white pt-10 pb-20 sm:pt-14 sm:pb-28">
      {/* Luces de fondo Doradas y Azules */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-400 blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner de Contingencia Sismo 10 de Agosto */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-amber-500/20 via-amber-400/15 to-blue-900/40 border-2 border-amber-400/50 p-4 sm:p-6 backdrop-blur-md shadow-2xl animate-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-black shrink-0 mt-0.5 shadow-md">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded shadow-xs">
                    Atención Prioritaria Sismo 10 de Agosto
                  </span>
                  <span className="text-xs text-amber-200 font-bold">
                    Departamento de Risaralda • Fondo FOVIS
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                  Censo y Asignación de Subsidio de Arrendamiento por Emergencia
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 mt-0.5 max-w-3xl">
                  Si tu vivienda en Pereira, Dosquebradas, Santa Rosa o municipios de Risaralda resultó averiada o cuenta con orden de evacuación, postúlate al Subsidio de Arrendamiento Temporal.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto shrink-0">
              {onOpenCronograma && (
                <button
                  onClick={onOpenCronograma}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 border-2 border-amber-400 text-amber-200 hover:text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg backdrop-blur-md transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>Fechas y Cronograma 2026</span>
                </button>
              )}
              {onOpenPortalEmpresas && (
                <button
                  onClick={onOpenPortalEmpresas}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Building className="w-4 h-4 text-slate-950" />
                  <span>Portal Empresas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hero Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider">
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>Manual de Operación Gerencial • Comfamiliar Risaralda</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Subsidio de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200">Arrendamiento Temporal</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Aporte económico de <strong>hasta 0.6 SMMLV por 6 meses</strong> otorgado por Comfamiliar Risaralda para hogares afiliados con ingresos menores a 2 SMMLV, garantizando un techo digno y seguro en el perímetro urbano.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onExploreArrendamiento}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <KeyRound className="w-5 h-5" />
                <span>Ver Requisitos del Manual</span>
              </button>

              {onOpenCronograma && (
                <button
                  onClick={onOpenCronograma}
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border-2 border-amber-300/80 text-amber-200 hover:text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-sm transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span>Cronograma y Fechas 2026</span>
                </button>
              )}

              <button
                onClick={onOpenSimulador}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-sm transition-all cursor-pointer"
              >
                <Building className="w-4 h-4 text-amber-300" />
                <span>Simular Subsidio</span>
              </button>
            </div>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-700/80 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hasta 0.6 SMMLV mensual</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hasta 90% del canon</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Por 6 meses continuos</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-slate-900/80 border-2 border-amber-400/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
                  <h3 className="font-black text-white text-base sm:text-lg">
                    Parámetros Clave del Manual
                  </h3>
                </div>
                <span className="text-[11px] bg-amber-400/20 text-amber-300 font-black px-2.5 py-1 rounded-full border border-amber-400/30 uppercase">
                  Vigente 2026
                </span>
              </div>

              <div className="space-y-3.5 py-5 text-sm text-slate-300">
                
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 shrink-0">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">Ingresos iguales o menores a 2 SMMLV</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Dirigido prioritariamente a afiliados con ingresos de hasta $3.501.810 COP.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-400/20 text-blue-300 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">Duración: 6 Meses Continuos</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Subsidio transitorio con validación mediante visita domiciliaria.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">Canon Máximo Permitido</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Hasta $2.363.722 COP mensuales (Tope legal para vivienda en arriendo).</p>
                  </div>
                </div>

              </div>

              <div className="pt-2 space-y-2">
                {onOpenCronograma && (
                  <button
                    onClick={onOpenCronograma}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-slate-950" />
                    <span>Ver Fechas de Convocatorias 2026</span>
                  </button>
                )}
                <button
                  onClick={onExploreArrendamiento}
                  className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-300" />
                  <span>Consultar Requisitos del Manual</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
