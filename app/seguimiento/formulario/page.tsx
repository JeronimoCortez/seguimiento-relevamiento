'use client';

import { FollowUpForm } from '@/components/FollowUpForm';
import { submitFollowUp } from '@/services/sheet.service';

export default function FormularioPage() {
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
          Seguimiento - Pre receso invernal
        </h2>

        <FollowUpForm onSubmit={submitFollowUp} />
      </div>
    </div>
  );
}
