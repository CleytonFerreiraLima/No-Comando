import React, { useState } from 'react';
import { AgendaItem } from '../types';
import { Clock, Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  items: AgendaItem[];
  onChange: (items: AgendaItem[]) => void;
}

export const AgendaSection: React.FC<Props> = ({ items, onChange }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTime, setNewTime] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const sortedItems = [...items].sort((a, b) => a.time.localeCompare(b.time));

  const handleAdd = () => {
    if (!newTime || !newDesc) return;
    
    const newItem: AgendaItem = {
      id: uuidv4(),
      time: newTime,
      description: newDesc
    };
    
    onChange([...items, newItem]);
    setNewTime('');
    setNewDesc('');
    setIsAdding(false);
  };

  const handleRemove = (id: string) => {
    onChange(items.filter(i => i.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl p-1">
      <div className="flex items-center gap-2 mb-4 px-2 pt-2">
        <Clock className="text-blue-500" size={20} />
        <h3 className="text-lg font-bold text-gray-800">Agenda do Dia</h3>
      </div>

      <div className="space-y-3 relative pl-4 border-l-2 border-gray-100 ml-2">
        {sortedItems.map((item) => (
          <div key={item.id} className="relative group">
            <div className="absolute -left-[21px] top-3 w-3 h-3 bg-blue-500 rounded-full border-2 border-white ring-1 ring-blue-100"></div>
            <div className="bg-gray-50 rounded-xl p-3 ml-2 flex justify-between items-center hover:bg-white hover:shadow-sm transition-all">
               <div>
                   <span className="text-blue-600 font-bold text-sm block mb-0.5">{item.time}</span>
                   <span className="text-gray-700 font-medium text-sm">{item.description}</span>
               </div>
               <button 
                  onClick={() => handleRemove(item.id)}
                  className="text-gray-300 hover:text-red-500 p-2"
                >
                  <X size={14} />
                </button>
            </div>
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="mt-4 bg-blue-50/50 rounded-xl p-4 border border-blue-100 ml-2 animate-fade-in">
           <div className="flex gap-2 mb-2">
              <input 
                type="time" 
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 w-28"
              />
              <input 
                type="text" 
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Compromisso"
                className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
           </div>
           <div className="flex justify-end gap-2">
             <button onClick={() => setIsAdding(false)} className="text-xs text-gray-500 font-medium px-3 py-1">Cancelar</button>
             <button onClick={handleAdd} disabled={!newTime || !newDesc} className="text-xs bg-blue-600 text-white px-4 py-1.5 rounded-lg font-medium disabled:opacity-50">Adicionar</button>
           </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsAdding(true)}
          className="mt-4 ml-2 flex items-center gap-2 text-sm text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Adicionar compromisso
        </button>
      )}
    </div>
  );
};