import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, ShieldCheck, FileText, Home } from 'lucide-react';
import { PREGUNTAS_FRECUENTES_SUBSIDIO } from '../data/subsidiosData';

export const RequisitosAccordion: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="requisitos" className="py-20 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-[#003B70] bg-blue-100 px-3 py-1 rounded-full">
            Marco Normativo y Preguntas Frecuentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Guía de Requisitos y Preguntas Frecuentes
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Todo lo que debes conocer sobre la postulación, verificación y desembolso del Subsidio de Arrendamiento y FOVIS Comfamiliar Risaralda.
          </p>
        </div>

        {/* 3 Tarjetas de Resumen Normativo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003B70] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Validación de Aportes</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Dependientes:</strong> Mínimo 2 meses de aportes al día en Comfamiliar.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Pensionados 2%:</strong> Mínimo 12 meses continuos.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Independientes 2%:</strong> Mínimo 12 meses de aportes.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Condición Habitacional</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>No ser propietario ni poseedor de ningún inmueble en Colombia.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>No haber sido beneficiario de subsidios familiares de vivienda anteriores.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Inmueble a arrendar 100% independiente con servicios públicos activos.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003B70] flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Visitas Domiciliarias</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Comfamiliar realizará visita técnica y domiciliaria de verificación.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Comprobación de condiciones de habitabilidad y contrato de arrendamiento.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Desembolso directo mensual mediante transferencia autorizada.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Acordeón FAQ */}
        <div className="max-w-4xl mx-auto space-y-3">
          <h3 className="text-xl font-black text-[#003B70] text-center mb-6">
            Preguntas Frecuentes sobre el Subsidio de Arrendamiento y FOVIS
          </h3>

          {PREGUNTAS_FRECUENTES_SUBSIDIO.map((faq, index: number) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {faq.pregunta}
                  </span>
                  <div className={`p-1.5 rounded-full bg-slate-100 text-[#003B70] transition-transform ${isOpen ? 'rotate-180 bg-blue-50' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.respuesta}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
