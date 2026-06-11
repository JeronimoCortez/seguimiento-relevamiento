'use client';

import { useState } from 'react';
import type { NivelEducativo } from '@/types';
import { useSchoolSearch } from '@/hooks/useSchoolSearch';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import { SearchSchoolCard } from '@/components/SearchSchoolCard';
import { SchoolDataModal } from '@/components/SchoolDataModal';

const nivelOptions = [
  { value: 'primaria', label: 'Primaria' },
  { value: 'secundaria', label: 'Secundaria' },
  { value: 'adultos', label: 'Adultos' },
  { value: 'educacion-especial', label: 'Educación Especial' },
];

export default function AccesoADatosPage() {
  const [nivel, setNivel] = useState<NivelEducativo | ''>('');
  const [email, setEmail] = useState('');
  const [nivelError, setNivelError] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const { state, result, error: searchError, search, reset } = useSchoolSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nivel) {
      setNivelError('Debe seleccionar un nivel educativo');
      return;
    }
    setNivelError(undefined);
    search(email, nivel as NivelEducativo);
  };

  const handleNivelChange = (value: string) => {
    setNivel(value as NivelEducativo);
    setNivelError(undefined);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header institucional */}
      <div className="bg-blue-900 text-white px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <a
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </a>
          <div className="text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-blue-300">
              Dirección General de Escuelas · Mendoza
            </p>
            <h1 className="mb-4 text-2xl font-bold leading-tight md:text-3xl">
              Acceso a datos
            </h1>
            <p className="text-base text-blue-200">
              Cada institución tiene identificadas las familias que deberán ser
              recitadas a partir de los registros del operativo. Ingrese el correo
              electrónico de la persona responsable de la carga para consultar los
              datos.
            </p>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* Buscador */}
        <div className="mb-8 rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSearch} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <Select
                  label="Nivel educativo"
                  options={nivelOptions}
                  placeholder="Seleccione un nivel"
                  value={nivel}
                  onChange={(e) => handleNivelChange(e.target.value)}
                  error={nivelError}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  label="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEmail('');
                  reset();
                }}
              >
                Limpiar
              </Button>
              <Button type="submit">Buscar</Button>
            </div>
          </form>
        </div>

        {/* Estados */}
        {state === 'loading' && <LoadingState message="Buscando escuela..." />}

        {state === 'error' && (
          <div className="mb-6 rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {searchError}
          </div>
        )}

        {state === 'idle' && !result && (
          <EmptyState message="Realice una búsqueda para ver los resultados." />
        )}

        {state === 'success' && result && (
          <div className="mb-8">
            <SearchSchoolCard
              school={result.school}
              onViewLoad={() => setModalOpen(true)}
            />
          </div>
        )}

        {result && (
          <SchoolDataModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            nivel={result.school.nivel}
            matriculas={result.matriculas}
          />
        )}
      </div>
    </div>
  );
}
