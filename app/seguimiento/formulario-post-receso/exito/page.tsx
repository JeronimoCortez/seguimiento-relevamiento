import Link from "next/link";

export default function ExitoPostRecesoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-600 text-white px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-emerald-200">
            Dirección General de Escuelas · Mendoza
          </p>
          <h1 className="mb-4 text-2xl font-bold leading-tight md:text-3xl">
            ¡Datos guardados correctamente!
          </h1>
          <p className="text-base text-emerald-100">
            El seguimiento correspondiente al Post receso invernal ha sido
            registrado con éxito. Muchas gracias por su colaboración.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="rounded-xl border-2 border-emerald-200 bg-white p-8 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            ¿Qué desea hacer ahora?
          </h2>
          <p className="mb-8 text-sm text-gray-500">
            Puede cargar otro seguimiento o volver al inicio.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/seguimiento/formulario-post-receso"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Cargar otro seguimiento
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
