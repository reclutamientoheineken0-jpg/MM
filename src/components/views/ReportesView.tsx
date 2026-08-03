import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ZONE_SUMMARIES } from '../../data/initialData';
import { 
  ChevronRight, 
  FileCheck, 
  FileText, 
  Download, 
  FolderX, 
  Clock, 
  BarChartOff, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw 
} from 'lucide-react';

export const ReportesView: React.FC = () => {
  const { memos, showToast } = useApp();

  const [fromDate, setFromDate] = useState('01/01/2026');
  const [toDate, setToDate] = useState('31/01/2026');
  const [viewEmptyState, setViewEmptyState] = useState(memos.length === 0);

  const handleGeneratePDF = () => {
    showToast('Generando reporte en PDF de Gestión de Personal Heineken...');
  };

  const handleDownloadExcel = () => {
    showToast('Descargando archivo Excel (.xlsx) consolidado de reportes...');
  };

  const handleConfigReminder = () => {
    showToast('Recordatorio de informe automático Q1 programado para el 01 de Abril.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto space-y-6">
      
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-2 font-medium">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[#006600] font-bold">Reportes</span>
          </nav>
          <h2 className="font-['Hanken_Grotesk',sans-serif] font-bold text-2xl sm:text-3xl text-[#1a1c1c]">
            Centro de Reportes
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Gestione y exporte la información crítica del personal y rendimiento de ventas.
          </p>
        </div>

        {/* Action Buttons Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleGeneratePDF}
            className="px-4 py-2.5 rounded-xl border border-[#006600] text-[#006600] font-bold text-xs hover:bg-green-50 transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Generar PDF</span>
          </button>

          <button
            onClick={handleDownloadExcel}
            className="bg-[#006600] hover:bg-[#005200] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Excel</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Card 1 (col-span-8): Exportar Historial Completo */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#006600]">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-['Hanken_Grotesk',sans-serif] font-bold text-lg text-[#1a1c1c]">
                Exportar Historial Completo
              </h3>
            </div>
            
            <button
              onClick={() => setViewEmptyState(!viewEmptyState)}
              className="text-[11px] font-mono px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 uppercase tracking-wider font-semibold"
            >
              {viewEmptyState ? 'Empty State' : 'Data Sync'}
            </button>
          </div>

          {viewEmptyState ? (
            /* Empty State Container matching Image 5 */
            <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 bg-gray-50/70 rounded-xl border-2 border-dashed border-gray-300 empty-state-pattern my-2">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3 shadow-xs">
                <FolderX className="w-7 h-7 text-[#006600]" />
              </div>
              <h4 className="font-['Hanken_Grotesk',sans-serif] font-bold text-base text-[#1a1c1c]">
                No hay datos para exportar
              </h4>
              <p className="text-xs text-gray-500 text-center max-w-md mt-1 leading-relaxed">
                No se han encontrado registros en el periodo seleccionado. Intente cambiar los filtros de fecha para visualizar la información.
              </p>

              {/* Date Filters */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400">DESDE</span>
                  <input
                    type="text"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="bg-white border border-gray-300 px-3 py-1.5 rounded-lg text-xs font-mono text-gray-700 w-28 text-center"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400">HASTA</span>
                  <input
                    type="text"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="bg-white border border-gray-300 px-3 py-1.5 rounded-lg text-xs font-mono text-gray-700 w-28 text-center"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Active Data Sync View */
            <div className="flex-1 flex flex-col justify-between py-4 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 font-bold uppercase border-b border-gray-200">
                    <tr>
                      <th className="p-2.5">Código</th>
                      <th className="p-2.5">Colaborador</th>
                      <th className="p-2.5">Tipo Memo</th>
                      <th className="p-2.5">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {memos.slice(0, 3).map(m => (
                      <tr key={m.id}>
                        <td className="p-2.5 font-mono font-bold">{m.code}</td>
                        <td className="p-2.5">{m.salesRepName}</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded bg-gray-100 font-bold text-[10px]">
                            {m.type}
                          </span>
                        </td>
                        <td className="p-2.5 font-mono">{m.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-gray-500 font-medium">
                  Total {memos.length} registros listos para exportar.
                </span>
                <button
                  onClick={handleDownloadExcel}
                  className="px-4 py-2 bg-[#006600] text-white rounded-lg text-xs font-bold hover:bg-[#005200] transition-colors"
                >
                  Descargar {memos.length} Memos
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Card 2 (col-span-4): Distribución por Faltas matching Image 5 */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-2xs">
          <h3 className="font-['Hanken_Grotesk',sans-serif] font-bold text-lg text-[#1a1c1c] mb-4">
            Distribución por Faltas
          </h3>

          <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            {/* Donut graphic */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="transparent"
                  stroke="#eeeeee"
                  strokeWidth="12"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="transparent"
                  stroke="#006600"
                  strokeWidth="12"
                  strokeDasharray="351.8"
                  strokeDashoffset={viewEmptyState ? "351.8" : "100"}
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-['Hanken_Grotesk',sans-serif] font-extrabold text-2xl text-[#1a1c1c]">
                  {viewEmptyState ? '0%' : '100%'}
                </span>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                  TOTAL
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="w-full space-y-2 text-xs">
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#bb0011]" />
                  <span>Injustificadas</span>
                </div>
                <span className="font-bold">{viewEmptyState ? '--' : '2'}</span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#006600]" />
                  <span>Justificadas</span>
                </div>
                <span className="font-bold">{viewEmptyState ? '--' : '1'}</span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  <span>Pendientes</span>
                </div>
                <span className="font-bold">{viewEmptyState ? '--' : '0'}</span>
              </div>
            </div>

            <p className="text-[11px] text-center text-gray-400 italic">
              Esperando sincronización de nómina...
            </p>
          </div>
        </div>

        {/* Card 3 (col-span-12): Cumplimiento por Zona matching Image 5 */}
        <div className="lg:col-span-12 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-['Hanken_Grotesk',sans-serif] font-bold text-lg text-[#1a1c1c]">
              Cumplimiento por Zona
            </h3>
            <span className="px-3 py-1 bg-emerald-50 text-[#006600] text-[10px] font-bold rounded-full uppercase tracking-wider">
              FILTRO: NACIONAL
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f3f3f3] text-gray-600 font-bold text-xs uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="p-4 pl-6 border-r border-gray-200/50">Región</th>
                  <th className="p-4 border-r border-gray-200/50">Total Personal</th>
                  <th className="p-4 border-r border-gray-200/50">Asistencia Avg.</th>
                  <th className="p-4 border-r border-gray-200/50">Metas Ventas</th>
                  <th className="p-4 pr-6">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ZONE_SUMMARIES.map((z, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 pl-6 font-bold text-[#1a1c1c] border-r border-gray-100">
                      {z.region}
                    </td>
                    <td className="p-4 text-gray-700 font-mono border-r border-gray-100">
                      {z.totalPersonal} Vendedores
                    </td>
                    <td className="p-4 text-gray-700 font-mono border-r border-gray-100">
                      {z.attendanceAvg}
                    </td>
                    <td className="p-4 font-bold text-[#006600] font-mono border-r border-gray-100">
                      {z.salesGoal}
                    </td>
                    <td className="p-4 pr-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        z.status === 'Conforme'
                          ? 'bg-emerald-100 text-[#006600]'
                          : z.status === 'En Observación'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {z.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Transactional Task Alert Banner matching Image 5 */}
      <div className="bg-[#575757] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm">Próxima Generación Automática</p>
            <p className="text-xs text-white/80 mt-0.5">
              El reporte consolidado de Q1 se generará automáticamente el 01 de Abril.
            </p>
          </div>
        </div>

        <button
          onClick={handleConfigReminder}
          className="bg-white text-[#575757] hover:bg-gray-100 px-4 py-2 rounded-xl font-bold text-xs transition-colors shrink-0"
        >
          Configurar Recordatorio
        </button>
      </div>

      {/* Footer */}
      <footer className="pt-6 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          Salesforce HR Admin © 2026 Heineken International. Todos los derechos reservados. Confidencial.
        </p>
      </footer>

    </div>
  );
};
