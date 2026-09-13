import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
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
  preselectedRep: SalesRep | null;
  setPreselectedRep: (rep: SalesRep | null) => void;
  preselectedMemoType: MemoType | null;
  setPreselectedMemoType: (type: MemoType | null) => void;
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
  selectedZoneFilter: string;
  setSelectedZoneFilter: (zone: string) => void;
  selectedDateFilter: string;
  setSelectedDateFilter: (date: string) => void;
  addMemo: (memo: Omit<MemoRecord, 'id' | 'code' | 'createdBy' | 'status'>) => void;
  addSalesRep: (rep: Omit<SalesRep, 'id' | 'code' | 'memoCount' | 'statusBadge'>) => void;
  deleteMemo: (id: string) => void;
  resetDemoData: () => void;
  setEmptyStateData: () => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_VERSION = 1;
const STORAGE_KEYS = {
  memos: `heineken:memos:v${STORAGE_VERSION}`,
  salesReps: `heineken:sales-reps:v${STORAGE_VERSION}`,
  notifications: `heineken:notifications:v${STORAGE_VERSION}`,
  session: `heineken:session:v${STORAGE_VERSION}`
} as const;

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

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function persist(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // A private browsing quota or blocked storage must not break registration.
  }
}

function makeId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function nextMemoCode(memos: MemoRecord[]) {
  const highest = memos.reduce((max, memo) => {
    const number = Number(memo.code.match(/(\d+)$/)?.[1] ?? 0);
    return Math.max(max, number);
  }, 0);
  return `MEM-2026-${String(highest + 1).padStart(3, '0')}`;
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('login');
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [salesReps, setSalesReps] = useState<SalesRep[]>(INITIAL_SALES_REPS);
  const [memos, setMemos] = useState<MemoRecord[]>(INITIAL_MEMOS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [isHydrated, setIsHydrated] = useState(false);

  const [preselectedRep, setPreselectedRep] = useState<SalesRep | null>(null);
  const [preselectedMemoType, setPreselectedMemoType] = useState<MemoType | null>(null);
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState('Todas');
  const [selectedDateFilter, setSelectedDateFilter] = useState('Todas');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Restore all application data before rendering the authenticated area.
  useEffect(() => {
    const storedSession = readStored<User | null>(STORAGE_KEYS.session, null);
    setCurrentUserState(storedSession);
    setSalesReps(readStored(STORAGE_KEYS.salesReps, INITIAL_SALES_REPS));
    setMemos(readStored(STORAGE_KEYS.memos, INITIAL_MEMOS));
    setNotifications(readStored(STORAGE_KEYS.notifications, INITIAL_NOTIFICATIONS));
    if (storedSession) setCurrentPage('dashboard');
    setIsHydrated(true);
  }, []);

  // Persist every change after the first restore, so a refresh or browser restart cannot erase it.
  useEffect(() => { if (isHydrated) persist(STORAGE_KEYS.salesReps, salesReps); }, [salesReps, isHydrated]);
  useEffect(() => { if (isHydrated) persist(STORAGE_KEYS.memos, memos); }, [memos, isHydrated]);
  useEffect(() => { if (isHydrated) persist(STORAGE_KEYS.notifications, notifications); }, [notifications, isHydrated]);

  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    if (user) persist(STORAGE_KEYS.session, user);
    else if (typeof window !== 'undefined') window.localStorage.removeItem(STORAGE_KEYS.session);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 4000);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addMemo = (newMemoData: Omit<MemoRecord, 'id' | 'code' | 'createdBy' | 'status'>) => {
    const newMemo: MemoRecord = {
      ...newMemoData,
      id: makeId('memo'),
      code: nextMemoCode(memos),
      createdBy: `${currentUser?.name || DEFAULT_USER.name} - ${currentUser?.title || DEFAULT_USER.title}`,
      status: 'Aprobado'
    };

    setMemos(prev => [newMemo, ...prev]);
    setSalesReps(prev => prev.map(rep => {
      if (rep.id !== newMemoData.salesRepId) return rep;
      const newCount = rep.memoCount + 1;
      let newBadge: SalesRep['statusBadge'] = rep.statusBadge;
      let newStatus: SalesRep['status'] = rep.status;
      if (newMemoData.type === 'Llamada de atención') { newBadge = '1 Llamada'; newStatus = 'Sancionado'; }
      if (newMemoData.type === 'Día no remunerado') { newBadge = 'Día No Remunerado'; newStatus = 'Sancionado'; }
      if (newMemoData.type === 'Despido') { newBadge = 'Despedido'; newStatus = 'Despedido'; }
      return { ...rep, memoCount: newCount, lastMemoDate: newMemoData.date, status: newStatus, statusBadge: newBadge };
    }));

    setNotifications(prev => [{
      id: makeId('notif'),
      title: 'Memorándum Registrado',
      message: `Se ha emitido un memorándum (${newMemoData.type}) para ${newMemoData.salesRepName}.`,
      date: 'Ahora mismo',
      read: false,
      type: newMemoData.type === 'Despido' ? 'alert' : 'warning'
    }, ...prev]);
    showToast(`Memorándum ${newMemo.code} registrado y guardado correctamente para ${newMemoData.salesRepName}`);
  };

  const addSalesRep = (repData: Omit<SalesRep, 'id' | 'code' | 'memoCount' | 'statusBadge'>) => {
    const newRep: SalesRep = {
      ...repData,
      id: makeId('rep'),
      code: `HK-${Math.floor(10000 + Math.random() * 90000)}`,
      memoCount: 0,
      statusBadge: 'Limpio'
    };
    setSalesReps(prev => [newRep, ...prev]);
    showToast(`Vendedor ${repData.name} (${newRep.code}) registrado y guardado con éxito.`);
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

  const value = useMemo(() => ({
    currentPage, setCurrentPage, currentUser, setCurrentUser, salesReps, setSalesReps, memos, setMemos,
    notifications, markNotificationAsRead, clearAllNotifications, preselectedRep, setPreselectedRep,
    preselectedMemoType, setPreselectedMemoType, globalSearch, setGlobalSearch, selectedZoneFilter,
    setSelectedZoneFilter, selectedDateFilter, setSelectedDateFilter, addMemo, addSalesRep, deleteMemo,
    resetDemoData, setEmptyStateData, toast, showToast
  }), [currentPage, currentUser, salesReps, memos, notifications, preselectedRep, preselectedMemoType,
    globalSearch, selectedZoneFilter, selectedDateFilter, toast]);

  if (!isHydrated) return null;
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
