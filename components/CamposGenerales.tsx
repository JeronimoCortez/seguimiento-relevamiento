"use client";

import { useFormContext } from "react-hook-form";
import { DEPARTAMENTOS_MENDOZA } from "@/types";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

type CamposGeneralesProps = {
  mostrarCorreoElectronico?: boolean;
  mostrarModalidad?: boolean;
  tipoSedes?: "primaria" | "secundaria" | "adultos" | "educacion-especial";
};

const gestionOptions = [
  { value: "Estatal", label: "Estatal" },
  { value: "Privada", label: "Privada" },
];

const modalidadSecundariaOptions = [
  { value: "Técnica", label: "Técnica" },
  { value: "Orientada", label: "Orientada" },
];

const modalidadAdultosOptions = [
  { value: "CEBJA", label: "CEBJA" },
  { value: "CENS", label: "CENS" },
];

const departamentoOptions = DEPARTAMENTOS_MENDOZA.map((d) => ({
  value: d,
  label: d,
}));

const sedesEstatalPrimaria = [
  ...Array.from({ length: 9 }, (_, i) => String(i + 1)),
  "10 Este",
  "10 Oeste",
  ...Array.from({ length: 43 }, (_, i) => String(i + 11)),
  "54",
  "54 Hogar",
  ...Array.from({ length: 4 }, (_, i) => String(i + 55)),
];

const sedesEstatalOrientada = Array.from({ length: 18 }, (_, i) =>
  String(i + 1),
);
const sedesEstatalTecnica = Array.from({ length: 6 }, (_, i) =>
  String(i + 1),
);
const sedesPrivada = Array.from({ length: 8 }, (_, i) => String(i + 1));
const sedesAdultosCEBJA = Array.from({ length: 7 }, (_, i) => String(i + 1));
const sedesAdultosCENS = Array.from({ length: 7 }, (_, i) => String(i + 1));
const sedesEducacionEspecial = Array.from({ length: 5 }, (_, i) =>
  String(i + 1),
);

export function CamposGenerales({
  mostrarCorreoElectronico = false,
  mostrarModalidad = false,
  tipoSedes = "primaria",
}: CamposGeneralesProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const tipoGestion = watch("tipoGestion");
  const modalidad = watch("modalidad");

  const sedes =
    tipoSedes === "educacion-especial"
      ? sedesEducacionEspecial
      : tipoGestion === "Privada"
        ? sedesPrivada
        : tipoSedes === "secundaria"
          ? modalidad === "Técnica"
            ? sedesEstatalTecnica
            : modalidad === "Orientada"
              ? sedesEstatalOrientada
              : []
          : tipoSedes === "adultos"
            ? modalidad === "CEBJA"
              ? sedesAdultosCEBJA
              : modalidad === "CENS"
                ? sedesAdultosCENS
                : []
            : sedesEstatalPrimaria;

  const sedesOptions = sedes.map((s) => ({
    value: s,
    label:
      tipoSedes === "educacion-especial"
        ? `Sede ${s} - Educacion especial`
        : `Sede ${s}`,
  }));

  const sedePlaceholder =
    !tipoGestion
      ? "Seleccione primero el tipo de gestión"
      : mostrarModalidad && tipoGestion === "Estatal" && !modalidad
        ? "Seleccione primero la modalidad"
        : "— Seleccione sede —";

  const sedeDisabled =
    !tipoGestion ||
    ((tipoSedes === "secundaria" || tipoSedes === "adultos") &&
      tipoGestion === "Estatal" &&
      !modalidad);

  return (
    <section>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-5">
        Datos del Establecimiento
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Select
          label="Tipo de gestión"
          options={gestionOptions}
          placeholder="— Seleccione —"
          error={errors.tipoGestion?.message as string}
          {...register("tipoGestion")}
        />

        {mostrarModalidad && (
          <Select
            label={tipoSedes === "adultos" ? "Nivel" : "Modalidad"}
            options={
              tipoSedes === "adultos"
                ? modalidadAdultosOptions
                : modalidadSecundariaOptions
            }
            placeholder={
              tipoSedes === "adultos"
                ? "— Seleccione Nivel —"
                : "— Seleccione Modalidad —"
            }
            error={errors.modalidad?.message as string}
            {...register("modalidad")}
          />
        )}

        <Select
          label="Sede de supervisión"
          options={sedesOptions}
          placeholder={sedePlaceholder}
          disabled={sedeDisabled}
          error={errors.sedeSupervisión?.message as string}
          {...register("sedeSupervisión")}
        />

        <Select
          label="Departamento"
          options={departamentoOptions}
          placeholder="— Seleccione departamento —"
          error={errors.departamento?.message as string}
          {...register("departamento")}
        />

        <Input
          label="Número del establecimiento"
          type="text"
          inputMode="numeric"
          placeholder="Número sin guiones"
          error={errors.escuela?.message as string}
          onKeyDown={(e) => {
            const allowed = [
              "Backspace",
              "Delete",
              "Tab",
              "ArrowLeft",
              "ArrowRight",
              "Home",
              "End",
            ];
            if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) {
              e.preventDefault();
            }
          }}
          {...register("escuela")}
        />

        <Input
          label="Nombre del establecimiento"
          placeholder="Nombre completo del establecimiento"
          error={errors.nombreEstablecimiento?.message as string}
          {...register("nombreEstablecimiento")}
        />

        {mostrarCorreoElectronico && (
          <Input
            label="Correo electronico"
            type="email"
            placeholder="correo@ejemplo.com"
            error={errors.correoElectronico?.message as string}
            {...register("correoElectronico")}
          />
        )}
      </div>
    </section>
  );
}
