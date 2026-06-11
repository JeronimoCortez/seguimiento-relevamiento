import type { ReactNode } from 'react';

interface InfoStepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  icon: ReactNode;
  color?: 'blue' | 'violet' | 'emerald';
}

const cardColors: Record<string, string> = {
  blue: 'bg-blue-50 border-blue-200',
  violet: 'bg-violet-50 border-violet-200',
  emerald: 'bg-emerald-50 border-emerald-200',
};

const iconColors: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600',
  violet: 'bg-violet-100 text-violet-600',
  emerald: 'bg-emerald-100 text-emerald-600',
};

const badgeColors: Record<string, string> = {
  blue: 'text-blue-600',
  violet: 'text-violet-600',
  emerald: 'text-emerald-600',
};

export function InfoStepCard({
  stepNumber,
  title,
  description,
  icon,
  color = 'blue',
}: InfoStepCardProps) {
  return (
    <div
      className={`flex items-start gap-5 rounded-xl border-2 p-6 transition-all duration-150 hover:shadow-md ${cardColors[color]}`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconColors[color]}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <span
          className={`mb-1 inline-block text-xs font-semibold uppercase tracking-wider ${badgeColors[color]}`}
        >
          Etapa {stepNumber}
        </span>
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}
