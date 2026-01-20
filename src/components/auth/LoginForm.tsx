"use client";

import { useForm } from "react-hook-form";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { LoginFormData } from "@/types";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      // Admin Login
      const resAdmin = await api.post('/user/admin', data);
      if (resAdmin.data.success) {
        toast.success("Login Admin success");
        login(resAdmin.data.token, 'admin');
        router.push('/admin/dashboard');
        return;
      }
    } catch (adminError) {
      // User Login (Fallback)
      try {
        const res = await api.post('/user/login', data);
        if (res.data.success) {
          toast.success("Login success");
          login(res.data.token, 'user');
          router.push('/');
        }
      } catch (error) {
        toast.error("Email or password is incorrect");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Mail className="w-4 h-4 text-violet-500" />
          Email
        </label>
        <Input 
          {...register("email")} 
          type="email" 
          placeholder="you@example.com" 
          required 
          disabled={loading}
          className="h-12 rounded-xl border-gray-200 focus:border-violet-500 focus:ring-violet-500/20 transition-all duration-200"
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Lock className="w-4 h-4 text-violet-500" />
          Password
        </label>
        <Input 
          {...register("password")} 
          type="password" 
          placeholder="••••••••" 
          required 
          disabled={loading}
          className="h-12 rounded-xl border-gray-200 focus:border-violet-500 focus:ring-violet-500/20 transition-all duration-200"
        />
      </div>

      {/* Forgot Password
      <div className="flex justify-end">
        <Link 
          href="/forgot-password" 
          className="text-sm text-violet-600 hover:text-violet-800 hover:underline transition-colors"
        >
          Forgot password?
        </Link>
      </div> */}

      {/* Submit Button */}
      <Button 
        type="submit" 
        disabled={loading}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Signing in...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Sign In
            <ArrowRight className="w-5 h-5" />
          </span>
        )}
      </Button>

      {/* Divider
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-500">or</span>
        </div>
      </div> */}

   

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-violet-600 hover:text-violet-800 hover:underline transition-colors">
          Sign up
        </Link>
      </p>
    </form>
  );
}
