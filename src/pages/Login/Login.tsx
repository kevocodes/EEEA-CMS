import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./components/LoginForm";

function Login() {
  return (
    <main className="min-h-[100dvh] grid place-items-center">
      <Card className="w-full max-w-xl border-none shadow-none">
        <CardHeader className="text-center flex flex-col gap-3 justify-center items-center">
          <img src="/logo.webp" alt="Logo" className="w-20 h-20" />
          <div className="flex flex-col gap-2 text-balance">
            <CardTitle>Escuela Educación Especial Ahuachapán</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para iniciar sesión
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}

export default Login;
