import React, { useState } from 'react';
import { ComfamiliarLogo } from './ComfamiliarLogo';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Calendar } from 'lucide-react';
import { ModalCronograma } from './ModalCronograma';

interface FooterProps {
  onStartCenso?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const [isCronogramaOpen, setIsCronogramaOpen] = useState(false);

  return (
    <footer id="contacto" className="bg-[#002447] text-slate-300 pt-16 pb-12 border-t-2 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-700">
          
          {/* Col 1: Identidad Institucional */}
          <div className="space-y-4">
            <ComfamiliarLogo variant="light" withSubtitle={true} />

            <p className="text-xs text-slate-300 leading-relaxed">
              Vivienda Comfamiliar Risaralda. Comprometidos con el bienestar integral, la asignación del Subsidio de Arrendamiento Temporal y la solución habitacional de las familias de Risaralda.
            </p>
          </div>

          {/* Col 2: Sedes Principales */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Sede de Atención</span>
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                <strong className="text-white block font-bold mb-0.5">Sede Dosquebradas:</strong>
                <span>Avenida Simón Bolívar # 35-02</span>
              </div>
            </div>
          </div>

          {/* Col 3: Canales de Atención & PBX */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Líneas y Contacto</span>
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>PBX Pereira: <strong>(606) 3135700 opción 5</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:vivienda@comfamiliar.com" className="hover:text-amber-300 transition-colors font-medium">
                  vivienda@comfamiliar.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Horarios & Cronograma */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Horarios y Cronograma</span>
            </h4>

            <div className="text-xs text-slate-300 space-y-2">
              <p>
                <strong className="text-white block font-bold">Lunes a Jueves:</strong>
                8:00 a.m. a 12:00 m. y 1:00 p.m. a 4:00 p.m.
              </p>
              <p>
                <strong className="text-white block font-bold">Viernes:</strong>
                8:00 a.m. a 12:00 m. y 1:00 p.m. a 3:45 p.m.
              </p>

              <div className="pt-1">
                <button
                  onClick={() => setIsCronogramaOpen(true)}
                  className="w-full mt-1.5 p-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black flex items-center justify-center gap-2 shadow-md transition-all text-xs cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Ver Cronograma 2026</span>
                </button>
              </div>
            </div>

            <div className="pt-2 p-3 rounded-2xl bg-slate-800/90 border border-amber-400/40 text-[11px] text-amber-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Vigilado por la Superintendencia del Subsidio Familiar.</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Caja de Compensación Familiar de Risaralda - Comfamiliar Risaralda. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="https://script.google.com/a/macros/comfamiliar.com/s/AKfycbw_qwM8cFFdtUw035AIuGP875I-yWtRJ0sJs4IA9ctSlAGrJ3BMJf-x56CGVcQuK-j4/exec" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-300 hover:text-white font-bold underline"
            >
              Formulario Oficial de Empresas (Google Apps Script) ↗
            </a>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Manual de Operación Gerencial</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Habeas Data (Ley 1581)</span>
          </div>
        </div>

      </div>

      {/* Modal Cronograma */}
      <ModalCronograma 
        isOpen={isCronogramaOpen} 
        onClose={() => setIsCronogramaOpen(false)} 
      />
    </footer>
  );
};
