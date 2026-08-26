import React, { useState } from 'react';
import type { CensoRegistro, NivelDanio } from '../types/censo';
import { MUNICIPIOS_RISARALDA } from '../data/risaraldaMunicipios';
import { 
  Search, Eye, 
  MapPin, Building2, User, X, RefreshCw, FileSpreadsheet, KeyRound
} from 'lucide-react';

import { ComfamiliarLogo } from './ComfamiliarLogo';

interface AdminDashboardProps {
  censos: CensoRegistro[];
  onUpdateStatus: (id: string, newStatus: CensoRegistro['estadoAtencion']) => void;
  onResetSampleData: () => void;
  onBackToPortal: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  censos,
  onUpdateStatus,
  onResetSampleData,
  onBackToPortal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMunicipio, setFilterMunicipio] = useState('todos');
  const [filterNivelDanio, setFilterNivelDanio] = useState('todos');
  const [filterCategoria, setFilterCategoria] = useState('todos');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [selectedCenso, setSelectedCenso] = useState<CensoRegistro | null>(null);

  // Filtrado de datos
  const filteredCensos = censos.filter((c) => {
    const matchesSearch = 
      c.nombresApellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.numeroDocumento.includes(searchTerm) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.barrioVereda.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMunicipio = filterMunicipio === 'todos' || c.municipio === filterMunicipio;
    const matchesDanio = filterNivelDanio === 'todos' || c.nivelDanio === filterNivelDanio;
    const matchesCategoria = filterCategoria === 'todos' || c.categoriaAfiliacion.startsWith(filterCategoria);
    const matchesEstado = filterEstado === 'todos' || c.estadoAtencion === filterEstado;

    return matchesSearch && matchesMunicipio && matchesDanio && matchesCategoria && matchesEstado;
  });

  // Métricas calculadas
  const totalCasos = censos.length;
  const casosCatA = censos.filter((c) => c.categoriaAfiliacion.includes('Cat A')).length;
  const casosEvacuacion = censos.filter((c) => c.requiereEvacuacionInmediata).length;
  const totalMunicipiosAfectados = new Set(censos.map((c) => c.municipio)).size;

  // Exportar a CSV
  const handleExportCSV = () => {
    const headers = [
      'Radicado',
      'Fecha Registro',
      'Tipo Doc',
      'Numero Doc',
      'Nombres y Apellidos',
      'Estado Afiliacion',
      'Categoria Afiliacion',
      'Empresa',
      'Municipio',
      'Barrio Vereda',
      'Direccion',
      'Celular',
      'WhatsApp',
      'Correo',
      'Tenencia',
      'Nivel Danio',
      'Visita DIGER',
      'Acta DIGER',
      'Habitantes',
      'Poblacion Vulnerable',
      'Evacuacion / Solicitud Arriendo',
      'Estado Atencion',
      'Descripcion Danios'
    ];

    const rows = filteredCensos.map((c) => [
      `"${c.id}"`,
      `"${c.fechaRegistro}"`,
      `"${c.tipoDocumento}"`,
      `"${c.numeroDocumento}"`,
      `"${c.nombresApellidos.replace(/"/g, '""')}"`,
      `"${c.estadoAfiliacion}"`,
      `"${c.categoriaAfiliacion}"`,
      `"${(c.empresaDondeLabora || '').replace(/"/g, '""')}"`,
      `"${c.municipio}"`,
      `"${c.barrioVereda.replace(/"/g, '""')}"`,
      `"${c.direccionExacta.replace(/"/g, '""')}"`,
      `"${c.telefonoCelular}"`,
      `"${c.telefonoWhatsapp}"`,
      `"${c.correoElectronico}"`,
      `"${c.tenenciaInmueble}"`,
      `"${c.nivelDanio}"`,
      `"${c.estadoVisitaDIGER}"`,
      `"${c.numeroActaDIGER || 'N/A'}"`,
      `"${c.habitantesAfectados}"`,
      `"${c.hayMenoresOAdultosMayores ? 'SI' : 'NO'}"`,
      `"${c.requiereEvacuacionInmediata ? 'SI' : 'NO'}"`,
      `"${c.estadoAtencion}"`,
      `"${c.descripcionDanios.replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Censo_Arrendamiento_Comfamiliar_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getNivelBadge = (nivel: NivelDanio) => {
    switch (nivel) {
      case 'Severo':
        return <span className="px-2.5 py-1 rounded-full text-xs font-black bg-red-100 text-red-800 border border-red-200">Severo / Evacuación</span>;
      case 'Moderado':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">Moderado</span>;
      case 'Leve':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-[#003B70] border border-blue-200">Leve</span>;
      default:
        return null;
    }
  };

  return (
    <section className="py-10 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <ComfamiliarLogo variant="dark" size="md" />
            <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-slate-900">
                  Panel de Control FOVIS
                </h1>
                <span className="text-xs bg-amber-100 text-amber-900 font-black px-2.5 py-0.5 rounded-full border border-amber-300">
                  Subsidio Arriendo
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Consolidado de postulaciones y visitas domiciliarias en Risaralda.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-[#003B70] hover:bg-[#002447] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>Exportar Excel / CSV ({filteredCensos.length})</span>
            </button>

            <button
              onClick={onResetSampleData}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
              title="Restaurar datos iniciales de prueba"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reiniciar Datos</span>
            </button>

            <button
              onClick={onBackToPortal}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Ver Portal
            </button>
          </div>
        </div>

        {/* Metric Cards KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Postulados</span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{totalCasos}</div>
              <span className="text-[11px] text-emerald-600 font-bold">100% caracterizados</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-2xl text-[#003B70]">
              <User className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subsidio Arriendo Urgente</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">{casosEvacuacion}</div>
              <span className="text-[11px] text-amber-700 font-bold">Inmuebles inhabitables</span>
            </div>
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
              <KeyRound className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hogares Cat A (&le; 2 SMMLV)</span>
              <div className="text-2xl sm:text-3xl font-black text-[#003B70] mt-1">{casosCatA}</div>
              <span className="text-[11px] text-[#003B70] font-bold">Prioridad Manual Gerencial</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-2xl text-[#003B70]">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Municipios Cobertura</span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{totalMunicipiosAfectados}</div>
              <span className="text-[11px] text-slate-500 font-bold">De 14 municipios Risaralda</span>
            </div>
            <div className="p-3 bg-slate-100 rounded-2xl text-slate-700">
              <MapPin className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Buscar por cédula, nombre, radicado o barrio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#003B70] outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              
              <select
                value={filterMunicipio}
                onChange={(e) => setFilterMunicipio(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 outline-none"
              >
                <option value="todos">Todos los Municipios</option>
                {MUNICIPIOS_RISARALDA.map((m) => (
                  <option key={m.id} value={m.nombre}>{m.nombre}</option>
                ))}
              </select>

              <select
                value={filterNivelDanio}
                onChange={(e) => setFilterNivelDanio(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 outline-none"
              >
                <option value="todos">Todos los Daños</option>
                <option value="Severo">Severo / Evacuación</option>
                <option value="Moderado">Moderado</option>
                <option value="Leve">Leve</option>
              </select>

              <select
                value={filterCategoria}
                onChange={(e) => setFilterCategoria(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 outline-none"
              >
                <option value="todos">Todas las Categorías</option>
                <option value="Cat A">Cat A (Hasta 2 SMMLV)</option>
                <option value="Cat B">Cat B (2 a 4 SMMLV)</option>
                <option value="Cat C">Cat C</option>
              </select>

              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 outline-none"
              >
                <option value="todos">Todos los Estados</option>
                <option value="Pendiente Diagnóstico">Pendiente Diagnóstico</option>
                <option value="En Verificación Técnica">En Verificación</option>
                <option value="Visita Programada">Visita Programada</option>
                <option value="Priorizado para Subsidio">Priorizado Arrendamiento</option>
                <option value="Cerrado/Atendido">Cerrado/Atendido</option>
              </select>

            </div>

          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 uppercase font-black text-[11px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-4">Radicado & Fecha</th>
                  <th className="px-5 py-4">Titular / Documento</th>
                  <th className="px-5 py-4">Ubicación & Contacto</th>
                  <th className="px-5 py-4">Afectación</th>
                  <th className="px-5 py-4">Categoría</th>
                  <th className="px-5 py-4">Estado Atención</th>
                  <th className="px-5 py-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredCensos.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      No se encontraron registros que coincidan con los filtros aplicados.
                    </td>
                  </tr>
                ) : (
                  filteredCensos.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      <td className="px-5 py-4">
                        <div className="font-extrabold text-[#003B70]">{c.id}</div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(c.fechaRegistro).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">{c.nombresApellidos}</div>
                        <div className="text-xs text-slate-500">{c.tipoDocumento} {c.numeroDocumento}</div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800">{c.municipio}</div>
                        <div className="text-xs text-slate-500 truncate max-w-[180px]" title={`${c.barrioVereda} - ${c.direccionExacta}`}>
                          {c.barrioVereda}
                        </div>
                        <div className="text-[11px] text-[#003B70] font-bold">{c.telefonoCelular}</div>
                      </td>

                      <td className="px-5 py-4">
                        {getNivelBadge(c.nivelDanio)}
                        {c.requiereEvacuacionInmediata && (
                          <span className="block text-[10px] text-amber-700 font-black mt-1">
                            🔑 Requiere Arriendo
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-[#003B70] border border-blue-200">
                          {c.categoriaAfiliacion.split(' ')[0]} {c.categoriaAfiliacion.split(' ')[1]}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <select
                          value={c.estadoAtencion}
                          onChange={(e) => onUpdateStatus(c.id, e.target.value as CensoRegistro['estadoAtencion'])}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-bold bg-white text-slate-800 outline-none focus:ring-2 focus:ring-[#003B70]"
                        >
                          <option value="Pendiente Diagnóstico">Pendiente Diagnóstico</option>
                          <option value="En Verificación Técnica">En Verificación</option>
                          <option value="Visita Programada">Visita Programada</option>
                          <option value="Priorizado para Subsidio">Priorizado Arrendamiento</option>
                          <option value="Cerrado/Atendido">Cerrado/Atendido</option>
                        </select>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => setSelectedCenso(c)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-[#003B70] text-slate-600 transition-colors inline-flex items-center gap-1 text-xs font-bold"
                          title="Ver Detalle Completo"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">Ver Ficha</span>
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modal Ficha Técnica Completa */}
      {selectedCenso && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border-2 border-amber-400">
            
            <div className="sticky top-0 z-10 bg-[#002447] text-white px-6 py-4 border-b border-amber-400/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  Ficha Técnica de Postulación
                </span>
                <h2 className="text-xl font-black text-white mt-1">
                  Radicado {selectedCenso.id}
                </h2>
              </div>

              <button
                onClick={() => setSelectedCenso(null)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-700">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase block">Nombre del Afiliado</span>
                  <span className="font-bold text-slate-900">{selectedCenso.nombresApellidos}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase block">Documento</span>
                  <span className="font-bold text-slate-900">{selectedCenso.tipoDocumento} {selectedCenso.numeroDocumento}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase block">Estado Afiliación</span>
                  <span>{selectedCenso.estadoAfiliacion}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase block">Categoría Salarial</span>
                  <span className="font-bold text-[#003B70]">{selectedCenso.categoriaAfiliacion}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-[#003B70] font-bold uppercase block">Municipio</span>
                  <span className="font-bold text-slate-900">{selectedCenso.municipio}</span>
                </div>
                <div>
                  <span className="text-xs text-[#003B70] font-bold uppercase block">Barrio / Sector</span>
                  <span className="font-bold text-slate-900">{selectedCenso.barrioVereda}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs text-[#003B70] font-bold uppercase block">Dirección Exacta</span>
                  <span className="font-bold text-slate-900">{selectedCenso.direccionExacta}</span>
                </div>
                <div>
                  <span className="text-xs text-[#003B70] font-bold uppercase block">Celular</span>
                  <span>{selectedCenso.telefonoCelular}</span>
                </div>
                <div>
                  <span className="text-xs text-[#003B70] font-bold uppercase block">WhatsApp</span>
                  <span>{selectedCenso.telefonoWhatsapp}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-900 font-bold uppercase">Severidad del Daño</span>
                  {getNivelBadge(selectedCenso.nivelDanio)}
                </div>
                <div>
                  <span className="text-xs text-amber-900 font-bold uppercase block">Descripción del Daño</span>
                  <p className="mt-1 bg-white p-3 rounded-xl border border-amber-200 leading-relaxed text-slate-800">
                    {selectedCenso.descripcionDanios}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><strong>Tenencia:</strong> {selectedCenso.tenenciaInmueble}</div>
                  <div><strong>Habitantes:</strong> {selectedCenso.habitantesAfectados} personas</div>
                  <div><strong>Visita DIGER:</strong> {selectedCenso.estadoVisitaDIGER}</div>
                  <div><strong>Acta DIGER:</strong> {selectedCenso.numeroActaDIGER || 'No reportada'}</div>
                </div>
              </div>

              {selectedCenso.evidencias && selectedCenso.evidencias.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-3">
                    Evidencias Fotográficas Adjuntas ({selectedCenso.evidencias.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedCenso.evidencias.map((ev) => (
                      <div key={ev.id} className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                        {ev.previewUrl ? (
                          <img
                            src={ev.previewUrl}
                            alt={ev.nombre}
                            className="w-full h-32 object-cover"
                          />
                        ) : (
                          <div className="w-full h-32 flex items-center justify-center text-xs text-slate-400">
                            Sin preview
                          </div>
                        )}
                        <div className="p-2 text-[11px] truncate bg-white font-medium">
                          {ev.nombre}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            <div className="sticky bottom-0 bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Registrado el {new Date(selectedCenso.fechaRegistro).toLocaleString('es-CO')}
              </span>
              <button
                onClick={() => setSelectedCenso(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Cerrar Ficha
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
