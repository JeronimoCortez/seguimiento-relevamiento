import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import type { FollowUpFormData, ApiSubmitResponse } from '@/types';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID_SEGUIMIENTO!;
const SHEET_DESTINO = 'Post-receso';
const HEADERS = [
  'Marca temporal',
  'Nombre persona responsable del seguimiento',
  'Correo persona responsable del seguimiento',
  'Telefono persona responsable del seguimiento',
  'Q de familias sobre la que correspondia realzar seguimiento',
  'Q de familias que firmaron el acta en 2da intancia',
  'Q de familias a las que no se pudo acceder',
  'Descripcion de las acciones realizadas',
];

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: FollowUpFormData = await request.json();

    const error = validate(body);
    if (error) {
      return NextResponse.json<ApiSubmitResponse>(
        { ok: false, error },
        { status: 400 }
      );
    }

    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_DESTINO}!C:C`,
    });

    const existingEmails = (existing.data.values ?? [])
      .slice(1)
      .flatMap((row) => (row[0] ?? '').toString().trim().toLowerCase())
      .filter(Boolean);

    if (existingEmails.includes(body.emailResponsable.trim().toLowerCase())) {
      return NextResponse.json<ApiSubmitResponse>(
        { ok: false, error: 'El correo electrónico ya fue registrado previamente' },
        { status: 409 }
      );
    }

    const values = [[
      new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Mendoza' }),
      body.nombreResponsable,
      body.emailResponsable,
      body.telefonoResponsable,
      body.cantidadFamiliasSeguimiento,
      body.cantidadFirmaronActa,
      body.cantidadNoContactadas,
      body.descripcionAcciones,
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_DESTINO}!A:H`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values },
    });

    return NextResponse.json<ApiSubmitResponse>({ ok: true });
  } catch (error) {
    console.error('Error submitting to sheets:', error);
    return NextResponse.json<ApiSubmitResponse>(
      { ok: false, error: 'Error interno del servidor' },
      { status: 500 }
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
    return 'El teléfono es obligatorio';
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
