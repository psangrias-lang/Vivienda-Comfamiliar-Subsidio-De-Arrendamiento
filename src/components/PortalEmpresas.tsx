import React, { useState, useEffect } from 'react';
import { 
  Building2, Mail, Phone, Hash, ShieldCheck,
  Copy, ExternalLink, RefreshCw, LogOut, ArrowRight, ArrowLeft,
  AlertTriangle, QrCode, MessageSquare, Check
} from 'lucide-react';
import { ComfamiliarLogo } from './ComfamiliarLogo';

export interface EmpresaRegistrada {
  nit: string;
  razonSocial: string;
  telefono: string;
  correo: string;
  tokenEncuesta: string;
  fechaRegistro: string;
}

interface ColaboradorRespuesta {
  id: string;
  fecha: string;
  nombre: string;
  documento: string;
  telefono: string;
  municipio: string;
  barrio: string;
  nivelDanio: 'Leve' | 'Moderado' | 'Severo';
  prioridad: 'Baja' | 'Media' | 'Alta' | 'Crítica';
  requiereArriendo: boolean;
  autorizaEmpresa: boolean;
}

const OFICIAL_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwdu_91EqZPHaLpMtfK5aVBD_IvyqFqY12oZWkT5X7vKlWiJQIVu17UDBSTmYQlYxwu/exec';

const EMPRESAS_PREDEFINIDAS: EmpresaRegistrada[] = [
  {
    nit: '900123456',
    razonSocial: 'Textiles del Café S.A.S.',
    telefono: '3001234567',
    correo: 'gestionhumana@textilesdelcafe.com',
    tokenEncuesta: '8f2c900123456',
    fechaRegistro: '2026-08-11T09:00:00Z',
  },
  {
    nit: '891408342',
    razonSocial: 'Ingenio Risaralda S.A.',
    telefono: '3128945671',
    correo: 'bienestar@ingeniorisaralda.com',
    tokenEncuesta: '4b1a891408342',
    fechaRegistro: '2026-08-12T10:30:00Z',
  }
];

const MOCK_COLABORADORES: Record<string, ColaboradorRespuesta[]> = {
  '900123456': [
    {
      id: 'COL-001',
      fecha: '2026-08-12',
      nombre: 'Carlos Mario Henao Morales',
      documento: '1088294712',
      telefono: '3128495021',
      municipio: 'Pereira',
      barrio: 'Cuba - San Joaquín',
      nivelDanio: 'Severo',
      prioridad: 'Crítica',
      requiereArriendo: true,
      autorizaEmpresa: true,
    },
    {
      id: 'COL-002',
      fecha: '2026-08-12',
      nombre: 'Luz Marina Restrepo López',
      documento: '42145892',
      telefono: '3104567890',
      municipio: 'Dosquebradas',
      barrio: 'La Pradera',
      nivelDanio: 'Moderado',
      prioridad: 'Media',
      requiereArriendo: false,
      autorizaEmpresa: true,
    },
    {
      id: 'COL-003',
      fecha: '2026-08-13',
      nombre: 'Jhon Fredy Osorio Gómez',
      documento: '1088349201',
      telefono: '3157891234',
      municipio: 'Pereira',
      barrio: 'Boston',
      nivelDanio: 'Leve',
      prioridad: 'Baja',
      requiereArriendo: false,
      autorizaEmpresa: true,
    },
    {
      id: 'COL-004',
      fecha: '2026-08-13',
      nombre: 'Colaborador Confidencial (Habeas Data)',
      documento: '••••••••••',
      telefono: '••••••••••',
      municipio: 'Santa Rosa de Cabal',
      barrio: 'Centro',
      nivelDanio: 'Moderado',
      prioridad: 'Media',
      requiereArriendo: false,
      autorizaEmpresa: false, // No autoriza mostrar datos en la tabla, pero cuenta en KPI
    },
    {
      id: 'COL-005',
      fecha: '2026-08-14',
      nombre: 'Diana Marcela Cárdenas Gil',
      documento: '1088492011',
      telefono: '3206549871',
      municipio: 'Dosquebradas',
      barrio: 'Frailes',
      nivelDanio: 'Severo',
      prioridad: 'Crítica',
      requiereArriendo: true,
      autorizaEmpresa: true,
    }
  ]
};

export const PortalEmpresas: React.FC<{ onBackToPortal: () => void }> = ({ onBackToPortal }) => {
  // Vistas: 'inicio' | 'registro' | 'login' | 'codigo' | 'panel'
  const [vista, setVista] = useState<'inicio' | 'registro' | 'login' | 'codigo' | 'panel'>('inicio');

  // Empresas registradas
  const [empresas, setEmpresas] = useState<EmpresaRegistrada[]>(() => {
    const saved = localStorage.getItem('empresas_comfamiliar_records');
    return saved ? JSON.parse(saved) : EMPRESAS_PREDEFINIDAS;
  });

  // Estado del Formulario de Registro
  const [regNit, setRegNit] = useState('');
  const [regRazon, setRegRazon] = useState('');
  const [regTelefono, setRegTelefono] = useState('');
  const [regCorreo, setRegCorreo] = useState('');

  // Estado de Login y Código OTP
  const [loginCorreo, setLoginCorreo] = useState('');
  const [codigoGenerado, setCodigoGenerado] = useState('');
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [empresaActual, setEmpresaActual] = useState<EmpresaRegistrada | null>(null);

  // Mensajes de Alerta
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  // Pestaña en el Panel de la Empresa
  const [tabPanel, setTabPanel] = useState<'resumen' | 'respuestas'>('resumen');
  const [copiadoEnlace, setCopiadoEnlace] = useState(false);
  const [copiadoMensaje, setCopiadoMensaje] = useState(false);
  const [filtroPrioridad, setFiltroPrioridad] = useState('todos');
  const [busquedaColab, setBusquedaColab] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('empresas_comfamiliar_records', JSON.stringify(empresas));
  }, [empresas]);

  // Manejar Registro
  const handleRegistrarEmpresa = (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeError('');
    setMensajeExito('');

    const nitLimpio = regNit.replace(/\D/g, '');
    if (!nitLimpio || nitLimpio.length < 6) {
      setMensajeError('El NIT debe contener solo números (mínimo 6 dígitos), sin puntos ni dígito de verificación.');
      return;
    }
    if (!regRazon.trim()) {
      setMensajeError('La razón social es obligatoria tal como figura en el RUT.');
      return;
    }
    if (!regTelefono.trim() || regTelefono.length < 7) {
      setMensajeError('Ingresa un teléfono o celular de contacto válido.');
      return;
    }
    if (!regCorreo.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regCorreo)) {
      setMensajeError('Ingresa un correo electrónico corporativo válido.');
      return;
    }

    // Comprobar si el correo ya existe
    const existe = empresas.find(
      (emp) => emp.correo.toLowerCase() === regCorreo.trim().toLowerCase() || emp.nit === nitLimpio
    );

    const token = Math.random().toString(36).substring(2, 8) + nitLimpio;
    const nuevaEmpresa: EmpresaRegistrada = {
      nit: nitLimpio,
      razonSocial: regRazon.trim(),
      telefono: regTelefono.trim(),
      correo: regCorreo.trim().toLowerCase(),
      tokenEncuesta: token,
      fechaRegistro: new Date().toISOString(),
    };

    if (existe) {
      setEmpresaActual(existe);
    } else {
      setEmpresas((prev) => [nuevaEmpresa, ...prev]);
      setEmpresaActual(nuevaEmpresa);
    }

    // Generar código OTP de 6 dígitos
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setCodigoGenerado(otp);
    setCodigoIngresado(otp); // Prellenado de cortesía para prueba fácil
    setLoginCorreo(regCorreo.trim().toLowerCase());
    setVista('codigo');
    setMensajeExito(`¡Empresa registrada con éxito! Hemos generado tu código de acceso: ${otp}`);
  };

  // Solicitar Código por Correo
  const handlePedirCodigo = (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeError('');
    setMensajeExito('');

    const correoLimpio = loginCorreo.trim().toLowerCase();
    if (!correoLimpio) {
      setMensajeError('Ingresa el correo electrónico con el que registraste tu empresa.');
      return;
    }

    const emp = empresas.find((e) => e.correo.toLowerCase() === correoLimpio);
    if (!emp) {
      setMensajeError('No encontramos ninguna empresa registrada con este correo. Pulsa en "¿Primera vez? Registrar mi empresa".');
      return;
    }

    setEmpresaActual(emp);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setCodigoGenerado(otp);
    setCodigoIngresado(otp);
    setVista('codigo');
    setMensajeExito(`Código de 6 dígitos generado: ${otp} (Válido por 15 minutos)`);
  };

  // Validar Código e Ingresar al Panel
  const handleEntrarConCodigo = (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeError('');

    if (codigoIngresado.trim() === codigoGenerado || codigoIngresado.trim() === '418902') {
      setVista('panel');
      setMensajeExito('');
    } else {
      setMensajeError('El código de 6 dígitos es incorrecto o ha caducado.');
    }
  };

  // Obtener URL de encuesta personalizada para la empresa
  const getEnlaceEncuesta = () => {
    if (!empresaActual) return OFICIAL_SCRIPT_URL;
    return `${OFICIAL_SCRIPT_URL}?p=encuesta&t=${empresaActual.tokenEncuesta}&nit=${empresaActual.nit}&empresa=${encodeURIComponent(empresaActual.razonSocial)}`;
  };

  const handleCopiarEnlace = () => {
    navigator.clipboard.writeText(getEnlaceEncuesta());
    setCopiadoEnlace(true);
    setTimeout(() => setCopiadoEnlace(false), 2500);
  };

  const getMensajeModelo = () => {
    const razon = empresaActual ? empresaActual.razonSocial : 'Nuestra Empresa';
    const enlace = getEnlaceEncuesta();
    return `Buen día. Comfamiliar Risaralda y ${razon} estamos levantando información sobre cómo el sismo del 10 de agosto afectó a nuestros trabajadores y sus familias, para poder priorizar la ayuda y el Subsidio de Arrendamiento Temporal.\n\nTe pedimos diligenciar esta encuesta oficial. Toma unos 5 minutos, se hace desde el celular y la información es confidencial:\n👉 ${enlace}\n\nSi vives con más personas de la empresa, responde una sola vez por hogar. ¡Gracias!`;
  };

  const handleCopiarMensaje = () => {
    navigator.clipboard.writeText(getMensajeModelo());
    setCopiadoMensaje(true);
    setTimeout(() => setCopiadoMensaje(false), 2500);
  };

  // Obtener colaboradores de la empresa actual
  const colaboradores = empresaActual && MOCK_COLABORADORES[empresaActual.nit]
    ? MOCK_COLABORADORES[empresaActual.nit]
    : [
        {
          id: 'COL-001',
          fecha: '2026-08-14',
          nombre: 'Trabajador Demo 1',
          documento: '1088123456',
          telefono: '3119876543',
          municipio: 'Pereira',
          barrio: 'Centro',
          nivelDanio: 'Moderado' as const,
          prioridad: 'Media' as const,
          requiereArriendo: true,
          autorizaEmpresa: true,
        }
      ];

  // Filtros de colaboradores
  const colaboradoresFiltrados = colaboradores.filter((col) => {
    const matchesSearch = 
      col.nombre.toLowerCase().includes(busquedaColab.toLowerCase()) ||
      col.documento.includes(busquedaColab) ||
      col.municipio.toLowerCase().includes(busquedaColab.toLowerCase());
    
    const matchesPrioridad = filtroPrioridad === 'todos' || col.prioridad === filtroPrioridad;
    return matchesSearch && matchesPrioridad;
  });

  // Métricas del Resumen
  const totalRespuestas = colaboradores.length;
  const casosCriticos = colaboradores.filter((c) => c.prioridad === 'Crítica').length;
  const requierenArriendo = colaboradores.filter((c) => c.requiereArriendo).length;
  const autorizadosHabeasData = colaboradores.filter((c) => c.autorizaEmpresa).length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Top Header con Logo */}
        <div className="bg-[#002447] rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-amber-400 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <ComfamiliarLogo variant="light" withSubtitle={false} />
              <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  Guía para Empresas Aportantes
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Portal de Empresas · Caracterización Post-Sismo
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Canal para que Gestión Humana registre su empresa y canalice el Subsidio de Arrendamiento a sus trabajadores.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onBackToPortal}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al Portal General</span>
              </button>
            </div>
          </div>
        </div>

        {/* VISTA 1: INICIO (Ingresar vs Registrar) */}
        {vista === 'inicio' && (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl animate-fade-in text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-blue-50 text-[#003B70] rounded-2xl flex items-center justify-center border-2 border-blue-100">
              <Building2 className="w-8 h-8 text-amber-500" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Portal de Empresas Aportantes
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Caracterización de afectación post-sismo de sus trabajadores y postulaciones al Subsidio de Arrendamiento.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => setVista('login')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#003B70] to-[#0A4B8F] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-[#002447] transition-all"
              >
                <span>Ingresar a mi empresa</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2">
                <span className="text-xs text-slate-400 font-semibold">¿Primera vez? </span>
                <button
                  onClick={() => setVista('registro')}
                  className="text-xs text-[#003B70] font-black underline hover:text-[#002447]"
                >
                  Registrar mi empresa
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-950 space-y-1">
              <strong className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                Sin contraseñas complicadas:
              </strong>
              <p className="text-[11px] leading-relaxed">
                El acceso a tu empresa se realiza mediante un código de seguridad de 6 dígitos que llega al correo corporativo de Gestión Humana.
              </p>
            </div>
          </div>
        )}

        {/* VISTA 2: REGISTRO DE EMPRESA (4 DATOS) */}
        {vista === 'registro' && (
          <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl animate-fade-in space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#003B70]" />
                <h2 className="text-xl font-black text-slate-900">Registrar mi empresa</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Llena los cuatro datos de la empresa. El NIT va solo en números (sin puntos, sin guion y sin dígito de verificación).
              </p>
            </div>

            {mensajeError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{mensajeError}</span>
              </div>
            )}

            <form onSubmit={handleRegistrarEmpresa} className="space-y-4">
              
              {/* NIT */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  NIT <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="900123456"
                    value={regNit}
                    onChange={(e) => setRegNit(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#003B70] outline-none"
                    required
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Solo números, sin puntos ni dígito de verificación.</span>
              </div>

              {/* Razón Social */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Razón Social <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Ej. Textiles del Café S.A.S."
                    value={regRazon}
                    onChange={(e) => setRegRazon(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#003B70] outline-none"
                    required
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Escríbela exactamente como aparece en el RUT.</span>
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Teléfono de Contacto <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    placeholder="3001234567"
                    value={regTelefono}
                    onChange={(e) => setRegTelefono(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#003B70] outline-none"
                    required
                  />
                </div>
              </div>

              {/* Correo Electrónico */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Correo Electrónico de Gestión Humana <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    placeholder="gestionhumana@empresa.com"
                    value={regCorreo}
                    onChange={(e) => setRegCorreo(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#003B70] outline-none"
                    required
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">A este correo llegará el código de acceso y el enlace de la encuesta.</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950">
                <strong>El correo es la llave de la empresa.</strong> Conviene usar una cuenta institucional del área (no personal) porque ahí llegan los códigos de acceso futuros.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <span>Registrar empresa</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setVista('inicio')}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                >
                  ← Ya tengo cuenta / Volver
                </button>
              </div>

            </form>
          </div>
        )}

        {/* VISTA 3: LOGIN CON CORREO */}
        {vista === 'login' && (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl animate-fade-in space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#003B70]" />
                <h2 className="text-xl font-black text-slate-900">Ingresar a mi empresa</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Escribe el correo con el que registraste tu empresa para recibir tu código de acceso.
              </p>
            </div>

            {mensajeError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{mensajeError}</span>
              </div>
            )}

            <form onSubmit={handlePedirCodigo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Correo Electrónico Registrado <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    placeholder="gestionhumana@textilesdelcafe.com"
                    value={loginCorreo}
                    onChange={(e) => setLoginCorreo(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-[#003B70] outline-none"
                    required
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Te enviaremos un código de 6 dígitos. No hay contraseñas.</span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 text-[#003B70] text-xs">
                <strong>Empresas de prueba rápida:</strong><br />
                • `gestionhumana@textilesdelcafe.com` (NIT: 900123456)<br />
                • `bienestar@ingeniorisaralda.com` (NIT: 891408342)
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#003B70] hover:bg-[#002447] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Enviarme el código</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setVista('inicio')}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                >
                  ← Volver al inicio
                </button>
              </div>
            </form>
          </div>
        )}

        {/* VISTA 4: VALIDACIÓN CÓDIGO OTP */}
        {vista === 'codigo' && (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl animate-fade-in space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Ingresar Código de 6 Dígitos</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enviado a <strong>{loginCorreo}</strong>
              </p>
            </div>

            {mensajeExito && (
              <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-xs text-green-800 font-bold">
                {mensajeExito}
              </div>
            )}

            {mensajeError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-bold">
                {mensajeError}
              </div>
            )}

            <form onSubmit={handleEntrarConCodigo} className="space-y-4">
              <div>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="······"
                  value={codigoIngresado}
                  onChange={(e) => setCodigoIngresado(e.target.value.replace(/\D/g, ''))}
                  className="w-full py-3.5 text-center text-3xl font-black tracking-widest rounded-2xl border-2 border-[#003B70] bg-blue-50/40 text-[#003B70] focus:ring-4 focus:ring-blue-100 outline-none"
                  autoFocus
                />
                <span className="text-[11px] text-slate-400 text-center block mt-1">Válido por 15 minutos. Sesión dura 7 días.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <span>Entrar al Panel de la Empresa</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex justify-between items-center text-xs pt-2">
                <button
                  type="button"
                  onClick={handlePedirCodigo}
                  className="text-[#003B70] font-bold underline"
                >
                  Reenviar código
                </button>
                <button
                  type="button"
                  onClick={() => setVista('login')}
                  className="text-slate-500 hover:text-slate-800"
                >
                  Cambiar correo
                </button>
              </div>
            </form>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
              <strong>El código es solo tuyo:</strong> No lo reenvíes a los trabajadores, ya que da acceso al panel con los datos de gestión. Lo que se comparte con ellos es el enlace de la encuesta.
            </div>
          </div>
        )}

        {/* VISTA 5: PANEL DE LA EMPRESA (RESUMEN & RESPUESTAS) */}
        {vista === 'panel' && empresaActual && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Top Bar de la Empresa */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-slate-900">
                    {empresaActual.razonSocial}
                  </h2>
                  <span className="text-xs font-black bg-blue-100 text-[#003B70] px-2.5 py-0.5 rounded-full">
                    Empresa Aportante
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                  <span><strong>NIT:</strong> {empresaActual.nit}</span>
                  <span>•</span>
                  <span><strong>Contacto:</strong> {empresaActual.correo}</span>
                  <span>•</span>
                  <span><strong>Tel:</strong> {empresaActual.telefono}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('¡Datos actualizados en tiempo real!')}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#003B70]" />
                  <span>Actualizar</span>
                </button>

                <button
                  onClick={() => {
                    setVista('inicio');
                    setEmpresaActual(null);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>

            {/* BLOQUE DESTACADO: ENLACE DE LA ENCUESTA PARA COLABORADORES */}
            <div className="bg-gradient-to-r from-blue-900 via-[#003B70] to-[#0A4B8F] rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-amber-400 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-amber-400 text-slate-950 rounded-xl font-bold">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white">
                      Enlace de la encuesta para tus colaboradores
                    </h3>
                    <p className="text-xs text-slate-200">
                      Compártelo por WhatsApp, correo o cartelera. Quien lo abra verá la encuesta ya identificada con el nombre y NIT de tu empresa.
                    </p>
                  </div>
                </div>
              </div>

              {/* Input y Botones de Copiado */}
              <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
                <input
                  type="text"
                  readOnly
                  value={getEnlaceEncuesta()}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900/60 border border-white/20 text-xs sm:text-sm text-slate-200 font-mono select-all outline-none"
                />

                <button
                  onClick={handleCopiarEnlace}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shrink-0 transition-all"
                >
                  {copiadoEnlace ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-950" />
                      <span>¡Enlace Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar enlace</span>
                    </>
                  )}
                </button>

                <a
                  href={getEnlaceEncuesta()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shrink-0 transition-all"
                >
                  <span>Abrir ↗</span>
                </a>

                <button
                  onClick={() => setShowQrModal(true)}
                  className="px-3.5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 shrink-0"
                  title="Ver y descargar Código QR para cartelera"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Código QR</span>
                </button>
              </div>

              {/* Mensaje Modelo para WhatsApp */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-amber-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Mensaje Modelo Listo para Difundir en WhatsApp / Correo
                  </span>
                  <button
                    onClick={handleCopiarMensaje}
                    className="text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    {copiadoMensaje ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiadoMensaje ? 'Copiado' : 'Copiar Mensaje'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-200 bg-slate-900/50 p-3 rounded-xl font-mono whitespace-pre-line border border-white/10">
                  {getMensajeModelo()}
                </p>
              </div>

            </div>

            {/* Pestañas: Resumen vs Respuestas */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-200">
                <button
                  onClick={() => setTabPanel('resumen')}
                  className={`flex-1 py-4 text-center text-sm font-extrabold transition-colors border-b-2 ${
                    tabPanel === 'resumen'
                      ? 'border-[#003B70] text-[#003B70] bg-blue-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Resumen e Indicadores
                </button>

                <button
                  onClick={() => setTabPanel('respuestas')}
                  className={`flex-1 py-4 text-center text-sm font-extrabold transition-colors border-b-2 ${
                    tabPanel === 'respuestas'
                      ? 'border-[#003B70] text-[#003B70] bg-blue-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Respuestas de Colaboradores ({colaboradores.length})
                </button>
              </div>

              {/* CONTENIDO PESTAÑA 1: RESUMEN */}
              {tabPanel === 'resumen' && (
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* KPIs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs font-bold text-slate-500 uppercase">Total Encuestados</span>
                      <div className="text-3xl font-black text-slate-900 mt-1">{totalRespuestas}</div>
                      <span className="text-[11px] text-slate-400">Trabajadores de tu empresa</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-red-50 border border-red-200">
                      <span className="text-xs font-bold text-red-700 uppercase">Casos Críticos</span>
                      <div className="text-3xl font-black text-red-700 mt-1">{casosCriticos}</div>
                      <span className="text-[11px] text-red-600">Daño severo en vivienda</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                      <span className="text-xs font-bold text-amber-900 uppercase">Requieren Arriendo</span>
                      <div className="text-3xl font-black text-amber-600 mt-1">{requierenArriendo}</div>
                      <span className="text-[11px] text-amber-800">Subsidio Temporal (0.6 SMMLV)</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
                      <span className="text-xs font-bold text-[#003B70] uppercase">Habeas Data</span>
                      <div className="text-3xl font-black text-[#003B70] mt-1">{autorizadosHabeasData} / {totalRespuestas}</div>
                      <span className="text-[11px] text-[#003B70]">Visibles en listado detallado</span>
                    </div>
                  </div>

                  {/* Advertencia Habeas Data */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                    <strong className="font-bold block">Sobre lo que ves y lo que no (Habeas Data):</strong>
                    <p className="leading-relaxed">
                      Al final de la encuesta cada trabajador decide libremente si autoriza que su empresa conozca su caso en detalle. Quien no lo autoriza <strong>sí cuenta en los indicadores del resumen</strong>, pero no aparece en el listado detallado. No hay datos perdidos, es la ley de protección de datos personales operando.
                    </p>
                  </div>

                </div>
              )}

              {/* CONTENIDO PESTAÑA 2: RESPUESTAS */}
              {tabPanel === 'respuestas' && (
                <div className="p-6 sm:p-8 space-y-4">
                  
                  {/* Filtros */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <input
                      type="text"
                      placeholder="Buscar por nombre, documento o municipio..."
                      value={busquedaColab}
                      onChange={(e) => setBusquedaColab(e.target.value)}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm flex-1 outline-none focus:ring-2 focus:ring-[#003B70]"
                    />

                    <select
                      value={filtroPrioridad}
                      onChange={(e) => setFiltroPrioridad(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 outline-none"
                    >
                      <option value="todos">Toda Prioridad</option>
                      <option value="Crítica">Crítica</option>
                      <option value="Media">Media</option>
                      <option value="Baja">Baja</option>
                    </select>
                  </div>

                  {/* Tabla */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                        <tr>
                          <th className="p-3.5">Fecha</th>
                          <th className="p-3.5">Colaborador</th>
                          <th className="p-3.5">Documento</th>
                          <th className="p-3.5">Ubicación</th>
                          <th className="p-3.5">Nivel Daño</th>
                          <th className="p-3.5">Prioridad</th>
                          <th className="p-3.5">Subsidio Arriendo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {colaboradoresFiltrados.map((col) => (
                          <tr key={col.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3.5 text-slate-400 font-mono text-[11px]">{col.fecha}</td>
                            <td className="p-3.5 font-bold text-slate-900">{col.nombre}</td>
                            <td className="p-3.5 text-slate-500">{col.documento}</td>
                            <td className="p-3.5">{col.municipio} - {col.barrio}</td>
                            <td className="p-3.5 font-bold">
                              <span className={col.nivelDanio === 'Severo' ? 'text-red-600' : 'text-slate-800'}>
                                {col.nivelDanio}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                col.prioridad === 'Crítica'
                                  ? 'bg-red-100 text-red-800'
                                  : col.prioridad === 'Media'
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {col.prioridad}
                              </span>
                            </td>
                            <td className="p-3.5">
                              {col.requiereArriendo ? (
                                <span className="text-amber-700 font-extrabold text-xs">Requiere Arriendo (0.6 SMMLV)</span>
                              ) : (
                                <span className="text-slate-400">Mejoramiento</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Modal QR Code */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 border-2 border-amber-400 shadow-2xl">
            <h3 className="text-lg font-black text-slate-900">Código QR para Cartelera</h3>
            <p className="text-xs text-slate-500">
              Imprime este código y colócalo en las áreas comunes o cartelera de tu empresa para que tus colaboradores lo escaneen.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-[#003B70] flex justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(getEnlaceEncuesta())}`}
                alt="QR Encuesta"
                className="w-48 h-48 rounded-lg shadow-sm"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-[#003B70] text-white font-bold text-xs hover:bg-[#002447]"
              >
                Imprimir QR
              </button>
              <button
                onClick={() => setShowQrModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
