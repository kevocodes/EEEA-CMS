import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Correo requerido").email({ message: "Ingresar un correo válido" }),
  password: z.string().min(1, "Contraseña requerida"),
});
