import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SalesRep } from '../../types';
import { 
  Users, 
  Filter, 
  FileSpreadsheet, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  UserCheck, 
  MoreVertical,
  Search,
  Eye,
  UserPlus
} from 'lucide-react';

interface VendedoresViewProps {
  onOpenNewVendedorModal?: () => void;
  onSelectRepForDetail?: (rep: SalesRep) => void;
}

export const VendedoresView: React.FC<VendedoresViewProps> = ({ 
  onOpenNewVendedorModal,
  onSelectRepForDetail
}) => {
  const { 
    salesReps, 
    setCurrentPage, 
    setPreselectedRep, 
    globalSearch, 
    showToast 
  } = useApp();

  const [zoneFilter, setZoneFilter] = useState('Todas');
  const [sortBy, setSortBy] = useState<'name' | 'memos' | 'performance'>('name');
  const [currentPageNum, setCurrentPageNum] = useState(1);

  // Filter reps
  const filteredReps = salesReps.filter(rep => {
    if (zoneFilter !== 'Todas' && rep.zone !== zoneFilter) return false;
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      return (
        rep.name.toLowerCase().includes(q) ||
        rep.code.toLowerCase().includes(q) ||
        rep.email.toLowerCase().includes(q) ||
        rep.zone.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sort reps
  const sortedReps = [...filteredReps].sort((a, b) => {
    if (sortBy === 'memos') return b.memoCount - a.memoCount;
    if (sortBy === 'performance') return b.performanceQ3 - a.performanceQ3;
    return a.name.localeCompare(b.name);
  });

  const handleExportExcel = () => {
    showToast('Exportando reporte de fuerza de ventas a Excel (.xlsx)...');
  };

  const handleCreateMemoForRep = (rep: SalesRep) => {
    setPreselectedRep(rep);
    setCurrentPage('registro');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto space-y-6">
      
      {/* Header & KPI Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-['Hanken_Grotesk',sans-serif] font-bold text-2xl sm:text-3xl text-[#006600]">
            Gestión de Fuerza de Ventas
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-2xl">
            Monitorea el desempeño administrativo y el historial disciplinario de tu equipo comercial.
          </p>
        </div>

        {/* Right Green KPI Card matching Image 4 */}
        <div className="bg-[#006600] text-white p-5 rounded-2xl flex items-center justify-between gap-8 min-w-[240px] shadow-md relative overflow-hidden">
          <div className="space-y-1 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 block">
              VENDEDORES
            </span>
            <div className="font-['Hanken_Grotesk',sans-serif] font-extrabold text-4xl text-white">
              {salesReps.length}
            </div>
          </div>
          <div className="p-3 bg-white/10 rounded-xl relative z-10">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
            <Users className="w-32 h-32 text-white" />
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Export */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Zona Filter */}
          <div className="flex items-center bg-[#f3f3f3] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-gray-700">
            <Filter className="w-3.5 h-3.5 mr-2 text-gray-500" />
            <span className="text-gray-400 mr-1.5">Zona:</span>
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="bg-transparent focus:outline-none font-bold text-[#1a1c1c] cursor-pointer"
            >
              <option value="Todas">Todas</option>
              <option value="Lima Metro">Lima Metro</option>
              <option value="Norte">Norte</option>
              <option value="Centro">Centro</option>
              <option value="Sur">Sur</option>
              <option value="Este">Este</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center bg-[#f3f3f3] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-gray-700">
            <span className="text-gray-400 mr-1.5">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-none font-bold text-[#1a1c1c] cursor-pointer"
            >
              <option value="name">Nombre</option>
              <option value="memos">Nº Memos</option>
              <option value="performance">Rendimiento Q3</option>
            </select>
          </div>
        </div>

        {/* Buttons Right */}
        <div className="flex items-center gap-3">
          {onOpenNewVendedorModal && (
            <button
              onClick={onOpenNewVendedorModal}
              className="px-4 py-2.5 rounded-xl border border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-[#006600]" />
              <span>Nuevo Vendedor</span>
            </button>
          )}

          <button
            onClick={handleExportExcel}
            className="bg-[#006600] hover:bg-[#005200] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-98"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Exportar Excel</span>
          </button>
        </div>
      </div>

      {/* Vendedores Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f3f3f3] border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="p-4 pl-6">VENDEDOR</th>
                <th className="p-4">ZONA</th>
                <th className="p-4">ESTADO MEMOS</th>
                <th className="p-4 text-right pr-6">ACCIONES</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {sortedReps.length === 0 ? (
                /* Empty state matching Image 4 */
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-400">
                    <p className="font-medium text-gray-500">
                      No se encontraron vendedores registrados. Comience por registrar un nuevo colaborador.
                    </p>
                  </td>
                </tr>
              ) : (
                sortedReps.map((rep) => (
                  <tr key={rep.id} className="hover:bg-gray-50/80 transition-colors">
                    
                    {/* VENDEDOR */}
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        {rep.avatar ? (
                          <img
                            src={rep.avatar}
                            alt={rep.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#006600]/10 text-[#006600] border border-[#006600]/20 flex items-center justify-center font-bold text-xs shrink-0">
                            {rep.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-[#1a1c1c]">{rep.name}</p>
                          <p className="text-xs text-gray-400 font-mono">{rep.code} • {rep.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* ZONA */}
                    <td className="p-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {rep.zone}
                      </span>
                    </td>

                    {/* ESTADO MEMOS */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          rep.statusBadge === 'Limpio'
                            ? 'bg-emerald-100 text-[#006600]'
                            : rep.statusBadge === '1 Llamada'
                            ? 'bg-amber-100 text-amber-900'
                            : rep.statusBadge === 'Día No Remunerado'
                            ? 'bg-orange-100 text-orange-900'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {rep.statusBadge}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({rep.memoCount} memos)
                        </span>
                      </div>
                    </td>

                    {/* ACCIONES */}
                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        {onSelectRepForDetail && (
                          <button
                            onClick={() => onSelectRepForDetail(rep)}
                            className="p-2 text-gray-500 hover:text-[#006600] hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Ver Historial Completo"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleCreateMemoForRep(rep)}
                          className="px-3 py-1.5 rounded-lg bg-[#006600] hover:bg-[#005200] text-white text-xs font-bold transition-all shadow-2xs"
                        >
                          + Memo
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination matching Image 4 */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs font-bold text-gray-600">
          <button 
            disabled={currentPageNum === 1}
            onClick={() => setCurrentPageNum(p => Math.max(1, p - 1))}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button 
            onClick={() => setCurrentPageNum(1)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              currentPageNum === 1 ? 'bg-[#006600] text-white' : 'hover:bg-gray-100'
            }`}
          >
            1
          </button>
          
          <button 
            onClick={() => setCurrentPageNum(2)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              currentPageNum === 2 ? 'bg-[#006600] text-white' : 'hover:bg-gray-100'
            }`}
          >
            2
          </button>

          <button 
            onClick={() => setCurrentPageNum(3)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              currentPageNum === 3 ? 'bg-[#006600] text-white' : 'hover:bg-gray-100'
            }`}
          >
            3
          </button>

          <span className="px-1 text-gray-400">...</span>

          <button 
            onClick={() => setCurrentPageNum(250)}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100"
          >
            250
          </button>

          <button 
            onClick={() => setCurrentPageNum(p => p + 1)}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            ChevronRight
          </button>
        </div>
      </div>

    </div>
  );
};
