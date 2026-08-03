import { SalesRep, MemoRecord, AppNotification, ZoneSummary } from '../types';

export const INITIAL_SALES_REPS: SalesRep[] = [];

export const INITIAL_MEMOS: MemoRecord[] = [];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [];

export const ZONE_SUMMARIES: ZoneSummary[] = [
  { region: 'Lima Metro', totalPersonal: 0, attendanceAvg: '--', salesGoal: '--', status: 'Sin Registros' },
  { region: 'Zona Norte', totalPersonal: 0, attendanceAvg: '--', salesGoal: '--', status: 'Sin Registros' },
  { region: 'Zona Centro', totalPersonal: 0, attendanceAvg: '--', salesGoal: '--', status: 'Sin Registros' },
  { region: 'Zona Sur', totalPersonal: 0, attendanceAvg: '--', salesGoal: '--', status: 'Sin Registros' },
  { region: 'Zona Este', totalPersonal: 0, attendanceAvg: '--', salesGoal: '--', status: 'Sin Registros' }
];

