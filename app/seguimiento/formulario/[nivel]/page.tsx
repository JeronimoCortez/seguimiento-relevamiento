'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FollowUpForm } from '@/components/FollowUpForm';
import { submitFollowUp } from '@/services/sheet.service';

const CIERRE = new Date('2026-07-03T23:59:00-03:00');

const nivelLabels: Record<string, string> = {
  primaria: 'Primaria',
  secundaria: 'Secundaria',
  adultos: 'Jóvenes y adultos',
  'educacion-especial': 'Educación Especial',
};

export default function FormularioNivelPage() {
  const params = useParams();
  const nivel = params.nivel as string;
  const [habilitado, setHabilitado] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setHabilitado(new Date() < CIERRE);
    setCargando(false);
  }, []);

  if (cargando) return null;

  if (!habilitado) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-900 text-white px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Volver al inicio
            </Link>
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
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-8 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-amber-800">
              Formulario cerrado
            </h2>
            <p className="text-sm text-amber-700">
              El período de carga del formulario Pre receso invernal finalizó el
              3 de julio de 2026.
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
          <Link
            href="/seguimiento/formulario"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver a niveles
          </Link>
          <div className="text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-blue-300">
              Dirección General de Escuelas · Mendoza
            </p>
            <h1 className="mb-4 text-2xl font-bold leading-tight md:text-3xl">
              Formulario de seguimiento - {nivelLabels[nivel] || nivel}
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
          Seguimiento - Pre receso invernal - {nivelLabels[nivel] || nivel}
        </h2>

        <FollowUpForm onSubmit={submitFollowUp} nivel={nivel} />
      </div>
    </div>
  );
}
