import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import supabase from "@/utils/supabaseClient";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isPassMismatch, setIsPassMismatch] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setIsPassMismatch(false);

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form["confirm-password"].value;

    if (password !== confirmPassword) {
      setIsPassMismatch(true);
      setLoading(false);
      return;
    }

    if (!supabase) return;

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;

      if (data) {
        toast.success("Signup Successful!", {
          description: "You have successfully signed up.",
        });

        navigate(`/signup/success?email=${email}`);
      }
    } catch (error) {
      if (error.message.includes("User already registered")) {
        toast.error("User already registered", {
          description: "This email is already in use. Please log in instead.",
        });
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Email not confirmed", {
          description:
            "Please check your email and confirm your account before logging in.",
        });
      } else {
        toast.error("An error has occurred", {
          description: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignupWithGoogle = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      console.log("Signing up with Google successful", data);
    } catch (error) {
      console.error("Google signup error:", error.message);
      toast.error("An error occurred during Google signup");
    }
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6")}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your details below to create your account
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
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
              />
              {isPassMismatch && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
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
              onClick={handleSignupWithGoogle}
              disabled={loading}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Register with Google
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <a
              href="#"
              className="underline underline-offset-4 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate("/auth/login");
              }}
            >
              Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
