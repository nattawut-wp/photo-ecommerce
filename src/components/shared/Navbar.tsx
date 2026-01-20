"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useShop } from "@/context/ShopContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, LogOut, User, Camera, Sparkles, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { token, logout, loading, isAdmin } = useAuth();
  const { getCartCount } = useShop();
  const pathname = usePathname();

  // ซ่อน Navbar ถ้าหลุดเข้ามาในหน้า admin (เผื่อไว้)
  if (pathname.startsWith('/admin')) return null;

  // ป้องกันการกระพริบของปุ่ม Login ตอนโหลดหน้า
  if (loading) return (
     <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-white/10 shadow-lg shadow-black/20">
       <div className="container mx-auto flex justify-between items-center px-4 py-3 h-[72px]">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-2 rounded-xl">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              PhotoShop
            </span>
          </Link>
       </div>
     </nav>
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-white/10 shadow-lg shadow-black/20">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo with gradient */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-gradient-to-r from-violet-600 to-indigo-600 p-2 rounded-xl">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            PhotoShop
          </span>
        </Link>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-300 hover:text-violet-400 transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/#latest" className="text-sm font-medium text-gray-300 hover:text-violet-400 transition-colors relative group">
            Gallery
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/#bestsellers" className="text-sm font-medium text-gray-300 hover:text-violet-400 transition-colors relative group">
            Bestsellers
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {token ? (
            <>
              {isAdmin ? (
                <Link href="/admin/dashboard" className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors px-3 py-2 rounded-lg hover:bg-white/5 border border-violet-500/20">
                  <span className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </span>
                </Link>
              ) : (
                <>
                  <Link href="/orders" className="text-sm font-medium text-gray-300 hover:text-violet-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/5">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      My Orders
                    </span>
                  </Link>
                  <Link href="/cart" className="relative group">
                    <div className="p-2.5 rounded-xl bg-white/5 hover:bg-violet-500/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-violet-500/20">
                      <ShoppingCart className="w-5 h-5 text-gray-300 group-hover:text-violet-400 transition-colors" />
                      {getCartCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                          {getCartCount()}
                        </span>
                      )}
                    </div>
                  </Link>
                </>
              )}
              <Button 
                variant="ghost" 
                onClick={logout} 
                size="sm" 
                className="gap-2 text-gray-300 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 px-6">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}