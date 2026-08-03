import { SalesRep, MemoRecord, AppNotification, ZoneSummary } from '../types';

export const INITIAL_SALES_REPS: SalesRep[] = [
  {
    id: 'rep-1',
    code: 'HK-20491',
    name: 'Carlos Mendoza Ramos',
    email: 'carlos.mendoza@heineken.com',
    phone: '+51 987 654 321',
    zone: 'Lima Metro',
    avatar: '',
    memoCount: 0,
    performanceQ3: 94,
    status: 'Activo',
    statusBadge: 'Limpio',
    hireDate: '2022-03-15'
  },
  {
    id: 'rep-2',
    code: 'HK-10284',
    name: 'Ana Gutiérrez Morales',
    email: 'ana.gutierrez@heineken.com',
    phone: '+51 912 345 678',
    zone: 'Norte',
    avatar: '',
    memoCount: 0,
    performanceQ3: 98,
    status: 'Activo',
    statusBadge: 'Limpio',
    hireDate: '2021-06-01'
  },
  {
    id: 'rep-3',
    code: 'HK-30912',
    name: 'Roberto Silva Castro',
    email: 'roberto.silva@heineken.com',
    phone: '+51 976 543 210',
    zone: 'Sur',
    avatar: '',
    memoCount: 0,
    performanceQ3: 82,
    status: 'Activo',
    statusBadge: 'Limpio',
    hireDate: '2020-11-10'
  },
  {
    id: 'rep-4',
    code: 'HK-40122',
    name: 'Jorge Morales Benítez',
    email: 'jorge.morales@heineken.com',
    phone: '+51 945 123 890',
    zone: 'Centro',
    avatar: '',
    memoCount: 0,
    performanceQ3: 91,
    status: 'Activo',
    statusBadge: 'Limpio',
    hireDate: '2023-01-20'
  },
  {
    id: 'rep-5',
    code: 'HK-50819',
    name: 'Lucía Fernández Torres',
    email: 'lucia.fernandez@heineken.com',
    phone: '+51 933 887 112',
    zone: 'Este',
    avatar: '',
    memoCount: 0,
    performanceQ3: 88,
    status: 'Activo',
    statusBadge: 'Limpio',
    hireDate: '2022-08-05'
  },
  {
    id: 'rep-6',
    code: 'HK-60233',
    name: 'Miguel Ángel Paredes',
    email: 'miguel.paredes@heineken.com',
    phone: '+51 922 114 556',
    zone: 'Norte',
    avatar: '',
    memoCount: 0,
    performanceQ3: 85,
    status: 'Activo',
    statusBadge: 'Limpio',
    hireDate: '2019-04-12'
  }
];

export const INITIAL_MEMOS: MemoRecord[] = [];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Nuevo Memorándum Registrado',
    message: 'Se ha formalizado un memorándum de Llamada de Atención para Carlos Mendoza.',
    date: 'Hace 10 min',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-2',
    title: 'Alerta de Inasistencia',
    message: 'Reporte consolidado de nómina listo para revisión en Zona Sur.',
    date: 'Hace 2 horas',
    read: false,
    type: 'warning'
  },
  {
    id: 'notif-3',
    title: 'Cierre Trimestral Q1',
    message: 'La sincronización automática de reportes ejecutivos está programada para el 01 de Abril.',
    date: 'Ayer',
    read: true,
    type: 'info'
  }
];

export const ZONE_SUMMARIES: ZoneSummary[] = [
  { region: 'Lima Metro', totalPersonal: 42, attendanceAvg: '98.2%', salesGoal: '104%', status: 'Conforme' },
  { region: 'Zona Norte', totalPersonal: 28, attendanceAvg: '95.6%', salesGoal: '97%', status: 'Conforme' },
  { region: 'Zona Centro', totalPersonal: 19, attendanceAvg: '93.1%', salesGoal: '91%', status: 'En Observación' },
  { region: 'Zona Sur', totalPersonal: 31, attendanceAvg: '89.4%', salesGoal: '88%', status: 'Crítico' },
  { region: 'Zona Este', totalPersonal: 15, attendanceAvg: '96.8%', salesGoal: '101%', status: 'Conforme' }
];
