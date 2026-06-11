import { InfoStepCard } from '@/components/InfoStepCard';

const steps = [
  {
    title: 'Relevamiento inicial de familias ausentes',
    description:
      'Identificar y registrar las familias que no pudieron ser contactadas durante el relevamiento inicial.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    color: 'blue' as const,
  },
  {
    title: 'Pre receso invernal',
    description:
      'Contactar a las familias que estuvieron ausentes durante el relevamiento inicial.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    color: 'violet' as const,
  },
  {
    title: 'Post receso invernal',
    description:
      'Realizar seguimiento de los contactos efectuados durante la etapa anterior.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    color: 'emerald' as const,
  },
];

export default function SeguimientoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header institucional */}
      <div className="bg-blue-900 text-white px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-blue-300">
            Dirección General de Escuelas · Mendoza
          </p>
          <h1 className="mb-4 text-2xl font-bold leading-tight md:text-3xl">
            Seguimiento de familias ausentes
          </h1>
          <p className="text-base text-blue-200">
            Luego de la etapa de relevamiento se debe realizar un seguimiento de
            contacto y la correcta firma del acta de aquellas familias que
            estuvieron ausentes.
          </p>
        </div>
      </div>

      {/* Etapas */}
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-gray-600">
          Etapas del seguimiento
        </h2>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <InfoStepCard
              key={i}
              stepNumber={i + 1}
              title={step.title}
              description={step.description}
              icon={step.icon}
              color={step.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
