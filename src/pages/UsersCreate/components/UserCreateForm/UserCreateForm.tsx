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
import { ResponseError } from "@/models/responseError.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { createUserSchema } from "@/schemas/users.schema";
import { Role } from "@/models/user.model";
import PasswordCheckList from "./components/PasswordCheckList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { translateRole } from "@/pages/Users/components/UsersTable/utils/translateRole";
import { createUser } from "@/services/users.service";

function UserCreateForm() {
  const navigate = useNavigate();
  const token = useAuth((state) => state.token);

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      role: Role.CONTENT_MANAGER,
    },
  });

  const onSubmit = async (values: z.infer<typeof createUserSchema>) => {
    try {
      const respose = await createUser(values, token!);
      toast.success(respose);
      navigate(PRIVATE_ROUTES.USERS);
      console.log(values);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-background w-full p-8 rounded-lg"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="example@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Rol</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Rol" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem
                      value={Role.CONTENT_MANAGER}
                      className="cursor-pointer"
                    >
                      {translateRole(Role.CONTENT_MANAGER)}
                    </SelectItem>
                    <SelectItem value={Role.ADMIN} className="cursor-pointer">
                      {translateRole(Role.ADMIN)}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>
              <PasswordCheckList errors={form.formState.errors} />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting && (
              <LoaderCircle size={16} className="animate-spin mr-2" />
            )}
            Crear actividad
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UserCreateForm;
