import { useState, useEffect } from 'react';
import type { CensoRegistro } from './types/censo';
import { INITIAL_CENSOS } from './data/initialCensos';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SubsidioArrendamientoSection } from './components/SubsidioArrendamientoSection';
import { SimuladorSubsidio } from './components/SimuladorSubsidio';
import { SubsidiosSection } from './components/SubsidiosSection';
import { RequisitosAccordion } from './components/RequisitosAccordion';
import { PortalEmpresas } from './components/PortalEmpresas';
import { Footer } from './components/Footer';
import { ModalCronograma } from './components/ModalCronograma';

const STORAGE_KEY = 'censo_vivienda_comfamiliar_records_v2';

export function App() {
  const [activeTab, setActiveTab] = useState<'portal' | 'censo' | 'empresas'>('portal');
  const [isCronogramaOpen, setIsCronogramaOpen] = useState(false);

  // Inicializar estado con LocalStorage o datos iniciales
  const [censos] = useState<CensoRegistro[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading initial censos from localStorage', e);
    }
    return INITIAL_CENSOS;
  });

  // Guardar en LocalStorage al haber cambios
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(censos));
    } catch (e) {
      console.error('Error saving censos to localStorage', e);
    }
  }, [censos]);

  const handleOpenPortalEmpresas = () => {
    setActiveTab('empresas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreArrendamiento = () => {
    setActiveTab('portal');
    setTimeout(() => {
      const el = document.getElementById('arrendamiento-manual');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOpenSimulador = () => {
    setActiveTab('portal');
    setTimeout(() => {
      const el = document.getElementById('simulador-arriendo');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Header Institucional */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCronograma={() => setIsCronogramaOpen(true)}
      />

      {/* Contenido Principal según Pestaña Activa */}
      <main className="flex-1">
        {activeTab === 'portal' && (
          <>
            <HeroSection
              onExploreArrendamiento={handleExploreArrendamiento}
              onOpenSimulador={handleOpenSimulador}
              onOpenPortalEmpresas={handleOpenPortalEmpresas}
              onOpenCronograma={() => setIsCronogramaOpen(true)}
            />
            
            {/* Sección Central Foco: Subsidio de Arrendamiento (Manual Oficial) */}
            <SubsidioArrendamientoSection 
              onOpenCronograma={() => setIsCronogramaOpen(true)}
            />

            {/* Simulador Interactivo de Canon y Subsidio */}
            <SimuladorSubsidio />

            {/* Portafolio Completo FOVIS */}
            <SubsidiosSection />

            {/* Requisitos, Validaciones y FAQ */}
            <RequisitosAccordion />
          </>
        )}

        {activeTab === 'censo' && (
          <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-3xl shadow-xl border border-slate-200 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-2xl font-black">⚙️</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Formulario en Proceso de Actualización
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              El formulario de postulación se encuentra temporalmente en actualización. Por favor accede a través del <strong>Portal de Empresas</strong> o consulta los requisitos del manual.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('empresas');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Ir a Portal Empresas
              </button>
              <button
                onClick={() => {
                  setActiveTab('portal');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all cursor-pointer"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        )}

        {activeTab === 'empresas' && (
          <PortalEmpresas
            onBackToPortal={() => {
              setActiveTab('portal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer Institucional */}
      <Footer onOpenCronograma={() => setIsCronogramaOpen(true)} />

      {/* Modal Cronograma Global */}
      <ModalCronograma 
        isOpen={isCronogramaOpen} 
        onClose={() => setIsCronogramaOpen(false)} 
      />
    </div>
  );
}

export default App;
