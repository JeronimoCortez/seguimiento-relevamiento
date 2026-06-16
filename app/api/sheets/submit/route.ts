import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import type { FollowUpFormData, ApiSubmitResponse } from '@/types';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID_SEGUIMIENTO_PRE_RECESO!;

const sheetNivelMap: Record<string, string> = {
  primaria: 'Primaria',
  secundaria: 'Secundaria',
  adultos: 'Adultos',
  'educacion-especial': 'Educacion Especial',
};

type ColumnField = keyof FollowUpFormData | 'marcaTemporal';

const fieldByHeader: Record<string, ColumnField> = {
  'Marca temporal': 'marcaTemporal',
  Nivel: 'nivel',
  'Tipo de gestión': 'tipoGestion',
  Modalidad: 'modalidad',
  'Sede de supervisión': 'sedeSupervisión',
  Departamento: 'departamento',
  'Número del establecimiento': 'escuela',
  'Nombre del establecimiento': 'nombreEstablecimiento',
  'Correo electrónico': 'correoElectronico',
  'Nombre persona responsable del seguimiento': 'nombreResponsable',
  'Correo persona responsable del seguimiento': 'emailResponsable',
  'Teléfono persona responsable del seguimiento': 'telefonoResponsable',
  'Cantidad de familias sobre las que correspondía realizar seguimiento': 'cantidadFamiliasSeguimiento',
  'Cantidad de familias que firmaron el acta en segunda instancia': 'cantidadFirmaronActa',
  'Cantidad de familias a las que no se pudo acceder': 'cantidadNoContactadas',
  'Descripción de las acciones realizadas': 'descripcionAcciones',
};

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

function buildRow(body: FollowUpFormData, headers: string[]): string[] {
  const dateStr = new Date().toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Mendoza',
  });
  return headers.map((header) => {
    const field = fieldByHeader[header];
    if (!field) return '';
    if (field === 'marcaTemporal') return dateStr;
    return body[field] ?? '';
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: FollowUpFormData = await request.json();

    const error = validate(body);
    if (error) {
      return NextResponse.json<ApiSubmitResponse>(
        { ok: false, error },
        { status: 400 },
      );
    }

    const sheetName = sheetNivelMap[body.nivel];
    if (!sheetName) {
      return NextResponse.json<ApiSubmitResponse>(
        { ok: false, error: 'Nivel educativo no válido' },
        { status: 400 },
      );
    }

    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    const headerResult = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!1:1`,
    });
    const headers = headerResult.data.values?.[0] ?? [];

    const emailIndex = headers.indexOf('Correo persona responsable del seguimiento');
    if (emailIndex !== -1) {
      const emailCol = String.fromCharCode(65 + emailIndex);
      const existing = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!${emailCol}:${emailCol}`,
      });

      const existingEmails = (existing.data.values ?? [])
        .slice(1)
        .flatMap((row) => (row[0] ?? '').toString().trim().toLowerCase())
        .filter(Boolean);

      if (
        existingEmails.includes(body.emailResponsable.trim().toLowerCase())
      ) {
        return NextResponse.json<ApiSubmitResponse>(
          {
            ok: false,
            error:
              'El correo electrónico ya fue registrado previamente',
          },
          { status: 409 },
        );
      }
    }

    const values = [buildRow(body, headers)];
    const lastCol = String.fromCharCode(64 + values[0].length);
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:${lastCol}`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values },
    });

    return NextResponse.json<ApiSubmitResponse>({ ok: true });
  } catch (error) {
    console.error('Error submitting to sheets:', error);
    return NextResponse.json<ApiSubmitResponse>(
      { ok: false, error: 'Error interno del servidor' },
      { status: 500 },
    );
  }
}

function validate(data: FollowUpFormData): string | null {
  if (!data.nombreResponsable?.trim()) {
    return 'El nombre es obligatorio';
  }
  if (!data.emailResponsable?.trim()) {
    return 'El correo es obligatorio';
  }
  if (!data.telefonoResponsable?.trim()) {
    return 'El número es obligatorio';
  }
  if (!data.tipoGestion?.trim()) {
    return 'El tipo de gestión es obligatorio';
  }
  if (!data.departamento?.trim()) {
    return 'El departamento es obligatorio';
  }
  if (!data.escuela?.trim()) {
    return 'El número del establecimiento es obligatorio';
  }
  if (!data.nombreEstablecimiento?.trim()) {
    return 'El nombre del establecimiento es obligatorio';
  }
  if (!data.cantidadFamiliasSeguimiento?.trim()) {
    return 'La cantidad de familias es obligatoria';
  }
  if (!data.cantidadFirmaronActa?.trim()) {
    return 'La cantidad de familias que firmaron es obligatoria';
  }
  if (!data.cantidadNoContactadas?.trim()) {
    return 'La cantidad de familias no contactadas es obligatoria';
  }
  if (!data.descripcionAcciones?.trim()) {
    return 'La descripción es obligatoria';
  }
  return null;
}
