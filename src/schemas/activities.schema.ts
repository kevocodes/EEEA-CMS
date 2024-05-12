import { z } from "zod";

export const createActivitySchema = z.object({
  title: z.string().min(1, "Título requerido"),
  datetime: z
    .date({ message: "Fecha requerida" })
    .refine((value) => value > new Date(), {
      message: "La fecha debe ser mayor a la actual",
    }),
});

export const editActivitySchema = createActivitySchema;
