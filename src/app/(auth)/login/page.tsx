import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Camera } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-200/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/50 rounded-full blur-3xl" />
      </div>
      
      <Card className="relative w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        {/* Top Gradient Bar */}
        <div className="h-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-t-lg" />
        
        <CardHeader className="text-center space-y-4 pt-8 pb-4">
          {/* Logo */}
          <div className="mx-auto w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Camera className="w-7 h-7 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome Back
            </CardTitle>
            <CardDescription className="mt-2 text-gray-500">
              Sign in to access your photo collection
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          <LoginForm />
        </CardContent>

        {/* Footer */}
        <div className="px-6 pb-6 pt-0 text-center border-t border-gray-100">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-violet-600 transition-colors mt-4">
            ← Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
}