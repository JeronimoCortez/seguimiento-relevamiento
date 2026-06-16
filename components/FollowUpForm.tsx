"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import type { FollowUpFormData } from "@/types";
import { CamposGenerales } from "@/components/CamposGenerales";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface FollowUpFormProps {
  onSubmit: (data: FollowUpFormData) => Promise<void>;
  redirectTo?: string;
  nivel?: string;
}

const defaultValues: FollowUpFormData = {
  nombreResponsable: "",
  emailResponsable: "",
  telefonoResponsable: "",
  cantidadFamiliasSeguimiento: "",
  cantidadFirmaronActa: "",
  cantidadNoContactadas: "",
  descripcionAcciones: "",
  tipoGestion: "",
  modalidad: "",
  "sedeSupervisión": "",
  departamento: "",
  escuela: "",
  nombreEstablecimiento: "",
  correoElectronico: "",
  nivel: "",
};

const tipoSedesMap: Record<string, "primaria" | "secundaria" | "adultos" | "educacion-especial"> = {
  primaria: "primaria",
  secundaria: "secundaria",
  adultos: "adultos",
  "educacion-especial": "educacion-especial",
};

export function FollowUpForm({ onSubmit, redirectTo = '/seguimiento/formulario/exito', nivel }: FollowUpFormProps) {
  const router = useRouter();
  const methods = useForm<FollowUpFormData>({ defaultValues });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = methods;

  const tipoSedes = tipoSedesMap[nivel ?? ""] ?? "primaria";
  const mostrarModalidad = nivel === "secundaria" || nivel === "adultos";

  const submitHandler = async (data: FollowUpFormData) => {
    const total = Number(data.cantidadFamiliasSeguimiento);
    const firmaron = Number(data.cantidadFirmaronActa);
    const noContactadas = Number(data.cantidadNoContactadas);

    if (firmaron + noContactadas !== total) {
      setError("cantidadFirmaronActa", {
        message:
          'La suma de "Firmaron el acta" y "No se pudo acceder" debe ser igual a la cantidad total de familias',
      });
      return;
    }

    try {
      await onSubmit({ ...data, nivel: nivel ?? 'primaria' });
      router.push(redirectTo);
    } catch (err) {
      setError("root", {
        message:
          err instanceof Error ? err.message : "Error al enviar el formulario",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6" noValidate>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600">
            Datos personales
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Input
              label="Nombre persona responsable del seguimiento"
              error={errors.nombreResponsable?.message as string}
              placeholder="Ingrese el nombre"
              {...register("nombreResponsable", { required: "Este campo es obligatorio" })}
            />
            <Input
              label="Correo persona responsable del seguimiento"
              type="email"
              error={errors.emailResponsable?.message as string}
              placeholder="correo@ejemplo.com"
              {...register("emailResponsable", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo electrónico no válido",
                },
              })}
            />
            <Input
              label="Teléfono persona responsable del seguimiento"
              type="tel"
              error={errors.telefonoResponsable?.message as string}
              placeholder="Ingrese el teléfono"
              {...register("telefonoResponsable", { required: "Este campo es obligatorio" })}
            />
          </div>

          <CamposGenerales
            tipoSedes={tipoSedes}
            mostrarModalidad={mostrarModalidad}
          />

          <hr className="border-gray-200" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600">
            Carga del seguimiento
          </h3>

          <div className="space-y-5">
            <Input
              label="Cantidad de familias sobre las que correspondía realizar seguimiento"
              type="number"
              min={0}
              error={errors.cantidadFamiliasSeguimiento?.message as string}
              placeholder="0"
              {...register("cantidadFamiliasSeguimiento", {
                required: "Este campo es obligatorio",
                pattern: { value: /^\d+$/, message: "Debe ser un número" },
              })}
            />
            <Input
              label="Cantidad de familias que firmaron el acta en segunda instancia"
              type="number"
              min={0}
              error={errors.cantidadFirmaronActa?.message as string}
              placeholder="0"
              {...register("cantidadFirmaronActa", {
                required: "Este campo es obligatorio",
                pattern: { value: /^\d+$/, message: "Debe ser un número" },
              })}
            />
            <Input
              label="Cantidad de familias a las que no se pudo acceder"
              type="number"
              min={0}
              error={errors.cantidadNoContactadas?.message as string}
              placeholder="0"
              {...register("cantidadNoContactadas", {
                required: "Este campo es obligatorio",
                pattern: { value: /^\d+$/, message: "Debe ser un número" },
              })}
            />
          </div>

          <Textarea
            label="Descripción de las acciones realizadas"
            error={errors.descripcionAcciones?.message as string}
            placeholder="Describa las acciones realizadas..."
            rows={4}
            {...register("descripcionAcciones", { required: "Este campo es obligatorio" })}
          />

          {errors.root?.message && (
            <div
              className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
            >
              {errors.root.message}
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" isLoading={isSubmitting}>
              Guardar seguimiento
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
