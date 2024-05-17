import { MAX_IMAGE_MB_SIZE } from "@/constants/images";
import { sizeInMB } from "@/utils/file-size-converter";
import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/webp",
  "image/jpeg",
  "image/jpg",
];

export const createEventSchema = z.object({
  title: z.string().min(1, "Título requerido"),
  location: z.string().min(1, "Ubicación requerida"),
  datetime: z.date({ message: "Fecha requerida" }),
  thumbnail: z
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

export const editEventSchema = z.object({
  title: z.string().min(1, "Título requerido"),
  location: z.string().min(1, "Ubicación requerida"),
  datetime: z.date({ message: "Fecha requerida" }),
  status: z.enum(["completed", "pending"], {
    required_error: "Estado requerido",
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
    }, `El tamaño máximo de la imagen es de ${MAX_IMAGE_MB_SIZE} MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, "Tipo de archivo de imagen no soportado"),
});

export const addEventImageSchema = z.object({
  images: z
    .custom<File[]>()
    .refine((files) => {
      return Array.from(files ?? []).length > 0;
    }, "Imagenes requeridas")
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_MB_SIZE
      );
    }, `El tamaño máximo de las imágenes es de ${MAX_IMAGE_MB_SIZE} MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, "Tipo de archivo de imágenes no soportado"),
});
