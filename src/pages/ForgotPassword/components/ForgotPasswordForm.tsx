import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ResponseError } from "@/models/responseError.model";
import { forgotPassword } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PUBLIC_ROUTES } from "@/constants/routes";

import { Loader2 } from "lucide-react";

import { z } from "zod";
import { ForgotPaswordSchema } from "@/schemas/forgotPassword.schema";

interface ForgotPasswordFormProps {
  setSendEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

function ForgotPasswordForm({ setSendEmail }: ForgotPasswordFormProps) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof ForgotPaswordSchema>>({
    resolver: zodResolver(ForgotPaswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ForgotPaswordSchema>) {
    try {
      await forgotPassword(data.email);
      setSendEmail(true);
    } catch (error) {
      if (error instanceof ResponseError) return toast.error(error.message);
      if (error instanceof Error) return toast.error(error.message);
      toast.error("Ocurrió un error inesperado");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm flex flex-col gap-2"
      >
        <div className="flex flex-col justify-center items-center">
          <img src="/logo.webp" alt="Logo" className="w-20 h-20" />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel className="text-xl">Recupera tu contraseña</FormLabel>
              <FormDescription>
                Ingresa tu correo electrónico para buscar tu cuenta.
              </FormDescription>
              <FormControl>
                <Input placeholder="usuario@email.com" {...field} />
              </FormControl>
              <FormMessage className="self-start" />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <Loader2 size={16} className="mr-2 animate-spin" />
          )}
          Buscar
        </Button>

        <Button
          type="button"
          variant={"outline"}
          onClick={() => navigate(PUBLIC_ROUTES.LOGIN)}
        >
          Cancelar
        </Button>
      </form>
    </Form>
  );
}

export default ForgotPasswordForm;
