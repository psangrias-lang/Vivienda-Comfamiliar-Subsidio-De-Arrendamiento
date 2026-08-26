import { useState, useEffect } from 'react';
import type { CensoRegistro } from './types/censo';
import { INITIAL_CENSOS } from './data/initialCensos';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SubsidioArrendamientoSection } from './components/SubsidioArrendamientoSection';
import { SimuladorSubsidio } from './components/SimuladorSubsidio';
import { SubsidiosSection } from './components/SubsidiosSection';
import { RequisitosAccordion } from './components/RequisitosAccordion';
import { MultiStepCenso } from './components/CensoForm/MultiStepCenso';
import { AdminDashboard } from './components/AdminDashboard';
import { PortalEmpresas } from './components/PortalEmpresas';
import { ConsultaRadicadoModal } from './components/ConsultaRadicadoModal';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'censo_vivienda_comfamiliar_records_v2';

export function App() {
  const [activeTab, setActiveTab] = useState<'portal' | 'censo' | 'admin' | 'empresas'>('portal');
  const [isConsultaOpen, setIsConsultaOpen] = useState(false);

  // Inicializar estado con LocalStorage o datos iniciales
  const [censos, setCensos] = useState<CensoRegistro[]>(() => {
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

  // Guardar nuevo registro de censo / postulación
  const handleSaveRegistro = (nuevoRegistro: CensoRegistro) => {
    setCensos((prev) => [nuevoRegistro, ...prev]);
  };

  // Actualizar estado de atención desde el panel administrativo
  const handleUpdateStatus = (id: string, newStatus: CensoRegistro['estadoAtencion']) => {
    setCensos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, estadoAtencion: newStatus } : c))
    );
  };

  // Reiniciar a datos iniciales de prueba
  const handleResetSampleData = () => {
    if (window.confirm('¿Deseas reiniciar los registros a los datos de muestra iniciales?')) {
      setCensos(INITIAL_CENSOS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CENSOS));
    }
  };

  const handleStartCenso = () => {
    setActiveTab('censo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        onOpenConsulta={() => setIsConsultaOpen(true)}
        totalCensos={censos.length}
      />

      {/* Contenido Principal según Pestaña Activa */}
      <main className="flex-1">
        {activeTab === 'portal' && (
          <>
            <HeroSection
              onStartCenso={handleStartCenso}
              onExploreArrendamiento={handleExploreArrendamiento}
              onOpenSimulador={handleOpenSimulador}
              onOpenPortalEmpresas={handleOpenPortalEmpresas}
            />
            
            {/* Sección Central Foco: Subsidio de Arrendamiento (Manual Oficial) */}
            <SubsidioArrendamientoSection
              onStartPostulacion={handleStartCenso}
            />

            {/* Simulador Interactivo de Canon y Subsidio */}
            <SimuladorSubsidio
              onStartCenso={handleStartCenso}
            />

            {/* Portafolio Completo FOVIS */}
            <SubsidiosSection
              onStartCenso={handleStartCenso}
            />

            {/* Requisitos, Validaciones y FAQ */}
            <RequisitosAccordion />
          </>
        )}

        {activeTab === 'censo' && (
          <MultiStepCenso
            onSaveRegistro={handleSaveRegistro}
            onCancel={() => {
              setActiveTab('portal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'empresas' && (
          <PortalEmpresas
            onBackToPortal={() => {
              setActiveTab('portal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            censos={censos}
            onUpdateStatus={handleUpdateStatus}
            onResetSampleData={handleResetSampleData}
            onBackToPortal={() => {
              setActiveTab('portal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer Institucional */}
      <Footer onStartCenso={handleStartCenso} />

      {/* Modal Consulta de Radicado */}
      <ConsultaRadicadoModal
        censos={censos}
        isOpen={isConsultaOpen}
        onClose={() => setIsConsultaOpen(false)}
      />

    </div>
  );
}

export default App;
