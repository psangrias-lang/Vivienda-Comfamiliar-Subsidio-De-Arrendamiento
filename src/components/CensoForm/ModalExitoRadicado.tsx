import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import type { CensoRegistro } from '../../types/censo';
import { CheckCircle, Copy, Check, Printer, MessageCircle, ArrowRight, ShieldCheck, Calendar, KeyRound } from 'lucide-react';

import { ComfamiliarLogo } from '../ComfamiliarLogo';

interface ModalExitoRadicadoProps {
  registro: CensoRegistro;
  onClose: () => void;
  onGoHome: () => void;
}

export const ModalExitoRadicado: React.FC<ModalExitoRadicadoProps> = ({
  registro,
  onClose,
  onGoHome,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#003B70', '#D4AF37', '#002447', '#F59E0B', '#FFFFFF'],
      });
    } catch (e) {
      console.log('Confetti effect triggered');
    }
  }, []);

  const handleCopyRadicado = () => {
    navigator.clipboard.writeText(registro.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Comfamiliar Risaralda, acabo de postularme al Subsidio de Arrendamiento Temporal con el Radicado ${registro.id} a nombre de ${registro.nombresApellidos}. Quisiera confirmar la recepción para la visita de validación domiciliaria.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-amber-400/50 overflow-hidden">
        
        {/* Header con gradiente Comfamiliar Blue & Gold */}
        <div className="bg-gradient-to-r from-[#002447] via-[#003B70] to-[#0A4B8F] p-6 sm:p-8 text-white text-center relative space-y-3">
          <div className="flex justify-center">
            <ComfamiliarLogo variant="light" size="sm" />
          </div>
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/40">
              Postulación Radicada Exitosamente
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-2">
              ¡Radicación de Subsidio Exitosa!
            </h2>
            <p className="text-sm text-slate-200 max-w-md mx-auto mt-1">
              Tu solicitud para el <strong>Subsidio de Arrendamiento Temporal</strong> ha sido radicada ante Comfamiliar Risaralda.
            </p>
          </div>
        </div>

        {/* Body del Certificado */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Tarjeta de Radicado */}
          <div className="p-5 rounded-3xl bg-blue-50/60 border-2 border-dashed border-[#003B70] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
                Número Único de Radicado
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#003B70] tracking-wide mt-0.5">
                {registro.id}
              </div>
              <div className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1 mt-1">
                <Calendar className="w-3.5 h-3.5 text-[#003B70]" />
                <span>Fecha: {new Date(registro.fechaRegistro).toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            <button
              onClick={handleCopyRadicado}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-sm transition-all shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#003B70]" />
                  <span>Copiar Radicado</span>
                </>
              )}
            </button>
          </div>

          {/* Detalles del Registro */}
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-semibold text-slate-500">Titular Postulante:</span>
              <span className="font-bold text-slate-900">{registro.nombresApellidos}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-semibold text-slate-500">Documento:</span>
              <span className="font-bold text-slate-900">{registro.tipoDocumento} {registro.numeroDocumento}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-semibold text-slate-500">Ubicación Inmueble:</span>
              <span className="font-bold text-slate-900">{registro.municipio} - {registro.barrioVereda}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-slate-500">Modalidad:</span>
              <span className="font-black text-[#003B70] flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-amber-500" />
                Subsidio de Arrendamiento Temporal (0.6 SMMLV / 6 Meses)
              </span>
            </div>
          </div>

          {/* Próximos pasos orientativos */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1.5">
            <strong className="font-bold block flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              ¿Qué pasos siguen a continuación?
            </strong>
            <p>1. Nuestro equipo de Vivienda Comfamiliar revisará el cumplimiento de aportes (&ge; 2 meses dependiente / &ge; 12 meses independiente) y cruce con bases de datos.</p>
            <p>2. Se programará una <strong>visita domiciliaria</strong> para validar las condiciones de habitabilidad de la vivienda urbana a arrendar.</p>
            <p>3. Puedes consultar el estado en cualquier momento con tu cédula en el botón de consulta superior.</p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 hover:bg-white"
            >
              <Printer className="w-4 h-4 text-[#003B70]" />
              <span>Imprimir</span>
            </button>

            <a
              href={`https://wa.me/573135600000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            onClick={() => {
              onClose();
              onGoHome();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#003B70] hover:bg-[#002447] text-white text-xs font-black flex items-center justify-center gap-2 shadow-md uppercase tracking-wider"
          >
            <span>Volver al Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
