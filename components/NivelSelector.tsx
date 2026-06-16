'use client';

import Link from 'next/link';

interface NivelSelectorProps {
  basePath: string;
}

const niveles = [
  {
    href: 'primaria',
    nivel: 'Primaria',
    descripcion: 'Nivel Primaria',
    color: 'violet',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    href: 'secundaria',
    nivel: 'Secundaria',
    descripcion: 'Nivel Secundario',
    color: 'blue',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    href: 'adultos',
    nivel: 'Jovenes y adultos',
    descripcion: 'Jovenes y adultos',
    color: 'blue',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    href: 'educacion-especial',
    nivel: 'Educacion Especial',
    descripcion: 'Educacion especial',
    color: 'violet',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

const colorMap: Record<string, string> = {
  violet: 'border-violet-200 hover:border-violet-400 hover:bg-violet-50',
  blue: 'border-blue-200 hover:border-blue-400 hover:bg-blue-50',
};

const iconBg: Record<string, string> = {
  violet: 'bg-violet-100 text-violet-600',
  blue: 'bg-blue-100 text-blue-600',
};

export function NivelSelector({ basePath }: NivelSelectorProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-center text-gray-600 text-sm font-medium uppercase tracking-wider mb-8">
        Seleccione un nivel
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {niveles.map(({ href, nivel, descripcion, color, icon }) => (
          <Link
            key={href}
            href={`${basePath}/${href}`}
            className={`border-2 rounded-xl p-6 flex flex-col items-center text-center transition-all duration-150 group ${colorMap[color]}`}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${iconBg[color]}`}
            >
              {icon}
            </div>
            <h3 className="font-bold text-lg mb-1">{nivel}</h3>
            <p className="text-sm opacity-70">{descripcion}</p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Completar formulario
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
