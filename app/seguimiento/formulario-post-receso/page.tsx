'use client';

import { useEffect, useState } from 'react';
import { FollowUpForm } from '@/components/FollowUpForm';
import { submitFollowUpPostReceso } from '@/services/sheet.service';

const HABILITAR_APARTIR = new Date('2026-07-20T00:00:00-03:00');

export default function FormularioPostRecesoPage() {
  const [habilitado, setHabilitado] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setHabilitado(new Date() >= HABILITAR_APARTIR);
    setCargando(false);
  }, []);

  if (cargando) return null;

  if (!habilitado) {
    return (
      <div className="min-h-screen bg-gray-50">
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
                Formulario de seguimiento - Post receso invernal
              </h1>
              <p className="text-base text-blue-200">
                Complete el formulario con los datos del seguimiento realizado a las
                familias ausentes.
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-8 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-amber-800">
              Formulario no disponible
            </h2>
            <p className="text-sm text-amber-700">
              El formulario de seguimiento Post receso invernal estará disponible
              a partir del 20 de julio de 2026.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              Formulario de seguimiento
            </h1>
            <p className="text-base text-blue-200">
              Complete el formulario con los datos del seguimiento realizado a las
              familias ausentes.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="mb-5 text-center text-sm font-medium uppercase tracking-wider text-gray-600">
          Seguimiento - Post receso invernal
        </h2>

        <FollowUpForm
          onSubmit={submitFollowUpPostReceso}
          redirectTo="/seguimiento/formulario-post-receso/exito"
        />
      </div>
    </div>
  );
}
