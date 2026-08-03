import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MemoType } from '../../types';
import { 
  FileText, 
  AlertTriangle, 
  Calendar, 
  UserX, 
  Plus, 
  Filter, 
  ChevronRight, 
  EyeOff, 
  TrendingUp, 
  Trash2, 
  Eye, 
  ArrowRight,
  RefreshCw,
  Info
} from 'lucide-react';

interface DashboardViewProps {
  onViewMemoDetail?: (memoId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onViewMemoDetail }) => {
  const { 
    memos, 
    setCurrentPage, 
    setPreselectedMemoType, 
    selectedZoneFilter, 
    setSelectedZoneFilter,
    deleteMemo,
    resetDemoData,
    setEmptyStateData
  } = useApp();

  const [dateRange, setDateRange] = useState('Este mes');

  // Filter memos by selected zone if any
  const filteredMemos = memos.filter(m => {
    if (selectedZoneFilter !== 'Todas' && m.salesRepZone !== selectedZoneFilter) return false;
    return true;
  });

  // KPI Calculations
  const totalMemos = filteredMemos.length;
  const llamadasAtencion = filteredMemos.filter(m => m.type === 'Llamada de atención').length;
  const diasNoRemunerados = filteredMemos.filter(m => m.type === 'Día no remunerado').length;
  const despidos = filteredMemos.filter(m => m.type === 'Despido').length;

  const handleRegisterNewMemo = (type?: MemoType) => {
    if (type) setPreselectedMemoType(type);
    setCurrentPage('registro');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto space-y-6">
      
      {/* Top Banner Control to toggle Demo Data or Empty State */}
      <div className="bg-[#f2f4f6] border border-[#c5c6cd]/50 rounded-xl p-3 px-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <Info className="w-4 h-4 text-[#006600]" />
          <span>Simulador de Entorno Corporativo Heineken:</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={resetDemoData}
            className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 font-bold text-[#006600] hover:bg-green-50 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Cargar Datos con Registro (Demo)
          </button>
          <button 
            onClick={setEmptyStateData}
            className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Vista en Blanco (0 Memos)
          </button>
        </div>
      </div>

      {/* Header & Main Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-['Hanken_Grotesk',sans-serif] font-bold text-3xl sm:text-4xl text-[#006600] leading-tight">
            Gestión de Memorándums
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Panel de control de acciones disciplinarias y cumplimiento corporativo.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Zona Selector */}
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 shadow-2xs">
            <Filter className="w-3.5 h-3.5 mr-2 text-gray-500" />
            <span className="text-gray-400 mr-1.5">Zona:</span>
            <select 
              value={selectedZoneFilter}
              onChange={(e) => setSelectedZoneFilter(e.target.value)}
              className="bg-transparent focus:outline-none font-bold text-[#1a1c1c] cursor-pointer"
            >
              <option value="Todas">Todas las zonas</option>
              <option value="Lima Metro">Lima Metro</option>
              <option value="Norte">Norte</option>
              <option value="Centro">Centro</option>
              <option value="Sur">Sur</option>
              <option value="Este">Este</option>
            </select>
          </div>

          {/* Fecha Selector */}
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 mr-2 text-gray-500" />
            <span className="text-gray-400 mr-1.5">Fecha:</span>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent focus:outline-none font-bold text-[#1a1c1c] cursor-pointer"
            >
              <option value="Este mes">Este mes</option>
              <option value="Último trimestre">Último trimestre</option>
              <option value="Todo el año">Todo el año</option>
            </select>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => handleRegisterNewMemo()}
            className="bg-[#006600] hover:bg-[#005200] text-white px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>REGISTRAR NUEVO MEMO</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid (4 Cards matching screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: TOTAL MEMORÁNDUMS */}
        <div className="bg-white border-l-4 border-l-[#006600] border-y border-r border-gray-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider font-['Inter']">
              TOTAL MEMORÁNDUMS
            </span>
            <div className="p-2 bg-emerald-50 rounded-lg text-[#006600]">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-['Hanken_Grotesk',sans-serif] font-extrabold text-4xl text-[#006600]">
              {totalMemos}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>+12% este mes</span>
            </div>
          </div>
        </div>

        {/* Card 2: LLAMADAS DE ATENCIÓN */}
        <div className="bg-white border-l-4 border-l-amber-500 border-y border-r border-gray-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider font-['Inter']">
              LLAMADAS DE ATENCIÓN
            </span>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-['Hanken_Grotesk',sans-serif] font-extrabold text-4xl text-[#006600]">
              {llamadasAtencion}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {totalMemos > 0 ? `${Math.round((llamadasAtencion / totalMemos) * 100)}% del total acumulado` : '65% del total acumulado'}
            </p>
          </div>
        </div>

        {/* Card 3: DÍAS NO REMUNERADOS */}
        <div className="bg-white border-l-4 border-l-emerald-800 border-y border-r border-gray-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider font-['Inter']">
              DÍAS NO REMUNERADOS
            </span>
            <div className="p-2 bg-emerald-100/60 rounded-lg text-emerald-900">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-['Hanken_Grotesk',sans-serif] font-extrabold text-4xl text-[#006600]">
              {diasNoRemunerados}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Sanciones de segundo grado
            </p>
          </div>
        </div>

        {/* Card 4: DESPIDOS EJECUTADOS */}
        <div className="bg-white border-l-4 border-l-[#bb0011] border-y border-r border-gray-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider font-['Inter']">
              DESPIDOS EJECUTADOS
            </span>
            <div className="p-2 bg-red-50 rounded-lg text-[#bb0011]">
              <UserX className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-['Hanken_Grotesk',sans-serif] font-extrabold text-4xl text-[#bb0011]">
              {despidos}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Acciones legales cerradas
            </p>
          </div>
        </div>

      </div>

      {/* Two Columns Grid Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Widget 1: Distribución de Faltas */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between min-h-[320px]">
          <h3 className="font-['Hanken_Grotesk',sans-serif] font-bold text-lg text-[#006600] mb-4">
            Distribución de Faltas
          </h3>

          {totalMemos === 0 ? (
            /* Empty State matching Image 2 */
            <div className="flex-1 flex flex-col items-center justify-center py-10 text-center text-gray-400">
              <EyeOff className="w-12 h-12 stroke-[1.5] mb-3 text-gray-300" />
              <p className="text-sm font-medium text-gray-500">
                No hay datos disponibles para mostrar.
              </p>
            </div>
          ) : (
            /* Active Chart / Visual Breakdown when data exists */
            <div className="flex-1 flex flex-col justify-center space-y-5">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-gray-700">
                    <span>Llamadas de atención ({llamadasAtencion})</span>
                    <span>{Math.round((llamadasAtencion / totalMemos) * 100)}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                      style={{ width: `${(llamadasAtencion / totalMemos) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-gray-700">
                    <span>Días no remunerados ({diasNoRemunerados})</span>
                    <span>{Math.round((diasNoRemunerados / totalMemos) * 100)}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#006600] rounded-full transition-all duration-500" 
                      style={{ width: `${(diasNoRemunerados / totalMemos) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-gray-700">
                    <span>Despidos ejecutados ({despidos})</span>
                    <span>{Math.round((despidos / totalMemos) * 100)}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#bb0011] rounded-full transition-all duration-500" 
                      style={{ width: `${(despidos / totalMemos) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-500 border border-gray-100">
                <span className="font-bold text-[#006600]">Resumen:</span> La Zona {selectedZoneFilter} concentra el comportamiento normativo actual dentro del marco disciplinario de Heineken.
              </div>
            </div>
          )}
        </div>

        {/* Widget 2: Memorándums Recientes */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between min-h-[320px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-['Hanken_Grotesk',sans-serif] font-bold text-lg text-[#006600]">
              Memorándums Recientes
            </h3>
            <button 
              onClick={() => setCurrentPage('vendedores')}
              className="text-xs text-[#006600] font-bold hover:underline flex items-center gap-1"
            >
              Ver todos <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {filteredMemos.length === 0 ? (
            /* Empty State matching Image 2 */
            <div className="flex-1 flex flex-col items-center justify-center py-10 text-center text-gray-400">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">
                No se han registrado memorándums aún.
              </p>
            </div>
          ) : (
            /* Active Memo List */
            <div className="flex-1 divide-y divide-gray-100 overflow-y-auto max-h-[220px]">
              {filteredMemos.slice(0, 4).map((memo) => (
                <div key={memo.id} className="py-3 flex items-center justify-between text-xs hover:bg-gray-50 rounded-lg px-2 transition-colors">
                  <div className="flex items-center gap-3">
                    {memo.salesRepAvatar ? (
                      <img 
                        src={memo.salesRepAvatar} 
                        alt={memo.salesRepName}
                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#006600]/10 text-[#006600] border border-[#006600]/20 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {memo.salesRepName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-[#1a1c1c]">{memo.salesRepName}</p>
                      <p className="text-gray-400 text-[11px]">{memo.code} • {memo.salesRepZone}</p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-2">
                    <div>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        memo.type === 'Llamada de atención'
                          ? 'bg-amber-100 text-amber-800'
                          : memo.type === 'Día no remunerado'
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {memo.type}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-0.5">{memo.date}</p>
                    </div>

                    <button 
                      onClick={() => deleteMemo(memo.id)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Bottom Promo / Quick Action Banner matching Image 2 */}
      <div className="relative bg-[#006600] text-white rounded-2xl p-6 sm:p-8 overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
          <svg viewBox="0 0 200 200" className="w-80 h-80 fill-white">
            <path d="M100 0l30.9 62.6L200 72.7l-50 48.7 11.8 68.8L100 157.7l-61.8 32.5L50 121.4 0 72.7l69.1-10.1L100 0z"/>
          </svg>
        </div>

        <div className="space-y-2 max-w-xl relative z-10">
          <h3 className="font-['Hanken_Grotesk',sans-serif] font-bold text-2xl text-white">
            Generar Advertencia
          </h3>
          <p className="text-white/90 text-sm leading-relaxed">
            Cree rápidamente una llamada de atención para un colaborador por incumplimiento leve.
          </p>
        </div>

        <button
          onClick={() => handleRegisterNewMemo('Llamada de atención')}
          className="relative z-10 bg-white text-[#006600] hover:bg-gray-100 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 shrink-0"
        >
          COMENZAR REGISTRO
        </button>
      </div>

    </div>
  );
};
