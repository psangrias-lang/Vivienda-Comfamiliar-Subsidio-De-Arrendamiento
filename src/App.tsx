import { useState, useEffect } from 'react';
import type { CensoRegistro } from './types/censo';
import { INITIAL_CENSOS } from './data/initialCensos';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SubsidioArrendamientoSection } from './components/SubsidioArrendamientoSection';
import { SimuladorSubsidio } from './components/SimuladorSubsidio';
import { SubsidiosSection } from './components/SubsidiosSection';
import { RequisitosAccordion } from './components/RequisitosAccordion';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { PortalEmpresas } from './components/PortalEmpresas';
import { ConsultaRadicadoModal } from './components/ConsultaRadicadoModal';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'censo_vivienda_comfamiliar_records_v2';
const ADMIN_AUTH_KEY = 'fovis_admin_session_auth';

export function App() {
  const [activeTab, setActiveTab] = useState<'portal' | 'censo' | 'admin' | 'empresas'>('portal');
  const [isConsultaOpen, setIsConsultaOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  });

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

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setActiveTab('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAdminAuthenticated(false);
    setActiveTab('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdminAccess = () => {
    setActiveTab('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Header Institucional */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenConsulta={() => setIsConsultaOpen(true)}
      />

      {/* Contenido Principal según Pestaña Activa */}
      <main className="flex-1">
        {activeTab === 'portal' && (
          <>
            <HeroSection
              onExploreArrendamiento={handleExploreArrendamiento}
              onOpenSimulador={handleOpenSimulador}
              onOpenPortalEmpresas={handleOpenPortalEmpresas}
            />
            
            {/* Sección Central Foco: Subsidio de Arrendamiento (Manual Oficial) */}
            <SubsidioArrendamientoSection />

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

        {activeTab === 'admin' && (
          isAdminAuthenticated ? (
            <AdminDashboard
              censos={censos}
              onUpdateStatus={handleUpdateStatus}
              onResetSampleData={handleResetSampleData}
              onBackToPortal={() => {
                setActiveTab('portal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onLogout={handleAdminLogout}
            />
          ) : (
            <AdminLogin
              onLoginSuccess={handleAdminLoginSuccess}
              onCancel={() => {
                setActiveTab('portal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )
        )}
      </main>

      {/* Footer Institucional */}
      <Footer 
        onOpenAdmin={handleOpenAdminAccess}
      />

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
