import React, { useState } from 'react';
import { Lock, User, ArrowRight, ArrowLeft, AlertCircle, KeyRound, Info } from 'lucide-react';
import { ComfamiliarLogo } from './ComfamiliarLogo';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Credenciales por defecto para desarrollo / pruebas
  const DEFAULT_USER = 'admin';
  const DEFAULT_PASS = 'comfamiliar2026';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      if (username.trim() === DEFAULT_USER && password.trim() === DEFAULT_PASS) {
        sessionStorage.setItem('fovis_admin_session_auth', 'true');
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setError('Credenciales incorrectas. Verifique su usuario y contraseña.');
      }
    }, 400);
  };

  const handleAutofill = () => {
    setUsername(DEFAULT_USER);
    setPassword(DEFAULT_PASS);
    setError(null);
  };

  return (
    <section className="min-h-[85vh] bg-gradient-to-br from-slate-900 via-[#002447] to-slate-950 py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        
        {/* Card de Inicio de Sesión */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-amber-400/30 relative overflow-hidden">
          
          {/* Decoración Superior */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-[#003B70] to-amber-500"></div>

          {/* Logo y Encabezado */}
          <div className="text-center space-y-3 pb-6 border-b border-slate-100">
            <div className="flex justify-center">
              <ComfamiliarLogo variant="dark" size="md" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#003B70] border border-blue-200 text-xs font-black uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Acceso Administrativo FOVIS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Panel de Control y Censo
            </h2>
            <p className="text-xs text-slate-500">
              Ingrese sus credenciales autorizadas de funcionario para acceder a la gestión de postulaciones.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            
            {error && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 font-semibold animate-shake">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Usuario Funcionario
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Ej. admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-sm font-medium focus:ring-2 focus:ring-[#003B70] focus:border-[#003B70] outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Contraseña de Seguridad
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-sm font-medium focus:ring-2 focus:ring-[#003B70] focus:border-[#003B70] outline-none transition-all"
                />
              </div>
            </div>

            {/* Hint para desarrollo / pruebas */}
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-600" />
                  Credenciales de Prueba:
                </span>
                <button
                  type="button"
                  onClick={handleAutofill}
                  className="text-[11px] underline text-[#003B70] font-black hover:text-amber-700 cursor-pointer"
                >
                  Autocompletar
                </button>
              </div>
              <p className="text-[11px] text-amber-800 font-medium">
                Usuario: <code className="bg-white/80 px-1 py-0.5 rounded font-mono font-bold">admin</code> | Contraseña: <code className="bg-white/80 px-1 py-0.5 rounded font-mono font-bold">comfamiliar2026</code>
              </p>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-[#003B70] hover:bg-[#002447] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{isLoading ? 'Verificando...' : 'Iniciar Sesión'}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al Portal Público</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
