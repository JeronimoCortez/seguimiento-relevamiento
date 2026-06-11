import Link from 'next/link';

const steps = [
  {
    title: 'Acceso a los datos',
    description:
      'Cada institución tiene identificadas las familias que deberán ser recitadas a partir de los registros del operativo. En caso de necesitar la información que se cargó en el sistema, podrán acceder a la misma ingresando el correo electrónico de la persona responsable de la carga.',
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
    color: 'blue',
  },
  {
    title: 'Hasta viernes 3 de julio de 2026.',
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
    color: 'violet',
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
    color: 'emerald',
  },
];

const stepColors: Record<string, string> = {
  blue: 'bg-blue-50 border-blue-200',
  violet: 'bg-violet-50 border-violet-200',
  emerald: 'bg-emerald-50 border-emerald-200',
};

const stepIconBg: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600',
  violet: 'bg-violet-100 text-violet-600',
  emerald: 'bg-emerald-100 text-emerald-600',
};

const stepBadge: Record<string, string> = {
  blue: 'text-blue-600',
  violet: 'text-violet-600',
  emerald: 'text-emerald-600',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header institucional */}
      <div className="bg-blue-900 text-white px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-blue-300">
            Dirección General de Escuelas · Mendoza
          </p>
          <h1 className="mb-4 text-2xl font-bold leading-tight md:text-3xl">
            Operativo Territorial de Responsabilidad Parental, Acuerdos de Convivencia y Seguridad Integral (MEMOI-2026-15-GDEMZA-DGE)
          </h1>
          <p className="text-base text-blue-200">
            El seguimiento tiene por objetivo garantizar la continuidad de las trayectorias educativas de los estudiantes cuyas familias no concurrieron a la citación. Para ello se deberán identificar las situaciones de riesgo o vulnerabilidad asociadas a la ausencia y fortalecer el vínculo entre las familias y las instituciones educativas mediante una intervención personalizada y sostenida. En este sentido, resulta necesario completar la notificación fehaciente del cien por ciento de las familias.
          </p>
        </div>
      </div>

      {/* Etapas del seguimiento */}
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-gray-600">
          Etapas del seguimiento
        </h2>

        <div className="space-y-4">
          {steps.map((step, i) => {
            const content = (
              <div
                className={`flex items-start gap-5 rounded-xl border-2 p-6 transition-all duration-150 hover:shadow-md ${stepColors[step.color]}`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${stepIconBg[step.color]}`}
                >
                  {step.icon}
                </div>
                <div className="flex-1">
                  <span
                    className={`mb-1 inline-block text-xs font-semibold uppercase tracking-wider ${stepBadge[step.color]}`}
                  >
                    Etapa {i + 1}
                  </span>
                  <h3 className="text-base font-semibold text-gray-800">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            );
            if (i === 0) {
              return (
                <Link key={i} href="/seguimiento/acceso-a-datos" className="block">
                  {content}
                </Link>
              );
            }
            if (i === 1) {
              return (
                <Link key={i} href="/seguimiento/formulario" className="block">
                  {content}
                </Link>
              );
            }
            return <div key={i}>{content}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
