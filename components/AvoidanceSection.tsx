import React, { useState } from 'react';
import { AvoidanceItem } from '../types';
import { ShieldAlert, Plus, Trash2, ArrowRight } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  items: AvoidanceItem[];
  onChange: (items: AvoidanceItem[]) => void;
}

export const AvoidanceSection: React.FC<Props> = ({ items, onChange }) => {
  const [newAvoid, setNewAvoid] = useState('');
  const [newSolution, setNewSolution] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (!newAvoid.trim()) return;
    
    const newItem: AvoidanceItem = {
      id: uuidv4(),
      avoid: newAvoid,
      solution: newSolution
    };
    
    onChange([...items, newItem]);
    setNewAvoid('');
    setNewSolution('');
    setIsAdding(false);
  };

  const handleRemove = (id: string) => {
    onChange(items.filter(i => i.id !== id));
  };

  const handleUpdateSolution = (id: string, solution: string) => {
    onChange(items.map(i => i.id === id ? { ...i, solution } : i));
  };

  return (
    <div className="bg-white rounded-2xl p-1">
       <div className="flex items-center gap-2 mb-4 px-2 pt-2">
        <ShieldAlert className="text-red-500" size={20} />
        <h3 className="text-lg font-bold text-gray-800">Evitar no dia</h3>
      </div>

      {items.length === 0 && !isAdding && (
        <div className="text-center py-6 bg-gray-50 rounded-xl mb-4 border border-dashed border-gray-200">
            <p className="text-sm text-gray-500">O que está drenando sua energia hoje?</p>
            <button 
                onClick={() => setIsAdding(true)}
                className="mt-2 text-indigo-600 font-medium text-sm hover:underline"
            >
                + Adicionar item para evitar
            </button>
        </div>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-red-50/50 border border-red-100 rounded-xl p-4 relative group">
            <button 
              onClick={() => handleRemove(item.id)}
              className="absolute top-2 right-2 text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
            
            <div className="mb-3">
               <h4 className="text-xs font-bold text-red-400 uppercase tracking-wide mb-1">Evitar</h4>
               <p className="text-gray-800 font-medium">{item.avoid}</p>
            </div>
            
            <div className="bg-white rounded-lg p-3 shadow-sm border border-red-100">
                <div className="flex items-center gap-2 mb-1">
                    <ArrowRight size={14} className="text-indigo-500" />
                    <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-wide">Estratégia / Solução</h4>
                </div>
               <input 
                  type="text"
                  value={item.solution}
                  onChange={(e) => handleUpdateSolution(item.id, e.target.value)}
                  placeholder="Qual a solução prática?"
                  className="w-full text-sm text-gray-700 bg-transparent focus:outline-none placeholder-gray-400"
               />
            </div>
          </div>
        ))}
      </div>

      {(isAdding || items.length > 0) && (
          <div className={`mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200 transition-all ${isAdding ? 'block' : 'hidden'}`}>
             <div className="space-y-3">
                <input 
                    type="text"
                    value={newAvoid}
                    onChange={(e) => setNewAvoid(e.target.value)}
                    placeholder="O que você quer evitar?"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    autoFocus
                />
                <input 
                    type="text"
                    value={newSolution}
                    onChange={(e) => setNewSolution(e.target.value)}
                    placeholder="Qual a solução?"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
                <div className="flex justify-end gap-2">
                    <button 
                        onClick={() => setIsAdding(false)}
                        className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={handleAdd}
                        disabled={!newAvoid.trim()}
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
                    >
                        Adicionar
                    </button>
                </div>
             </div>
          </div>
      )}

      {!isAdding && items.length > 0 && (
          <button 
            onClick={() => setIsAdding(true)}
            className="mt-4 w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 text-sm font-medium hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Adicionar outro ponto de atenção
          </button>
      )}
    </div>
  );
};