import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, SalesRep, MemoRecord, AppNotification, PageView, MemoType } from '../types';
import { INITIAL_SALES_REPS, INITIAL_MEMOS, INITIAL_NOTIFICATIONS } from '../data/initialData';

interface AppContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  salesReps: SalesRep[];
  setSalesReps: React.Dispatch<React.SetStateAction<SalesRep[]>>;
  memos: MemoRecord[];
  setMemos: React.Dispatch<React.SetStateAction<MemoRecord[]>>;
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  
  // Quick pre-selections when navigating to Registro
  preselectedRep: SalesRep | null;
  setPreselectedRep: (rep: SalesRep | null) => void;
  preselectedMemoType: MemoType | null;
  setPreselectedMemoType: (type: MemoType | null) => void;

  // Global filters & search
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
  selectedZoneFilter: string;
  setSelectedZoneFilter: (zone: string) => void;
  selectedDateFilter: string;
  setSelectedDateFilter: (date: string) => void;

  // Actions
  addMemo: (memo: Omit<MemoRecord, 'id' | 'code' | 'createdBy' | 'status'>) => void;
  addSalesRep: (rep: Omit<SalesRep, 'id' | 'code' | 'memoCount' | 'statusBadge'>) => void;
  deleteMemo: (id: string) => void;
  resetDemoData: () => void;
  setEmptyStateData: () => void;
  
  // Toast
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: User = {
  id: 'usr-admin-1',
  employeeId: 'HK-000101',
  name: 'Salesforce HR Admin',
  role: 'Administrador',
  title: 'Administrador',
  email: 'admin.hr@heineken.com',
  avatar: '',
  zone: 'Nacional'
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(DEFAULT_USER);
  const [salesReps, setSalesReps] = useState<SalesRep[]>(INITIAL_SALES_REPS);
  const [memos, setMemos] = useState<MemoRecord[]>(INITIAL_MEMOS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  
  const [preselectedRep, setPreselectedRep] = useState<SalesRep | null>(null);
  const [preselectedMemoType, setPreselectedMemoType] = useState<MemoType | null>(null);

  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState('Todas');
  const [selectedDateFilter, setSelectedDateFilter] = useState('Todas');

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addMemo = (newMemoData: Omit<MemoRecord, 'id' | 'code' | 'createdBy' | 'status'>) => {
    const memoId = `memo-${Date.now()}`;
    const code = `MEM-2026-${String(memos.length + 1).padStart(3, '0')}`;
    
    const newMemo: MemoRecord = {
      ...newMemoData,
      id: memoId,
      code,
      createdBy: `${currentUser?.name || 'Salesforce HR Admin'} - ${currentUser?.title || 'Administrador'}`,
      status: 'Aprobado'
    };

    setMemos(prev => [newMemo, ...prev]);

    // Update sales rep memo count and badge
    setSalesReps(prev => prev.map(rep => {
      if (rep.id === newMemoData.salesRepId) {
        const newCount = rep.memoCount + 1;
        let newBadge: SalesRep['statusBadge'] = rep.statusBadge;
        let newStatus: SalesRep['status'] = rep.status;

        if (newMemoData.type === 'Llamada de atención') {
          newBadge = '1 Llamada';
          newStatus = 'Sancionado';
        } else if (newMemoData.type === 'Día no remunerado') {
          newBadge = 'Día No Remunerado';
          newStatus = 'Sancionado';
        } else if (newMemoData.type === 'Despido') {
          newBadge = 'Despedido';
          newStatus = 'Despedido';
        }

        return {
          ...rep,
          memoCount: newCount,
          lastMemoDate: newMemoData.date,
          status: newStatus,
          statusBadge: newBadge
        };
      }
      return rep;
    }));

    // Add notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Memorándum Registrado',
      message: `Se ha emitido un memorándum (${newMemoData.type}) para ${newMemoData.salesRepName}.`,
      date: 'Ahora mismo',
      read: false,
      type: newMemoData.type === 'Despido' ? 'alert' : 'warning'
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Memorándum ${code} registrado exitosamente para ${newMemoData.salesRepName}`);
  };

  const addSalesRep = (repData: Omit<SalesRep, 'id' | 'code' | 'memoCount' | 'statusBadge'>) => {
    const newId = `rep-${Date.now()}`;
    const code = `HK-${Math.floor(10000 + Math.random() * 90000)}`;

    const newRep: SalesRep = {
      ...repData,
      id: newId,
      code,
      memoCount: 0,
      statusBadge: 'Limpio'
    };

    setSalesReps(prev => [newRep, ...prev]);
    showToast(`Vendedor ${repData.name} (${code}) registrado con éxito.`);
  };

  const deleteMemo = (id: string) => {
    setMemos(prev => prev.filter(m => m.id !== id));
    showToast('Memorándum eliminado del registro.', 'info');
  };

  const resetDemoData = () => {
    setSalesReps(INITIAL_SALES_REPS);
    setMemos(INITIAL_MEMOS);
    setNotifications(INITIAL_NOTIFICATIONS);
    showToast('Datos de demostración de Heineken cargados.', 'info');
  };

  const setEmptyStateData = () => {
    setMemos([]);
    showToast('Estado en blanco activado (Sin memorándums registrados).', 'info');
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      currentUser,
      setCurrentUser,
      salesReps,
      setSalesReps,
      memos,
      setMemos,
      notifications,
      markNotificationAsRead,
      clearAllNotifications,
      preselectedRep,
      setPreselectedRep,
      preselectedMemoType,
      setPreselectedMemoType,
      globalSearch,
      setGlobalSearch,
      selectedZoneFilter,
      setSelectedZoneFilter,
      selectedDateFilter,
      setSelectedDateFilter,
      addMemo,
      addSalesRep,
      deleteMemo,
      resetDemoData,
      setEmptyStateData,
      toast,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
