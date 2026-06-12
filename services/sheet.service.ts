import type {
  NivelEducativo,
  SearchResult,
  ApiSearchResponse,
  ApiSubmitResponse,
  FollowUpFormData,
} from '@/types';

export async function searchSchool(
  email: string,
  nivel: NivelEducativo
): Promise<SearchResult> {
  const res = await fetch(
    `/api/sheets/search?email=${encodeURIComponent(email)}&nivel=${nivel}`
  );
  const body: ApiSearchResponse = await res.json();
  if (!body.ok || !body.data) {
    throw new Error(body.error ?? 'Error al buscar la escuela');
  }
  return body.data;
}

export async function submitFollowUp(
  data: FollowUpFormData
): Promise<void> {
  const res = await fetch('/api/sheets/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const body: ApiSubmitResponse = await res.json();
  if (!body.ok) {
    throw new Error(body.error ?? 'Error al guardar los datos');
  }
}

export async function submitFollowUpPostReceso(
  data: FollowUpFormData
): Promise<void> {
  const res = await fetch('/api/sheets/submit-post-receso', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const body: ApiSubmitResponse = await res.json();
  if (!body.ok) {
    throw new Error(body.error ?? 'Error al guardar los datos');
  }
}
