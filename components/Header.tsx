import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface HeaderProps {
  dateStr: string;
}

export const Header: React.FC<HeaderProps> = ({ dateStr }) => {
  const date = new Date(dateStr + 'T00:00:00'); // Fix timezone offset issues by treating as local midnight

  return (
    <div className="text-center mb-6">
      <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
        {format(date, 'EEEE', { locale: ptBR })}
      </p>
      <h2 className="text-3xl font-bold text-gray-900">
        {format(date, "d 'de' MMMM", { locale: ptBR })}
      </h2>
      <p className="text-gray-500 text-sm">
        {format(date, 'yyyy')}
      </p>
    </div>
  );
};