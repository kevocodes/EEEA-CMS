import { z } from "zod";

export const ForgotPaswordSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
});