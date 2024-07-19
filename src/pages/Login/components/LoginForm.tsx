import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routes";
import { ResponseError } from "@/models/responseError.model";
import { loginSchema } from "@/schemas/login.schema";
import { signIn } from "@/services/auth.service";
import { useAuth } from "@/stores/auth.store";
import { createAppUserFromResponseUser } from "@/utils/createAppUserFromResponseUser.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordInput } from "./PasswordInput";

function LoginForm() {
  const navigate = useNavigate();
  const setToken = useAuth((state) => state.setToken);
  const setUser = useAuth((state) => state.setUser);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const data = await signIn(values);
      setToken(data.access_token);
      setUser(createAppUserFromResponseUser(data.user));
      navigate(PRIVATE_ROUTES.HOME);
    } catch (error) {
      if (error instanceof ResponseError) return toast.error(error.message);
      toast.error("Ha ocurrido un error inesperado");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input placeholder="usuario@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Link
          to={PUBLIC_ROUTES.FORGOT_PASSWORD}
          className="text-primary text-sm font-medium"
        >
          ¿Olvidaste tu contraseña?
        </Link>

        <Button type="submit" className="w-full">
          {form.formState.isSubmitting && (
            <LoaderCircle size={16} className="animate-spin mr-2" />
          )}
          Enviar
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
