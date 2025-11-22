export interface RoutineItem {
  id: string;
  label: string;
  completed: boolean;
  hasInput?: boolean; // For things like "Gratitude" note
  inputValue?: string;
}

export interface AvoidanceItem {
  id: string;
  avoid: string;
  solution: string;
}

export interface AgendaItem {
  id: string;
  time: string;
  description: string;
}

export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface DayData {
  date: string; // YYYY-MM-DD
  morningRoutine: RoutineItem[];
  avoidList: AvoidanceItem[];
  agenda: AgendaItem[];
  nonNegotiables: TaskItem[]; // Fixed size of 5 usually
  nightRoutine: RoutineItem[];
}