'use client';

import type { SchoolRecord } from '@/types';
import { Button } from '@/components/ui/Button';

interface SearchSchoolCardProps {
  school: SchoolRecord;
  onViewLoad: () => void;
}

export function SearchSchoolCard({ school, onViewLoad }: SearchSchoolCardProps) {
  return (
    <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 transition-all duration-150 hover:shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          {school.nombreEscuela}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          N° {school.numero}
        </p>
      </div>
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs text-gray-500">Correo</p>
          <p className="text-sm text-gray-800">{school.correo}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Sección</p>
          <p className="text-sm text-gray-800">{school.seccion}</p>
        </div>
      </div>
      <Button variant="secondary" onClick={onViewLoad}>
        Ver carga
      </Button>
    </div>
  );
}
