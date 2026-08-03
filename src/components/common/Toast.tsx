import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-white shadow-xl border border-outline-variant/40 animate-slide-up text-sm font-medium">
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#006600]" />}
      {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-[#bb0011]" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-blue-600" />}
      <span className="text-[#1a1c1c]">{toast.message}</span>
    </div>
  );
};
