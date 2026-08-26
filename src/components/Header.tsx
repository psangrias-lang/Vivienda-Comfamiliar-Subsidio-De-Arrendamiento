import React, { useState } from 'react';
import { ComfamiliarLogo } from './ComfamiliarLogo';
import { KeyRound, LayoutDashboard, Search, Menu, X, PhoneCall, Building2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'portal' | 'censo' | 'admin' | 'empresas';
  setActiveTab: (tab: 'portal' | 'censo' | 'admin' | 'empresas') => void;
  onOpenConsulta: () => void;
  totalCensos: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenConsulta,
  totalCensos,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setActiveTab('portal');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCensoClick = () => {
    setActiveTab('censo');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmpresasClick = () => {
    setActiveTab('empresas');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminClick = () => {
    setActiveTab('admin');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Barra superior de Alerta y Contacto */}
      <div className="bg-gradient-to-r from-[#002447] via-[#003B70] to-[#0A4B8F] text-white text-xs sm:text-sm py-2 px-4 font-medium flex items-center justify-between border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5 truncate">
            <span className="inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black px-2.5 py-0.5 rounded text-[11px] shadow-xs uppercase tracking-wide">
              EMPRESAS & AFILIADOS
            </span>
            <span className="truncate text-slate-100 font-medium text-xs sm:text-sm">
              Censo Post-Sismo y Subsidio de Arrendamiento Temporal • Hasta 0.6 SMMLV por 6 meses
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-200 text-xs shrink-0">
            <button
              onClick={handleEmpresasClick}
              className="text-amber-300 hover:text-white font-black flex items-center gap-1 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Portal de Empresas Aportantes</span>
            </button>
            <span className="text-amber-400/60">|</span>
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              PBX: <strong>(606) 3135600</strong>
            </span>
            <span className="text-amber-400/60">|</span>
            <button 
              onClick={onOpenConsulta}
              className="hover:text-amber-300 underline decoration-amber-400 flex items-center gap-1 font-bold text-white transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              Consultar Radicado
            </button>
          </div>
        </div>
      </div>

      {/* Navbar Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Oficial Comfamiliar Risaralda Vivienda */}
          <button 
            onClick={() => { setActiveTab('portal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left focus:outline-none"
          >
            <ComfamiliarLogo variant="dark" withSubtitle={true} />
          </button>

          {/* Menú de Navegación */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-bold text-slate-700">
            <button
              onClick={() => { setActiveTab('portal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-3 py-2 rounded-xl transition-all ${
                activeTab === 'portal'
                  ? 'text-[#003B70] bg-blue-50 border border-blue-200'
                  : 'hover:text-[#003B70] hover:bg-slate-100'
              }`}
            >
              Inicio
            </button>

            <button
              onClick={() => handleNavClick('arrendamiento-manual')}
              className="px-3 py-2 rounded-xl hover:text-[#003B70] hover:bg-slate-100 transition-all flex items-center gap-1 text-[#003B70]"
            >
              <KeyRound className="w-4 h-4 text-amber-600" />
              <span>Subsidio Arrendamiento</span>
            </button>

            <button
              onClick={() => handleNavClick('condiciones-vivienda')}
              className="px-3 py-2 rounded-xl hover:text-[#003B70] hover:bg-slate-100 transition-all"
            >
              Condiciones del Inmueble
            </button>

            <button
              onClick={() => handleNavClick('simulador-arriendo')}
              className="px-3 py-2 rounded-xl hover:text-[#003B70] hover:bg-slate-100 transition-all"
            >
              Simulador Canon
            </button>

            <button
              onClick={handleEmpresasClick}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'empresas'
                  ? 'text-amber-900 bg-amber-100 border border-amber-300 font-black'
                  : 'text-amber-800 bg-amber-50/80 hover:bg-amber-100'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>Portal Empresas</span>
            </button>

            <button
              onClick={() => handleNavClick('contacto')}
              className="px-3 py-2 rounded-xl hover:text-[#003B70] hover:bg-slate-100 transition-all"
            >
              Contacto
            </button>
          </nav>

          {/* Botones de Acción Superior */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handleEmpresasClick}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                activeTab === 'empresas'
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-black shadow-md'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
              title="Portal de Empresas para Censo de Colaboradores"
            >
              <Building2 className="w-4 h-4 text-amber-700" />
              <span>Portal Empresas</span>
            </button>

            <button
              onClick={handleAdminClick}
              className={`relative px-3 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-[#002447] text-white border-[#002447] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              title="Panel Administrativo de Control y Censo"
            >
              <LayoutDashboard className="w-4 h-4 text-[#003B70]" />
              <span>Admin</span>
              <span className="ml-0.5 px-1.5 py-0.2 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] rounded-full font-black">
                {totalCensos}
              </span>
            </button>

            <button
              onClick={handleCensoClick}
              className={`px-4 py-2.5 rounded-xl font-black text-xs shadow-md transition-all flex items-center gap-1.5 ${
                activeTab === 'censo'
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                  : 'bg-gradient-to-r from-[#003B70] to-[#002447] hover:from-[#002D62] hover:to-[#001A33] text-white border border-amber-400/40 hover:scale-[1.02]'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Postular a Subsidio</span>
            </button>
          </div>

          {/* Botón Móvil */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleEmpresasClick}
              className="px-2.5 py-1.5 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Empresas</span>
            </button>
            <button
              onClick={handleCensoClick}
              className="px-2.5 py-1.5 rounded-lg bg-[#003B70] text-white text-xs font-bold flex items-center gap-1"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Postular</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            <button
              onClick={() => { setActiveTab('portal'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-[#003B70]"
            >
              Inicio
            </button>
            <button
              onClick={handleEmpresasClick}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-amber-700" />
              <span>Portal de Empresas Aportantes</span>
            </button>
            <button
              onClick={() => handleNavClick('arrendamiento-manual')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-[#003B70]"
            >
              Subsidio de Arrendamiento Temporal
            </button>
            <button
              onClick={() => handleNavClick('condiciones-vivienda')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-[#003B70]"
            >
              Condiciones de la Vivienda
            </button>
            <button
              onClick={() => handleNavClick('simulador-arriendo')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-[#003B70]"
            >
              Simulador de Canon y Subsidio
            </button>
            <button
              onClick={() => handleNavClick('documentos-postulacion')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-[#003B70]"
            >
              Documentación Requerida
            </button>
            <button
              onClick={() => handleNavClick('contacto')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-[#003B70]"
            >
              Contacto y Sedes
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={onOpenConsulta}
              className="w-full py-2.5 px-3 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50"
            >
              <Search className="w-4 h-4 text-[#003B70]" />
              <span>Consultar Estado de Radicado</span>
            </button>

            <button
              onClick={handleAdminClick}
              className="w-full py-2.5 px-3 rounded-lg bg-[#002447] text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>Panel Administrativo ({totalCensos} Censos)</span>
            </button>

            <button
              onClick={handleCensoClick}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-sm font-black flex items-center justify-center gap-2 shadow-md"
            >
              <KeyRound className="w-4 h-4 text-slate-950" />
              <span>Postular a Subsidio de Arrendamiento</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
