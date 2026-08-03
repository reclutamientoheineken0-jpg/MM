import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, RefreshCw, Trash2, Shield, Bell } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { resetDemoData, setEmptyStateData, currentUser } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200">
        <div className="bg-[#006600] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <h3 className="font-['Hanken_Grotesk',sans-serif] font-bold text-lg">Configuración de Portal</h3>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-xs text-[#1a1c1c]">
          {/* User profile preview */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">{currentUser?.name}</p>
              <p className="text-gray-500 font-mono">{currentUser?.email} • {currentUser?.role}</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-[#006600] font-bold rounded-full">
              Sesión Activa
            </span>
          </div>

          {/* Demo state controls */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-gray-500">Gestión de Datos y Estado</h4>
            
            <div className="space-y-2">
              <button
                onClick={() => {
                  resetDemoData();
                  onClose();
                }}
                className="w-full p-3 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-[#006600] font-bold rounded-xl flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Restablecer Datos de Demostración Heineken</span>
                </div>
                <span className="text-[10px] bg-emerald-200/60 px-2 py-0.5 rounded">Recomendado</span>
              </button>

              <button
                onClick={() => {
                  setEmptyStateData();
                  onClose();
                }}
                className="w-full p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold rounded-xl flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-amber-600" />
                  <span>Activar Estado en Blanco (0 Registros)</span>
                </div>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#006600] text-white font-bold rounded-xl"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
