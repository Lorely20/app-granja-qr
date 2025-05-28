import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";

const schema = z.object({
  colaborador_id: z.string().min(1, "Requerido"),
  fecha: z.string().min(1, "Requerido"),
  galera_id: z.string().min(1, "Requerido"),
  mortalidad_hembra: z.number().nonnegative(),
  mortalidad_macho: z.number().nonnegative(),
  consumo_alimento: z.number().nonnegative(),
  huevo_fertil: z.number().nonnegative(),
  huevo_pequeno: z.number().nonnegative(),
  huevo_mediano: z.number().nonnegative(),
  huevo_grande: z.number().nonnegative(),
  huevo_jumbo: z.number().nonnegative(),
});

export default function Formulario() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      colaborador_id: "",
      fecha: "",
      galera_id: "",
      mortalidad_hembra: 0,
      mortalidad_macho: 0,
      consumo_alimento: 0,
      huevo_fertil: 0,
      huevo_pequeno: 0,
      huevo_mediano: 0,
      huevo_grande: 0,
      huevo_jumbo: 0,
    },
  });

  const onSubmit = async (data) => {
    try {
      let fechaFinal = data.fecha;
      if (fechaFinal.includes("/")) {
        const [day, month, year] = fechaFinal.split("/");
        fechaFinal = `${year}-${month}-${day}`;
      }
      await api.post("/reporte", { ...data, fecha: fechaFinal });
      alert("Reporte enviado correctamente");
      reset();
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Hubo un error al enviar el reporte");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Datos diarios</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Colaborador ID" name="colaborador_id" register={register} error={errors} />
            <Input label="Fecha" name="fecha" type="date" register={register} error={errors} />
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm">Galera</label>
              <select 
              name="galera_id" 
              {...register("galera_id")}
             className="w-full p-2 border border-gray-300 bg-white shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Selecciona una galera</option>
                <option value="1">Galera 1</option>
                <option value="2">Galera 2</option>
                <option value="3">Galera 3</option>
              </select>
              {errors.galera_id && <span className="text-red-500 text-xs">{errors.galera_id.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Mortalidad Hembra" name="mortalidad_hembra" type="number" register={register} error={errors} />
            <Input label="Mortalidad Macho" name="mortalidad_macho" type="number" register={register} error={errors} />
            <Input label="Consumo Alimento" name="consumo_alimento" type="number" register={register} error={errors} />
            <Input label="Huevo Fértil" name="huevo_fertil" type="number" register={register} error={errors} />
            <Input label="Huevo Pequeño" name="huevo_pequeno" type="number" register={register} error={errors} />
            <Input label="Huevo Mediano" name="huevo_mediano" type="number" register={register} error={errors} />
            <Input label="Huevo Grande" name="huevo_grande" type="number" register={register} error={errors} />
            <Input label="Huevo Jumbo" name="huevo_jumbo" type="number" register={register} error={errors} />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 shadow">
            Enviar Reporte
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ label, name, type = "text", register, error }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium text-sm">{label}</label>
      <input
        type={type}
        name={name} 
        {...register(name, { valueAsNumber: type === "number" })}
        className="w-full p-2 border border-gray-300 bg-white shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {error[name] && <span className="text-red-500 text-xs">{error[name].message}</span>}
    </div>
  );
}

