import React from 'react';
import { XIcon as Icon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  value: string | number;
  icon: Icon;
  colorScheme: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

export default function InfoCard({ title, value, icon: IconComponent, colorScheme }: InfoCardProps) {
  const colorMap = {
    blue: 'bg-info-50 text-info-700 border-info-500',
    green: 'bg-accent-2-50 text-accent-2-700 border-accent-2-500',
    red: 'bg-error-50 text-error-700 border-error-500',
    yellow: 'bg-warning-50 text-warning-700 border-warning-500',
    purple: 'bg-purple-50 text-purple-700 border-purple-500'
  };
  
  const iconBgMap = {
    blue: 'bg-info-100 text-info-600',
    green: 'bg-accent-2-100 text-accent-2-600',
    red: 'bg-error-100 text-error-600',
    yellow: 'bg-warning-100 text-warning-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className={`card-basic card-hover border-l-4 ${colorMap[colorScheme]}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-sm border border-black ${iconBgMap[colorScheme]} mr-4`}>
          <IconComponent size={24} />
        </div>
        <div>
          <p className="text-subtitle opacity-80 font-medium">{title}</p>
          <p className="text-section font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}