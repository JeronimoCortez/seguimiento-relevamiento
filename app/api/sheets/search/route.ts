import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import type { NivelEducativo, SchoolRecord, MatriculasData, ApiSearchResponse } from '@/types';

const SPREADSHEET_ID_DATOS = process.env.SPREADSHEET_ID_DATOS!;
const SHEET_PRIMARIA = 'primaria';
const SHEET_SECUNDARIA = 'secundaria';
const SHEET_ADULTOS = 'adultos';
const SHEET_ESPECIAL = 'Educacion-especial';

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
}

function getSheetName(nivel: NivelEducativo): string {
  const map: Record<NivelEducativo, string> = {
    primaria: SHEET_PRIMARIA,
    secundaria: SHEET_SECUNDARIA,
    adultos: SHEET_ADULTOS,
    'educacion-especial': SHEET_ESPECIAL,
  };
  return map[nivel];
}

function isNivel(value: unknown): value is NivelEducativo {
  return value === 'primaria' || value === 'secundaria' || value === 'adultos' || value === 'educacion-especial';
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email')?.trim();
    const nivel = searchParams.get('nivel');

    if (!email) {
      return NextResponse.json<ApiSearchResponse>(
        { ok: false, error: 'El correo electrónico es obligatorio' },
        { status: 400 }
      );
    }

    if (!nivel || !isNivel(nivel)) {
      return NextResponse.json<ApiSearchResponse>(
        { ok: false, error: 'El nivel educativo es obligatorio' },
        { status: 400 }
      );
    }

    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const sheetName = getSheetName(nivel);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID_DATOS,
      range: `${sheetName}!A:ZZ`,
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      return NextResponse.json<ApiSearchResponse>(
        { ok: false, data: undefined, error: 'No se encontraron datos en la hoja' },
        { status: 404 }
      );
    }

    const headers = rows[0];
    const emailColIndex = headers.findIndex((h) =>
      h.toLowerCase().includes('dirección de correo electrónico')
    );
    const nombreColIndex = headers.findIndex((h) =>
      h.toLowerCase().includes('nombre del establecimiento')
    );
    const numeroColIndex = headers.findIndex((h) =>
      h.toLowerCase().includes('número de la institución')
    );
    const seccionColIndex = headers.findIndex((h) =>
      h.toLowerCase().includes('sección de supervisión')
    );

    if (emailColIndex === -1 || nombreColIndex === -1) {
      return NextResponse.json<ApiSearchResponse>(
        { ok: false, error: 'No se encontraron las columnas esperadas en la hoja' },
        { status: 500 }
      );
    }

    const row = rows.slice(1).find((r) => {
      const cellValue = (r[emailColIndex] ?? '').toString().trim().toLowerCase();
      return cellValue === email.toLowerCase();
    });

    if (!row) {
      return NextResponse.json<ApiSearchResponse>(
        { ok: false, data: undefined, error: 'No se encontró una escuela con ese correo electrónico' },
        { status: 404 }
      );
    }

    const school: SchoolRecord = {
      nombreEscuela: row[nombreColIndex] ?? '',
      numero: numeroColIndex !== -1 ? (row[numeroColIndex] ?? '') : '',
      correo: row[emailColIndex] ?? '',
      seccion: seccionColIndex !== -1 ? (row[seccionColIndex] ?? '') : '',
      nivel,
    };

    const matriculas = extractMatriculas(headers, row, nivel);

    return NextResponse.json<ApiSearchResponse>({
      ok: true,
      data: { school, matriculas },
    });
  } catch (error) {
    console.error('Error searching sheets:', error);
    return NextResponse.json<ApiSearchResponse>(
      { ok: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

function extractMatriculas(
  headers: string[],
  row: string[],
  nivel: NivelEducativo
): MatriculasData {
  const getValue = (gradeLabel: string): string => {
    const idx = headers.findIndex((h) =>
      h.toLowerCase().includes(`matrícula total de ${gradeLabel}º`)
    );
    return idx !== -1 ? (row[idx] ?? '') : '';
  };

  if (nivel === 'primaria') {
    return {
      matricula1: getValue('1'),
      matricula2: getValue('2'),
      matricula3: getValue('3'),
      matricula4: getValue('4'),
      matricula5: getValue('5'),
      matricula6: getValue('6'),
      matricula7: getValue('7'),
      familiasAusentes: getFamiliasAusentes(headers, row),
    };
  }

  if (nivel === 'adultos') {
    return {
      matricula1: getValue('1'),
      matricula2: getValue('2'),
      matricula3: getValue('3'),
      familiasAusentes: getFamiliasAusentes(headers, row),
    };
  }

  if (nivel === 'educacion-especial') {
    return {
      matricula1: getValue('1'),
      familiasAusentes: getFamiliasAusentes(headers, row),
    };
  }

  return {
    matricula1: getValue('1'),
    matricula2: getValue('2'),
    matricula3: getValue('3'),
    matricula4: getValue('4'),
    matricula5: getValue('5'),
    matricula6: getValue('6'),
    familiasAusentes: getFamiliasAusentes(headers, row),
  };
}

function getFamiliasAusentes(headers: string[], row: string[]): string {
  const indices = headers.reduce<number[]>((acc, h, i) => {
    if (h.toLowerCase().includes('familias ausentes')) acc.push(i);
    return acc;
  }, []);
  const total = indices.reduce((sum, i) => {
    const val = parseInt((row[i] ?? '').replace(/\./g, ''), 10);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  return total > 0 ? String(total) : (indices.length > 0 ? (row[indices[0]] ?? '') : '');
}
