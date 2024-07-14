import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/schemas/forgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordCheckList from "./components/PasswordCheckList";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "@/constants/routes";
import { resetPassword } from "@/services/auth.service";
import { toast } from "sonner";
import { ResponseError } from "@/models/responseError.model";

interface ResetPasswordFormProps {
  token: string;
  loading: boolean;
}

function ResetPasswordForm({ token, loading }: ResetPasswordFormProps) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    try {
      const message = await resetPassword(token, data.password);
      toast.success(message);
      navigate(PUBLIC_ROUTES.LOGIN);
    } catch (error) {
      if (error instanceof ResponseError) return toast.error(error.message);
      if (error instanceof Error) return toast.error(error.message);
      toast.error("Error al recuperar la contraseña");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm flex flex-col gap-2"
      >
        {loading && (
          <div className="w-full flex justify-center items-center text-primary flex-col gap-2">
            <Loader2 size={160} className="animate-spin" />
          </div>
        )}
        
        {!loading && (
          <div className="flex flex-col justify-center items-center">
            <img src="/logo.webp" alt="Logo" className="w-20 h-20" />
          </div>
        )}

        {!loading && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel className="text-xl">
                  Recupera tu contraseña
                </FormLabel>
                <FormDescription>
                  Ingresa la nueva contraseña para tu cuenta.
                </FormDescription>
                <FormControl>
                  <Input placeholder="********" {...field} />
                </FormControl>
                <PasswordCheckList
                  errors={form.formState.errors}
                  className="self-start"
                />
              </FormItem>
            )}
          />
        )}

        {!loading && (
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 size={16} className="mr-2 animate-spin" />
            )}
            Guardar cambios
          </Button>
        )}

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

export default ResetPasswordForm;
