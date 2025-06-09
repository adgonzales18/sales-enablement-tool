import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import supabase from "@/utils/supabaseClient";
import { toast } from "sonner";
import { AuthError } from "@supabase/supabase-js";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    if (!supabase) return;
    event.preventDefault();
    const form = event.currentTarget;

    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error(error.message || "An error has occurred");
        console.error("Error logging in:", error.message);
      } else {
        toast.error("An unexpected error occurred");
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    if (!supabase) return;
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      // The redirection will be handled by Supabase
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error("An error has occurred", {
          description: error.message,
        });
        console.error("Error logging in with Google:", error.message);
      } else {
        toast.error("An unexpected error occurred");
        console.error("Unexpected error:", error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6")}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                defaultValue="demo@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                defaultValue="qweqweqwe"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-white text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer"
              onClick={handleLoginWithGoogle}
              disabled={loading}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Login with Google
            </Button>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="underline underline-offset-4 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate("/auth/register");
              }}
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
