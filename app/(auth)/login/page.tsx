import Link from "next/link";
import { AuthForm } from "@/app/components/auth-form";

export const metadata = {
  title: "Login | GlobalTrotters",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <AuthForm mode="login" />
        <p className="text-sm text-muted-foreground">
          New here? <Link href="/signup" className="underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
