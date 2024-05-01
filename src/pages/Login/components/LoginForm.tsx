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
import { PRIVATE_ROUTES } from "@/constants/routes";
import { ResponseError } from "@/models/responseError.model";
import { loginSchema } from "@/schemas/login.schema";
import { signIn } from "@/services/auth.service";
import { useAuth } from "@/stores/auth.store";
import { createAppUserFromResponseUser } from "@/utils/createAppUserFromResponseUser.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

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
      if (error instanceof ResponseError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {form.formState.isSubmitting && (
            <Icon
              icon="bx:loader-alt"
              className="animate-spin mr-2"
              fontSize={16}
            />
          )}
          Enviar
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
