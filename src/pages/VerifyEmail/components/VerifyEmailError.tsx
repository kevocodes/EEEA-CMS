import { Button } from "@/components/ui/button";
import { useAuth } from "@/stores/auth.store";
import { MailWarning } from "lucide-react";

function VerifyEmailError() {
  const logout = useAuth((state) => state.logout);

  return (
    <div className="w-full max-w-sm flex justify-center items-center text-primary flex-col gap-2">
      <MailWarning size={160} />
      <p className="text-sm text-muted-foreground text-balance text-center">
        Ha ocurrido un error al verificar el correo electrónico, intentelo
        nuevamente más tarde.
      </p>
      <Button className="mt-4 w-full" onClick={() => logout()}>
        Aceptar
      </Button>
    </div>
  );
}

export default VerifyEmailError;
