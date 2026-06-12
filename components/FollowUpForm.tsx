"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FollowUpFormData, FormErrors } from "@/types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface FollowUpFormProps {
  onSubmit: (data: FollowUpFormData) => Promise<void>;
  redirectTo?: string;
}

const initialData: FollowUpFormData = {
  nombreResponsable: "",
  emailResponsable: "",
  telefonoResponsable: "",
  cantidadFamiliasSeguimiento: "",
  cantidadFirmaronActa: "",
  cantidadNoContactadas: "",
  descripcionAcciones: "",
};

function validate(data: FollowUpFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.nombreResponsable.trim()) {
    errors.nombreResponsable = "Este campo es obligatorio";
  }
  if (!data.emailResponsable.trim()) {
    errors.emailResponsable = "Este campo es obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailResponsable)) {
    errors.emailResponsable = "Correo electrónico no válido";
  }
  if (!data.telefonoResponsable.trim()) {
    errors.telefonoResponsable = "Este campo es obligatorio";
  }
  if (!data.cantidadFamiliasSeguimiento.trim()) {
    errors.cantidadFamiliasSeguimiento = "Este campo es obligatorio";
  } else if (isNaN(Number(data.cantidadFamiliasSeguimiento))) {
    errors.cantidadFamiliasSeguimiento = "Debe ser un número";
  }
  if (!data.cantidadFirmaronActa.trim()) {
    errors.cantidadFirmaronActa = "Este campo es obligatorio";
  } else if (isNaN(Number(data.cantidadFirmaronActa))) {
    errors.cantidadFirmaronActa = "Debe ser un número";
  }
  if (!data.cantidadNoContactadas.trim()) {
    errors.cantidadNoContactadas = "Este campo es obligatorio";
  } else if (isNaN(Number(data.cantidadNoContactadas))) {
    errors.cantidadNoContactadas = "Debe ser un número";
  }
  if (!data.descripcionAcciones.trim()) {
    errors.descripcionAcciones = 'Este campo es obligatorio';
  }

  if (!errors.cantidadFamiliasSeguimiento && !errors.cantidadFirmaronActa && !errors.cantidadNoContactadas) {
    const total = Number(data.cantidadFamiliasSeguimiento);
    const firmaron = Number(data.cantidadFirmaronActa);
    const noContactadas = Number(data.cantidadNoContactadas);
    if (firmaron + noContactadas !== total) {
      errors.cantidadFirmaronActa =
        'La suma de "Firmaron el acta" y "No se pudo acceder" debe ser igual a la cantidad total de familias';
    }
  }

  return errors;
}

export function FollowUpForm({ onSubmit, redirectTo = '/seguimiento/formulario/exito' }: FollowUpFormProps) {
  const router = useRouter();
  const [data, setData] = useState<FollowUpFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set =
    (field: keyof FollowUpFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validate(data);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(data);
      router.push(redirectTo);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Error al enviar el formulario",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600">
          Datos personales
        </h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Input
            label="Nombre persona responsable del seguimiento"
            value={data.nombreResponsable}
            onChange={set("nombreResponsable")}
            error={errors.nombreResponsable}
            placeholder="Ingrese el nombre"
          />
          <Input
            label="Correo persona responsable del seguimiento"
            type="email"
            value={data.emailResponsable}
            onChange={set("emailResponsable")}
            error={errors.emailResponsable}
            placeholder="correo@ejemplo.com"
          />
          <Input
            label="Teléfono persona responsable del seguimiento"
            type="tel"
            value={data.telefonoResponsable}
            onChange={set("telefonoResponsable")}
            error={errors.telefonoResponsable}
            placeholder="Ingrese el teléfono"
          />
        </div>

        <hr className="border-gray-200" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600">
          Carga del seguimiento
        </h3>

        <div className="space-y-5">
          <Input
            label="Cantidad de familias sobre las que correspondía realizar seguimiento"
            type="number"
            min={0}
            value={data.cantidadFamiliasSeguimiento}
            onChange={set("cantidadFamiliasSeguimiento")}
            error={errors.cantidadFamiliasSeguimiento}
            placeholder="0"
          />
          <Input
            label="Cantidad de familias que firmaron el acta en segunda instancia"
            type="number"
            min={0}
            value={data.cantidadFirmaronActa}
            onChange={set("cantidadFirmaronActa")}
            error={errors.cantidadFirmaronActa}
            placeholder="0"
          />
          <Input
            label="Cantidad de familias a las que no se pudo acceder"
            type="number"
            min={0}
            value={data.cantidadNoContactadas}
            onChange={set("cantidadNoContactadas")}
            error={errors.cantidadNoContactadas}
            placeholder="0"
          />
        </div>

        <Textarea
          label="Descripción de las acciones realizadas"
          value={data.descripcionAcciones}
          onChange={set("descripcionAcciones")}
          error={errors.descripcionAcciones}
          placeholder="Describa las acciones realizadas..."
          rows={4}
        />

        {submitError && (
          <div
            className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {submitError}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" isLoading={isSubmitting}>
            Guardar seguimiento
          </Button>
        </div>
      </form>
    </div>
  );
}
