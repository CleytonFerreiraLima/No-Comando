import React from 'react';
import { RoutineItem } from '../types';
import { ProgressBar } from './ProgressBar';
import { Sun, Check } from 'lucide-react';

interface Props {
  items: RoutineItem[];
  onChange: (items: RoutineItem[]) => void;
}

export const MorningRoutine: React.FC<Props> = ({ items, onChange }) => {
  const completedCount = items.filter(i => i.completed).length;

  const toggleItem = (id: string) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    onChange(newItems);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-1">
      <div className="flex items-center gap-2 mb-2 px-2 pt-2">
        <Sun className="text-orange-400" size={20} />
        <h3 className="text-lg font-bold text-gray-800">Rotina Matinal</h3>
      </div>
      
      <div className="px-2">
        <ProgressBar current={completedCount} total={items.length} colorClass="bg-orange-400" />
      </div>

      <div className="space-y-2 mt-3">
        {items.map((item) => (
          <div 
            key={item.id} 
            className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${
              item.completed ? 'bg-green-50 border-green-100' : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => toggleItem(item.id)}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 transition-colors ${
              item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
            }`}>
              {item.completed && <Check size={14} className="text-white" />}
            </div>
            <span className={`text-sm font-medium flex-1 ${item.completed ? 'text-green-800 line-through decoration-green-800/30' : 'text-gray-700'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};