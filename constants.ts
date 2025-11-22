import { RoutineItem } from './types';

export const DEFAULT_MORNING_ROUTINE: Omit<RoutineItem, 'completed'>[] = [
  { id: 'mr-1', label: 'Gratidão' },
  { id: 'mr-2', label: 'Arrumar a cama' },
  { id: 'mr-3', label: 'Sem celular ao acordar' },
  { id: 'mr-4', label: 'Beber água' },
  { id: 'mr-5', label: 'Silêncio Consciente' },
  { id: 'mr-6', label: 'Banho' },
  { id: 'mr-7', label: 'Comer uma fruta / Suplemento' },
  { id: 'mr-8', label: 'Exercício físico' },
  { id: 'mr-9', label: 'Afirmação ao ar livre' },
  { id: 'mr-10', label: 'Leitura e escrita' },
  { id: 'mr-11', label: 'Visualizar as tarefas do dia' },
];

export const DEFAULT_NIGHT_ROUTINE: Omit<RoutineItem, 'completed'>[] = [
  { id: 'nr-1', label: 'Respire e solte o corpo' },
  { id: 'nr-2', label: 'Dia Seguinte', hasInput: true }, // Planning
  { id: 'nr-3', label: 'Banho' },
  { id: 'nr-4', label: 'Sem telas às 22h' },
  { id: 'nr-5', label: 'Gratidão do dia', hasInput: true },
];

export const INITIAL_TASKS_COUNT = 5;