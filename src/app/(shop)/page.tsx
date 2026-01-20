import Hero from "@/components/shop/Hero";
import ProductList from "@/components/shop/ProductList";
import SectionHeader from "@/components/shop/SectionHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ฟังก์ชันดึงข้อมูล (Server Side)
async function getProducts() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ;
  try {
    const res = await fetch(`${backendUrl}/api/v1/product/list`, { 
        cache: 'no-store' // ดึงข้อมูลใหม่ทุกครั้งที่รีเฟรช
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  // Logic การแยกประเภทสินค้า
  // 1. Bestsellers: เช็ค field bestseller หรือแสดง 4 ชิ้นแรกถ้าไม่มีการตั้งค่า
  const bestsellers = products.filter((p: any) => p.bestseller === true || p.bestseller === "true").slice(0, 4);
  
  // 2. Latest Arrivals: เอาสินค้า 8 ชิ้นล่าสุด (สมมติว่า backend sort มาแล้ว หรือใช้ reverse)
  // ถ้า backend ส่งมาเรียงตามเก่า->ใหม่ ให้ใช้ [...products].reverse()
  const latestProducts = [...products].reverse().slice(0, 8);

  return (
    <div className="container mx-auto pb-20 px-4 pt-6">
      
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Bestsellers Section */}
      {bestsellers.length > 0 && (
        <section id="bestsellers" className="mb-20 scroll-mt-24">
            <SectionHeader 
                title="Bestsellers Collection" 
                subtitle="Our most popular images selected by customers worldwide." 
            />
            <ProductList products={bestsellers} />
        </section>
      )}

      {/* 3. Latest Arrivals Section */}
      <section id="latest" className="mb-20 scroll-mt-24">
          <div className="flex justify-between items-end mb-8">
              <div className="text-left">
                  <h2 className="text-3xl font-bold">Latest Arrivals</h2>
                  <p className="text-gray-500 mt-2">Newest additions to our gallery</p>
              </div>
              <Link href="/search?sort=latest">
                <Button variant="ghost" className="gap-2 text-primary">
                    View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
          </div>
          <ProductList products={latestProducts} />
      </section>

      {/* 4. Features / Trust Banner */}
      <section className="bg-gray-50 rounded-2xl p-10 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-xl">
                  💎
              </div>
              <h3 className="font-bold text-lg">High Quality</h3>
              <p className="text-gray-500 text-sm">Every image is high-resolution, ready for large prints and professional use.</p>
          </div>
          <div className="space-y-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-xl">
                  ⚡
              </div>
              <h3 className="font-bold text-lg">Instant Download</h3>
              <p className="text-gray-500 text-sm">Get access to your files immediately after secure payment via Stripe.</p>
          </div>
          <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto text-xl">
                  🛡️
              </div>
              <h3 className="font-bold text-lg">Secure Licensing</h3>
              <p className="text-gray-500 text-sm">Clear usage rights for personal and commercial projects.</p>
          </div>
      </section>

    </div>
  );
}