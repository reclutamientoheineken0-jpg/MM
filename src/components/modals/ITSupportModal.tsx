import React from 'react';
import { X, Headphones, Mail, Phone, Shield } from 'lucide-react';

interface ITSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ITSupportModal: React.FC<ITSupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-200">
        <div className="bg-[#006600] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5" />
            <h3 className="font-['Hanken_Grotesk',sans-serif] font-bold text-lg">Soporte TI Heineken</h3>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-[#1a1c1c]">
          <p className="text-gray-600 leading-relaxed">
            Si presenta dificultades para iniciar sesión, solicitar reseteo de clave o permisos adicionales, comuníquese con la Mesa de Ayuda Corporativa:
          </p>

          <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#006600]" />
              <div>
                <p className="font-bold text-gray-500">Correo Electrónico</p>
                <p className="font-mono font-bold text-[#1a1c1c]">soporte.hr@heineken.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#006600]" />
              <div>
                <p className="font-bold text-gray-500">Mesa Central (Anexo 4402)</p>
                <p className="font-mono font-bold text-[#1a1c1c]">+51 1 700-8800</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#006600]" />
              <div>
                <p className="font-bold text-gray-500">Horario de Atención</p>
                <p className="font-medium text-gray-700">Lunes a Viernes 08:00 - 18:00 HRS</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#006600] text-white font-bold rounded-xl"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
