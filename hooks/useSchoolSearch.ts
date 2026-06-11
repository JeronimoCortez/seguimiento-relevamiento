'use client';

import { useState } from 'react';
import type { NivelEducativo, SearchResult, SearchState } from '@/types';
import { searchSchool } from '@/services/sheet.service';

export function useSchoolSearch() {
  const [state, setState] = useState<SearchState>('idle');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const search = async (email: string, nivel: NivelEducativo) => {
    setState('loading');
    setError(null);
    setResult(null);

    try {
      const data = await searchSchool(email, nivel);
      setResult(data);
      setState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar');
      setState('error');
    }
  };

  const reset = () => {
    setState('idle');
    setResult(null);
    setError(null);
  };

  return { state, result, error, search, reset };
}
