import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/webp",
  "image/jpeg",
  "image/jpg",
];

const MAX_IMAGE_MB_SIZE = 1.5;

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const createEventSchema = z.object({
  title: z.string().min(1, "Título requerido"),
  location: z.string().min(1, "Ubicación requerida"),
  datetime: z
    .date({ message: "Fecha requerida" })
    .refine((value) => value > new Date(), {
      message: "La fecha debe ser mayor a la actual",
    }),
  thumbnail: z
    .custom<File[]>()
    .refine((files) => {
      return Array.from(files ?? []).length > 0;
    }, "Imagen requerida")
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_MB_SIZE
      );
    }, `El tamaño máximo de la imágen es de ${MAX_IMAGE_MB_SIZE} MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, "Tipo de archivo de imágen no soportado"),
});
