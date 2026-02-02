
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ShopProvider } from "@/context/ShopContext";
import { Toaster } from "sonner"; 
import Navbar from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photo Shop",
  description: "Ecommerce for selling photos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ShopProvider>
            <Toaster position="top-center" richColors />
            <Navbar />
            {children}
          </ShopProvider>
        </AuthProvider>
      </body>
    </html>
  );
}