// src/app/(shop)/product/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Sparkles, TrendingUp, Camera, Eye, Heart, ShoppingCart } from "lucide-react";
import type { Metadata } from 'next';
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Products | Photo Shop",
  description: "Browse our complete collection of premium photography",
};

// ฟังก์ชันดึงข้อมูลสินค้าทั้งหมด
async function getProducts() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    const res = await fetch(`${backendUrl}/api/v1/product/list`, { 
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function ProductListPage() {
  const products = await getProducts();

  // สร้าง pattern สำหรับ layout - ให้เต็มแถว
  // Grid 4 คอลัมน์: 4 ปกติ = แถว 1, 2 ปกติ + 1 กว้าง = แถว 2 (2+2=4)
  const getMasonryClass = (index: number) => {
    // ทุก 5 ตัวจะมี 1 ตัวที่กว้าง (ตำแหน่ง 5, 10, 15...)
    if ((index + 1) % 5 === 0) {
      return "md:col-span-2"; // กว้าง (2 คอลัมน์)
    }
    return "md:col-span-1"; // ปกติ (1 คอลัมน์)
  };

  const getAspectRatio = (index: number) => {
    // กว้าง = 16:9, ปกติ = 3:4
    if ((index + 1) % 5 === 0) {
      return "aspect-[16/9]"; // Wide - อัตราส่วนกว้าง
    }
    return "aspect-[3/4]"; // Portrait - อัตราส่วนปกติ
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-indigo-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-purple-500/20 border border-violet-500/30 rounded-full text-violet-400 text-sm font-medium mb-6 backdrop-blur-sm">
            <Camera className="w-4 h-4" />
            Premium Collection
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
              Explore
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Our Gallery
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover stunning high-resolution photography, ready to bring your creative visions to life.
          </p>
        </div>

        {/* Masonry Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
            {products.map((product: any, index: number) => (
              <Link 
                key={product._id} 
                href={`/product/${product._id}`}
                className={`group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-white/10 hover:border-violet-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20 ${getMasonryClass(index)}`}
              >
                {/* Image Container */}
                <div className={`relative ${getAspectRatio(index)} w-full overflow-hidden`}>
                  {product.image && product.image[0] ? (
                    <Image
                      src={product.image[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                      <Camera className="w-12 h-12 text-slate-600" />
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Bestseller Badge */}
                  {product.bestseller && (
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg shadow-amber-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Bestseller
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-violet-600 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-violet-600 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs text-violet-400 font-medium mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{product.category}</p>
                    <h3 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                        {formatPrice(product.price)}
                      </span>
                      <button className="w-10 h-10 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/50">
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
            <Camera className="w-20 h-20 mx-auto text-gray-600 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
            <p className="text-gray-400">Check back later for new additions</p>
          </div>
        )}

        {/* Bottom Decoration */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-gray-400">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <span>More stunning photos coming soon</span>
            <Sparkles className="w-5 h-5 text-pink-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
