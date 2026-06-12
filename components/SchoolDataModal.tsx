'use client';

import type { NivelEducativo, MatriculasData, PrimariaMatriculas, SecundariaMatriculas, AdultosMatriculas, EducacionEspecialMatriculas } from '@/types';
import { Modal } from '@/components/ui/Modal';

interface SchoolDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  nivel: NivelEducativo;
  matriculas: MatriculasData;
}

export function SchoolDataModal({
  isOpen,
  onClose,
  nivel,
  matriculas,
}: SchoolDataModalProps) {
  const m = matriculas;

  let grades: { label: string; matricula: string; ausentes: string }[];

  if (nivel === 'primaria') {
    const p = m as PrimariaMatriculas;
    grades = [
      { label: '1° grado', matricula: p.matricula1, ausentes: p.ausentes1 },
      { label: '2° grado', matricula: p.matricula2, ausentes: p.ausentes2 },
      { label: '3° grado', matricula: p.matricula3, ausentes: p.ausentes3 },
      { label: '4° grado', matricula: p.matricula4, ausentes: p.ausentes4 },
      { label: '5° grado', matricula: p.matricula5, ausentes: p.ausentes5 },
      { label: '6° grado', matricula: p.matricula6, ausentes: p.ausentes6 },
      { label: '7° grado', matricula: p.matricula7, ausentes: p.ausentes7 },
    ];
  } else if (nivel === 'adultos') {
    const a = m as AdultosMatriculas;
    grades = [
      { label: '1° año', matricula: a.matricula1, ausentes: a.ausentes1 },
      { label: '2° año', matricula: a.matricula2, ausentes: a.ausentes2 },
      { label: '3° año', matricula: a.matricula3, ausentes: a.ausentes3 },
    ];
  } else if (nivel === 'educacion-especial') {
    const e = m as EducacionEspecialMatriculas;
    grades = [
      { label: '1° grado', matricula: e.matricula1, ausentes: e.ausentes1 },
    ];
  } else {
    const s = m as SecundariaMatriculas;
    grades = [
      { label: '1° año', matricula: s.matricula1, ausentes: s.ausentes1 },
      { label: '2° año', matricula: s.matricula2, ausentes: s.ausentes2 },
      { label: '3° año', matricula: s.matricula3, ausentes: s.ausentes3 },
      { label: '4° año', matricula: s.matricula4, ausentes: s.ausentes4 },
      { label: '5° año', matricula: s.matricula5, ausentes: s.ausentes5 },
      { label: '6° año', matricula: s.matricula6, ausentes: s.ausentes6 },
    ];
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalle de carga">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-xl border-2 border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Grado/Año</th>
                <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Matrícula</th>
                <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Ausentes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {grades.map((g) => (
                <tr key={g.label} className="bg-white">
                  <td className="px-3 py-2 text-gray-700 font-medium">{g.label}</td>
                  <td className="px-3 py-2 text-right text-gray-800 font-bold">{g.matricula || '-'}</td>
                  <td className="px-3 py-2 text-right font-bold">{g.ausentes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-700">
            Familias ausentes
          </p>
          <p className="mt-0.5 text-2xl font-bold text-emerald-700">
            {m.familiasAusentes || '-'}
          </p>
        </div>
      </div>
    </Modal>
  );
}
