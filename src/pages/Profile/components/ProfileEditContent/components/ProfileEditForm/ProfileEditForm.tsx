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
import { UserDBDetail } from "@/models/user.model";
import PasswordCheckList from "./components/PasswordCheckList";
import { updateProfileSchema } from "@/schemas/users.schema";
import { updateProfile } from "@/services/users.service";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileEditFormProps {
  user: UserDBDetail;
}

function ProfileEditForm({ user }: ProfileEditFormProps) {
  const token = useAuth((state) => state.token);
  const updateUserInformation = useAuth((state) => state.updateUserInformation);
  const updateVerificationStatus = useAuth(
    (state) => state.updateVerificationStatus
  );

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
    try {
      const currentEmail = user.email;

      if (!values.password) delete values.password;

      const response = await updateProfile(user.id, values, token!);
      updateUserInformation(values.name, values.lastname);
      toast.success(response);

      // If the email has changed, we need to re-verify it
      if (currentEmail !== values.email) {
        updateVerificationStatus(false);
      }
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.status === 409) {
          form.setError("email", {
            type: "manual",
            message: "Correo electrónico se encuentra en uso",
          });
        }

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
            Actualizar Perfil
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ProfileEditForm;

ProfileEditForm.skeleton = function UserEditContentFormSkeleton() {
  return (
    <div className="w-full p-8 rounded-lg space-y-8 bg-background">
      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="w-full h-[68px] bg-muted rounded-lg" />
        <Skeleton className="w-full h-[68px] bg-muted rounded-lg" />
      </div>

      <Skeleton className="w-full h-[68px] bg-muted rounded-lg" />

      <Skeleton className="w-full h-[68px] bg-muted rounded-lg" />

      <div className="flex gap-2">
        <Skeleton className="w-full h-9 bg-muted rounded-lg" />
      </div>
    </div>
  );
};
