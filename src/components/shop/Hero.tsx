"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, Sparkles, ImageIcon, Download } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-[85vh] overflow-hidden rounded-3xl mb-16">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-violet-600/40 via-purple-500/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/40 via-blue-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-pink-500/20 via-rose-400/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-violet-950/90 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2574&auto=format&fit=crop" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-10 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 border border-violet-500/30 rounded-2xl rotate-12 z-10 animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-32 left-20 w-16 h-16 border border-pink-500/30 rounded-full z-10 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-violet-400 rounded-full z-10 animate-ping" style={{ animationDuration: '2s' }} />

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 py-24 md:py-32 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 backdrop-blur-sm border border-violet-400/30 rounded-full text-violet-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Premium Digital Photography
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white">
            Capture the 
            <span className="relative inline-block ml-3">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-indigo-400">
                Magic
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-violet-400 via-pink-400 to-indigo-400 blur-2xl opacity-50" />
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
              Through Our Lens
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Discover stunning high-resolution imagery for your creative projects. 
            <span className="text-white font-medium"> Instant digital download</span> with commercial licensing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="#latest">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 group"
              >
                Explore Gallery
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#bestsellers">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                View Bestsellers
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 justify-center lg:justify-start mt-12 pt-8 border-t border-white/10">
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-gray-400 text-sm">Premium Photos</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white">5K+</div>
              <div className="text-gray-400 text-sm">Happy Customers</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white">4.9</div>
              <div className="text-gray-400 text-sm flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> Rating
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Floating Cards */}
        <div className="flex-1 relative hidden lg:block">
          {/* Main Image Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=600&auto=format&fit=crop" 
                alt="Featured Photo" 
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="flex items-center justify-between mt-4 px-2">
                <div>
                  <div className="text-white font-semibold">Mountain Sunrise</div>
                  <div className="text-gray-400 text-sm">by John Doe</div>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Download className="w-4 h-4" />
                  $29.99
                </div>
              </div>
            </div>
          </div>

          {/* Floating Mini Cards */}
          <div className="absolute -top-8 -left-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=100&auto=format&fit=crop" 
                  alt="Thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-white text-sm font-medium">Nature Pack</div>
                <div className="text-emerald-400 text-xs">50 Photos</div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-violet-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-8 h-8 text-violet-400" />
              <div>
                <div className="text-white font-bold">8K Quality</div>
                <div className="text-gray-400 text-xs">Ultra High Res</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}