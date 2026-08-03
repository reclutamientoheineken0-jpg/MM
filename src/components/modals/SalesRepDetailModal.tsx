import React from 'react';
import { SalesRep } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, FileText, Calendar, Mail, Phone, Award, Plus } from 'lucide-react';

interface SalesRepDetailModalProps {
  rep: SalesRep | null;
  onClose: () => void;
}

export const SalesRepDetailModal: React.FC<SalesRepDetailModalProps> = ({ rep, onClose }) => {
  const { memos, setCurrentPage, setPreselectedRep } = useApp();

  if (!rep) return null;

  const repMemos = memos.filter(m => m.salesRepId === rep.id);

  const handleCreateMemo = () => {
    setPreselectedRep(rep);
    setCurrentPage('registro');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-gray-200">
        
        {/* Modal Header */}
        <div className="bg-[#006600] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            {rep.avatar ? (
              <img
                src={rep.avatar}
                alt={rep.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-white text-[#006600] border-2 border-white flex items-center justify-center font-extrabold text-lg shadow-md shrink-0">
                {rep.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Hanken_Grotesk',sans-serif] font-bold text-xl text-white">{rep.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white uppercase tracking-wider">
                  {rep.zone}
                </span>
              </div>
              <p className="text-white/80 text-xs font-mono mt-0.5">{rep.code} • Contratado: {rep.hireDate}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">Memos Emitidos</p>
              <p className="font-['Hanken_Grotesk',sans-serif] font-bold text-2xl text-[#1a1c1c]">{rep.memoCount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">Rendimiento Q3</p>
              <p className="font-['Hanken_Grotesk',sans-serif] font-bold text-2xl text-[#006600]">{rep.performanceQ3}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">Estado Disciplinario</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                {rep.statusBadge}
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-gray-700 uppercase tracking-wider">Información de Contacto</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{rep.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{rep.phone}</span>
              </div>
            </div>
          </div>

          {/* Memo History List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-gray-700 uppercase tracking-wider text-xs">Historial de Memorándums</h4>
              <button
                onClick={handleCreateMemo}
                className="text-xs text-[#006600] font-bold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Registrar Memo
              </button>
            </div>

            {repMemos.length === 0 ? (
              <div className="p-6 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-xs">Este vendedor no tiene ningún memorándum registrado en su expediente.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {repMemos.map(m => (
                  <div key={m.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-[#006600] font-mono">{m.code} - {m.type}</span>
                      <span className="text-gray-400 font-mono">{m.date}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{m.description}</p>
                    <div className="pt-2 border-t border-gray-200/60 flex justify-between text-[11px] text-gray-400">
                      <span>Emitido por: {m.createdBy}</span>
                      <span>Adjunto: {m.fileAttachmentName}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100"
          >
            Cerrar
          </button>

          <button
            onClick={handleCreateMemo}
            className="px-5 py-2 rounded-xl bg-[#006600] hover:bg-[#005200] text-white text-xs font-bold flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Emitir Nuevo Memo</span>
          </button>
        </div>

      </div>
    </div>
  );
};
