import React, { useState, useEffect, useCallback } from 'react';
import { DayData } from './types';
import { getDayData, saveDayData } from './services/storageService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Header } from './components/Header';
import { MorningRoutine } from './components/MorningRoutine';
import { AvoidanceSection } from './components/AvoidanceSection';
import { AgendaSection } from './components/AgendaSection';
import { TasksSection } from './components/TasksSection';
import { NightRoutine } from './components/NightRoutine';
import { HistoryView } from './components/HistoryView';
import { Calendar, Home, Save } from 'lucide-react';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [dayData, setDayData] = useState<DayData | null>(null);
  const [view, setView] = useState<'today' | 'history'>('today');
  const [isSaving, setIsSaving] = useState(false);

  // Load data when date changes
  useEffect(() => {
    const loadData = () => {
      const data = getDayData(currentDate);
      setDayData(data);
    };
    loadData();
  }, [currentDate]);

  const handleSave = useCallback((newData: DayData) => {
    setDayData(newData);
    saveDayData(newData);
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  }, []);

  const goToToday = () => {
    setCurrentDate(format(new Date(), 'yyyy-MM-dd'));
    setView('today');
  };

  if (!dayData) return <div className="flex items-center justify-center h-screen">Carregando...</div>;

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg relative pb-20">
      {/* Navigation Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 p-4 flex justify-between items-center">
        <button 
          onClick={() => setView(view === 'today' ? 'history' : 'today')}
          className="text-gray-600 hover:text-indigo-600 transition-colors"
        >
          {view === 'today' ? <Calendar size={24} /> : <Home size={24} />}
        </button>
        <h1 className="text-lg font-bold text-gray-800 tracking-tight">
            {view === 'today' ? 'Foco Diário' : 'Histórico'}
        </h1>
        <div className="w-6 h-6">
             {/* Spacer for alignment */}
        </div>
      </div>

      <div className="p-4 space-y-8">
        {view === 'today' ? (
          <>
            <Header dateStr={currentDate} />
            
            <section id="morning">
              <MorningRoutine 
                items={dayData.morningRoutine} 
                onChange={(newItems) => handleSave({ ...dayData, morningRoutine: newItems })} 
              />
            </section>

            <section id="avoid">
              <AvoidanceSection 
                items={dayData.avoidList}
                onChange={(newItems) => handleSave({ ...dayData, avoidList: newItems })}
              />
            </section>

            <section id="agenda">
              <AgendaSection 
                items={dayData.agenda}
                onChange={(newItems) => handleSave({ ...dayData, agenda: newItems })}
              />
            </section>

            <section id="tasks">
              <TasksSection 
                items={dayData.nonNegotiables}
                onChange={(newItems) => handleSave({ ...dayData, nonNegotiables: newItems })}
              />
            </section>

            <section id="night">
              <NightRoutine 
                items={dayData.nightRoutine}
                onChange={(newItems) => handleSave({ ...dayData, nightRoutine: newItems })}
              />
            </section>
          </>
        ) : (
          <HistoryView 
            onSelectDate={(date) => {
              setCurrentDate(date);
              setView('today');
            }} 
          />
        )}
      </div>

      {/* Floating Status / Save Indicator */}
      <div className="fixed bottom-6 right-6 z-30">
        {isSaving && (
          <div className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium animate-fade-in-up">
            <Save size={16} />
            Salvo
          </div>
        )}
      </div>
    </div>
  );
};

export default App;