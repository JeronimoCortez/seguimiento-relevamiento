'use client';

import { useState } from 'react';
import type { FollowUpFormData } from '@/types';
import { submitFollowUp } from '@/services/sheet.service';

export function useSubmitFollowUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (data: FollowUpFormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await submitFollowUp(data);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { isSubmitting, error, success, submit, reset };
}
