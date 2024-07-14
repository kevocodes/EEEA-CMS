import { useState } from "react";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ForgotPasswordConfirmation from "./components/ForgotPasswordConfirmation";
import { useTitle } from "@/hooks/useTitle";

function ForgotPasword() {
  useTitle("Recuperar contraseña");

  const [sendEmail, setUsendEmail] = useState(false);

  return (
    <main className="min-h-[100dvh] w-full flex justify-center items-center flex-col p-2">
      {!sendEmail && <ForgotPasswordForm setSendEmail={setUsendEmail} />}

      {sendEmail && <ForgotPasswordConfirmation />}
    </main>
  );
}

export default ForgotPasword;
