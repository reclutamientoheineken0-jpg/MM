import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  BookOpen, 
  HelpCircle 
} from 'lucide-react';
import { HeinekenLogo } from '../common/HeinekenLogo';

interface LoginViewProps {
  onOpenITSupport?: () => void;
  onOpenGuiaUso?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onOpenITSupport, onOpenGuiaUso }) => {
  const { setCurrentUser, setCurrentPage, showToast } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>('Administrador');
  const [employeeId, setEmployeeId] = useState('HK-000101');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId.trim()) {
      showToast('Por favor ingrese su ID de Empleado', 'error');
      return;
    }

    setCurrentUser({
      id: 'usr-active-1',
      employeeId: employeeId.trim(),
      name: selectedRole === 'Administrador' ? 'Salesforce HR Admin' : 'Carlos Cliente',
      role: selectedRole,
      title: selectedRole === 'Administrador' ? 'Administrador' : 'Cliente',
      email: selectedRole === 'Administrador' ? 'admin.hr@heineken.com' : 'cliente@heineken.com',
      avatar: '',
      zone: 'Nacional'
    });

    showToast(`Bienvenido al Portal de Gestión Corporativa Heineken (${selectedRole})`);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-['Inter',sans-serif]">
      {/* Main Container Card */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Green Banner (Heineken Corporate Style) */}
        <div className="relative bg-[#006600] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden">
          {/* Subtle background overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#008200] via-[#006600] to-[#004d00] opacity-90" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                <svg viewBox="0 0 24 24" fill="#bb0011" className="w-6 h-6">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span className="font-['Hanken_Grotesk',sans-serif] font-black text-3xl tracking-tight text-white">
                Heineken
              </span>
            </div>

            {/* Main Hero Header */}
            <div className="space-y-4 pt-4">
              <h1 className="font-['Hanken_Grotesk',sans-serif] font-extrabold text-3xl sm:text-4xl text-white leading-tight">
                Gestión<br />Corporativa
              </h1>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal max-w-md">
                Acceda al portal centralizado de administración de comunicados y gestión de personal estratégico.
              </p>
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold font-mono tracking-wider text-emerald-200">
                Año 2026 — Heineken International
              </div>
            </div>

            {/* Entorno Seguro Banner */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Entorno Seguro</span>
              </div>
              <p className="text-white/80 text-xs leading-relaxed">
                Este sistema está restringido para uso exclusivo de empleados autorizados de Heineken International (2026). Todas las actividades son monitoreadas.
              </p>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="relative z-10 pt-8 mt-auto border-t border-white/15 text-[11px] text-white/70">
            © 2026 Heineken International. Todos los derechos reservados.
          </div>
        </div>

        {/* Right Form Column */}
        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-6">
            <div>
              <h2 className="font-['Hanken_Grotesk',sans-serif] font-bold text-2xl text-[#1a1c1c]">
                Bienvenido de nuevo
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Por favor, ingrese sus credenciales para continuar.
              </p>
            </div>

            {/* Role Switcher Pills */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1a1c1c] block">
                Rol de Usuario
              </label>
              <div className="bg-[#eeeeee] p-1 rounded-xl grid grid-cols-2 gap-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setSelectedRole('Administrador')}
                  className={`py-2.5 rounded-lg transition-all ${
                    selectedRole === 'Administrador'
                      ? 'bg-white text-[#006600] shadow-xs font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Administrador
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('Cliente')}
                  className={`py-2.5 rounded-lg transition-all ${
                    selectedRole === 'Cliente'
                      ? 'bg-white text-[#006600] shadow-xs font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cliente
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Employee ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1a1c1c] block">
                  ID de Empleado
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="HK-000000"
                    required
                    className="w-full bg-white border border-gray-300 pl-10 pr-4 py-2.5 rounded-xl text-sm font-mono text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#006600] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-[#1a1c1c]">
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('Para restablecer su clave, contacte a soporte IT (soporte@heineken.com)', 'info')}
                    className="text-xs text-[#006600] font-bold hover:underline"
                  >
                    ¿Olvidó su clave?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white border border-gray-300 pl-10 pr-10 py-2.5 rounded-xl text-sm font-mono text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#006600] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Keep session check */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-[#006600] focus:ring-[#006600] w-4 h-4"
                />
                <label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer">
                  Mantener sesión iniciada
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#006600] hover:bg-[#005200] text-white py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-98"
              >
                <span>Iniciar Sesión Segura</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* IT Support & Links Footer */}
          <div className="pt-6 border-t border-gray-100 text-center space-y-3">
            <p className="text-xs text-gray-500">
              ¿Tiene problemas para acceder?{' '}
              <button 
                onClick={onOpenITSupport}
                className="text-[#006600] font-bold hover:underline"
              >
                Contactar Soporte IT
              </button>
            </p>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-500 font-medium">
              <button className="flex items-center gap-1 hover:text-[#006600]">
                <Globe className="w-3.5 h-3.5" />
                <span>ES</span>
              </button>
              <span>•</span>
              <button 
                onClick={onOpenGuiaUso}
                className="flex items-center gap-1 hover:text-[#006600]"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Guía de Uso</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
