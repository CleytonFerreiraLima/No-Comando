import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  colorClass?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, colorClass = 'bg-indigo-600' }) => {
  const percentage = Math.round((current / total) * 100) || 0;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-4">
      <div 
        className={`h-2.5 rounded-full transition-all duration-500 ease-out ${colorClass}`} 
        style={{ width: `${percentage}%` }}
      ></div>
      <p className="text-xs text-right text-gray-500 mt-1 font-medium">
        {current}/{total} concluídas
      </p>
    </div>
  );
};