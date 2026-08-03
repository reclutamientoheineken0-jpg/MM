import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MemoType, SalesRep } from '../../types';
import { 
  ChevronRight, 
  User, 
  Calendar, 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  History, 
  UploadCloud, 
  Send, 
  FileCheck,
  X
} from 'lucide-react';

export const RegistroView: React.FC = () => {
  const { 
    salesReps, 
    addMemo, 
    setCurrentPage, 
    preselectedRep, 
    preselectedMemoType, 
    showToast 
  } = useApp();

  const [selectedRepId, setSelectedRepId] = useState<string>(preselectedRep?.id || '');
  const [incidentDate, setIncidentDate] = useState<string>('2026-03-08');
  const [memoType, setMemoType] = useState<MemoType>(preselectedMemoType || 'Llamada de atención');
  const [description, setDescription] = useState<string>('');
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);

  useEffect(() => {
    if (preselectedRep) {
      setSelectedRepId(preselectedRep.id);
    }
    if (preselectedMemoType) {
      setMemoType(preselectedMemoType);
    }
  }, [preselectedRep, preselectedMemoType]);

  const selectedRep: SalesRep | undefined = salesReps.find(r => r.id === selectedRepId);

  // Word count calculator
  const words = description.trim() ? description.trim().split(/\s+/).length : 0;
  const isWordCountValid = words >= 10; // Flexible for UI demo, prompt mentions 50 words target

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setAttachedFile({
        name: file.name,
        size: `${sizeMB} MB`
      });
      showToast(`Archivo "${file.name}" adjuntado correctamente.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRep) {
      showToast('Por favor seleccione un vendedor.', 'error');
      return;
    }

    if (!description.trim()) {
      showToast('Por favor ingrese la descripción del motivo del memorándum.', 'error');
      return;
    }

    addMemo({
      salesRepId: selectedRep.id,
      salesRepName: selectedRep.name,
      salesRepCode: selectedRep.code,
      salesRepZone: selectedRep.zone,
      salesRepAvatar: selectedRep.avatar,
      type: memoType,
      date: incidentDate,
      description: description.trim(),
      fileAttachmentName: attachedFile?.name || 'Evidencia_Documental_Infraccion.pdf',
      fileAttachmentSize: attachedFile?.size || '1.2 MB'
    });

    // Reset form and navigate to dashboard
    setCurrentPage('dashboard');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto space-y-6">
      
      {/* Breadcrumbs & Header */}
      <div>
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-2 font-medium">
          <span className="hover:text-gray-800 cursor-pointer" onClick={() => setCurrentPage('dashboard')}>Registros</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#006600] font-bold">Nuevo Memorándum</span>
        </nav>
        <h2 className="font-['Hanken_Grotesk',sans-serif] font-bold text-2xl sm:text-3xl text-[#1a1c1c]">
          Formulario de Registro de Memorándums
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-3xl">
          Complete la información detallada a continuación para oficializar una acción disciplinaria o administrativa dentro del sistema de gestión de personal.
        </p>
      </div>

      {/* Main Grid: Form Left (col-span-8), Right Cards (col-span-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form Card */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. SELECCIÓN DE VENDEDOR & FECHA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Vendedor Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-500" />
                  SELECCIÓN DE VENDEDOR
                </label>
                <select
                  value={selectedRepId}
                  onChange={(e) => setSelectedRepId(e.target.value)}
                  required
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#006600] focus:border-transparent transition-all cursor-pointer font-medium"
                >
                  <option value="">Seleccione un empleado...</option>
                  {salesReps.map(rep => (
                    <option key={rep.id} value={rep.id}>
                      {rep.name} ({rep.code}) - {rep.zone}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha Incidente */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  FECHA DEL INCIDENTE
                </label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  required
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#006600] focus:border-transparent transition-all font-mono"
                />
              </div>

            </div>

            {/* 2. TIPO DE MEMORÁNDUM */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-gray-500" />
                TIPO DE MEMORÁNDUM
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Option 1: Llamada de atención */}
                <div
                  onClick={() => setMemoType('Llamada de atención')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all space-y-1 relative ${
                    memoType === 'Llamada de atención'
                      ? 'border-amber-500 bg-amber-50/40 shadow-2xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-amber-900">Llamada de atención</span>
                    <input
                      type="radio"
                      name="memoType"
                      checked={memoType === 'Llamada de atención'}
                      onChange={() => setMemoType('Llamada de atención')}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 leading-tight">
                    Aviso formal por infracción menor.
                  </p>
                </div>

                {/* Option 2: Día no remunerado */}
                <div
                  onClick={() => setMemoType('Día no remunerado')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all space-y-1 relative ${
                    memoType === 'Día no remunerado'
                      ? 'border-[#006600] bg-emerald-50/40 shadow-2xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-emerald-950">Día no remunerado</span>
                    <input
                      type="radio"
                      name="memoType"
                      checked={memoType === 'Día no remunerado'}
                      onChange={() => setMemoType('Día no remunerado')}
                      className="text-[#006600] focus:ring-[#006600]"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 leading-tight">
                    Suspensión de labores por falta grave.
                  </p>
                </div>

                {/* Option 3: Despido */}
                <div
                  onClick={() => setMemoType('Despido')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all space-y-1 relative ${
                    memoType === 'Despido'
                      ? 'border-[#bb0011] bg-red-50/40 shadow-2xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-red-900">Despido</span>
                    <input
                      type="radio"
                      name="memoType"
                      checked={memoType === 'Despido'}
                      onChange={() => setMemoType('Despido')}
                      className="text-[#bb0011] focus:ring-[#bb0011]"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 leading-tight">
                    Terminación de contrato inmediata.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. DESCRIPCIÓN DEL MOTIVO */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-gray-500" />
                DESCRIPCIÓN DEL MOTIVO
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
                placeholder="Escriba los detalles específicos del incidente, incluyendo hora, lugar y personas involucradas..."
                className="w-full bg-white border border-gray-300 rounded-xl p-4 text-sm text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#006600] focus:border-transparent transition-all placeholder:text-gray-400"
              />
              <div className="flex justify-between items-center text-xs">
                <span className={`${words < 10 ? 'text-amber-600' : 'text-emerald-700'} font-medium italic`}>
                  Mínimo 50 palabras para una documentación válida legalmente.
                </span>
                <span className="text-gray-400 font-mono">
                  {words} palabras
                </span>
              </div>
            </div>

            {/* 4. ADJUNTAR EVIDENCIA */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                ADJUNTAR EVIDENCIA
              </label>

              {attachedFile ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-[#006600]" />
                    <div>
                      <p className="text-xs font-bold text-[#1a1c1c]">{attachedFile.name}</p>
                      <p className="text-[11px] text-gray-500">{attachedFile.size} • Adjuntado con éxito</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedFile(null)}
                    className="p-1 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-gray-300 hover:border-[#006600] rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-emerald-50/20 group">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xs mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6 text-[#006600]" />
                  </div>
                  <p className="text-xs font-bold text-[#1a1c1c]">
                    Haga clic o arrastre archivos aquí
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    PDF, JPG o PNG (Max. 10MB)
                  </p>
                </label>
              )}
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCurrentPage('dashboard')}
                className="px-6 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#006600] hover:bg-[#005200] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-98"
              >
                <span>Registrar Memorándum</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

        {/* Right Info Cards Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card 1: Políticas Internas */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-2xs">
            <h3 className="font-['Hanken_Grotesk',sans-serif] font-bold text-base text-[#006600] flex items-center gap-2">
              Políticas Internas
            </h3>

            <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg shrink-0 mt-0.5">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#1a1c1c]">Debido Proceso: </span>
                  Asegúrese de que el empleado haya sido escuchado previamente antes de formalizar un despido.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-emerald-50 text-[#006600] rounded-lg shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#1a1c1c]">Validez: </span>
                  Todo memorándum sin evidencia adjunta puede ser apelado por el comité de ética.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-amber-50 text-amber-700 rounded-lg shrink-0 mt-0.5">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#1a1c1c]">Historial: </span>
                  Este registro quedará permanentemente en el legajo del vendedor.
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Vista Previa de Perfil */}
          <div className="bg-[#eeeeee] border border-gray-200 rounded-2xl p-6 space-y-4 shadow-2xs">
            {selectedRep ? (
              /* Active Rep Card */
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-300">
                  <img
                    src={selectedRep.avatar}
                    alt={selectedRep.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#006600]"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#1a1c1c]">{selectedRep.name}</h4>
                    <p className="text-xs text-gray-500 font-mono">{selectedRep.code} • {selectedRep.zone}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-gray-200/60">
                    <span className="text-gray-500">ID Empleado:</span>
                    <span className="font-bold font-mono">{selectedRep.code}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200/60">
                    <span className="text-gray-500">Memos Previos:</span>
                    <span className="font-bold">{selectedRep.memoCount} Memos</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200/60">
                    <span className="text-gray-500">Rendimiento Q3:</span>
                    <span className="font-bold text-[#006600]">{selectedRep.performanceQ3}%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Estado Disciplinario:</span>
                    <span className="font-bold text-amber-700">{selectedRep.statusBadge}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Unselected Empty State matching Image 3 */
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                    EMPLEADO NO SELECCIONADO
                  </span>
                  <h4 className="font-bold text-[#1a1c1c] text-sm mt-1">
                    Vista Previa de Perfil
                  </h4>
                </div>
                <div className="pt-4 text-xs space-y-2 text-gray-400 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span>ID Empleado</span>
                    <span className="font-mono">- - -</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memos Previos</span>
                    <span>00 Memos</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rendimiento Q3</span>
                    <span>N/A</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
