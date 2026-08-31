import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertTriangle, KeyRound, ArrowRight } from 'lucide-react';

export const SimuladorSubsidio: React.FC<{ onStartCenso: () => void }> = ({ onStartCenso }) => {
  const SMMLV_2026 = 1750905; // SMMLV de referencia actual: $1.750.905 COP
  const MAX_SUB_ARRIENDO_MENSUAL = SMMLV_2026 * 0.6; // 0.6 SMMLV = $1.050.543 COP
  const TOPE_VIS = SMMLV_2026 * 135; // 135 SMMLV = $236.372.175 COP
  const TOPE_CANON_MAX = TOPE_VIS * 0.01; // 1% de VIS = $2.363.722 COP

  // Estado del Simulador
  const [ingresos, setIngresos] = useState<number>(2200000);
  const [canonPactado, setCanonPactado] = useState<number>(900000);
  const [esUrbana, setEsUrbana] = useState<boolean>(true);

  const smmlvCalculados = ingresos / SMMLV_2026;
  const cumpleIngresos = smmlvCalculados <= 2.0;

  // Cálculo del subsidio mensual según el manual:
  // Subsidio = Min( 0.6 SMMLV, 90% del canon pactado )
  const tope90Canon = canonPactado * 0.9;
  const subsidioMensualCalculado = Math.min(MAX_SUB_ARRIENDO_MENSUAL, tope90Canon);
  const aporteFamiliaMensual = Math.max(0, canonPactado - subsidioMensualCalculado);
  const subsidioTotal6Meses = subsidioMensualCalculado * 6;

  const excedeCanonTope = canonPactado > TOPE_CANON_MAX;

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="simulador-arriendo" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#003B70] text-xs font-black uppercase tracking-wider mb-3">
            <Calculator className="w-4 h-4 text-amber-600" />
            <span>Herramienta Interactiva de Cálculo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Simulador de Subsidio de Arrendamiento
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Calcula en tiempo real el valor mensual que aportará Comfamiliar Risaralda (hasta 0.6 SMMLV) durante los 6 meses según el canon de tu vivienda.
          </p>
        </div>

        {/* Tarjeta Principal del Simulador */}
        <div className="bg-slate-50 rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Panel Izquierdo: Parámetros del Hogar */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 bg-white">
              
              {/* Slider 1: Ingresos del Hogar */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                    Ingresos Mensuales del Grupo Familiar
                  </label>
                  <span className="text-lg font-black text-[#003B70]">
                    {formatCOP(ingresos)}
                  </span>
                </div>

                <input
                  type="range"
                  min={1000000}
                  max={5500000}
                  step={50000}
                  value={ingresos}
                  onChange={(e) => setIngresos(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#003B70]"
                />

                <div className="flex justify-between text-[11px] font-bold text-slate-400">
                  <span>$1.000.000</span>
                  <span>Tope 2 SMMLV ({formatCOP(SMMLV_2026 * 2)})</span>
                  <span>$5.500.000</span>
                </div>

                {cumpleIngresos ? (
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-[#003B70] font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Cumple con el requisito de ingresos: <strong>{smmlvCalculados.toFixed(2)} SMMLV (hasta 2 SMMLV)</strong>.</span>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Los ingresos superan los 2 SMMLV requeridos por el Manual de Arrendamiento ({smmlvCalculados.toFixed(2)} SMMLV).</span>
                  </div>
                )}
              </div>

              {/* Slider 2: Canon Mensual Pactado */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                    Canon de Arrendamiento Mensual del Inmueble
                  </label>
                  <span className="text-lg font-black text-[#003B70]">
                    {formatCOP(canonPactado)}
                  </span>
                </div>

                <input
                  type="range"
                  min={400000}
                  max={3000000}
                  step={25000}
                  value={canonPactado}
                  onChange={(e) => setCanonPactado(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />

                <div className="flex justify-between text-[11px] font-bold text-slate-400">
                  <span>$400.000</span>
                  <span>Tope 1% VIS ({formatCOP(TOPE_CANON_MAX)})</span>
                  <span>$3.000.000</span>
                </div>

                {excedeCanonTope && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>El canon supera el 1% del tope VIS ({formatCOP(TOPE_CANON_MAX)}). Comfamiliar validará el caso.</span>
                  </div>
                )}
              </div>

              {/* Checkbox Ubicación Urbana */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={esUrbana}
                    onChange={(e) => setEsUrbana(e.target.checked)}
                    className="w-4 h-4 text-[#003B70] rounded border-slate-300 focus:ring-[#003B70]"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    El inmueble a arrendar se encuentra ubicado en el <strong>perímetro urbano</strong> de Risaralda (Pereira, Dosquebradas, Santa Rosa, etc.).
                  </span>
                </label>
              </div>

            </div>

            {/* Panel Derecho: Resultado y Desglose */}
            <div className="lg:col-span-5 p-6 sm:p-10 bg-gradient-to-br from-[#002447] via-[#003B70] to-[#001D3D] text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-amber-400/40">
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
                      Liquidación del Subsidio
                    </span>
                  </div>
                  <span className="text-[11px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full">
                    6 Meses
                  </span>
                </div>

                {/* Subsidio Mensual */}
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
                  <span className="text-xs text-amber-200 uppercase font-bold tracking-wider">
                    Aporte Mensual Comfamiliar (Hasta 0.6 SMMLV)
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                    {formatCOP(subsidioMensualCalculado)}
                  </div>
                  <span className="text-[11px] text-slate-300 block mt-1">
                    Representa el {((subsidioMensualCalculado / canonPactado) * 100).toFixed(0)}% del canon de arrendamiento
                  </span>
                </div>

                {/* Desglose Comparativo */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-300">Canon Total del Inmueble:</span>
                    <span className="font-bold text-white">{formatCOP(canonPactado)}</span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-amber-300 font-bold">Comfamiliar Paga / Mes:</span>
                    <span className="font-bold text-amber-300">-{formatCOP(subsidioMensualCalculado)}</span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-300">Aporte del Hogar / Mes:</span>
                    <span className="font-bold text-white">{formatCOP(aporteFamiliaMensual)}</span>
                  </div>

                  <div className="flex justify-between py-2 pt-3 font-extrabold text-sm text-amber-300 bg-amber-400/10 px-3 rounded-xl border border-amber-400/20">
                    <span>Subsidio Total (6 Meses):</span>
                    <span>{formatCOP(subsidioTotal6Meses)}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700 text-[11px] text-slate-300 space-y-1">
                  <div>• <strong>Tope 0.6 SMMLV:</strong> Máximo {formatCOP(MAX_SUB_ARRIENDO_MENSUAL)} al mes.</div>
                  <div>• <strong>Tope 90% Canon:</strong> El subsidio nunca superará el 90% del valor pactado en el contrato.</div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={onStartCenso}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <span>Postularme con estos Datos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
