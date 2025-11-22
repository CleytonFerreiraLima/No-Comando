import React, { useEffect, useState } from 'react';
import { getAllHistory } from '../services/storageService';
import { DayData } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronRight, Trophy } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

interface Props {
  onSelectDate: (date: string) => void;
}

export const HistoryView: React.FC<Props> = ({ onSelectDate }) => {
  const [history, setHistory] = useState<DayData[]>([]);

  useEffect(() => {
    setHistory(getAllHistory());
  }, []);

  // Prepare data for chart (Last 7 entries)
  const chartData = history.slice(0, 7).reverse().map(day => ({
      name: format(new Date(day.date + 'T00:00:00'), 'dd/MM'),
      completed: day.nonNegotiables.filter(t => t.completed).length
  }));

  return (
    <div className="animate-fade-in">
       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
             <Trophy className="text-yellow-500" size={20} />
             <h3 className="font-bold text-gray-800">Consistência (Inegociáveis)</h3>
          </div>
          <div className="h-40 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                        cursor={{fill: '#f3f4f6'}}
                        contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="completed" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
             </ResponsiveContainer>
          </div>
       </div>

      <h3 className="text-lg font-bold text-gray-800 mb-4 px-2">Registros Anteriores</h3>
      
      <div className="space-y-3">
        {history.map((day) => {
            const completedTasks = day.nonNegotiables.filter(t => t.completed).length;
            const dateObj = new Date(day.date + 'T00:00:00');
            
            return (
            <button 
                key={day.date}
                onClick={() => onSelectDate(day.date)}
                className="w-full bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between hover:shadow-md transition-all group"
            >
                <div className="text-left">
                    <p className="text-gray-900 font-bold capitalize">
                        {format(dateObj, "EEEE, d 'de' MMMM", { locale: ptBR })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {completedTasks}/5 inegociáveis • {day.morningRoutine.filter(m => m.completed).length} rotina matinal
                    </p>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-indigo-500" size={20} />
            </button>
            );
        })}

        {history.length === 0 && (
            <p className="text-center text-gray-400 py-10">Nenhum histórico encontrado.</p>
        )}
      </div>
    </div>
  );
};