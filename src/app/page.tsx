import Hero from "@/components/shop/Hero";
import ProductList from "@/components/shop/ProductList";
import SectionHeader from "@/components/shop/SectionHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Award, Star, TrendingUp, ImageIcon, Users } from "lucide-react";


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

export default async function HomePage() {
  const products = await getProducts();

  // Logic การแยกประเภทสินค้า
  const bestsellers = products.filter((p: any) => p.bestseller === true || p.bestseller === "true").slice(0, 4);
  const latestProducts = [...products].reverse().slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-6">
        <Hero />
      </div>

      {/* Bestsellers Section with Gradient Background */}
      {bestsellers.length > 0 && (
        <section id="bestsellers" className="relative py-20 scroll-mt-24 overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/50 via-slate-900 to-slate-900 -z-10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -z-10" />
          
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-4">
                <Award className="w-4 h-4" />
                Customer Favorites
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                Bestsellers Collection
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Our most popular images, hand-picked by photographers and loved by customers worldwide.
              </p>
            </div>
            <ProductList products={bestsellers} />
          </div>
        </section>
      )}

      {/* Latest Arrivals Section */}
      <section id="latest" className="py-20 scroll-mt-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 -z-10" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium mb-4">
                <TrendingUp className="w-4 h-4" />
                Fresh Content
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">
                Latest Arrivals
              </h2>
              <p className="text-gray-400 text-lg">Newest additions to our curated gallery</p>
            </div>
            <Link href="/product">
              <Button 
                variant="outline" 
                className="gap-2 px-6 py-5 border-2 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300 group rounded-xl"
              >
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <ProductList products={latestProducts} />
        </div>
      </section>

      {/* Features Section with Glassmorphism */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 -z-10" />
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-violet-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Premium Quality, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">Trusted Service</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the difference with our carefully curated collection of professional photography.
            </p>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/30">
                  <ImageIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">8K Ultra HD Quality</h3>
                <p className="text-gray-400 leading-relaxed">
                  Every image is captured in stunning high-resolution, perfect for large prints, billboards, and professional commercial use.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-violet-400 text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    RAW files available
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Instant Download</h3>
                <p className="text-gray-400 leading-relaxed">
                  Get immediate access to your purchased files. Secure payment processing via Stripe with automatic file delivery.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                    <Shield className="w-4 h-4" />
                    Secure checkout
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-rose-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/30">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Commercial License</h3>
                <p className="text-gray-400 leading-relaxed">
                  Clear usage rights for both personal and commercial projects. Use our images in your marketing, products, and more.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-pink-400 text-sm font-medium">
                    <Users className="w-4 h-4" />
                    Extended licenses
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-10 bg-slate-950" />
    </div>
  );
}