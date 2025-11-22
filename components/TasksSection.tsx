import React from 'react';
import { TaskItem } from '../types';
import { Target, Check } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface Props {
  items: TaskItem[];
  onChange: (items: TaskItem[]) => void;
}

export const TasksSection: React.FC<Props> = ({ items, onChange }) => {
  const completedCount = items.filter(i => i.completed).length;

  const handleToggle = (id: string) => {
    onChange(items.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  };

  const handleTextChange = (id: string, newTitle: string) => {
     onChange(items.map(i => i.id === id ? { ...i, title: newTitle } : i));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-5 text-white shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <Target className="text-white/90" size={20} />
        <h3 className="text-lg font-bold text-white">5 Inegociáveis</h3>
      </div>
      
      <div className="mb-5">
          <div className="w-full bg-black/20 rounded-full h-2.5">
            <div 
                className="bg-white h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${(completedCount / 5) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-white/70 text-right mt-1 font-medium">{completedCount}/5 completas</p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-3">
            <span className="text-white/40 font-bold text-sm w-4 text-center">{index + 1}</span>
            <div className="flex-1 bg-white/10 rounded-xl p-1 flex items-center backdrop-blur-sm border border-white/10 focus-within:bg-white/20 focus-within:border-white/30 transition-all">
                <button 
                    onClick={() => handleToggle(item.id)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ml-1 ${
                        item.completed ? 'bg-green-400 text-white' : 'bg-black/20 text-transparent hover:bg-black/30'
                    }`}
                >
                    <Check size={16} />
                </button>
                <input 
                    type="text"
                    value={item.title}
                    onChange={(e) => handleTextChange(item.id, e.target.value)}
                    placeholder="Defina a tarefa..."
                    className={`bg-transparent border-none outline-none text-sm px-3 py-2 w-full placeholder-white/30 ${
                        item.completed ? 'text-white/50 line-through' : 'text-white'
                    }`}
                />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};