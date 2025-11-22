import { DayData, TaskItem, AgendaItem, AvoidanceItem, RoutineItem } from '../types';
import { DEFAULT_MORNING_ROUTINE, DEFAULT_NIGHT_ROUTINE, INITIAL_TASKS_COUNT } from '../constants';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY_PREFIX = 'foco_diario_';

export const getDayData = (date: string): DayData => {
  const key = `${STORAGE_KEY_PREFIX}${date}`;
  const stored = localStorage.getItem(key);

  if (stored) {
    return JSON.parse(stored);
  }

  // Initialize empty day
  return {
    date,
    morningRoutine: DEFAULT_MORNING_ROUTINE.map(item => ({ ...item, completed: false })),
    avoidList: [],
    agenda: [],
    nonNegotiables: Array.from({ length: INITIAL_TASKS_COUNT }, (_, i) => ({
      id: `task-${i}`,
      title: '',
      completed: false
    })),
    nightRoutine: DEFAULT_NIGHT_ROUTINE.map(item => ({ ...item, completed: false, inputValue: '' })),
  };
};

export const saveDayData = (data: DayData): void => {
  const key = `${STORAGE_KEY_PREFIX}${data.date}`;
  localStorage.setItem(key, JSON.stringify(data));
};

export const getAllHistory = (): DayData[] => {
  const days: DayData[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
      const item = localStorage.getItem(key);
      if (item) {
        days.push(JSON.parse(item));
      }
    }
  }
  // Sort by date descending
  return days.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};