export type UserRole = 'Administrador' | 'Cliente';

export type MemoType = 'Llamada de atención' | 'Día no remunerado' | 'Despido';

export type MemoStatus = 'Registrado' | 'En revisión' | 'Aprobado' | 'Cerrado';

export type PageView = 'login' | 'dashboard' | 'vendedores' | 'registro' | 'reportes';

export interface User {
  id: string;
  employeeId: string;
  name: string;
  role: UserRole;
  title: string;
  email: string;
  avatar: string;
  zone?: string;
}

export interface SalesRep {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  zone: 'Lima Metro' | 'Norte' | 'Centro' | 'Sur' | 'Este';
  avatar: string;
  memoCount: number;
  lastMemoDate?: string;
  performanceQ3: number;
  status: 'Activo' | 'Sancionado' | 'Despedido';
  statusBadge: 'Limpio' | '1 Llamada' | 'Día No Remunerado' | 'Despedido';
  hireDate: string;
}

export interface MemoRecord {
  id: string;
  code: string;
  salesRepId: string;
  salesRepName: string;
  salesRepCode: string;
  salesRepZone: string;
  salesRepAvatar: string;
  type: MemoType;
  date: string;
  description: string;
  fileAttachmentName?: string;
  fileAttachmentSize?: string;
  createdBy: string;
  status: MemoStatus;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'alert';
}

export interface ZoneSummary {
  region: string;
  totalPersonal: number;
  attendanceAvg: string;
  salesGoal: string;
  status: 'Conforme' | 'En Observación' | 'Crítico';
}
