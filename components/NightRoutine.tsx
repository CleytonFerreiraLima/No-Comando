import React from 'react';
import { RoutineItem } from '../types';
import { ProgressBar } from './ProgressBar';
import { Moon, Check } from 'lucide-react';

interface Props {
  items: RoutineItem[];
  onChange: (items: RoutineItem[]) => void;
}

export const NightRoutine: React.FC<Props> = ({ items, onChange }) => {
  const completedCount = items.filter(i => i.completed).length;

  const toggleItem = (id: string) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    onChange(newItems);
  };

  const handleInputChange = (id: string, val: string) => {
      const newItems = items.map(item => 
        item.id === id ? { ...item, inputValue: val } : item
      );
      onChange(newItems);
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-1 pb-4">
      <div className="flex items-center gap-2 mb-2 px-4 pt-4">
        <Moon className="text-indigo-300" size={20} />
        <h3 className="text-lg font-bold text-white">Rotina Noturna</h3>
      </div>
      
      <div className="px-4 mb-4">
        <ProgressBar current={completedCount} total={items.length} colorClass="bg-indigo-400" />
      </div>

      <div className="space-y-3 px-2">
        {items.map((item) => (
          <div 
            key={item.id} 
            className={`p-3 rounded-xl transition-all border ${
              item.completed 
                ? 'bg-slate-800/50 border-slate-700' 
                : 'bg-slate-800 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center cursor-pointer" onClick={() => toggleItem(item.id)}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 transition-colors ${
                item.completed ? 'bg-indigo-500 border-indigo-500' : 'border-slate-500'
                }`}>
                    {item.completed && <Check size={14} className="text-white" />}
                </div>
                <span className={`text-sm font-medium flex-1 ${item.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                    {item.label}
                </span>
            </div>

            {/* Render Input field if item requires it (Gratitude/Planning) */}
            {item.hasInput && (
                <div className={`mt-3 ml-9 transition-all ${item.completed ? 'opacity-50' : 'opacity-100'}`}>
                     <textarea 
                        rows={2}
                        value={item.inputValue || ''}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder={item.id.includes('Dia Seguinte') ? "Planeje o dia de amanhã..." : "Pelo que você é grato hoje?"}
                        className="w-full bg-slate-900/50 text-slate-300 text-sm rounded-lg border border-slate-700 p-2 focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
                     />
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};