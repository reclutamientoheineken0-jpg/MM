import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserPlus } from 'lucide-react';

interface NewVendedorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewVendedorModal: React.FC<NewVendedorModalProps> = ({ isOpen, onClose }) => {
  const { addSalesRep } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+51 900 123 456');
  const [zone, setZone] = useState<'Lima Metro' | 'Norte' | 'Centro' | 'Sur' | 'Este'>('Lima Metro');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addSalesRep({
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@heineken.com`,
      phone: phone.trim(),
      zone,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250`,
      performanceQ3: Math.floor(80 + Math.random() * 20),
      status: 'Activo',
      hireDate: new Date().toISOString().split('T')[0]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-200">
        <div className="bg-[#006600] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            <h3 className="font-['Hanken_Grotesk',sans-serif] font-bold text-lg">Registrar Nuevo Vendedor</h3>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-gray-700 uppercase">Nombre Completo</label>
            <input
              type="text"
              required
              placeholder="Ej. Mateo Ramírez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#006600] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700 uppercase">Correo Electrónico</label>
            <input
              type="email"
              placeholder="mateo.ramirez@heineken.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#006600] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700 uppercase">Teléfono</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#006600] focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700 uppercase">Zona Asignada</label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value as any)}
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#006600] focus:outline-none font-bold cursor-pointer"
            >
              <option value="Lima Metro">Lima Metro</option>
              <option value="Norte">Norte</option>
              <option value="Centro">Centro</option>
              <option value="Sur">Sur</option>
              <option value="Este">Este</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#006600] hover:bg-[#005200] text-white rounded-xl font-bold"
            >
              Guardar Colaborador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
