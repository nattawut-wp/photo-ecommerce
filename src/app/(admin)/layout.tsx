"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  LogOut, 
  Users,
  Image as ImageIcon,
  Settings,
  ChevronRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, isAdmin, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // ป้องกันคนที่ไม่ใช่ admin เข้าถึง
  useEffect(() => {
    if (!loading) {
      if (!token || !isAdmin) {
        router.push('/login');
      }
    }
  }, [token, isAdmin, router, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    );
  }

  if (!token || !isAdmin) {
    return null;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
    { icon: ImageIcon, label: "Store View", href: "/" },
    // { icon: Users, label: "Customers", href: "/admin/customers" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-100">
          <Link href="#" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-2 rounded-xl text-white">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              PhotoAdmin
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-violet-50 text-violet-600" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${isActive ? "text-violet-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Button 
            variant="ghost" 
            onClick={logout} 
            className="w-full flex items-center justify-start gap-3 p-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout Administration</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
                {menuItems.find(item => item.href === pathname)?.label || "Administration"}
            </h2>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">Full Access</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold border-2 border-white shadow-sm">
                    A
                </div>
            </div>
        </header>
        
        <div className="p-8">
            {children}
        </div>
      </main>
    </div>
  );
}
