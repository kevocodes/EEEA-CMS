import { MAX_IMAGE_MB_SIZE } from "@/constants/images";
import { sizeInMB } from "@/utils/file-size-converter";
import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/webp",
  "image/jpeg",
  "image/jpg",
];

export const createInstallationSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  image: z
    .custom<File[]>()
    .refine((files) => {
      return Array.from(files ?? []).length > 0;
    }, "Imagen requerida")
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_MB_SIZE
      );
    }, `El tamaño máximo de la imagen es de ${MAX_IMAGE_MB_SIZE} MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, "Tipo de archivo de imagen no soportado"),
});

export const editInstallationSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  image: z
    .custom<File[]>()
    .refine((files) => {
      return Array.from(files ?? []).length > 0;
    }, "Imagen requerida")
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_MB_SIZE
      );
    }, `El tamaño máximo de la imagen es de ${MAX_IMAGE_MB_SIZE} MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, "Tipo de archivo de imagen no soportado"),
});