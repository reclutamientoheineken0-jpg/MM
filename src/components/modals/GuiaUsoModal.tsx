import React from 'react';
import { X, BookOpen, CheckCircle2, ShieldCheck, FilePlus } from 'lucide-react';

interface GuiaUsoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuiaUsoModal: React.FC<GuiaUsoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-gray-200">
        <div className="bg-[#006600] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-['Hanken_Grotesk',sans-serif] font-bold text-lg">Guía Rápida del Sistema</h3>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#1a1c1c] flex-1">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-[#006600]">
            <p className="font-bold text-sm mb-1">Bienvenido a Heineken Corporate Admin</p>
            <p className="text-gray-700 leading-relaxed">
              Este portal gestiona la emisión de comunicados disciplinarios y la administración de la fuerza de ventas nacional.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-[#006600] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-800">1. Autenticación y Roles</p>
                <p className="text-gray-600 mt-0.5">
                  Inicie sesión como Administrador o Cliente según su nivel jerárquico asignado en RRHH (Año 2026 - Heineken International).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <FilePlus className="w-5 h-5 text-[#006600] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-800">2. Registro de Memorándum</p>
                <p className="text-gray-600 mt-0.5">
                  Seleccione el vendedor, especifique el tipo de falta (Llamada de atención, Día no remunerado, Despido) y adjunte la evidencia legal en PDF o imagen.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-[#006600] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-800">3. Auditoría y Reportes</p>
                <p className="text-gray-600 mt-0.5">
                  Monitoree el porcentaje de cumplimiento por zona y descargue los reportes consolidados en Excel o PDF.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#006600] text-white font-bold rounded-xl"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
