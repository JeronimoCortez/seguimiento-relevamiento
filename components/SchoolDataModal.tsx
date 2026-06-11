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

  let grades: { label: string; value: string }[];

  if (nivel === 'primaria') {
    const p = m as PrimariaMatriculas;
    grades = [
      { label: 'Matrícula 1° grado', value: p.matricula1 },
      { label: 'Matrícula 2° grado', value: p.matricula2 },
      { label: 'Matrícula 3° grado', value: p.matricula3 },
      { label: 'Matrícula 4° grado', value: p.matricula4 },
      { label: 'Matrícula 5° grado', value: p.matricula5 },
      { label: 'Matrícula 6° grado', value: p.matricula6 },
      { label: 'Matrícula 7° grado', value: p.matricula7 },
    ];
  } else if (nivel === 'adultos') {
    const a = m as AdultosMatriculas;
    grades = [
      { label: 'Matrícula 1° año', value: a.matricula1 },
      { label: 'Matrícula 2° año', value: a.matricula2 },
      { label: 'Matrícula 3° año', value: a.matricula3 },
    ];
  } else if (nivel === 'educacion-especial') {
    const e = m as EducacionEspecialMatriculas;
    grades = [
      { label: 'Matrícula 1° grado', value: e.matricula1 },
    ];
  } else {
    const s = m as SecundariaMatriculas;
    grades = [
      { label: 'Matrícula 1° año', value: s.matricula1 },
      { label: 'Matrícula 2° año', value: s.matricula2 },
      { label: 'Matrícula 3° año', value: s.matricula3 },
      { label: 'Matrícula 4° año', value: s.matricula4 },
      { label: 'Matrícula 5° año', value: s.matricula5 },
      { label: 'Matrícula 6° año', value: s.matricula6 },
    ];
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalle de carga">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {grades.map((g) => (
            <div
              key={g.label}
              className="rounded-xl border-2 border-gray-200 bg-gray-50 p-3"
            >
              <p className="text-xs text-gray-500">{g.label}</p>
              <p className="mt-0.5 text-base font-bold text-gray-800">
                {g.value || '-'}
              </p>
            </div>
          ))}
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
